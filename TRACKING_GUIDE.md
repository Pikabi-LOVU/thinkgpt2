# 📊 ThinkGPT 트래킹 가이드

이 문서는 ThinkGPT 랜딩 페이지의 Mixpanel 및 Facebook Pixel 이벤트 추적 구현을 정리한 가이드입니다.

## 목차
- [퍼널 개요](#퍼널-개요)
- [Facebook Pixel 이벤트](#facebook-pixel-이벤트)
  - [f=trial (2주 체험)](#facebook-pixel---ftrial-2주-체험)
  - [f=consult (무료 상담)](#facebook-pixel---fconsult-무료-상담)
- [Mixpanel 이벤트](#mixpanel-이벤트)
  - [f=trial (2주 체험)](#mixpanel---ftrial-2주-체험)
  - [f=consult (무료 상담)](#mixpanel---fconsult-무료-상담)
  - [랜딩 페이지 이벤트](#mixpanel---랜딩-페이지-이벤트)
  - [공통 이벤트](#mixpanel---공통-이벤트)
- [공통 파라미터 값](#공통-파라미터-값)
- [보안 및 활용 방안](#보안-및-활용-방안)

---

## 🎯 퍼널 개요

### f=trial (2주 체험)
- 2주 무료 체험 신청 (결제 정보 포함)
- 체험 후 자동 결제 전환
- 월간/연간 플랜 선택 가능

### f=consult (무료 상담)
- 구매 전 무료 상담 신청
- 상담사가 1-2일 내 연락
- 제품 설명 및 맞춤 플랜 추천

---

## 🔵 Facebook Pixel 이벤트

### Facebook Pixel - f=trial (2주 체험)

#### 이벤트 플로우
```
ViewContent → InitiateCheckout → AddToCart → StartTrial → CompleteRegistration
```

#### 1. ViewContent
**발생 시점**: 랜딩 페이지 로드
```json
{
  "content_name": "ThinkGPT AI 교육 플랫폼",
  "content_category": "Education",
  "funnel": "trial"
}
```

#### 2. InitiateCheckout
**발생 시점**: CTA 버튼 클릭
```json
{
  "value": 0,
  "currency": "KRW",
  "num_items": 1,
  "content_category": "Education",
  "content_type": "product",
  "content_name": "ThinkGPT 2주 체험",
  "button_location": "fixed_bottom_start",
  "variant": "grade" | "direct_traffic",
  "funnel": "trial"
}
```

#### 3. AddToCart
**발생 시점**: 플랜 선택 시
```json
{
  "value": 29000 | 290000,
  "currency": "KRW",
  "content_name": "ThinkGPT 월간 플랜" | "ThinkGPT 연간 플랜",
  "content_ids": ["monthly_plan"] | ["yearly_plan"],
  "content_type": "product"
}
```

#### 4. StartTrial
**발생 시점**: 체험 폼 제출 성공
```json
{
  "value": 0,
  "currency": "KRW",
  "predicted_ltv": 29000 | 290000,
  "trial_period": "14_days"
}
```

#### 5. CompleteRegistration
**발생 시점**: 체험 등록 완료
```json
{
  "value": 0,
  "predicted_ltv": 29000 | 290000,
  "currency": "KRW",
  "content_name": "ThinkGPT 2주 체험",
  "parent_name": "홍길동",
  "email": "example@email.com",
  "phone": "010-1234-5678",
  "plan": "monthly" | "yearly",
  "payment_method": "toss" | "kakao" | "naver" | "payco" | "card" | "phone",
  "selected_card": "삼성" | "BC" | "KB국민" | ..., // 신용카드 선택 시
  "installment_plan": "일시불" | "2개월 (무이자)" | "3개월 (무이자)" | ..., // 연간+카드 시
  "source": "fixed_bottom_start",
  "variant": "grade" | "direct_traffic",
  "funnel": "trial"
}
```

### Facebook Pixel - f=consult (무료 상담)

#### 이벤트 플로우
```
ViewContent → Lead (CTA) → ConsultFormStart → AddToCart → Lead (제출) + SubmitApplication
```

#### 1. ViewContent
**발생 시점**: 랜딩 페이지 로드
```json
{
  "content_name": "ThinkGPT AI 교육 플랫폼",
  "content_category": "Education",
  "funnel": "consult"
}
```

#### 2. Lead - CTA 클릭
**발생 시점**: CTA 버튼 클릭
```json
{
  "value": 0,
  "currency": "KRW",
  "content_name": "ThinkGPT 무료 상담 CTA 클릭",
  "lead_event_source": "CTA Button",
  "button_location": "fixed_bottom_start",
  "variant": "gangnam" | "direct_traffic",
  "funnel": "consult"
}
```

#### 3. ConsultFormStart
**발생 시점**: 상담 폼 첫 필드 터치
```json
{
  "funnel": "consult",
  "variant": "gangnam" | "direct_traffic",
  "source": "fixed_bottom_start",
  "first_field": "parentName"
}
```

#### 4. AddToCart
**발생 시점**: 플랜 선택 시
```json
{
  "value": 29000 | 290000,
  "currency": "KRW",
  "content_name": "ThinkGPT 월간 플랜" | "ThinkGPT 연간 플랜",
  "content_ids": ["monthly_plan"] | ["yearly_plan"],
  "content_type": "product"
}
```

#### 5. Lead - 폼 제출
**발생 시점**: 상담 폼 제출 성공
```json
{
  "value": 29000 | 290000,
  "currency": "KRW",
  "content_name": "무료 상담 신청 완료",
  "lead_type": "consultation",
  "parent_name": "홍길동",
  "email": "example@email.com",
  "phone": "010-1234-5678",
  "plan": "monthly" | "yearly",
  "source": "fixed_bottom_start",
  "variant": "gangnam" | "direct_traffic",
  "funnel": "consult"
}
```

#### 6. SubmitApplication
**발생 시점**: 상담 신청서 제출
```json
{
  "value": 29000 | 290000,
  "currency": "KRW",
  "content_name": "무료 상담 신청서",
  "application_type": "consultation",
  // 나머지 파라미터는 Lead와 동일
}
```

---

## 🟣 Mixpanel 이벤트

### Mixpanel - f=trial (2주 체험)

#### 1. TrialPageViewed
**발생 시점**: 체험 페이지 로드
```json
{
  "source": "fixed_bottom_start",
  "variant": "grade" | "direct_traffic",
  "has_variant": true,
  "funnel": "trial"
}
```

#### 2. TrialSubmitted
**발생 시점**: 체험 폼 제출

**성공 시**:
```json
{
  "status": "success",
  "parent_name": "홍길동",
  "email": "example@email.com",
  "phone": "010-1234-5678",
  "children_count": 1,
  "child_grades": ["elementary3"],
  "plan_interest": "monthly" | "yearly",
  "payment_method": "toss" | "kakao" | "naver" | "payco" | "card" | "phone",
  "selected_card": "삼성" | "BC" | ..., // 카드 선택 시
  "installment_plan": "일시불" | "2개월 (무이자)" | ..., // 연간+카드 시
  "user_id": "홍길동",
  "source": "fixed_bottom_start",
  "variant": "grade" | "direct_traffic",
  "has_variant": true,
  "funnel": "trial"
}
```

**실패 시**:
```json
{
  "status": "fail",
  "fail_reason": "incomplete_form",
  "parent_name": null | "TOUCHED_EMPTY" | "실제값",
  "email": null | "TOUCHED_EMPTY" | "실제값",
  "phone": null | "TOUCHED_EMPTY" | "실제값",
  "child1_grade": null | "TOUCHED_EMPTY" | "실제값",
  "children_count": 0,
  "source": "fixed_bottom_start",
  "variant": "grade" | "direct_traffic",
  "has_variant": true,
  "funnel": "trial"
}
```

### Mixpanel - f=consult (무료 상담)

#### 1. ConsultPageViewed
**발생 시점**: 상담 페이지 로드
```json
{
  "source": "fixed_bottom_start",
  "variant": "gangnam" | "direct_traffic",
  "has_variant": true,
  "funnel": "consult"
}
```

#### 2. ConsultSubmitted
**발생 시점**: 상담 폼 제출

**성공 시**:
```json
{
  "status": "success",
  "parent_name": "홍길동",
  "email": "example@email.com",
  "phone": "010-1234-5678",
  "children_count": 1,
  "child_grades": ["elementary3"],
  "plan_interest": "monthly" | "yearly",
  "user_id": "홍길동",
  "source": "fixed_bottom_start",
  "variant": "gangnam" | "direct_traffic",
  "has_variant": true,
  "funnel": "consult"
}
```

**실패 시**: TrialSubmitted 실패와 동일한 구조 (funnel: "consult")

### Mixpanel - 랜딩 페이지 이벤트

#### 1. Page View (자동)
**발생 시점**: 모든 페이지 이동
- 믹스패널 자동 추적 기능으로 구현
- 별도 코드 구현 없이 자동으로 수집
```json
{
  "page": "/",
  "url": "https://example.com/?f=trial&v=grade",
  "path": "/",
  "referrer": "https://google.com",
  "timestamp": "2024-07-17T12:00:00.000Z"
}
```

#### 2. Section Viewed (수동)
**발생 시점**: 랜딩 페이지 각 섹션이 50% 이상 화면에 노출될 때
- ScrollTracker 컴포넌트로 구현
- `data-track-id` 속성이 있는 모든 요소 추적

**추적되는 섹션들**:
- `hero-title`: "생각하게 만드는 AI 튜터" (Hero Title)
- `hero-warning`: "답만 주는 AI, 생각 잃는 아이" (Hero Warning)
- `problem-section`: "복붙만 하는 AI 시대" (Problem Introduction)
- `thinking-degradation`: "이대로 방치하면?" (Thinking Degradation)
- `chat-gpt-problems`: "질문으로 답하는 AI" (ChatGPT Problems)
- `ai-importance`: "AI 시대, 왜 생각하는 힘이 중요한가?" (AI Era Importance)
- `danger-signals`: "위험 신호" (Danger Signals)
- `thinkgpt-solution`: "백문이 불여일견" (ThinkGPT Solution)
- `case-1-writing`: "Case 1: 글쓰기" (Case 1 Writing)
- `case-2-problem-solving`: "Case 2: 문제풀이" (Case 2 Problem Solving)
- `pricing-section`: "자녀의 미래" (Pricing Plans)

**이벤트 데이터**:
```json
{
  "section_id": "hero-title",
  "section_name": "Hero Title",
  "page_path": "/",
  "page_url": "https://example.com/?f=trial&v=grade",
  "visibility_threshold": 0.5,
  "element_text": "생각하게 만드는 AI 튜터 ThinkGPT...", // 첫 100자
  "position_percentage": 15, // 페이지 내 위치 (0-100%)
  "variant": "grade",
  "funnel": "trial"
}
```

### Mixpanel - 공통 이벤트

#### 1. identifyUser
**발생 시점**: 폼 제출 성공 시 (모든 퍼널)
```json
{
  "$email": "example@email.com",
  "$name": "홍길동",
  "$phone": "010-1234-5678",
  "children_count": 1,
  "child1_grade": "elementary3",
  "child2_grade": null,
  "plan_interest": "monthly" | "yearly"
}
```

---

## 📊 공통 파라미터 값

### source (유입 경로)
- `direct`: URL 직접 입력
- `fixed_bottom_start`: 하단 고정 시작 버튼
- `start_monthly`: 월간 플랜 시작하기
- `start_yearly`: 연간 플랜 시작하기

### variant (A/B 테스트)
- **f=trial**: `grade` (성적 향상), `direct_traffic`
- **f=consult**: `gangnam` (강남), `direct_traffic`
- 기타: `aicopy`, `recognition`

### 학년 값
- `elementary1`~`elementary6`: 초1~초6
- `middle1`~`middle3`: 중1~중3
- `high1`~`high3`: 고1~고3

### 결제 수단 (payment_method)
- `toss`: 토스페이
- `kakao`: 카카오페이
- `naver`: 네이버페이
- `payco`: 페이코
- `card`: 신용카드
- `phone`: 휴대폰결제

### 카드사 (selected_card)
- 삼성, BC, KB국민, 신한, 현대, 하나외환, 롯데, 광주, 수협, 씨티, 전북, 제주, NH채움, 우리BC, 하나, 카카오뱅크, 우리

### 할부 옵션 (installment_plan)
- 일시불
- 2개월 (무이자)
- 3개월 (무이자)
- 4개월 ~ 12개월

### 필드 상태 (폼 실패 시)
- `null`: 터치 안함
- `"TOUCHED_EMPTY"`: 터치했지만 비어있음
- `"실제값"`: 값 입력됨

---

## 🔐 보안 고려사항

- 카드 번호는 절대 저장하지 않음
- 민감한 결제 정보는 추적하지 않음
- 개인정보는 필요한 최소한만 수집
- 전화번호는 마케팅 활용을 위해 수집하나 안전하게 처리

---

## 💡 활용 방안

### Facebook 광고 최적화
1. **Lead 캠페인**: f=consult의 Lead 이벤트 최적화
2. **Trial 캠페인**: CompleteRegistration 이벤트 최적화
3. **리타겟팅**: InitiateCheckout 이벤트 기반 리타겟팅

### Mixpanel 분석
1. **퍼널 분석**: 페이지뷰 → 폼 제출 전환율
2. **A/B 테스트**: variant별 성과 비교
3. **이탈 분석**: 필드별 이탈률 확인
4. **결제 수단 분석**: 선호 결제 방식 파악

---

마지막 업데이트: 2025년 1월 17일 16:50:45 KST