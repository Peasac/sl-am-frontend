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
      className="h-14.5 flex items-center justify-between px-6 shrink-0"
      style={{
        background: "#ffffff",
        borderBottom: "1px solid #edf0f5",
      }}
    >
      {/* Search */}
      <div className="relative w-64 group">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0bfcc] transition-colors duration-150 group-focus-within:text-primary" />
        <input
          type="text"
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 text-[13px] rounded-xl transition-all duration-150 placeholder:text-[#b8c8d8] focus:outline-none"
          style={{
            background: "#f7f9fc",
            border: "1.5px solid #edf0f5",
            color: "#080f1e",
          }}
          onFocus={(e) => {
            e.currentTarget.style.border = "1.5px solid #6090E3";
            e.currentTarget.style.background = "#ffffff";
            e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,144,227,0.10)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.border = "1.5px solid #edf0f5";
            e.currentTarget.style.background = "#f7f9fc";
            e.currentTarget.style.boxShadow = "none";
          }}
        />
      </div>

      {/* Right icons */}
      <div className="flex items-center gap-2">
        {[Bell, HelpCircle].map((Icon, i) => (
          <button
            key={i}
            className="w-8 h-8 flex items-center justify-center rounded-xl text-[#8a9fb8] transition-all duration-150 hover:text-[#1a4680]"
            style={{ background: "transparent" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f9"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            <Icon size={17} />
          </button>
        ))}
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold ml-1 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #1a4680, #6090E3)",
            boxShadow: "0 2px 8px rgba(96,144,227,0.35)",
          }}
        >
          {initials}
        </div>
      </div>
    </header>
  );
}
