# URL 파라미터 전략 - f=trial

## 옵션 1: 파라미터 제거 ✅ (추천)
```
https://think-talk.com/?v=gangnam
https://think-talk.com/?v=grade
```

**장점:**
- URL이 깔끔하고 짧음
- 사용자가 기억하기 쉬움
- 공유하기 편함

**단점:**
- 나중에 다른 퍼널 추가 시 URL 구조 변경 필요

## 옵션 2: 기본값으로 유지
```
https://think-talk.com/?v=gangnam&f=trial
https://think-talk.com/?v=grade&f=trial
```

**장점:**
- 미래 확장성 (나중에 f=consult, f=demo 등 추가 가능)
- 데이터 분석 시 명확한 구분
- 기존 코드 수정 최소화

**단점:**
- URL이 길어짐

## 옵션 3: 코드에서 기본값 처리 🎯
```typescript
// lib/url-params.ts
export function getFunnel(searchParams: URLSearchParams) {
  return searchParams.get('f') || 'trial' // 기본값 trial
}
```

이렇게 하면:
- `https://think-talk.com/?v=gangnam` → f=trial 자동 적용
- `https://think-talk.com/?v=gangnam&f=trial` → 명시적으로도 가능

## 추천: 옵션 3
**이유:**
1. URL은 깔끔하게 유지
2. 기존 링크들도 계속 작동
3. 나중에 다른 퍼널 추가 시 유연하게 대응 가능
4. 마케팅 캠페인별로 필요시 f 파라미터 추가 가능

## 구현 방법:
```typescript
// 이미 getFunnel 함수가 있다면 수정
export function getFunnel(searchParams: URLSearchParams) {
  const funnel = searchParams.get('f')
  // f 파라미터가 없으면 기본값 'trial' 반환
  return funnel || 'trial'
}
```

이렇게 하면 링크는 간단하게:
- `/?v=function`
- `/?v=gangnam`
- `/?v=grade`
- `/?v=recognition`

하지만 필요시 여전히 `&f=special_campaign` 같은 걸 추가할 수 있어요!