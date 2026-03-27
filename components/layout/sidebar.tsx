"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  LogOut,
  HelpCircle,
  Plus,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAuth } from "@/lib/auth";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={16} /> },
  { label: "Inventory", href: "/admin/assets", icon: <Package size={16} /> },
  { label: "Users", href: "/admin/users", icon: <Users size={16} /> },
  { label: "Settings", href: "/admin/settings", icon: <Settings size={16} /> },
];

const userNav: NavItem[] = [
  { label: "My Assets", href: "/dashboard/assets", icon: <Package size={16} /> },
  { label: "Support", href: "/dashboard/support", icon: <HelpCircle size={16} /> },
  { label: "Settings", href: "/dashboard/settings", icon: <Settings size={16} /> },
];

interface SidebarProps {
  role: "ADMIN" | "USER";
  userName?: string;
  orgName?: string;
  newAssetHref?: string;
}

export function Sidebar({ role, userName = "Secure Architect", orgName = "Asset Management", newAssetHref }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const navItems = role === "ADMIN" ? adminNav : userNav;

  function handleLogout() {
    clearAuth();
    router.push("/login");
  }

  return (
    <aside
      className="flex flex-col w-[220px] min-h-screen py-6"
      style={{
        background: "#ffffff",
        borderRight: "1px solid #edf0f5",
      }}
    >
      {/* Logo */}
      <div className="px-5 mb-7">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #1a4680, #6090E3)",
              boxShadow: "0 4px 12px rgba(96,144,227,0.3)",
            }}
          >
            <Shield size={14} className="text-white" />
          </div>
          <span className="font-bold text-[#080f1e] text-[25px] tracking-tight">StarLink</span>
        </div>
      </div>

      {/* User info */}
      <div className="px-5 mb-6 pb-5" style={{ borderBottom: "1px solid #edf0f5" }}>
        <p className="text-[11px] font-bold text-[#080f1e] uppercase tracking-[0.1em] truncate">{userName}</p>
        <p className="text-[11px] text-[#b0bfcc] mt-0.5">{orgName}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 group",
                isActive
                  ? "text-[#1a4680]"
                  : "text-[#5a7090] hover:text-[#0d2540]"
              )}
              style={isActive ? {
                background: "linear-gradient(135deg, rgba(96,144,227,0.1), rgba(26,70,128,0.06))",
                boxShadow: "inset 0 0 0 1px rgba(96,144,227,0.15)",
              } : {}}
            >
              <span className={cn(
                "transition-colors duration-150",
                isActive ? "text-[#6090E3]" : "text-[#a0b4c8] group-hover:text-[#6090E3]"
              )}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#6090E3]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* New Asset CTA */}
      {newAssetHref && (
        <div className="px-4 mt-5">
          <Link
            href={newAssetHref}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-white text-[13px] font-semibold transition-all duration-150"
            style={{
              background: "linear-gradient(135deg, #0e2a4e, #1a4680)",
              boxShadow: "0 3px 10px rgba(10,37,64,0.25), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            <Plus size={14} />
            New Asset
          </Link>
        </div>
      )}

      {/* Bottom */}
      <div className="px-3 mt-4 pt-4 space-y-0.5" style={{ borderTop: "1px solid #edf0f5" }}>
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[13px] text-[#8a9fb8] hover:text-[#3a5070] hover:bg-[#f5f8fc] transition-all duration-150">
          <HelpCircle size={15} className="text-[#b0bfcc]" />
          Support
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[13px] text-[#8a9fb8] hover:text-red-500 hover:bg-red-50 transition-all duration-150"
        >
          <LogOut size={15} className="text-[#b0bfcc]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
