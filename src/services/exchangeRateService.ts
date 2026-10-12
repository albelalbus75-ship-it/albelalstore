import { ExchangeRate } from '../types';
import { currencyService } from './currencyService';

const STORAGE_KEY = 'albelal_exchange_rates';
const generateId = () => `fx_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
const now = () => new Date().toISOString();

export const exchangeRateService = {
  getAll(): ExchangeRate[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  // أحدث سعر صرف لعملة معينة مقابل العملة الأساسية
  getLatestRate(currencyId: string): ExchangeRate | undefined {
    return this.getAll()
      .filter(r => r.currencyId === currencyId && r.isActive)
      .sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime())[0];
  },

  create(data: Omit<ExchangeRate, 'id' | 'createdAt' | 'updatedAt'>): ExchangeRate {
    const all = this.getAll();
    // تعطيل الأسعار السابقة لنفس العملة
    all.forEach(r => {
      if (r.currencyId === data.currencyId && r.isActive) r.isActive = false;
    });
    const item: ExchangeRate = { ...data, id: generateId(), createdAt: now(), updatedAt: now() };
    all.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return item;
  },

  update(id: string, data: Partial<ExchangeRate>): ExchangeRate | null {
    const all = this.getAll();
    const idx = all.findIndex(r => r.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data, id, updatedAt: now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[idx];
  },

  remove(id: string): boolean {
    localStorage.setItem(STORAGE_KEY,
      JSON.stringify(this.getAll().filter(r => r.id !== id)));
    return true;
  },

  // ============ تحويل المبالغ ============
  convert(amount: number, fromCurrencyId: string, toCurrencyId: string): number {
    if (fromCurrencyId === toCurrencyId) return amount;
    const base = currencyService.getBase();
    if (!base) throw new Error('لا توجد عملة أساسية');

    const fromRate = fromCurrencyId === base.id
      ? 1 : (this.getLatestRate(fromCurrencyId)?.rate ?? 1);
    const toRate = toCurrencyId === base.id
      ? 1 : (this.getLatestRate(toCurrencyId)?.rate ?? 1);

    // التحويل عبر العملة الأساسية: amount * fromRate / toRate
    return +(amount * fromRate / toRate).toFixed(4);
  },
};
