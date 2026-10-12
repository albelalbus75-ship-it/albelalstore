import React, { useRef, useState } from 'react';
import { Upload, Trash2, Palette, Type, Image as ImageIcon, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { posAudio } from '../../utils/audio';

const PRESET_EMOJIS = ['🫖', '🏪', '🛒', '💎', '👑', '🌟', '🏬', '🎁', '💼', '🛍️'];
const PRESET_COLORS = [
  { name: 'ذهبي كلاسيكي', value: '#d4922a' },
  { name: 'برونزي', value: '#b87320' },
  { name: 'زمردي', value: '#059669' },
  { name: 'أزرق ملكي', value: '#1e40af' },
  { name: 'بنفسجي', value: '#7c3aed' },
  { name: 'أحمر ياقوتي', value: '#be123c' },
];

export const BrandingTab: React.FC = () => {
  const { settings, updateSettings } = useStore();
  const fileRef = useRef<HTMLInputElement>(null);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    storeName: settings.storeName || '',
    tagline: settings.tagline || '',
    logoType: settings.logoType || 'emoji',
    logoEmoji: settings.logoEmoji || '🫖',
    logoUrl: settings.logoUrl || '',
    themeColor: settings.themeColor || '#d4922a',
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) {
      alert('حجم الصورة يجب أن يكون أقل من 500KB');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm({ ...form, logoType: 'image', logoUrl: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateSettings({
      storeName: form.storeName.trim(),
      tagline: form.tagline.trim(),
      logoType: form.logoType as 'image' | 'emoji' | 'svg',
      logoEmoji: form.logoEmoji,
      logoUrl: form.logoUrl,
      themeColor: form.themeColor,
    });
    setSaved(true);
    posAudio.playSuccessChime();
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-base font-bold text-white">الهوية البصرية للشعار</h3>
        <p className="text-xs text-slate-400">تخصيص الشعار والاسم والألوان</p>
      </div>

      {/* Live Preview */}
      <div className="card-luxury p-4 flex items-center justify-center">
        <div className="flex items-center gap-3">
          {form.logoType === 'image' && form.logoUrl ? (
            <img src={form.logoUrl} alt="logo" className="w-14 h-14 object-contain" />
          ) : (
            <span className="text-5xl">{form.logoEmoji}</span>
          )}
          <div className="flex flex-col leading-tight">
            <h1 className="text-xl font-black gold-text">{form.storeName || 'اسم المتجر'}</h1>
            {form.tagline && <span className="text-[11px] text-slate-400">{form.tagline}</span>}
          </div>
        </div>
      </div>

      {/* Store Name & Tagline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-slate-300 block mb-1">اسم المتجر</label>
          <input type="text" value={form.storeName}
            onChange={(e) => setForm({ ...form, storeName: e.target.value })}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500" />
        </div>
        <div>
          <label className="text-xs text-slate-300 block mb-1">الشعار الفرعي</label>
          <input type="text" value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            placeholder="للتجارة العامة"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none" />
        </div>
      </div>

      {/* Logo Type Selector */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-3">
        <label className="text-xs text-slate-300 block mb-2 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5" /> نوع الشعار
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'emoji', label: 'رمز تعبيري' },
            { id: 'image', label: 'صورة مرفوعة' },
            { id: 'svg', label: 'افتراضي' },
          ].map((opt) => (
            <button key={opt.id} type="button"
              onClick={() => setForm({ ...form, logoType: opt.id as any })}
              className={`py-2 px-3 rounded-xl text-xs font-bold border transition ${
                form.logoType === opt.id
                  ? 'bg-gold-600 text-obsidian-950 border-gold-500'
                  : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-gold-700'
              }`}>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Emoji Picker */}
      {form.logoType === 'emoji' && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-3">
          <label className="text-xs text-slate-300 block mb-2">اختر الشعار</label>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {PRESET_EMOJIS.map((e) => (
              <button key={e} type="button"
                onClick={() => setForm({ ...form, logoEmoji: e })}
                className={`text-2xl p-2 rounded-xl transition ${
                  form.logoEmoji === e
                    ? 'bg-gold-600 shadow-gold'
                    : 'bg-slate-900 hover:bg-slate-800'
                }`}>
                {e}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Image Upload */}
      {form.logoType === 'image' && (
        <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-3 space-y-2">
          <label className="text-xs text-slate-300 block">رفع صورة الشعار</label>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => fileRef.current?.click()}
              className="px-4 py-2 bg-gold-600 hover:bg-gold-500 text-obsidian-950 rounded-xl text-xs font-bold flex items-center gap-1.5">
              <Upload className="w-4 h-4" /> رفع صورة
            </button>
            {form.logoUrl && (
              <button type="button" onClick={() => setForm({ ...form, logoUrl: '' })}
                className="px-3 py-2 bg-rose-950 text-rose-300 border border-rose-800 rounded-xl text-xs font-bold flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> حذف
              </button>
            )}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
          <p className="text-[10px] text-slate-500">PNG / JPG / SVG — أقل من 500KB</p>
        </div>
      )}

      {/* Color Picker */}
      <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-3">
        <label className="text-xs text-slate-300 block mb-2 flex items-center gap-1.5">
          <Palette className="w-3.5 h-3.5" /> لون الثيم
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
          {PRESET_COLORS.map((c) => (
            <button key={c.value} type="button"
              onClick={() => setForm({ ...form, themeColor: c.value })}
              className={`h-10 rounded-xl border-2 transition flex items-center justify-center ${
                form.themeColor === c.value ? 'border-white scale-105' : 'border-transparent'
              }`}
              style={{ backgroundColor: c.value }}
              title={c.name}>
              {form.themeColor === c.value && <Check className="w-4 h-4 text-white" />}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input type="color" value={form.themeColor}
            onChange={(e) => setForm({ ...form, themeColor: e.target.value })}
            className="w-12 h-10 bg-slate-900 border border-slate-700 rounded-xl cursor-pointer" />
          <input type="text" value={form.themeColor}
            onChange={(e) => setForm({ ...form, themeColor: e.target.value })}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-mono" />
        </div>
      </div>

      {/* Save */}
      <div className="flex items-center gap-3 pt-2">
        <button type="button" onClick={handleSave}
          className="gold-btn px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5">
          <Check className="w-4 h-4" />
          <span>حفظ الهوية</span>
        </button>
        {saved && (
          <span className="text-xs text-emerald-400 font-semibold animate-fade-in">
            ✅ تم الحفظ بنجاح!
          </span>
        )}
      </div>
    </div>
  );
};
