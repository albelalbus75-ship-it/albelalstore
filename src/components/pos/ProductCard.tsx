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
      className="group bg-gradient-to-br from-obsidian-900/90 to-obsidian-950 border border-gold-700/20 hover:border-gold-500/60 rounded-xl overflow-hidden cursor-pointer transition-all active:scale-[0.98] shadow-lg hover:shadow-gold flex flex-col"
      style={{ height: '200px' }}
    >
      {/* Image area - fixed height */}
      <div className="relative h-20 bg-gradient-to-br from-obsidian-800 to-obsidian-900 flex items-center justify-center overflow-hidden flex-shrink-0">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
        ) : (
          <span className="text-3xl opacity-30">📦</span>
        )}

        {/* Stock badge - top right */}
        <span
          className={`absolute top-1 right-1 text-[9px] px-1.5 py-0.5 rounded font-bold ${
            isLowStock
              ? 'bg-rose-950/95 text-rose-300 border border-rose-800'
              : 'bg-obsidian-950/95 text-gold-300 border border-gold-700'
          }`}
        >
          {stock} {product.baseUnit === 'piece' ? 'حبة' : 'كجم'}
        </span>

        {/* Weighted badge - top left */}
        {product.isWeighted && (
          <span className="absolute top-1 left-1 text-[9px] bg-sky-950/95 text-sky-300 border border-sky-800 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
            <Scale className="w-2.5 h-2.5" />
            وزني
          </span>
        )}
      </div>

      {/* Info area - flexible */}
      <div className="flex-1 flex flex-col p-2 min-h-0">
        {/* Product name - fixed 2 lines */}
        <h4
          className="font-bold text-white text-[11px] leading-tight mb-1 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            height: '28px',
          }}
        >
          {product.name}
        </h4>

        {/* Packagings - only 1 shown, compact */}
        {product.packagings.length > 0 && (
          <div className="flex flex-wrap gap-0.5 mb-1">
            {product.packagings.slice(0, 1).map((pkg) => (
              <button
                key={pkg.id}
                onClick={(e) => {
                  e.stopPropagation();
                  onPackagingClick?.(pkg.id);
                }}
                className="text-[9px] bg-gold-950/60 hover:bg-gold-900 text-gold-300 border border-gold-800/80 px-1 py-0.5 rounded transition truncate max-w-full"
              >
                {pkg.name}
              </button>
            ))}
          </div>
        )}

        {/* Bottom row: price + add button - anchored at bottom */}
        <div className="flex items-center justify-between pt-1.5 mt-auto border-t border-gold-700/20">
          <div className="flex items-baseline gap-0.5">
            <span className="text-sm font-black gold-text font-mono">
              {price.toLocaleString('en-US')}
            </span>
            <span className="text-[9px] text-gold-400 font-bold">{settings.baseCurrency}</span>
          </div>
          <span className="w-6 h-6 rounded-md bg-gold-600/20 text-gold-400 flex items-center justify-center group-hover:bg-gold-600 group-hover:text-obsidian-950 transition flex-shrink-0">
            <Plus className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
