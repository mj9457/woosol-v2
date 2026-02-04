import { NextResponse } from "next/server";
import { requireAuth, requireAdmin } from "@/lib/server/auth";
import { mockExpenses } from "@/lib/data/mock-expenses";

export async function GET(request: Request) {
  try {
    await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");
    const filtered = date
      ? mockExpenses.filter((exp) => exp.expense_date === date)
      : mockExpenses;
    return NextResponse.json({ data: filtered });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth(request);
    requireAdmin(user);
    const payload = await request.json();
    return NextResponse.json({ data: payload, createdBy: user.uid });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
