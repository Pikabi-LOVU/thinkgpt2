"use client"

import { useEffect, useRef } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import { useSearchParams } from 'next/navigation'
import { getVariant, getFunnel, getAfterCall } from '@/lib/url-params'

interface ScrollTrackerProps {
  threshold?: number // Percentage of element that needs to be visible (0-1)
}

export function ScrollTracker({ threshold = 0.5 }: ScrollTrackerProps) {
  const searchParams = useSearchParams()
  const variant = getVariant(searchParams)
  const funnel = getFunnel(searchParams)
  const afterCall = getAfterCall(searchParams)
  const trackedElements = useRef<Set<string>>(new Set())

  useEffect(() => {
    // Initialize IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Check if element is visible enough and hasn't been tracked yet
          if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
            const element = entry.target as HTMLElement
            const trackId = element.getAttribute('data-track-id')
            
            if (trackId && !trackedElements.current.has(trackId)) {
              // Mark as tracked to prevent duplicate events
              trackedElements.current.add(trackId)
              
              // Get additional data attributes
              const section = element.getAttribute('data-section') || 'unknown'
              const elementType = element.tagName.toLowerCase()
              
              // Calculate element position percentage
              const elementRect = element.getBoundingClientRect()
              const elementTop = elementRect.top + window.scrollY
              const documentHeight = document.documentElement.scrollHeight
              const viewportHeight = window.innerHeight
              const scrollableHeight = documentHeight - viewportHeight
              
              // Calculate position percentage (0-100)
              const positionPercentage = Math.round((elementTop / scrollableHeight) * 100)
              
              // Send tracking event
              trackEvent('Section Viewed', {
                section_id: trackId,
                section_name: section,
                page_path: window.location.pathname,
                page_url: window.location.href,
                visibility_threshold: threshold,
                element_text: element.textContent?.slice(0, 100), // First 100 chars
                position_percentage: positionPercentage, // Where on the page (0-100%)
                variant: variant,
                funnel: funnel,
                after_call: afterCall || null,
              })
            }
          }
        })
      },
      {
        threshold: threshold, // Fire when element is 50% visible by default
        rootMargin: '0px', // No margin
      }
    )

    // Observe all elements with data-track-id attribute
    const elementsToTrack = document.querySelectorAll('[data-track-id]')
    elementsToTrack.forEach((element) => {
      observer.observe(element)
    })

    // Cleanup observer on unmount
    return () => {
      observer.disconnect()
    }
  }, [threshold])

  // This component doesn't render anything
  return null
}