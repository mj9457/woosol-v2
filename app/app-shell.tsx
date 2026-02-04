"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import { useAuth } from "@/app/providers";
import AuthGuard from "@/app/auth-guard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const baseNav = [
  { href: "/dashboard", label: "대시보드" },
  { href: "/expenses/daily", label: "날짜별 지출" },
  { href: "/reports/monthly?ym=2026-02", label: "월 보고서" },
  { href: "/reports/quarterly?y=2026&q=1", label: "분기 보고서" },
  { href: "/reports/yearly?y=2026", label: "연 보고서" },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (!user) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b border-[#c7d2fe] bg-white/90 backdrop-blur-[16px]">
        <div className="flex w-full flex-wrap items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo_final.jpg"
                alt="Woosol"
                width={40}
                height={40}
                className="h-10 w-10 rounded-xl object-contain"
                priority
              />
              <div>
                <span className="font-[var(--font-space-grotesk)] text-[18px] font-bold uppercase tracking-[0.12em] text-[#4f46e5]">
                  우솔
                </span>
                <span className="mt-1 block text-[11px] tracking-[0.08em] text-[#64748b]">
                  지출 결의 통합 뷰
                </span>
              </div>
            </div>
            <span className="rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#4338ca]">
              {user.role.toUpperCase()}
            </span>
          </div>
          <nav className="flex flex-wrap gap-2">
            {baseNav.map((item) => {
              const active = pathname.startsWith(item.href.split("?")[0]);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-xs font-semibold transition",
                    active
                      ? "bg-[#4f46e5] text-white"
                      : "bg-[#e0e7ff] text-[#4338ca] hover:bg-[#c7d2fe]",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            {user.role === "admin" && (
              <Link
                href="/categories"
                className={cn(
                  "rounded-full px-4 py-2 text-xs font-semibold transition",
                  pathname.startsWith("/categories")
                    ? "bg-[#4f46e5] text-white"
                    : "bg-[#e0e7ff] text-[#4338ca] hover:bg-[#c7d2fe]",
                )}
              >
                카테고리 관리
              </Link>
            )}
          </nav>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-[#c7d2fe] bg-white px-3 py-2 text-xs font-semibold text-[#1e293b]">
              <span>{user.name ?? user.email ?? "사용자"}</span>
              <ChevronDown className="h-4 w-4 text-[#64748b]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-2 text-[#1e293b]">
                <Settings className="h-4 w-4" />
                계정 설정
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2 text-[#dc2626]"
                onSelect={async () => {
                  await signOut();
                }}
              >
                <LogOut className="h-4 w-4" />
                로그아웃
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="w-full flex-1 px-6 pb-16 pt-10">
        <AuthGuard>{children}</AuthGuard>
      </main>
    </div>
  );
}
