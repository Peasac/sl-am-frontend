"use client";

import { useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { mockUsers } from "@/lib/mock-data";
import {
  UserPlus, Users, Package, ChevronLeft, ChevronRight,
  MoreVertical, Search, UserCheck, Activity,
} from "lucide-react";

const avatarGradients = [
  "linear-gradient(135deg, #1a4680, #6090E3)",
  "linear-gradient(135deg, #5b21b6, #8b5cf6)",
  "linear-gradient(135deg, #0f766e, #34d399)",
  "linear-gradient(135deg, #b45309, #fb923c)",
];

const roleStyle: Record<string, { bg: string; color: string; border: string }> = {
  ADMIN: { bg: "rgba(96,144,227,0.1)",  color: "#1a4680", border: "rgba(96,144,227,0.2)"  },
  USER:  { bg: "rgba(18,183,106,0.08)", color: "#0a6644", border: "rgba(18,183,106,0.18)" },
};

const statsCards = [
  { label: "Total Users",          value: "1,284", sub: "+12 this month",   subColor: "#12B76A", icon: Users,     accent: "#6090E3", accentBg: "rgba(96,144,227,0.08)",  accentBorder: "rgba(96,144,227,0.16)" },
  { label: "Users with Assets",    value: "1,102", sub: "86% coverage",     subColor: "#6090E3", icon: UserCheck, accent: "#12B76A", accentBg: "rgba(18,183,106,0.08)",  accentBorder: "rgba(18,183,106,0.16)" },
  { label: "Users without Assets", value: "182",   sub: "Needs assignment", subColor: "#f59e0b", icon: Package,   accent: "#f59e0b", accentBg: "rgba(245,158,11,0.07)",  accentBorder: "rgba(245,158,11,0.16)" },
];

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filtered = mockUsers.filter((u) => {
    const q = search.toLowerCase();
    const deptMatch = department === "All Departments" || u.department === department;
    const roleMatch = roleFilter === "All Roles" || u.role === roleFilter;
    const searchMatch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return deptMatch && roleMatch && searchMatch;
  });

  return (
    <AdminShell userName="Secure Architect">
      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">Users</h1>
            <p className="text-[13px] text-[#8a9fb8] mt-0.5">
              Manage organizational access, roles, and asset assignments.
            </p>
          </div>
          <button
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-white transition-all duration-150"
            style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: "0 2px 10px rgba(96,144,227,0.35)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(96,144,227,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(96,144,227,0.35)"; }}
          >
            <UserPlus size={14} /> Invite User
          </button>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-3 gap-4">
          {statsCards.map(({ label, value, sub, subColor, icon: Icon, accent, accentBg, accentBorder }) => (
            <div
              key={label}
              className="rounded-2xl p-5 relative overflow-hidden transition-shadow duration-150"
              style={{ background: "#ffffff", border: `1px solid ${accentBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 4px 16px ${accentBg}, 0 1px 4px rgba(0,0,0,0.04)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: accent }} />
              <div className="flex items-center justify-between mb-4 mt-1">
                <p className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-widest">{label}</p>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accentBg }}>
                  <Icon size={15} style={{ color: accent }} />
                </div>
              </div>
              <p className="text-[1.85rem] font-bold text-[#080f1e] tracking-tight leading-none">{value}</p>
              <p className="text-[12px] font-semibold mt-2.5" style={{ color: subColor }}>{sub}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div className="flex gap-4 items-end flex-wrap">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-widest">Search</label>
              <div className="relative group">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0bfcc] transition-colors duration-150 group-focus-within:text-primary" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name or email..."
                  className="pl-10 pr-4 py-2.5 text-[13px] rounded-xl w-64 placeholder:text-[#b8c8d8] focus:outline-none transition-all duration-150"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#080f1e" }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #6090E3"; e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,144,227,0.10)"; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1.5px solid #edf0f5"; e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>
            {[
              { label: "Department", value: department, set: setDepartment, options: ["All Departments", "Engineering", "Design", "HR", "Finance", "Operations"] },
              { label: "Role", value: roleFilter, set: setRoleFilter, options: ["All Roles", "ADMIN", "USER"] },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-widest">{f.label}</label>
                <select
                  value={f.value}
                  onChange={(e) => f.set(e.target.value)}
                  className="px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 font-medium appearance-none cursor-pointer"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#3a5070", minWidth: 160 }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #6090E3"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,144,227,0.10)"; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1.5px solid #edf0f5"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl" style={{ background: "rgba(96,144,227,0.07)", border: "1px solid rgba(96,144,227,0.16)" }}>
              <Activity size={12} className="text-primary" />
              <span className="text-[12px] font-bold text-[#1a4680]">{filtered.length} users</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f4f8", background: "#fafbfe" }}>
                {["User", "Role", "Department", "Assets", "Last Login", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => {
                const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
                const gradIdx = user.id.charCodeAt(1) % avatarGradients.length;
                const rs = roleStyle[user.role] ?? roleStyle.USER;
                return (
                  <tr
                    key={user.id}
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f7f9fc" : "none" }}
                    className="transition-colors duration-100 hover:bg-[#f7fbff] group"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                          style={{ background: avatarGradients[gradIdx], boxShadow: "0 2px 6px rgba(0,0,0,0.12)" }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-[#080f1e] group-hover:text-primary transition-colors duration-150">{user.name}</p>
                          <p className="text-[11px] text-[#b0bfcc] mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide"
                        style={{ background: rs.bg, color: rs.color, border: `1px solid ${rs.border}` }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#5a7090]">{user.department}</td>
                    <td className="px-5 py-4">
                      <span className="text-[12px] font-bold text-[#080f1e]">{user.assetCount ?? 1}</span>
                      <span className="text-[11px] text-[#b0bfcc] ml-1">assigned</span>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-[#8a9fb8]">{user.lastLogin}</td>
                    <td className="px-5 py-4">
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] transition-all duration-150"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#edf2fb"; e.currentTarget.style.color = "#6090E3"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b0bfcc"; }}
                      >
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderTop: "1px solid #f0f4f8", background: "#fafbfe" }}>
            <p className="text-[12px] text-[#8a9fb8]">
              Showing <span className="font-bold text-[#3a5070]">{filtered.length}</span> of <span className="font-bold text-[#3a5070]">1,284</span> users
            </p>
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] transition-all duration-150"
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <ChevronLeft size={14} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-[13px] font-semibold transition-all duration-150"
                  style={p === 1
                    ? { background: "linear-gradient(135deg, #1a4680, #6090E3)", color: "#ffffff", boxShadow: "0 2px 6px rgba(96,144,227,0.35)" }
                    : { color: "#8a9fb8" }}
                  onMouseEnter={(e) => { if (p !== 1) e.currentTarget.style.background = "#f0f4f8"; }}
                  onMouseLeave={(e) => { if (p !== 1) e.currentTarget.style.background = "transparent"; }}
                >
                  {p}
                </button>
              ))}
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] transition-all duration-150"
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
