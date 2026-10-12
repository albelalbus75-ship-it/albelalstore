import React, { useState } from 'react';
import {
  User, Settings, BarChart3, Warehouse, Coins, TrendingUp,
  Palette, Lock, LogOut, ChevronLeft, Phone, MapPin, Building2,
  ShoppingBag, Users, Truck, ArrowRight
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdvancedSettingsScreen } from '../admin/AdvancedSettingsScreen';
import { TreasuryReportsScreen } from '../reports/TreasuryReportsScreen';
import { SettingsScreen } from '../settings/SettingsScreen';

type AccountView = 'menu' | 'settings' | 'advanced' | 'reports';

export const AccountScreen: React.FC = () => {
  const { settings, currentStaff, setIsLocked } = useStore();
  const [view, setView] = useState<AccountView>('menu');

  const menuItems = [
    {
      id: 'settings' as AccountView,
      title: 'إعدادات النظام',
      desc: 'بيانات المنشأة، الضريبة، النسخ الاحتياطي',
      icon: Settings,
      color: 'gold',
    },
    {
      id: 'advanced' as AccountView,
      title: 'الإعدادات المتقدمة',
      desc: 'الهوية البصرية، المخازن، العملات، أسعار الصرف',
      icon: Palette,
      color: 'emerald',
    },
    {
      id: 'reports' as AccountView,
      title: 'التقارير والمالية',
      desc: 'المبيعات، الأرباح، الخزينة، القيود',
      icon: BarChart3,
      color: 'sky',
    },
  ];

  // === Top header with back button when in sub-view ===
  const renderHeader = () => {
    if (view === 'menu') return null;
    return (
      <button
        onClick={() => setView('menu')}
        className="flex items-center gap-1.5 text-xs font-bold text-gold-400 hover:text-gold-300 mb-3 px-2 py-1.5 rounded-xl bg-obsidian-900 border border-gold-700/30 active:scale-95 transition"
      >
        <ArrowRight className="w-4 h-4" />
        <span>العودة للحساب</span>
      </button>
    );
  };

  // === Sub-views ===
  if (view === 'settings') return <div className="pb-28">{renderHeader()}<SettingsScreen /></div>;
  if (view === 'advanced') return <div className="pb-28">{renderHeader()}<AdvancedSettingsScreen /></div>;
  if (view === 'reports') return <div className="pb-28">{renderHeader()}<TreasuryReportsScreen /></div>;

  // === Main menu view ===
  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 pb-28 select-none" dir="rtl">
      {/* Profile Card */}
      <div className="bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-gold-700/30 rounded-3xl p-5 mb-4 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center shadow-gold">
            <User className="w-8 h-8 text-obsidian-950" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-white truncate">{currentStaff.name}</h2>
            <span className="text-[10px] bg-gold-950 text-gold-300 border border-gold-800 px-2 py-0.5 rounded-lg font-bold">
              {currentStaff.role === 'owner' ? 'المالك' : currentStaff.role === 'manager' ? 'مدير' : 'كاشير'}
            </span>
            {currentStaff.phone && (
              <div className="text-[11px] text-slate-400 mt-1 font-mono">
                {currentStaff.phone}
              </div>
            )}
          </div>
          <button
            onClick={() => setIsLocked(true)}
            className="p-2.5 bg-obsidian-800 hover:bg-obsidian-700 text-gold-400 rounded-xl border border-gold-700/30 transition active:scale-95"
            title="قفل الشاشة"
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>

        {/* Store Info */}
        <div className="mt-4 pt-4 border-t border-gold-700/20 space-y-2 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Building2 className="w-3.5 h-3.5 text-gold-400 shrink-0" />
            <span className="truncate">{settings.storeName}</span>
          </div>
          {settings.address && (
            <div className="flex items-center gap-2 text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span className="truncate">{settings.address}</span>
            </div>
          )}
          {settings.phone && (
            <div className="flex items-center gap-2 text-slate-400 font-mono">
              <Phone className="w-3.5 h-3.5 text-gold-400 shrink-0" />
              <span>{settings.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const colorMap: Record<string, string> = {
            gold: 'from-gold-600 to-gold-700 text-obsidian-950',
            emerald: 'from-emerald-600 to-emerald-700 text-white',
            sky: 'from-sky-600 to-sky-700 text-white',
          };
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className="w-full bg-obsidian-900/70 hover:bg-obsidian-800 border border-gold-700/20 hover:border-gold-500/50 rounded-2xl p-4 flex items-center gap-3 transition active:scale-[0.98] text-right"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${colorMap[item.color]} flex items-center justify-center shrink-0 shadow-md`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-white text-sm">{item.title}</h3>
                <p className="text-[11px] text-slate-400 mt-0.5 truncate">{item.desc}</p>
              </div>
              <ChevronLeft className="w-4 h-4 text-gold-400 shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Quick Access Shortcuts */}
      <div className="mt-5">
        <h3 className="text-xs font-bold gold-text mb-2">وصول سريع</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'العملاء', icon: Users, view: 'reports' },
            { label: 'الموردون', icon: Truck, view: 'reports' },
            { label: 'المخزون', icon: Warehouse, view: 'advanced' },
            { label: 'العملات', icon: Coins, view: 'advanced' },
            { label: 'أسعار الصرف', icon: TrendingUp, view: 'advanced' },
            { label: 'الهوية', icon: Palette, view: 'advanced' },
          ].map((q, i) => {
            const Icon = q.icon;
            return (
              <button
                key={i}
                onClick={() => setView(q.view as AccountView)}
                className="bg-obsidian-900/60 hover:bg-obsidian-800 border border-gold-700/20 hover:border-gold-500/40 rounded-xl p-3 flex flex-col items-center gap-1.5 transition active:scale-95"
              >
                <Icon className="w-4 h-4 text-gold-400" />
                <span className="text-[10px] font-bold text-slate-300">{q.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={() => setIsLocked(true)}
        className="w-full mt-5 bg-rose-950/40 hover:bg-rose-950/60 border border-rose-800/60 rounded-2xl p-3 flex items-center justify-center gap-2 text-rose-300 font-bold text-xs transition active:scale-[0.98]"
      >
        <LogOut className="w-4 h-4" />
        <span>قفل التطبيق / تسجيل الخروج</span>
      </button>
    </div>
  );
};
