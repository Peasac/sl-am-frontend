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
  { label: "Dashboard", href: "/user/dashboard", icon: <LayoutDashboard size={16}/> },
  { label: "My Assets", href: "/user/assets", icon: <Package size={16} /> },
  // { label: "Support", href: "/dashboard/support", icon: <HelpCircle size={16} /> },
  // { label: "Settings", href: "/dashboard/settings", icon: <Settings size={16} /> },
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
      className="sa-subsection flex flex-col w-[220px] min-h-screen py-4"
    >
      {/* Logo */}
      <div className="px-5 mb-7">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-on-surface text-[25px] tracking-tight">StarLink</span>
        </div>
      </div>

      {/* User info */}
      <div className="mx-4 mb-6 rounded-xl bg-surface px-4 py-3">
        <p className="text-[11px] font-bold text-on-surface uppercase tracking-[0.1em] truncate">{userName}</p>
        <p className="text-[11px] text-on-surface-variant mt-0.5">{orgName}</p>
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
                  ? "text-surface"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
              style={isActive ? {
                background: "linear-gradient(135deg, #001d44, #00326b)",
              } : {}}
            >
              <span className={cn(
                "transition-colors duration-150",
                isActive ? "text-surface" : "text-on-surface-variant group-hover:text-surface-tint"
              )}>
                {item.icon}
              </span>
              {item.label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-surface" />
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
            className="sa-primary-gradient flex items-center justify-center gap-2 w-full py-2.5 rounded-md text-[13px] font-semibold transition-all duration-150 hover:brightness-110"
          >
            <Plus size={14} />
            New Asset
          </Link>
        </div>
      )}

      {/* Bottom */}
      <div className="px-3 mt-4 pt-4 space-y-0.5">
        <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[13px] text-on-surface-variant hover:text-on-surface hover:bg-surface transition-all duration-150">
          <HelpCircle size={15} className="text-on-surface-variant" />
          Support
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-[13px] text-on-surface-variant hover:text-error hover:bg-error-container transition-all duration-150"
        >
          <LogOut size={15} className="text-on-surface-variant" />
          Logout
        </button>
      </div>
    </aside>
  );
}
