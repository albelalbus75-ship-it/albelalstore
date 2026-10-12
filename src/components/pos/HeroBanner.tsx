import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { settings } = useStore();
  if (!settings.heroTitle && !settings.heroImageUrl) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden border border-gold-700/40 bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black mb-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(212,146,42,0.18),transparent_60%)]" />
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 items-center">
        {settings.heroImageUrl && (
          <div className="order-2 sm:order-1 flex items-center justify-center">
            <img
              src={settings.heroImageUrl}
              alt={settings.heroTitle || 'عرض'}
              className="max-h-36 sm:max-h-44 object-contain drop-shadow-2xl"
            />
          </div>
        )}
        <div className={`order-1 sm:order-2 text-right space-y-2 ${!settings.heroImageUrl ? 'sm:col-span-2' : ''}`}>
          {settings.heroBadge && (
            <span className="inline-flex items-center gap-1 text-[10px] bg-gold-950 text-gold-300 border border-gold-700 px-2 py-0.5 rounded-lg font-bold">
              <Sparkles className="w-2.5 h-2.5" />
              {settings.heroBadge}
            </span>
          )}
          {settings.heroTitle && (
            <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
              {settings.heroTitle}
            </h2>
          )}
          {settings.heroSubtitle && (
            <p className="text-xs text-slate-300">{settings.heroSubtitle}</p>
          )}
          {typeof settings.heroPrice === 'number' && settings.heroPrice > 0 && (
            <div className="flex items-baseline gap-1 justify-end pt-1">
              <span className="text-2xl sm:text-3xl font-black gold-text font-mono">
                {settings.heroPrice.toLocaleString('en-US')}
              </span>
              <span className="text-xs text-gold-400 font-bold">ريال</span>
            </div>
          )}
          <button className="mt-2 px-5 py-2 gold-btn rounded-xl text-xs font-black">
            اشترِ الآن
          </button>
        </div>
      </div>
    </div>
  );
};
