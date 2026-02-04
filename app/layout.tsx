import type { Metadata } from "next";
import { Noto_Sans_KR, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/app/providers";
import AppShell from "@/app/app-shell";

const notoSansKr = Noto_Sans_KR({
  variable: "--font-noto-sans-kr",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: "우솔 지출 결의 대시보드",
  description:
    "월별, 분기별, 연 지출 결의서와 월 마감 보고서를 한눈에 보는 대시보드",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${notoSansKr.variable} ${spaceGrotesk.variable} min-h-screen bg-[#fefefe] font-[var(--font-noto-sans-kr)] text-[#1b1f3b] antialiased`}
      >
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
