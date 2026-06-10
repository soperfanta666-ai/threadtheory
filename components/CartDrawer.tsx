'use client'

import { useCart } from '@/lib/store'
import { X, Plus, Minus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotal } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
className="fixed right-0 top-0 h-full w-full max-w-md bg-background/95 backdrop-blur-md z-50 flex flex-col"          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">Cart</h2>
              <button
                onClick={closeCart}
                className="p-2 hover:bg-secondary rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X size={24} className="text-foreground" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-center text-muted-foreground">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 pb-4 border-b border-border"
                  >
                    {/* Image */}
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-sm font-semibold text-foreground">{item.productName}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Size: {item.size} · Color: {item.color}
                      </p>
                      <p className="text-sm font-medium text-foreground mt-2">Rs. {item.price.toLocaleString()}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} className="text-foreground" />
                        </button>
                        <span className="text-sm font-medium text-foreground min-w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} className="text-foreground" />
                        </button>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="self-start p-2 text-destructive hover:bg-red-50 rounded transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">Total:</span>
                  <span className="text-2xl font-bold text-foreground">Rs. {getTotal().toLocaleString()}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="block w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-center hover:opacity-90 transition-opacity"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full bg-secondary text-foreground py-3 rounded-lg font-semibold hover:opacity-75 transition-opacity"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}