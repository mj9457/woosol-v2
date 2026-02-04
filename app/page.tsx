"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";

export default function RootRedirectPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [loading, router, user]);

  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center text-sm text-[#64748b]">
      이동 중...
    </div>
  );
}
