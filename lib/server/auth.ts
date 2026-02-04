import { adminAuth } from "@/lib/firebase/admin";
import { resolveRoleByEmail, type UserRole } from "@/lib/auth";

export type AuthUser = {
  uid: string;
  email: string | null;
  role: UserRole;
};

export async function requireAuth(request: Request): Promise<AuthUser> {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    throw new Response("Unauthorized", { status: 401 });
  }

  if (!adminAuth) {
    throw new Response("Firebase admin not configured", { status: 500 });
  }

  const decoded = await adminAuth.verifyIdToken(token);
  const role = resolveRoleByEmail(decoded.email);
  return {
    uid: decoded.uid,
    email: decoded.email ?? null,
    role,
  };
}

export function requireAdmin(user: AuthUser) {
  if (user.role !== "admin") {
    throw new Response("Forbidden", { status: 403 });
  }
}
