'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'
import { motion } from 'framer-motion'

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const discount = Math.round((1 - product.basePrice / product.originalPrice) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Link href={`/products/${product.id}`}>
        <div className="group cursor-pointer">
          <div className="relative h-64 sm:h-72 rounded-lg overflow-hidden bg-secondary mb-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className={`object-cover group-hover:scale-105 transition-transform duration-300 ${product.outOfStockMessage ? 'grayscale' : ''}`}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            {product.outOfStockMessage ? (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="bg-white text-black text-xs font-bold px-3 py-1.5 rounded-full tracking-wide">
                  Out of Stock
                </span>
              </div>
            ) : (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                -{discount}%
              </div>
            )}
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-base font-bold text-foreground">Rs. {product.basePrice.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground line-through">Rs. {product.originalPrice.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}