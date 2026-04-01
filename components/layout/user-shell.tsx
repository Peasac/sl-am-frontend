"use client";

import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";

interface UserShellProps {
  children: React.ReactNode;
  userName?: string;
}

export function UserShell({ children, userName = "Alex" }: UserShellProps) {
  return (
    <div className="sa-shell flex h-screen overflow-hidden">
      <Sidebar role="USER" userName={userName} orgName="Employee Portal" />
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top navbar */}
        <Navbar placeholder="Quick search assets..." userName={userName} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
