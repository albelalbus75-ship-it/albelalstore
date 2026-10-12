import { Warehouse } from '../types';

const STORAGE_KEY = 'albelal_warehouses';

const generateId = () => `wh_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
const now = () => new Date().toISOString();

export const warehouseService = {
  getAll(): Warehouse[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  },

  getById(id: string): Warehouse | undefined {
    return this.getAll().find(w => w.id === id);
  },

  create(data: Omit<Warehouse, 'id' | 'createdAt' | 'updatedAt'>): Warehouse {
    const all = this.getAll();
    const isFirst = all.length === 0;
    const item: Warehouse = {
      ...data,
      id: generateId(),
      isDefault: data.isDefault || isFirst,
      createdAt: now(),
      updatedAt: now(),
    };
    if (item.isDefault) {
      all.forEach(w => (w.isDefault = false));
    }
    all.push(item);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return item;
  },

  update(id: string, data: Partial<Warehouse>): Warehouse | null {
    const all = this.getAll();
    const idx = all.findIndex(w => w.id === id);
    if (idx === -1) return null;
    if (data.isDefault) {
      all.forEach(w => (w.isDefault = false));
    }
    all[idx] = { ...all[idx], ...data, id, updatedAt: now() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return all[idx];
  },

  remove(id: string): boolean {
    const all = this.getAll().filter(w => w.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
    return true;
  },

  getDefault(): Warehouse | undefined {
    return this.getAll().find(w => w.isDefault);
  },
};
