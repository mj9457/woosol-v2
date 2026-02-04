import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/server/auth";

export async function GET(request: Request) {
  try {
    await requireAuth(request);
    const { searchParams } = new URL(request.url);
    const y = searchParams.get("y") ?? "2026";
    return NextResponse.json({
      y,
      total: 1_482_300_000,
      months: [
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
      ],
      categories: [
        { name: "인건비", value: 560_000_000 },
        { name: "판매비와 관리비", value: 390_000_000 },
        { name: "매출원가", value: 410_000_000 },
        { name: "세금관련 비용", value: 122_300_000 },
      ],
    });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
