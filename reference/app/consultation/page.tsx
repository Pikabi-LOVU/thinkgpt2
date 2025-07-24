"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
}

function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-xl text-green-800">상담 신청이 완료되었습니다!</CardTitle>
          <CardDescription>빠른 시일 내에 연락드리겠습니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">다음 단계</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• 1-2일 내 전화 상담 예정</li>
              <li>• 자녀 학습 현황 맞춤 상담</li>
              <li>• ThinkGPT 활용 방법 안내</li>
            </ul>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>급하신 경우</strong>
              <br />
              카카오톡 채널을 추가하시면 더 빠른 상담이 가능합니다.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={onClose}>
              확인
            </Button>
            <Button className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">카카오톡 상담</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function ConsultationPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    grade: "",
    message: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Notion에 상담 신청 데이터 저장
      const consultationData = {
        name: formData.name,
        phone: formData.phone,
        grade: formData.grade,
        message: formData.message,
      }

      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(consultationData),
      })

      const result = await response.json()

      if (result.success) {
        console.log("상담 신청이 Notion에 저장되었습니다.")
      } else {
        console.error("저장 실패:", result.message)
      }
    } catch (error) {
      console.error("API 호출 실패:", error)
    }

    // 2초 후 완료 모달 표시
    setTimeout(() => {
      setIsLoading(false)
      setShowModal(true)
    }, 2000)
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
              <MessageSquare className="h-6 w-6 text-blue-600" />
              <span className="text-lg font-semibold">ThinkGPT 상담 신청</span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>무료 상담 신청</CardTitle>
              <CardDescription>
                자녀의 학습 현황에 맞는 맞춤 상담을 제공해드립니다. 간단한 정보를 남겨주시면 전문 상담사가
                연락드리겠습니다.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">학부모 성함 *</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="홍길동"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">연락처 *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      placeholder="010-1234-5678"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="grade">자녀 학년 *</Label>
                    <Select value={formData.grade} onValueChange={(value) => handleInputChange("grade", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="학년을 선택해주세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elementary-1">초등학교 1학년</SelectItem>
                        <SelectItem value="elementary-2">초등학교 2학년</SelectItem>
                        <SelectItem value="elementary-3">초등학교 3학년</SelectItem>
                        <SelectItem value="elementary-4">초등학교 4학년</SelectItem>
                        <SelectItem value="elementary-5">초등학교 5학년</SelectItem>
                        <SelectItem value="elementary-6">초등학교 6학년</SelectItem>
                        <SelectItem value="middle-1">중학교 1학년</SelectItem>
                        <SelectItem value="middle-2">중학교 2학년</SelectItem>
                        <SelectItem value="middle-3">중학교 3학년</SelectItem>
                        <SelectItem value="high-1">고등학교 1학년</SelectItem>
                        <SelectItem value="high-2">고등학교 2학년</SelectItem>
                        <SelectItem value="high-3">고등학교 3학년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">상담 희망 내용 (선택)</Label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      placeholder="자녀의 학습 현황이나 궁금한 점을 자유롭게 적어주세요."
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">상담 내용</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• 자녀 학습 현황 분석</li>
                    <li>• ThinkGPT 활용 방법 안내</li>
                    <li>• 맞춤형 학습 계획 제안</li>
                    <li>• 학부모 궁금증 해결</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={isLoading}>
                  {isLoading ? "신청 중..." : "상담 신청하기"}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  개인정보는 상담 목적으로만 사용되며, 상담 완료 후 안전하게 처리됩니다.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <ConsultationModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  )
}
