"use client"

export const dynamic = 'force-dynamic'

import type React from "react"
import { useState, useMemo, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Shield, CheckCircle, AlertCircle, MessageSquare } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { trackEvent, identifyUser } from "@/lib/mixpanel"
import { fbInitiateCheckout, fbPurchase, fbEvent } from "@/lib/facebook-pixel"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  planType: string
  amount: number
  isNotionConfigured: boolean
}

function WaitlistModal({ isOpen, onClose, planType, amount, isNotionConfigured }: WaitlistModalProps) {
  useEffect(() => {
    if (isOpen) {
      console.log('시스템 부하 모달 표시됨', {
        planType,
        amount,
        isNotionConfigured
      });
    }
  }, [isOpen, planType, amount, isNotionConfigured]);

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-red-600 font-bold">시스템 부하 발생</CardTitle>
          <CardDescription className="mt-3">
            <div className="text-lg font-semibold text-gray-800 mb-2">
              신청 인원이 급증하여 시스템에 부하가 발생했습니다
            </div>
            <div className="text-gray-600">
              결제가 중단되었으며, 카드 결제는 진행되지 않았습니다.<br />
              고객님의 결제 정보는 안전하게 보호되고 있습니다.
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isNotionConfigured && (
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-yellow-800 text-sm">Notion 설정 필요</h4>
                  <p className="text-xs text-yellow-700 mt-1">
                    실제 데이터 저장을 위해 Notion Integration을 설정해주세요.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              확인
            </Button>
            <Link href="/consultation?source=payment_modal" className="flex-1">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                문의하기
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PaymentContent() {
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [isNotionConfigured, setIsNotionConfigured] = useState(true)
  const planFromUrl = searchParams?.get("plan") || "monthly"
  const sourceFromUrl = searchParams?.get("source") || "direct"
  const [selectedPlan, setSelectedPlan] = useState(planFromUrl)
  
  useEffect(() => {
    setMounted(true)
    setSelectedPlan(planFromUrl)
    
    // 페이지 로드 시 source 파라미터를 기반으로 CTA 추적
    if (sourceFromUrl) {
      const sourceMap: Record<string, any> = {
        'fixed_bottom': {
          button_text: '지금 시작하기',
          location: 'fixed_bottom',
          button_type: 'start',
          plan: 'not_selected'
        },
        'how_to_start_section': {
          button_text: '지금 바로 시작하기',
          location: 'how_to_start_section',
          button_type: 'start',
          plan: 'not_selected'
        },
        'pricing_section_monthly': {
          button_text: '월간 플랜 시작하기',
          location: 'pricing_section',
          button_type: 'start',
          plan: 'monthly',
          price: '29000'
        },
        'pricing_section_yearly': {
          button_text: '연간 플랜 시작하기',
          location: 'pricing_section',
          button_type: 'start',
          plan: 'yearly',
          price: '290000'
        },
        'direct': {
          button_text: 'direct_access',
          location: 'direct',
          button_type: 'direct',
          plan: planFromUrl
        }
      }
      
      const trackingData = sourceMap[sourceFromUrl] || sourceMap['direct']
      
      console.log('CTA 버튼 클릭 추적', {
        source: sourceFromUrl,
        ...trackingData
      })
      
      trackEvent('CTA Button Clicked', {
        source: sourceFromUrl,
        ...trackingData
      })
    }
  }, [planFromUrl, sourceFromUrl])

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    cardholderName: "",
    email: "",
    phone: "",
    grade: "",
  })

  // 터치된 필드 추적
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set())

  // useMemo를 사용해서 planInfo를 계산
  const planInfo = useMemo(() => {
    if (selectedPlan === "yearly") {
      return {
        title: "생각톡 프리미엄 (연간)",
        price: 290000,
        period: "년",
        description: "연간 결제로 2개월 무료",
        savings: "₩58,000 절약",
      }
    } else {
      return {
        title: "생각톡 프리미엄 (월간)",
        price: 29000,
        period: "월",
        description: "매월 자동 결제",
        savings: null,
      }
    }
  }, [selectedPlan])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFieldFocus = (field: string) => {
    setTouchedFields((prev) => new Set(prev).add(field))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // 폼 완성도 체크
    const isFormComplete = formData.email && 
                          formData.phone && 
                          formData.cardholderName && 
                          formData.cardNumber.replace(/\s/g, '').length === 16 &&
                          formData.expiryMonth && 
                          formData.expiryYear && 
                          formData.cvc.length === 3 &&
                          formData.grade;
    
    console.log('결제 버튼 클릭', {
      product: selectedPlan,
      price: planInfo.price,
      formComplete: isFormComplete,
      missingFields: {
        email: !formData.email,
        phone: !formData.phone,
        cardholderName: !formData.cardholderName,
        cardInfoValid: formData.cardNumber.replace(/\s/g, '').length === 16 && formData.cvc.length === 3,
        expiry: !formData.expiryMonth || !formData.expiryYear,
        grade: !formData.grade
      }
    });
    
    // 결제 버튼 클릭 이벤트 - success/fail 분기
    if (isFormComplete) {
      // Facebook Pixel - SubmitApplication 이벤트 (결제 정보 입력 완료)
      fbEvent('SubmitApplication', {
        value: planInfo.price,
        currency: 'KRW',
        content_name: planInfo.title
      });
      
      // 성공 케이스 - 폼이 완전히 작성됨
      trackEvent('Payment Button Clicked', {
        status: 'success',
        plan_type: selectedPlan,
        plan_price: planInfo.price,
        email: formData.email,
        phone: formData.phone,
        cardholder_name: formData.cardholderName,
        child_grade: formData.grade,
        source: sourceFromUrl
      });
    } else {
      // 실패 케이스 - 폼이 불완전함
      trackEvent('Payment Button Clicked', {
        status: 'form_incomplete',
        plan_type: selectedPlan,
        plan_price: planInfo.price,
        // 새로운 구조: 실제 값, null, 또는 "TOUCHED_EMPTY"
        email: touchedFields.has('email') ? (formData.email || "TOUCHED_EMPTY") : (formData.email || null),
        phone: touchedFields.has('phone') ? (formData.phone || "TOUCHED_EMPTY") : (formData.phone || null),
        cardholder_name: touchedFields.has('cardholderName') ? (formData.cardholderName || "TOUCHED_EMPTY") : (formData.cardholderName || null),
        child_grade: touchedFields.has('grade') ? (formData.grade || "TOUCHED_EMPTY") : (formData.grade || null),
        // 카드 정보는 보안상 상태만 표시
        card_number: touchedFields.has('cardNumber') ? 
          (formData.cardNumber.replace(/\s/g, '').length > 0 ? `${formData.cardNumber.replace(/\s/g, '').length}_digits` : "TOUCHED_EMPTY") : 
          (formData.cardNumber.replace(/\s/g, '').length > 0 ? `${formData.cardNumber.replace(/\s/g, '').length}_digits` : null),
        expiry_month: touchedFields.has('expiryMonth') ? (formData.expiryMonth || "TOUCHED_EMPTY") : (formData.expiryMonth || null),
        expiry_year: touchedFields.has('expiryYear') ? (formData.expiryYear || "TOUCHED_EMPTY") : (formData.expiryYear || null),
        cvc: touchedFields.has('cvc') ? 
          (formData.cvc.length > 0 ? `${formData.cvc.length}_digits` : "TOUCHED_EMPTY") : 
          (formData.cvc.length > 0 ? `${formData.cvc.length}_digits` : null),
        source: sourceFromUrl
      });
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }
    
    setIsLoading(true)

    try {
      // Notion에 구매 데이터 저��
      const purchaseData = {
        timestamp: new Date().toISOString(),
        email: formData.email,
        phone: formData.phone,
        cardholderName: formData.cardholderName,
        grade: formData.grade,
        planType: selectedPlan,
        planTitle: planInfo.title,
        amount: planInfo.price,
        period: planInfo.period,
      }

      const response = await fetch("/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(purchaseData),
      })

      const result = await response.json()

      if (result.success) {
        console.log("구매 정보가 저장되었습니다:", result.message || "성공")
        
        // Mixpanel 사용자 식별 및 프로필 설정
        const userId = formData.cardholderName; // 카드 소유자명을 고유 ID로 사용
        identifyUser(userId, {
          $email: formData.email,
          $phone: formData.phone,
          $name: formData.cardholderName,
          child_grade: formData.grade,
          plan_type: selectedPlan,
          plan_price: planInfo.price,
          payment_date: new Date().toISOString()
        });
        
        // 결제 완료 이벤트 트래킹 (카드 정보 제외)
        trackEvent('Payment Success', {
          plan_type: selectedPlan,
          amount: planInfo.price,
          email: formData.email,
          phone: formData.phone,
          cardholder_name: formData.cardholderName,
          child_grade: formData.grade,
          // 카드 정보는 보안상 로깅하지 않음
          user_id: formData.cardholderName,  // 카드 소유자명을 ID로 사용
          source: sourceFromUrl
        });
        
        console.log('Mixpanel 사용자 프로필 설정 완료', {
          userId,
          name: formData.cardholderName,
          plan: selectedPlan
        });
        
        // Facebook Pixel - Purchase 이벤트
        fbPurchase(
          planInfo.price, 
          'KRW', 
          planInfo.title,
          selectedPlan === 'yearly' ? 'thinkgpt_yearly' : 'thinkgpt_monthly'
        );
        
        // Notion 설정 상태 확인
        if (result.message && result.message.includes("시뮬레이션")) {
          setIsNotionConfigured(false)
        }
      } else {
        console.error("저장 실패:", result.message)
        setIsNotionConfigured(false)
      }
    } catch (error) {
      console.error("API 호출 실패:", error)
      setIsNotionConfigured(false)
    }

    // 2초 후 완료 모달 표시
    setTimeout(() => {
      console.log('결제 시도 후 시스템 부하 모달 표시 예정', {
        planType: selectedPlan,
        amount: planInfo.price
      });
      setIsLoading(false)
      setShowWaitlistModal(true)
    }, 2000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    if (formatted.length <= 19) {
      handleInputChange("cardNumber", formatted)
    }
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
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center text-gray-600 hover:text-gray-900 mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              돌아가기
            </Link>
            <div className="flex items-center space-x-2">
              <Image 
                src="/think-talk_logo.png" 
                alt="생각톡" 
                width={120} 
                height={40} 
                className="h-10 w-auto"
              />
              <span className="text-lg font-semibold ml-2">결제</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* 요금제 선택 */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>요금제 선택</CardTitle>
                <CardDescription>원하시는 플랜을 선택해주세요</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedPlan === "monthly"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedPlan("monthly");
                      console.log('요금제 선택: 월간 플랜 - ₩29,000');
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">월간 플랜</h4>
                        <p className="text-sm text-gray-600">매월 자동 결제</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">₩29,000</span>
                        <span className="text-gray-600">/월</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 border rounded-lg cursor-pointer transition-all relative ${
                      selectedPlan === "yearly"
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedPlan("yearly");
                      console.log('요금제 선택: 연간 플랜 - ₩290,000');
                    }}
                  >
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      절약
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">연간 플랜</h4>
                        <p className="text-sm text-gray-600">연간 결제로 2개월 무료</p>
                        <p className="text-sm text-green-600 font-medium">₩58,000 절약</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">₩290,000</span>
                          <span className="text-gray-600">/년</span>
                        </div>
                        <div className="text-sm text-gray-500 line-through">₩348,000</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-green-600" />
                  안전한 결제
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SSL 암호화로 안전하게 보호
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    언제든 해지 가능
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    카드 정보는 저장되지 않음
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* 결제 정보 입력 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>결제 정보</CardTitle>
                <CardDescription>안전한 결제를 위해 정확한 정보를 입력해주세요</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* 연락처 정보 */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">연락처 정보</h4>
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
                      <Label htmlFor="grade">자녀 학년 *</Label>
                      <Select
                        value={formData.grade}
                        onValueChange={(value) => handleInputChange("grade", value)}
                      >
                        <SelectTrigger onFocus={() => handleFieldFocus("grade")}>
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

                  {/* 카드 정보 */}
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-900">카드 정보</h4>
                    <div>
                      <Label htmlFor="cardNumber">카드 번호 *</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        onFocus={() => handleFieldFocus("cardNumber")}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="expiryMonth">만료 월 *</Label>
                        <Select
                          value={formData.expiryMonth}
                          onValueChange={(value) => handleInputChange("expiryMonth", value)}
                        >
                          <SelectTrigger onFocus={() => handleFieldFocus("expiryMonth")}>
                            <SelectValue placeholder="월" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 12 }, (_, i) => (
                              <SelectItem key={i + 1} value={String(i + 1).padStart(2, "0")}>
                                {String(i + 1).padStart(2, "0")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="expiryYear">만료 년 *</Label>
                        <Select
                          value={formData.expiryYear}
                          onValueChange={(value) => handleInputChange("expiryYear", value)}
                        >
                          <SelectTrigger onFocus={() => handleFieldFocus("expiryYear")}>
                            <SelectValue placeholder="년" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => (
                              <SelectItem key={2024 + i} value={String(2024 + i)}>
                                {2024 + i}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="cvc">CVC *</Label>
                        <Input
                          id="cvc"
                          type="text"
                          value={formData.cvc}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, "")
                            if (value.length <= 3) {
                              handleInputChange("cvc", value)
                            }
                          }}
                          onFocus={() => handleFieldFocus("cvc")}
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">카드 소유자명 *</Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                        onFocus={() => handleFieldFocus("cardholderName")}
                        placeholder="홍길동"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "처리 중..." : "결제하고 시작하기"}
                    </Button>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      {selectedPlan === "yearly"
                        ? "연간 결제로 2개월 무료 혜택을 받으세요. 언제든 취소 가능합니다."
                        : "매월 자동 결제됩니다. 언제든 취소 가능합니다."}
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={showWaitlistModal}
        onClose={() => setShowWaitlistModal(false)}
        planType={selectedPlan}
        amount={planInfo.price}
        isNotionConfigured={isNotionConfigured}
      />
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}
