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

export const DashbaordSection = () => {
    return (
        <section className="py-6 md:py-8 bg-gray-950">
          <div className="container mx-auto break-keep px-4 relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <div className="inline-block mb-4">
                <div className="bg-purple-500 text-white px-4 py-1 rounded-full text-xs md:text-sm font-bold animate-pulse">
                  🔍 학부모 전용 기능
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 md:mb-4">
                우리 아이,<br />제대로 공부하고 있을까?
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-4">
                <span className="text-purple-400 font-bold">모든 학습 과정</span>을 투명하게 공개하는 대시보드
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="h-1 bg-gradient-to-r from-transparent to-yellow-400 flex-1 max-w-[200px]"></div>
                <p className="text-4xl md:text-5xl font-black text-yellow-400 animate-pulse">
                  출시 예정!
                </p>
                <div className="h-1 bg-gradient-to-l from-transparent to-yellow-400 flex-1 max-w-[200px]"></div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              {/* Key Features Grid - Compact */}
              <div className="grid grid-cols-3 gap-3 mb-6 max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 backdrop-blur-sm rounded-lg p-3 border border-purple-700/30 text-center">
                  <div className="w-8 h-8 bg-purple-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="h-4 w-4 text-purple-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">실시간 모니터링</h3>
                  <p className="text-purple-300 text-xs mt-1">언제든 확인</p>
                </div>
                <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 backdrop-blur-sm rounded-lg p-3 border border-blue-700/30 text-center">
                  <div className="w-8 h-8 bg-blue-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MessageSquare className="h-4 w-4 text-blue-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">전체 대화 내역</h3>
                  <p className="text-blue-300 text-xs mt-1">모든 대화 공개</p>
                </div>
                <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/20 backdrop-blur-sm rounded-lg p-3 border border-emerald-700/30 text-center">
                  <div className="w-8 h-8 bg-emerald-600/30 rounded-full flex items-center justify-center mx-auto mb-2">
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  </div>
                  <h3 className="text-white font-semibold text-sm">성장 리포트</h3>
                  <p className="text-emerald-300 text-xs mt-1">주간/월간 분석</p>
                </div>
              </div>

              {/* Dashboard Mockup - Browser Style */}
              <div className="relative">
                {/* Multiple glow layers for depth */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 blur-3xl"></div>
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/15 via-purple-600/15 to-blue-600/15 blur-2xl"></div>
                
                {/* Main dashboard container with enhanced shadow */}
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden border-2 border-gray-600/50 shadow-[0_20px_70px_-15px_rgba(139,92,246,0.3)] transform hover:scale-[1.02] transition-transform duration-300">
                {/* Browser Header */}
                <div className="bg-gray-850 px-4 py-3 border-b border-gray-800">
                  <div className="flex items-center gap-3">
                    {/* Window Controls */}
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    {/* URL Bar */}
                    <div className="flex-1 bg-gray-800 rounded-md px-3 py-1.5 flex items-center gap-2">
                      <div className="text-gray-500">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <span className="text-gray-400 text-sm">dashboard.thinkgpt.ai</span>
                    </div>
                    {/* Profile */}
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-medium">학부모</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-gray-950">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 px-6 py-4 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                          <Brain className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">ThinkGPT 학부모 대시보드</h3>
                          <p className="text-gray-400 text-sm">김민준 학생 | 중학교 2학년</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-500 text-xs">마지막 접속</p>
                        <p className="text-white text-sm font-medium flex items-center justify-end gap-1">
                          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                          5분 전
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-px bg-gray-800">
                    <div className="bg-gray-950 p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs uppercase tracking-wider">학습 효율</span>
                        <div className="text-xs text-purple-400 bg-purple-900/20 px-2 py-1 rounded-full">+5%</div>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-purple-400 mb-2">87%</div>
                      <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-400 h-full transition-all duration-500" style={{width: '87%'}}></div>
                      </div>
                    </div>
                    <div className="bg-gray-950 p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs uppercase tracking-wider">학습 시간</span>
                        <div className="text-xs text-blue-400 bg-blue-900/20 px-2 py-1 rounded-full">진행중</div>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-2">42분</div>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div key={i} className={`flex-1 h-2 rounded-full ${i < 7 ? 'bg-blue-400' : 'bg-gray-700'}`}></div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-950 p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-xs uppercase tracking-wider">주간 성장</span>
                        <TrendingUp className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">+15%</div>
                      <div className="flex items-end gap-1 h-8">
                        <div className="flex-1 bg-emerald-400/20 rounded-t" style={{height: '40%'}}></div>
                        <div className="flex-1 bg-emerald-400/40 rounded-t" style={{height: '60%'}}></div>
                        <div className="flex-1 bg-emerald-400/60 rounded-t" style={{height: '80%'}}></div>
                        <div className="flex-1 bg-emerald-400 rounded-t" style={{height: '100%'}}></div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Area */}
                  <div className="p-6">
                    {/* Section Title */}
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-bold text-lg flex items-center">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                        실시간 학습 활동
                      </h4>
                      <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors">
                        <span>전체보기</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Activity Cards */}
                    <div className="space-y-3">
                      {/* Active Learning Card */}
                      <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 relative overflow-hidden">
                        {/* Active Indicator */}
                        <div className="absolute top-0 left-0 w-1 h-full bg-green-400"></div>
                        
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                              <Brain className="h-5 w-5 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">수학 - 이차방정식</p>
                              <p className="text-gray-500 text-xs flex items-center gap-2">
                                <span>14:32</span>
                                <span className="text-gray-700">•</span>
                                <span className="text-green-400">진행중</span>
                              </p>
                            </div>
                          </div>
                          <div className="bg-green-500/10 text-green-400 text-xs px-3 py-1.5 rounded-full border border-green-500/20">
                            학습중
                          </div>
                        </div>
                        
                        {/* Chat Preview */}
                        <div className="bg-gray-950 rounded-lg p-3 space-y-2">
                          <div className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                              <Brain className="h-3 w-3 text-white" />
                            </div>
                            <div className="bg-gray-800 rounded-lg rounded-tl-sm px-3 py-2 max-w-[80%]">
                              <p className="text-gray-200 text-xs">이차방정식의 판별식을 구하려면 어떤 공식을 사용해야 할까요?</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2 justify-end">
                            <div className="bg-blue-600 rounded-lg rounded-tr-sm px-3 py-2 max-w-[80%]">
                              <p className="text-white text-xs">b²-4ac를 사용해야 해요!</p>
                            </div>
                            <div className="w-5 h-5 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-[10px]">민준</span>
                            </div>
                          </div>
                        </div>

                        {/* Progress Indicators */}
                        <div className="mt-3 flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-purple-500/20 rounded-full flex items-center justify-center">
                              <Lightbulb className="h-3 w-3 text-purple-400" />
                            </div>
                            <span className="text-xs text-gray-400">사고력 향상중</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <Target className="h-3 w-3 text-blue-400" />
                            </div>
                            <span className="text-xs text-gray-400">집중도 높음</span>
                          </div>
                        </div>
                      </div>

                      {/* Completed Card */}
                      <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-800 opacity-75">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                              <Brain className="h-5 w-5 text-purple-400" />
                            </div>
                            <div>
                              <p className="text-white font-medium">영어 - 에세이 작성</p>
                              <p className="text-gray-500 text-xs">13:15 ~ 14:20 (65분)</p>
                            </div>
                          </div>
                          <div className="bg-gray-600/20 text-gray-400 text-xs px-3 py-1.5 rounded-full border border-gray-600/20">
                            완료
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">사고력</div>
                            <div className="text-lg font-bold text-green-400">92%</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">참여도</div>
                            <div className="text-lg font-bold text-yellow-400">우수</div>
                          </div>
                          <div className="bg-gray-800/50 rounded-lg p-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">완성도</div>
                            <div className="text-lg font-bold text-blue-400">A+</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </section>
    )
}