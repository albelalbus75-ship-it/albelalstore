import { Currency } from '../types';

const STORAGE_KEY = 'albelal_currencies';
const generateId = () => `cur_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
const now = () => new Date().toISOString();

// العملات الافتراضية عند أول تشغيل
const DEFAULT_CURRENCIES: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>[] = [
  { code: 'YER', name: 'ريال يمني', nameEn: 'Yemeni Rial', symbol: '﷼', decimals: 2, isBase: true, isActive: true },
  { code: 'USD', name: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', decimals: 2, isBase: false, isActive: true },
  { code: 'SAR', name: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', decimals: 2, isBase: false, isActive: true },
];

export const currencyService = {
  getAll(): Currency[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // زرع العملات الافتراضية عند أول تشغيل
      const seeded = DEFAULT_CURRENCIES.map(c => ({
        ...c, id: generateId(), createdAt: now(), updatedAt: now(),
      }));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  },

  getById(id: string) { return this.getAll().find(c => c.id === id); },
  getByCode(code: string) { return this.getAll().find(c => c.code === code); },
  getBase(): Currency | undefined { return this.getAll().find(c => c.isBase); },

  create(data: Omit<Currency, 'id' | 'createdAt' | 'updatedAt'>): Currency {
    const all = this.getAll();
    if (data.isBase) all.forEach(c => (c.isBase = false));
    const item: Currency = { ...data, id: generateId(), createdAt: now(), updatedAt: now() };
    all.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return item;
  },

  update(id: string, data: Partial<Currency>): Currency | null {
    const all = this.getAll();
    const idx = all.findIndex(c => c.id === id);
    if (idx === -1) return null;
    if (data.isBase) all.forEach(c => (c.isBase = false));
    all[idx] = { ...all[idx], ...data, id, updatedAt: now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[idx];
  },

  remove(id: string): boolean {
    localStorage.setItem(STORAGE_KEY,
      JSON.stringify(this.getAll().filter(c => c.id !== id)));
    return true;
  },
};
