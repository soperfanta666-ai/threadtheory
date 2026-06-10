'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useLoading } from '@/lib/loading-context'
import { useEffect, useState } from 'react'

export const LoadingOverlay = () => {
  const { isLoading } = useLoading()
  
  // Use state to hold particles - starts empty
  const [particles, setParticles] = useState<Array<{
    id: number
    size: number
    duration: number
    delay: number
    x: number
    y: number
  }>>([])

  // Only generate particles on client side after mount
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  // Don't render anything until particles are generated on client
  if (particles.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background dark:bg-foreground overflow-hidden"
        >
          {/* Animated particle background */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                className="absolute rounded-full bg-primary/30"
                style={{
                  width: particle.size,
                  height: particle.size,
                  left: `${particle.x}%`,
                  top: `${particle.y}%`,
                  boxShadow: '0 0 12px rgba(53, 92, 160, 0.8)',
                }}
                animate={{
                  y: [0, -200, 0],
                  x: [0, (Math.random() * 60 - 30), 0], // Fixed - computed once per particle
                  opacity: [0, 0.8, 0],
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

          {/* Floating gradient orbs */}
          <div className="absolute inset-0 -z-20 overflow-hidden">
            <motion.div
              animate={{ y: [0, -30, 0] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-accent/20 blur-3xl"
            />
            <motion.div
              animate={{ y: [0, 30, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl"
            />
          </div>

          {/* Loading Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 text-center"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6 flex justify-center"
            >
              <Image 
                src="/logo-square.png" 
                alt="Thread & Theory Logo" 
                width={80} 
                height={80}
                className="w-20 h-20 dark:invert"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground dark:text-white mb-8"
            >
              Thread & Theory
            </motion.h1>

            {/* Animated loading dots */}
            <motion.div className="flex justify-center gap-2">
              {[0, 1, 2].map((dot) => (
                <motion.div
                  key={dot}
                  className="w-3 h-3 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: dot * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}