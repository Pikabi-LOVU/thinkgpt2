# ThinkGPT 교육 플랫폼

## Notion 연동 설정 가이드

### 1. Notion Integration 생성

1. [Notion Developers](https://www.notion.so/my-integrations)에 접속
2. "New integration" 클릭
3. Integration 이름 입력 (예: "ThinkGPT")
4. Associated workspace 선택
5. "Submit" 클릭하여 생성
6. **Internal Integration Token** 복사 (이것이 `NOTION_TOKEN`입니다)

### 2. Notion 데이터베이스 생성

#### 구매 정보 데이터베이스
1. 새 페이지 생성 후 "Database" 선택
2. 다음 속성들을 추가:
   - **이름** (Title)
   - **이메일** (Email)
   - **전화번호** (Phone number)
   - **플랜** (Select: 월간, 연간)
   - **상품명** (Text)
   - **금액** (Number)
   - **결제일** (Date)
   - **상태** (Select: 완료, 대기, 취소)

#### 상담 신청 데이터베이스
1. 새 페이지 생성 후 "Database" 선택
2. 다음 속성들을 추가:
   - **이름** (Title)
   - **전화번호** (Phone number)
   - **자녀학년** (Select: 초등학교 1학년, 초등학교 2학년, ...)
   - **상담내용** (Text)
   - **신청일** (Date)
   - **상태** (Select: 대기, 완료, 취소)

### 3. 데이터베이스 ID 확인

1. 데이터베이스 페이지 URL에서 ID 확인
   - URL 형식: `https://www.notion.so/{database_id}?v=...`
   - `{database_id}` 부분이 데이터베이스 ID입니다

### 4. Integration 권한 부여

1. 각 데이터베이스 페이지에서 "Share" 클릭
2. "Invite" 섹션에서 생성한 Integration 선택
3. "Invite" 클릭

### 5. 환경변수 설정

#### 로컬 개발환경
`.env.local` 파일에 다음 내용 추가:
\`\`\`
NOTION_TOKEN=your_integration_token_here
NOTION_PURCHASE_DATABASE_ID=your_purchase_database_id_here
NOTION_CONSULTATION_DATABASE_ID=your_consultation_database_id_here
\`\`\`

#### Vercel 배포환경
1. Vercel 대시보드에서 프로젝트 선택
2. "Settings" → "Environment Variables" 이동
3. 다음 환경변수들을 추가:
   - `NOTION_TOKEN`: Integration Token
   - `NOTION_PURCHASE_DATABASE_ID`: 구매 정보 데이터베이스 ID
   - `NOTION_CONSULTATION_DATABASE_ID`: 상담 신청 데이터베이스 ID

### 6. 배포 후 재배포

환경변수 설정 후 Vercel에서 프로젝트를 재배포해야 합니다:
1. Vercel 대시보드에서 "Deployments" 탭 이동
2. 최신 배포에서 "..." 메뉴 클릭
3. "Redeploy" 선택

## 문제 해결

### Notion 데이터가 저장되지 않는 경우

1. **환경변수 확인**: Vercel 대시보드에서 환경변수가 올바르게 설정되었는지 확인
2. **Integration 권한**: 데이터베이스에 Integration이 초대되었는지 확인
3. **데이터베이스 속성**: 데이터베이스의 속성 이름이 코드와 일치하는지 확인
4. **재배포**: 환경변수 변경 후 반드시 재배포 필요

### 개발 환경에서 테스트

현재 코드는 Notion 설정이 없어도 시뮬레이션 모드로 동작합니다:
- 환경변수가 없으면 콘솔에 데이터를 출력
- 개발 환경에서는 오류가 발생해도 성공으로 처리

## 기능 설명

### 1. Floating CTA 버튼
- 페이지 우하단에 고정된 "지금 구매하기" 버튼
- 스크롤 위치와 관계없이 항상 표시

### 2. 요금제 선택
- 결제 페이지에서 월간/연간 플랜 선택 가능
- URL 파라미터로 기본 선택값 설정 가능
- 실시간으로 가격 및 혜택 정보 업데이트

### 3. 데이터 저장
- 구매 정보와 상담 신청 정보를 Notion에 자동 저장
- 환경변수 미설정 시 시뮬레이션 모드로 동작
- 오류 발생 시에도 사용자 경험 유지
\`\`\`

**주요 변경사항:**

1. **✅ Floating CTA 버튼 추가**: 페이지 우하단에 고정된 "지금 구매하기" 버튼이 항상 표시됩니다.

2. **✅ 결제 페이지 개선**: 
   - 요금제 선택 섹션 추가
   - 월간/연간 플랜을 시각적으로 선택할 수 있음
   - 실시간으로 가격 정보 업데이트

3. **✅ Notion 연동 문제 해결 가이드**: 
   - README.md에 상세한 설정 가이드 추가
   - Deploy 환경에서 Notion이 작동하지 않는 이유와 해결방법 설명

**Notion 연동이 안 되는 이유:**
- 로컬의 `.env.local` 파일은 배포 환경에 적용되지 않음
- Vercel 대시보드에서 환경변수를 별도로 설정해야 함
- Integration 생성 및 데이터베이스 권한 설정 필요

이제 Notion 설정을 완료하면 실제 배포 환경에서도 데이터가 정상적으로 저장됩니다!
