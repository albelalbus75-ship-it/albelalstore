src/components/pos/ProductCard.tsx
import React from 'react';
import { Scale, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useStore } from '../../context/StoreContext';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  onPackagingClick?: (packagingId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, onPackagingClick }) => {
  const { settings, salePriceTier, activeWarehouseId } = useStore();
  const stock = product.warehouseStocks[activeWarehouseId] ?? product.stockQuantity;
  const price = salePriceTier === 'wholesale' ? product.wholesalePrice : product.sellingPrice;
  const isLowStock = stock <= product.minStockAlert;

  return (
    <div
      onClick={onClick}
      className="group bg-gradient-to-br from-obsidian-900/90 to-obsidian-950 border border-gold-700/20 hover:border-gold-500/60 rounded-2xl overflow-hidden cursor-pointer transition-all active:scale-[0.98] shadow-lg hover:shadow-gold"
    >
      <div className="relative aspect-square bg-gradient-to-br from-obsidian-800 to-obsidian-900 flex items-center justify-center overflow-hidden">
        {product.imageUrl ? (
          <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
        ) : (
          <span className="text-5xl opacity-30">📦</span>
        )}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {product.isWeighted && (
            <span className="text-[9px] bg-sky-950/90 text-sky-300 border border-sky-800 px-1.5 py-0.5 rounded-md font-mono flex items-center gap-0.5">
              <Scale className="w-2.5 h-2.5" /> وزني
            </span>
          )}
          <span className={`text-[9px] px-1.5 py-0.5 rounded-md font-mono font-bold ${
            isLowStock
              ? 'bg-rose-950/90 text-rose-300 border border-rose-800'
              : 'bg-obsidian-950/90 text-gold-300 border border-gold-700'
          }`}>
            {stock} {product.baseUnit === 'piece' ? 'حبة' : 'كجم'}
          </span>
        </div>
      </div>

      <div className="p-2.5">
        <h4 className="font-bold text-white text-xs line-clamp-2 leading-snug min-h-[2rem] mb-1.5">
          {product.name}
        </h4>

        {product.packagings.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {product.packagings.slice(0, 2).map((pkg) => (
              <button
                key={pkg.id}
                onClick={(e) => { e.stopPropagation(); onPackagingClick?.(pkg.id); }}
                className="text-[9px] bg-gold-950/60 hover:bg-gold-900 text-gold-300 border border-gold-800/80 px-1.5 py-0.5 rounded-md transition truncate max-w-full"
              >
                {pkg.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-1.5 border-t border-gold-700/20">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-black gold-text font-mono">
              {price.toLocaleString('en-US')}
            </span>
            <span className="text-[9px] text-gold-400 font-bold">{settings.baseCurrency}</span>
          </div>
          <span className="w-6 h-6 rounded-lg bg-gold-600/20 text-gold-400 flex items-center justify-center group-hover:bg-gold-600 group-hover:text-obsidian-950 transition">
            <Plus className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
