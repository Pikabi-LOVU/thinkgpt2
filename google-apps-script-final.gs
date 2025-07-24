// 이 코드를 Google Apps Script 편집기에 복사하세요 (기존 행 업데이트 버전)

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: "ready",
      message: "Google Apps Script is working!"
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    console.log('doPost called with:', e.postData.contents);
    
    // POST 요청의 내용을 파싱
    const data = JSON.parse(e.postData.contents);
    
    // 스프레드시트 열기
    let sheet;
    try {
      sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('상담신청');
    } catch (sheetError) {
      console.error('Sheet access error:', sheetError);
      throw new Error('스프레드시트 접근 권한 문제: ' + sheetError.toString());
    }
    
    if (!sheet) {
      throw new Error('상담신청 시트를 찾을 수 없습니다.');
    }
    
    // aftercall이고 f=trial인 경우: 기존 행 업데이트
    if (data.afterCall && data.funnel === 'trial') {
      // 시트의 모든 데이터 가져오기
      const dataRange = sheet.getDataRange();
      const values = dataRange.getValues();
      
      // 이메일 또는 전화번호로 기존 행 찾기 (이름은 보조 확인용)
      let rowIndex = -1;
      let matchType = ''; // 매칭 타입 추적
      
      for (let i = 1; i < values.length; i++) { // 헤더 제외 (i=1부터)
        const rowName = values[i][1];  // 학부모님 성함은 2번째 열 (인덱스 1)
        const rowEmail = values[i][2]; // 이메일은 3번째 열 (인덱스 2)
        const rowPhone = values[i][3]; // 전화번호는 4번째 열 (인덱스 3)
        
        // 강한 매칭: 이메일 또는 전화번호가 일치
        if (data.email && rowEmail === data.email) {
          rowIndex = i + 1;
          matchType = 'email';
          break;
        } else if (data.phone && rowPhone === data.phone) {
          rowIndex = i + 1;
          matchType = 'phone';
          break;
        }
        // 약한 매칭: 이름만 일치하는 경우는 건너뛰고 새 행 추가
      }
      
      if (rowIndex > 0) {
        // 기존 행 업데이트
        sheet.getRange(rowIndex, 12).setValue('상담후 결제 시도함'); // 상담 후 결제 시도 여부
        sheet.getRange(rowIndex, 13).setValue(data.selectedPaymentMethod || ''); // 결제 방법
        sheet.getRange(rowIndex, 14).setValue(data.selectedCard || ''); // 선택 카드
        sheet.getRange(rowIndex, 15).setValue(data.selectedInstallment || ''); // 할부 개월
        sheet.getRange(rowIndex, 16).setValue(new Date()); // 결제 시도 시간
        
        return ContentService
          .createTextOutput(JSON.stringify({ 
            success: true,
            message: "Existing record updated"
          }))
          .setMimeType(ContentService.MimeType.JSON);
      } else {
        // 기존 상담 신청을 찾을 수 없는 경우 새로운 행 추가
        // 정보 불일치 또는 잘못 기입된 경우를 위한 안전장치
        const conversionType = '상담후 결제 시도함 (매칭 안됨)';
        
        sheet.appendRow([
          new Date(), // 신청시간
          data.parentName || '', // 학부모님 성함
          data.email || '', // 이메일
          data.phone || '', // 전화번호
          data.grade || '', // 자녀 학년
          data.interestedPlan || '', // 관심 플랜
          '', // 상담 가능 요일 (빈칸)
          '', // 선호 시간대 (빈칸)
          '', // 남기실 말씀 (빈칸)
          data.variant || 'direct', // 유입 경로
          data.source || '', // 소스
          conversionType, // 상담 후 결제 시도 여부
          data.selectedPaymentMethod || '', // 결제 방법
          data.selectedCard || '', // 선택 카드
          data.selectedInstallment || '' // 할부 개월
        ]);
      }
    } else {
      // 일반 상담 신청 (f=consult) 또는 일반 구매 (f=trial without aftercall)
      const conversionType = data.afterCall ? '상담후 결제 시도함' : '';
      
      sheet.appendRow([
        new Date(), // 신청시간
        data.parentName || '', // 학부모님 성함
        data.email || '', // 이메일
        data.phone || '', // 전화번호
        data.grade || '', // 자녀 학년
        data.interestedPlan || '', // 관심 플랜
        data.consult_day_preference || data.consultDayPreference || '', // 상담 가능 요일
        data.consult_time_slots || data.consultTimeSlots || '', // 선호 시간대
        data.message || data.consultMessage || '', // 남기실 말씀
        data.variant || 'direct', // 유입 경로
        data.source || '', // 소스
        conversionType, // 상담 후 결제 시도 여부
        data.selectedPaymentMethod || '', // 결제 방법
        data.selectedCard || '', // 선택 카드
        data.selectedInstallment || '', // 할부 개월
        data.funnel || '' // 퍼널 타입
      ]);
    }
    
    // 성공 응답
    return ContentService
      .createTextOutput(JSON.stringify({ 
        success: true,
        message: "Data saved successfully"
      }))
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