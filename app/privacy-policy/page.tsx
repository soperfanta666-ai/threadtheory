'use client'

import { motion } from 'framer-motion'

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-12">Last updated: June 2026</p>

        <div className="space-y-10 text-foreground">

          <section>
            <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you place an order through Thread & Theory, we collect the information you provide directly — including your name, phone number, and delivery address. This is submitted via WhatsApp and is used solely to process and deliver your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use your personal information only to fulfil your order, confirm availability, arrange delivery, and communicate with you about your purchase. We do not use your information for marketing without your consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">3. Sharing of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. Your details may be shared with delivery partners solely for the purpose of fulfilling your order.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">4. Data Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your cart data is stored locally in your browser (localStorage) and is never transmitted to our servers. Order details shared via WhatsApp are retained only as long as necessary to complete your purchase.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">5. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              This website uses minimal browser storage to remember your cart between sessions. We do not use tracking cookies or third-party advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed">
              You may request the deletion of any personal information we hold about you at any time by contacting us via WhatsApp. We will respond within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">7. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this policy from time to time. Any changes will be posted on this page with an updated date. Continued use of the website constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3">8. Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this Privacy Policy, please reach out to us via{' '}
              <a
                href="https://wa.me/923006302324"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:opacity-80 transition-opacity"
              >
                WhatsApp
              </a>.
            </p>
          </section>

        </div>
      </motion.div>
    </div>
  )
}
