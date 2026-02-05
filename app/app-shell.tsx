"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Bell,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Home,
  LineChart,
  ListChecks,
  LogOut,
  Settings,
  User,
} from "lucide-react";
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
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/expenses/daily", label: "Daily Expense", icon: ListChecks },
  {
    href: "/reports/monthly?ym=2026-02",
    label: "Monthly Report",
    icon: LineChart,
  },
  {
    href: "/reports/quarterly?y=2026&q=1",
    label: "Quarterly Report",
    icon: LineChart,
  },
  { href: "/reports/yearly?y=2026", label: "Yearly Report", icon: LineChart },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, signOut } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (pathname === "/login") {
    return <>{children}</>;
  }

  if (!user) {
    return <AuthGuard>{children}</AuthGuard>;
  }

  return (
    <div className="flex min-h-screen bg-[#fefefe]">
      <aside
        className={cn(
          "sticky top-0 hidden h-screen flex-col gap-6 border-r border-[#e5e7eb] bg-[#f8fafc] px-4 py-6 transition-all duration-300 lg:flex",
          sidebarCollapsed ? "w-[96px]" : "w-[260px]",
        )}
      >
        <div className="flex items-center justify-between gap-3">
          <Image
            src="/logo_final.jpg"
            alt="Woosol"
            width={40}
            height={40}
            className="h-10 w-10 rounded-xl object-contain"
            priority
          />
          {!sidebarCollapsed && (
            <div>
              <p className="text-sm font-semibold text-[#0f172a]">Woosol</p>
              <p className="text-xs text-[#94a3b8]">Expense Dashboard</p>
            </div>
          )}
          <button
            className="ml-auto rounded-full border border-[#e2e8f0] bg-white p-2 text-[#64748b] hover:text-[#0f172a]"
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            aria-label="Toggle sidebar"
          >
            {sidebarCollapsed ? (
              <ChevronsRight className="h-4 w-4" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {baseNav.map((item) => {
            const active = pathname.startsWith(item.href.split("?")[0]);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition",
                  active
                    ? "bg-[#227400] text-white shadow-[0_10px_30px_rgba(34,116,0,0.18)]"
                    : "text-[#475569] hover:bg-[#eef2f7] hover:text-[#0f172a]",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg border border-transparent",
                    active ? "bg-white/20" : "bg-white",
                  )}
                >
                  <Icon className="h-6 w-6" />
                </span>
                {!sidebarCollapsed && <span>{item.label}</span>}
                {sidebarCollapsed && (
                  <span className="pointer-events-none absolute left-[88px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-[#1f8a2b]/30 bg-[#ecf7ec] px-4 py-2 text-sm font-semibold text-[#1b5e00] opacity-0 shadow-md transition duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-1">
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
          {user.role === "admin" && (
            <Link
              href="/categories"
              className={cn(
                "group relative flex items-center gap-3 rounded-2xl px-4 py-4 text-sm font-semibold transition",
                pathname.startsWith("/categories")
                  ? "bg-[#227400] text-white shadow-[0_10px_30px_rgba(34,116,0,0.18)]"
                  : "text-[#475569] hover:bg-[#eef2f7] hover:text-[#0f172a]",
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-md border border-transparent",
                  pathname.startsWith("/categories")
                    ? "bg-white/20"
                    : "bg-white",
                )}
              >
                <Settings className="h-6 w-6" />
              </span>
              {!sidebarCollapsed && <span>카테고리 관리</span>}
              {sidebarCollapsed && (
                <span className="pointer-events-none absolute left-[88px] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-xl border border-[#1f8a2b]/30 bg-[#ecf7ec] px-4 py-2 text-sm font-semibold text-[#1b5e00] opacity-0 shadow-md transition duration-200 ease-out group-hover:opacity-100 group-hover:translate-x-1">
                  카테고리 관리
                </span>
              )}
            </Link>
          )}
        </div>

        <div className="mt-auto rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3">
          <p className="text-xs text-[#94a3b8]">Role</p>
          <p className="text-sm font-semibold text-[#0f172a]">
            {user.role.toUpperCase()}
          </p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-[#e5e7eb] bg-white px-6 py-4">
          <div className="relative w-full max-w-[520px]">
            <input
              className="w-full rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3 text-sm text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#227400]"
              placeholder="Search here..."
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative rounded-full border border-[#e2e8f0] bg-white p-2 text-[#64748b] hover:text-[#0f172a]">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#227400]" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 rounded-full border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#0f172a]">
                <User className="h-4 w-4" />
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
        <main className="w-full flex-1 bg-[#fefefe] px-6 pb-16 pt-10">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </div>
  );
}
