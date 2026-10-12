import React, { useState } from 'react';
import { useAppData } from '../contexts/AppDataContext';
import { warehouseService } from '../services/warehouseService';
import { Warehouse } from '../types';

export const WarehousesPage: React.FC = () => {
  const { warehouses, refresh } = useAppData();
  const [form, setForm] = useState<Partial<Warehouse>>({ isActive: true, isDefault: false });
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      warehouseService.update(editingId, form);
    } else {
      warehouseService.create(form as any);
    }
    setForm({ isActive: true, isDefault: false });
    setEditingId(null);
    refresh();
  };

  const handleEdit = (w: Warehouse) => {
    setForm(w);
    setEditingId(w.id);
  };

  const handleDelete = (id: string) => {
    if (confirm('هل أنت متأكد من حذف المخزن؟')) {
      warehouseService.remove(id);
      refresh();
    }
  };

  return (
    <div dir="rtl" className="p-6">
      <h1 className="text-2xl font-bold mb-4">🏬 إدارة المخازن</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-8 bg-gray-50 p-4 rounded">
        <input className="border p-2 rounded" placeholder="كود المخزن"
          value={form.code || ''} onChange={e => setForm({...form, code: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="اسم المخزن"
          value={form.name || ''} onChange={e => setForm({...form, name: e.target.value})} required />
        <input className="border p-2 rounded" placeholder="الموقع"
          value={form.location || ''} onChange={e => setForm({...form, location: e.target.value})} />
        <input className="border p-2 rounded" placeholder="اسم المسؤول"
          value={form.manager || ''} onChange={e => setForm({...form, manager: e.target.value})} />
        <input className="border p-2 rounded" placeholder="الهاتف"
          value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.isActive}
            onChange={e => setForm({...form, isActive: e.target.checked})} />
          نشط
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.isDefault}
            onChange={e => setForm({...form, isDefault: e.target.checked})} />
          المخزن الافتراضي
        </label>
        <button type="submit" className="bg-blue-600 text-white p-2 rounded col-span-2">
          {editingId ? '💾 تحديث' : '➕ إضافة'}
        </button>
      </form>

      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">الكود</th>
            <th className="border p-2">الاسم</th>
            <th className="border p-2">الموقع</th>
            <th className="border p-2">الحالة</th>
            <th className="border p-2">إجراءات</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(w => (
            <tr key={w.id} className={w.isDefault ? 'bg-yellow-50' : ''}>
              <td className="border p-2">{w.code}</td>
              <td className="border p-2">{w.name} {w.isDefault && '⭐'}</td>
              <td className="border p-2">{w.location}</td>
              <td className="border p-2">{w.isActive ? '✅' : '❌'}</td>
              <td className="border p-2">
                <button onClick={() => handleEdit(w)} className="text-blue-600 mx-1">تعديل</button>
                <button onClick={() => handleDelete(w.id)} className="text-red-600 mx-1">حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
