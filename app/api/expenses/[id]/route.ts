import { NextResponse } from "next/server";
import { requireAuth, requireAdmin } from "@/lib/server/auth";

export async function PATCH(request: Request) {
  try {
    const user = await requireAuth(request);
    requireAdmin(user);
    const payload = await request.json();
    return NextResponse.json({ data: payload, updatedBy: user.uid });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await requireAuth(request);
    requireAdmin(user);
    return NextResponse.json({ deleted: true, deletedBy: user.uid });
  } catch (error) {
    if (error instanceof Response) return error;
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
