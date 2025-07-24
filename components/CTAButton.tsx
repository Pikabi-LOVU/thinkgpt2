'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { fbEvent, fbLead } from '@/lib/facebook-pixel'
import { useSearchParams } from 'next/navigation'

interface CTAButtonProps {
  href: string
  children: React.ReactNode
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  price?: number
  source?: string
}

export function CTAButton({ href, children, className, size, price = 29000, source }: CTAButtonProps) {
  const searchParams = useSearchParams()
  
  // Construct the final href with preserved parameters
  const constructHref = () => {
    const [basePath, queryString] = href.split('?')
    const existingParams = new URLSearchParams(queryString || '')
    
    // Get current parameters
    const variant = searchParams.get('v')
    const funnel = searchParams.get('f')
    const afterCall = searchParams.get('aftercall')
    
    // Remove v, f, and aftercall to control order
    existingParams.delete('v')
    existingParams.delete('f')
    existingParams.delete('aftercall')
    
    // Build URL with f first, then v, then aftercall, then other params
    const orderedParams = []
    if (funnel) orderedParams.push(`f=${funnel}`)
    if (variant) orderedParams.push(`v=${variant}`)
    
    // aftercall 처리: browse에서 체험 시작하면 trial로 변경
    if (afterCall) {
      const finalAfterCall = afterCall === 'browse' ? 'trial' : afterCall
      orderedParams.push(`aftercall=${finalAfterCall}`)
    }
    
    // Add remaining params
    existingParams.forEach((value, key) => {
      orderedParams.push(`${key}=${value}`)
    })
    
    const finalQueryString = orderedParams.join('&')
    return finalQueryString ? `${basePath}?${finalQueryString}` : basePath
  }
  
  const finalHref = constructHref()
  
  const handleClick = () => {
    // source는 prop으로만 받아서 처리
    const buttonSource = source || 'unknown'
    const variant = searchParams.get('v') || ''
    const funnel = searchParams.get('f') || 'trial'
    const afterCall = searchParams.get('aftercall')
    
    // Store source in sessionStorage for next page
    if (typeof window !== 'undefined' && source) {
      sessionStorage.setItem('cta_source', source)
    }
    
    // Facebook Pixel - 퍼널별 다른 이벤트
    if (funnel === 'consult') {
      // f=consult는 Lead 이벤트 발생
      fbEvent('Lead', {
        value: 0, // 초기 관심 표시
        currency: 'KRW',
        content_name: '생각톡 무료 상담 CTA 클릭',
        content_category: 'Education',
        lead_event_source: 'CTA Button',
        button_location: buttonSource,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        variant: variant || 'direct_traffic',
        has_variant: !!variant,
        funnel: funnel,
        after_call: afterCall || null
      })
    } else {
      // f=trial은 기존대로 InitiateCheckout
      fbEvent('InitiateCheckout', {
        value: 0,
        currency: 'KRW',
        num_items: 1,
        content_category: 'Education',
        content_type: 'product',
        content_name: '생각톡 2주 체험',
        content_ids: ['thinkgpt_trial_2weeks'],
        contents: [{
          id: 'thinkgpt_trial_2weeks',
          quantity: 1,
          item_price: 0
        }],
        button_location: buttonSource,
        page_path: typeof window !== 'undefined' ? window.location.pathname : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        variant: variant || 'direct_traffic',
        has_variant: !!variant,
        funnel: funnel,
        after_call: afterCall || null
      })
    }
  }

  return (
    <Link href={finalHref} onClick={handleClick}>
      <Button size={size} className={className}>
        {children}
      </Button>
    </Link>
  )
}