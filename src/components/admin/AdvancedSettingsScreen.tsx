import React, { useState } from 'react';
import { Warehouse, Coins, TrendingUp } from 'lucide-react';
import { WarehousesTab } from './WarehousesTab';
import { CurrenciesTab } from './CurrenciesTab';
import { ExchangeRatesTab } from './ExchangeRatesTab';

type AdminTab = 'warehouses' | 'currencies' | 'exchangeRates';

export const AdvancedSettingsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('warehouses');

  const tabs: { id: AdminTab; label: string; icon: React.ElementType }[] = [
    { id: 'warehouses', label: 'المخازن', icon: Warehouse },
    { id: 'currencies', label: 'العملات', icon: Coins },
    { id: 'exchangeRates', label: 'أسعار الصرف', icon: TrendingUp },
  ];

  return (
    <div className="max-w-4xl mx-auto px-2 sm:px-6 py-4 select-none pb-28 text-right">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">الإعدادات المتقدمة</h2>
        <p className="text-xs text-slate-400">
          إدارة المخازن، العملات، وأسعار الصرف المرتبطة بالنظام المحاسبي
        </p>
      </div>

      {/* Internal Tabs */}
      <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-2xl p-1 mb-4">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-xs font-bold transition ${
                isActive ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}>
              <Icon className="w-3.5 h-3.5" />
              <span className="whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl">
        {activeTab === 'warehouses' && <WarehousesTab />}
        {activeTab === 'currencies' && <CurrenciesTab />}
        {activeTab === 'exchangeRates' && <ExchangeRatesTab />}
      </div>
    </div>
  );
};
