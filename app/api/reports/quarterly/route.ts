import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";

export async function GET(request: Request) {
  try {
    await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const y = searchParams.get("y") ?? "2026";
    const q = searchParams.get("q") ?? "1";
    return NextResponse.json({
      y,
      q,
      total: 368_200_000,
      months: [
        { name: "1월", value: 112_000_000 },
        { name: "2월", value: 128_500_000 },
        { name: "3월", value: 127_700_000 },
      ],
      categories: [
        { name: "인건비", value: 148_000_000 },
        { name: "판매비와 관리비", value: 108_200_000 },
        { name: "매출원가", value: 90_000_000 },
        { name: "세금관련 비용", value: 22_000_000 },
      ],
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
