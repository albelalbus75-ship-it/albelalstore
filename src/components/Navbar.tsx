import React from 'react';
import { Search, Bell, Lock } from 'lucide-react';
import { Logo } from './common/Logo';
import { useStore } from '../context/StoreContext';

interface NavbarProps {
  onOpenClosingModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenClosingModal }) => {
  const { setIsLocked, currentStaff } = useStore();

  return (
    <header className="sticky top-0 z-30 bg-obsidian-950/85 backdrop-blur-lg border-b border-gold-700/20">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
        {/* Logo */}
        <Logo size="md" />

        {/* Actions */}
        <div className="flex items-center gap-1.5">
          <button
            className="p-2 text-gold-300 hover:text-gold-200 hover:bg-gold-950/40 rounded-xl transition"
            title="البحث"
          >
            <Search className="w-5 h-5" />
          </button>
          <button
            className="relative p-2 text-gold-300 hover:text-gold-200 hover:bg-gold-950/40 rounded-xl transition"
            title="الإشعارات"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-gold-500 rounded-full animate-pulse" />
          </button>
          <button
            onClick={() => setIsLocked(true)}
            className="p-2 text-slate-400 hover:text-gold-300 hover:bg-gold-950/40 rounded-xl transition"
            title={`قفل الشاشة (${currentStaff.name})`}
          >
            <Lock className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
