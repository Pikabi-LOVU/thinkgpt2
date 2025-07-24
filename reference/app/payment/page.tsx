"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Shield, CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
  planType: string
  amount: number
  isNotionConfigured: boolean
}

function WaitlistModal({ isOpen, onClose, planType, amount, isNotionConfigured }: WaitlistModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-800">구매가 완료되었습니다!</CardTitle>
          <CardDescription>
            {planType === "monthly" ? "월간" : "연간"} 플랜 구매가 성공적으로 처리되었습니다.
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

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">다음 단계</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 인증 코드가 이메일로 발송됩니다</li>
              <li>• 앱 다운로드 링크 안내</li>
              <li>• 학부모 대시보드 접속 정보</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>빠른 시작을 원하시나요?</strong>
              <br />
              카카오톡 채널을 추가하시면 즉시 사용법을 안내해드립니다.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              확인
            </Button>
            <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">카카오톡 추가</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [showWaitlistModal, setShowWaitlistModal] = useState(false)
  const [isNotionConfigured, setIsNotionConfigured] = useState(true)
  const [selectedPlan, setSelectedPlan] = useState(searchParams.get("plan") || "monthly")

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    cardholderName: "",
    email: "",
    phone: "",
  })

  // useMemo를 사용해서 planInfo를 계산
  const planInfo = useMemo(() => {
    if (selectedPlan === "yearly") {
      return {
        title: "ThinkGPT 프리미엄 (연간)",
        price: 390000,
        period: "년",
        description: "연간 결제로 2개월 무료",
        savings: "₩78,000 절약",
      }
    } else {
      return {
        title: "ThinkGPT 프리미엄 (월간)",
        price: 39000,
        period: "월",
        description: "매월 자동 결제",
        savings: null,
      }
    }
  }, [selectedPlan])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Notion에 구매 데이터 저��
      const purchaseData = {
        timestamp: new Date().toISOString(),
        email: formData.email,
        phone: formData.phone,
        cardholderName: formData.cardholderName,
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
              <CreditCard className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">ThinkGPT 결제</span>
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
                    onClick={() => setSelectedPlan("monthly")}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">월간 플랜</h4>
                        <p className="text-sm text-gray-600">매월 자동 결제</p>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold">₩39,000</span>
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
                    onClick={() => setSelectedPlan("yearly")}
                  >
                    <div className="absolute -top-2 -right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                      절약
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">연간 플랜</h4>
                        <p className="text-sm text-gray-600">연간 결제로 2개월 무료</p>
                        <p className="text-sm text-green-600 font-medium">₩78,000 절약</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold">₩390,000</span>
                          <span className="text-gray-600">/년</span>
                        </div>
                        <div className="text-sm text-gray-500 line-through">₩468,000</div>
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
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* 연락처 정보 */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900">연락처 정보</h4>
                    <div>
                      <Label htmlFor="email">이메일 주소</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">휴대폰 번호</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        placeholder="010-1234-5678"
                        required
                      />
                    </div>
                  </div>

                  {/* 카드 정보 */}
                  <div className="space-y-4 border-t pt-4">
                    <h4 className="font-semibold text-gray-900">카드 정보</h4>
                    <div>
                      <Label htmlFor="cardNumber">카드 번호</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="expiryMonth">만료 월</Label>
                        <Select
                          value={formData.expiryMonth}
                          onValueChange={(value) => handleInputChange("expiryMonth", value)}
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="expiryYear">만료 년</Label>
                        <Select
                          value={formData.expiryYear}
                          onValueChange={(value) => handleInputChange("expiryYear", value)}
                        >
                          <SelectTrigger>
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
                        <Label htmlFor="cvc">CVC</Label>
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
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="cardholderName">카드 소유자명</Label>
                      <Input
                        id="cardholderName"
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange("cardholderName", e.target.value)}
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
                      {isLoading ? "처리 중..." : `₩${planInfo.price.toLocaleString()} 결제하기`}
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
