"use client";

import { Sidebar } from "./sidebar";
import { Bell, HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Navbar } from "./navbar";

const topNav = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "My Assets", href: "/dashboard/assets" },
  { label: "Support", href: "/dashboard/support" },
];

interface UserShellProps {
  children: React.ReactNode;
  userName?: string;
}

export function UserShell({ children, userName = "Alex" }: UserShellProps) {
  const pathname = usePathname();
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar role="USER" userName={userName} orgName="Employee Portal" />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <Navbar placeholder="Quick search assets..." userName={userName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
