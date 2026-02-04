import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";

export async function GET(request: Request) {
  try {
    await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const ym = searchParams.get("ym") ?? "2026-02";
    return NextResponse.json({
      ym,
      total: 128_500_000,
      diff: 12_300_000,
      diffRate: 0.104,
      categories: [
        { name: "인건비", value: 52_000_000 },
        { name: "판매비와 관리비", value: 38_500_000 },
        { name: "매출원가", value: 31_000_000 },
        { name: "세금관련 비용", value: 7_000_000 },
      ],
      monthlyTrend: [
        { name: "1월", value: 98_000_000 },
        { name: "2월", value: 128_500_000 },
      ],
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
