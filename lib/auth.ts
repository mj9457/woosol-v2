export type UserRole = "admin" | "staff";

const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);

export function resolveRoleByEmail(email?: string | null): UserRole {
  if (!email) return "staff";
  return adminEmails.includes(email) ? "admin" : "staff";
}
