"use client";

import AuthGuard from "@/app/auth-guard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatKRW } from "@/lib/format";

const summary = {
  y: 2026,
  total: 1_482_300_000,
};

const months = [
  { name: "1월", value: 112_000_000 },
  { name: "2월", value: 128_500_000 },
  { name: "3월", value: 127_700_000 },
  { name: "4월", value: 118_400_000 },
  { name: "5월", value: 121_800_000 },
  { name: "6월", value: 124_500_000 },
  { name: "7월", value: 118_200_000 },
  { name: "8월", value: 120_900_000 },
  { name: "9월", value: 125_800_000 },
  { name: "10월", value: 128_600_000 },
  { name: "11월", value: 130_200_000 },
  { name: "12월", value: 143_700_000 },
];

export default function YearlyReportPage() {
  return (
    <AuthGuard>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">연 보고서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-[#312e81]">
              {summary.y} 연간 보고서
            </h1>
          </div>
          <Badge variant="accent">총 {formatKRW(summary.total)}</Badge>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>엑셀 연보고서 구조</CardTitle>
            <p className="text-sm text-[#64748b]">1~12월 + 연간 합계</p>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>월</TableHead>
                  <TableHead>합계</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {months.map((month) => (
                  <TableRow key={month.name}>
                    <TableCell className="text-[#1e293b]">{month.name}</TableCell>
                    <TableCell className="font-semibold text-[#4338ca]">
                      {formatKRW(month.value)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell className="text-[#1e293b]">연간 합계</TableCell>
                  <TableCell className="font-semibold text-[#4338ca]">
                    {formatKRW(summary.total)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
