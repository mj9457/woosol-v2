"use client";

import React from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase/client";
import { resolveRoleByEmail, type UserRole } from "@/lib/auth";

type AuthState = {
  user: {
    uid: string;
    email: string | null;
    name: string | null;
    photoUrl: string | null;
    role: UserRole;
  } | null;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>({
    user: null,
    loading: true,
    signIn: async () => undefined,
    signOut: async () => undefined,
  });

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState((prev) => ({ ...prev, user: null, loading: false }));
        return;
      }

      const role = resolveRoleByEmail(user.email);
      setState((prev) => ({
        ...prev,
        user: {
          uid: user.uid,
          email: user.email,
          name: user.displayName,
          photoUrl: user.photoURL,
          role,
        },
        loading: false,
      }));
    });

    return () => unsubscribe();
  }, []);

  const signIn = React.useCallback(async () => {
    await signInWithPopup(auth, googleProvider);
  }, []);

  const signOut = React.useCallback(async () => {
    await firebaseSignOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
