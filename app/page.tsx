'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Truck, MessageCircle, BadgeCheck, RefreshCcw } from 'lucide-react'
import { Hero } from '@/components/Hero'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'

const categories = [
  { name: 'Shirts',      query: 'Shirts',      image: 'https://plus.unsplash.com/premium_photo-1725075088969-73798c9b422c?auto=format&fit=crop&w=600&q=80' },
  { name: 'Shorts',      query: 'Shorts',      image: '/products/cargo-shorts-normal.png' },
  { name: 'Trousers',    query: 'Trousers',    image: 'https://plus.unsplash.com/premium_photo-1690359582591-3b3ab6399885?auto=format&fit=crop&w=600&q=80' },
  { name: 'Jackets',     query: 'Jackets',     image: 'https://images.unsplash.com/photo-1602525582399-7ef5f604ff7e?auto=format&fit=crop&w=600&q=80' },
  { name: 'Hoodies',     query: 'Hoodies',     image: 'https://images.unsplash.com/photo-1564557287817-3785e38ec1f5?auto=format&fit=crop&w=600&q=80' },
  { name: 'Accessories', query: 'Accessories', image: '/products/belt-black.png' },
]

const uspItems = [
  { icon: Truck,          title: 'Free Delivery',       subtitle: 'On orders over Rs. 5,000' },
  { icon: MessageCircle,  title: 'Order via WhatsApp',  subtitle: 'Fast & easy checkout' },
  { icon: BadgeCheck,     title: 'Premium Quality',     subtitle: 'Crafted to last' },
  { icon: RefreshCcw,     title: '30-Day Returns',      subtitle: 'Hassle-free returns' },
]

const bestSellers = products.filter(p => ['1', '2', '3', '7'].includes(p.id))
const newArrivals  = products.filter(p => ['8', '11', '12', '14', '15', '17'].includes(p.id))

export default function Page() {
  return (
    <>
      <Hero />

      {/* USP Strip */}
      <section className="border-y border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {uspItems.map(({ icon: Icon, title, subtitle }) => (
              <div key={title} className="flex items-center gap-3">
                <Icon size={26} className="text-primary flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Shop by Category</h2>
          <p className="text-muted-foreground">Find exactly what you&apos;re looking for</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.query}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <Link href={`/products?category=${cat.query}`}>
                <div className="relative h-48 sm:h-64 rounded-xl overflow-hidden group cursor-pointer">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/45 group-hover:bg-black/55 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-xl sm:text-2xl font-bold tracking-widest uppercase">
                      {cat.name}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="bg-secondary/30 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold text-foreground">Best Sellers</h2>
              <p className="text-muted-foreground mt-2">Our most loved pieces</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-primary hover:underline hidden sm:block">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground">New Arrivals</h2>
            <p className="text-muted-foreground mt-2">Fresh drops, just in</p>
          </div>
          <Link href="/products" className="text-sm font-semibold text-primary hover:underline hidden sm:block">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
