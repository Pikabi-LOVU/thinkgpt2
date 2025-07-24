'use client'

import { useEffect, Suspense, useState } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { initMixpanel, trackPageView } from '@/lib/mixpanel'

function MixpanelContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Initialize Mixpanel on mount
    const init = async () => {
      console.log('[MixpanelProvider] Starting initialization...')
      try {
        await initMixpanel()
        setIsInitialized(true)
        console.log('[MixpanelProvider] Initialization complete')
      } catch (error) {
        console.error('[MixpanelProvider] Failed to initialize:', error)
      }
    }
    init()
  }, [])

  useEffect(() => {
    // Track page views when route changes, but only after initialization
    if (pathname && isInitialized) {
      const url = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname

      console.log('[MixpanelProvider] Tracking page view:', pathname)
      trackPageView(pathname, {
        url,
        search: searchParams.toString(),
        aftercall: searchParams.get('aftercall') || null
      })
    }
  }, [pathname, searchParams, isInitialized])

  return <>{children}</>
}

export function MixpanelProvider({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <MixpanelContent>{children}</MixpanelContent>
    </Suspense>
  )
}