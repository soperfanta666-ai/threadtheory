'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '@/lib/store'
import { ThemeSwitcher } from '@/components/ThemeSwitcher'

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [productsOpen, setProductsOpen] = useState(false)
  const { getItemCount, toggleCart } = useCart()
  const itemCount = getItemCount()

 const categoryItems = [
    { name: 'Shirts',      query: 'Shirts' },
    { name: 'Shorts',      query: 'Shorts' },
    { name: 'Trousers',    query: 'Trousers' },
    { name: 'Jeans',       query: 'Jeans' },
    { name: 'Hoodies',     query: 'Hoodies' },
    { name: 'Jackets',     query: 'Jackets' },
    { name: 'Accessories', query: 'Accessories' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background/80 dark:bg-foreground/5 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/products/logo.png"
              alt="Thread & Theory Logo"
              width={64}
              height={64}
              className="w-16 h-16 mix-blend-multiply dark:invert dark:mix-blend-screen"
            />
            <span className="text-2xl font-bold text-foreground tracking-tight">Thread & Theory</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {/* Products Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors">
                Products
                <ChevronDown size={16} />
              </button>
              <div className="absolute left-0 mt-0 w-48 bg-background/95 dark:bg-foreground/10 backdrop-blur-md border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                {categoryItems.map((item) => (
                  <Link
                    key={item.query}
                    href={`/products?category=${item.query}`}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/about" className="text-sm text-foreground hover:text-primary transition-colors">
              About
            </Link>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Switcher */}
            <div className="hidden sm:block">
              <ThemeSwitcher />
            </div>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative p-2 text-foreground hover:text-primary transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-foreground"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            {/* Products Dropdown Mobile */}
            <button
              onClick={() => setProductsOpen(!productsOpen)}
              className="w-full flex items-center justify-between px-2 py-2 text-sm text-foreground hover:bg-secondary rounded"
            >
              Products
              <ChevronDown size={16} className={`transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>
            {productsOpen && (
              <div className="pl-4 space-y-2">
                {categoryItems.map((item) => (
                  <Link
                    key={item.query}
                    href={`/products?category=${item.query}`}
                    className="block px-2 py-2 text-sm text-foreground hover:bg-secondary rounded"
                    onClick={() => {
                      setIsOpen(false)
                      setProductsOpen(false)
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="/about"
              className="block px-2 py-2 text-sm text-foreground hover:bg-secondary rounded"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
