'use client'

import { useState, use, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { products } from '@/data/products'
import { Size, CartItem } from '@/lib/types'
import { useCart } from '@/lib/store'
import { ProductGallery } from '@/components/ProductGallery'
import { SizeSelector } from '@/components/SizeSelector'
import { ColorSwatch } from '@/components/ColorSwatch'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid'

const SALE_DURATION = 3 * 60 * 60 + 39 * 60 + 15

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  const { addItem, items } = useCart()
  const router = useRouter()
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string } | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [timeLeft, setTimeLeft] = useState(SALE_DURATION)

  useEffect(() => {
    if (!product) {
      router.replace('/products')
    }
  }, [product, router])

  useEffect(() => {
    if (product?.outOfStockMessage) {
      toast.error(product.outOfStockMessage, { duration: 6000 })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!product) return null

  const hours = Math.floor(timeLeft / 3600)
  const minutes = Math.floor((timeLeft % 3600) / 60)
  const seconds = timeLeft % 60
  const pad = (n: number) => String(n).padStart(2, '0')

  const discount = Math.round((1 - product.basePrice / product.originalPrice) * 100)

  const selectedSizeData = selectedSize
    ? product.sizePrices.find((sp) => sp.size === selectedSize)
    : null

  const stockForSize = selectedSizeData?.stock ?? null

  const cartItemsForThisSize = items
    .filter((i) => i.productId === product.id && i.size === selectedSize)
    .reduce((sum, i) => sum + i.quantity, 0)

  const remainingStock =
    stockForSize !== null ? stockForSize - cartItemsForThisSize : null

  const maxQty = remainingStock !== null ? remainingStock : 99

  const handleSizeSelect = (size: Size, price: number) => {
    setSelectedSize(size)
    setSelectedPrice(price)
    setQuantity(1)
  }

  const handleAddToCart = () => {
    if (!selectedSize || !selectedPrice) {
      toast.error('Please select a size')
      return
    }
    if (!selectedColor) {
      toast.error('Please select a color')
      return
    }
    if (remainingStock !== null && quantity > remainingStock) {
      toast.error(`Only ${remainingStock} left in stock for this size`)
      return
    }

    const cartItem: CartItem = {
      id: uuidv4(),
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      price: selectedPrice,
      size: selectedSize,
      color: selectedColor.name,
      colorHex: selectedColor.hex,
      quantity,
      stock: stockForSize,
    }

    addItem(cartItem)
    toast.success(`${product.name} added to cart!`)
    setSelectedSize(null)
    setSelectedPrice(null)
    setSelectedColor(null)
    setQuantity(1)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

      {product.outOfStockMessage ? (
        <div className="bg-gray-800 text-white rounded-lg px-6 py-4 mb-10 flex items-center justify-center gap-3">
          <span className="text-xl">⚠️</span>
          <p className="font-semibold text-base">{product.outOfStockMessage}</p>
        </div>
      ) : (
        <div className="bg-red-500 text-white rounded-lg px-6 py-3 mb-10 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-bold text-lg">🔥 Sitewide Sale — {discount}% OFF</p>
          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>Hurry! Sale ends in:</span>
            <span className="bg-white text-red-500 rounded px-2 py-0.5 font-mono text-base">
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Gallery */}
        <div>
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Details */}
        <div className="space-y-8">
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">{product.category}</p>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-3">
              <p className="text-3xl font-bold text-foreground">
                Rs. {(selectedPrice ?? product.basePrice).toLocaleString()}
              </p>
              <p className="text-xl text-muted-foreground line-through">
                Rs. {product.originalPrice.toLocaleString()}
              </p>
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">
                -{discount}%
              </span>
            </div>
            {selectedSize && remainingStock !== null && remainingStock <= 7 && (
              <p className="mt-2 text-red-500 font-semibold text-sm">
                ⚠️ Only {remainingStock} left in this size — order soon!
              </p>
            )}
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">About this piece</h3>
            <p className="text-base text-foreground leading-relaxed">{product.description}</p>
          </div>

          {/* Size Selector */}
          <SizeSelector
            sizePrices={product.sizePrices}
            selected={selectedSize}
            onSelect={handleSizeSelect}
          />

          {/* Color Swatch */}
          <ColorSwatch
            colors={product.colors}
            selected={selectedColor?.name || null}
            onSelect={(name, hex) => setSelectedColor({ name, hex })}
          />

          {/* Quantity */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">Quantity</label>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 border-2 border-border rounded-lg hover:border-primary transition-colors"
              >
                −
              </button>
              <span className="text-lg font-semibold text-foreground min-w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(maxQty, quantity + 1))}
                className="px-4 py-2 border-2 border-border rounded-lg hover:border-primary transition-colors"
              >
                +
              </button>
            </div>
            {remainingStock !== null && (
              <p className="text-xs text-muted-foreground mt-2">Max {remainingStock} for this size</p>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!!product.outOfStockMessage || !selectedSize || !selectedColor || maxQty === 0}
            className={`w-full py-4 rounded-lg font-semibold text-lg transition-all ${
              !product.outOfStockMessage && selectedSize && selectedColor && maxQty > 0
                ? 'bg-primary text-primary-foreground hover:opacity-90'
                : 'bg-muted text-muted-foreground cursor-not-allowed'
            }`}
          >
            {product.outOfStockMessage ? 'Out of Stock' : maxQty === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>

          {/* Shipping & Materials */}
          <div className="border-t border-border pt-8 space-y-4">
            <div>
              <h3 className="font-semibold text-foreground mb-2">Shipping & Returns</h3>
              <p className="text-sm text-muted-foreground">Free shipping on orders over Rs. 5,000. Returns accepted within 30 days.</p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">Materials</h3>
              <p className="text-sm text-muted-foreground">Premium cotton blend with premium craftsmanship.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}