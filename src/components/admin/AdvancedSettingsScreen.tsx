import React, { useState } from 'react';
import { Warehouse, Coins, TrendingUp, Palette } from 'lucide-react';
import { WarehousesTab } from './WarehousesTab';
import { CurrenciesTab } from './CurrenciesTab';
import { ExchangeRatesTab } from './ExchangeRatesTab';
import { BrandingTab } from './BrandingTab';

type AdminTab = 'branding' | 'warehouses' | 'currencies' | 'exchangeRates';

export const AdvancedSettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('branding');

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'branding', label: 'الهوية البصرية', icon: Palette },
    { id: 'warehouses', label: 'المخازن', icon: Warehouse },
    { id: 'currencies', label: 'العملات', icon: Coins },
    { id: 'exchangeRates', label: 'أسعار الصرف', icon: TrendingUp },
  ];

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 select-none pb-28 text-right">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold gold-text tracking-tight">
          الإعدادات المتقدمة
        </h2>
        <p className="text-xs text-slate-400">
          الشعار والهوية، المخازن، العملات، وأسعار الصرف
        </p>
      </div>

      <div className="flex items-center gap-1 bg-obsidian-900 border border-gold-700/20 rounded-2xl p-1 mb-4 overflow-x-auto">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-br from-gold-500 to-gold-700 text-obsidian-950 shadow-gold'
                  : 'text-slate-400 hover:text-gold-300 hover:bg-obsidian-800'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      <div className="card-luxury p-4 sm:p-5">
        {activeTab === 'branding' && <BrandingTab />}
        {activeTab === 'warehouses' && <WarehousesTab />}
        {activeTab === 'currencies' && <CurrenciesTab />}
        {activeTab === 'exchangeRates' && <ExchangeRatesTab />}
      </div>
    </div>
  );
};
