import type { Metadata } from 'next'
import { MixpanelProvider } from '@/components/MixpanelProvider'
import { FacebookPixel } from '@/components/FacebookPixel'
import { MicrosoftClarity } from '@/components/MicrosoftClarity'
import './globals.css'

export const metadata: Metadata = {
  title: 'ThinkGPT - AI 시대, 생각하는 힘을 키우는 교육',
  description: '생각하는 힘을 키우는 AI 교육 서비스. 답을 알려주지 않고 질문으로 이끌어 스스로 문제를 해결하는 능력을 기릅니다. 우리 아이의 진짜 실력을 키워주세요.',
  keywords: 'AI 교육, 사고력 향상, 학습 AI, ThinkGPT, 씽크지피티, 초등 AI 교육, 중등 AI 교육, 고등 AI 교육',
  authors: [{ name: '베리타스 랩스' }],
  creator: '베리타스 랩스',
  publisher: '베리타스 랩스',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://thinkgpt.ai',
    siteName: 'ThinkGPT',
    title: 'ThinkGPT - AI 시대, 생각하는 힘을 키우는 교육',
    description: '생각하는 힘을 키우는 AI 교육. 답을 알려주지 않고 질문으로 이끌어 스스로 문제를 해결하는 능력을 기릅니다.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ThinkGPT - 생각하는 AI 교육',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ThinkGPT - AI 시대, 생각하는 힘을 키우는 교육',
    description: '생각하는 힘을 키우는 AI 교육. 답을 알려주지 않고 질문으로 이끌어 스스로 문제를 해결하는 능력을 기릅니다.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body>
        <MixpanelProvider>
          <FacebookPixel />
          <MicrosoftClarity />
          {children}
        </MixpanelProvider>
      </body>
    </html>
  )
}
