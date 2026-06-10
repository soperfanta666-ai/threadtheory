'use client'

import Link from 'next/link'
import { CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function OrderConfirmationPage() {
  const [orderNumber] = useState(() =>
    '#ORD-' + Math.random().toString(36).substring(2, 10).toUpperCase()
  )
  const [deliveryDate] = useState(() =>
    new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()
  )
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 15 }}
        className="mb-8"
      >
        <CheckCircle size={80} className="mx-auto text-primary" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="space-y-6"
      >
        <h1 className="text-5xl font-bold text-foreground">Thank You!</h1>
        <p className="text-lg text-muted-foreground">
          Your order has been placed successfully. We&apos;re preparing your items for shipment.
        </p>

        <div className="bg-white/60 backdrop-blur-md rounded-lg p-8 border border-border space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Order Number</p>
            <p className="text-2xl font-bold text-foreground">{orderNumber}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expected Delivery</p>
            <p className="text-xl font-semibold text-foreground">
              {deliveryDate}
            </p>
          </div>
        </div>

        <p className="text-muted-foreground">
          A confirmation email has been sent to your email address with order details and tracking information.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-block border-2 border-foreground text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-foreground hover:text-white transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
