'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface LoadingContextType {
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('thread-theory-visited')

    if (!hasVisited) {
      setIsLoading(true)
      sessionStorage.setItem('thread-theory-visited', 'true')

      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error('useLoading must be used within LoadingProvider')
  }
  return context
}