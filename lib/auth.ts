"use client";

import type { Role } from "@/types";

const AUTH_KEY = "sl_am_auth";

export interface StoredAuth {
  role: Role;
  name: string;
  email: string;
  token: string;
}

export function setAuth(auth: StoredAuth) {
  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
  }
}

export function getAuth(): StoredAuth | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredAuth;
  } catch {
    return null;
  }
}

export function clearAuth() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_KEY);
  }
}

// Mock credentials
export const MOCK_CREDENTIALS = {
  admin: { email: "admin@starlink.io", password: "admin123", role: "ADMIN" as Role, name: "Julianne Davenport" },
  user: { email: "user@starlink.io", password: "user123", role: "USER" as Role, name: "Alex Sterling" },
};
