import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Warehouse, Currency, ExchangeRate } from '../types';
import { warehouseService } from '../services/warehouseService';
import { currencyService } from '../services/currencyService';
import { exchangeRateService } from '../services/exchangeRateService';

interface AppDataContextValue {
  warehouses: Warehouse[];
  currencies: Currency[];
  exchangeRates: ExchangeRate[];
  refresh: () => void;
}

const AppDataContext = createContext<AppDataContextValue | null>(null);

export const AppDataProvider = ({ children }: { children: ReactNode }) => {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([]);

  const refresh = () => {
    setWarehouses(warehouseService.getAll());
    setCurrencies(currencyService.getAll());
    setExchangeRates(exchangeRateService.getAll());
  };

  useEffect(() => { refresh(); }, []);

  return (
    <AppDataContext.Provider value={{ warehouses, currencies, exchangeRates, refresh }}>
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('useAppData يجب أن يُستخدم داخل AppDataProvider');
  return ctx;
};
