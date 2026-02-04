"use client";

import AuthGuard from "@/app/auth-guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatKRW } from "@/lib/format";

const summary = {
  y: 2026,
  q: 1,
  total: 368_200_000,
};

const months = [
  { name: "1월", value: 112_000_000 },
  { name: "2월", value: 128_500_000 },
  { name: "3월", value: 127_700_000 },
];

const categories = [
  { name: "인건비", value: 148_000_000 },
  { name: "판매비와 관리비", value: 108_200_000 },
  { name: "매출원가", value: 90_000_000 },
  { name: "세금관련 비용", value: 22_000_000 },
];

const tooltipStyle = {
  backgroundColor: "rgba(30, 41, 59, 0.95)",
  border: "none",
  borderRadius: 12,
  color: "#f8fafc",
  fontSize: 12,
};

export default function QuarterlyReportPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">분기 보고서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-[#312e81]">
              {summary.y}년 {summary.q}분기
            </h1>
          </div>
          <Badge variant="accent">총 {formatKRW(summary.total)}</Badge>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>분기 내 월별 합계</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={months}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>항목별 breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categories.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3"
                  >
                    <span className="text-sm text-[#475569]">{item.name}</span>
                    <span className="text-sm font-semibold text-[#4338ca]">
                      {formatKRW(item.value)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthGuard>
  );
}
