'use client'

import { Size, SizePrice } from '@/lib/types'

interface SizeSelectorProps {
  sizePrices: SizePrice[]
  selected: Size | null
  onSelect: (size: Size, price: number) => void
}

export const SizeSelector = ({ sizePrices, selected, onSelect }: SizeSelectorProps) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-3">Size</label>
      <div className="grid grid-cols-3 gap-2">
        {sizePrices.map(({ size, price, stock }) => {
          const outOfStock = stock !== null && stock === 0
          const lowStock = stock !== null && stock > 0 && stock <= 7
          return (
            <button
              key={size}
              onClick={() => !outOfStock && onSelect(size, price)}
              disabled={outOfStock}
              className={`py-2 px-3 text-sm font-medium rounded-lg transition-all border-2 relative ${
                outOfStock
                  ? 'border-border bg-muted text-muted-foreground cursor-not-allowed opacity-50'
                  : selected === size
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-white text-foreground hover:border-primary'
              }`}
            >
              <span className="block">{size}</span>
              <span className="block text-xs mt-0.5 opacity-80">Rs. {price.toLocaleString()}</span>
              {lowStock && !outOfStock && (
                <span className="block text-xs mt-0.5 text-red-500 font-semibold">
                  Only {stock} left!
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}