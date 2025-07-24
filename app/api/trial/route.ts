import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // 실제로는 여기서 데이터베이스나 Notion API로 저장
    console.log('Trial registration data:', data)
    
    // 시뮬레이션된 성공 응답
    return NextResponse.json({ 
      success: true, 
      message: '2주 무료 체험 신청이 완료되었습니다.' 
    })
  } catch (error) {
    console.error('Trial registration error:', error)
    return NextResponse.json(
      { success: false, message: '체험 신청 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}