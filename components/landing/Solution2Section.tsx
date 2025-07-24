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

export const Solution2Section = () => {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
          <div className="container mx-auto break-keep px-4 relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <Lightbulb className="h-12 w-12 md:h-16 md:w-16 text-amber-400 mx-auto break-keep mb-3 md:mb-4 animate-pulse" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4" data-track-id="chat-gpt-problems" data-section="ChatGPT Problems">
                <span className="text-gray-300">질문으로 답하는 AI</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">스스로 생각하게 만드는 학습</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto break-keep px-2">
                ThinkGPT는 답을 주지 않습니다. 대신 <span className="text-amber-400 font-semibold">올바른 질문</span>을 통해 아이가 스스로 답을 찾아가도록
                돕습니다.
              </p>
            </div>

            <div className="max-w-6xl mx-auto break-keep">
              <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto break-keep mb-3 md:mb-4 shadow-lg shadow-blue-500/20">
                      <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center text-lg md:text-xl">질문 중심 학습</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4">
                    <p className="text-gray-300 text-sm md:text-base">답을 바로 주지 않고 단계별 질문으로 사고 과정을 유도합니다.</p>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto break-keep mb-3 md:mb-4 shadow-lg shadow-purple-500/20">
                      <Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center text-lg md:text-xl">투명한 학습 과정</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4">
                    <p className="text-gray-300 text-sm md:text-base">
                      모든 대화와 학습 과정을 학부모님이 실시간으로 확인할 수 있습니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto break-keep mb-3 md:mb-4 shadow-lg shadow-amber-500/20">
                      <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center text-lg md:text-xl">단계적 성장</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4">
                    <p className="text-gray-300 text-sm md:text-base">
                      아이의 수준에 맞춰 점진적으로 난이도를 높여가며 실력을 키웁니다.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl max-w-4xl mx-auto break-keep mb-8 md:mb-12">
                <div className="text-center mb-6">
                  <HelpCircle className="h-10 w-10 md:h-12 md:w-12 text-blue-400 mx-auto break-keep mb-3 md:mb-4 animate-pulse" />
                  <h3 className="text-xl md:text-2xl font-bold text-white" data-track-id="ai-importance" data-section="AI Era Importance">AI 시대, 왜 생각하는 힘이 중요한가?</h3>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                    <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    현재 위기 상황
                  </h4>
                  <ul className="space-y-2 text-red-300 text-sm md:text-base">
                    <li className="break-keep flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      AI가 글을 써주는 시대, 아이들은 생각할 기회를 잃고 있습니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      즉답에 의존하며 문제 해결 과정을 건너뛰고 있습니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      창의적 사고력과 논리적 추론 능력이 약화되고 있습니다
                    </li>
                  </ul>
                </div>
                <div className="mt-6 md:mt-8">
                  <h4 className="font-semibold text-emerald-400 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                    <Zap className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    미래 경쟁력
                  </h4>
                  <ul className="space-y-2 text-emerald-300 text-sm md:text-base">
                    <li className="break-keep flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      AI와 협업하는 능력이 핵심 경쟁력이 됩니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      비판적 사고와 창의성이 더욱 중요해집니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      스스로 학습하고 성장하는 능력이 필수가 됩니다
                    </li>
                  </ul>
                </div>
                <div className="mt-6 md:mt-8 text-center bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-4 md:p-6 border border-blue-800/30">
                  <p className="text-lg md:text-xl text-gray-200 font-medium">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">'생각하는 힘'</span>이 교육의 본질이 됩니다
                  </p>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded shadow-sm">
                        <Brain className="h-2.5 w-2.5 text-white" />
                      </span>
                      <span>ThinkGPT</span>
                    </span>는 AI를 도구로 활용하면서도 아이의 사고력을 기르는 새로운 교육 방식을 제시합니다
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6 md:mb-8 flex items-center justify-center gap-2" data-track-id="danger-signals" data-section="Danger Signals">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                    <Brain className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <span>ThinkGPT만의 혁신적 차별점</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-red-950/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-red-800/30">
                    <h4 className="font-semibold text-red-400 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                      <span className="w-6 h-6 md:w-8 md:h-8 bg-red-900/50 rounded-full flex items-center justify-center mr-2 md:mr-3 text-red-400 font-bold text-sm md:text-base">
                        X
                      </span>
                      일반 AI (ChatGPT 등)
                    </h4>
                    <ul className="space-y-3 text-red-300 text-sm md:text-base">
                      <li className="space-y-1">
                        <div className="bg-gray-700/50 rounded-lg px-3 py-1.5 relative inline-block">
                          <span className="text-gray-200 text-xs md:text-sm">학생: "수학 문제 풀어줘"</span>
                          <div className="absolute -bottom-1.5 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-700/50"></div>
                        </div>
                        <div className="text-red-200 text-xs md:text-sm pl-2">
                          <span className="text-red-400">↳</span> AI가 완전한 답안을 바로 제공
                        </div>
                      </li>
                      <li className="space-y-1">
                        <div className="bg-gray-700/50 rounded-lg px-3 py-1.5 relative inline-block">
                          <span className="text-gray-200 text-xs md:text-sm">학생: "글 써줘"</span>
                          <div className="absolute -bottom-1.5 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-700/50"></div>
                        </div>
                        <div className="text-red-200 text-xs md:text-sm pl-2">
                          <span className="text-red-400">↳</span> AI가 완성된 글을 즉시 생성
                        </div>
                      </li>
                      <li className="mt-3 bg-red-900/20 rounded-lg px-3 py-2 border border-red-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <X className="h-4 w-4 text-red-400" />
                          <span className="text-red-200 font-semibold text-sm">학습 과정 불투명</span>
                        </div>
                      </li>
                      <li className="bg-red-900/20 rounded-lg px-3 py-2 border border-red-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-red-200 font-semibold text-sm">사고 과정 생략</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-emerald-950/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-emerald-800/30">
                    <h4 className="font-semibold text-emerald-400 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                      <span className="w-6 h-6 md:w-8 md:h-8 bg-emerald-900/50 rounded-full flex items-center justify-center mr-2 md:mr-3 text-emerald-400 font-bold text-sm md:text-base">
                        ✓
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 md:w-6 md:h-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md">
                          <Brain className="h-3 w-3 md:h-4 md:w-4 text-white" />
                        </div>
                        <span>ThinkGPT</span>
                      </div>
                    </h4>
                    <ul className="space-y-3 text-emerald-300 text-sm md:text-base">
                      <li className="space-y-1">
                        <div className="flex justify-end">
                          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg px-3 py-1.5 relative inline-block">
                            <span className="text-blue-200 text-xs md:text-sm flex items-center gap-1">
                              <Brain className="h-3 w-3" />
                              AI: "이 문제에서 핵심은 뭘까?"
                            </span>
                            <div className="absolute -bottom-1.5 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600/20"></div>
                          </div>
                        </div>
                        <div className="text-emerald-200 text-xs md:text-sm text-right pr-2">
                          <span className="text-emerald-400">↳</span> 학생이 스스로 답을 찾도록 안내
                        </div>
                      </li>
                      <li className="space-y-1">
                        <div className="flex justify-end">
                          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg px-3 py-1.5 relative inline-block">
                            <span className="text-blue-200 text-xs md:text-sm flex items-center gap-1">
                              <Brain className="h-3 w-3" />
                              AI: "어떤 관점에서 볼 수 있을까?"
                            </span>
                            <div className="absolute -bottom-1.5 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600/20"></div>
                          </div>
                        </div>
                        <div className="text-emerald-200 text-xs md:text-sm text-right pr-2">
                          <span className="text-emerald-400">↳</span> 다각도 사고력 개발
                        </div>
                      </li>
                      <li className="mt-3 bg-emerald-900/20 rounded-lg px-3 py-2 border border-emerald-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-200 font-semibold text-sm">모든 대화 학부모 공개</span>
                        </div>
                      </li>
                      <li className="bg-emerald-900/20 rounded-lg px-3 py-2 border border-emerald-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <Brain className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-200 font-semibold text-sm">사고 과정 중심 학습</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    )
}