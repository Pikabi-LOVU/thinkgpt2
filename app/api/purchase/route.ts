import { type NextRequest, NextResponse } from "next/server"
import { savePurchaseToNotion } from "@/lib/notion"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    // Notion에 데이터 저장
    const result = await savePurchaseToNotion({
      email: data.email,
      phone: data.phone,
      cardholderName: data.cardholderName,
      planType: data.planType,
      planTitle: data.planTitle,
      amount: data.amount,
      period: data.period,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "구매 정보가 성공적으로 저장되었습니다.",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "저장 중 오류가 발생했습니다.",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("API 오류:", error)
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다.",
      },
      { status: 500 },
    )
  }
}
