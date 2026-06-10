'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

export const ParticleBackground = () => {
  const [particles, setParticles] = useState<Array<{
    id: number
    size: number
    duration: number
    delay: number
    x: number
    y: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }))
    setParticles(newParticles)
  }, [])

  if (particles.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-accent/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.5, 0],
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
  )
}