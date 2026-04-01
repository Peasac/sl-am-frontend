"use client";

import { Bell, HelpCircle, Search } from "lucide-react";

interface NavbarProps {
  placeholder?: string;
  userName?: string;
}

export function Navbar({ placeholder = "Search assets...", userName = "SA" }: NavbarProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className="h-14.5 flex items-center justify-between px-6 shrink-0 bg-surface"
    >
      {/* Search */}
      <div className="relative w-64 group">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors duration-150 group-focus-within:text-primary" />
        <input
          type="text"
          placeholder={placeholder}
          className="sa-input w-full pl-10 pr-4 py-2 text-[13px] rounded-md placeholder:text-on-surface-variant"
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        {[Bell, HelpCircle].map((Icon, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-on-surface-variant transition-all duration-150 hover:text-primary hover:bg-surface-container-low"
          >
            <Icon size={17} />
          </button>
        ))}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold ml-1 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #001d44, #00326b)",
          }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
