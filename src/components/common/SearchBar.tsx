import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  resultCount?: number;
  onClear?: () => void;
  autoFocus?: boolean;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ value, onChange, placeholder = 'ابحث عن منتج...', resultCount, onClear, autoFocus }, ref) => {
    return (
      <div className="relative">
        <Search className="w-4 h-4 text-gold-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full bg-obsidian-900/80 border border-gold-700/30 focus:border-gold-500 rounded-2xl pr-11 pl-12 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30 transition-all shadow-inner"
        />
        {value && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
            {typeof resultCount === 'number' && (
              <span className="text-[10px] text-gold-300 bg-gold-950/60 px-2 py-0.5 rounded-lg border border-gold-800/60 font-mono">
                {resultCount}
              </span>
            )}
            <button
              type="button"
              onClick={() => { onChange(''); onClear?.(); }}
              className="w-6 h-6 rounded-full bg-obsidian-800 hover:bg-obsidian-700 flex items-center justify-center text-slate-400 hover:text-white transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';
