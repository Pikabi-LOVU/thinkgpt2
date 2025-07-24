import { Sparkles, MessageCircle, Brain } from "lucide-react"
import Image from "next/image"

export const IBSection = () => {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* 메인 타이틀 */}
                    <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-6 md:mb-8 leading-tight px-4">
                        <span className="text-gray-300 block sm:inline">서울대 교육 전문가가</span>
                        <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 block sm:inline mt-1 sm:mt-0">
                            IB 철학으로 만든 AI
                        </span>
                    </h2>
                    
                    {/* IB PYP 설명 */}
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-8 md:mb-12 max-w-3xl mx-auto border border-gray-700/50 mx-4 sm:mx-auto">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                            <Image 
                                src="/ib-pyp.png"
                                alt="IB PYP"
                                width={120}
                                height={50}
                                className="h-10 sm:h-12 w-auto opacity-90"
                            />
                            <div className="hidden sm:block h-12 w-px bg-gray-600"></div>
                            <div className="text-center sm:text-left">
                                <p className="text-xs sm:text-sm font-bold text-blue-400">IB PYP (Primary Years Programme)</p>
                                <p className="text-[10px] sm:text-xs text-gray-400">국제 바칼로레아 초등 교육 프로그램</p>
                            </div>
                        </div>
                        
                        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed mb-3 sm:mb-4">
                            <span className="font-bold text-white">서울대 교육 전문가팀</span>이 전 세계 110개국 5,700개 명문 학교가 채택한 
                            <span className="text-blue-400 font-semibold"> IB PYP의 핵심 교육 철학</span>을 바탕으로 
                            <span className="font-bold text-white">생각톡</span>을 만들었습니다.
                        </p>
                        
                        <p className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed">
                            단순히 정답을 알려주는 것이 아닌, <span className="text-yellow-400">끊임없는 질문</span>을 통해 
                            아이 스스로 <span className="text-yellow-400">비판적 사고력(Critical Thinking)</span>을 
                            기를 수 있도록 돕습니다.
                        </p>
                    </div>
                    
                    {/* IB 학습자 프로필 */}
                    <div className="mb-6 md:mb-8 px-4 sm:px-0">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-300 mb-4 sm:mb-6">
                            IB가 추구하는 <span className="text-blue-400">이상적인 학습자상</span>
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-3xl mx-auto">
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                                <div className="text-center">
                                    <Brain className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 text-blue-400" />
                                    <h4 className="font-bold text-white text-base sm:text-lg mb-2">Thinkers</h4>
                                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">비판적이고 창의적으로 생각하며,<br/>복잡한 문제를 해결하는 사람</p>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                                <div className="text-center">
                                    <MessageCircle className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 text-cyan-400" />
                                    <h4 className="font-bold text-white text-base sm:text-lg mb-2">Communicators</h4>
                                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">자신감 있게 의견을 표현하고,<br/>타인과 효과적으로 소통하는 사람</p>
                                </div>
                            </div>
                            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-700">
                                <div className="text-center">
                                    <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 text-yellow-400" />
                                    <h4 className="font-bold text-white text-base sm:text-lg mb-2">Inquirers</h4>
                                    <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">호기심을 가지고 끊임없이 탐구하며,<br/>평생 학습하는 사람</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* 강조 문구 */}
                    <div className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-800/30 max-w-2xl mx-auto mx-4 sm:mx-auto">
                        <p className="text-base sm:text-lg md:text-xl text-gray-200 font-medium">
                            <span className="text-blue-400 font-bold">"How do you know?"</span>
                        </p>
                        <p className="text-xs sm:text-sm md:text-base text-gray-400 mt-2 leading-relaxed">
                            IB의 핵심 질문을 통해 아이는 단순 암기가 아닌<br className="hidden sm:block" />
                            <span className="sm:hidden">진짜 이해와 사고력을 기르게 됩니다</span>
                            <span className="hidden sm:inline">진짜 이해와 사고력을 기르게 됩니다</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}