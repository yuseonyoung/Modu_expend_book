import type { Metadata, Viewport } from "next";
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: "PWA App",
  description: "My PWA Application",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "PWA App"
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

export default function RootLayout({children,}: {children: React.ReactNode}) {
  return (
    <html lang="ko">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
