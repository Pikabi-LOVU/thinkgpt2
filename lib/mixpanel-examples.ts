/**
 * Mixpanel Integration Examples
 * 
 * This file demonstrates various ways to use Mixpanel tracking in your application.
 * Import the functions from '@/lib/mixpanel' wherever you need them.
 */

import { trackEvent, identifyUser, trackPageView } from '@/lib/mixpanel'

// Example 1: Track a button click
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('Button Clicked', {
    button_name: buttonName,
    location: location,
    timestamp: new Date().toISOString(),
  })
}

// Example 2: Track form submission
export const trackFormSubmission = (formName: string, formData: Record<string, any>) => {
  trackEvent('Form Submitted', {
    form_name: formName,
    fields_filled: Object.keys(formData).length,
    ...formData,
  })
}

// Example 3: Track trial registration
export const trackTrialRegistration = (planInterest: string, childrenCount: number) => {
  trackEvent('Trial Registered', {
    plan_interest: planInterest,
    children_count: childrenCount,
    timestamp: new Date().toISOString(),
  })
}

// Example 4: Track user engagement
export const trackVideoPlay = (videoName: string, duration: number) => {
  trackEvent('Video Played', {
    video_name: videoName,
    duration_seconds: duration,
  })
}

// Example 5: Track error events
export const trackError = (errorType: string, errorMessage: string, location: string) => {
  trackEvent('Error Occurred', {
    error_type: errorType,
    error_message: errorMessage,
    location: location,
    timestamp: new Date().toISOString(),
  })
}

// Example 6: User identification (after login/signup)
export const trackUserLogin = (userId: string, userInfo: { email?: string; name?: string; grade?: string }) => {
  identifyUser(userId, {
    $email: userInfo.email,
    $name: userInfo.name,
    grade: userInfo.grade,
    last_login: new Date().toISOString(),
  })
  
  trackEvent('User Logged In', {
    user_id: userId,
    method: 'email', // or 'social', 'phone', etc.
  })
}

// Example 7: Track feature usage
export const trackFeatureUsage = (featureName: string, metadata?: Record<string, any>) => {
  trackEvent('Feature Used', {
    feature_name: featureName,
    ...metadata,
  })
}

// Example 8: Track scroll depth
export const trackScrollDepth = (percentage: number, pageName: string) => {
  trackEvent('Page Scrolled', {
    scroll_percentage: percentage,
    page_name: pageName,
  })
}

// Example usage in a React component:
/*
import { trackButtonClick, trackFormSubmission } from '@/lib/mixpanel-examples'

// In your component:
<Button onClick={() => trackButtonClick('Start Learning', 'hero_section')}>
  Start Learning
</Button>

// In your form handler:
const handleSubmit = (data) => {
  trackFormSubmission('consultation_form', data)
  // ... rest of your form submission logic
}
*/