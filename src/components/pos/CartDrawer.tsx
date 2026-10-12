import React, { useState } from 'react';
import {
  X, Trash2, Plus, Minus, ShoppingBag, Banknote, CreditCard,
  Wallet, Check, User, ChevronDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { PaymentMethod } from '../../types';
import { posAudio } from '../../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: (paymentMethod: PaymentMethod, paidAmount: number, notes?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const {
    cart, updateCartItemQty, removeFromCart, clearCart,
    cartDiscount, setCartDiscount, customers,
    selectedCustomerId, setSelectedCustomerId, settings,
  } = useStore();

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash');
  const [paidAmount, setPaidAmount] = useState('');
  const [notes, setNotes] = useState('');

  const subtotal = cart.reduce((acc, it) => acc + it.subtotal * (it.isReturn ? -1 : 1), 0);
  const taxAmount = settings.isTaxEnabled && subtotal > 0 ? Number((subtotal * settings.taxRate).toFixed(2)) : 0;
  const netTotal = Math.max(0, Number((subtotal + taxAmount - cartDiscount).toFixed(2)));

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  const handleSubmit = () => {
    const paid = parseFloat(paidAmount) || netTotal;
    onCheckout(paymentMethod, paid, notes);
    setPaidAmount('');
    setNotes('');
    setPaymentMethod('cash');
    posAudio.playSuccessChime();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Drawer */}
      <div className="fixed top-0 left-0 bottom-0 z-50 w-full max-w-md bg-obsidian-950 border-r border-gold-700/30 flex flex-col" dir="rtl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gold-700/20">
          <h2 className="text-base font-black gold-text flex items-center gap-2">
            <ShoppingBag className="w-4 h-4 text-gold-400" />
            سلة البيع ({cart.length})
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-obsidian-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Customer */}
        <div className="p-4 border-b border-gold-700/20">
          <label className="text-xs text-gold-400 font-bold flex items-center gap-1.5 mb-2">
            <User className="w-3.5 h-3.5" /> العميل
          </label>
          <div className="relative">
            <select
              value={selectedCustomerId || ''}
              onChange={(e) => setSelectedCustomerId(e.target.value || null)}
              className="w-full bg-obsidian-900 border border-gold-700/30 text-white rounded-xl px-3 py-2 text-xs appearance-none focus:outline-none focus:border-gold-500"
            >
              <option value="">زبون نقدي عام</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — دين: {c.balances[settings.baseCurrency] || 0} {settings.baseCurrency}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-gold-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {selectedCustomer && (
            <div className="mt-2 text-[11px] bg-gold-950/40 border border-gold-800/60 p-2 rounded-xl flex justify-between text-slate-300">
              <span>دين سابق:</span>
              <span className="font-mono font-bold text-gold-300">
                {selectedCustomer.balances[settings.baseCurrency] || 0} {settings.baseCurrency}
              </span>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center py-16">
              <ShoppingBag className="w-12 h-12 mb-3 opacity-30" />
              <p className="text-xs">السلة فارغة</p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className={`p-3 rounded-2xl border ${
                item.isReturn ? 'bg-rose-950/20 border-rose-900/50' : 'bg-obsidian-900/60 border-gold-700/20'
              }`}>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex-1 min-w-0">
                    {item.isReturn && (
                      <span className="text-[9px] bg-rose-600 text-white px-1.5 py-0.5 rounded font-bold mb-1 inline-block">مرتجع</span>
                    )}
                    <h5 className="font-bold text-white text-xs truncate">{item.productName}</h5>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {item.unitPrice} {settings.baseCurrency} × {item.quantity}
                    </span>
                  </div>
                  <button onClick={() => removeFromCart(idx)} className="text-slate-400 hover:text-rose-400 p-1 shrink-0">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gold-700/20">
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateCartItemQty(idx, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 flex items-center justify-center text-white active:scale-95">
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-mono font-bold text-sm px-2 text-white min-w-[28px] text-center">{item.quantity}</span>
                    <button onClick={() => updateCartItemQty(idx, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-obsidian-800 hover:bg-obsidian-700 flex items-center justify-center text-white active:scale-95">
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <span className={`font-mono font-extrabold text-sm ${item.isReturn ? 'text-rose-400' : 'gold-text'}`}>
                    {item.subtotal} {settings.baseCurrency}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-gold-700/30 bg-obsidian-900/60 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>المجموع:</span>
              <span className="font-mono text-slate-200">{subtotal.toFixed(2)} {settings.baseCurrency}</span>
            </div>
            {settings.isTaxEnabled && (
              <div className="flex justify-between text-slate-400">
                <span>الضريبة:</span>
                <span className="font-mono text-slate-200">{taxAmount.toFixed(2)} {settings.baseCurrency}</span>
              </div>
            )}
            <div className="flex justify-between items-center pt-2 border-t border-gold-700/20">
              <span className="text-sm font-bold text-white">الإجمالي:</span>
              <span className="text-xl font-black gold-text font-mono">{netTotal.toFixed(2)} {settings.baseCurrency}</span>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-3 gap-1.5 pt-2">
              {[
                { id: 'cash' as PaymentMethod, label: 'نقد', icon: Banknote },
                { id: 'bank' as PaymentMethod, label: 'شبكة', icon: CreditCard },
                { id: 'credit' as PaymentMethod, label: 'آجل', icon: Wallet },
              ].map((m) => {
                const Icon = m.icon;
                const isActive = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    disabled={m.id === 'credit' && !selectedCustomerId}
                    className={`py-2 rounded-xl text-[11px
