"use client";

import React from "react";
import AuthGuard from "@/app/auth-guard";
import { useAuth } from "@/app/providers";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { CalendarDays, Save } from "lucide-react";
import { formatKRW } from "@/lib/format";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase/client";

type ExpenseRow = {
  id: string;
  date: Date;
  main: string;
  sub: string;
  amount: number;
  method: string;
  memo: string;
};

type DraftRow = {
  id: string;
  main: string;
  sub: string;
  amount: string;
  method: string;
  memo: string;
  docId?: string;
  error?: string;
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
const MAX_AMOUNT = 100_000_000_000;

const DraftRowItem = React.memo(function DraftRowItem({
  row,
  onDraftChange,
  paymentMethods,
  resetKey,
}: {
  row: DraftRow;
  onDraftChange: (id: string, patch: Partial<DraftRow>) => void;
  paymentMethods: string[];
  resetKey: string;
}) {
  const [amount, setAmount] = React.useState(row.amount);
  const [memo, setMemo] = React.useState(row.memo);
  const [method, setMethod] = React.useState(row.method);
  const [error, setError] = React.useState<string | undefined>(row.error);

  React.useEffect(() => {
    setAmount(row.amount);
    setMemo(row.memo);
    setMethod(row.method);
    setError(row.error);
  }, [row.amount, row.memo, row.method, row.error, resetKey]);

  const onAmountChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value.replace(/\s+/g, "");
      if (!nextValue) {
        setAmount("");
        setError(undefined);
        onDraftChange(row.id, { amount: "", error: undefined });
        return;
      }
      if (!/^\d+$/.test(nextValue)) {
        setAmount(nextValue);
        setError("숫자만 입력할 수 있습니다.");
        onDraftChange(row.id, {
          amount: nextValue,
          error: "숫자만 입력할 수 있습니다.",
        });
        return;
      }
      const numeric = Number(nextValue);
      if (numeric > MAX_AMOUNT) {
        const capped = String(MAX_AMOUNT);
        setAmount(capped);
        setError("최대 1,000억까지 입력 가능합니다.");
        onDraftChange(row.id, {
          amount: capped,
          error: "최대 1,000억까지 입력 가능합니다.",
        });
        return;
      }
      setAmount(nextValue);
      setError(undefined);
      onDraftChange(row.id, { amount: nextValue, error: undefined });
    },
    [onDraftChange, row.id],
  );

  const onMemoChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const next = event.target.value;
      setMemo(next);
      onDraftChange(row.id, { memo: next });
    },
    [onDraftChange, row.id],
  );

  const onMethodChange = React.useCallback(
    (value: string) => {
      setMethod(value);
      onDraftChange(row.id, { method: value });
    },
    [onDraftChange, row.id],
  );

  return (
    <TableRow className={rowBgStyles[row.main] ?? "bg-white"}>
      <TableCell className="min-w-[200px] py-2">{row.sub}</TableCell>
      <TableCell className="min-w-[200px] py-2">
        <div className="space-y-1">
          <Input
            placeholder="금액 (숫자만 입력)"
            value={amount}
            onChange={onAmountChange}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </TableCell>
      <TableCell className="min-w-[180px] py-2">
        <div className="rounded-xl border border-[#d9f2d9] bg-[#f3fbf3] px-3 py-2">
          <p className="text-[11px] text-[#4b5563]">현재 입력 금액</p>
          <p className="text-sm font-semibold text-[#1b5e00]">
            {amount && /^\d+$/.test(amount) ? formatKRW(Number(amount)) : "0원"}
          </p>
        </div>
      </TableCell>
      <TableCell className="min-w-[140px] py-2">
        <Select value={method} onValueChange={onMethodChange}>
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
      </TableCell>
      <TableCell className="min-w-[220px] py-2">
        <Input
          type="text"
          placeholder="메모"
          value={memo}
          onChange={onMemoChange}
        />
      </TableCell>
    </TableRow>
  );
});

const badgeStyles: Record<string, string> = {
  인건비: "bg-[#e0f2fe] text-[#0369a1]",
  "인건비관련 4대보험/원천세": "bg-[#ecfccb] text-[#4d7c0f]",
  "판매비와 관리비": "bg-[#ede9fe] text-[#6d28d9]",
  "세금관련 비용": "bg-[#fee2e2] text-[#b91c1c]",
  "접대/기부 관련 비용": "bg-[#ffe4e6] text-[#be123c]",
  "매출원가 상품 관련": "bg-[#dcfce7] text-[#15803d]",
  "법인세 자본 관련": "bg-[#fef3c7] text-[#b45309]",
};

const rowBgStyles: Record<string, string> = {
  인건비: "bg-[#f0f9ff]",
  "인건비관련 4대보험/원천세": "bg-[#f7fee7]",
  "판매비와 관리비": "bg-[#f5f3ff]",
  "세금관련 비용": "bg-[#fef2f2]",
  "접대/기부 관련 비용": "bg-[#fff1f2]",
  "매출원가 상품 관련": "bg-[#f0fdf4]",
  "법인세 자본 관련": "bg-[#fffbeb]",
};

const buildDraftRows = (): DraftRow[] =>
  categories.flatMap((group) =>
    group.subs.map((sub) => ({
      id: `draft-${group.main}-${sub}`,
      main: group.main,
      sub,
      amount: "",
      method: paymentMethods[0],
      memo: "",
    })),
  );

export default function DailyExpensesPage() {
  const { user } = useAuth();
  const [selectedDate, setSelectedDate] = React.useState<Date>(
    new Date("2026-02-04"),
  );
  const [rows, setRows] = React.useState<ExpenseRow[]>([]);
  const [loadingRows, setLoadingRows] = React.useState(true);
  const [draftRows, setDraftRows] =
    React.useState<DraftRow[]>(buildDraftRows());
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const toastTimerRef = React.useRef<number | null>(null);
  const draftRef = React.useRef<Record<string, DraftRow>>({});

  const dateKey = format(selectedDate, "yyyy-MM-dd");
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const monthStartKey = format(monthStart, "yyyy-MM-dd");
  const monthEndKey = format(monthEnd, "yyyy-MM-dd");
  const monthDays = React.useMemo(
    () => eachDayOfInterval({ start: monthStart, end: monthEnd }),
    [monthStart, monthEnd],
  );

  React.useEffect(() => {
    const q = query(
      collection(db, "expenses"),
      where("expense_date", ">=", monthStartKey),
      where("expense_date", "<=", monthEndKey),
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const nextRows: ExpenseRow[] = snapshot.docs.map((docSnap) => {
        const data = docSnap.data() as {
          expense_date: string;
          category_main: string;
          category_sub: string;
          amount: number;
          memo?: string;
          payment_method: string;
        };
        return {
          id: docSnap.id,
          date: new Date(data.expense_date),
          main: data.category_main,
          sub: data.category_sub,
          amount: data.amount,
          method: data.payment_method,
          memo: data.memo ?? "",
        };
      });
      setRows(nextRows);
      setLoadingRows(false);
    });

    return () => unsubscribe();
  }, [monthStartKey, monthEndKey]);

  React.useEffect(() => {
    if (!toastMessage) return;
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2000);
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, [toastMessage]);

  const updateDraftRef = React.useCallback(
    (id: string, patch: Partial<DraftRow>) => {
      const current = draftRef.current[id];
      if (!current) return;
      draftRef.current[id] = { ...current, ...patch };
    },
    [],
  );

  const validateDrafts = () => {
    let hasError = false;
    setDraftRows((prev) =>
      prev.map((row) => {
        const current = draftRef.current[row.id] ?? row;
        const trimmed = current.amount.replace(/\s+/g, "");
        if (!trimmed) {
          return { ...row, error: undefined };
        }
        if (!/^\d+$/.test(trimmed)) {
          hasError = true;
          return { ...row, error: "숫자만 입력할 수 있습니다." };
        }
        if (Number(trimmed) > MAX_AMOUNT) {
          hasError = true;
          return { ...row, error: "최대 1,000억까지 입력 가능합니다." };
        }
        return { ...row, error: undefined };
      }),
    );
    return !hasError;
  };

  const onSave = async () => {
    if (!validateDrafts()) return;

    const currentRows = Object.values(draftRef.current);
    const rowsToSave = currentRows.filter(
      (row) => row.amount.trim().length > 0,
    );
    const rowsToDelete = currentRows.filter(
      (row) => row.amount.trim().length === 0 && row.docId,
    );

    if (rowsToSave.length === 0 && rowsToDelete.length === 0) return;

    await Promise.all([
      ...rowsToSave.map((row) => {
        const trimmed = row.amount.replace(/\s+/g, "");
        if (row.docId) {
          return updateDoc(doc(db, "expenses", row.docId), {
            expense_date: dateKey,
            category_main: row.main,
            category_sub: row.sub,
            amount: Number(trimmed),
            memo: row.memo,
            payment_method: row.method,
            updated_at: new Date().toISOString(),
          });
        }
        return addDoc(collection(db, "expenses"), {
          expense_date: dateKey,
          category_main: row.main,
          category_sub: row.sub,
          amount: Number(trimmed),
          memo: row.memo,
          payment_method: row.method,
          created_by: user?.uid ?? "unknown",
          created_at: new Date().toISOString(),
        });
      }),
      ...rowsToDelete.map((row) => deleteDoc(doc(db, "expenses", row.docId!))),
    ]);

    setToastMessage("저장되었습니다.");
  };

  const amountMap = React.useMemo(() => {
    const map = new Map<string, number>();
    rows.forEach((row) => {
      const dateKey = format(row.date, "yyyy-MM-dd");
      const key = `${row.main}||${row.sub}||${dateKey}`;
      map.set(key, (map.get(key) ?? 0) + row.amount);
    });
    return map;
  }, [rows]);

  const getAmount = (main: string, sub: string, dateKey: string) =>
    amountMap.get(`${main}||${sub}||${dateKey}`) ?? 0;

  const getSubTotal = (main: string, sub: string) =>
    monthDays.reduce((sum, day) => {
      const key = format(day, "yyyy-MM-dd");
      return sum + getAmount(main, sub, key);
    }, 0);

  const getGroupTotals = (main: string) =>
    monthDays.map((day) => {
      const key = format(day, "yyyy-MM-dd");
      return (
        categories
          .find((group) => group.main === main)
          ?.subs.reduce((sum, sub) => sum + getAmount(main, sub, key), 0) ?? 0
      );
    });

  const getGroupTotalSum = (main: string) =>
    getGroupTotals(main).reduce((sum, value) => sum + value, 0);

  const overallTotalsByDay = monthDays.map((day) => {
    const key = format(day, "yyyy-MM-dd");
    return categories.reduce((sum, group) => {
      return (
        sum +
        group.subs.reduce(
          (subSum, sub) => subSum + getAmount(group.main, sub, key),
          0,
        )
      );
    }, 0);
  });

  const overallTotal = overallTotalsByDay.reduce(
    (sum, value) => sum + value,
    0,
  );

  const draftRowsByMain = React.useMemo(() => {
    const map = new Map<string, DraftRow[]>();
    categories.forEach((group) => {
      map.set(
        group.main,
        draftRows.filter((row) => row.main === group.main),
      );
    });
    return map;
  }, [draftRows]);

  const existingByKey = React.useMemo(() => {
    const map = new Map<
      string,
      { id: string; amount: number; method: string; memo: string }
    >();
    rows.forEach((row) => {
      if (format(row.date, "yyyy-MM-dd") !== dateKey) return;
      const key = `${row.main}||${row.sub}`;
      if (!map.has(key)) {
        map.set(key, {
          id: row.id,
          amount: row.amount,
          method: row.method,
          memo: row.memo,
        });
      }
    });
    return map;
  }, [rows, dateKey]);

  React.useEffect(() => {
    setDraftRows(
      buildDraftRows().map((row) => {
        const existing = existingByKey.get(`${row.main}||${row.sub}`);
        if (!existing) {
          return { ...row, amount: "", memo: "", docId: undefined };
        }
        return {
          ...row,
          amount: String(existing.amount),
          method: existing.method,
          memo: existing.memo,
          docId: existing.id,
          error: undefined,
        };
      }),
    );
  }, [existingByKey]);

  React.useEffect(() => {
    draftRef.current = Object.fromEntries(
      draftRows.map((row) => [row.id, row]),
    );
  }, [draftRows]);

  return (
    <AuthGuard>
      <div className="flex flex-col gap-8 pb-24">
        {toastMessage && (
          <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-[#1b5e00] px-6 py-3 text-sm font-semibold text-white shadow-lg">
            {toastMessage}
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-[#64748b]">날짜별 지출결의서</p>
            <h1 className="font-[var(--font-space-grotesk)] text-2xl font-bold text-[#312e81]">
              날짜별 지출 테이블
            </h1>
          </div>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>지출 등록 테이블</CardTitle>
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
          <CardContent className="space-y-4">
            <div className="w-full max-w-full overflow-x-auto">
              <Table className="w-full table-fixed">
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-2">소분류</TableHead>
                    <TableHead className="py-2">금액</TableHead>
                    <TableHead className="py-2">금액 표시</TableHead>
                    <TableHead className="py-2">결제수단</TableHead>
                    <TableHead className="py-2">메모</TableHead>
                  </TableRow>
                </TableHeader>
                {categories.map((group) => {
                  const groupRows = draftRowsByMain.get(group.main) ?? [];
                  if (groupRows.length === 0) return null;
                  return (
                    <React.Fragment key={group.main}>
                      <TableBody>
                        <TableRow className="bg-white">
                          <TableCell
                            colSpan={1}
                            className="border-t-2 border-[#cbd5f5] py-3"
                          >
                            <div className="flex items-center justify-center">
                              <Badge
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeStyles[group.main] ?? "bg-[#eef2ff] text-[#4338ca]"}`}
                              >
                                {group.main}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell
                            colSpan={4}
                            className="border-t-2 border-[#cbd5f5] py-3"
                          ></TableCell>
                        </TableRow>
                      </TableBody>
                      <TableBody>
                        {groupRows.map((row) => (
                          <DraftRowItem
                            key={row.id}
                            row={row}
                            onDraftChange={updateDraftRef}
                            paymentMethods={paymentMethods}
                            resetKey={dateKey}
                          />
                        ))}
                      </TableBody>
                    </React.Fragment>
                  );
                })}
              </Table>
            </div>
          </CardContent>
        </Card>

        <div className="sticky bottom-4 z-20 flex justify-end pointer-events-none">
          <Button
            disabled={user?.role !== "admin"}
            onClick={onSave}
            className="gap-2 shadow-lg pointer-events-auto"
          >
            <Save className="h-4 w-4" />
            일괄 저장
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>날짜별 지출 테이블</CardTitle>
              <p className="text-sm text-[#64748b]">
                {format(selectedDate, "yyyy.MM")} 기준{" "}
                {loadingRows ? "불러오는 중..." : `${rows.length}건`}
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
          <CardContent>
            <div className="w-full max-w-full overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[180px]">지출 내역</TableHead>
                    {monthDays.map((day) => (
                      <TableHead
                        key={format(day, "yyyy-MM-dd")}
                        className="min-w-[90px]"
                      >
                        {format(day, "M월 d일")}
                      </TableHead>
                    ))}
                    <TableHead className="min-w-[120px]">합계</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((group) => {
                    const groupTotals = getGroupTotals(group.main);
                    return (
                      <React.Fragment key={group.main}>
                        <TableRow className="bg-white">
                          <TableCell
                            colSpan={1}
                            className="border-t-2 border-[#cbd5f5] py-3"
                          >
                            <div className="flex items-center justify-center">
                              <Badge
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${badgeStyles[group.main] ?? "bg-[#eef2ff] text-[#4338ca]"}`}
                              >
                                {group.main}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell
                            colSpan={monthDays.length + 1}
                            className="border-t-2 border-[#cbd5f5] py-3"
                          ></TableCell>
                        </TableRow>
                        {group.subs.map((sub) => {
                          const rowTotal = getSubTotal(group.main, sub);
                          return (
                            <TableRow
                              key={`${group.main}-${sub}`}
                              className={rowBgStyles[group.main] ?? "bg-white"}
                            >
                              <TableCell className="font-medium text-[#0f172a]">
                                {sub}
                              </TableCell>
                              {monthDays.map((day) => {
                                const key = format(day, "yyyy-MM-dd");
                                const amount = getAmount(group.main, sub, key);
                                return (
                                  <TableCell
                                    key={`${sub}-${key}`}
                                    className="text-center"
                                  >
                                    {amount > 0 ? formatKRW(amount) : "-"}
                                  </TableCell>
                                );
                              })}
                              <TableCell className="font-semibold text-[#4338ca]">
                                {rowTotal > 0 ? formatKRW(rowTotal) : "-"}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                        <TableRow className="bg-[#f8fafc]">
                          <TableCell className="font-semibold text-[#1f2937]">
                            {group.main} 합계
                          </TableCell>
                          {groupTotals.map((value, index) => (
                            <TableCell
                              key={`${group.main}-total-${index}`}
                              className="font-semibold text-[#1f2937]"
                            >
                              {value > 0 ? formatKRW(value) : "-"}
                            </TableCell>
                          ))}
                          <TableCell className="font-semibold text-[#1e40af]">
                            {getGroupTotalSum(group.main) > 0
                              ? formatKRW(getGroupTotalSum(group.main))
                              : "-"}
                          </TableCell>
                        </TableRow>
                      </React.Fragment>
                    );
                  })}
                  <TableRow className="bg-[#eef2ff]">
                    <TableCell className="font-bold text-[#1e3a8a]">
                      총합계
                    </TableCell>
                    {overallTotalsByDay.map((value, index) => (
                      <TableCell
                        key={`overall-${index}`}
                        className="font-bold text-[#1e3a8a]"
                      >
                        {value > 0 ? formatKRW(value) : "-"}
                      </TableCell>
                    ))}
                    <TableCell className="font-bold text-[#1e3a8a]">
                      {overallTotal > 0 ? formatKRW(overallTotal) : "-"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AuthGuard>
  );
}
