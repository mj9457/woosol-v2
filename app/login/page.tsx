"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Chrome } from "lucide-react";
import { useAuth } from "@/app/providers";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  const { user, loading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, router, user]);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#f7f8fb] px-6 py-12">
      <Card className="w-full max-w-[420px] border border-[#e2e8f0] bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
        <CardHeader className="items-center gap-4 text-center">
          <div className="flex flex-col items-center gap-3">
            <Image
              src="/logo_final.jpg"
              alt="Woosol"
              width={108}
              height={108}
              className="h-28 w-28 rounded-2xl object-contain"
              priority
            />
            <div>
              <CardTitle className="text-[22px]">재무 관리 시스템</CardTitle>
              <p className="mt-1 text-xs text-[#94a3b8]">Woosol Finance</p>
            </div>
          </div>
          <p className="text-sm text-[#64748b]">로그인하여 시스템에 접속하세요</p>
        </CardHeader>
        <CardContent className="space-y-5 pt-0">
          <Button
            className="h-11 w-full rounded-xl bg-[#0f172a] text-sm font-semibold text-white hover:bg-[#1e293b]"
            onClick={() => signIn()}
          >
            <Chrome className="h-4 w-4" />
            Google로 로그인
          </Button>

          <div className="relative flex items-center text-xs text-[#94a3b8]">
            <div className="h-px flex-1 bg-[#e2e8f0]" />
            <span className="px-3">권한 안내</span>
            <div className="h-px flex-1 bg-[#e2e8f0]" />
          </div>

          <div className="rounded-xl bg-[#f8fafc] p-4 text-xs text-[#475569]">
            <p className="font-semibold text-[#1e293b]">권한 안내</p>
            <ul className="mt-2 space-y-1">
              <li>• Admin: 모든 기능 사용 가능</li>
              <li>• Staff: 조회만 가능 (작성/수정/삭제 불가)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
