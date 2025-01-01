import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import '@/app/globals.css'
import LayoutClient from '@/app/layoutClient'
import { Toaster } from "@/components/ui/toaster"

const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['400', '500', '700']
})

export const metadata: Metadata = {
  title: '모두의 가계부',
  description: '개인 예산 관리 대시보드',
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className={notoSansKR.className}>
        <LayoutClient>{children}</LayoutClient>
        <Toaster />

      </body>
    </html>
  )
}