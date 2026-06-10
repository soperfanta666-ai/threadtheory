'use client'

import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category')

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          {category ? `${category} Collection` : 'All Products'}
        </h1>
        <p className="text-lg text-muted-foreground">
          {filteredProducts.length} items available
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}
