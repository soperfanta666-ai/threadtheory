import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Youtube, Twitter } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-foreground text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/logo-square.png"
                alt="Thread & Theory Logo"
                width={40}
                height={40}
                className="w-10 h-10 invert"
              />
              <h3 className="text-2xl font-bold">Thread & Theory</h3>
            </div>
            <p className="text-gray-300 text-sm mb-6">Premium clothing for the discerning individual.</p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-gray-600 hover:border-white hover:text-white text-gray-400 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-gray-600 hover:border-white hover:text-white text-gray-400 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" aria-label="YouTube" className="p-2 rounded-full border border-gray-600 hover:border-white hover:text-white text-gray-400 transition-colors">
                <Youtube size={16} />
              </a>
              <a href="#" aria-label="Twitter / X" className="p-2 rounded-full border border-gray-600 hover:border-white hover:text-white text-gray-400 transition-colors">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=Shirts" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Shirts
                </Link>
              </li>
              <li>
                <Link href="/products?category=Jackets" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Jackets
                </Link>
              </li>
              <li>
                <Link href="/products?category=Accessories" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <a href="https://wa.me/923006302324" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Contact
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar — payment badges + copyright */}
        <div className="border-t border-gray-700 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-300 text-sm">&copy; 2026 Thread & Theory. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 mr-1">We accept:</span>
            {['JazzCash', 'Easypaisa', 'Cash on Delivery'].map((method) => (
              <span
                key={method}
                className="px-2.5 py-1 border border-gray-600 rounded text-xs text-gray-300 font-medium whitespace-nowrap"
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
