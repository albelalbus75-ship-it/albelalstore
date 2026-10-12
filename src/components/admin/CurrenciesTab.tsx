import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, Check, X, Coins } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { posAudio } from '../../utils/audio';
import { Currency } from '../../types';

export const CurrenciesTab: React.FC = () => {
  const { currencies, addCurrency, updateCurrency, deleteCurrency, settings, updateSettings } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: '', name: '', nameEn: '', symbol: '', decimals: 2,
    rateAgainstBase: 1, isBase: false, isActive: true,
  });

  const resetForm = () => {
    setForm({ code: '', name: '', nameEn: '', symbol: '', decimals: 2, rateAgainstBase: 1, isBase: false, isActive: true });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.code.trim() || !form.name.trim()) {
      posAudio.playErrorBuzz();
      alert('يجب إدخال كود واسم العملة');
      return;
    }
    if (editingId) {
      updateCurrency(editingId, form);
    } else {
      addCurrency(form as Omit<Currency, 'id'>);
    }
    resetForm();
  };

  const handleEdit = (c: Currency) => {
    setForm({
      code: c.code, name: c.name, nameEn: c.nameEn || '', symbol: c.symbol,
      decimals: c.decimals ?? 2, rateAgainstBase: c.rateAgainstBase,
      isBase: c.isBase, isActive: c.isActive,
    });
    setEditingId(c.id);
    setIsFormOpen(true);
  };

  const handleDelete = (c: Currency) => {
    if (confirm(`هل أنت متأكد من حذف العملة "${c.name}"؟`)) {
      deleteCurrency(c.id);
    }
  };

  const handleSetBase = (c: Currency) => {
    if (c.isBase) return;
    if (confirm(`تعيين "${c.name}" كعملة أساسية؟ سيتم تحديث العملة الأساسية في الإعدادات أيضاً.`)) {
      updateCurrency(c.id, { isBase: true });
      updateSettings({ baseCurrency: c.code });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">إدارة العملات</h3>
          <p className="text-xs text-slate-400">العملة الأساسية: <strong className="text-emerald-400">{settings.baseCurrency}</strong></p>
        </div>
        <button onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95">
          <Plus className="w-4 h-4" />
          <span>عملة جديدة</span>
        </button>
      </div>

      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">كود العملة *</label>
              <input type="text" required value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="USD" maxLength={5}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">الاسم بالعربية *</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="دولار أمريكي"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">الاسم بالإنجليزية</label>
              <input type="text" value={form.nameEn}
                onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
                placeholder="US Dollar"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">الرمز</label>
              <input type="text" value={form.symbol}
                onChange={(e) => setForm({ ...form, symbol: e.target.value })}
                placeholder="$"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">عدد المنازل العشرية</label>
              <input type="number" min="0" max="4" value={form.decimals}
                onChange={(e) => setForm({ ...form, decimals: parseInt(e.target.value) || 2 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">سعر الصرف مقابل العملة الأساسية</label>
              <input type="number" step="0.0001" value={form.rateAgainstBase}
                onChange={(e) => setForm({ ...form, rateAgainstBase: parseFloat(e.target.value) || 1 })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" checked={form.isActive}
                onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700" />
              <span>نشطة</span>
            </label>
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input type="checkbox" checked={form.isBase}
                onChange={(e) => setForm({ ...form, isBase: e.target.checked })}
                className="w-4 h-4 rounded bg-slate-900 border-slate-700" />
              <span>عملة أساسية</span>
            </label>
          </div>
          <div className="flex gap-2 pt-2">
            <button type="submit"
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4" />
              <span>{editingId ? 'تحديث' : 'إضافة'}</span>
            </button>
            <button type="button" onClick={resetForm}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5">
              <X className="w-4 h-4" />
              <span>إلغاء</span>
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {currencies.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Coins className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">لا توجد عملات بعد</p>
          </div>
        ) : (
          currencies.map((c) => (
            <div key={c.id}
              className={`bg-slate-800/60 border rounded-2xl p-3 ${
                c.isBase ? 'border-emerald-600/60 bg-emerald-950/10' : 'border-slate-700'
              }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{c.name}</span>
                    <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">{c.code}</span>
                    <span className="text-sm text-slate-300">{c.symbol}</span>
                    {c.isBase && (
                      <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> أساسية
                      </span>
                    )}
                    {!c.isActive && (
                      <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded">معطّلة</span>
                    )}
                  </div>
                  {!c.isBase && (
                    <div className="text-[11px] text-slate-400 mt-1 font-mono">
                      1 {c.code} = {c.rateAgainstBase} {settings.baseCurrency}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {!c.isBase && (
                    <button onClick={() => handleSetBase(c)}
                      className="text-[10px] bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-2 py-1 rounded-lg transition">
                      تعيين كأساسية
                    </button>
                  )}
                  <button onClick={() => handleEdit(c)}
                    className="p-2 text-sky-400 hover:bg-sky-950/50 rounded-lg transition">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(c)}
                    className="p-2 text-rose-400 hover:bg-rose-950/50 rounded-lg transition">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
