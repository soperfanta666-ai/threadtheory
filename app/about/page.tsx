'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6">
            About Thread & Theory
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We believe that clothing is more than just fabric—it&apos;s a statement of character, a reflection of individuality, and a canvas for self-expression.
          </p>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary/50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                At Thread & Theory, we&apos;re committed to crafting premium clothing that combines timeless design with exceptional quality. Each piece is meticulously designed and constructed to withstand the test of time.
              </p>
              <p className="text-lg text-muted-foreground">
                We believe in sustainable fashion, ethical production, and creating garments that empower you to express your unique style with confidence.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary/30 mb-4">Thread & Theory</div>
                  <p className="text-muted-foreground text-lg">Premium Quality. Timeless Design.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground mb-6">Our Values</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These principles guide everything we do, from design to delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Craftsmanship',
              description: 'We obsess over every detail, ensuring that every stitch, seam, and fabric choice reflects our commitment to excellence.',
            },
            {
              title: 'Sustainability',
              description: 'We source responsibly and produce ethically, minimizing our environmental impact while supporting fair labor practices.',
            },
            {
              title: 'Innovation',
              description: 'We blend traditional tailoring techniques with modern design sensibilities to create clothing that&apos;s both timeless and contemporary.',
            },
            {
              title: 'Quality',
              description: 'Premium materials and rigorous testing ensure that every garment meets our exacting standards for durability and comfort.',
            },
            {
              title: 'Inclusivity',
              description: 'Our collections cater to diverse body types and personal styles, ensuring everyone can find something that makes them feel confident.',
            },
            {
              title: 'Authenticity',
              description: 'We stay true to our brand identity while continuously evolving to meet the needs and preferences of our discerning customers.',
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/40 backdrop-blur-sm border border-border rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-secondary/50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-foreground mb-8">Our Story</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Thread & Theory was born from a simple idea: create clothing that matters. In a world of fast fashion and disposable trends, we wanted to offer something different—timeless pieces crafted with intention and care.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              What started as a passion project has evolved into a commitment to excellence. Today, we work with the finest manufacturers and most talented designers to bring you collections that inspire confidence and lasting style.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every garment is a testament to our belief that quality never goes out of style. We&apos;re not just selling clothes—we&apos;re creating moments, building confidence, and helping you express the best version of yourself.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-foreground mb-8">Ready to Experience the Difference?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore our collections and discover why discerning customers choose Thread & Theory.
          </p>
          <Link
            href="/products"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
