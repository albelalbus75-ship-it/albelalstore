import React, { useState, useMemo } from 'react';
import { Plus, Trash2, TrendingUp, Calculator, ArrowRightLeft, History } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { posAudio } from '../../utils/audio';

export const ExchangeRatesTab: React.FC = () => {
  const { exchangeRates, currencies, addExchangeRate, deleteExchangeRate, getBaseCurrency, convertCurrency, settings } = useStore();
  const base = getBaseCurrency();
  const nonBaseCurrencies = useMemo(() => currencies.filter((c) => !c.isBase && c.isActive), [currencies]);

  // Form
  const [form, setForm] = useState({
    currencyId: '', rate: 0, buyRate: 0, sellRate: 0,
    effectiveDate: new Date().toISOString().split('T')[0], source: 'يدوي',
  });

  // Converter
  const [convFrom, setConvFrom] = useState('');
  const [convTo, setConvTo] = useState('');
  const [convAmount, setConvAmount] = useState<number>(100);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!base) { posAudio.playErrorBuzz(); alert('لا توجد عملة أساسية'); return; }
    if (!form.currencyId || form.rate <= 0) {
      posAudio.playErrorBuzz();
      alert('اختر العملة وأدخل سعراً صحيحاً');
      return;
    }
    addExchangeRate({
      currencyId: form.currencyId,
      baseCurrencyId: base.id,
      rate: form.rate,
      buyRate: form.buyRate || undefined,
      sellRate: form.sellRate || undefined,
      effectiveDate: form.effectiveDate,
      source: form.source,
      isActive: true,
    });
    setForm({ ...form, currencyId: '', rate: 0, buyRate: 0, sellRate: 0 });
  };

  const handleDelete = (id: string) => {
    if (confirm('حذف سعر الصرف هذا؟')) deleteExchangeRate(id);
  };

  const conversionResult = useMemo(() => {
    if (!convFrom || !convTo || convFrom === convTo) return convAmount;
    return convertCurrency(convAmount, convFrom, convTo);
  }, [convFrom, convTo, convAmount, convertCurrency]);

  const sortedRates = useMemo(
    () => [...exchangeRates].sort((a, b) => new Date(b.effectiveDate).getTime() - new Date(a.effectiveDate).getTime()),
    [exchangeRates]
  );

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">أسعار الصرف</h3>
        <p className="text-xs text-slate-400">
          العملة الأساسية: <strong className="text-emerald-400">{base?.code} - {base?.name}</strong>
        </p>
      </div>

      {/* Add Rate Form */}
      <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-700">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-bold text-white">إضافة سعر صرف جديد</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-slate-300 block mb-1">العملة *</label>
            <select required value={form.currencyId}
              onChange={(e) => setForm({ ...form, currencyId: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500">
              <option value="">— اختر العملة —</option>
              {nonBaseCurrencies.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">التاريخ الفعلي</label>
            <input type="date" value={form.effectiveDate}
              onChange={(e) => setForm({ ...form, effectiveDate: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">
              سعر الصرف (1 وحدة = كم {base?.code}) *
            </label>
            <input type="number" step="0.0001" required value={form.rate || ''}
              onChange={(e) => setForm({ ...form, rate: parseFloat(e.target.value) || 0 })}
              placeholder="3.75"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500" />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">المصدر</label>
            <input type="text" value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              placeholder="يدوي / بنك / API"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">سعر الشراء (اختياري)</label>
            <input type="number" step="0.0001" value={form.buyRate || ''}
              onChange={(e) => setForm({ ...form, buyRate: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none" />
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">سعر البيع (اختياري)</label>
            <input type="number" step="0.0001" value={form.sellRate || ''}
              onChange={(e) => setForm({ ...form, sellRate: parseFloat(e.target.value) || 0 })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none" />
          </div>
        </div>
        <button type="submit"
          className="w-full sm:w-auto px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition active:scale-95">
          <Plus className="w-4 h-4" />
          <span>إضافة سعر الصرف</span>
        </button>
      </form>

      {/* Converter */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-700 mb-3">
          <Calculator className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold text-white">محول العملات الفوري</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 items-end">
          <div>
            <label className="text-xs text-slate-300 block mb-1">من</label>
            <select value={convFrom} onChange={(e) => setConvFrom(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
              <option value="">—</option>
              {currencies.map((c) => <option key={c.id} value={c.code}>{c.code}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">إلى</label>
            <select value={convTo} onChange={(e) => setConvTo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white">
              <option value="">—</option>
              {currencies.map((c) => <option key={c.id} value={c.code}>{c.code}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">المبلغ</label>
            <input type="number" value={convAmount}
              onChange={(e) => setConvAmount(parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
          </div>
          <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-xl px-3 py-2">
            <div className="text-[10px] text-emerald-300 mb-0.5">النتيجة</div>
            <div className="text-sm font-bold text-white font-mono truncate">
              {convFrom && convTo ? conversionResult.toFixed(4) : '—'}
            </div>
          </div>
        </div>
      </div>

      {/* History */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-bold text-slate-300">سجل أسعار الصرف ({sortedRates.length})</span>
        </div>
        {sortedRates.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">لا توجد أسعار صرف مسجلة بعد</div>
        ) : (
          sortedRates.map((r) => {
            const cur = currencies.find((c) => c.id === r.currencyId);
            const baseCur = currencies.find((c) => c.id === r.baseCurrencyId);
            return (
              <div key={r.id} className={`bg-slate-800/60 border rounded-2xl p-3 ${
                r.isActive ? 'border-emerald-700/40' : 'border-slate-700 opacity-60'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-white text-sm font-mono">
                        {cur?.code || '?'} → {baseCur?.code || '?'}
                      </span>
                      <span className="text-xs text-emerald-400 font-mono font-bold">{r.rate}</span>
                      {r.isActive ? (
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded">نشط</span>
                      ) : (
                        <span className="text-[10px] bg-slate-900 text-slate-400 border border-slate-700 px-2 py-0.5 rounded">منتهي</span>
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 flex-wrap font-mono">
                      <span>{r.effectiveDate}</span>
                      {r.source && <span>· {r.source}</span>}
                      {r.buyRate && <span>· شراء: {r.buyRate}</span>}
                      {r.sellRate && <span>· بيع: {r.sellRate}</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDelete(r.id)}
                    className="p-2 text-rose-400 hover:bg-rose-950/50 rounded-lg transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
