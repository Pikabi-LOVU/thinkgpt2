'use client'

import { ReadonlyURLSearchParams } from 'next/navigation'

// Default values for parameters
export const DEFAULT_PARAMS = {
  v: '',  // variant: grade, gangnam, aicopy, recognition (빈 값 = direct_traffic)
  f: 'trial'     // funnel: trial, consult
} as const

// UTM parameters and other tracking parameters to preserve
const PRESERVED_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',      // Google Ads
  'fbclid',     // Facebook
  'msclkid',    // Microsoft Ads
  'ttclid',     // TikTok
  'v',          // variant parameter
  'f',          // funnel parameter
  'aftercall'   // consult to trial conversion tracking
]

export function preserveParams(currentParams: ReadonlyURLSearchParams | URLSearchParams | null): string {
  if (!currentParams) return ''
  
  const params = new URLSearchParams()
  
  PRESERVED_PARAMS.forEach(param => {
    const value = currentParams.get(param)
    if (value) {
      params.set(param, value)
    }
  })
  
  const paramString = params.toString()
  return paramString ? `?${paramString}` : ''
}

export function mergeParams(
  targetUrl: string, 
  currentParams: ReadonlyURLSearchParams | URLSearchParams | null,
  additionalParams?: Record<string, string>
): string {
  const [baseUrl, existingParams] = targetUrl.split('?')
  const params = new URLSearchParams(existingParams || '')
  
  // Preserve tracking parameters from current URL
  if (currentParams) {
    PRESERVED_PARAMS.forEach(param => {
      const value = currentParams.get(param)
      if (value && !params.has(param)) {
        params.set(param, value)
      }
    })
  }
  
  // Add any additional parameters
  if (additionalParams) {
    Object.entries(additionalParams).forEach(([key, value]) => {
      params.set(key, value)
    })
  }
  
  const paramString = params.toString()
  return paramString ? `${baseUrl}?${paramString}` : baseUrl
}

/**
 * Get parameter value with fallback to default
 */
export function getParamWithDefault(
  searchParams: ReadonlyURLSearchParams | URLSearchParams | null,
  paramName: 'v' | 'f'
): string {
  if (!searchParams) return DEFAULT_PARAMS[paramName]
  return searchParams.get(paramName) || DEFAULT_PARAMS[paramName]
}

/**
 * Get variant parameter with default
 */
export function getVariant(searchParams: ReadonlyURLSearchParams | URLSearchParams | null): string {
  return getParamWithDefault(searchParams, 'v')
}

/**
 * Get funnel parameter with default
 */
export function getFunnel(searchParams: ReadonlyURLSearchParams | URLSearchParams | null): string {
  return getParamWithDefault(searchParams, 'f')
}

/**
 * Get aftercall parameter (for tracking consult to trial conversions)
 */
export function getAfterCall(searchParams: ReadonlyURLSearchParams | URLSearchParams | null): string | null {
  if (!searchParams) return null
  return searchParams.get('aftercall')
}