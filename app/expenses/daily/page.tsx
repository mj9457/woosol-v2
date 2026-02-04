"use client";

import React from "react";
import AuthGuard from "@/app/auth-guard";
import { useAuth } from "@/app/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, isSameDay } from "date-fns";
import { CalendarDays, Trash2, Pencil } from "lucide-react";
import { formatKRW } from "@/lib/format";

type ExpenseRow = {
  id: string;
  date: Date;
  main: string;
  sub: string;
  amount: number;
  method: string;
  memo: string;
};

const categories = [
  {
    main: "인건비",
    subs: ["급여", "특별상여금", "상여금", "일용노무비(사용시)", "퇴직연금"],
  },
  {
    main: "인건비관련 4대보험/원천세",
    subs: [
      "국민연금보험료",
      "건강보험료",
      "고용보험료",
      "산재보험료",
      "근로소득세",
      "사업소득세",
      "지방소득세",
    ],
  },
  {
    main: "판매비와 관리비",
    subs: [
      "사무소 건무 임대료",
      "사무소 관리비",
      "임차료(공기/ 복합기)",
      "차량렌탈료",
      "차량관리유지보수",
      "자동차보험가입료",
      "영업비",
      "농엽은행방카보험료",
      "세무기장/홍익노무",
      "지급수수료",
      "일반경비",
      "법인카드대금",
      "복리후생비",
      "교육훈련비",
      "출장여비교통비/대리운전",
      "통신비(핸드폰/텔레캅)",
      "전화/팩스요금",
      "수도광열비(난방등유)",
      "전력비(전기요금)",
      "도서인쇄비",
      "비품",
      "소모품비",
      "사무용품비",
      "운반비/택배",
      "수선비",
      "폐기물",
      "광고선전비",
    ],
  },
  {
    main: "세금관련 비용",
    subs: ["세금과공과", "기타부가세"],
  },
  {
    main: "접대/기부 관련 비용",
    subs: ["접대비(골프)", "접대비(상품권)", "접대비(경조사)", "기부금"],
  },
  {
    main: "매출원가 상품 관련",
    subs: ["상품(외주비 시공비 등 공사원가 계정 포함)"],
  },
  {
    main: "법인세 자본 관련",
    subs: ["법인세", "법인지방세", "배당금"],
  },
];

const paymentMethods = ["법인카드", "계좌이체", "현금", "기타"];

const seedExpenses: ExpenseRow[] = [
  {
    id: "seed-1",
    date: new Date("2026-02-04"),
    main: "인건비",
    sub: "급여",
    amount: 3200000,
    method: "계좌이체",
    memo: "현장 인력",
  },
  {
    id: "seed-2",
    date: new Date("2026-02-04"),
    main: "판매비와 관리비",
    sub: "사무소 관리비",
    amount: 820000,
    method: "법인카드",
    memo: "관리비 납부",
  },
  {
    id: "seed-3",
    date: new Date("2026-02-03"),
    main: "매출원가 상품 관련",
    sub: "상품(외주비 시공비 등 공사원가 계정 포함)",
    amount: 6500000,
    method: "계좌이체",
    memo: "외주 정산",
  },
];

export default function DailyExpensesPage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date("2026-02-04"));
  const [rows, setRows] = React.useState<ExpenseRow[]>(seedExpenses);
  const [main, setMain] = React.useState(categories[0].main);
  const [sub, setSub] = React.useState(categories[0].subs[0]);
  const [amount, setAmount] = React.useState("");
  const [method, setMethod] = React.useState(paymentMethods[0]);
  const [memo, setMemo] = React.useState("");

  const filtered = rows.filter((row) => isSameDay(row.date, selectedDate));

  const onSave = () => {
    if (!amount) return;
    const next: ExpenseRow = {
      id: `row-${Date.now()}`,
      date: selectedDate,
      main,
      sub,
      amount: Number(amount),
      method,
      memo,
    };
    setRows((prev) => [next, ...prev]);
    setAmount("");
    setMemo("");
  };

  const onDelete = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <AuthGuard>
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">날짜별 지출결의서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-[#312e81]">
              날짜 중심 지출 작성
            </h1>
          </div>
          <Badge variant="accent">
            {format(selectedDate, "yyyy.MM.dd")}
          </Badge>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>날짜 선택</CardTitle>
              <p className="text-sm text-[#64748b]">
                날짜를 바꾸면 바로 아래 테이블이 즉시 변경됩니다.
              </p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <CalendarDays className="h-4 w-4" />
                  {format(selectedDate, "yyyy-MM-dd")}
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                />
              </PopoverContent>
            </Popover>
          </CardHeader>
          <CardContent className="grid gap-4 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <p className="text-sm font-semibold text-[#475569]">카테고리</p>
              <div className="mt-3 grid gap-3">
                <Select value={main} onValueChange={(value) => {
                  setMain(value);
                  const next = categories.find((item) => item.main === value);
                  setSub(next?.subs[0] ?? "");
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="대분류 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((item) => (
                      <SelectItem key={item.main} value={item.main}>
                        {item.main}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sub} onValueChange={setSub}>
                  <SelectTrigger>
                    <SelectValue placeholder="소분류 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .find((item) => item.main === main)
                      ?.subs.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <p className="text-sm font-semibold text-[#475569]">금액/결제</p>
              <div className="mt-3 grid gap-3">
                <Input
                  placeholder="금액 (숫자만 입력)"
                  value={amount}
                  onChange={(event) => setAmount(event.target.value)}
                />
                <Select value={method} onValueChange={setMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="결제수단" />
                  </SelectTrigger>
                  <SelectContent>
                    {paymentMethods.map((item) => (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5">
              <p className="text-sm font-semibold text-[#475569]">메모</p>
              <Textarea
                className="mt-3 min-h-[120px]"
                placeholder="메모를 입력하세요"
                value={memo}
                onChange={(event) => setMemo(event.target.value)}
              />
            </div>
          </CardContent>
          <CardContent className="flex flex-wrap items-center justify-between gap-3 pt-0">
            <p className="text-xs text-[#94a3b8]">
              저장 후 바로 아래 테이블에 반영됩니다. (페이지 리로드 없음)
            </p>
            <Button
              onClick={onSave}
              disabled={user?.role !== "admin"}
              className="transition hover:translate-y-[-1px]"
            >
              지출 저장
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>날짜별 지출 테이블</CardTitle>
              <p className="text-sm text-[#64748b]">
                {format(selectedDate, "yyyy.MM.dd")} 기준 {filtered.length}건
              </p>
            </div>
            <Badge variant="outline">실시간 반영</Badge>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>지출일</TableHead>
                  <TableHead>대분류</TableHead>
                  <TableHead>소분류</TableHead>
                  <TableHead>금액</TableHead>
                  <TableHead>결제수단</TableHead>
                  <TableHead>메모</TableHead>
                  {user?.role === "admin" && <TableHead>관리</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="text-[#1e293b]">
                      {format(row.date, "yyyy.MM.dd")}
                    </TableCell>
                    <TableCell className="text-[#1e293b]">{row.main}</TableCell>
                    <TableCell>{row.sub}</TableCell>
                    <TableCell className="font-semibold text-[#4338ca]">
                      {formatKRW(row.amount)}
                    </TableCell>
                    <TableCell>{row.method}</TableCell>
                    <TableCell className="max-w-[240px] truncate">
                      {row.memo}
                    </TableCell>
                    {user?.role === "admin" && (
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => onDelete(row.id)}
                          >
                            <Trash2 className="h-4 w-4 text-[#dc2626]" />
                          </Button>
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={user?.role === "admin" ? 7 : 6}>
                      해당 날짜에 등록된 지출이 없습니다.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
