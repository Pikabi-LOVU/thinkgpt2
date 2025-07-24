# Google Apps Script로 상담 신청 저장하기 (GCP 불필요!)

## 1. Google Sheets에서 Apps Script 열기

1. Google Sheets 열기
2. 상단 메뉴: 확장 프로그램 → Apps Script
3. 새 창이 열림

## 2. Apps Script 코드 작성

기존 코드 삭제하고 아래 코드 붙여넣기:

```javascript
function doPost(e) {
  try {
    // 시트 가져오기
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('상담신청');
    
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 현재 시간 (한국 시간)
    const now = new Date();
    const kstDate = Utilities.formatDate(now, 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss');
    
    // 시간대 변환
    const timeSlotMap = {
      '09-11': '오전 9-11시',
      '11-13': '오전 11시-1시',
      '13-15': '오후 1-3시',
      '15-17': '오후 3-5시',
      '17-19': '저녁 5-7시',
      '19-21': '저녁 7-9시'
    };
    
    const timeSlots = data.consultTimeSlots
      ?.map(slot => timeSlotMap[slot] || slot)
      .join(', ') || '';
    
    // 요일 변환
    const dayPreferenceMap = {
      'weekday_only': '평일만',
      'weekend_only': '주말만',
      'both': '평일/주말 모두'
    };
    
    const dayPreference = dayPreferenceMap[data.consultDayPreference] || data.consultDayPreference || '';
    
    // 자녀 학년 처리
    const childGrades = data.children
      ?.filter(child => child.grade)
      .map(child => child.grade)
      .join(', ') || '';
    
    // 행 추가
    sheet.appendRow([
      kstDate,                                    // A: 신청 시간
      data.parentName || '',                      // B: 학부모님 성함
      data.email || '',                           // C: 이메일
      data.phone || '',                           // D: 전화번호
      childGrades,                                // E: 자녀 학년
      data.interestedPlan === 'yearly' ? '연간' : '월간', // F: 관심 플랜
      dayPreference,                              // G: 상담 가능 요일
      timeSlots,                                  // H: 선호 시간대
      data.consultMessage || '',                  // I: 남기실 말씀
      data.variant || 'direct_traffic',           // J: 유입 경로
      data.source || '',                          // K: 소스
      data.afterCall ? '상담 후 전환' : '일반'      // L: 전환 유형
    ]);
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // 에러 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: false, 
        error: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// GET 요청 처리 (테스트용)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'ready',
      message: 'Google Apps Script is working!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 3. 배포하기

1. 저장 (Ctrl+S 또는 Cmd+S)
2. 우측 상단 "배포" → "새 배포"
3. 설정:
   - 유형: 웹 앱
   - 설명: 상담 신청 API
   - 실행: 나
   - 액세스 권한: **모든 사용자** (중요!)
4. "배포" 클릭
5. 권한 요청 시 승인
6. **웹 앱 URL 복사** (매우 중요!)

## 4. 시트 준비

1. 시트 이름을 "상담신청"으로 변경
2. 첫 번째 행에 헤더 추가:
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

## 5. 테스트

브라우저에서 복사한 웹 앱 URL 접속:
- `{"status":"ready","message":"Google Apps Script is working!"}` 표시되면 성공

## 6. 주의사항

- 웹 앱 URL은 안전하게 보관 (환경 변수로 관리)
- 배포 후 코드 수정 시 "배포 관리" → "편집" → "버전" → "새 버전"
- 액세스 권한은 반드시 "모든 사용자"로 설정