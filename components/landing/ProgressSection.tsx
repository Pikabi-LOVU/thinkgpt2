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

export const ProgressSection = () => {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 relative">
        {/* Divider with emphasis */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="bg-yellow-400 w-20 h-20 rounded-full blur-3xl opacity-50 animate-pulse"></div>
        </div>
        
        <div className="container mx-auto break-keep px-4 relative z-10">
          <div className="text-center mb-8 md:mb-12">
            <div className="mb-6">
              <div className="inline-block">
                <div className="relative">
                  {/* Glow effect behind badge */}
                  <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative bg-yellow-400 text-gray-900 px-6 py-2 rounded-full text-sm md:text-base font-bold mb-4 animate-bounce shadow-lg shadow-yellow-400/20">
                    🔥 실제 사용 예시
                  </div>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-2" data-track-id="thinkgpt-solution" data-section="ThinkGPT Solution">
                백문이 불여일견
              </h2>
              <p className="text-xl md:text-2xl text-gray-400">
                실제로 어떻게 작동하는지 확인하세요
              </p>
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-blue-400 blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-900/50 to-cyan-900/50 backdrop-blur-sm border border-blue-500/30 rounded-2xl px-6 py-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-400/30">
                      <span className="text-white font-black text-lg">1</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400" data-track-id="case-1-writing" data-section="Case 1 Writing">Case 1: 글쓰기</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle className="text-white text-base md:text-lg font-bold text-center">
                    완전히 다른 접근법
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  {/* Split Screen Comparison */}
                  <div className="relative">
                    {/* Center Divider */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 z-10"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                      <div className="bg-gray-800 rounded-full p-2 border-2 border-gray-700">
                        <span className="text-white font-bold text-xs">VS</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-px">
                      {/* 일반 AI Side */}
                      <div className="bg-red-950/20 p-3 border-r border-gray-700">
                        <div className="text-center mb-3">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-red-900/50 rounded-full mb-1">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                          <h4 className="text-red-400 text-xs font-bold">일반 AI</h4>
                        </div>
                        
                        {/* Flow Diagram */}
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="bg-gray-700/50 rounded px-2 py-1 inline-block">
                              <span className="text-gray-300 text-[10px]">학생 질문</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-400 text-lg">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="bg-red-900/30 rounded px-2 py-1 inline-block border border-red-700/50">
                              <span className="text-red-300 text-[10px] font-bold">즉시 답 제공</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-400 text-lg">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="inline-block">
                              <div className="text-4xl">🧠</div>
                              <div className="text-[10px] text-red-400 font-medium">사고력 0%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* ThinkGPT Side */}
                      <div className="bg-emerald-950/20 p-3">
                        <div className="text-center mb-3">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-900/50 rounded-full mb-1">
                            <Brain className="h-5 w-5 text-emerald-400" />
                          </div>
                          <h4 className="text-emerald-400 text-xs font-bold">ThinkGPT</h4>
                        </div>
                        
                        {/* Flow Diagram */}
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="bg-gray-700/50 rounded px-2 py-1 inline-block">
                              <span className="text-gray-300 text-[10px]">학생 질문</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-400 text-lg animate-pulse">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="bg-blue-600/20 rounded px-2 py-1 inline-block border border-blue-600/30">
                              <span className="text-blue-300 text-[10px] font-bold">소크라테스식 질문</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-emerald-400 text-lg animate-pulse">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="inline-block">
                              <div className="text-4xl animate-bounce">🚀</div>
                              <div className="text-[10px] text-emerald-400 font-medium">사고력 100%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-red-900/20 rounded-lg p-2 text-center border border-red-700/30">
                      <p className="text-[10px] text-red-400">학습 효과</p>
                      <p className="text-lg font-bold text-red-300">0%</p>
                    </div>
                    <div className="bg-emerald-900/20 rounded-lg p-2 text-center border border-emerald-700/30">
                      <p className="text-[10px] text-emerald-400">학습 효과</p>
                      <p className="text-lg font-bold text-emerald-300">95%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base md:text-lg font-bold text-center">
                    실제 앱 화면
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Phone Mockup */}
                  <div className="bg-gray-900 rounded-2xl p-2 mx-4 mb-4 shadow-2xl">
                    {/* Phone Status Bar */}
                    <div className="bg-gray-950 rounded-t-xl px-4 py-1.5 flex items-center justify-between text-[10px] text-gray-400">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 border border-gray-400 rounded-sm"></div>
                        <div className="w-3 h-3 border border-gray-400 rounded-sm"></div>
                        <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="bg-gray-950 px-4 py-3 border-b border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-semibold">ThinkGPT</span>
                        </div>
                        <span className="text-gray-500 text-xs">글쓰기 도우미</span>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="bg-gray-950 px-3 py-4 space-y-3">
                      {/* Student Message - 먼저 시작 */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                          <p className="text-white text-xs leading-relaxed">
                            환경보호에 대한 글ㄹ써줘
                          </p>
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-medium">나</span>
                        </div>
                      </div>
                      
                      {/* AI Message */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                          <p className="text-gray-100 text-xs leading-relaxed">
                            물론이죠! 환경보호에 대한 글을 함께 써봐요. 먼저 환경보호가 왜 중요하다고 생각하나요? 본인의 생각을 들려주세요.
                          </p>
                        </div>
                      </div>
                      
                      {/* Student Message */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                          <p className="text-white text-xs leading-relaxed">
                            지구온난화로 북극곰 죽어가ㅜ
                          </p>
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-medium">나</span>
                        </div>
                      </div>
                      
                      {/* AI Message */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                          <p className="text-gray-100 text-xs leading-relaxed">
                            좋은 관찰이에요! 북극곰 외에 또 어떤 영향이 있을까요? 사람들의 생활에는 어떤 변화가 있을지 생각해보세요.
                          </p>
                        </div>
                      </div>
                      
                      {/* Thinking Indicator */}
                      <div className="flex items-center gap-2 justify-end">
                        <div className="bg-gray-700 rounded-full px-3 py-1">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="bg-gray-950 px-3 py-3 border-t border-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center">
                          <span className="text-gray-500 text-xs">메시지를 입력하세요...</span>
                        </div>
                        <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-12 md:mb-16">
            <div className="text-center mb-6 md:mb-8">
              <div className="inline-block relative">
                <div className="absolute inset-0 bg-purple-400 blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-purple-900/50 to-violet-900/50 backdrop-blur-sm border border-purple-500/30 rounded-2xl px-6 py-3">
                  <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-violet-400 rounded-xl flex items-center justify-center shadow-lg shadow-purple-400/30">
                      <span className="text-white font-black text-lg">2</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-violet-400" data-track-id="case-2-problem-solving" data-section="Case 2 Problem Solving">Case 2: 문제풀이</span>
                  </h3>
                </div>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4 md:gap-8">
              <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardHeader className="pb-0">
                  <CardTitle className="text-white text-base md:text-lg font-bold text-center">
                    완전히 다른 접근법
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  {/* Split Screen Comparison */}
                  <div className="relative">
                    {/* Center Divider */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gray-700 z-10"></div>
                    <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-20">
                      <div className="bg-gray-800 rounded-full p-2 border-2 border-gray-700">
                        <span className="text-white font-bold text-xs">VS</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-px">
                      {/* 일반 AI Side */}
                      <div className="bg-red-950/20 p-3 border-r border-gray-700">
                        <div className="text-center mb-3">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-red-900/50 rounded-full mb-1">
                            <X className="h-5 w-5 text-red-400" />
                          </div>
                          <h4 className="text-red-400 text-xs font-bold">일반 AI</h4>
                        </div>
                        
                        {/* Flow Diagram */}
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="bg-gray-700/50 rounded px-2 py-1 inline-block">
                              <span className="text-gray-300 text-[10px]">수학 문제</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-400 text-lg">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="bg-red-900/30 rounded px-2 py-1 inline-block border border-red-700/50">
                              <span className="text-red-300 text-[10px] font-bold">풀이 과정 + 답</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-red-400 text-lg">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="inline-block">
                              <div className="text-4xl">📝</div>
                              <div className="text-[10px] text-red-400 font-medium">복사 → 붙여넣기</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* ThinkGPT Side */}
                      <div className="bg-emerald-950/20 p-3">
                        <div className="text-center mb-3">
                          <div className="inline-flex items-center justify-center w-8 h-8 bg-emerald-900/50 rounded-full mb-1">
                            <Brain className="h-5 w-5 text-emerald-400" />
                          </div>
                          <h4 className="text-emerald-400 text-xs font-bold">ThinkGPT</h4>
                        </div>
                        
                        {/* Flow Diagram */}
                        <div className="space-y-2">
                          <div className="text-center">
                            <div className="bg-gray-700/50 rounded px-2 py-1 inline-block">
                              <span className="text-gray-300 text-[10px]">수학 문제</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-400 text-lg animate-pulse">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="bg-blue-600/20 rounded px-2 py-1 inline-block border border-blue-600/30">
                              <span className="text-blue-300 text-[10px] font-bold">단계별 힌트</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-emerald-400 text-lg animate-pulse">⬇</div>
                          </div>
                          <div className="text-center">
                            <div className="inline-block">
                              <div className="text-4xl animate-bounce">💡</div>
                              <div className="text-[10px] text-emerald-400 font-medium">스스로 해결!</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Stats */}
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-red-900/20 rounded-lg p-2 text-center border border-red-700/30">
                      <p className="text-[10px] text-red-400">응용력</p>
                      <p className="text-lg font-bold text-red-300">0%</p>
                    </div>
                    <div className="bg-emerald-900/20 rounded-lg p-2 text-center border border-emerald-700/30">
                      <p className="text-[10px] text-emerald-400">응용력</p>
                      <p className="text-lg font-bold text-emerald-300">100%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base md:text-lg font-bold text-center">
                    실제 앱 화면
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Phone Mockup */}
                  <div className="bg-gray-900 rounded-2xl p-2 mx-4 mb-4 shadow-2xl">
                    {/* Phone Status Bar */}
                    <div className="bg-gray-950 rounded-t-xl px-4 py-1.5 flex items-center justify-between text-[10px] text-gray-400">
                      <span>9:41</span>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 border border-gray-400 rounded-sm"></div>
                        <div className="w-3 h-3 border border-gray-400 rounded-sm"></div>
                        <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                      </div>
                    </div>
                    
                    {/* App Header */}
                    <div className="bg-gray-950 px-4 py-3 border-b border-gray-800">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                            <Brain className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-white text-sm font-semibold">ThinkGPT</span>
                        </div>
                        <span className="text-gray-500 text-xs">수학 도우미</span>
                      </div>
                    </div>
                    
                    {/* Chat Messages */}
                    <div className="bg-gray-950 px-3 py-4 space-y-3">
                      {/* Student Message with Image */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-2 max-w-[80%]">
                          <img 
                            src="/math_work.png" 
                            alt="학생의 수학 문제 풀이" 
                            className="rounded-lg w-full max-w-[80px]"
                          />
                          <p className="text-white text-xs mt-2 px-1">
                            평가좀
                          </p>
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-medium">나</span>
                        </div>
                      </div>
                      
                      {/* AI Message */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                          <p className="text-gray-100 text-xs leading-relaxed mb-2">
                            등비수열 문제를 풀었구나?
                          </p>
                          <div className="space-y-2">
                            <div className="bg-green-900/20 rounded-lg px-2 py-1.5 border border-green-700/30">
                              <p className="text-green-400 text-[11px] font-semibold mb-1">✅ 잘한 점</p>
                              <p className="text-gray-300 text-[10px] leading-relaxed">
                                일반항 표현을 정확히 사용했어!<br/>
                                조건에 맞춰 식을 세우고, 인수 묶기까지 잘했어!
                              </p>
                            </div>
                            <div className="bg-red-900/20 rounded-lg px-2 py-1.5 border border-red-700/30">
                              <p className="text-red-400 text-[11px] font-semibold mb-1">❌ 주의할 점</p>
                              <p className="text-gray-300 text-[10px] leading-relaxed">
                                나눗셈을 할 때 분모 ≠ 0 조건을 깜빡하면 안 돼!<br/>
                                예를 들어 r = 0 이나 1 + r² = 0 같은 경우가 수학적으로 불가능하거나 모순이 없는지 반드시 확인해야 해.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Student Message */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                          <p className="text-white text-xs leading-relaxed">
                            엥 그러네 ㄱㅅ
                          </p>
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-medium">나</span>
                        </div>
                      </div>
                      
                      {/* Student Follow-up Question */}
                      <div className="flex items-start gap-2 justify-end">
                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-[80%]">
                          <p className="text-white text-xs leading-relaxed">
                            아니근데 왜 0이면 안되는거야? 아무도 안알려주던데;;;
                          </p>
                        </div>
                        <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px] font-medium">나</span>
                        </div>
                      </div>
                      
                      {/* AI Detailed Explanation */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[85%]">
                          <p className="text-gray-100 text-xs leading-relaxed mb-2">
                            좋은 질문이야! 이유를 차근차근 설명해줄게:
                          </p>
                          <div className="bg-gray-900/50 rounded-lg px-2 py-1.5 mb-2">
                            <p className="text-gray-300 text-[10px] leading-relaxed font-mono">
                              등비수열: a, ar, ar², ar³, ...<br/>
                              만약 r = 0이면: a, 0, 0, 0, ...
                            </p>
                          </div>
                          <p className="text-gray-300 text-[10px] leading-relaxed mb-1">
                            📌 r = 0이면 첫 항 빼고 모두 0이 돼서 더 이상 '등비'수열이 아니야!
                          </p>
                          <p className="text-gray-300 text-[10px] leading-relaxed">
                            📌 나눗셈할 때도 0으로 나누면 정의가 안 되니까 항상 조심해야 해. 이런 예외 케이스를 놓치면 수능에서 틀려!
                          </p>
                        </div>
                      </div>
                      
                      {/* AI Encouragement Message */}
                      <div className="flex items-start gap-2">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                          <Brain className="h-3.5 w-3.5 text-white" />
                        </div>
                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-[80%]">
                          <p className="text-gray-100 text-xs leading-relaxed">
                            이제 이해했지? 그럼 r ≠ 0 조건 넣어서 다시 한번 풀어볼까? 🔥
                          </p>
                        </div>
                      </div>
                      
                      {/* Thinking Indicator */}
                      <div className="flex items-center gap-2 justify-end">
                        <div className="bg-gray-700 rounded-full px-3 py-1">
                          <div className="flex gap-1">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Input Area */}
                    <div className="bg-gray-950 px-3 py-3 border-t border-gray-800">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-800 rounded-full px-4 py-2 flex items-center">
                          <span className="text-gray-500 text-xs">메시지를 입력하세요...</span>
                        </div>
                        <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <ArrowRight className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    )
}