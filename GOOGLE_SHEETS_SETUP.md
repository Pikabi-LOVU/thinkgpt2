# Google Sheets 자동 저장 설정 가이드

## 1. Google Cloud Console 설정

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" → "라이브러리" 이동
4. "Google Sheets API" 검색 후 활성화

## 2. 서비스 계정 생성

1. "API 및 서비스" → "사용자 인증 정보" 이동
2. "사용자 인증 정보 만들기" → "서비스 계정" 선택
3. 서비스 계정 이름 입력 (예: thinkgpt-sheets)
4. "만들기 및 계속" 클릭
5. 역할은 건너뛰고 "완료" 클릭

## 3. 서비스 계정 키 생성

1. 생성된 서비스 계정 클릭
2. "키" 탭 → "키 추가" → "새 키 만들기"
3. JSON 형식 선택 후 "만들기"
4. JSON 파일이 다운로드됨 (안전하게 보관)

## 4. Google Sheets 설정

1. Google Sheets에서 새 스프레드시트 생성
2. 시트 이름을 "상담신청"으로 변경
3. 첫 번째 행에 헤더 추가:
   - A1: 신청시간
   - B1: 학부모님 성함
   - C1: 이메일
   - D1: 전화번호
   - E1: 자녀 학년
   - F1: 관심 플랜
   - G1: 상담 가능 요일
   - H1: 선호 시간대
   - I1: 남기실 말씀
   - J1: 유입 경로
   - K1: 소스
   - L1: 전환 유형

4. 스프레드시트 URL에서 ID 복사:
   `https://docs.google.com/spreadsheets/d/[이 부분이 ID]/edit`

5. 서비스 계정 이메일에 공유:
   - 우측 상단 "공유" 버튼 클릭
   - 서비스 계정 이메일 입력 (JSON 파일에서 확인)
   - "편집자" 권한 부여

## 5. 환경 변수 설정

`.env.local` 파일에 추가:

```env
# Google Sheets API
GOOGLE_SPREADSHEET_ID=your_spreadsheet_id_here
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

**주의사항:**
- `GOOGLE_PRIVATE_KEY`는 JSON 파일의 `private_key` 값을 그대로 복사
- 줄바꿈 문자(`\n`)가 포함되어 있어야 함
- 전체를 큰따옴표로 감싸기

## 6. 테스트

1. 개발 서버 재시작: `npm run dev`
2. 상담 신청 폼 제출 (`f=consult`)
3. Google Sheets에 데이터가 자동으로 추가되는지 확인

## 문제 해결

- "Permission denied" 에러: 스프레드시트가 서비스 계정과 공유되었는지 확인
- "API not enabled" 에러: Google Sheets API가 활성화되었는지 확인
- 데이터가 추가되지 않음: 환경 변수가 올바르게 설정되었는지 확인