'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getVariant, getFunnel } from '@/lib/url-params'

interface TrackedEvent {
  name: string
  payload: any
  timestamp: string
}

export function AnalyticsDebug() {
  const [events, setEvents] = useState<TrackedEvent[]>([])
  const searchParams = useSearchParams()
  const variant = getVariant(searchParams)
  const funnel = getFunnel(searchParams)
  
  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV === 'production') return
    
    // Intercept Facebook Pixel events
    const originalFbq = (window as any).fbq
    if (originalFbq) {
      (window as any).fbq = function(...args: any[]) {
        if (args[0] === 'track' || args[0] === 'trackCustom') {
          setEvents(prev => [...prev, {
            name: `FB: ${args[1]}`,
            payload: args[2],
            timestamp: new Date().toISOString()
          }])
        }
        return originalFbq.apply(this, args)
      }
    }
    
    // Intercept gtag events
    const originalGtag = (window as any).gtag
    if (originalGtag) {
      (window as any).gtag = function(...args: any[]) {
        if (args[0] === 'event') {
          setEvents(prev => [...prev, {
            name: `GA4: ${args[1]}`,
            payload: args[2],
            timestamp: new Date().toISOString()
          }])
        }
        return originalGtag.apply(this, args)
      }
    }
    
    // Log initial state
    console.log('Analytics Debug - Current State:', {
      variant,
      funnel,
      url: window.location.href,
      searchParams: Object.fromEntries(searchParams.entries())
    })
  }, [variant, funnel, searchParams])
  
  if (process.env.NODE_ENV === 'production') return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs z-50 max-w-md max-h-96 overflow-auto">
      <div className="font-bold mb-2 text-yellow-400">Analytics Debug</div>
      <div className="mb-3 border-b border-gray-700 pb-2">
        <div>Variant: <span className="text-green-400">{variant}</span></div>
        <div>Funnel: <span className="text-green-400">{funnel}</span></div>
        <div className="text-gray-400 mt-1">Events: {events.length}</div>
      </div>
      
      <div className="space-y-2">
        {events.slice(-5).reverse().map((event, idx) => (
          <div key={idx} className="border-b border-gray-800 pb-2">
            <div className="text-yellow-300 font-semibold">{event.name}</div>
            <div className="text-gray-300 text-[10px]">
              {new Date(event.timestamp).toLocaleTimeString()}
            </div>
            {event.payload.variant && (
              <div className="text-green-400">v: {event.payload.variant}</div>
            )}
            {event.payload.funnel && (
              <div className="text-blue-400">f: {event.payload.funnel}</div>
            )}
            <details className="mt-1">
              <summary className="cursor-pointer text-gray-400 hover:text-white">
                Full payload
              </summary>
              <pre className="text-[10px] mt-1 overflow-x-auto">
                {JSON.stringify(event.payload, null, 2)}
              </pre>
            </details>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setEvents([])}
        className="mt-2 text-red-400 hover:text-red-300"
      >
        Clear
      </button>
    </div>
  )
}