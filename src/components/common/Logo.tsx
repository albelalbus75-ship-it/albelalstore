import React from 'react';
import { useStore } from '../../context/StoreContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const SIZES = {
  sm: { icon: 'text-2xl', title: 'text-base', tagline: 'text-[9px]' },
  md: { icon: 'text-4xl', title: 'text-xl', tagline: 'text-[11px]' },
  lg: { icon: 'text-6xl', title: 'text-3xl', tagline: 'text-sm' },
};

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const { settings } = useStore();
  const s = SIZES[size];

  const renderIcon = () => {
    if (settings.logoType === 'image' && settings.logoUrl) {
      return (
        <img
          src={settings.logoUrl}
          alt="logo"
          className={`w-10 h-10 object-contain ${size === 'lg' ? 'w-16 h-16' : ''}`}
        />
      );
    }
    if (settings.logoType === 'emoji') {
      return <span className={s.icon}>{settings.logoEmoji || '🫖'}</span>;
    }
    // Default SVG (coffee pot)
    return <span className={s.icon}>🫖</span>;
  };

  return (
    <div className="flex items-center gap-3">
      <div className="shrink-0">{renderIcon()}</div>
      {showText && (
        <div className="flex flex-col leading-tight">
          <h1 className={`${s.title} font-black gold-text tracking-tight`}>
            {settings.storeName}
          </h1>
          {settings.tagline && (
            <span className={`${s.tagline} text-slate-400 font-medium`}>
              {settings.tagline}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
