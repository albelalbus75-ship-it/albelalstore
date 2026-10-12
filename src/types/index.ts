// ============================================================
// أنواع المخازن
// ============================================================
export interface Warehouse {
  id: string;
  code: string;
  name: string;
  location: string;
  manager?: string;
  phone?: string;
  isActive: boolean;
  isDefault: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// أنواع العملات
// ============================================================
export interface Currency {
  id: string;
  code: string;
  name: string;
  nameEn?: string;
  symbol: string;
  decimals?: number;
  rateAgainstBase: number;   // ✅ مستخدم في بياناتك الحالية
  isBase: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ============================================================
// أنواع أسعار الصرف
// ============================================================
export interface ExchangeRate {
  id: string;
  currencyId: string;
  baseCurrencyId: string;
  rate: number;
  buyRate?: number;
  sellRate?: number;
  effectiveDate: string;
  source?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================================
// ربط الأصناف بالمخازن
// ============================================================
export interface StockLevel {
  id: string;
  productId: string;
  warehouseId: string;
  quantity: number;
  reservedQty: number;
  minQty: number;
  maxQty: number;
  costPrice: number;
  sellPrice: number;
  currencyId: string;
  updatedAt: string;
}

// ============================================================
// الأنواع الأخرى (كما هي عندك، لم أعدّلها)
// ============================================================
export type PaymentMethod = 'cash' | 'bank' | 'wallet' | 'credit';

export interface Packaging {
  id: string;
  name: string;
  barcode: string;
  conversionFactor: number;
  sellingPrice: number;
  wholesalePrice: number;
  costPrice: number;
}

export interface Product {
  id: string;
  name: string;
  code: string;
  barcode: string;
  category: string;
  baseUnit: string;
  costPrice: number;
  sellingPrice: number;
  wholesalePrice: number;
  stockQuantity: number;
  minStockAlert: number;
  isWeighted: boolean;
  warehouseStocks: Record<string, number>;
  packagings: Packaging[];
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  taxNumber?: string;
  balances: Record<string, number>;
  creditLimit: number;
  priceTier: 'retail' | 'wholesale';
  notes?: string;
}

export interface Supplier {
  id: string;
  name: string;
  company?: string;
  phone: string;
  taxNumber?: string;
  balance: number;
  currency: string;
  notes?: string;
}

export interface TreasuryAccount {
  id: string;
  name: string;
  type: 'cash' | 'bank' | 'wallet';
  currency: string;
  balance: number;
  accountNumber?: string;
}

export interface StoreSettings {
  storeName: string;
  activity: string;
  phone: string;
  address: string;
  taxNumber: string;
  taxRate: number;
  isTaxEnabled: boolean;
  baseCurrency: string;
  receiptFooterMessage: string;
  allowNegativeStock: boolean;
  printPaperSize: string;
  cloudSyncEnabled: boolean;
  lastSyncTime: string;
}

export interface UserStaff {
  id: string;
  name: string;
  role: 'owner' | 'manager' | 'cashier';
  pin: string;
  phone: string;
  active: boolean;
}

export interface SaleItem {
  productId: string;
  productName: string;
  barcode: string;
  packagingId?: string;
  unitName: string;
  conversionFactor: number;
  quantity: number;
  isWeighted?: boolean;
  unitPrice: number;
  costPrice: number;
  discount: number;
  subtotal: number;
  isReturn?: boolean;
}

export interface SaleInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  type: 'sale' | 'return' | 'exchange';
  customerId?: string;
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  taxAmount: number;
  total: number;
  paidAmount: number;
  remainingAmount: number;
  paymentMethod: PaymentMethod;
  currency: string;
  warehouseId: string;
  cashierName: string;
  notes?: string;
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  unitCost: number;
  total: number;
}

export interface PurchaseInvoice {
  id: string;
  invoiceNumber: string;
  date: string;
  supplierId: string;
  supplierName: string;
  items: PurchaseItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
  paidAmount: number;
  remainingAmount: number;
  warehouseId: string;
  paymentMethod: PaymentMethod;
  currency: string;
  notes?: string;
}

export interface StockTransfer {
  id: string;
  transferNumber: string;
  date: string;
  fromWarehouseId: string;
  toWarehouseId: string;
  items: { productId: string; productName: string; quantity: number; unit: string }[];
  status: 'pending' | 'in_transit' | 'received' | 'cancelled';
  notes?: string;
  createdByName: string;
}

export interface Voucher {
  id: string;
  voucherNumber: string;
  type: 'receipt' | 'payment';
  date: string;
  partyType: 'customer' | 'supplier';
  partyId: string;
  partyName: string;
  amount: number;
  currency: string;
  treasuryAccountId: string;
  notes?: string;
  createdByName: string;
}

export interface JournalLine {
  accountId: string;
  accountName: string;
  debit: number;
  credit: number;
}

export interface JournalEntry {
  id: string;
  entryNumber: string;
  date: string;
  description: string;
  lines: JournalLine[];
}

export interface DailyClosing {
  id: string;
  closingNumber: string;
  date: string;
  shiftStartTime: string;
  shiftEndTime: string;
  cashierName: string;
  openingCash: number;
  totalCashSales: number;
  totalCreditSales: number;
  totalBankSales: number;
  totalReturns: number;
  totalCashCollected: number;
  totalCashExpenses: number;
  expectedCash: number;
  actualCashCount: number;
  cashDifference: number;
  billDenominations: Record<string, number>;
  isClosed: boolean;
  notes?: string;
}
