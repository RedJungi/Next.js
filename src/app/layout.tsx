"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Main from "@/components/main/main";
import Footer from "@/components/footer/footer";
import { usePathname } from "next/navigation"; // 경로 확인을 위한 훅

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // 현재 경로 가져오기

  // Main 컴포넌트를 제외할 페이지들
  const shouldShowMain = !pathname.startsWith("/marketing-nav");

  return (
    <html lang="kr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header header={null} />
        {shouldShowMain ? <Main main={children} /> : children} {/* Main 컴포넌트를 제외할 페이지들 */}
        <Footer footer={null} />
      </body>
    </html>
  );
}
