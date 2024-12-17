import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: "모두의 가계부",
  description: "절약해보자",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "모두의 가계부"
  },
};

const inter = Inter({ 
  subsets: ['latin'],  // 한국어 subset을 원한다면 ['korean']
  display: 'swap',     // 폰트 로딩 성능 개선
  variable: '--font-inter' // Tailwind CSS 통합에 유용
})
export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.className} bg-background min-h-screen max-w-screen overflow-x-hidden`}>
        <Providers>
          <div className="w-full max-w-full mx-auto">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

