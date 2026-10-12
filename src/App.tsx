import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { BottomNav, NavTab } from './components/BottomNav';
import { POSScreen } from './components/pos/POSScreen';
import { InventoryScreen } from './components/inventory/InventoryScreen';
import { AccountScreen } from './components/account/AccountScreen';
import { LockScreenModal } from './components/auth/LockScreenModal';
import { DailyClosingModal } from './components/pos/DailyClosingModal';
import { useOnlineStatus } from './hooks/useOnlineStatus';
import { WifiOff } from 'lucide-react';

const AppContent: React.FC = () => {
  const { cart } = useStore();
  const [currentTab, setCurrentTab] = useState<NavTab>('pos');
  const [isClosingModalOpen, setIsClosingModalOpen] = useState(false);
  const isOnline = useOnlineStatus();

  return (
    <div className="min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-sans select-none antialiased">
      {!isOnline && (
        <div className="bg-amber-600 text-amber-950 px-3 py-1 text-center text-xs font-bold flex items-center justify-center gap-1.5">
          <WifiOff className="w-3.5 h-3.5" />
          <span>وضع عدم الاتصال نشط — البيانات محفوظة محلياً</span>
        </div>
      )}

      <Navbar onOpenClosingModal={() => setIsClosingModalOpen(true)} />

      <main className="flex-1 overflow-x-hidden">
        {currentTab === 'pos' && <POSScreen />}
        {currentTab === 'inventory' && <InventoryScreen />}
        {currentTab === 'cart' && <POSScreen openCart />}
        {currentTab === 'account' && <AccountScreen />}
      </main>

      <BottomNav currentTab={currentTab} onSelectTab={setCurrentTab} cartCount={cart.length} />
      <LockScreenModal />
      <DailyClosingModal isOpen={isClosingModalOpen} onClose={() => setIsClosingModalOpen(false)} />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
