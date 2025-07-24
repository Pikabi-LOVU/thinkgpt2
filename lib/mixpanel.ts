import mixpanel from 'mixpanel-browser'

// Use environment variable if available, otherwise use the provided token
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || '5db35e9f23a6b1e57c3e650603f3dc0e'

// Validate token
if (!MIXPANEL_TOKEN || MIXPANEL_TOKEN.length < 20) {
  console.error('[Mixpanel] Invalid or missing token')
}

let mixpanelInstance: typeof mixpanel | null = null
let initializationPromise: Promise<void> | null = null

// Queue for events that are tracked before initialization
interface QueuedEvent {
  type: 'track' | 'pageView' | 'identify'
  eventName?: string
  properties?: Record<string, any>
  userId?: string
  traits?: Record<string, any>
}

const eventQueue: QueuedEvent[] = []

// Process queued events after initialization
const processEventQueue = () => {
  console.log(`[Mixpanel] Processing ${eventQueue.length} queued events`)
  
  while (eventQueue.length > 0) {
    const event = eventQueue.shift()
    if (!event) continue
    
    switch (event.type) {
      case 'track':
        if (event.eventName) {
          trackEvent(event.eventName, event.properties)
        }
        break
      case 'pageView':
        if (event.eventName) {
          trackPageView(event.eventName, event.properties)
        }
        break
      case 'identify':
        if (event.userId) {
          identifyUser(event.userId, event.traits)
        }
        break
    }
  }
}

export const initMixpanel = async () => {
  if (typeof window === 'undefined') {
    console.warn('[Mixpanel] Cannot initialize on server side')
    return null
  }

  // 개발 환경에서는 Mixpanel을 초기화하지 않음
  const isDevelopment = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true'
  if (isDevelopment) {
    console.log('[Mixpanel] Skipping initialization in development mode')
    return null
  }

  // Return existing instance if already initialized
  if (mixpanelInstance) {
    console.log('[Mixpanel] Already initialized')
    return mixpanelInstance
  }

  // Return existing initialization promise if in progress
  if (initializationPromise) {
    await initializationPromise
    return mixpanelInstance
  }

  // Create initialization promise
  initializationPromise = new Promise((resolve) => {
    try {
      console.log('[Mixpanel] Initializing with token:', MIXPANEL_TOKEN.substring(0, 8) + '...')
      
      mixpanel.init(MIXPANEL_TOKEN, {
        debug: process.env.NODE_ENV === 'development',
        track_pageview: false, // We'll track page views manually
        persistence: 'localStorage',
        ip: true,
        property_blacklist: ['$current_url', '$initial_referrer', '$referrer'],
        loaded: (mixpanel) => {
          console.log('[Mixpanel] Successfully initialized')
          mixpanelInstance = mixpanel
          resolve()
          
          // Process any queued events
          setTimeout(() => {
            processEventQueue()
          }, 100)
        }
      })
    } catch (error) {
      console.error('[Mixpanel] Initialization error:', error)
      resolve() // Resolve anyway to prevent hanging
    }
  })

  await initializationPromise
  return mixpanelInstance
}

export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    console.warn('[Mixpanel] Cannot track event on server side:', eventName)
    return
  }

  // 개발 환경에서는 이벤트를 추적하지 않음
  const isDevelopment = process.env.NEXT_PUBLIC_IS_DEVELOPMENT === 'true'
  if (isDevelopment) {
    console.log('[Mixpanel] Development mode - skipping event:', eventName, properties)
    return
  }

  if (!mixpanelInstance) {
    console.warn('[Mixpanel] Not initialized yet, queueing event:', eventName)
    eventQueue.push({
      type: 'track',
      eventName,
      properties
    })
    return
  }

  try {
    const eventData = {
      ...properties,
      timestamp: new Date().toISOString(),
    }
    
    console.log('[Mixpanel] Tracking event:', eventName, eventData)
    mixpanelInstance.track(eventName, eventData)
  } catch (error) {
    console.error('[Mixpanel] Error tracking event:', eventName, error)
  }
}

export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    console.warn('[Mixpanel] Cannot track page view on server side:', pageName)
    return
  }

  if (!mixpanelInstance) {
    console.warn('[Mixpanel] Not initialized yet, queueing page view:', pageName)
    eventQueue.push({
      type: 'pageView',
      eventName: pageName,
      properties
    })
    return
  }

  try {
    const pageData = {
      page: pageName,
      url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer,
      ...properties,
    }
    
    console.log('[Mixpanel] Tracking page view:', pageData)
    mixpanelInstance.track('Page View', pageData)
  } catch (error) {
    console.error('[Mixpanel] Error tracking page view:', pageName, error)
  }
}

export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    console.warn('[Mixpanel] Cannot identify user on server side:', userId)
    return
  }

  if (!mixpanelInstance) {
    console.warn('[Mixpanel] Not initialized, cannot identify user:', userId)
    return
  }

  try {
    console.log('[Mixpanel] Identifying user:', userId, traits)
    mixpanelInstance.identify(userId)
    if (traits) {
      mixpanelInstance.people.set(traits)
    }
  } catch (error) {
    console.error('[Mixpanel] Error identifying user:', userId, error)
    // 에러 발생 시 리셋 후 재시도
    if (error.message?.includes('errAnonDistinctIdAssignedAlready')) {
      console.warn('[Mixpanel] Resetting and retrying with unique ID')
      mixpanelInstance.reset()
      const uniqueUserId = `${userId}_${Date.now()}`
      mixpanelInstance.identify(uniqueUserId)
      if (traits) {
        mixpanelInstance.people.set(traits)
      }
    }
  }
}

export const aliasUser = (alias: string, originalId: string) => {
  if (typeof window === 'undefined') {
    console.warn('[Mixpanel] Cannot alias user on server side')
    return
  }

  if (!mixpanelInstance) {
    console.warn('[Mixpanel] Not initialized, cannot alias user')
    return
  }

  try {
    console.log('[Mixpanel] Creating alias:', alias, 'for user:', originalId)
    mixpanelInstance.alias(alias, originalId)
  } catch (error) {
    console.error('[Mixpanel] Error creating alias:', error)
  }
}

export const resetUser = () => {
  if (typeof window === 'undefined') {
    console.warn('[Mixpanel] Cannot reset user on server side')
    return
  }

  if (!mixpanelInstance) {
    console.warn('[Mixpanel] Not initialized, cannot reset user')
    return
  }

  try {
    console.log('[Mixpanel] Resetting user')
    mixpanelInstance.reset()
  } catch (error) {
    console.error('[Mixpanel] Error resetting user:', error)
  }
}

// Debug helper function to check Mixpanel status
export const getMixpanelStatus = () => {
  return {
    initialized: !!mixpanelInstance,
    token: MIXPANEL_TOKEN.substring(0, 8) + '...',
    environment: process.env.NODE_ENV,
    isClientSide: typeof window !== 'undefined',
    hasLocalStorage: typeof window !== 'undefined' && !!window.localStorage,
  }
}

// Expose to window for debugging in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).mixpanelDebug = {
    getStatus: getMixpanelStatus,
    getInstance: () => mixpanelInstance,
    testTrack: () => trackEvent('Debug Test Event', { test: true }),
  }
}

export { mixpanel }