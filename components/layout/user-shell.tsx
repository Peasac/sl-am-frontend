"use client";

import { Sidebar } from "./sidebar";
import { Bell, HelpCircle, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

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
        <header className="h-14 bg-white border-b border-gray-100 flex items-center justify-between px-6 flex-shrink-0">
          <nav className="flex items-center gap-6">
            <span className="font-bold text-[#6090E3] text-base">AssetGuard Pro</span>
            {topNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === item.href ? "text-[#6090E3]" : "text-gray-500 hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="relative w-48">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search assets..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6090E3] focus:border-transparent placeholder:text-gray-400"
              />
            </div>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
              <Bell size={18} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500">
              <HelpCircle size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-white text-xs font-semibold">
              {initials}
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
