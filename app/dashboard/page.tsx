"use client";

import AuthGuard from "@/app/auth-guard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatKRW, formatKRWUnit } from "@/lib/format";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BarChart2, Calendar, FileText, TrendingUp } from "lucide-react";

const summary = [
  {
    label: "이번 달 지출",
    value: 830_000,
    subLabel: formatKRWUnit(830_000),
    meta: "0.0% 전월 대비",
    icon: Calendar,
    accent: "text-red-500",
  },
  {
    label: "이번 분기 지출",
    value: 830_000,
    subLabel: formatKRWUnit(830_000),
    meta: "1분기",
    icon: BarChart2,
  },
  {
    label: "올해 지출",
    value: 830_000,
    subLabel: formatKRWUnit(830_000),
    meta: "2026년",
    icon: FileText,
  },
];

const topSpend = [
  { name: "인건비", value: 320 },
  { name: "판매비", value: 210 },
  { name: "매출원가", value: 280 },
  { name: "세금", value: 140 },
];

const monthlyTrend = [
  { name: "7월", value: 92 },
  { name: "8월", value: 104 },
  { name: "9월", value: 128 },
  { name: "10월", value: 120 },
  { name: "11월", value: 136 },
  { name: "12월", value: 154 },
];

const categoryMix = [
  { name: "인건비", value: 38 },
  { name: "관리비", value: 26 },
  { name: "매출원가", value: 24 },
  { name: "세금/기타", value: 12 },
];

const tooltipStyle = {
  backgroundColor: "rgba(30, 41, 59, 0.95)",
  border: "none",
  borderRadius: 12,
  color: "#f8fafc",
  fontSize: 12,
};

export default function DashboardPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">메인 대시보드</p>
            <h1 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-[#312e81]">
              지출 흐름 요약
            </h1>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {summary.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-[#1e293b]">{item.label}</p>
                      <p className="mt-2 text-2xl font-semibold text-[#111827]">
                        {formatKRW(item.value)}
                      </p>
                      <p className="mt-1 text-xs text-[#94a3b8]">
                        {item.subLabel}
                      </p>
                    </div>
                    <Icon className="h-5 w-5 text-[#94a3b8]" />
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs text-[#6b7280]">
                    {item.label === "이번 달 지출" && (
                      <TrendingUp className="h-3.5 w-3.5 text-red-500" />
                    )}
                    <span className={item.accent ?? ""}>{item.meta}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1.1fr]">
          <Card>
            <CardHeader>
              <CardTitle>Top 지출 항목</CardTitle>
              <p className="text-sm text-[#64748b]">주요 지출 비중</p>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={topSpend}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar
                      dataKey="value"
                      fill="#6366f1"
                      radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>카테고리별 비중</CardTitle>
              <p className="text-sm text-[#64748b]">지출 구조 파악</p>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip contentStyle={tooltipStyle} />
                    <Pie
                      data={categoryMix}
                      dataKey="value"
                      nameKey="name"
                      outerRadius={90}
                      fill="#4f46e5"
                      label
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>월별 지출 추이</CardTitle>
            <p className="text-sm text-[#64748b]">최근 6개월 기준</p>
          </CardHeader>
          <CardContent>
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#4f46e5"
                    strokeWidth={3}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
