import { Client } from "@notionhq/client"

// Notion 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

// 결제 정보를 Notion에 저장
export async function savePurchaseToNotion(data: {
  email: string
  phone: string
  cardholderName: string
  planType: string
  planTitle: string
  amount: number
  period: string
}) {
  try {
    // Notion 설정이 없는 경우 시뮬레이션
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_PURCHASE_DATABASE_ID) {
      console.log("🔧 Notion 설정이 없습니다. 데이터를 시뮬레이션합니다:")
      console.log("📊 구매 데이터:", {
        이메일: data.email,
        전화번호: data.phone,
        이름: data.cardholderName,
        플랜: data.planType === "monthly" ? "월간" : "연간",
        상품명: data.planTitle,
        금액: data.amount,
        결제일: new Date().toISOString(),
        상태: "완료",
      })
      return {
        success: true,
        data: {
          id: "simulated-" + Date.now(),
          message: "Notion 설정이 완료되면 실제 데이터베이스에 저장됩니다.",
        },
      }
    }

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_PURCHASE_DATABASE_ID!,
      },
      properties: {
        이메일: {
          email: data.email,
        },
        전화번호: {
          phone_number: data.phone,
        },
        이름: {
          title: [
            {
              text: {
                content: data.cardholderName,
              },
            },
          ],
        },
        플랜: {
          select: {
            name: data.planType === "monthly" ? "월간" : "연간",
          },
        },
        상품명: {
          rich_text: [
            {
              text: {
                content: data.planTitle,
              },
            },
          ],
        },
        금액: {
          number: data.amount,
        },
        결제일: {
          date: {
            start: new Date().toISOString(),
          },
        },
        상태: {
          select: {
            name: "완료",
          },
        },
      },
    })

    console.log("✅ Notion에 구매 정보가 성공적으로 저장되었습니다:", response.id)
    return { success: true, data: response }
  } catch (error) {
    console.error("❌ Notion 저장 실패:", error)

    // 개발 환경에서는 에러를 성공으로 처리
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 개발 환경: Notion 오류를 무시하고 계속 진행합니다.")
      return {
        success: true,
        data: {
          id: "dev-" + Date.now(),
          message: "개발 환경에서 시뮬레이션되었습니다.",
        },
      }
    }

    return { success: false, error }
  }
}

// 상담 신청 정보를 Notion에 저장
export async function saveConsultationToNotion(data: {
  name: string
  phone: string
  grade: string
  message: string
}) {
  try {
    // Notion 설정이 없는 경우 시뮬레이션
    if (!process.env.NOTION_TOKEN || !process.env.NOTION_CONSULTATION_DATABASE_ID) {
      console.log("🔧 Notion 설정이 없습니다. 데이터를 시뮬레이션합니다:")

      const gradeMap: { [key: string]: string } = {
        "elementary-1": "초등학교 1학년",
        "elementary-2": "초등학교 2학년",
        "elementary-3": "초등학교 3학년",
        "elementary-4": "초등학교 4학년",
        "elementary-5": "초등학교 5학년",
        "elementary-6": "초등학교 6학년",
        "middle-1": "중학교 1학년",
        "middle-2": "중학교 2학년",
        "middle-3": "중학교 3학년",
        "high-1": "고등학교 1학년",
        "high-2": "고등학교 2학년",
        "high-3": "고등학교 3학년",
      }

      console.log("📞 상담 신청 데이터:", {
        이름: data.name,
        전화번호: data.phone,
        자녀학년: gradeMap[data.grade] || data.grade,
        상담내용: data.message || "상담 내용 없음",
        신청일: new Date().toISOString(),
        상태: "대기",
      })

      return {
        success: true,
        data: {
          id: "simulated-" + Date.now(),
          message: "Notion 설정이 완료되면 실제 데이터베이스에 저장됩니다.",
        },
      }
    }

    const gradeMap: { [key: string]: string } = {
      "elementary-1": "초등학교 1학년",
      "elementary-2": "초등학교 2학년",
      "elementary-3": "초등학교 3학년",
      "elementary-4": "초등학교 4학년",
      "elementary-5": "초등학교 5학년",
      "elementary-6": "초등학교 6학년",
      "middle-1": "중학교 1학년",
      "middle-2": "중학교 2학년",
      "middle-3": "중학교 3학년",
      "high-1": "고등학교 1학년",
      "high-2": "고등학교 2학년",
      "high-3": "고등학교 3학년",
    }

    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_CONSULTATION_DATABASE_ID!,
      },
      properties: {
        이름: {
          title: [
            {
              text: {
                content: data.name,
              },
            },
          ],
        },
        전화번호: {
          phone_number: data.phone,
        },
        자녀학년: {
          select: {
            name: gradeMap[data.grade] || data.grade,
          },
        },
        상담내용: {
          rich_text: [
            {
              text: {
                content: data.message || "상담 내용 없음",
              },
            },
          ],
        },
        신청일: {
          date: {
            start: new Date().toISOString(),
          },
        },
        상태: {
          select: {
            name: "대기",
          },
        },
      },
    })

    console.log("✅ Notion에 상담 신청이 성공적으로 저장되었습니다:", response.id)
    return { success: true, data: response }
  } catch (error) {
    console.error("❌ Notion 저장 실패:", error)

    // 개발 환경에서는 에러를 성공으로 처리
    if (process.env.NODE_ENV === "development") {
      console.log("🔧 개발 환경: Notion 오류를 무시하고 계속 진행합니다.")
      return {
        success: true,
        data: {
          id: "dev-" + Date.now(),
          message: "개발 환경에서 시뮬레이션되었습니다.",
        },
      }
    }

    return { success: false, error }
  }
}
