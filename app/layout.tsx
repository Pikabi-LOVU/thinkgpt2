import type { Metadata } from 'next'
import { MixpanelProvider } from '@/components/MixpanelProvider'
import { FacebookPixel } from '@/components/FacebookPixel'
import { MicrosoftClarity } from '@/components/MicrosoftClarity'
import './globals.css'

export const metadata: Metadata = {
  title: '생각톡 - 말하면서 배우는 AI 학습 친구',
  description: '아이와 대화하며 사고력을 키우는 AI 음성 학습. 질문으로 생각을 자극하고 스스로 답을 찾아가도록 이끄는 진짜 교육.',
  keywords: 'AI 교육, 음성 학습, 대화형 AI, 생각톡, 사고력 향상, 초등 AI 교육, 중등 AI 교육',
  authors: [{ name: '베리타스 랩스' }],
  creator: '베리타스 랩스',
  publisher: '베리타스 랩스',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://think-talk.vercel.app',
    siteName: '생각톡',
    title: '생각톡 - 말하면서 배우는 AI 학습 친구',
    description: '아이와 대화하며 사고력을 키우는 AI 음성 학습. 질문으로 생각을 자극하는 진짜 교육.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '생각톡 - 말하면서 배우는 AI 학습',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '생각톡 - 말하면서 배우는 AI 학습 친구',
    description: '아이와 대화하며 사고력을 키우는 AI 음성 학습. 질문으로 생각을 자극하는 진짜 교육.',
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
