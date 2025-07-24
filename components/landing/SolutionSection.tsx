


export const SolutionSection = () => {
    return (
        <div className="relative bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 py-16 md:py-24">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-transparent to-indigo-950/20"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/10 via-transparent to-cyan-900/10 animate-gradient"></div>
            
            <div className="container mx-auto px-4 relative z-10 mb-[150px]">
              <div className="text-center max-w-5xl mx-auto">
                {/* 서울대 출신 전문가 강조 - 대형 로고 */}
                <div className="mb-8 md:mb-12">
                  <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/30 to-cyan-400/30 rounded-full blur-xl"></div>
                    <img 
                      src="/snu_white.png" 
                      alt="서울대학교" 
                      className="relative h-24 md:h-32 w-auto mx-auto mb-4"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-blue-200 text-2xl md:text-3xl font-bold">서울대 출신 전문가 팀 개발</p>
                  </div>
                </div>

                {/* 메인 타이틀 */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 md:mb-8 leading-tight tracking-tight" data-track-id="hero-title" data-section="Hero Title">
                  <span className="block text-gray-400 mb-1 md:mb-2 text-3xl sm:text-4xl md:text-5xl font-light">생각하게 만드는</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black">
                    ThinkGPT
                  </span>
                </h1>
                
                
                {/* 글로벌 연구 데이터 - 벤다이어그램 스타일 */}
                <div className="mb-6 md:mb-8 max-w-2xl mx-auto mt-12">
                  <div className="relative h-40 md:h-48">
                    
                    {/* 3,847만 명 - 왼쪽 위 */}
                    <div className="absolute left-1/4 top-1/4 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-purple-600/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-purple-950/80 to-purple-900/80 border border-purple-600/30 rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                          <span className="text-lg mb-1">👥</span>
                          <div className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                            3,847만
                          </div>
                          <p className="text-purple-300/80 text-[10px] md:text-xs">학생 연구</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 70개국 - 오른쪽 위 */}
                    <div className="absolute right-1/4 top-1/4 translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-blue-950/80 to-blue-900/80 border border-blue-600/30 rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                          <span className="text-lg mb-1">🌍</span>
                          <div className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                            70개국+
                          </div>
                          <p className="text-blue-300/80 text-[10px] md:text-xs">글로벌 연구</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 70억 개 - 하단 중앙 */}
                    <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/4 z-20">
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-600/20 rounded-full blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-emerald-950/80 to-emerald-900/80 border border-emerald-600/30 rounded-full w-28 h-28 md:w-32 md:h-32 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                          <span className="text-lg mb-1">📊</span>
                          <div className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
                            70억 개
                          </div>
                          <p className="text-emerald-300/80 text-[10px] md:text-xs">빅데이터</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* 연결선 효과 */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                      <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" style={{ stopColor: 'rgb(168, 85, 247)', stopOpacity: 0.3 }} />
                          <stop offset="50%" style={{ stopColor: 'rgb(59, 130, 246)', stopOpacity: 0.3 }} />
                          <stop offset="100%" style={{ stopColor: 'rgb(16, 185, 129)', stopOpacity: 0.3 }} />
                        </linearGradient>
                      </defs>
                      <circle cx="50%" cy="50%" r="35%" fill="url(#grad1)" opacity="0.1" />
                    </svg>
                  </div>
                  
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 text-base md:text-lg font-semibold mt-16 text-center">
                    서울대 전문가 팀이<br />10년간의 교육 노하우를 녹여냈습니다
                  </p>
                </div>
                
                {/* 신뢰 지표 */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl border border-white/10 p-6 md:p-8 max-w-4xl mx-auto">
                  <div className="grid grid-cols-3 gap-4 md:gap-8">
                    <div className="text-center group">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                        95%
                      </div>
                      <div className="text-gray-300 font-medium text-xs sm:text-sm md:text-base">학습 효과</div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">3개월 기준</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                        1,200+
                      </div>
                      <div className="text-gray-300 font-medium text-xs sm:text-sm md:text-base">학부모님</div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">만족 사용</div>
                    </div>
                    <div className="text-center group">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400 mb-1 md:mb-2 group-hover:scale-110 transition-transform">
                        4.9★
                      </div>
                      <div className="text-gray-300 font-medium text-xs sm:text-sm md:text-base">평균 만족도</div>
                      <div className="text-[10px] sm:text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">실제 평가</div>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
    )
}