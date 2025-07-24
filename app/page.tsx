"use client"

import React from "react"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  ArrowRight,
  Brain,
  Eye,
  Star,
  MessageSquare,
  CreditCard,
  AlertTriangle,
  Lightbulb,
  Users,
  TrendingUp,
  Zap,
  Target,
  X,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"
import { trackEvent } from "@/lib/mixpanel"
import { ScrollTracker } from "@/components/ScrollTracker"
import { fbViewContent } from "@/lib/facebook-pixel"
import { CTAButton } from "@/components/CTAButton"
import { ReviewSection } from "@/components/landing/ReviewSection"
import { SolutionSection } from "@/components/landing/SolutionSection"
import { ProblemSection } from "@/components/landing/ProblemSection"
import { Solution2Section } from "@/components/landing/Solution2Section"
import { ProgressSection } from "@/components/landing/ProgressSection"
import { DashbaordSection } from "@/components/landing/DashboardSection"
import { getVariant, getFunnel, getAfterCall } from "@/lib/url-params"

function LandingPageContent() {
  const searchParams = useSearchParams()
  const variant = getVariant(searchParams)
  const funnel = getFunnel(searchParams)
  const afterCall = getAfterCall(searchParams)
  const [viewerCount, setViewerCount] = React.useState(127);
  const [showFixedCTA, setShowFixedCTA] = React.useState(false);
  const [showViewerCount, setShowViewerCount] = React.useState(false);

  React.useEffect(() => {
    // Facebook Pixel - ViewContent 이벤트 (랜딩 페이지 뷰)
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'ThinkGPT',
        content_category: 'Education',
        content_type: 'product_group',
        variant: variant || 'direct_traffic',
        has_variant: !!variant,
        funnel: funnel,
        after_call: afterCall || null
      })
    }
  }, [variant, funnel])

  React.useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => {
        // Random change between -10 and +10
        const change = Math.floor(Math.random() * 21) - 10;
        const newCount = prev + change;
        // Keep it between 100 and 300
        if (newCount < 100) return 100;
        if (newCount > 300) return 300;
        return newCount;
      });
    }, 8000); // Update every 8 seconds

    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    // Always show fixed CTA button from the start
    setShowFixedCTA(true);
    
    // Show viewer count when scrolled past hero section
    const handleScroll = () => {
      const heroSectionHeight = window.innerHeight;
      const scrolledPastHero = window.scrollY > heroSectionHeight - 100;
      setShowViewerCount(scrolledPastHero);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // aftercall 파라미터가 있고 값이 없거나 빈 문자열이면 간단한 선택 페이지 보여주기
  if (searchParams.has('aftercall') && (!afterCall || afterCall === '')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Brain className="h-8 w-8 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ThinkGPT</h1>
          <p className="text-gray-600 mb-8">상담 감사합니다! 어떻게 진행하시겠어요?</p>
          
          <div className="space-y-4">
            <Link href="/?f=trial&aftercall=browse" className="block">
              <button className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                ThinkGPT 다시 둘러보기
              </button>
            </Link>
            
            <Link href="/next-step?f=trial&aftercall=trial" className="block">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                2주 체험 시작하기
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="overflow-x-hidden">
      <ScrollTracker threshold={0.5} />
      <div className="min-h-screen bg-white">
        {/* Fixed Bottom Viewer Counter */}
        <div className={`fixed bottom-20 right-4 z-[99998] transition-all duration-500 ${showViewerCount ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/40 rounded-full px-3 py-1.5 shadow-lg">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-sm">👀</span>
              <span className="text-white/90 font-normal">
                <span className="tabular-nums text-yellow-400/90">{viewerCount}</span>명이 보는 중
              </span>
            </div>
          </div>
        </div>

        {/* Fixed Bottom CTA Button - Shows after scrolling past hero */}
        <div className={`fixed bottom-0 left-0 right-0 z-[99999] transform transition-transform duration-300 ${showFixedCTA ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="container mx-auto px-4 pb-4 pt-2">
            <div className="max-w-lg mx-auto">
              <CTAButton
                href="/next-step"
                source="fixed_bottom_start"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-xl shadow-blue-600/30 rounded-xl px-4 py-3 text-sm md:text-base font-semibold hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-300"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                {funnel === 'consult' ? '무료 상담 신청하기' : '2주 체험 시작하기'}
              </CTAButton>
            </div>
          </div>
        </div>

        <header className="fixed top-0 left-0 right-0 w-full bg-gray-950 z-[9999] border-b border-gray-800">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-white">ThinkGPT</span>
              </div>
            </nav>
          </div>
        </header>

        <section className="relative overflow-hidden pb-20 md:pb-32 pt-[52px]">
          {/* Part 1: Hero Section */}
          {variant === 'recognition' ? (
            <div className="relative h-[calc(100svh-53px)] md:h-auto flex flex-col">
              {/* 이미지 섹션 - 모바일과 데스크탑 레이아웃 분리 */}
              <div id="hero-image" className="relative flex-shrink-0 bg-gradient-to-b from-purple-50 to-pink-50 md:bg-none md:py-12">
                {/* 모바일 레이아웃 - 전체 너비 */}
                <div className="md:hidden">
                  <img 
                    src="/recognition.png" 
                    alt="부모님이 아이의 성적표를 보고 기뻐하는 모습" 
                    className="w-full h-auto object-contain object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
                  
                  {/* 모바일 헤드라인 */}
                  <div className="absolute inset-0 flex items-end justify-center pb-16">
                    <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-6 text-center`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent blur-2xl -z-10"></div>
                      
                      <h2 className="text-2xl sm:text-3xl font-bold leading-[1.3] relative">
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          아끼면서도
                        </span>
                        <span className="relative inline-block mb-3">
                          <span className="relative z-10 text-white font-black tracking-tight">
                            성적 올리니
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-700/30 blur-xl scale-150"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transform scale-x-110"></div>
                        </span>
                        <span className="block text-white/90 font-semibold tracking-wider">
                          남편이 좋아해요
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                
                {/* 데스크탑 레이아웃 - 컨테이너 안에 */}
                <div className="hidden md:block container mx-auto px-4">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-2xl mx-auto">
                    {/* Fixed 배경 이미지 컨테이너 */}
                    <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
                      <div 
                        className="absolute inset-0 bg-cover bg-top opacity-90 rounded-3xl"
                        style={{ 
                          backgroundImage: `url('/recognition.png')`,
                          clipPath: 'inset(0 round 1.5rem)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                    </div>
                    
                    {/* 데스크탑 헤드라인 */}
                    <div className="absolute inset-0 flex items-end justify-center pb-12">
                      <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.3]">
                          <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                            아끼면서도
                          </span>
                          <span className="relative inline-block mb-3">
                            <span className="relative z-10 text-white font-black tracking-tight">
                              성적 올리니
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-700/30 blur-xl scale-150"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transform scale-x-110"></div>
                          </span>
                          <span className="block text-white/90 font-semibold tracking-wider">
                            남편이 좋아해요
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 인용구 섹션 - 깔끔한 흰색 배경 */}
              <div className="flex-1 md:flex-initial relative overflow-hidden flex justify-center px-4 pt-4 md:py-16 bg-white">
                
                {/* 메인 콘텐츠 */}
                <div className={`relative text-center transform transition-all duration-1000 delay-400 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} max-w-3xl mx-auto`}>
                  <div className="space-y-2 md:space-y-4">
                    {/* 첫 번째 텍스트 - 데스크탑에서 크게 */}
                    <p className="text-gray-700/80 text-base md:text-2xl leading-relaxed">
                      학원비 <span className="font-semibold text-gray-900">100만원</span>씩 내고도 불안했던 제가...
                    </p>
                    
                    {/* 하이라이트 텍스트 - 데스크탑에서 더 크게 */}
                    <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-transparent bg-clip-text leading-relaxed">
                      돈 아껴서<br/>필요한 과외만 찾아 주고 있어요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : variant === 'aicopy' ? (
            <div className="relative h-[calc(100svh-53px)] md:h-auto flex flex-col">
              {/* 이미지 섹션 - 모바일과 데스크탑 레이아웃 분리 */}
              <div id="hero-image" className="relative flex-shrink-0 bg-gradient-to-b from-green-50 to-emerald-50 md:bg-none md:py-12">
                {/* 모바일 레이아웃 - 전체 너비 */}
                <div className="md:hidden">
                  <img 
                    src="/aicopy.png" 
                    alt="AI로 숙제를 복사하는 아이" 
                    className="w-full h-auto object-contain object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
                  
                  {/* 모바일 헤드라인 */}
                  <div className="absolute inset-0 flex items-end justify-center pb-10">
                    <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-6 text-center`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent blur-2xl -z-10"></div>
                      
                      <h2 className="text-2xl sm:text-3xl font-bold leading-[1.3] relative">
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          우리 아이,
                        </span>
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          베이스도 없는데...
                        </span>
                        <span className="relative inline-block">
                          <span className="relative z-10 text-white font-black tracking-tight">
                            AI로 숙제 복붙 까지?
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-700/30 blur-xl scale-150"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-700 rounded-full transform scale-x-110"></div>
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                
                {/* 데스크탑 레이아웃 - 컨테이너 안에 */}
                <div className="hidden md:block container mx-auto px-4">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-2xl mx-auto">
                    {/* Fixed 배경 이미지 컨테이너 */}
                    <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
                      <div 
                        className="absolute inset-0 bg-cover bg-top opacity-90 rounded-3xl"
                        style={{ 
                          backgroundImage: `url('/aicopy.png')`,
                          clipPath: 'inset(0 round 1.5rem)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                    </div>
                    
                    {/* 데스크탑 헤드라인 */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                      <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.3]">
                          <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                            우리 아이,
                          </span>
                          <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                            베이스도 없는데...
                          </span>
                          <span className="relative inline-block">
                            <span className="relative z-10 text-white font-black tracking-tight">
                              AI로 숙제 복붙 까지?
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-orange-700/30 blur-xl scale-150"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 to-orange-700 rounded-full transform scale-x-110"></div>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 인용구 섹션 - 깔끔한 흰색 배경 */}
              <div className="flex-1 md:flex-initial relative overflow-hidden flex justify-center px-4 pt-4 md:py-16 bg-white">
                
                {/* 메인 콘텐츠 */}
                <div className={`relative text-center transform transition-all duration-1000 delay-400 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} max-w-3xl mx-auto`}>
                  <div className="space-y-2 md:space-y-4">
                    {/* 첫 번째 텍스트 - 데스크탑에서 크게 */}
                    <p className="text-gray-700/80 text-base md:text-2xl leading-relaxed">
                      ChatGPT에 <span className="font-semibold text-gray-900">의존</span>하던 아이가...
                    </p>
                    
                    {/* 하이라이트 텍스트 - 데스크탑에서 더 크게 */}
                    <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-transparent bg-clip-text leading-relaxed">
                      스스로 생각하고<br/>문제를 해결해요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : variant === 'grade' ? (
            <div className="relative h-[calc(100svh-53px)] md:h-auto flex flex-col">
              {/* 이미지 섹션 - 모바일과 데스크탑 레이아웃 분리 */}
              <div id="hero-image" className="relative flex-shrink-0 bg-gradient-to-b from-purple-50 to-indigo-50 md:bg-none md:py-12">
                {/* 모바일 레이아웃 - 전체 너비 */}
                <div className="md:hidden">
                  <img 
                    src="/grade.png" 
                    alt="성적표를 받고 기뻐하는 아이" 
                    className="w-full h-auto object-contain object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
                  
                  {/* 모바일 헤드라인 */}
                  <div className="absolute inset-0 flex items-end justify-center pb-10">
                    <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-6 text-center`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent blur-2xl -z-10"></div>
                      
                      <h2 className="text-2xl sm:text-3xl font-bold leading-[1.3] relative">
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          4등급 → 1등급
                        </span>
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          스스로 생각하는
                        </span>
                        <span className="relative inline-block">
                          <span className="relative z-10 text-white font-black tracking-tight">
                            공부 치트키
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-700/30 blur-xl scale-150"></div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transform scale-x-110"></div>
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                
                {/* 데스크탑 레이아웃 - 컨테이너 안에 */}
                <div className="hidden md:block container mx-auto px-4">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-2xl mx-auto">
                    {/* Fixed 배경 이미지 컨테이너 */}
                    <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
                      <div 
                        className="absolute inset-0 bg-cover bg-top opacity-90 rounded-3xl"
                        style={{ 
                          backgroundImage: `url('/grade.png')`,
                          clipPath: 'inset(0 round 1.5rem)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                    </div>
                    
                    {/* 데스크탑 헤드라인 */}
                    <div className="absolute inset-0 flex items-end justify-center pb-8">
                      <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.3]">
                          <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                            4등급 → 1등급
                          </span>
                          <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                            스스로 생각하는
                          </span>
                          <span className="relative inline-block">
                            <span className="relative z-10 text-white font-black tracking-tight">
                              공부 치트키
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-blue-700/30 blur-xl scale-150"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transform scale-x-110"></div>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 인용구 섹션 - 깔끔한 흰색 배경 */}
              <div className="flex-1 md:flex-initial relative overflow-hidden flex justify-center px-4 pt-4 md:py-16 bg-white">
                
                {/* 메인 콘텐츠 */}
                <div className={`relative text-center transform transition-all duration-1000 delay-400 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} max-w-3xl mx-auto`}>
                  <div className="space-y-2 md:space-y-4">
                    {/* 첫 번째 텍스트 - 데스크탑에서 크게 */}
                    <p className="text-gray-700/80 text-base md:text-2xl leading-relaxed">
                      전교 <span className="font-semibold text-gray-900">100등</span>이던 아이가
                    </p>
                    
                    {/* 하이라이트 텍스트 - 데스크탑에서 더 크게 */}
                    <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 text-transparent bg-clip-text leading-relaxed">
                      한 학기만에 7등이 되었어요
                    </p>
                    
                    {/* 추가 텍스트 */}
                    <p className="text-gray-700 text-sm md:text-xl leading-relaxed mt-4">
                      스스로 생각하더니 자신감이 생겼어요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : variant === 'gangnam' ? (
            <div className="relative h-[calc(100svh-53px)] md:h-auto flex flex-col">
              {/* 기본 이미지 섹션 */}
              <div id="hero-image" className="relative flex-shrink-0 bg-gradient-to-b from-amber-50 to-yellow-50 md:bg-none md:py-12">
                {/* 모바일 레이아웃 - 전체 너비 */}
                <div className="md:hidden">
                  <img 
                    src="/gangnam.png" 
                    alt="강남 학원가 모습" 
                    className="w-full h-auto object-contain object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
                  
                  {/* 모바일 헤드라인 */}
                  <div className="absolute inset-0 flex items-end justify-center pb-16">
                    <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} px-6 text-center`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent blur-2xl -z-10"></div>
                      
                      <h2 className="text-2xl sm:text-3xl font-bold leading-[1.3] relative">
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          정보에 빠삭한
                        </span>
                        <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                          대치동 상위 1% 엄마들이
                        </span>
                        <span className="relative inline-block mb-3">
                          <span className="relative z-10 text-white font-black tracking-tight">
                            갈아탄 AI 튜터
                          </span>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-orange-700 rounded-full transform scale-x-110"></div>
                        </span>
                      </h2>
                    </div>
                  </div>
                </div>
                
                {/* 데스크탑 레이아웃 - 컨테이너 안에 */}
                <div className="hidden md:block container mx-auto px-4">
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-2xl mx-auto">
                    {/* Fixed 배경 이미지 컨테이너 */}
                    <div className="relative h-[500px] bg-gradient-to-br from-gray-900 to-gray-800">
                      <div 
                        className="absolute inset-0 bg-cover bg-top opacity-90 rounded-3xl"
                        style={{ 
                          backgroundImage: `url('/gangnam.png')`,
                          clipPath: 'inset(0 round 1.5rem)'
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
                    </div>
                    
                    {/* 데스크탑 헤드라인 */}
                    <div className="absolute inset-0 flex items-end justify-center pb-12">
                      <div className={`transform transition-all duration-1000 delay-200 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center`}>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.3]">
                          <span className="block mb-3 text-white/90 font-semibold tracking-wider">
                            대치동 상위 1% 엄마들이
                          </span>
                          <span className="relative inline-block mb-3">
                            <span className="relative z-10 text-white font-black tracking-tight">
                              갈아탄 AI 튜터
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 to-yellow-700/30 blur-xl scale-150"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-600 to-yellow-700 rounded-full transform scale-x-110"></div>
                          </span>
                        </h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 인용구 섹션 - 깔끔한 흰색 배경 */}
              <div className="flex-1 md:flex-initial relative overflow-hidden flex justify-center px-4 pt-4 md:py-16 bg-white">
                
                {/* 메인 콘텐츠 */}
                <div className={`relative text-center transform transition-all duration-1000 delay-400 ${viewerCount > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} max-w-3xl mx-auto`}>
                  <div className="space-y-2 md:space-y-4">
                    {/* 첫 번째 텍스트 - 데스크탑에서 크게 */}
                    <p className="text-gray-700/80 text-base md:text-2xl leading-relaxed">
                      시대가 바뀌면, <span className="font-semibold text-gray-900">교육법도 바뀝니다.</span>
                    </p>
                    
                    {/* 하이라이트 텍스트 - 데스크탑에서 더 크게 */}
                    <p className="text-xl md:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 text-transparent bg-clip-text leading-relaxed">
                      발빠른 엄마들은<br/>이미 시작했어요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="relative bg-gradient-to-b from-red-950 via-red-900 to-red-950 pt-28 pb-12 md:pt-32 md:pb-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 via-transparent to-orange-900/30"></div>
              <div className="absolute inset-0 animate-siren-flash bg-red-500/0"></div>
              
              
              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-4xl mx-auto relative">
                  {/* Background Siren - Behind Title */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-96 md:h-96 opacity-10">
                    <img src="/images/siren.png" alt="" className="w-full h-full object-contain" />
                  </div>
                  
                  <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 md:mb-6 leading-tight relative z-10" data-track-id="hero-warning" data-section="Hero Warning">
                    <span className="text-red-100 block">답만 주는 AI,</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-300 to-orange-300 block">
                      아이들의 사고력을 망칩니다
                    </span>
                  </h2>
                  
                  <p className="text-base sm:text-lg md:text-xl text-red-100/80 max-w-2xl mx-auto px-4">
                    ChatGPT에 과제를 물어보고, <br />그대로 복사해서 제출하는 아이들
                    <br className="hidden sm:block" />
                    <br />
                    <br />
                    <span className="font-semibold text-red-200">생각하는 과정은 사라지고, 답만 남았습니다</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Fixed CTA Button 제거 - 상단의 고정 버튼 사용 */}

          {/* Part 2: Solution Section - Contrasting Theme */}
          <SolutionSection />
          
          {/* 후기 캐로셀 - 무한 스크롤 */}
          <ReviewSection />
        </section>

        {/* 문제점 섹션 - 어두운 배경으로 강조 */}
        <ProblemSection />

        {/* 솔루션 섹션 - 어두운 배경 */}
        <Solution2Section />



        {/* 학습 과정 섹션 - 어두운 배경 */}
        <ProgressSection />

        {/* 대시보드 섹션 - 어두운 배경 */}
        <DashbaordSection />


        {/* 최종 CTA 섹션 - 세련된 구매 유도 */}
        <section className="py-20 bg-gradient-to-b from-gray-900 via-gray-950 to-black relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto break-keep px-4 relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-block mb-8">
                <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-sm border border-purple-500/20 rounded-full px-6 py-2">
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 text-sm font-semibold">
                    ✨ 오늘 시작하면 내일부터 변화가 보입니다
                  </p>
                </div>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6" data-track-id="pricing-section" data-section="Pricing Plans">
                <span className="block mb-2">자녀의 미래,</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  오늘 결정이 바꿉니다
                </span>
              </h2>
              
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
                매일 <span className="text-white font-semibold">30분</span>의 투자로
                <br className="md:hidden" />
                아이의 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 font-semibold">평생 경쟁력</span>을 만들어주세요
              </p>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span><span className="text-white font-semibold">4.9/5</span> 만족도</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-purple-400" />
                  <span><span className="text-white font-semibold">1,200+</span> 가정이 선택</span>
                </div>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="max-w-5xl mx-auto mb-12">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {/* Monthly Plan */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <Card className="relative bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-purple-600/20 text-purple-400 border border-purple-600/30">
                        가장 인기
                      </Badge>
                    </div>
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl text-white mb-3">월간 플랜</CardTitle>
                      <CardDescription className="text-gray-400">부담 없이 시작하세요</CardDescription>
                      <div className="mt-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-white">₩29,000</span>
                          <span className="text-gray-400 text-lg">/월</span>
                        </div>
                        <div className="mt-3 bg-purple-600/10 border border-purple-600/20 rounded-lg px-3 py-2 inline-block">
                          <p className="text-purple-400 text-sm font-medium">하루 <span className="text-white font-bold">₩970원</span></p>
                          <p className="text-purple-300 text-xs">💧 삼다수 500ml보다 <span className="text-white font-semibold">더 저렴</span>합니다!</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <p className="text-purple-400 text-sm font-medium mb-3">포함된 혜택</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300">무제한 질문 & 학습</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300">맞춤형 AI 튜터링</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300">전과목 지원</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300">24시간 학습 가능</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300">이미지 인식 문제 풀이</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" />
                            <span className="text-gray-300">안전한 학습 환경</span>
                          </li>
                        </ul>
                      </div>
                      <CTAButton
                        href="/next-step"
                        source="start_monthly"
                        price={29000}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {funnel === 'consult' ? '무료 상담 신청하기' : '2주 체험하기'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </CTAButton>
                    </CardContent>
                  </Card>
                </div>

                {/* Yearly Plan */}
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <Card className="relative bg-gray-900 border-gray-800 hover:border-gray-700 transition-all duration-300">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-600/20 text-green-400 border border-green-600/30">
                        BEST VALUE
                      </Badge>
                    </div>
                    <CardHeader className="pb-6">
                      <CardTitle className="text-2xl text-white mb-3">연간 플랜</CardTitle>
                      <CardDescription className="text-gray-400">가장 경제적인 선택</CardDescription>
                      <div className="mt-6">
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-black text-white">₩290,000</span>
                          <span className="text-gray-400 text-lg">/년</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-gray-500 line-through">₩348,000</span>
                          <Badge className="bg-green-600/20 text-green-400 border-0">
                            17% 할인
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-8">
                        <p className="text-green-400 text-sm font-medium mb-3">포함된 혜택</p>
                        <p className="text-gray-300 text-sm mb-4">모든 프리미엄 기능 이용 가능</p>
                        <div className="bg-gradient-to-r from-orange-950/50 to-red-950/50 border border-orange-600/30 rounded-lg px-4 py-3">
                          <p className="text-orange-400 font-bold text-lg">🎁 2개월 완전 무료!</p>
                          <p className="text-orange-300 text-sm mt-1"><span className="text-orange-100 font-semibold">₩78,000</span> 할인 효과</p>
                        </div>
                      </div>
                      <CTAButton
                        href="/next-step"
                        source="start_yearly"
                        price={290000}
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white text-lg py-6 shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {funnel === 'consult' ? '무료 상담 신청하기' : '2주 체험하기'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </CTAButton>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="text-center">
              {/* Guarantee - Simple & Clear */}
              {funnel === 'trial' && (
                <div className="mb-8">
                  <p className="text-green-300 text-lg font-medium">
                    🎁 2주 체험 · 언제든지 취소 가능
                  </p>
                </div>
              )}
              
            </div>
          </div>
        </section>
      </div>
      
      {/* Professional Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12 pb-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <img src="/company_logo.png" alt="베리타스 랩스" className="h-10 mb-3 w-[200px] h-[200px] mx-auto" />
                <span className="text-xl font-semibold text-white">베리타스 랩스</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                AI 시대의 진짜 교육,<br />
                생각하는 힘을 키웁니다.
              </p>
             
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2025 베리타스 랩스. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Bottom spacer to end above viewer counter */}
      <div className="h-20 bg-gray-950"></div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense>
      <LandingPageContent />
    </Suspense>
  )
}
