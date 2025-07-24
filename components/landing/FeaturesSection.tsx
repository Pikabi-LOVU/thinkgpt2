export const FeaturesSection = () => {
    return (
        <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center">
                    {/* 섹션 타이틀 */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 md:mb-8">
                        <span className="text-gray-800">생각톡의</span>{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                            4가지 핵심 기능
                        </span>
                    </h2>
                    
                    {/* 4가지 핵심 기능 */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl mb-3">💬</div>
                                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2">텍스트 & 음성 대화</h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">텍스트로 편리하게, 음성으로 자연스럽게 대화</p>
                                <p className="text-[11px] md:text-xs text-gray-500 mt-1">텍스트 입력 + 음성 인식 모두 지원</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl mb-3">🌏</div>
                                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2">이야기 토픽</h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">흥미로운 주제로 시작하는 탐구 여행</p>
                                <p className="text-[11px] md:text-xs text-gray-500 mt-1">삼국지, 우주, 환경 등 20+ 토픽</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl mb-3">🌐</div>
                                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2">영어 대화 모드</h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">영어로 생각하고 질문하는 글로벌 역량</p>
                                <p className="text-[11px] md:text-xs text-gray-500 mt-1">Cambridge A1-A2 레벨 지원</p>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl mb-3">📊</div>
                                <h3 className="font-bold text-gray-800 text-sm md:text-base mb-2">질문 평가</h3>
                                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">질문의 깊이를 분석하고 피드백 제공</p>
                                <p className="text-[11px] md:text-xs text-gray-500 mt-1">메타인지 기반 사고력 향상</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}