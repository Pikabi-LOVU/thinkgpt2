import { NextResponse } from 'next/server'

// Google Apps Script 웹 앱 URL
const APPS_SCRIPT_URL = process.env.GOOGLE_APPS_SCRIPT_URL

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    console.log('Received data:', data)
    console.log('Apps Script URL:', APPS_SCRIPT_URL)
    
    if (!APPS_SCRIPT_URL) {
      throw new Error('Google Apps Script URL not configured')
    }
    
    // Google Apps Script 웹 앱으로 데이터 전송
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      redirect: 'follow', // Apps Script는 리다이렉트를 사용함
    })
    
    console.log('Apps Script response status:', response.status)
    
    const result = await response.json()
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to save data')
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to save to Google Sheets:', error)
    return NextResponse.json(
      { error: 'Failed to save data' },
      { status: 500 }
    )
  }
}