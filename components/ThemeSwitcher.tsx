'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <div className="flex items-center gap-1 bg-secondary/50 backdrop-blur-sm rounded-lg p-1 border border-border">
      <button
        onClick={() => setTheme('light')}
        className={`p-2 rounded transition-colors ${
          theme === 'light'
            ? 'bg-primary/20 text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Light theme"
        aria-label="Light theme"
      >
        <Sun size={18} />
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={`p-2 rounded transition-colors ${
          theme === 'dark'
            ? 'bg-primary/20 text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="Dark theme"
        aria-label="Dark theme"
      >
        <Moon size={18} />
      </button>
      <button
        onClick={() => setTheme('system')}
        className={`p-2 rounded transition-colors ${
          theme === 'system'
            ? 'bg-primary/20 text-primary'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title="System theme"
        aria-label="System theme"
      >
        <Monitor size={18} />
      </button>
    </div>
  )
}
