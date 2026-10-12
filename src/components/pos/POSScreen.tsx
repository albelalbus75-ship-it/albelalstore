import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Barcode, RotateCcw, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Product, SaleInvoice } from '../../types';
import { BarcodeScannerModal } from './BarcodeScannerModal';
import { ThermalReceipt } from './ThermalReceipt';
import { CartDrawer } from './CartDrawer';
import { HeroBanner } from './HeroBanner';
import { CategoryStrip } from './CategoryStrip';
import { ProductCard } from './ProductCard';
import { SearchBar } from '../common/SearchBar';
import { posAudio } from '../../utils/audio';
import { normalizeArabicText } from '../../utils/arabic';

export const POSScreen: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    clearCart,
    selectedCustomerId,
    setSelectedCustomerId,
    salePriceTier,
    setSalePriceTier,
    processSale,
    lastInvoice,
    settings,
    isCartOpen,
    setIsCartOpen,
  } = useStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isReturnMode, setIsReturnMode] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState<SaleInvoice | null>(lastInvoice);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // اختصار / أو F2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        (e.key === '/' || e.key === 'F2') &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
        searchInputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // الفئات
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => { if (p.category) set.add(p.category); });
    return ['all', ...Array.from(set)];
  }, [products]);

  // الفلترة
  const filteredProducts = useMemo(() => {
    const query = normalizeArabicText(searchQuery);
    return products.filter((p) => {
      if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
      if (!query) return true;
      const nameNorm = normalizeArabicText(p.name);
      const codeNorm = normalizeArabicText(p.code);
      const barcodeNorm = p.barcode.toLowerCase();
      const catNorm = normalizeArabicText(p.category);
      if (nameNorm.includes(query) || barcodeNorm.includes(query) || codeNorm.includes(query) || catNorm.includes(query)) return true;
      return p.packagings?.some((pkg) => {
        const pkgBarcode = pkg.barcode.toLowerCase();
        const pkgName = normalizeArabicText(pkg.name);
        return pkgBarcode.includes(query) || pkgName.includes(query);
      });
    });
  }, [products, selectedCategory, searchQuery]);

  // Enter = إضافة سريعة
  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') { setSearchQuery(''); return; }
    if (e.key === 'Enter') {
      e.preventDefault();
      const rawQuery = searchQuery.trim();
      if (!rawQuery) return;
      const directMatch = products.find((p) => p.barcode === rawQuery);
      if (directMatch) { addToCart(directMatch, undefined, 1, isReturnMode); setSearchQuery(''); return; }
      for (const p of products) {
        const pkg = p.packagings?.find((pk) => pk.barcode === rawQuery);
        if (pkg) { addToCart(p, pkg.id, 1, isReturnMode); setSearchQuery(''); return; }
      }
      if (filteredProducts.length >= 1) {
        addToCart(filteredProducts[0], undefined, 1, isReturnMode);
        setSearchQuery('');
      }
    }
  };

  const handleProductClick = (product: Product) => {
    addToCart(product, undefined, 1, isReturnMode);
  };

  const handleBarcodeScanned = (barcode: string) => {
    const directProd = products.find((p) => p.barcode === barcode);
    if (directProd) { addToCart(directProd, undefined, 1, isReturnMode); return; }
    for (const p of products) {
      const pkg = p.packagings.find((pk) => pk.barcode === barcode);
      if (pkg) { addToCart(p, pkg.id, 1, isReturnMode); return; }
    }
    posAudio.playErrorBuzz();
    alert(`لم يتم العثور على منتج بالباركود: ${barcode}`);
  };

  const handleCheckout = (paymentMethod: any, paidAmount: number, notes?: string) => {
    const inv = processSale(paymentMethod, paidAmount, notes);
    if (inv) {
      setActiveReceipt(inv);
      setIsCartOpen(false);
      setIsReceiptOpen(true);
    }
  };

  // حساب الإجمالي للشريط السفلي في الجوال
  const netTotal = useMemo(() => {
    const subtotal = cart.reduce((acc, it) => acc + it.subtotal * (it.isReturn ? -1 : 1), 0);
    const taxAmount = settings.isTaxEnabled && subtotal > 0 ? Number((subtotal * settings.taxRate).toFixed(2)) : 0;
    return Math.max(0, Number((subtotal + taxAmount).toFixed(2)));
  }, [cart, settings]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 pb-32" dir="rtl">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Search + Barcode + Toggles */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex-1 min-w-[200px]">
          <SearchBar
            ref={searchInputRef}
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => searchInputRef.current?.focus()}
            placeholder="ابحث عن منتج... [/ أو F2]"
            resultCount={searchQuery ? filteredProducts.length : undefined}
          />
        </div>

        {/* Barcode */}
        <button
          onClick={() => setIsScannerOpen(true)}
          className="flex items-center gap-1.5 px-3 py-3 bg-obsidian-900 hover:bg-obsidian-800 text-gold-400 border border-gold-700/30 rounded-2xl text-xs font-bold transition active:scale-95"
          title="مسح باركود"
        >
          <Barcode className="w-4 h-4" />
        </button>

        {/* Toggle تجزئة/جملة */}
        <div className="flex items-center bg-obsidian-900/80 p-0.5 rounded-2xl border border-gold-700/30 text-xs">
          <button
            onClick={() => setSalePriceTier('retail')}
            className={`px-2.5 py-2 rounded-xl font-bold transition ${
              salePriceTier === 'retail' ? 'bg-gradient-to-br from-gold-500 to-gold-700 text-obsidian-950' : 'text-slate-400 hover:text-white'
            }`}
          >تجزئة</button>
          <button
            onClick={() => setSalePriceTier('wholesale')}
            className={`px-2.5 py-2 rounded-xl font-bold transition ${
              salePriceTier === 'wholesale' ? 'bg-gradient-to-br from-gold-500 to-gold-700 text-obsidian-950' : 'text-slate-400 hover:text-white'
            }`}
          >جملة</button>
        </div>

        {/* Toggle إرجاع */}
        <button
          onClick={() => setIsReturnMode(!isReturnMode)}
          className={`flex items-center gap-1 px-3 py-3 rounded-2xl text-xs font-bold border transition active:scale-95 ${
            isReturnMode
              ? 'bg-rose-950/80 border-rose-600 text-rose-300'
              : 'bg-obsidian-900 border-gold-700/30 text-slate-400 hover:text-white'
          }`}
          title="وضع الإرجاع"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{isReturnMode ? 'إرجاع' : 'إرجاع/استبدال'}</span>
        </button>
      </div>

      {/* Category Strip */}
      <CategoryStrip
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Section: الأكثر مبيعاً (اختياري - أول 4 منتجات) */}
      {!searchQuery && selectedCategory === 'all' && filteredProducts.length > 4 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-bold gold-text">الأكثر مبيعاً</h3>
            <button onClick={() => setSelectedCategory('all')} className="text-[10px] text-gold-400">عرض الكل ›</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {filteredProducts.slice(0, 4).map((p) => (
              <div key={`top-${p.id}`} className="flex-shrink-0 w-32 bg-obsidian-900/60 border border-gold-700/20 rounded-xl p-2">
                <div className="aspect-square bg-obsidian-800 rounded-lg flex items-center justify-center mb-1.5 overflow-hidden">
                  {p.imageUrl ? (
                    <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-3xl opacity-30">📦</span>
                  )}
                </div>
                <h5 className="text-[10px] font-bold text-white truncate">{p.name}</h5>
                <span className="text-xs font-black gold-text font-mono">{p.sellingPrice}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div>
        <h3 className="text-sm font-bold gold-text mb-2">
          {searchQuery ? `نتائج البحث (${filteredProducts.length})` : 'جميع المنتجات'}
        </h3>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 text-slate-500">
            <ShoppingBag className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="text-xs">لا توجد منتجات مطابقة</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onClick={() => handleProductClick(p)}
                onPackagingClick={(pkgId) => addToCart(p, pkgId, 1, isReturnMode)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Floating Cart Bar (Mobile) */}
      {cart.length > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-20 left-3 right-3 z-30 gold-btn p-3 rounded-2xl shadow-2xl flex items-center justify-between"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-obsidian-950/30 flex items-center justify-center relative">
              <ShoppingBag className="w-5 h-5 text-obsidian-950" />
              <span className="absolute -top-1 -right-1 bg-rose-600 text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-black block text-obsidian-950">{cart.length} أصناف</span>
              <span className="text-[11px] font-mono font-bold text-obsidian-950">{netTotal.toFixed(2)} {settings.baseCurrency}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-obsidian-950 text-gold-400 px-3 py-2 rounded-xl font-black text-xs">
            <span>عرض السلة</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </div>
        </button>
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      {/* Barcode Scanner */}
      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanned={handleBarcodeScanned}
      />

      {/* Thermal Receipt */}
      <ThermalReceipt
        invoice={activeReceipt}
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        settings={settings}
      />
    </div>
  );
};
