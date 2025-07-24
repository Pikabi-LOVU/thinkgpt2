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
                <span className="text-gray-300">말하며 생각하는 AI</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">대화로 깊어지는 사고력</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-3xl mx-auto break-keep px-2">
                생각톡은 답을 주지 않습니다. 대신 <span className="text-amber-400 font-semibold">음성 대화</span>를 통해 아이가 말로 생각을 표현하고
                스스로 답을 찾아가도록 돕습니다.
              </p>
            </div>

            <div className="max-w-6xl mx-auto break-keep">
              <div className="grid md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto break-keep mb-3 md:mb-4 shadow-lg shadow-blue-500/20">
                      <MessageSquare className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center text-lg md:text-xl">음성 대화 학습</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4">
                    <p className="text-gray-300 text-sm md:text-base">답을 바로 주지 않고 음성 대화로 사고 과정을 자연스럽게 이끌어냅니다.</p>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto break-keep mb-3 md:mb-4 shadow-lg shadow-purple-500/20">
                      <Eye className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center text-lg md:text-xl">대화 기록 공개</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4">
                    <p className="text-gray-300 text-sm md:text-base">
                      모든 음성 대화 내용을 텍스트로 변환해 학부모님이 확인할 수 있습니다.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <CardHeader>
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto break-keep mb-3 md:mb-4 shadow-lg shadow-amber-500/20">
                      <TrendingUp className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <CardTitle className="text-white text-center text-lg md:text-xl">말하기 실력 향상</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-4">
                    <p className="text-gray-300 text-sm md:text-base">
                      아이의 언어 표현력에 맞춰 대화 수준을 조절하며 말하기 실력을 키웁니다.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-gray-700 shadow-2xl max-w-4xl mx-auto break-keep mb-8 md:mb-12">
                <div className="text-center mb-6">
                  <HelpCircle className="h-10 w-10 md:h-12 md:w-12 text-blue-400 mx-auto break-keep mb-3 md:mb-4 animate-pulse" />
                  <h3 className="text-xl md:text-2xl font-bold text-white" data-track-id="ai-importance" data-section="AI Era Importance">AI 시대, 왜 말하는 능력이 중요한가?</h3>
                </div>
                <div>
                  <h4 className="font-semibold text-red-400 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                    <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                    현재 위기 상황
                  </h4>
                  <ul className="space-y-2 text-red-300 text-sm md:text-base">
                    <li className="break-keep flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      타이핑만 하는 시대, 아이들은 말로 표현하는 능력을 잃고 있습니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      텍스트 답변에 의존하며 대화를 통한 깊은 이해를 놓치고 있습니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      발표력과 의사소통 능력이 급격히 약화되고 있습니다
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
                      말로 AI와 소통하는 능력이 핵심 경쟁력이 됩니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      명확한 언어 표현력과 설득력이 더욱 중요해집니다
                    </li>
                    <li className="break-keep flex items-start">
                      <span className="text-emerald-500 mr-2">•</span>
                      대화를 통해 학습하고 협업하는 능력이 필수가 됩니다
                    </li>
                  </ul>
                </div>
                <div className="mt-6 md:mt-8 text-center bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-xl p-4 md:p-6 border border-blue-800/30">
                  <p className="text-lg md:text-xl text-gray-200 font-medium">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-bold">'말하는 힘'</span>이 교육의 본질이 됩니다
                  </p>
                  <p className="text-gray-400 mt-2 text-sm md:text-base">
                    <span className="inline-flex items-center gap-1">
                      <span className="inline-flex items-center justify-center w-4 h-4 bg-gradient-to-br from-blue-600 to-blue-700 rounded shadow-sm">
                        <Brain className="h-2.5 w-2.5 text-white" />
                      </span>
                      <span>생각톡</span>
                    </span>은 AI와의 음성 대화를 통해 아이의 표현력과 사고력을 함께 기르는 새로운 교육 방식을 제시합니다
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-700">
                <h3 className="text-xl md:text-2xl font-bold text-center text-white mb-6 md:mb-8 flex items-center justify-center gap-2" data-track-id="danger-signals" data-section="Danger Signals">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
                    <Brain className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <span>생각톡만의 혁신적 차별점</span>
                </h3>
                <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                  <div className="bg-red-950/30 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-red-800/30">
                    <h4 className="font-semibold text-red-400 mb-3 md:mb-4 flex items-center text-base md:text-lg">
                      <span className="w-6 h-6 md:w-8 md:h-8 bg-red-900/50 rounded-full flex items-center justify-center mr-2 md:mr-3 text-red-400 font-bold text-sm md:text-base">
                        X
                      </span>
                      일반 AI (ChatGPT, Claude 등)
                    </h4>
                    <ul className="space-y-3 text-red-300 text-sm md:text-base">
                      <li className="space-y-1">
                        <div className="bg-gray-700/50 rounded-lg px-3 py-1.5 relative inline-block">
                          <span className="text-gray-200 text-xs md:text-sm">학생: "이 문제 답 알려줘" (타이핑)</span>
                          <div className="absolute -bottom-1.5 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-700/50"></div>
                        </div>
                        <div className="text-red-200 text-xs md:text-sm pl-2">
                          <span className="text-red-400">↳</span> AI가 텍스트로 답안을 바로 제공
                        </div>
                      </li>
                      <li className="space-y-1">
                        <div className="bg-gray-700/50 rounded-lg px-3 py-1.5 relative inline-block">
                          <span className="text-gray-200 text-xs md:text-sm">학생: "숙제 대신 해줘" (타이핑)</span>
                          <div className="absolute -bottom-1.5 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-gray-700/50"></div>
                        </div>
                        <div className="text-red-200 text-xs md:text-sm pl-2">
                          <span className="text-red-400">↳</span> AI가 완성된 답을 텍스트로 제공
                        </div>
                      </li>
                      <li className="mt-3 bg-red-900/20 rounded-lg px-3 py-2 border border-red-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <X className="h-4 w-4 text-red-400" />
                          <span className="text-red-200 font-semibold text-sm">말하기 연습 기회 없음</span>
                        </div>
                      </li>
                      <li className="bg-red-900/20 rounded-lg px-3 py-2 border border-red-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-400" />
                          <span className="text-red-200 font-semibold text-sm">대화 능력 저하</span>
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
                        <span>생각톡</span>
                      </div>
                    </h4>
                    <ul className="space-y-3 text-emerald-300 text-sm md:text-base">
                      <li className="space-y-1">
                        <div className="flex justify-end">
                          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg px-3 py-1.5 relative inline-block">
                            <span className="text-blue-200 text-xs md:text-sm flex items-center gap-1">
                              <Brain className="h-3 w-3" />
                              AI: "이 문제를 네 말로 설명해볼래?" (음성)
                            </span>
                            <div className="absolute -bottom-1.5 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600/20"></div>
                          </div>
                        </div>
                        <div className="text-emerald-200 text-xs md:text-sm text-right pr-2">
                          <span className="text-emerald-400">↳</span> 학생이 말로 설명하며 이해도 확인
                        </div>
                      </li>
                      <li className="space-y-1">
                        <div className="flex justify-end">
                          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg px-3 py-1.5 relative inline-block">
                            <span className="text-blue-200 text-xs md:text-sm flex items-center gap-1">
                              <Brain className="h-3 w-3" />
                              AI: "왜 그렇게 생각했는지 말해줄래?" (음성)
                            </span>
                            <div className="absolute -bottom-1.5 right-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-600/20"></div>
                          </div>
                        </div>
                        <div className="text-emerald-200 text-xs md:text-sm text-right pr-2">
                          <span className="text-emerald-400">↳</span> 논리적 말하기 능력 개발
                        </div>
                      </li>
                      <li className="mt-3 bg-emerald-900/20 rounded-lg px-3 py-2 border border-emerald-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <Eye className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-200 font-semibold text-sm">음성 대화 내용 학부모 확인 가능</span>
                        </div>
                      </li>
                      <li className="bg-emerald-900/20 rounded-lg px-3 py-2 border border-emerald-700/30">
                        <div className="flex items-center justify-center gap-2">
                          <Brain className="h-4 w-4 text-emerald-400" />
                          <span className="text-emerald-200 font-semibold text-sm">말하기 중심 학습</span>
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