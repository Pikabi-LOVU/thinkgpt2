"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  ArrowRight,
  Brain,
  Mic,
  Globe,
  BookOpen,
  Star,
  TrendingUp,
  Lightbulb,
  Volume2,
  MicIcon,
  Sparkles,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <>
      <div className="min-h-screen bg-white pb-32">
        {/* Fixed CTA Button */}
        <div className="fixed top-4 right-4 z-[99999]">
          <Link href="/payment">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg"
            >
              무료 체험 시작
            </Button>
          </Link>
        </div>

        <header className="container mx-auto break-keep px-4 py-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">생각톡</span>
                <p className="text-sm text-gray-600">질문이 자라는 AI 친구</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-gray-600 hover:text-gray-900">
                기능
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-gray-900">
                교육 원리
              </Link>
              <Link href="#testimonials" className="text-gray-600 hover:text-gray-900">
                후기
              </Link>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="container mx-auto break-keep px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-6">
                  <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">IB PYP 탐구 교육 기반</Badge>
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    정답 대신 <span className="text-blue-600">질문을 키워주는</span>
                    <br />
                    AI 코치
                  </h1>
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    질문이 자라는 순간, 생각이 자랍니다.
                    <br />
                    IB 탐구 교육의 힘을 집 앞 화면에서 경험하세요.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/payment">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4">
                      무료 체험 시작하기
                    </Button>
                  </Link>
                </div>

                <div className="flex items-center space-x-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    신용카드 불필요
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    즉시 사용 가능
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 shadow-xl">
                  <div className="bg-white rounded-xl p-6 shadow-lg">
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <Brain className="h-4 w-4 text-white" />
                      </div>
                      <span className="font-semibold text-gray-800">생각톡과 대화 중...</span>
                    </div>
                    <div className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-900">"지구온난화에 대해 어떻게 생각해?"</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-right">
                        <p className="text-sm text-gray-800">"자동차 때문인 것 같아요"</p>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm text-blue-900">
                          "좋은 관찰이야! 그럼 자동차 말고 다른 원인도 있을까? 🤔"
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4대 기능 */}
        <section id="features" className="py-16 bg-gray-50">
          <div className="container mx-auto break-keep px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">4가지 핵심 기능</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                IB PYP 탐구 교육 원리를 바탕으로 설계된 체계적인 질문 학습 시스템
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Mic className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-900">텍스트 & 음성 대화</CardTitle>
                  <CardDescription>텍스트로 편리하게, 음성으로 자연스럽게 대화</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-gray-500">텍스트 입력 + 음성 인식 모두 지원</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-green-900">이야기 토픽</CardTitle>
                  <CardDescription>흥미로운 주제로 시작하는 탐구 여행</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-gray-500">삼국지, 우주, 환경 등 20+ 토픽</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-purple-900">영어 대화 모드</CardTitle>
                  <CardDescription>영어로 생각하고 질문하는 글로벌 역량</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-gray-500">Cambridge A1-A2 레벨 지원</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-orange-900">질문 평가</CardTitle>
                  <CardDescription>질문의 깊이를 분석하고 피드백 제공</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xs text-gray-500">메타인지 기반 사고력 향상</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 실제 서비스 화면들 */}
        <section className="py-16">
          <div className="container mx-auto break-keep px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">실제 서비스 화면</h2>
              <p className="text-gray-600">생각톡이 어떻게 작동하는지 직접 확인해보세요</p>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
              {/* 텍스트 & 음성 대화 화면 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-blue-100 text-blue-800 mb-4">텍스트 & 음성 대화</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">편리한 텍스트, 자연스러운 음성</h3>
                  <p className="text-gray-600 mb-6">
                    평소에는 텍스트로 편리하게 대화하고, 원할 때는 음성으로 더 자연스럽게 소통할 수 있어요. 아이가
                    선호하는 방식으로 자유롭게 질문하고 답할 수 있습니다.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      텍스트 입력으로 빠른 대화
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      음성 인식으로 자연스러운 소통
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      AI 음성 응답 지원
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      대화 내용 자동 저장
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-xl">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                          <Brain className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-800">생각톡</span>
                      </div>
                      <div className="flex items-center text-green-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">대화 중</span>
                      </div>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Volume2 className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="text-sm text-blue-800">AI가 말하고 있어요</span>
                        </div>
                        <p className="text-blue-900">"공룡이 사라진 이유에 대해 어떻게 생각해?"</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-right">
                        <p className="text-gray-800 mb-1">"운석 때문인 것 같아요"</p>
                        <p className="text-xs text-gray-500">텍스트로 입력됨</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                          <input
                            type="text"
                            placeholder="텍스트로 답변하기..."
                            className="flex-1 bg-transparent text-sm outline-none"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <button className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                          <MicIcon className="h-5 w-5 text-white" />
                        </button>
                      </div>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-2">텍스트 입력 또는 음성으로 대화하세요</p>
                  </div>
                </div>
              </div>

              {/* 이야기 토픽 선택 화면 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-xl">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-800">이야기 토픽 선택</h4>
                      <Badge className="bg-green-100 text-green-800">20+ 토픽</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🌍</div>
                        <h5 className="font-semibold text-gray-800 mb-1">지구온난화</h5>
                        <p className="text-xs text-gray-600">환경과 기후 변화</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🦕</div>
                        <h5 className="font-semibold text-gray-800 mb-1">공룡 이야기</h5>
                        <p className="text-xs text-gray-600">고생물학과 진화</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">🚀</div>
                        <h5 className="font-semibold text-gray-800 mb-1">우주 탐험</h5>
                        <p className="text-xs text-gray-600">천문학과 우주과학</p>
                      </div>
                      <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow">
                        <div className="text-2xl mb-2">⚔️</div>
                        <h5 className="font-semibold text-gray-800 mb-1">삼국지</h5>
                        <p className="text-xs text-gray-600">역사와 인물</p>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">토픽 선택하기</Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge className="bg-green-100 text-green-800 mb-4">이야기 토픽</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">흥미로운 주제로 시작하는 탐구</h3>
                  <p className="text-gray-600 mb-6">
                    아이가 관심 있어 하는 주제를 선택하면, AI가 재미있는 이야기로 시작해서 자연스럽게 질문을 유도합니다.
                    각 토픽은 교육 전문가가 설계한 탐구 과정을 따릅니다.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      교육과정 연계 토픽
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      연령별 맞춤 난이도
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      지속적인 토픽 업데이트
                    </li>
                  </ul>
                </div>
              </div>

              {/* 영어 대화 모드 화면 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-purple-100 text-purple-800 mb-4">영어 대화 모드</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">영어로 생각하고 질문하기</h3>
                  <p className="text-gray-600 mb-6">
                    Cambridge English 기준에 맞춰 설계된 영어 대화 모드입니다. 아이의 영어 실력에 맞는 레벨을 선택하고,
                    영어로 질문하고 답하며 언어와 사고력을 동시에 기를 수 있어요.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Cambridge A1-A2 레벨
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      발음 교정 피드백
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      영어 사고력 동시 향상
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-xl">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <Globe className="h-6 w-6 text-purple-600 mr-2" />
                        <span className="font-semibold text-gray-800">English Mode</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">Level A2</Badge>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-purple-900 mb-2">"What do you think about climate change?"</p>
                        <p className="text-xs text-purple-600">기후 변화에 대해 어떻게 생각하나요?</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg text-right">
                        <p className="text-gray-800 mb-2">"I think cars make the Earth hot."</p>
                        <div className="flex items-center justify-end">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-600">Good grammar!</span>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <p className="text-purple-900">"Great thinking! What else might cause this problem?"</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <Button variant="outline" className="text-purple-600 border-purple-300 bg-transparent">
                        한국어로 전환
                      </Button>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mic className="h-4 w-4 mr-1" />
                        영어로 말해보세요
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 질문 평가 화면 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-xl">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-800">질문 평가 결과</h4>
                      <Badge className="bg-orange-100 text-orange-800">Level 3/5</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <p className="font-medium text-gray-800 mb-1">"자동차는 왜 지구를 아프게 해요?"</p>
                        <p className="text-sm text-gray-500">방금 전 질문</p>
                      </div>

                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Sparkles className="h-4 w-4 text-green-600 mr-2" />
                          <span className="font-semibold text-green-800">훌륭한 점</span>
                        </div>
                        <p className="text-sm text-green-700">
                          원인과 결과를 연결해서 생각하는 좋은 질문이에요! 환경 문제에 대한 관심도 보여주네요.
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Lightbulb className="h-4 w-4 text-blue-600 mr-2" />
                          <span className="font-semibold text-blue-800">다음 단계 제안</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          "다른 나라는 어떻게 해결하고 있을까?"처럼 비교하는 질문을 해보면 어떨까요?
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">질문 레벨</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-24">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                          </div>
                          <span className="text-sm font-medium text-orange-600">3/5</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Badge className="bg-orange-100 text-orange-800 mb-4">질문 평가</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">AI가 분석하는 질문의 깊이</h3>
                  <p className="text-gray-600 mb-6">
                    아이가 한 질문을 AI가 실시간으로 분석해서 어떤 종류의 사고인지, 어떤 점이 좋은지, 다음에는 어떤
                    질문을 해보면 좋을지 친근하게 알려줍니다.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      질문 유형 자동 분류
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      개인 맞춤 피드백
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      사고력 발달 단계 추적
                    </li>
                  </ul>
                </div>
              </div>

              {/* 질문 일기장 화면 */}
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <Badge className="bg-indigo-100 text-indigo-800 mb-4">질문 일기장</Badge>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">아이의 성장 과정을 한눈에</h3>
                  <p className="text-gray-600 mb-6">
                    아이가 한 모든 질문이 날짜별로 정리되어 저장됩니다. 질문의 변화를 통해 사고력이 어떻게 발달하고
                    있는지 확인할 수 있어요.
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      질문 히스토리 자동 저장
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      성장 과정 시각화
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      학부모 리포트 제공
                    </li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl p-6 shadow-xl">
                  <div className="bg-white rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-800">민수의 질문 일기장</h4>
                      <Badge className="bg-indigo-100 text-indigo-800">이번 주 12개</Badge>
                    </div>

                    <div className="space-y-4">
                      <div className="border-l-4 border-green-500 pl-4 py-2">
                        <p className="font-medium text-gray-800 mb-1">"다른 나라는 어떻게 환경을 보호하고 있을까요?"</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">2024.01.15 • 환경 토픽</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">비교분석 질문</Badge>
                        </div>
                      </div>

                      <div className="border-l-4 border-blue-500 pl-4 py-2">
                        <p className="font-medium text-gray-800 mb-1">"자동차는 왜 지구를 아프게 해요?"</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">2024.01.14 • 환경 토픽</p>
                          <Badge className="bg-blue-100 text-blue-800 text-xs">인과관계 질문</Badge>
                        </div>
                      </div>

                      <div className="border-l-4 border-purple-500 pl-4 py-2">
                        <p className="font-medium text-gray-800 mb-1">"공룡은 왜 사라졌을까요?"</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-500">2024.01.13 • 공룡 토픽</p>
                          <Badge className="bg-purple-100 text-purple-800 text-xs">호기심 질문</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <TrendingUp className="h-4 w-4 text-indigo-600 mr-2" />
                        <span className="font-semibold text-indigo-800">이번 주 성장 포인트</span>
                      </div>
                      <p className="text-sm text-indigo-700">
                        단순한 호기심에서 비교분석까지! 질문의 깊이가 한 단계 발전했어요 🎉
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IB 교육 원리 */}
        <section id="about" className="py-16 bg-gray-50">
          <div className="container mx-auto break-keep px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 mb-4">
                  International Baccalaureate® 공식 인증
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">IB PYP 탐구 교육의 힘</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  세계적으로 검증된 탐구 기반 학습 방법론을 AI 기술과 결합하여 가정에서도 경험할 수 있습니다
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <Lightbulb className="h-8 w-8 text-blue-600 mb-2" />
                    <CardTitle className="text-blue-900">탐구 기반 학습</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-blue-800 text-sm">
                      학생이 스스로 질문을 만들고 탐구하는 과정을 통해 깊이 있는 학습이 이루어집니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-200 bg-green-50">
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
                    <CardTitle className="text-green-900">비판적 사고</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-green-800 text-sm">
                      정보를 분석하고 평가하며, 논리적 추론을 통해 비판적 사고력을 기릅니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-purple-200 bg-purple-50">
                  <CardHeader>
                    <Globe className="h-8 w-8 text-purple-600 mb-2" />
                    <CardTitle className="text-purple-900">글로벌 마인드</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-purple-800 text-sm">
                      다양한 관점을 이해하고 글로벌 이슈에 대한 인식을 키워 국제적 마인드를 함양합니다.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">도입 교육기관</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">서울국제학교</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">채드윅송도</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">NLCS 제주</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">KIS 판교</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 학부모 추천사 */}
        <section id="testimonials" className="py-16">
          <div className="container mx-auto break-keep px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">학부모 추천사</h2>
              <p className="text-gray-600">IB 교육을 경험한 학부모님들의 생생한 후기</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">김○○ 학부모</CardTitle>
                  <CardDescription>NLCS 제주 재학생 학부모</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-700 mb-4">
                    "IB 교육의 핵심인 탐구 학습을 집에서도 경험할 수 있어서 정말 만족합니다. 아이가 스스로 질문을 만드는
                    모습이 놀라워요."
                  </blockquote>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-800 font-semibold text-sm">질문 생성 능력 300% 향상</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">이○○ 학부모</CardTitle>
                  <CardDescription>채드윅 송도 재학생 학부모</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-700 mb-4">
                    "영어 모드로 대화하면서 언어 실력과 사고력을 동시에 키울 수 있어서 일석이조입니다. Cambridge 레벨에
                    맞춰 단계적으로 학습할 수 있어요."
                  </blockquote>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-800 font-semibold text-sm">영어 사고력 동시 향상</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">박○○ 학부모</CardTitle>
                  <CardDescription>KIS 판교 재학생 학부모</CardDescription>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-700 mb-4">
                    "AI가 제공하는 피드백이 정말 전문적이에요. 아이의 사고 과정을 분석해서 다음 단계를 제시해주니
                    체계적으로 성장하고 있어요."
                  </blockquote>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <p className="text-purple-800 font-semibold text-sm">체계적 사고력 발달</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA 섹션 */}
        <section className="py-16 bg-blue-600">
          <div className="container mx-auto break-keep px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                IB 탐구 교육의 힘을
                <br />
                <span className="text-yellow-300">지금 경험해보세요</span>
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                세계적으로 검증된 교육 방법론과 최신 AI 기술의 만남
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="bg-white shadow-xl">
                  <CardHeader>
                    <Badge className="w-fit bg-blue-100 text-blue-800">베이직 플랜</Badge>
                    <CardTitle className="text-2xl">₩39,000/월</CardTitle>
                    <CardDescription>IB 탐구 학습의 모든 기능</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>텍스트 & 음성 대화 무제한</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>50+ 이야기 토픽</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>영어 대화 모드 (Cambridge A1-A2)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>질문 평가 및 피드백</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>학습 리포트</span>
                      </li>
                    </ul>
                    <Link href="/payment?plan=monthly">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        무료 체험 시작하기
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="bg-white shadow-xl border-2 border-yellow-400">
                  <CardHeader>
                    <Badge className="w-fit bg-yellow-100 text-yellow-800">연간 플랜</Badge>
                    <CardTitle className="text-2xl">₩290,000/년</CardTitle>
                    <CardDescription>연간 결제로 2개월 무료 혜택</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>베이직 플랜 모든 기능</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="font-semibold">연간 결제 할인 혜택</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span className="font-semibold">₯178,000 절약 (2개월 무료)</span>
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                        <span>우선 고객 지원</span>
                      </li>
                    </ul>
                    <Link href="/payment?plan=yearly">
                      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
                        연간 플랜 시작하기
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>

              <div className="text-center">
                <p className="text-blue-100 text-sm">
                  ⭐ 전 세계 IB 학교에서 검증된 교육 방법론 • 신용카드 불필요 • 언제든 해지 가능
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
