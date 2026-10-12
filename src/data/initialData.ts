import {
  Product,
  Warehouse,
  Customer,
  Supplier,
  TreasuryAccount,
  Currency,
  ExchangeRate,
  StoreSettings,
  UserStaff,
  SaleInvoice,
  JournalEntry,
} from '../types';

// ============================================================
// الإعدادات
// ============================================================
export const initialSettings: StoreSettings = {
  storeName: 'متجر البيت العصري | إلكترونيات وهدايا ومفروشات',
  activity: 'أدوات منزلية · إلكترونيات · مفروشات · هدايا وألعاب',
  phone: '0551234567',
  address: 'الرياض - طريق الملك عبد العزيز - مجمع الواحة التجاري',
  taxNumber: '310123456700003',
  taxRate: 0.15,
  isTaxEnabled: true,
  baseCurrency: 'SAR',
  receiptFooterMessage: 'شكراً لزيارتكم متجر البيت العصري! البضاعة المباعة ترد وتستبدل خلال 7 أيام بموجب الفاتورة الأصلية',
  allowNegativeStock: false,
  printPaperSize: '80mm',
  cloudSyncEnabled: true,
  lastSyncTime: new Date().toISOString(),
};

// ============================================================
// المخازن
// ============================================================
const ts = new Date().toISOString();

export const initialWarehouses: Warehouse[] = [
  {
    id: 'w1',
    name: 'المعرض الرئيسي (صالة العرض)',
    code: 'W-SHOWROOM',
    location: 'الصالة الرئيسية',
    isActive: true,
    isDefault: true,
    createdAt: ts,
    updatedAt: ts,
  },
  {
    id: 'w2',
    name: 'مستودع البضائع المركزي',
    code: 'W-CENTRAL',
    location: 'المستودع الرئيسي الخلفي',
    isActive: true,
    isDefault: false,
    createdAt: ts,
    updatedAt: ts,
  },
  {
    id: 'w3',
    name: 'مستودع التجهيز والشحن',
    code: 'W-DISPATCH',
    location: 'قسم الطلبات والتجهيز',
    isActive: true,
    isDefault: false,
    createdAt: ts,
    updatedAt: ts,
  },
];

// ============================================================
// الموظفون
// ============================================================
export const initialStaff: UserStaff[] = [
  { id: 'u1', name: 'أبو أحمد (المالك)', role: 'owner', pin: '1111', phone: '0551111111', active: true },
  { id: 'u2', name: 'سارة - مديرة المعرض', role: 'manager', pin: '2222', phone: '0552222222', active: true },
  { id: 'u3', name: 'محمد الكاشير', role: 'cashier', pin: '1234', phone: '0553333333', active: true },
];

// ============================================================
// العملات
// ============================================================
export const initialCurrencies: Currency[] = [
  { id: 'cur-sar', code: 'SAR', name: 'ريال سعودي', nameEn: 'Saudi Riyal', symbol: 'ر.س', decimals: 2, rateAgainstBase: 1, isBase: true, isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'cur-usd', code: 'USD', name: 'دولار أمريكي', nameEn: 'US Dollar', symbol: '$', decimals: 2, rateAgainstBase: 3.75, isBase: false, isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'cur-aed', code: 'AED', name: 'درهم إماراتي', nameEn: 'UAE Dirham', symbol: 'د.إ', decimals: 2, rateAgainstBase: 1.02, isBase: false, isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'cur-egp', code: 'EGP', name: 'جنيه مصري', nameEn: 'Egyptian Pound', symbol: 'ج.م', decimals: 2, rateAgainstBase: 0.076, isBase: false, isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'cur-kwd', code: 'KWD', name: 'دينار كويتي', nameEn: 'Kuwaiti Dinar', symbol: 'د.ك', decimals: 3, rateAgainstBase: 12.2, isBase: false, isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'cur-yer', code: 'YER', name: 'ريال يمني', nameEn: 'Yemeni Rial', symbol: 'ر.ي', decimals: 2, rateAgainstBase: 0.0147, isBase: false, isActive: true, createdAt: ts, updatedAt: ts },
];

// ============================================================
// أسعار الصرف
// ============================================================
export const initialExchangeRates: ExchangeRate[] = [
  { id: 'fx-usd-sar', currencyId: 'cur-usd', baseCurrencyId: 'cur-sar', rate: 3.75, buyRate: 3.74, sellRate: 3.76, effectiveDate: ts.split('T')[0], source: 'يدوي', isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'fx-aed-sar', currencyId: 'cur-aed', baseCurrencyId: 'cur-sar', rate: 1.02, effectiveDate: ts.split('T')[0], source: 'يدوي', isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'fx-egp-sar', currencyId: 'cur-egp', baseCurrencyId: 'cur-sar', rate: 0.076, effectiveDate: ts.split('T')[0], source: 'يدوي', isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'fx-kwd-sar', currencyId: 'cur-kwd', baseCurrencyId: 'cur-sar', rate: 12.2, effectiveDate: ts.split('T')[0], source: 'يدوي', isActive: true, createdAt: ts, updatedAt: ts },
  { id: 'fx-yer-sar', currencyId: 'cur-yer', baseCurrencyId: 'cur-sar', rate: 0.0147, effectiveDate: ts.split('T')[0], source: 'يدوي', isActive: true, createdAt: ts, updatedAt: ts },
];

// ============================================================
// الخزينة
// ============================================================
export const initialTreasuryAccounts: TreasuryAccount[] = [
  { id: 't1', name: 'صندوق الكاشير الرئيسي (نقدية)', type: 'cash', currency: 'SAR', balance: 4500 },
  { id: 't2', name: 'الحساب البنكي (مدى / شبكة)', type: 'bank', currency: 'SAR', balance: 42500, accountNumber: 'SA44800004561234' },
  { id: 't3', name: 'محفظة STC Pay / إلكترونية', type: 'wallet', currency: 'SAR', balance: 6800, accountNumber: '0551234567' },
  { id: 't4', name: 'خزينة العملات الأجنبية ($)', type: 'cash', currency: 'USD', balance: 1500 },
];

// ============================================================
// المنتجات
// ============================================================
export const initialProducts: Product[] = [
  { id: 'p1', name: 'طقم قدور جرانيت تركي 9 قطع غير لاصق', code: 'HOM-POTS-01', barcode: '628200100101', category: 'أدوات منزلية', baseUnit: 'piece', costPrice: 180, sellingPrice: 260, wholesalePrice: 220, stockQuantity: 35, minStockAlert: 5, isWeighted: false, warehouseStocks: { w1: 15, w2: 20, w3: 0 }, packagings: [{ id: 'pack-pots-1', name: 'كرتون جملة (3 أطقم)', barcode: '628200100102', conversionFactor: 3, sellingPrice: 720, wholesalePrice: 630, costPrice: 540 }] },
  { id: 'p2', name: 'قلاية هوائية فيليبس رقمية 4.1 لتر', code: 'HOM-AIRFRY-02', barcode: '628200100201', category: 'أدوات منزلية', baseUnit: 'piece', costPrice: 220, sellingPrice: 320, wholesalePrice: 280, stockQuantity: 24, minStockAlert: 4, isWeighted: false, warehouseStocks: { w1: 10, w2: 14, w3: 0 }, packagings: [] },
  { id: 'p3', name: 'طقم حافظات طعام زجاجية محكمة 5 قطع', code: 'HOM-BOXES-03', barcode: '628200100301', category: 'أدوات منزلية', baseUnit: 'piece', costPrice: 35, sellingPrice: 58, wholesalePrice: 48, stockQuantity: 65, minStockAlert: 10, isWeighted: false, warehouseStocks: { w1: 30, w2: 35, w3: 0 }, packagings: [{ id: 'pack-box-1', name: 'كرتون (6 أطقم)', barcode: '628200100302', conversionFactor: 6, sellingPrice: 310, wholesalePrice: 270, costPrice: 210 }] },
  { id: 'p4', name: 'طقم فناجين قهوة وشاي مذهب كلاسيك 12 قطعة', code: 'HOM-CUPS-04', barcode: '628200100401', category: 'أدوات منزلية', baseUnit: 'piece', costPrice: 45, sellingPrice: 79, wholesalePrice: 62, stockQuantity: 42, minStockAlert: 8, isWeighted: false, warehouseStocks: { w1: 20, w2: 22, w3: 0 }, packagings: [] },
  { id: 'p5', name: 'سماعة رأس بلوتوث لاسلكية عازلة للضوضاء P9', code: 'ELE-HEAD-01', barcode: '628300200101', category: 'إلكترونيات', baseUnit: 'piece', costPrice: 45, sellingPrice: 85, wholesalePrice: 65, stockQuantity: 55, minStockAlert: 10, isWeighted: false, warehouseStocks: { w1: 25, w2: 30, w3: 0 }, packagings: [{ id: 'pack-head-1', name: 'درزن (12 حبة)', barcode: '628300200102', conversionFactor: 12, sellingPrice: 900, wholesalePrice: 740, costPrice: 540 }] },
  { id: 'p6', name: 'شاحن جداري سريع أنكر 65W بتقنية GaN ثلاثي المنافذ', code: 'ELE-CHARG-02', barcode: '628300200201', category: 'إلكترونيات', baseUnit: 'piece', costPrice: 75, sellingPrice: 120, wholesalePrice: 98, stockQuantity: 40, minStockAlert: 8, isWeighted: false, warehouseStocks: { w1: 18, w2: 22, w3: 0 }, packagings: [] },
  { id: 'p7', name: 'بنك طاقة محمول 20,000 مللي أمبير مع شحن لاسلكي', code: 'ELE-POWER-03', barcode: '628300200301', category: 'إلكترونيات', baseUnit: 'piece', costPrice: 60, sellingPrice: 99, wholesalePrice: 80, stockQuantity: 38, minStockAlert: 6, isWeighted: false, warehouseStocks: { w1: 18, w2: 20, w3: 0 }, packagings: [] },
  { id: 'p8', name: 'ساعة ذكية ألترا بشاشة أموليد تدعم المكالمات', code: 'ELE-SMART-04', barcode: '628300200401', category: 'إلكترونيات', baseUnit: 'piece', costPrice: 70, sellingPrice: 135, wholesalePrice: 105, stockQuantity: 28, minStockAlert: 5, isWeighted: false, warehouseStocks: { w1: 12, w2: 16, w3: 0 }, packagings: [] },
  { id: 'p9', name: 'طقم شرشف سرير قطن مصري فاخر نفرين (4 قطع)', code: 'FUR-SHEET-01', barcode: '628400300101', category: 'مفروشات', baseUnit: 'piece', costPrice: 75, sellingPrice: 130, wholesalePrice: 105, stockQuantity: 32, minStockAlert: 6, isWeighted: false, warehouseStocks: { w1: 14, w2: 18, w3: 0 }, packagings: [] },
  { id: 'p10', name: 'لحاف سرير فندقي ملكي مزدوج 6 قطع بحشوة مايكروفايبر', code: 'FUR-COMF-02', barcode: '628400300201', category: 'مفروشات', baseUnit: 'piece', costPrice: 165, sellingPrice: 255, wholesalePrice: 210, stockQuantity: 18, minStockAlert: 4, isWeighted: false, warehouseStocks: { w1: 8, w2: 10, w3: 0 }, packagings: [] },
  { id: 'p11', name: 'وسادة نوم طبية ميموري فوم لدعم الرقبة والعمود الفقري', code: 'FUR-PILL-03', barcode: '628400300301', category: 'مفروشات', baseUnit: 'piece', costPrice: 38, sellingPrice: 68, wholesalePrice: 52, stockQuantity: 50, minStockAlert: 10, isWeighted: false, warehouseStocks: { w1: 22, w2: 28, w3: 0 }, packagings: [{ id: 'pack-pill-1', name: 'باكت مزدوج (حبتين)', barcode: '628400300302', conversionFactor: 2, sellingPrice: 120, wholesalePrice: 98, costPrice: 76 }] },
  { id: 'p12', name: 'بطانية شتوية مخملية دافئة حفر ليزر نفرين 5 كجم', code: 'FUR-BLANK-04', barcode: '628400300401', category: 'مفروشات', baseUnit: 'piece', costPrice: 95, sellingPrice: 160, wholesalePrice: 130, stockQuantity: 26, minStockAlert: 5, isWeighted: false, warehouseStocks: { w1: 12, w2: 14, w3: 0 }, packagings: [] },
  { id: 'p13', name: 'بوكس هدية ملكي فاخر (ساعة + عطر + محفظة + قلم مذهب)', code: 'GIFT-BOX-01', barcode: '628500400101', category: 'هدايا', baseUnit: 'piece', costPrice: 90, sellingPrice: 165, wholesalePrice: 130, stockQuantity: 25, minStockAlert: 5, isWeighted: false, warehouseStocks: { w1: 12, w2: 13, w3: 0 }, packagings: [] },
  { id: 'p14', name: 'مج حراري ذكي بشاشة ديجيتال لعرض درجة الحرارة 500 مل', code: 'GIFT-MUG-02', barcode: '628500400201', category: 'هدايا', baseUnit: 'piece', costPrice: 18, sellingPrice: 38, wholesalePrice: 28, stockQuantity: 70, minStockAlert: 15, isWeighted: false, warehouseStocks: { w1: 35, w2: 35, w3: 0 }, packagings: [{ id: 'pack-mug-1', name: 'كرتون هدايا (12 مج)', barcode: '628500400202', conversionFactor: 12, sellingPrice: 380, wholesalePrice: 300, costPrice: 216 }] },
  { id: 'p15', name: 'فواحة عطرية ألتراسونيك ديكورية مع إضاءة لهب دافئة LED', code: 'GIFT-DIFF-03', barcode: '628500400301', category: 'هدايا', baseUnit: 'piece', costPrice: 35, sellingPrice: 69, wholesalePrice: 52, stockQuantity: 36, minStockAlert: 6, isWeighted: false, warehouseStocks: { w1: 18, w2: 18, w3: 0 }, packagings: [] },
  { id: 'p16', name: 'لعبة روبوت ذكي تفاعلي للأطفال مع تحكم عن بعد', code: 'GIFT-TOY-04', barcode: '628500400401', category: 'هدايا', baseUnit: 'piece', costPrice: 45, sellingPrice: 85, wholesalePrice: 65, stockQuantity: 28, minStockAlert: 5, isWeighted: false, warehouseStocks: { w1: 14, w2: 14, w3: 0 }, packagings: [] },
];

// ============================================================
// العملاء
// ============================================================
export const initialCustomers: Customer[] = [
  { id: 'c1', name: 'معرض الأناقة للديكور والتجهيزات', phone: '0501234567', address: 'الرياض - حي العليا', taxNumber: '310998877600003', balances: { SAR: 2450, USD: 0 }, creditLimit: 8000, priceTier: 'wholesale', notes: 'عميل جملة دائم' },
  { id: 'c2', name: 'خالد بن عبد العزيز (حساب شخصي)', phone: '0567890123', address: 'حي الياسمين - فيلا 12', balances: { SAR: 420 }, creditLimit: 2000, priceTier: 'retail', notes: 'عميل دائم' },
  { id: 'c3', name: 'مؤسسة إبداع لتجهيز الحفلات والهدايا', phone: '0543216789', address: 'حي النرجس', balances: { SAR: 5800, USD: 250 }, creditLimit: 15000, priceTier: 'wholesale', notes: 'طلبات هدايا' },
  { id: 'c4', name: 'أم عبد الله (دفتر الحساب)', phone: '0559988776', address: 'حي الصحافة', balances: { SAR: 230 }, creditLimit: 1000, priceTier: 'retail', notes: 'مفروشات' },
];

// ============================================================
// الموردون
// ============================================================
export const initialSuppliers: Supplier[] = [
  { id: 's1', name: 'شركة الروائع للأدوات المنزلية والتجهيزات', company: 'مجموعة الروائع للتجارة الدولية', phone: '0112345678', taxNumber: '300012345600003', balance: 6400, currency: 'SAR', notes: 'مورد أواني الطهي' },
  { id: 's2', name: 'مؤسسة النجم الساطع للإلكترونيات الذكية', company: 'النجم الساطع للتقنية والملحقات', phone: '0119876543', taxNumber: '300098765400003', balance: 9800, currency: 'SAR', notes: 'وكيل الشواحن والسماعات' },
  { id: 's3', name: 'مصنع الفخامة للمفروشات والمنسوجات', company: 'الفخامة للمفارش والألحفة الفندقية', phone: '0115556677', taxNumber: '300055566600003', balance: 5300, currency: 'SAR', notes: 'مورد المفارش' },
  { id: 's4', name: 'شركة لمسات راقية لتوريد الهدايا والتحف', company: 'لمسات راقية للتوزيع', phone: '0505544332', balance: 3200, currency: 'SAR', notes: 'مورد الهدايا' },
];

// ============================================================
// الفواتير
// ============================================================
export const initialInvoices: SaleInvoice[] = [
  {
    id: 'inv-1001', invoiceNumber: 'INV-2026-001', date: new Date(Date.now() - 3600000 * 2).toISOString(),
    type: 'sale', customerId: 'c1', customerName: 'معرض الأناقة للديكور والتجهيزات',
    items: [
      { productId: 'p1', productName: 'طقم قدور جرانيت تركي 9 قطع غير لاصق', barcode: '628200100101', unitName: 'قطعة', conversionFactor: 1, quantity: 2, unitPrice: 220, costPrice: 180, discount: 0, subtotal: 440 },
      { productId: 'p13', productName: 'بوكس هدية ملكي فاخر', barcode: '628500400101', unitName: 'قطعة', conversionFactor: 1, quantity: 3, unitPrice: 125, costPrice: 90, discount: 0, subtotal: 375 },
    ],
    subtotal: 815, discount: 0, taxAmount: 122.25, total: 937.25, paidAmount: 0, remainingAmount: 937.25,
    paymentMethod: 'credit', currency: 'SAR', warehouseId: 'w1', cashierName: 'محمد الكاشير', notes: 'آجل على حساب المعرض',
  },
  {
    id: 'inv-1002', invoiceNumber: 'INV-2026-002', date: new Date(Date.now() - 3600000 * 1).toISOString(),
    type: 'sale', customerName: 'زبون نقدي',
    items: [
      { productId: 'p5', productName: 'سماعة رأس بلوتوث لاسلكية عازلة للضوضاء P9', barcode: '628300200101', unitName: 'قطعة', conversionFactor: 1, quantity: 1, unitPrice: 85, costPrice: 45, discount: 0, subtotal: 85 },
      { productId: 'p14', productName: 'مج حراري ذكي بشاشة ديجيتال 500 مل', barcode: '628500400201', unitName: 'قطعة', conversionFactor: 1, quantity: 1, unitPrice: 38, costPrice: 18, discount: 0, subtotal: 38 },
    ],
    subtotal: 123, discount: 5, taxAmount: 17.7, total: 135.7, paidAmount: 150, remainingAmount: 0,
    paymentMethod: 'cash', currency: 'SAR', warehouseId: 'w1', cashierName: 'محمد الكاشير',
  },
];

// ============================================================
// القيود المحاسبية
// ============================================================
export const initialJournalEntries: JournalEntry[] = [
  {
    id: 'je-1', entryNumber: 'JE-0001', date: new Date().toISOString(),
    description: 'قيد افتتاحي لرأس المال والمخزون والنقدية',
    lines: [
      { accountId: '101', accountName: 'الصندوق الرئيسي (كاش)', debit: 4500, credit: 0 },
      { accountId: '102', accountName: 'البنك (حساب جاري)', debit: 42500, credit: 0 },
      { accountId: '120', accountName: 'مخزون بضاعة أول المدة', debit: 38650, credit: 0 },
      { accountId: '130', accountName: 'مدينون (ديون العملاء)', debit: 8900, credit: 0 },
      { accountId: '201', accountName: 'دائنون (حسابات الموردين)', debit: 0, credit: 24700 },
      { accountId: '301', accountName: 'رأس المال وحقوق الملكية', debit: 0, credit: 69850 },
    ],
  },
];
