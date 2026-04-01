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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

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
    <aside className="sa-subsection flex min-h-screen w-55 flex-col py-4">
      {/* Logo */}
      <div className="px-5 mb-7">
        <div className="flex items-center gap-2.5">
          <span className="font-bold text-on-surface text-[25px] tracking-tight">StarLink</span>
        </div>
      </div>

      {/* User info */}
      <div className="mx-4 mb-6 rounded-xl bg-surface px-4 py-3">
        <p className="text-[11px] font-bold text-on-surface uppercase tracking-widest truncate">{userName}</p>
        <p className="text-[11px] text-on-surface-variant mt-0.5">{orgName}</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "h-auto w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-150",
                isActive
                  ? "sa-primary-gradient hover:brightness-105 hover:text-primary-foreground"
                  : "text-on-surface-variant hover:bg-surface hover:text-on-surface"
              )}
            >
              <Link href={item.href}>
                <span className={cn(
                  "transition-colors duration-150",
                  isActive ? "text-surface" : "text-on-surface-variant group-hover:text-surface-tint"
                )}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-surface" />
                )}
              </Link>
            </Button>
          );
        })}
      </nav>

      {/* New Asset CTA */}
      {newAssetHref && (
        <div className="px-4 mt-5">
          <Button
            asChild
            className="sa-primary-gradient h-10 w-full rounded-md text-[13px] font-semibold hover:brightness-110"
          >
            <Link href={newAssetHref}>
              <Plus size={14} />
              New Asset
            </Link>
          </Button>
        </div>
      )}

      {/* Bottom */}
      <div className="px-3 mt-4 pt-4 space-y-0.5">
        <Button
          variant="ghost"
          className="h-auto w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-on-surface-variant hover:bg-surface hover:text-on-surface"
        >
          <HelpCircle size={15} className="text-on-surface-variant" />
          Support
        </Button>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="h-auto w-full justify-start gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium text-on-surface-variant hover:bg-error-container hover:text-error"
        >
          <LogOut size={15} className="text-on-surface-variant" />
          Logout
        </Button>
      </div>
    </aside>
  );
}
