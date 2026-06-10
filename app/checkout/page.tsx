'use client'

import { useState } from 'react'
import { useCart } from '@/lib/store'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'sonner'

const WHATSAPP_NUMBER = '923006302324'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    city: '',
  })

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Add some items before checking out.</p>
        <Link href="/products" className="inline-block bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold">
          Continue Shopping
        </Link>
      </div>
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.firstName || !formData.lastName) {
      toast.error('Please enter your full name')
      return
    }
    if (!formData.phone) {
      toast.error('Please enter your phone number')
      return
    }
    if (!formData.address || !formData.city) {
      toast.error('Please enter your delivery address')
      return
    }

    const orderLines = items.map((item) =>
      `  • ${item.productName} | Size: ${item.size} | Colour: ${item.color} | Qty: ${item.quantity} | Rs. ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n')

    const total = getTotal()

    const message = `
*New Order — Thread & Theory*

*Customer Details*
Name: ${formData.firstName} ${formData.lastName}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}

*Order Summary*
${orderLines}

*Total: Rs. ${total.toLocaleString()}*

Please confirm availability and share payment details. Thank you!
    `.trim()

    const encoded = encodeURIComponent(message)
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`

    clearCart()
    window.open(url, '_blank')
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h1 className="text-4xl font-bold text-foreground mb-4">Checkout</h1>
      <p className="text-muted-foreground mb-12">Fill in your details and we'll confirm your order via WhatsApp.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

        {/* Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground">Your Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number (e.g. 0300 1234567)"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />

            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-border rounded-lg focus:outline-none focus:border-primary transition-colors"
              required
            />

            <button
              type="submit"
              className="w-full py-4 rounded-lg font-semibold text-lg bg-green-500 text-white hover:bg-green-600 transition-colors flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Order via WhatsApp
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="h-fit sticky top-24 bg-white/60 backdrop-blur-md rounded-lg p-8 border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 pb-4 border-b border-border">
                <div className="relative h-16 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-secondary">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-sm">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">{item.size} · {item.color}</p>
                  <p className="text-sm font-medium text-foreground mt-1">
                    {item.quantity} × Rs. {item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2 border-t border-border pt-6">
            <div className="flex justify-between text-foreground">
              <span>Subtotal:</span>
              <span>Rs. {getTotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-foreground">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-foreground pt-4 border-t border-border">
              <span>Total:</span>
              <span>Rs. {getTotal().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}