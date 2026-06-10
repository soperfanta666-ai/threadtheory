'use client'

import { Hero } from '@/components/Hero'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'

export default function Page() {
  const featuredProducts = products.filter(p => !p.outOfStockMessage).slice(0, 4)

  return (
    <>
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Featured Collection</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most beloved pieces, handpicked for their exceptional quality and timeless appeal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
