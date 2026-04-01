"use client";

import { useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { mockUsers } from "@/lib/mock-data";
import {
  UserPlus, Users, Package, ChevronLeft, ChevronRight,
  MoreVertical, Search, UserCheck, Activity, X, Mail, Send,
} from "lucide-react";

const avatarGradients = [
  "linear-gradient(135deg, #1a4680, #6090E3)",
  "linear-gradient(135deg, #5b21b6, #8b5cf6)",
  "linear-gradient(135deg, #0f766e, #34d399)",
  "linear-gradient(135deg, #b45309, #fb923c)",
];

const roleStyle: Record<string, { bg: string; color: string }> = {
  ADMIN: { bg: "rgba(96,144,227,0.1)",  color: "#1a4680" },
  USER:  { bg: "rgba(18,183,106,0.08)", color: "#0a6644" },
};

const statsCards = [
  { label: "Total Users",          value: "1,284", sub: "+12 this month",   subColor: "#12B76A", icon: Users,     accent: "#6090E3", accentBg: "rgba(96,144,227,0.08)",  accentBorder: "rgba(96,144,227,0.16)" },
  { label: "Users with Assets",    value: "1,102", sub: "86% coverage",     subColor: "#6090E3", icon: UserCheck, accent: "#12B76A", accentBg: "rgba(18,183,106,0.08)",  accentBorder: "rgba(18,183,106,0.16)" },
  { label: "Users without Assets", value: "182",   sub: "Needs assignment", subColor: "#f59e0b", icon: Package,   accent: "#f59e0b", accentBg: "rgba(245,158,11,0.07)",  accentBorder: "rgba(245,158,11,0.16)" },
];

const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.border = "1px solid #001d44";
  e.currentTarget.style.background = "#ffffff";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,93,173,0.24)";
};
const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
  e.currentTarget.style.border = "1px solid rgba(195,198,209,0.15)";
  e.currentTarget.style.background = "#f7f9fc";
  e.currentTarget.style.boxShadow = "none";
};

export default function UsersPage() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All Departments");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  // Create user modal state
  const [showCreate, setShowCreate]   = useState(false);
  const [newName, setNewName]         = useState("");
  const [newEmail, setNewEmail]       = useState("");
  const [newDept, setNewDept]         = useState("Engineering");
  const [emailSent, setEmailSent]     = useState(false);

  function handleSendEmail() {
    if (!newEmail) return;
    setEmailSent(true);
  }

  function handleCreateUser() {
    setShowCreate(false);
    setNewName(""); setNewEmail(""); setNewDept("Engineering"); setEmailSent(false);
  }

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
            onClick={() => { setShowCreate(true); setEmailSent(false); }}
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
        <div className="rounded-2xl p-4 bg-surface-container-low">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-widest">Search</label>
              <div className="relative group">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors duration-150 group-focus-within:text-primary" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by name or email..."
                  className="sa-input pl-10 pr-4 py-2.5 text-[13px] rounded-md w-64 placeholder:text-on-surface-variant"
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
                  className="sa-input px-3.5 py-2.5 text-[13px] rounded-md transition-all duration-150 font-medium appearance-none cursor-pointer"
                  style={{ minWidth: 160 }}
                >
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl bg-surface">
              <Activity size={12} className="text-primary" />
              <span className="text-[12px] font-bold text-primary">{filtered.length} users</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden bg-surface-container-low p-2">
          <table className="sa-table w-full">
            <thead>
              <tr className="bg-surface-container-low">
                {["User", "Role", "Department", "Assets", "Last Login", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => {
                const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
                const gradIdx = user.id.charCodeAt(1) % avatarGradients.length;
                const rs = roleStyle[user.role] ?? roleStyle.USER;
                return (
                  <tr
                    key={user.id}
                    className="bg-surface-container-lowest transition-colors duration-100 hover:bg-surface-container-low group"
                  >
                    <td className="px-5 py-4 rounded-l-xl">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                          style={{ background: avatarGradients[gradIdx] }}
                        >
                          {initials}
                        </div>
                        <div>
                          <p className="text-[13px] font-semibold text-on-surface group-hover:text-primary transition-colors duration-150">{user.name}</p>
                          <p className="text-[11px] text-on-surface-variant mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide"
                        style={{ background: rs.bg, color: rs.color }}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-on-surface-variant">{user.department}</td>
                    <td className="px-5 py-4">
                      <span className="text-[12px] font-bold text-on-surface">{user.assetCount ?? 1}</span>
                      <span className="text-[11px] text-on-surface-variant ml-1">assigned</span>
                    </td>
                    <td className="px-5 py-4 text-[12px] text-on-surface-variant">{user.lastLogin}</td>
                    <td className="px-5 py-4 rounded-r-xl">
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant transition-all duration-150 hover:bg-surface-container-low hover:text-primary"
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
          <div className="px-5 py-3.5 flex items-center justify-between bg-surface-container-low rounded-xl">
            <p className="text-[12px] text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{filtered.length}</span> of <span className="font-bold text-on-surface">1,284</span> users
            </p>
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant transition-all duration-150 hover:bg-surface hover:text-on-surface"
              >
                <ChevronLeft size={14} />
              </button>
              {[1, 2, 3].map((p) => (
                <button
                  key={p}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-[13px] font-semibold transition-all duration-150"
                  style={p === 1
                    ? { background: "linear-gradient(135deg, #001d44, #00326b)", color: "#ffffff" }
                    : { color: "#5e6678" }}
                  onMouseEnter={(e) => { if (p !== 1) e.currentTarget.style.background = "#ffffff"; }}
                  onMouseLeave={(e) => { if (p !== 1) e.currentTarget.style.background = "transparent"; }}
                >
                  {p}
                </button>
              ))}
              <button
                className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant transition-all duration-150 hover:bg-surface hover:text-on-surface"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* ── Create User Modal ── */}
      {showCreate && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,15,30,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowCreate(false); setEmailSent(false); } }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 space-y-5"
            style={{ background: "#ffffff", boxShadow: "0 24px 60px rgba(8,15,30,0.2)", border: "1px solid #edf0f5" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <UserPlus size={15} className="text-primary" />
                </div>
                <div>
                  <h2 className="text-[15px] font-bold text-[#080f1e] tracking-tight">Create New User</h2>
                  <p className="text-[11px] text-[#8a9fb8] mt-0.5">Add a user and optionally send them an invite.</p>
                </div>
              </div>
              <button
                onClick={() => { setShowCreate(false); setEmailSent(false); }}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] transition-all duration-150"
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; e.currentTarget.style.color = "#5a7090"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b0bfcc"; }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Jordan Lee"
                  className="px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 placeholder:text-[#b8c8d8] w-full"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#080f1e" }}
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </div>

              {/* Email + Send button */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">
                  Email Address <span className="text-primary">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    value={newEmail}
                    onChange={(e) => { setNewEmail(e.target.value); setEmailSent(false); }}
                    placeholder="e.g. jordan@company.com"
                    type="email"
                    className="flex-1 px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 placeholder:text-[#b8c8d8]"
                    style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#080f1e" }}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                  <button
                    onClick={handleSendEmail}
                    disabled={!newEmail}
                    title="Send invite email"
                    className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-[12px] font-bold transition-all duration-150 shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                    style={emailSent
                      ? { background: "rgba(18,183,106,0.1)", color: "#0a6644", border: "1.5px solid rgba(18,183,106,0.2)" }
                      : { background: "rgba(96,144,227,0.1)", color: "#1a4680", border: "1.5px solid rgba(96,144,227,0.2)" }
                    }
                    onMouseEnter={(e) => { if (newEmail && !emailSent) e.currentTarget.style.background = "rgba(96,144,227,0.18)"; }}
                    onMouseLeave={(e) => { if (!emailSent) e.currentTarget.style.background = "rgba(96,144,227,0.1)"; }}
                  >
                    {emailSent ? (
                      <>
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1.5" stroke="#0a6644" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Sent
                      </>
                    ) : (
                      <><Send size={12} /> Send Email</>
                    )}
                  </button>
                </div>
                {emailSent && (
                  <p className="text-[11px] font-medium" style={{ color: "#12B76A" }}>
                    Invite email sent to <span className="font-bold">{newEmail}</span>
                  </p>
                )}
              </div>

              {/* Department */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">Department</label>
                <select
                  value={newDept}
                  onChange={(e) => setNewDept(e.target.value)}
                  className="px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 appearance-none cursor-pointer w-full"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#3a5070" }}
                  onFocus={focusOn}
                  onBlur={focusOff}
                >
                  {["Engineering", "Design", "HR", "Finance", "Operations"].map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1" style={{ borderTop: "1px solid #edf0f5" }}>
              <button
                onClick={() => { setShowCreate(false); setEmailSent(false); }}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-[#5a7090] transition-all duration-150"
                style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#edf0f5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; }}
              >
                Cancel
              </button>
              <button
                disabled={!newName || !newEmail}
                onClick={handleCreateUser}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: (newName && newEmail) ? "0 2px 10px rgba(96,144,227,0.35)" : "none" }}
                onMouseEnter={(e) => { if (newName && newEmail) e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)"; }}
              >
                <UserPlus size={14} /> Create User
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminShell>
  );
}
