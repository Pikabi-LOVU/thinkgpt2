import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if we can reach Mixpanel API
    const testResponse = await fetch('https://api.mixpanel.com/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: btoa(JSON.stringify([{
          event: 'Connection Test',
          properties: {
            token: '5db35e9f23a6b1e57c3e650603f3dc0e',
            time: Math.floor(Date.now() / 1000),
            distinct_id: 'test-connection',
            $insert_id: Math.random().toString(36),
          }
        }]))
      })
    })

    const responseText = await testResponse.text()
    
    return NextResponse.json({
      success: testResponse.ok,
      status: testResponse.status,
      response: responseText,
      message: testResponse.ok ? 'Mixpanel 연결 성공' : 'Mixpanel 연결 실패',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Mixpanel API 연결 중 오류 발생'
    }, { status: 500 })
  }
}