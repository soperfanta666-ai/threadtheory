'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        set((state) => {
          const existing = state.items.find(
            (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
          )
          if (existing) {
            const newQty = existing.quantity + item.quantity
            const capped = item.stock !== null ? Math.min(newQty, item.stock) : newQty
            return {
              items: state.items.map((i) =>
                i.id === existing.id ? { ...i, quantity: capped } : i
              ),
            }
          }
          const cappedQty = item.stock !== null ? Math.min(item.quantity, item.stock) : item.quantity
          return { items: [...state.items, { ...item, quantity: cappedQty }] }
        })
        set({ isOpen: true })
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }))
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id)
          return
        }
        set((state) => ({
          items: state.items.map((item) => {
            if (item.id !== id) return item
            const capped = item.stock !== null ? Math.min(quantity, item.stock) : quantity
            return { ...item, quantity: capped }
          }),
        }))
      },

      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      getTotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getItemCount: () => {
        const state = get()
        return state.items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'thread-theory-cart',
      partialize: (state) => ({ items: state.items }),
    }
  )
)