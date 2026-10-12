import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Star, MapPin, Phone, User, Warehouse as WarehouseIcon, Check, X } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { posAudio } from '../../utils/audio';
import { Warehouse } from '../../types';

export const WarehousesTab: React.FC = () => {
  const { warehouses, addWarehouse, updateWarehouse, deleteWarehouse, activeWarehouseId, setActiveWarehouseId } = useStore();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    code: '', name: '', location: '', manager: '', phone: '', notes: '',
    isActive: true, isDefault: false,
  });

  const resetForm = () => {
    setForm({ code: '', name: '', location: '', manager: '', phone: '', notes: '', isActive: true, isDefault: false });
    setEditingId(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.code.trim()) {
      posAudio.playErrorBuzz();
      alert('يجب إدخال كود واسم المخزن');
      return;
    }
    if (editingId) {
      updateWarehouse(editingId, form);
    } else {
      addWarehouse(form as Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt'>);
    }
    resetForm();
  };

  const handleEdit = (w: Warehouse) => {
    setForm({
      code: w.code, name: w.name, location: w.location || '',
      manager: w.manager || '', phone: w.phone || '', notes: w.notes || '',
      isActive: w.isActive, isDefault: w.isDefault,
    });
    setEditingId(w.id);
    setIsFormOpen(true);
  };

  const handleDelete = (w: Warehouse) => {
    if (confirm(`هل أنت متأكد من حذف المخزن "${w.name}"؟`)) {
      deleteWarehouse(w.id);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-white">إدارة المخازن</h3>
          <p className="text-xs text-slate-400">إجمالي {warehouses.length} مخزن</p>
        </div>
        <button
          onClick={() => { resetForm(); setIsFormOpen(true); }}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>مخزن جديد</span>
        </button>
      </div>

      {/* Form */}
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-300 block mb-1">كود المخزن *</label>
              <input type="text" required value={form.code}
                onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                placeholder="W-001"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">اسم المخزن *</label>
              <input type="text" required value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="المخزن الرئيسي"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">الموقع</label>
              <input type="text" value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="الصالة الرئيسية"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">المسؤول</label>
              <input type="text" value={form.manager}
                onChange={(e) => setForm({ ...form, manager: e.target.value })}
                placeholder="اسم المسؤول"
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
            </div>
            <div>
              <label className="text-xs text-slate-300 block mb-1">الهاتف</label>
              <input type="text" value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono focus:outline-none" />
            </div>
            <div className="flex items-center gap-4 pt-6">
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700" />
                <span>نشط</span>
              </label>
              <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
                <input type="checkbox" checked={form.isDefault}
                  onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
                  className="w-4 h-4 rounded bg-slate-900 border-slate-700" />
                <span>افتراضي</span>
              </label>
            </div>
          </div>
          <div>
            <label className="text-xs text-slate-300 block mb-1">ملاحظات</label>
            <input type="text" value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
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

      {/* List */}
      <div className="space-y-2">
        {warehouses.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <WarehouseIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">لا توجد مخازن بعد</p>
          </div>
        ) : (
          warehouses.map((w) => (
            <div key={w.id}
              className={`bg-slate-800/60 border rounded-2xl p-3 transition ${
                w.isDefault ? 'border-amber-600/60 bg-amber-950/10' : 'border-slate-700'
              } ${activeWarehouseId === w.id ? 'ring-2 ring-emerald-500/50' : ''}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-white text-sm">{w.name}</span>
                    <span className="text-[10px] bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded font-mono">{w.code}</span>
                    {w.isDefault && (
                      <span className="text-[10px] bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> افتراضي
                      </span>
                    )}
                    {!w.isActive && (
                      <span className="text-[10px] bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded">معطّل</span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400 flex-wrap">
                    {w.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{w.location}</span>}
                    {w.manager && <span className="flex items-center gap-1"><User className="w-3 h-3" />{w.manager}</span>}
                    {w.phone && <span className="flex items-center gap-1 font-mono"><Phone className="w-3 h-3" />{w.phone}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {activeWarehouseId !== w.id && w.isActive && (
                    <button onClick={() => setActiveWarehouseId(w.id)}
                      className="text-[10px] bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 px-2 py-1 rounded-lg transition"
                      title="تعيين كمخزن نشط">
                      تعيين
                    </button>
                  )}
                  <button onClick={() => handleEdit(w)}
                    className="p-2 text-sky-400 hover:bg-sky-950/50 rounded-lg transition" title="تعديل">
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={() => handleDelete(w)}
                    className="p-2 text-rose-400 hover:bg-rose-950/50 rounded-lg transition" title="حذف">
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
