// ============ أنواع المخازن ============
export interface Warehouse {
  id: string;
  code: string;              // كود المخزن (مثل WH-001)
  name: string;              // اسم المخزن
  location: string;          // الموقع الجغرافي
  manager?: string;          // اسم المسؤول
  phone?: string;            // هاتف المسؤول
  isActive: boolean;         // هل المخزن نشط
  isDefault: boolean;        // هل هو المخزن الافتراضي
  notes?: string;
  createdAt: string;         // ISO date
  updatedAt: string;
}

// ============ أنواع العملات ============
export interface Currency {
  id: string;
  code: string;              // كود العملة ISO 4217 (USD, YER, SAR)
  name: string;              // الاسم بالعربية
  nameEn: string;            // الاسم بالإنجليزية
  symbol: string;            // الرمز ($, ﷼, YR)
  decimals: number;          // عدد المنازل العشرية (عادة 2)
  isBase: boolean;           // هل هي العملة الأساسية للنظام
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ أنواع أسعار الصرف ============
export interface ExchangeRate {
  id: string;
  currencyId: string;        // العملة المراد تحويلها
  baseCurrencyId: string;    // العملة الأساسية (عادة العملة الأساسية للنظام)
  rate: number;              // 1 من العملة = rate من العملة الأساسية
  buyRate?: number;          // سعر الشراء (اختياري)
  sellRate?: number;         // سعر البيع (اختياري)
  effectiveDate: string;     // تاريخ سريان السعر
  source?: string;           // مصدر السعر (يدوي، API، بنك)
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============ ربط الأصناف بالمخازن ============
export interface StockLevel {
  id: string;
  productId: string;         // معرف الصنف
  warehouseId: string;       // معرف المخزن
  quantity: number;          // الكمية المتوفرة
  reservedQty: number;       // الكمية المحجوزة
  minQty: number;            // حد الطلب الأدنى
  maxQty: number;            // الحد الأعلى
  costPrice: number;         // تكلفة الشراء
  sellPrice: number;         // سعر البيع
  currencyId: string;        // عملة التسعير
  updatedAt: string;
}
