export type Expense = {
  id: string;
  expense_date: string;
  category_main: string;
  category_sub: string;
  amount: number;
  memo?: string;
  payment_method: string;
  created_by: string;
};

export const mockExpenses: Expense[] = [
  {
    id: "exp-1",
    expense_date: "2026-02-04",
    category_main: "인건비",
    category_sub: "급여",
    amount: 3_200_000,
    memo: "현장 인건비",
    payment_method: "계좌이체",
    created_by: "admin",
  },
  {
    id: "exp-2",
    expense_date: "2026-02-04",
    category_main: "판매비와 관리비",
    category_sub: "사무소 관리비",
    amount: 820_000,
    memo: "사무실 관리비",
    payment_method: "법인카드",
    created_by: "admin",
  },
  {
    id: "exp-3",
    expense_date: "2026-02-03",
    category_main: "매출원가",
    category_sub: "상품(외주비 시공비 등 공사원가 계정 포함)",
    amount: 6_500_000,
    memo: "외주비 정산",
    payment_method: "계좌이체",
    created_by: "admin",
  },
];
