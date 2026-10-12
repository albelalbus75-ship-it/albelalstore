import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { currencyService } from '../services/currencyService';
import { Currency } from '../types';

export const CurrenciesPage: React.FC = () => {
  const { currencies, refresh } = useAppData();
  const [form, setForm] = useState<Partial<Currency>>({ isActive: true, isBase: false, decimals: 2 });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) currencyService.update(editingId, form);
    else currencyService.create(form as any);
    setForm({ isActive: true, isBase: false, decimals: 2 });
    setEditingId(null);
    refresh();
  };

  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-2xl font-bold mb-4">💱 إدارة العملات</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded">
        <input className="border p-2 rounded" placeholder="الكود (USD)"
          value={form.code || ''} onChange={e => setForm({...form, code: e.target.value.toUpperCase()})} required />
        <input className="border p-2 rounded" placeholder="الاسم بالعربية"
          value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="الاسم بالإنجليزية"
          value={form.nameEn || ''} onChange={e => setForm({...form, nameEn: e.target.value})} />
        <input className="border p-2 rounded" placeholder="الرمز ($)"
          value={form.symbol || ''} onChange={e => setForm({...form, symbol: e.target.value})} />
        <input className="border p-2 rounded" type="number" placeholder="المنازل العشرية"
          value={form.decimals ?? 2} onChange={e => setForm({...form, decimals: +e.target.value})} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.isBase}
            onChange={e => setForm({...form, isBase: e.target.checked})} />
          عملة أساسية
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-3">
          {editingId ? '💾 تحديث' : '➕ إضافة'}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">الكود</th>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الرمز</th>
            <th className="border p-2">أساسية</th>
            <th className="border p-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map(c => (
            <tr key={c.id} className={c.isBase ? 'bg-green-50' : ''}>
              <td className="border p-2">{c.code}</td>
              <td className="border p-2">{c.name} {c.isBase && '🏦'}</td>
              <td className="border p-2">{c.symbol}</td>
              <td className="border p-2">{c.isBase ? '✅' : '—'}</td>
              <td className="border p-2">
                <button onClick={() => { setForm(c); setEditingId(c.id); }} className="text-blue-600 mx-1">تعديل</button>
                <button onClick={() => { if (confirm('حذف؟')) { currencyService.remove(c.id); refresh(); } }}
                  className="text-red-600 mx-1">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
