// Facebook Pixel helper functions

export const FB_PIXEL_ID = '1783682132231736'

// TypeScript declaration for Facebook Pixel
declare global {
  interface Window {
    fbq: any
  }
}

// Track custom events
export const fbEvent = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, options)
  }
}

// Standard Facebook events
export const fbPageView = () => {
  fbEvent('PageView')
}

export const fbViewContent = (contentName: string, contentCategory: string, funnel?: string) => {
  fbEvent('ViewContent', {
    content_name: contentName,
    content_category: contentCategory,
    content_type: 'product_group',  // 상품 그룹으로 변경
    funnel: funnel
    // value 제거 - 아직 플랜 미정
  })
}

export const fbAddToCart = (value: number, currency = 'KRW', contentName?: string, contentId?: string) => {
  fbEvent('AddToCart', {
    value: value,
    currency: currency,
    content_name: contentName,
    content_ids: contentId ? [contentId] : undefined,
    content_type: 'product',
  })
}

export const fbInitiateCheckout = (value: number, currency = 'KRW', numItems = 1) => {
  fbEvent('InitiateCheckout', {
    value: value,
    currency: currency,
    num_items: numItems,
  })
}

export const fbPurchase = (value: number, currency = 'KRW', contentName?: string, contentId?: string) => {
  fbEvent('Purchase', {
    value: value,
    currency: currency,
    content_name: contentName,
    content_ids: contentId ? [contentId] : undefined,
    content_type: 'product',
  })
}

export const fbLead = (value?: number, currency = 'KRW', contentName?: string) => {
  fbEvent('Lead', {
    value: value,
    currency: currency,
    content_name: contentName,
  })
}

export const fbCompleteRegistration = (value?: number, currency = 'KRW', contentName?: string) => {
  fbEvent('CompleteRegistration', {
    value: value,
    currency: currency,
    content_name: contentName,
    status: true,
  })
}

export const fbAddPaymentInfo = (value: number, currency = 'KRW', contentName?: string, predictedLTV?: number) => {
  fbEvent('AddPaymentInfo', {
    value: value,
    currency: currency,
    content_name: contentName,
    predicted_ltv: predictedLTV,
  })
}

export const fbStartTrial = (value: number, currency = 'KRW', predictedLTV?: number, trialPeriod?: string) => {
  fbEvent('StartTrial', {
    value: value,
    currency: currency,
    predicted_ltv: predictedLTV,
    trial_period: trialPeriod || '14_days',
    content_type: 'subscription'
  })
}