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
import { formatKRW, formatKRWShort } from "@/lib/format";

const summary = {
  ym: "2026-02",
  total: 128_500_000,
  diff: 12_300_000,
  diffRate: 0.104,
};

const majorGroups = [
  {
    name: "인건비",
    total: 52_000_000,
    items: [
      { name: "급여", value: 28_000_000 },
      { name: "상여금", value: 8_000_000 },
      { name: "특별상여금", value: 4_500_000 },
      { name: "일용노무비", value: 6_500_000 },
      { name: "퇴직연금", value: 5_000_000 },
    ],
  },
  {
    name: "인건비관련 4대보험/원천세",
    total: 21_500_000,
    items: [
      { name: "국민연금보험료", value: 5_100_000 },
      { name: "건강보험료", value: 4_800_000 },
      { name: "고용보험료", value: 2_600_000 },
      { name: "산재보험료", value: 3_100_000 },
      { name: "근로소득세", value: 3_200_000 },
      { name: "사업소득세", value: 1_500_000 },
      { name: "지방소득세", value: 1_200_000 },
    ],
  },
  {
    name: "판매비와 관리비",
    total: 38_500_000,
    items: [
      { name: "사무소 건무 임대료", value: 6_800_000 },
      { name: "사무소 관리비", value: 3_200_000 },
      { name: "임차료(공기/복합기)", value: 2_100_000 },
      { name: "차량렌탈료", value: 3_400_000 },
      { name: "차량관리유지보수", value: 2_600_000 },
      { name: "자동차보험가입료", value: 1_800_000 },
      { name: "영업비", value: 2_900_000 },
      { name: "세무기장/홍익노무", value: 3_000_000 },
      { name: "지급수수료", value: 2_200_000 },
      { name: "일반경비", value: 2_100_000 },
      { name: "법인카드대금", value: 3_300_000 },
      { name: "복리후생비", value: 2_800_000 },
      { name: "교육훈련비", value: 1_300_000 },
      { name: "출장여비교통비/대리운전", value: 1_200_000 },
    ],
  },
  {
    name: "매출원가 상품 관련",
    total: 31_000_000,
    items: [
      {
        name: "상품(외주비 시공비 등 공사원가 계정 포함)",
        value: 31_000_000,
      },
    ],
  },
  {
    name: "세금관련 비용",
    total: 7_000_000,
    items: [
      { name: "세금과공과", value: 4_200_000 },
      { name: "기타부가세", value: 2_800_000 },
    ],
  },
];

const monthlyTrend = [
  { name: "1월", value: 98_000_000 },
  { name: "2월", value: 128_500_000 },
];

const tooltipStyle = {
  backgroundColor: "rgba(30, 41, 59, 0.95)",
  border: "none",
  borderRadius: 12,
  color: "#f8fafc",
  fontSize: 12,
};

export default function MonthlyReportPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">월 마감 보고서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-[#312e81]">
              {summary.ym} 보고서
            </h1>
          </div>
          <Badge variant="accent">
            전월 대비 {formatKRW(summary.diff)} (
            {(summary.diffRate * 100).toFixed(1)}%)
          </Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>월간 총합</CardTitle>
            <p className="text-sm text-[#64748b]">항목별 합계 및 증감</p>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold text-[#4338ca]">
              {formatKRW(summary.total)}
            </p>
          </CardContent>
        </Card>

        <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <Card>
            <CardHeader>
              <CardTitle>대분류 합계 (5개)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {majorGroups.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-2xl bg-[#f8fafc] px-4 py-3"
                  >
                    <span className="text-sm text-[#475569]">{item.name}</span>
                    <span className="text-sm font-semibold text-[#4338ca]">
                      {formatKRW(item.total)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>월별 추이</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[240px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyTrend}>
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle>세부 항목별 합계</CardTitle>
            <p className="text-sm text-[#64748b]">
              대분류별 세부 항목 합계를 모두 표시합니다.
            </p>
          </CardHeader>
          <CardContent className="flex justify-between">
            {majorGroups.map((group) => (
              <div key={group.name} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-[#a6d2ff]  px-4 py-3">
                  <span className="text-sm font-semibold text-[#1e293b]">
                    {group.name}
                  </span>
                  <span className="text-sm font-semibold text-red-500">
                    {formatKRW(group.total)}
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  {group.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex flex-wrap items-start justify-between gap-2 rounded-2xl border border-[#e2e8f0] bg-white px-4 py-3"
                    >
                      <span className="text-sm text-[#475569] break-words">
                        {item.name}
                      </span>
                      <span className="text-sm font-semibold text-[#4338ca]">
                        {formatKRWShort(item.value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
