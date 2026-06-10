import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { ParticleBackground } from '@/components/ParticleBackground'
import { ThemeProvider } from '@/components/ThemeProvider'
import { LoadingProvider } from '@/lib/loading-context'
import { LoadingOverlay } from '@/components/LoadingOverlay'

const geist = Geist({ subsets: ["latin"] });
const geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Thread & Theory - Premium Clothing',
  description: 'Premium clothing designed with meticulous attention to detail',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className={`${geist.className} font-sans antialiased bg-background`}>
        <LoadingProvider>
          <LoadingOverlay />
          <ThemeProvider>
            <ParticleBackground />
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <CartDrawer />
            <Footer />
          </ThemeProvider>
        </LoadingProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
