'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const Hero = () => {
  const [particles, setParticles] = useState<Array<{
    id: number
    size: number
    duration: number
    delay: number
    x: number
    y: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  if (particles.length === 0) {
    return (
      <section className="relative min-h-[70vh] flex items-center justify-center text-center py-20 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="space-y-6 bg-background/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-border shadow-2xl">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
              Crafted for
              <br />
              <span className="text-primary">Confidence</span>
            </h1>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center text-center py-20 overflow-hidden">
      <div className="absolute inset-0 -z-20 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-primary/30"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: '0 0 8px rgba(53, 92, 160, 0.6)',
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, (Math.random() * 40 - 20), 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
        />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6 bg-background/40 backdrop-blur-md rounded-3xl p-8 sm:p-12 border border-border shadow-2xl"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            Crafted for
            <br />
            <span className="text-primary">Confidence</span>
          </h1>

          <p className="text-lg sm:text-xl text-foreground/80 max-w-2xl mx-auto">
            Premium clothing designed with meticulous attention to detail. Every piece tells a story of
            craftsmanship and quality.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
          >
            <Link
              href="/products"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity text-center"
            >
              Shop Now
            </Link>
            <Link
              href="/products"
              className="inline-block border-2 border-foreground text-foreground px-8 py-4 rounded-lg font-semibold hover:bg-foreground hover:text-white transition-colors text-center"
            >
              Explore Collection
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}