"use client"

export const dynamic = 'force-dynamic'

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CheckCircle, Brain, AlertCircle, MessageSquare, CreditCard, ChevronDown, Info } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { trackEvent, identifyUser } from "@/lib/mixpanel"
import { fbEvent, fbStartTrial, fbAddToCart } from "@/lib/facebook-pixel"
import { getVariant, getFunnel, getAfterCall } from "@/lib/url-params"

type PageStep = 'form' | 'complete'

function TrialContent() {
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const [sourceFromUrl, setSourceFromUrl] = useState("direct")
  const planFromUrl = searchParams?.get("plan") || "monthly"
  const variantFromUrl = getVariant(searchParams)
  const funnelFromUrl = getFunnel(searchParams)
  const afterCallFromUrl = getAfterCall(searchParams)
  
  // Korean surnames for random notification
  const koreanSurnames = ['김', '이', '박', '최', '정', '강', '조', '윤', '장', '임', '한', '오', '서', '신', '권', '황', '안', '송', '류', '전', '홍', '고', '문', '양', '손', '배', '유', '백', '허', '남', '심', '노', '하', '곽', '성', '차', '주', '우', '구', '민', '유', '진', '엄', '원', '천', '방', '공', '현', '함', '변', '염', '여', '추', '도', '소', '석', '선', '설', '마', '길', '연', '위', '표', '명', '기', '반', '라', '왕', '금', '옥', '육', '인', '맹', '제', '모', '탁', '국', '어', '은', '편']
  
  const [notification, setNotification] = useState<string | null>(null)
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  
  const [currentStep, setCurrentStep] = useState<PageStep>('form')
  const [isLoading, setIsLoading] = useState(false)
  const [showSystemError, setShowSystemError] = useState(false)
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    phone: "",
    children: [
      { grade: "" }, // 자녀 1 (필수)
      { grade: "" }, // 자녀 2 (선택)
    ],
    interestedPlan: "", // 관심 플랜
    selectedPaymentMethod: "", // 선택한 결제 방식
    consultDayPreference: "", // 평일만/주말만/평일주말다가능
    consultTimeSlots: [] as string[], // 선호 시간대 (복수 선택)
    consultMessage: "", // 남기실 말씀 (선택사항)
  })

  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())
  const [hasStartedForm, setHasStartedForm] = useState(false)
  const [hasCompletedPixelEvents, setHasCompletedPixelEvents] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [selectedCard, setSelectedCard] = useState('')
  const [showCardDropdown, setShowCardDropdown] = useState(false)
  const [selectedInstallment, setSelectedInstallment] = useState('일시불')
  const [showInstallmentDropdown, setShowInstallmentDropdown] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Get source from sessionStorage first, then URL, then default
    const sessionSource = typeof window !== 'undefined' ? sessionStorage.getItem('cta_source') : null
    const urlSource = searchParams?.get("source")
    const finalSource = sessionSource || urlSource || "direct"
    setSourceFromUrl(finalSource)
    
    // Clear sessionStorage after reading
    if (sessionSource && typeof window !== 'undefined') {
      sessionStorage.removeItem('cta_source')
    }
    
    // URL에서 플랜 정보가 있으면 자동 선택
    if (planFromUrl) {
      setFormData(prev => ({ ...prev, interestedPlan: planFromUrl }))
    }
    
    // Track page view based on funnel type
    if (funnelFromUrl === 'trial') {
      let pageViewEventName = 'TrialPageViewed'
      
      // aftercall이 있으면 별도 이벤트명 사용
      if (afterCallFromUrl) {
        pageViewEventName = 'TrialPageViewed_aftercall'
      }
      
      trackEvent(pageViewEventName, {
        source: finalSource,
        variant: variantFromUrl || 'direct_traffic',
        has_variant: !!variantFromUrl,
        funnel: funnelFromUrl,
        after_call: afterCallFromUrl || null
      })
    } else {
      trackEvent('ConsultPageViewed', {
        source: finalSource,
        variant: variantFromUrl || 'direct_traffic',
        has_variant: !!variantFromUrl,
        funnel: funnelFromUrl,
        after_call: afterCallFromUrl || null,
        after_call: afterCallFromUrl || null
      })
    }
  }, [])
  
  // Random notification effect
  useEffect(() => {
    if (currentStep !== 'form') return
    
    const messageTemplates = funnelFromUrl === 'consult' ? [
      '님이 무료 상담 신청하셨습니다',
      '님이 무료 상담 완료하셨습니다',
      '님이 무료 상담 예약하셨습니다',
      '님이 무료 상담 문의하셨습니다'
    ] : [
      '님이 2주 체험 시작하셨습니다',
      '님이 월간 플랜 결제하셨습니다',
      '님이 연간 플랜으로 업그레이드하셨습니다',
      '님이 재구매하셨습니다'
    ]
    
    const showRandomNotification = () => {
      const randomSurname = koreanSurnames[Math.floor(Math.random() * koreanSurnames.length)]
      const randomMessage = messageTemplates[Math.floor(Math.random() * messageTemplates.length)]
      setNotification(`${randomSurname}○○ 학부모${randomMessage}`)
      setIsNotificationVisible(true)
      
      // Start fade out before removing
      const fadeOutDuration = 3500
      setTimeout(() => {
        setIsNotificationVisible(false)
      }, fadeOutDuration)
      
      // Remove notification after fade completes
      setTimeout(() => {
        setNotification(null)
      }, fadeOutDuration + 500)
    }
    
    // Show first notification after 1.5-3 seconds
    const firstDelay = Math.random() * 1500 + 1500
    const firstTimeout = setTimeout(showRandomNotification, firstDelay)
    
    // Use recursive setTimeout for more natural intervals
    let timeoutId: NodeJS.Timeout
    const scheduleNext = () => {
      // Random interval between 4-12 seconds
      const nextDelay = Math.random() * 8000 + 4000
      timeoutId = setTimeout(() => {
        showRandomNotification()
        scheduleNext()
      }, nextDelay)
    }
    
    // Start the recursive scheduling
    const scheduleTimeout = setTimeout(scheduleNext, firstDelay + 3000)
    
    return () => {
      clearTimeout(firstTimeout)
      clearTimeout(scheduleTimeout)
      clearTimeout(timeoutId)
    }
  }, [funnelFromUrl, currentStep])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    
    // AddToCart 이벤트 - 플랜 선택 시 (모든 funnel)
    if (field === 'interestedPlan' && value) {
      const planPrice = value === 'yearly' ? 290000 : 29000
      const planId = value === 'yearly' ? 'yearly_plan' : 'monthly_plan'
      
      fbAddToCart(
        planPrice,
        'KRW',
        `ThinkGPT ${value === 'yearly' ? '연간' : '월간'} 플랜`,
        planId
      )
    }
  }

  const handleChildGradeChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newChildren = [...prev.children]
      newChildren[index] = { grade: value }
      return { ...prev, children: newChildren }
    })
  }


  const handleFieldFocus = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field))
    
    // ConsultFormStart 이벤트 - f=consult일 때 처음 입력 시작
    if (!hasStartedForm && funnelFromUrl === 'consult') {
      setHasStartedForm(true)
      fbEvent('ConsultFormStart', {
        funnel: funnelFromUrl,
        variant: variantFromUrl || 'direct_traffic',
        has_variant: !!variantFromUrl,
        source: sourceFromUrl,
        first_field: field,
        after_call: afterCallFromUrl || null
      })
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isFormComplete = formData.parentName &&
                          formData.email && 
                          formData.phone && // 모든 퍼널에서 필수
                          formData.children[0].grade && // 첫 번째 자녀는 필수
                          (funnelFromUrl === 'consult' ? (
                            formData.consultDayPreference && // 상담 요일 선택 필수
                            formData.consultTimeSlots.length > 0 // 상담 시간 선택 필수
                          ) : (
                            formData.interestedPlan && // trial에서만 플랜 필수
                            formData.selectedPaymentMethod // 결제 수단 선택 필수
                          ))

    // Track submission attempt based on funnel type
    if (!isFormComplete) {
      // 실패 케이스 - 폼이 불완전함
      let eventName = funnelFromUrl === 'trial' ? 'TrialSubmitted' : 'ConsultSubmitted'
      
      // aftercall이 있으면 별도 이벤트명 사용
      if (funnelFromUrl === 'trial' && afterCallFromUrl) {
        eventName = 'TrialSubmitted_aftercall'
      }
      const failEventData = {
        status: 'fail',
        fail_reason: 'incomplete_form',
        parent_name: touchedFields.has('parentName') ? (formData.parentName || "TOUCHED_EMPTY") : (formData.parentName || null),
        email: touchedFields.has('email') ? (formData.email || "TOUCHED_EMPTY") : (formData.email || null),
        phone: touchedFields.has('phone') ? (formData.phone || "TOUCHED_EMPTY") : (formData.phone || null),
        child1_grade: touchedFields.has('child0Grade') ? (formData.children[0].grade || "TOUCHED_EMPTY") : (formData.children[0].grade || null),
        children_count: formData.children.filter(c => c.grade).length,
        source: sourceFromUrl,
        variant: variantFromUrl || 'direct_traffic',
        has_variant: !!variantFromUrl,
        funnel: funnelFromUrl,
        after_call: afterCallFromUrl || null
      }
      
      // f=consult인 경우 상담 시간 정보 추가
      if (funnelFromUrl === 'consult') {
        Object.assign(failEventData, {
          consult_day_preference: formData.consultDayPreference || null,
          consult_time_slots: formData.consultTimeSlots.join(',') || null,
          consult_time_slots_count: formData.consultTimeSlots.length,
          consult_message: formData.consultMessage || null
        })
      }
      
      trackEvent(eventName, failEventData)
      alert('필수 정보를 모두 입력해주세요.')
      return
    }

    setIsLoading(true)

    try {
      // Save trial data
      const trialData = {
        timestamp: new Date().toISOString(),
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        children: formData.children.filter(child => child.grade), // 학년이 입력된 자녀만
        interestedPlan: formData.interestedPlan,
        source: sourceFromUrl,
        variant: variantFromUrl,
        funnel: funnelFromUrl,
      }

      const response = await fetch("/api/trial", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trialData),
      })

      const result = await response.json()

      if (result.success) {
        // Mixpanel tracking
        const userTraits = {
          $email: formData.email,
          $name: formData.parentName,
          $phone: formData.phone,
          children_count: formData.children.filter(c => c.grade).length,
          child1_grade: formData.children[0].grade,
          child2_grade: formData.children[1]?.grade || null,
          plan_interest: formData.interestedPlan,
          payment_method: formData.selectedPaymentMethod,
          selected_card: formData.selectedPaymentMethod === 'card' ? selectedCard : null,
          installment_plan: formData.selectedPaymentMethod === 'card' && formData.interestedPlan === 'yearly' ? selectedInstallment : null
        }
        
        // aftercall 정보 추가
        if (afterCallFromUrl) {
          userTraits.has_aftercall_attempt = true
          userTraits.aftercall_attempt_date = new Date().toISOString()
          userTraits.aftercall_payment_method = formData.selectedPaymentMethod
          userTraits.aftercall_selected_card = formData.selectedPaymentMethod === 'card' ? selectedCard : null
        }
        
        identifyUser(formData.parentName, userTraits)

        // Track submission success based on funnel type
        let eventName = funnelFromUrl === 'trial' ? 'TrialSubmitted' : 'ConsultSubmitted'
        
        // aftercall이 있으면 별도 이벤트명 사용
        if (funnelFromUrl === 'trial' && afterCallFromUrl) {
          eventName = 'TrialSubmitted_aftercall'
        }
        const baseEventData = {
          status: 'success',
          parent_name: formData.parentName,
          email: formData.email,
          phone: formData.phone,
          children_count: formData.children.filter(c => c.grade).length,
          child_grades: formData.children.filter(c => c.grade).map(c => c.grade),
          plan_interest: formData.interestedPlan,
          user_id: formData.parentName,
          source: sourceFromUrl,
          variant: variantFromUrl || 'direct_traffic',
          has_variant: !!variantFromUrl,
          funnel: funnelFromUrl
        }
        
        // f=trial인 경우에만 결제 정보 추가
        if (funnelFromUrl === 'trial') {
          baseEventData.payment_method = formData.selectedPaymentMethod
          if (formData.selectedPaymentMethod === 'card') {
            baseEventData.selected_card = selectedCard
            if (formData.interestedPlan === 'yearly') {
              baseEventData.installment_plan = selectedInstallment
            }
          }
        }
        
        // f=consult인 경우에만 상담 시간 정보 추가
        if (funnelFromUrl === 'consult') {
          Object.assign(baseEventData, {
            consult_day_preference: formData.consultDayPreference,
            consult_time_slots: formData.consultTimeSlots.join(','),
            consult_time_slots_count: formData.consultTimeSlots.length,
            consult_message: formData.consultMessage || null
          })
        }
        
        trackEvent(eventName, baseEventData)

        // Facebook Pixel - f=trial only (중복 방지)
        // Note: 실제로는 시스템 부하로 인해 체험이 시작되지 않지만, 
        // 사용자의 의도와 정보를 추적하기 위해 이벤트는 발생시킴
        if (funnelFromUrl === 'trial') {
          // SessionStorage를 사용한 강력한 중복 방지
          const pixelKey = `pixel_trial_${formData.email}_${formData.phone}`.replace(/[^a-zA-Z0-9]/g, '_')
          const hasAlreadyFired = sessionStorage.getItem(pixelKey)
          
          if (!hasAlreadyFired) {
            sessionStorage.setItem(pixelKey, 'true')
            
            // StartTrial 이벤트 (체험 시작 의도)
            fbStartTrial(
              0, // 무료 체험
              'KRW',
              formData.interestedPlan === 'yearly' ? 290000 : 29000, // 예상 LTV
              '14_days'
            )
            
            // CompleteRegistration 이벤트 (등록 의도)
            fbEvent('CompleteRegistration', {
            value: 0, // 무료 체험이므로 0
            predicted_ltv: formData.interestedPlan === 'yearly' ? 290000 : 29000,
            currency: 'KRW',
            content_name: 'ThinkGPT 2주 체험',
            content_category: 'Education',
            content_type: 'subscription',
            content_ids: ['trial_2weeks'],
            status: 'trial_started',
            registration_method: 'website',
            // 사용자 정보
            parent_name: formData.parentName,
            email: formData.email,
            phone: formData.phone,
            // 자녀 정보 (개선됨)
            children_count: formData.children.filter(c => c.grade).length,
            children_grades: formData.children.filter(c => c.grade).map(c => c.grade).join(','),
            // 플랜 정보 (개선됨)
            plan: formData.interestedPlan,
            plan_value: formData.interestedPlan === 'yearly' ? 290000 : 29000,
            payment_method: formData.selectedPaymentMethod,
            selected_card: formData.selectedPaymentMethod === 'card' ? selectedCard : null,
            installment_plan: formData.selectedPaymentMethod === 'card' && formData.interestedPlan === 'yearly' ? selectedInstallment : null,
            // 추가 컨텍스트
            source: sourceFromUrl,
            variant: variantFromUrl || 'direct_traffic',
            has_variant: !!variantFromUrl,
            funnel: funnelFromUrl,
            registration_timestamp: new Date().toISOString()
          })
          }
        }
        
        // Google Sheets에 데이터 저장 (f=consult 또는 aftercall이 있는 f=trial)
        if (funnelFromUrl === 'consult' || (funnelFromUrl === 'trial' && afterCallFromUrl)) {
          try {
            console.log('Saving to Google Sheets...')
            const sheetsResponse = await fetch('/api/save-to-sheets', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...formData,
                variant: variantFromUrl,
                source: sourceFromUrl,
                afterCall: afterCallFromUrl,
                funnel: funnelFromUrl,
                interestedPlan: formData.interestedPlan,
                selectedPaymentMethod: formData.selectedPaymentMethod,
                selectedCard: formData.selectedPaymentMethod === 'card' ? selectedCard : null,
                selectedInstallment: formData.selectedPaymentMethod === 'card' && formData.interestedPlan === 'yearly' ? selectedInstallment : null
              }),
            })
            
            const sheetsResult = await sheetsResponse.json()
            console.log('Sheets save result:', sheetsResult)
            
            if (!sheetsResponse.ok) {
              console.error('Sheets save failed:', sheetsResult)
            }
          } catch (error) {
            console.error('Failed to save to sheets:', error)
          }
        }
        
        if (funnelFromUrl === 'consult' && !hasCompletedPixelEvents) {
          // f=consult용 Lead 이벤트 (상담 신청 완료) - 중복 방지
          setHasCompletedPixelEvents(true)
          const leadValue = formData.interestedPlan === 'yearly' ? 290000 : 29000
          
          const leadEventData = {
            value: leadValue, // 예상 LTV
            currency: 'KRW',
            content_name: '무료 상담 신청 완료',
            content_category: 'Education',
            content_type: 'consultation',
            lead_type: 'consultation',
            lead_event_type: 'form_submission',
            status: 'completed',
            predicted_ltv: leadValue,
            // 사용자 정보
            parent_name: formData.parentName,
            email: formData.email,
            phone: formData.phone,
            // 자녀 정보 (개선됨)
            children_count: formData.children.filter(c => c.grade).length,
            children_grades: formData.children.filter(c => c.grade).map(c => c.grade).join(','),
            // 플랜 정보 (개선됨)
            plan: formData.interestedPlan,
            plan_value: leadValue,
            // 추가 컨텍스트
            source: sourceFromUrl,
            variant: variantFromUrl || 'direct_traffic',
            has_variant: !!variantFromUrl,
            funnel: funnelFromUrl,
            submission_timestamp: new Date().toISOString()
          }
          
          // 상담 시간 정보 추가
          Object.assign(leadEventData, {
            consult_day_preference: formData.consultDayPreference,
            consult_time_slots: formData.consultTimeSlots.join(','),
            consult_time_slots_count: formData.consultTimeSlots.length,
            consult_message: formData.consultMessage || null
          })
          
          fbEvent('Lead', leadEventData)

          // 추가로 SubmitApplication 이벤트도 발생 (상담 신청은 지원서 제출과 유사)
          const submitAppEventData = {
            value: leadValue,
            currency: 'KRW',
            content_name: '무료 상담 신청서',
            application_type: 'consultation',
            plan: formData.interestedPlan,
            parent_name: formData.parentName,
            email: formData.email,
            source: sourceFromUrl,
            variant: variantFromUrl || 'direct_traffic',
            has_variant: !!variantFromUrl,
            funnel: funnelFromUrl
          }
          
          // 상담 시간 정보 추가
          Object.assign(submitAppEventData, {
            consult_day_preference: formData.consultDayPreference,
            consult_time_slots: formData.consultTimeSlots.join(','),
            consult_time_slots_count: formData.consultTimeSlots.length,
            consult_message: formData.consultMessage || null
          })
          
          fbEvent('SubmitApplication', submitAppEventData)
        }
      }
    } catch (error) {
      console.error("Trial registration failed:", error)
    }

    setTimeout(() => {
      setIsLoading(false)
      setCurrentStep('complete')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      
      // For trial funnel, show loading before system error
      if (funnelFromUrl === 'trial') {
        setTimeout(() => {
          setShowSystemError(true)
        }, 2000)
      }
    }, 1500)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href={`/?f=${funnelFromUrl}&v=${variantFromUrl}`} className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              돌아가기
            </Link>
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">{funnelFromUrl === 'consult' ? 'ThinkGPT 무료 상담' : 'ThinkGPT 체험'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-4">
        <div className="max-w-2xl mx-auto">
          {/* Notice for both funnels - only show on form step */}
          {currentStep === 'form' && (
            <div className="space-y-1 mb-3">
              <p className="text-xs text-red-600 text-center">
                📣 공지({new Date().getMonth() + 1}/{new Date().getDate()}): 
                {funnelFromUrl === 'consult' 
                  ? ' 무료 상담 신청 대기자가 많아 지연될 수 있습니다'
                  : ' 신청 인원이 많아 조기 마감될 수 있습니다'}
              </p>
              {/* Fixed height container to prevent layout shift */}
              <div className="h-4 flex items-center justify-center">
                {notification && (
                  <p className={`text-xs text-gray-600 text-center transition-opacity duration-500 ${
                    isNotificationVisible ? 'opacity-100' : 'opacity-0'
                  }`}>
                    💬 {notification}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Form Step */}
          {currentStep === 'form' && (
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">
                {funnelFromUrl === 'consult' ? '무료 상담 신청하기' : '2주 동안 체험해보세요'}
              </CardTitle>
              <CardDescription className="text-base">
                {funnelFromUrl === 'consult' 
                  ? (<>
                      궁금하시거나 구매를 고민 중이신가요?<br/>
                      상담사가 자세히 안내해드려요.<br/>
                      담당자가 근무일 기준 1-2일 이내 연락드립니다.
                    </>)
                  : (<>
                      체험 후 결정하세요.<br/>
                      첫 결제일 전에 알려드릴게요
                    </>)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 플랜 선택 - trial funnel only */}
                {funnelFromUrl === 'trial' && (
                  <div className="space-y-3">
                    <Label className="text-base font-semibold">플랜 선택</Label>
                    <div className="space-y-3">
                      {/* 월간 플랜 */}
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between ${
                          formData.interestedPlan === 'monthly' 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleInputChange("interestedPlan", "monthly")}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plan"
                            value="monthly"
                            checked={formData.interestedPlan === 'monthly'}
                            onChange={() => handleInputChange("interestedPlan", "monthly")}
                            className="w-4 h-4"
                          />
                          <div>
                            <h3 className="font-semibold">월간 플랜</h3>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">₩29,000</p>
                          <p className="text-xs text-gray-600">월</p>
                        </div>
                      </div>

                      {/* 연간 플랜 */}
                      <div 
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all flex items-center justify-between relative ${
                          formData.interestedPlan === 'yearly' 
                            ? 'border-blue-600 bg-blue-50' 
                            : 'border-gray-200'
                        }`}
                        onClick={() => handleInputChange("interestedPlan", "yearly")}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="plan"
                            value="yearly"
                            checked={formData.interestedPlan === 'yearly'}
                            onChange={() => handleInputChange("interestedPlan", "yearly")}
                            className="w-4 h-4"
                          />
                          <div>
                            <h3 className="font-semibold">연간 플랜</h3>
                            <p className="text-xs text-green-600 font-medium">₩58,000 할인</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500 line-through">₩348,000</p>
                          <p className="text-lg font-bold">₩290,000</p>
                          <p className="text-xs text-gray-600">년</p>
                        </div>
                        <div className="absolute -top-2 -right-2">
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            2개월 할인
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="parentName">학부모님 성함 *</Label>
                    <Input
                      id="parentName"
                      type="text"
                      value={formData.parentName}
                      onChange={(e) => handleInputChange("parentName", e.target.value)}
                      onFocus={() => handleFieldFocus("parentName")}
                      placeholder="홍길동"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">휴대폰 번호 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      onFocus={() => handleFieldFocus("phone")}
                      placeholder="010-1234-5678"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">이메일 주소 *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onFocus={() => handleFieldFocus("email")}
                      placeholder="example@email.com"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">체험 시작 링크를 보내드립니다</p>
                  </div>

                  {/* 자녀 정보 */}
                  <div className="space-y-3">
                    <Label>자녀 정보</Label>
                    
                    {/* 자녀 1 */}
                    <div>
                      <Label htmlFor="child0Grade">자녀 1 *</Label>
                      <Select 
                        value={formData.children[0].grade} 
                        onValueChange={(value) => handleChildGradeChange(0, value)}
                      >
                        <SelectTrigger onFocus={() => handleFieldFocus("child0Grade")}>
                          <SelectValue placeholder="학년을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elementary1">초등학교 1학년</SelectItem>
                          <SelectItem value="elementary2">초등학교 2학년</SelectItem>
                          <SelectItem value="elementary3">초등학교 3학년</SelectItem>
                          <SelectItem value="elementary4">초등학교 4학년</SelectItem>
                          <SelectItem value="elementary5">초등학교 5학년</SelectItem>
                          <SelectItem value="elementary6">초등학교 6학년</SelectItem>
                          <SelectItem value="middle1">중학교 1학년</SelectItem>
                          <SelectItem value="middle2">중학교 2학년</SelectItem>
                          <SelectItem value="middle3">중학교 3학년</SelectItem>
                          <SelectItem value="high1">고등학교 1학년</SelectItem>
                          <SelectItem value="high2">고등학교 2학년</SelectItem>
                          <SelectItem value="high3">고등학교 3학년</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* 자녀 2 */}
                    <div>
                      <Label htmlFor="child1Grade">자녀 2 (선택)</Label>
                      <Select 
                        value={formData.children[1].grade} 
                        onValueChange={(value) => handleChildGradeChange(1, value)}
                      >
                        <SelectTrigger onFocus={() => handleFieldFocus("child1Grade")}>
                          <SelectValue placeholder="학년을 선택해주세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="elementary1">초등학교 1학년</SelectItem>
                          <SelectItem value="elementary2">초등학교 2학년</SelectItem>
                          <SelectItem value="elementary3">초등학교 3학년</SelectItem>
                          <SelectItem value="elementary4">초등학교 4학년</SelectItem>
                          <SelectItem value="elementary5">초등학교 5학년</SelectItem>
                          <SelectItem value="elementary6">초등학교 6학년</SelectItem>
                          <SelectItem value="middle1">중학교 1학년</SelectItem>
                          <SelectItem value="middle2">중학교 2학년</SelectItem>
                          <SelectItem value="middle3">중학교 3학년</SelectItem>
                          <SelectItem value="high1">고등학교 1학년</SelectItem>
                          <SelectItem value="high2">고등학교 2학년</SelectItem>
                          <SelectItem value="high3">고등학교 3학년</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* 상담 시간 선택 - Only for consult funnel */}
                  {funnelFromUrl === 'consult' && (
                    <div className="space-y-4">
                      <div>
                        <Label className="text-base font-semibold">상담 가능 요일 *</Label>
                        <div className="space-y-3 mt-3">
                          <div
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              formData.consultDayPreference === 'weekday_only'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200'
                            }`}
                            onClick={() => handleInputChange("consultDayPreference", "weekday_only")}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="consultDay"
                                value="weekday_only"
                                checked={formData.consultDayPreference === 'weekday_only'}
                                onChange={() => handleInputChange("consultDayPreference", "weekday_only")}
                                className="w-4 h-4"
                              />
                              <span>평일만 가능</span>
                            </div>
                          </div>
                          <div
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              formData.consultDayPreference === 'weekend_only'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200'
                            }`}
                            onClick={() => handleInputChange("consultDayPreference", "weekend_only")}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="consultDay"
                                value="weekend_only"
                                checked={formData.consultDayPreference === 'weekend_only'}
                                onChange={() => handleInputChange("consultDayPreference", "weekend_only")}
                                className="w-4 h-4"
                              />
                              <span>주말만 가능</span>
                            </div>
                          </div>
                          <div
                            className={`border rounded-lg p-3 cursor-pointer transition-all ${
                              formData.consultDayPreference === 'both'
                                ? 'border-blue-600 bg-blue-50'
                                : 'border-gray-200'
                            }`}
                            onClick={() => handleInputChange("consultDayPreference", "both")}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                name="consultDay"
                                value="both"
                                checked={formData.consultDayPreference === 'both'}
                                onChange={() => handleInputChange("consultDayPreference", "both")}
                                className="w-4 h-4"
                              />
                              <span>평일/주말 모두 가능</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label className="text-base font-semibold">선호 시간대 * (복수 선택 가능)</Label>
                        <div className="space-y-4 mt-3">
                          {/* 오전 */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">오전</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: '09-11', label: '9시-11시' },
                                { value: '11-13', label: '11시-13시' },
                              ].map((timeSlot) => (
                                <div
                                  key={timeSlot.value}
                                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                    formData.consultTimeSlots.includes(timeSlot.value)
                                      ? 'border-blue-600 bg-blue-50'
                                      : 'border-gray-200'
                                  }`}
                                  onClick={() => {
                                    const newSlots = formData.consultTimeSlots.includes(timeSlot.value)
                                      ? formData.consultTimeSlots.filter(s => s !== timeSlot.value)
                                      : [...formData.consultTimeSlots, timeSlot.value]
                                    setFormData(prev => ({ ...prev, consultTimeSlots: newSlots }))
                                  }}
                                >
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={formData.consultTimeSlots.includes(timeSlot.value)}
                                      onChange={() => {}}
                                      className="w-4 h-4"
                                    />
                                    <span className="text-sm">{timeSlot.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 오후 */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">오후</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: '13-15', label: '13시-15시' },
                                { value: '15-17', label: '15시-17시' },
                              ].map((timeSlot) => (
                                <div
                                  key={timeSlot.value}
                                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                    formData.consultTimeSlots.includes(timeSlot.value)
                                      ? 'border-blue-600 bg-blue-50'
                                      : 'border-gray-200'
                                  }`}
                                  onClick={() => {
                                    const newSlots = formData.consultTimeSlots.includes(timeSlot.value)
                                      ? formData.consultTimeSlots.filter(s => s !== timeSlot.value)
                                      : [...formData.consultTimeSlots, timeSlot.value]
                                    setFormData(prev => ({ ...prev, consultTimeSlots: newSlots }))
                                  }}
                                >
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={formData.consultTimeSlots.includes(timeSlot.value)}
                                      onChange={() => {}}
                                      className="w-4 h-4"
                                    />
                                    <span className="text-sm">{timeSlot.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* 저녁 */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">저녁</h4>
                            <div className="grid grid-cols-2 gap-2">
                              {[
                                { value: '17-19', label: '17시-19시' },
                                { value: '19-21', label: '19시-21시' },
                              ].map((timeSlot) => (
                                <div
                                  key={timeSlot.value}
                                  className={`border rounded-lg p-3 cursor-pointer transition-all ${
                                    formData.consultTimeSlots.includes(timeSlot.value)
                                      ? 'border-blue-600 bg-blue-50'
                                      : 'border-gray-200'
                                  }`}
                                  onClick={() => {
                                    const newSlots = formData.consultTimeSlots.includes(timeSlot.value)
                                      ? formData.consultTimeSlots.filter(s => s !== timeSlot.value)
                                      : [...formData.consultTimeSlots, timeSlot.value]
                                    setFormData(prev => ({ ...prev, consultTimeSlots: newSlots }))
                                  }}
                                >
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      checked={formData.consultTimeSlots.includes(timeSlot.value)}
                                      onChange={() => {}}
                                      className="w-4 h-4"
                                    />
                                    <span className="text-sm">{timeSlot.label}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="consultMessage">남기실 말씀 (선택사항)</Label>
                        <textarea
                          id="consultMessage"
                          value={formData.consultMessage}
                          onChange={(e) => handleInputChange("consultMessage", e.target.value)}
                          onFocus={() => handleFieldFocus("consultMessage")}
                          placeholder="상담 시 궁금한 점이나 요청사항을 남겨주세요"
                          rows={3}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  )}
                  
                  {/* Payment Method Selection - Only for trial funnel */}
                  {funnelFromUrl === 'trial' && (
                    <>
                      <div className="border-t pt-4">
                        <h3 className="font-semibold text-gray-900 mb-2">결제 수단</h3>
                        <p className="text-sm text-gray-600 mb-4">2주 체험 후 선택하신 방법으로 자동 결제됩니다</p>

                        {/* 간편결제 */}
                        <div className="mb-4">
                          <p className="text-xs font-medium text-gray-500 mb-2">간편결제</p>
                          <div className="grid grid-cols-2 gap-2">
                            {/* 토스페이 */}
                            <button
                              type="button"
                              onClick={() => handleInputChange("selectedPaymentMethod", "toss")}
                              onFocus={() => handleFieldFocus("selectedPaymentMethod")}
                              className={`relative p-3 rounded-lg border-2 transition-all ${
                                formData.selectedPaymentMethod === 'toss'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 relative flex-shrink-0">
                                  <Image src="/Toss_Logo.png" alt="토스페이" fill className="object-contain" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">토스페이</p>
                              </div>
                            </button>

                            {/* 카카오페이 */}
                            <button
                              type="button"
                              onClick={() => handleInputChange("selectedPaymentMethod", "kakao")}
                              onFocus={() => handleFieldFocus("selectedPaymentMethod")}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.selectedPaymentMethod === 'kakao'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 relative flex-shrink-0">
                                  <Image src="/Kakao_Logo.png" alt="카카오페이" fill className="object-contain" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">카카오페이</p>
                              </div>
                            </button>

                            {/* 네이버페이 */}
                            <button
                              type="button"
                              onClick={() => handleInputChange("selectedPaymentMethod", "naver")}
                              onFocus={() => handleFieldFocus("selectedPaymentMethod")}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.selectedPaymentMethod === 'naver'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 relative flex-shrink-0">
                                  <Image src="/Naver_Logo.svg" alt="네이버페이" fill className="object-contain" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">네이버페이</p>
                              </div>
                            </button>

                            {/* 페이코 */}
                            <button
                              type="button"
                              onClick={() => handleInputChange("selectedPaymentMethod", "payco")}
                              onFocus={() => handleFieldFocus("selectedPaymentMethod")}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.selectedPaymentMethod === 'payco'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 relative flex-shrink-0">
                                  <Image src="/Payco_Logo.svg" alt="페이코" fill className="object-contain" />
                                </div>
                                <p className="text-sm font-medium text-gray-900">페이코</p>
                              </div>
                            </button>
                          </div>
                        </div>

                        {/* 기타 결제 */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 mb-2">기타 결제</p>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => handleInputChange("selectedPaymentMethod", "card")}
                              onFocus={() => handleFieldFocus("selectedPaymentMethod")}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.selectedPaymentMethod === 'card'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <span className="text-sm font-medium text-gray-900">신용카드</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleInputChange("selectedPaymentMethod", "phone")}
                              onFocus={() => handleFieldFocus("selectedPaymentMethod")}
                              className={`p-3 rounded-lg border-2 transition-all ${
                                formData.selectedPaymentMethod === 'phone'
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-200 bg-white hover:border-gray-300'
                              }`}
                            >
                              <span className="text-sm font-medium text-gray-900">휴대폰결제</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* 신용카드 선택 UI - selectedPaymentMethod가 'card'일 때만 표시 */}
                      {formData.selectedPaymentMethod === 'card' && (
                        <div className="space-y-2 mt-3">
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setShowCardDropdown(!showCardDropdown)}
                              className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-300 flex items-center justify-between hover:bg-gray-100 transition-colors text-sm"
                            >
                              <span className={selectedCard ? 'text-gray-900' : 'text-gray-500'}>
                                {selectedCard || '카드사 선택'}
                              </span>
                              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showCardDropdown ? 'rotate-180' : ''}`} />
                            </button>

                            {showCardDropdown && (
                              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-10">
                                {['삼성', 'BC', 'KB국민', '신한', '현대', '하나외환', 
                                  '롯데', '광주', '수협', '씨티', '전북', '제주', 
                                  'NH채움', '우리BC', '하나', '카카오뱅크', '우리'].map((card) => (
                                  <button
                                    key={card}
                                    type="button"
                                    onClick={() => {
                                      setSelectedCard(card);
                                      setShowCardDropdown(false);
                                    }}
                                    className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm"
                                  >
                                    {card}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* 할부 선택 */}
                          {formData.interestedPlan === 'yearly' ? (
                            <div className="relative">
                              <button
                                type="button"
                                onClick={() => setShowInstallmentDropdown(!showInstallmentDropdown)}
                                className="w-full p-2.5 bg-gray-50 rounded-lg border border-gray-300 flex items-center justify-between hover:bg-gray-100 transition-colors text-sm"
                              >
                                <span className={selectedInstallment !== '일시불' ? 'text-gray-900' : 'text-gray-700'}>
                                  {selectedInstallment}
                                </span>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showInstallmentDropdown ? 'rotate-180' : ''}`} />
                              </button>

                              {showInstallmentDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-10">
                                  {['일시불', '2개월', '3개월', '4개월', '5개월', '6개월', '7개월', '8개월', '9개월', '10개월', '11개월', '12개월'].map((installment) => (
                                    <button
                                      key={installment}
                                      type="button"
                                      onClick={() => {
                                        setSelectedInstallment(installment + (installment === '2개월' || installment === '3개월' ? ' (무이자)' : ''));
                                        setShowInstallmentDropdown(false);
                                      }}
                                      className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 text-sm"
                                    >
                                      <div className="flex justify-between items-center">
                                        <span>{installment}</span>
                                        {(installment === '2개월' || installment === '3개월') && (
                                          <span className="text-xs text-blue-600">(무이자)</span>
                                        )}
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              )}
                              
                              <div className="mt-2 p-2 bg-blue-50 rounded text-xs text-blue-700 space-y-1">
                                <p>• 카드 상관없이 3개월까지 무이자 할부</p>
                                <p>• 할부 최대 12개월까지 가능</p>
                                <p>• 할부 수수료는 카드사 정책에 따름</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200 text-sm">
                              <span className="text-gray-600">일시불</span>
                              <span className="text-xs text-gray-500">월간 구독은 일시불만 가능</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {/* 결제 금액 */}
                      <div className="bg-white rounded-lg p-4 shadow-sm border">
                        <h2 className="font-semibold text-gray-900 mb-4">결제 금액</h2>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">상품 금액</span>
                            <span>{formData.interestedPlan === 'yearly' ? '348,000' : '29,000'}원</span>
                          </div>
                          {formData.interestedPlan === 'yearly' && (
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">연간 할인 (2개월)</span>
                              <span className="text-red-500">-58,000원</span>
                            </div>
                          )}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">체험 할인</span>
                            <span className="text-red-500">-{formData.interestedPlan === 'yearly' ? '290,000' : '29,000'}원</span>
                          </div>
                          <div className="border-t pt-2 mt-2">
                            <div className="flex justify-between">
                              <span className="font-semibold">총 결제금액</span>
                              <span className="font-semibold text-lg text-blue-600">
                                0원
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* 약관 동의 - 박스 제거하고 심플하게 */}
                      <div className="py-2">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-700">주문 내용을 확인하였으며, 약관에 동의합니다</span>
                        </label>
                      </div>
                      
                      {/* 중요 안내 - 은은한 노란 배경으로 감싸기 */}
                      <div className="bg-yellow-50 rounded-lg px-4 py-3 text-center">
                        <p className="text-sm font-semibold text-gray-700">
                          2주 체험 후 선택하신 방법으로 자동 결제됩니다
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          체험 종료 전 알려드립니다
                        </p>
                      </div>
                    </>
                  )}
                </div>

                <Button 
                  type="submit" 
                  className={`w-full text-lg py-6 font-bold shadow-lg transition-all ${
                    (funnelFromUrl === 'consult' || agreeTerms) && !isLoading
                      ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                      : 'bg-gray-300 cursor-not-allowed'
                  }`}
                  size="lg" 
                  disabled={isLoading || (funnelFromUrl === 'trial' && !agreeTerms)}
                >
                  {isLoading ? "처리 중..." : (
                    funnelFromUrl === 'consult' 
                      ? "무료 상담 신청하기" 
                      : "0원 결제하기"
                  )}
                </Button>

                {funnelFromUrl === 'trial' && (
                  <div className="text-center space-y-1 text-xs text-gray-500">
                    <p>• 체험 기간 중 언제든지 취소할 수 있습니다</p>
                    <p>• 취소 시 추가 요금이 발생하지 않습니다</p>
                    <p>• 체험 종료 전에 알려드립니다</p>
                  </div>
                )}

                {funnelFromUrl === 'consult' && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">무료 상담 안내</h4>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>✓ 제품 기능과 사용법을 자세히 설명해드립니다</li>
                      <li>✓ 요금제와 할인 혜택을 안내해드립니다</li>
                      <li>✓ 자녀에게 맞는 학습 플랜을 추천해드립니다</li>
                      <li>✓ 현재 대기자가 많아 연락이 지연될 수 있습니다</li>
                    </ul>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
          )}


          {/* Complete Step */}
          {currentStep === 'complete' && (
            <Card>
              <CardHeader className="text-center">
                {funnelFromUrl === 'trial' && !showSystemError ? (
                  <>
                    <div className="py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <CardTitle className="text-lg text-gray-700">결제 처리 중...</CardTitle>
                      <CardDescription className="mt-2">
                        <div className="text-sm text-gray-500">
                          잠시만 기다려 주세요
                        </div>
                      </CardDescription>
                    </div>
                  </>
                ) : funnelFromUrl === 'trial' ? (
                  <>
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl text-red-600 font-bold">시스템 부하 발생</CardTitle>
                    <CardDescription className="mt-2">
                      <div className="text-base text-gray-600">
                        현재 대기자가 너무 많아 서비스 제공이 어려운 상황입니다
                      </div>
                    </CardDescription>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl text-green-800">
                      무료 상담 신청이 완료되었습니다!
                    </CardTitle>
                    <CardDescription>
                      신청해주셔서 감사합니다.<br/>
                      담당자가 근무일 기준 1-2일 이내 연락드립니다.
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              {(funnelFromUrl !== 'trial' || showSystemError) && (
              <CardContent className="space-y-4">
                {funnelFromUrl === 'trial' ? (
                  <>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-800 text-lg mb-2 text-center">
                        ⚠️ 결제가 처리되지 않았습니다
                      </h4>
                      <p className="text-sm text-gray-700 text-center mb-3">
                        결제 진행 과정에서 문제가 발생하여<br/>
                        요청이 처리되지 않았습니다
                      </p>
                      <p className="text-base font-bold text-blue-600 text-center mt-4 p-3 bg-blue-50 rounded-lg">
                        대기열에 등록되었습니다.<br/>
                        순서가 되면 우선 안내드리겠습니다.
                      </p>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">안내 사항</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 현재 신청자가 너무 많아 서버가 혼잡합니다</li>
                        <li>• 잠시 후 다시 시도해 주시기 바랍니다</li>
                        <li>• 양해 부탁드리며, 불편을 드려 죄송합니다</li>
                      </ul>
                    </div>
                    
                    <div className="pt-4">
                      <Link href={`/?f=${funnelFromUrl}&v=${variantFromUrl}`}>
                        <Button className="w-full">
                          홈으로 돌아가기
                        </Button>
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-800 mb-2">안내 사항</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 제품 문의 및 구매 무료 상담 신청이 접수되었습니다</li>
                        <li>• 현재 무료 상담 대기자가 많아 연락이 지연될 수 있습니다</li>
                        <li>• 신청 순서에 따라 순차적으로 진행됩니다</li>
                      </ul>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <p className="text-xs text-yellow-800">
                        <span className="font-semibold">💡 참고:</span> 현재 많은 분들이 신청해주셔서 대기 시간이 발생할 수 있습니다. 양해 부탁드립니다.
                      </p>
                    </div>
                    <div className="pt-4">
                      <Link href={`/?f=${funnelFromUrl}&v=${variantFromUrl}`}>
                        <Button className="w-full">
                          확인
                        </Button>
                      </Link>
                    </div>
                  </>
                )}
              </CardContent>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default function TrialPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <TrialContent />
    </Suspense>
  )
}