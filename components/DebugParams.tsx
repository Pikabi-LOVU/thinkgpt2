'use client'

import { useSearchParams } from 'next/navigation'
import { getVariant, getFunnel } from '@/lib/url-params'

export function DebugParams() {
  const searchParams = useSearchParams()
  const variant = getVariant(searchParams)
  const funnel = getFunnel(searchParams)
  
  // Only show in development
  if (process.env.NODE_ENV === 'production') return null
  
  return (
    <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg text-xs z-50 max-w-xs">
      <div className="font-bold mb-2">URL Parameters Debug</div>
      <div>Raw URL: {typeof window !== 'undefined' ? window.location.href : 'SSR'}</div>
      <div>Variant (v): {variant} {searchParams?.get('v') ? '' : '(default)'}</div>
      <div>Funnel (f): {funnel} {searchParams?.get('f') ? '' : '(default)'}</div>
      <div className="mt-2 opacity-60">
        <div>All params:</div>
        {searchParams && Array.from(searchParams.entries()).map(([key, value]) => (
          <div key={key} className="ml-2">- {key}: {value}</div>
        ))}
      </div>
    </div>
  )
}