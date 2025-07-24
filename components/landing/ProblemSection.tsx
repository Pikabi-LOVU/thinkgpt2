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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

export const ProblemSection = () => {
    return (
        <section className="py-12 md:py-16 bg-gray-900">
          <div className="container mx-auto break-keep px-4">
            <div className="text-center mb-8 md:mb-12">
              <AlertTriangle className="h-12 w-12 md:h-16 md:w-16 text-red-500 mx-auto break-keep mb-4" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-2" data-track-id="problem-section" data-section="Problem Introduction">
                <span className="text-red-400 block mb-2">복붙만 하는 AI 시대</span>
                <span className="text-lg sm:text-2xl md:text-3xl">우리 아이는 <span className="text-red-400">생각하는 힘</span>을 잃고 있습니다</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto break-keep px-4">
                ChatGPT에 의존하는 아이들, 과연 이대로 괜찮을까요?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto break-keep">
              <Card className="border-gray-700 bg-gray-800 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-red-900 rounded-full flex items-center justify-center mx-auto break-keep mb-3 md:mb-4">
                    <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-red-400" />
                  </div>
                  <CardTitle className="text-white text-center text-lg md:text-xl">생각 없이 복붙하는 우리 아이</CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <div className="relative bg-gray-700 rounded-2xl p-4 mb-4 shadow-inner">
                    <div className="absolute -bottom-2 left-1/2 -rotate-180 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-gray-700"></div>
                    <p className="text-gray-100 text-sm md:text-base italic">
                      "아이가 GPT에 과제를 물어보고 그대로 제출해요. 스스로 생각하는 시간이 줄어들고 있어 걱정됩니다."
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">초5 학부모님</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-900 rounded-full flex items-center justify-center mx-auto break-keep mb-3 md:mb-4">
                    <Zap className="h-6 w-6 md:h-8 md:w-8 text-orange-400" />
                  </div>
                  <CardTitle className="text-white text-center text-lg md:text-xl">즉답에 의존하는 우리 아이</CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <div className="relative bg-gray-700 rounded-2xl p-4 mb-4 shadow-inner">
                  <div className="absolute -bottom-2 left-1/2 -rotate-180 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-gray-700"></div>
                    <p className="text-gray-100 text-sm md:text-base italic">
                      "수학이나 과학 문제를 GPT에 물어보면 바로 답만 받아요. 문제 해결 과정을 스스로 생각해보지 않아요."
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">중2 학부모님</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800 shadow-lg">
                <CardHeader>
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto break-keep mb-3 md:mb-4">
                    <Eye className="h-6 w-6 md:h-8 md:w-8 text-gray-400" />
                  </div>
                  <CardTitle className="text-white text-center text-lg md:text-xl">AI 채팅 내역을 숨기는 우리 아이</CardTitle>
                </CardHeader>
                <CardContent className="px-4">
                  <div className="relative bg-gray-700 rounded-2xl p-4 mb-4 shadow-inner">
                  <div className="absolute -bottom-2 left-1/2 -rotate-180 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-gray-700"></div>
                    <p className="text-gray-100 text-sm md:text-base italic">
                      "아이가 어떤 과정으로 학습하는지 알 수 없어요. 제대로 공부하고 있는지 확인하고 싶습니다."
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-xs text-gray-400">고1 학부모님</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <div className="relative max-w-3xl mx-auto break-keep px-4">
                {/* Main Container without speech bubble */}
                <div className="relative bg-gradient-to-br from-red-900 to-red-950 p-6 md:p-8 rounded-3xl shadow-2xl border-2 border-red-700">
                  {/* Animated glow effect */}
                  <div className="absolute inset-0 bg-red-600/20 rounded-3xl blur-xl animate-pulse"></div>
                  
                  {/* Warning icon with animation */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-red-800/30 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <AlertTriangle className="h-10 w-10 text-red-400 animate-bounce" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-6 relative" data-track-id="thinking-degradation" data-section="Thinking Degradation">
                    <span className="text-red-300">이대로 방치하면</span>
                    <span className="text-red-400">?</span>
                  </h3>
                  
                  <div className="space-y-3 relative">
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-red-100 opacity-100">
                        시험에서 혼자 풀지 못함
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-red-200 opacity-75">
                        창의적 사고력 저하
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-red-300 opacity-50">
                        문제 해결 능력 부족
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-xl md:text-2xl font-bold text-red-400 opacity-25">
                        자기주도 학습 불가능
                      </p>
                    </div>
                    
                    <div className="text-center pt-2 space-y-0">
                      <p className="text-2xl font-black text-red-500 opacity-15 leading-3">•</p>
                      <p className="text-2xl font-black text-red-500 opacity-10 leading-3">•</p>
                      <p className="text-2xl font-black text-red-500 opacity-5 leading-3">•</p>
                    </div>
                  </div>
                </div>
                
                {/* Separate warning message */}
                <div className="mt-6 text-center">
                  <p className="text-gray-300 font-medium italic text-lg md:text-xl">
                    "지금이 아이의 미래를 바꿀 마지막 기회입니다"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}