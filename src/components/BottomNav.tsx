import React from 'react';
import {
  Home,
  LayoutGrid,
  ShoppingBag,
  User,
  BarChart3,
  SlidersHorizontal,
} from 'lucide-react';

export type NavTab =
  | 'pos'
  | 'inventory'
  | 'customers'
  | 'suppliers'
  | 'treasury_reports'
  | 'settings'
  | 'advanced_settings';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab, cartCount }) => {
  const tabs = [
    { id: 'pos' as NavTab, label: 'الرئيسية', icon: Home, badge: cartCount > 0 ? cartCount : null },
    { id: 'inventory' as NavTab, label: 'الفئات', icon: LayoutGrid },
    { id: 'customers' as NavTab, label: 'السلة', icon: ShoppingBag },
    { id: 'treasury_reports' as NavTab, label: 'التقارير', icon: BarChart3 },
    { id: 'advanced_settings' as NavTab, label: 'متقدم', icon: SlidersHorizontal },
    { id: 'settings' as NavTab, label: 'الحساب', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-obsidian-950/95 backdrop-blur-lg border-t border-gold-700/30 pb-safe">
      <div className="max-w-7xl mx-auto flex items-center justify-around h-16 px-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`relative flex flex-col items-center justify-center flex-1 h-full py-1 transition-all min-w-[50px] ${
                isActive ? 'text-gold-400' : 'text-slate-500 hover:text-gold-300'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'scale-110 stroke-[2.3]' : 'stroke-[1.8]'
                  }`}
                />
                {tab.badge && (
                  <span className="absolute -top-1.5 -right-2.5 bg-gold-500 text-obsidian-950 text-[10px] font-black px-1.5 py-0.5 rounded-full min-w-[16px] text-center leading-tight">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 whitespace-nowrap ${
                isActive ? 'font-bold' : 'font-medium'
              }`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
