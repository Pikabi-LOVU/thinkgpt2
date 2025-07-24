import { Brain, Mic, Volume2, MessageSquare } from "lucide-react"
import Image from "next/image"

export const ConversationSection = () => {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-gray-950 to-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    {/* 섹션 타이틀 */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 md:mb-4">
                            <span className="text-gray-300">실제로</span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                이렇게 대화해요
                            </span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-400">
                            텍스트와 음성, 아이가 편한 방식으로
                        </p>
                    </div>

                    {/* 대화 예시 - 모바일 친화적 */}
                    <div className="max-w-2xl mx-auto">
                        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-800 shadow-xl">
                            {/* 헤더 */}
                            <div className="flex items-center justify-center gap-2 mb-6 pb-4 border-b border-gray-800">
                                <Image 
                                    src="/think-talk_logo.png" 
                                    alt="생각톡" 
                                    width={100} 
                                    height={30} 
                                    className="h-8 w-auto"
                                />
                                <span className="text-gray-400 text-sm">과 대화 중...</span>
                            </div>

                            {/* 대화 내용 */}
                            <div className="space-y-4 sm:space-y-6">
                                {/* AI 질문 */}
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 sm:p-4 shadow-md">
                                            <p className="text-gray-100 text-sm sm:text-base">
                                                "지구온난화에 대해 어떻게 생각해?"
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="h-3 w-3" />
                                                    <span className="text-[10px] sm:text-xs">텍스트</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Volume2 className="h-3 w-3" />
                                                    <span className="text-[10px] sm:text-xs">음성</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 학생 답변 */}
                                <div className="flex items-start gap-3 justify-end">
                                    <div className="flex-1 max-w-[80%]">
                                        <div className="bg-blue-600 rounded-2xl rounded-tr-sm p-3 sm:p-4 shadow-md">
                                            <p className="text-white text-sm sm:text-base">
                                                "자동차 때문인 것 같아요"
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 text-blue-200 justify-end">
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="h-3 w-3" />
                                                    <span className="text-[10px] sm:text-xs">타이핑 가능</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                                        <span className="text-white text-xs sm:text-sm font-medium">나</span>
                                    </div>
                                </div>

                                {/* AI 추가 질문 */}
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                                        <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="bg-gray-800 rounded-2xl rounded-tl-sm p-3 sm:p-4 shadow-md">
                                            <p className="text-gray-100 text-sm sm:text-base">
                                                "좋은 관찰이야! 그럼 자동차 말고 다른 원인도 있을까? 🤔"
                                            </p>
                                            <div className="flex items-center gap-2 mt-2 text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="h-3 w-3" />
                                                    <span className="text-[10px] sm:text-xs">텍스트</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Volume2 className="h-3 w-3" />
                                                    <span className="text-[10px] sm:text-xs">음성</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 생각 중 표시 */}
                                <div className="flex items-center gap-3 justify-end">
                                    <div className="bg-gray-700 rounded-full px-4 py-2">
                                        <div className="flex gap-1 items-center">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                            <span className="text-gray-400 text-xs ml-2">생각 중...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* 하단 설명 */}
                            <div className="mt-6 pt-4 border-t border-gray-800">
                                <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-lg p-3 sm:p-4">
                                    <p className="text-xs sm:text-sm text-gray-300 text-center">
                                        <span className="text-blue-400 font-semibold">텍스트와 음성</span>을 자유롭게 선택하며
                                        아이는 편한 방식으로 <span className="text-yellow-400">생각을 확장</span>하고 
                                        <span className="text-yellow-400">표현력을 기릅니다</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}