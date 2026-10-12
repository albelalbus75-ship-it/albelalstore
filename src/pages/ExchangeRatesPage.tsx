import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { exchangeRateService } from '../services/exchangeRateService';

export const ExchangeRatesPage: React.FC = () => {
  const { currencies, exchangeRates, refresh } = useAppData();
  const [currencyId, setCurrencyId] = useState('');
  const [rate, setRate] = useState<number>(0);
  const [effectiveDate, setEffectiveDate] = useState(new Date().toISOString().slice(0, 10));

  const base = currencies.find(c => c.isBase);
  const others = currencies.filter(c => !c.isBase);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!base || !currencyId) return;
    exchangeRateService.create({
      currencyId,
      baseCurrencyId: base.id,
      rate,
      effectiveDate,
      isActive: true,
      source: 'يدوي',
    });
    setRate(0);
    refresh();
  };

  // اختبار التحويل السريع
  const [testAmount, setTestAmount] = useState(100);
  const [testFrom, setTestFrom] = useState('');
  const [testTo, setTestTo] = useState('');

  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-2xl font-bold mb-4">📈 أسعار الصرف</h1>
      {base && <p className="mb-4">العملة الأساسية: <strong>{base.name} ({base.code})</strong></p>}

      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 p-4 rounded">
        <select className="border p-2 rounded" value={currencyId}
          onChange={e => setCurrencyId(e.target.value)} required>
          <option value="">اختر العملة</option>
          {others.map(c => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
        </select>
        <input type="number" step="0.0001" className="border p-2 rounded"
          placeholder="سعر الصرف" value={rate}
          onChange={e => setRate(+e.target.value)} required />
        <input type="date" className="border p-2 rounded"
          value={effectiveDate} onChange={e => setEffectiveDate(e.target.value)} />
        <button className="bg-blue-600 text-white p-2 rounded col-span-3">➕ إضافة سعر</button>
      </form>

      <table className="w-full border-collapse mb-8">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">العملة</th>
            <th className="border p-2">السعر</th>
            <th className="border p-2">التاريخ</th>
            <th className="border p-2">الحالة</th>
          </tr>
        </thead>
        <tbody>
          {exchangeRates.map(r => {
            const c = currencies.find(x => x.id === r.currencyId);
            return (
              <tr key={r.id}>
                <td className="border p-2">{c?.name} ({c?.code})</td>
                <td className="border p-2">{r.rate}</td>
                <td className="border p-2">{r.effectiveDate}</td>
                <td className="border p-2">{r.isActive ? '✅ ساري' : '⏸️ منتهي'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* اختبار التحويل */}
      <div className="bg-blue-50 p-4 rounded">
        <h2 className="font-bold mb-2">🧮 اختبار التحويل</h2>
        <div className="flex gap-2 items-center">
          <input type="number" className="border p-2 rounded w-32"
            value={testAmount} onChange={e => setTestAmount(+e.target.value)} />
          <select className="border p-2 rounded" value={testFrom} onChange={e => setTestFrom(e.target.value)}>
            <option value="">من</option>
            {currencies.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
          </select>
          <span>→</span>
          <select className="border p-2 rounded" value={testTo} onChange={e => setTestTo(e.target.value)}>
            <option value="">إلى</option>
            {currencies.map(c => <option key={c.id} value={c.id}>{c.code}</option>)}
          </select>
          {testFrom && testTo && (
            <strong className="text-green-700">
              = {exchangeRateService.convert(testAmount, testFrom, testTo)}
            </strong>
          )}
        </div>
      </div>
    </div>
  );
};
