"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

interface AdminShellProps {
  children: React.ReactNode;
  userName?: string;
}

export function AdminShell({ children, userName = "Secure Architect" }: AdminShellProps) {
  return (
    <div className="sa-shell flex h-screen overflow-hidden">
      <Sidebar role="ADMIN" userName={userName} orgName="Asset Management" newAssetHref="/admin/assets/new" />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar placeholder="Quick search assets..." userName={userName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
