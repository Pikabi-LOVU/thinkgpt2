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

export const ReviewSection = () => {
    return (
        <div className="absolute bottom-0 left-0 right-0 pb-6 md:pb-12 pt-32 md:pt-48 bg-gray-900">
            <div className="relative">
              {/* 자동 애니메이션과 수동 스크롤 모두 지원 */}
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex animate-scroll-left scrollbar-hide" style={{ width: 'max-content' }}>
                {/* 첫 번째 세트 */}
                <div className="flex gap-4 md:gap-6 px-3">
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">김○○ 학부모 • 초5 • 3개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "아이가 이제 GPT에 의존하지 않고 스스로 생각해서 글을 써요. 학습 과정도 다 볼 수 있어서 안심이 됩니다."
                    </p>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-emerald-400 font-bold inline-block">
                      📈 국어 성적 15점 향상
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">이○○ 학부모 • 중2 • 6개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "단계별로 질문해주니까 아이가 논리적으로 생각하는 습관이 생겼어요. 성적도 많이 올랐습니다!"
                    </p>
                    <div className="bg-violet-500/20 border border-violet-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-violet-400 font-bold inline-block">
                      🏆 수학 성적 상위 10% 진입
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">박○○ 학부모 • 고1 • 4개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "정보의 정확성도 확인해주고, 아이가 어떻게 공부하는지 리포트로 받아볼 수 있어서 좋아요."
                    </p>
                    <div className="bg-rose-500/20 border border-rose-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-rose-400 font-bold inline-block">
                      💯 학습 만족도 98%
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">최○○ 학부모 • 중1 • 5개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "아이가 질문을 통해 스스로 답을 찾아가는 과정이 정말 인상적이에요. 사고력이 눈에 띄게 향상됐습니다."
                    </p>
                    <div className="bg-cyan-500/20 border border-cyan-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-cyan-400 font-bold inline-block">
                      🧠 비판적 사고력 향상
                    </div>
                  </div>
                </div>
                
                {/* 두 번째 세트 (무한 스크롤을 위한 복제) */}
                <div className="flex gap-4 md:gap-6 px-3">
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">김○○ 학부모 • 초5 • 3개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "아이가 이제 GPT에 의존하지 않고 스스로 생각해서 글을 써요. 학습 과정도 다 볼 수 있어서 안심이 됩니다."
                    </p>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-emerald-400 font-bold inline-block">
                      📈 국어 성적 15점 향상
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">이○○ 학부모 • 중2 • 6개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "단계별로 질문해주니까 아이가 논리적으로 생각하는 습관이 생겼어요. 성적도 많이 올랐습니다!"
                    </p>
                    <div className="bg-violet-500/20 border border-violet-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-violet-400 font-bold inline-block">
                      🏆 수학 성적 상위 10% 진입
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">박○○ 학부모 • 고1 • 4개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "정보의 정확성도 확인해주고, 아이가 어떻게 공부하는지 리포트로 받아볼 수 있어서 좋아요."
                    </p>
                    <div className="bg-rose-500/20 border border-rose-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-rose-400 font-bold inline-block">
                      💯 학습 만족도 98%
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">최○○ 학부모 • 중1 • 5개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "아이가 질문을 통해 스스로 답을 찾아가는 과정이 정말 인상적이에요. 사고력이 눈에 띄게 향상됐습니다."
                    </p>
                    <div className="bg-cyan-500/20 border border-cyan-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-cyan-400 font-bold inline-block">
                      🧠 비판적 사고력 향상
                    </div>
                  </div>
                </div>
                
                {/* 두 번째 세트 (무한 스크롤용) */}
                <div className="flex gap-4 md:gap-6 px-3">
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">김○○ 학부모 • 초5 • 3개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "아이가 이제 GPT에 의존하지 않고 스스로 생각해서 글을 써요. 학습 과정도 다 볼 수 있어서 안심이 됩니다."
                    </p>
                    <div className="bg-emerald-500/20 border border-emerald-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-emerald-400 font-bold inline-block">
                      📈 국어 성적 15점 향상
                    </div>
                  </div>
                  
                  <div className="w-80 md:w-96 flex-shrink-0 bg-white/10 backdrop-blur-xl rounded-xl p-5 md:p-6 border-2 border-white/20 md:hover:bg-white/15 transition-all duration-300 shadow-xl select-none">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 md:h-5 md:w-5 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-white text-base md:text-lg mb-3 font-bold">이○○ 학부모 • 중2 • 6개월</p>
                    <p className="text-gray-200 text-base md:text-lg mb-4 leading-relaxed">
                      "단계별로 질문해주니까 아이가 논리적으로 생각하는 습관이 생겼어요. 성적도 많이 올랐습니다!"
                    </p>
                    <div className="bg-violet-500/20 border border-violet-500/30 px-3 md:px-4 py-1.5 md:py-2 rounded-lg text-sm md:text-base text-violet-400 font-bold inline-block">
                      🏆 수학 성적 상위 10% 진입
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>
          </div>
    )
}