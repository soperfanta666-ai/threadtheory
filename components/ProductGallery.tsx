'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

interface ProductGalleryProps {
  images: string[]
  productName: string
}

export const ProductGallery = ({ images, productName }: ProductGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-3">
      <motion.div
        key={selectedImage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="relative h-72 sm:h-[500px] rounded-lg overflow-hidden bg-secondary"
      >
        <Image
          src={images[selectedImage]}
          alt={productName}
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative flex-shrink-0 h-16 w-16 sm:h-20 sm:w-20 rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index ? 'border-primary' : 'border-border hover:border-primary'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}