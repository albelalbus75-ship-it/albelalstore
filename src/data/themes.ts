export interface ThemePreset {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  colors: {
    primary: string;
    primaryLight: string;
    primaryDark: string;
    bgPrimary: string;
    bgSecondary: string;
    bgTertiary: string;
  };
  preview: string; // إيموجي للمعاينة
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'gold',
    name: 'الذهبي الفاخر',
    nameEn: 'Royal Gold',
    description: 'الكلاسيكي الفخم - مثالي للمتاجر الراقية',
    colors: {
      primary: '#d4922a',
      primaryLight: '#e6ad3b',
      primaryDark: '#b87320',
      bgPrimary: '#050505',
      bgSecondary: '#0f0f0f',
      bgTertiary: '#1a1a1a',
    },
    preview: '👑',
  },
  {
    id: 'emerald',
    name: 'الزمردي الملكي',
    nameEn: 'Royal Emerald',
    description: 'هادئ وفاخر - مثالي للمتاجر العصرية',
    colors: {
      primary: '#10b981',
      primaryLight: '#34d399',
      primaryDark: '#059669',
      bgPrimary: '#021712',
      bgSecondary: '#042f24',
      bgTertiary: '#064e3b',
    },
    preview: '💎',
  },
  {
    id: 'royal-blue',
    name: 'الأزرق الملكي',
    nameEn: 'Royal Blue',
    description: 'احترافي ورسمي - مثالي للشركات',
    colors: {
      primary: '#3b82f6',
      primaryLight: '#60a5fa',
      primaryDark: '#2563eb',
      bgPrimary: '#020617',
      bgSecondary: '#0c1526',
      bgTertiary: '#1e3a8a',
    },
    preview: '🌊',
  },
  {
    id: 'purple',
    name: 'البنفسجي الفاخر',
    nameEn: 'Royal Purple',
    description: 'إبداعي وجذاب - مثالي للهدايا والتحف',
    colors: {
      primary: '#a855f7',
      primaryLight: '#c084fc',
      primaryDark: '#9333ea',
      bgPrimary: '#0a0118',
      bgSecondary: '#1e1033',
      bgTertiary: '#3b0764',
    },
    preview: '🔮',
  },
  {
    id: 'ruby',
    name: 'الأحمر الياقوتي',
    nameEn: 'Ruby Red',
    description: 'جريء وقوي - مثالي للمطاعم والتموينات',
    colors: {
      primary: '#ef4444',
      primaryLight: '#f87171',
      primaryDark: '#dc2626',
      bgPrimary: '#180202',
      bgSecondary: '#2a0a0a',
      bgTertiary: '#7f1d1d',
    },
    preview: '❤️‍🔥',
  },
  {
    id: 'teal',
    name: 'الفيروزي',
    nameEn: 'Teal Fresh',
    description: 'منعش وحيوي - مثالي للصيدليات والعيادات',
    colors: {
      primary: '#14b8a6',
      primaryLight: '#2dd4bf',
      primaryDark: '#0d9488',
      bgPrimary: '#011413',
      bgSecondary: '#042f2e',
      bgTertiary: '#134e4a',
    },
    preview: '🌿',
  },
];

export const getThemeById = (id: string): ThemePreset => {
  return THEME_PRESETS.find((t) => t.id === id) || THEME_PRESETS[0];
};
