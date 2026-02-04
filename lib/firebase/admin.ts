import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccountRaw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

if (!serviceAccountRaw) {
  // Skip initialization on build if env isn't available.
  // Runtime API routes will fail fast with a helpful message.
}

const app =
  getApps().length > 0
    ? getApps()[0]
    : serviceAccountRaw
      ? initializeApp({ credential: cert(JSON.parse(serviceAccountRaw)) })
      : null;

export const adminAuth = app ? getAuth(app) : null;
