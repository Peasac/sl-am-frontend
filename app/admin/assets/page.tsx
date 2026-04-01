"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockAssets, mockUsers } from "@/lib/mock-data";
import {
  Search, Download, RefreshCw, ChevronLeft, ChevronRight,
  MoreVertical, TrendingUp, Smartphone, AlertTriangle, Activity,
  UserCheck, X, Users,
} from "lucide-react";

const typeColors: Record<string, { bg: string; color: string }> = {
  LAPTOP:      { bg: "rgba(96,144,227,0.1)",   color: "#1a4680" },
  SERVER:      { bg: "rgba(124,58,237,0.1)",    color: "#5b21b6" },
  NETWORK:     { bg: "rgba(20,184,166,0.1)",    color: "#0f766e" },
  WORKSTATION: { bg: "rgba(245,158,11,0.1)",    color: "#b45309" },
  MONITOR:     { bg: "rgba(100,116,139,0.1)",   color: "#475569" },
  OTHER:       { bg: "rgba(100,116,139,0.08)",  color: "#64748b" },
};

const avatarGradients = [
  "linear-gradient(135deg, #1a4680, #6090E3)",
  "linear-gradient(135deg, #5b21b6, #8b5cf6)",
  "linear-gradient(135deg, #0f766e, #34d399)",
  "linear-gradient(135deg, #b45309, #fb923c)",
];

export default function AssetInventoryPage() {
  const [search, setSearch]           = useState("");
  const [category, setCategory]       = useState("All Categories");
  const [location, setLocation]       = useState("Global Locations");

  // Assign modal state
  const [assignAsset, setAssignAsset] = useState<typeof mockAssets[0] | null>(null);
  const [selectedUser, setSelectedUser] = useState("");
  const [userSearch, setUserSearch]   = useState("");

  const filtered = mockAssets.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.serialNumber.toLowerCase().includes(q)
    );
  });

  const filteredUsers = mockUsers.filter((u) =>
    !userSearch || u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <AdminShell userName="Secure Architect">
      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">Asset Inventory</h1>
            <p className="text-[13px] text-[#8a9fb8] mt-0.5">Management and tracking of enterprise hardware across all global jurisdictions.</p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-[#5a7090] transition-all duration-150"
              style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#edf0f5"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; }}
            >
              <Download size={14} /> Export CSV
            </button>
            <button
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-white transition-all duration-150"
              style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: "0 2px 10px rgba(96,144,227,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(96,144,227,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(96,144,227,0.35)"; }}
            >
              <RefreshCw size={14} /> Refresh Audit
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="rounded-2xl p-4 bg-surface-container-low">
          <div className="flex gap-4 items-end flex-wrap">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">Quick Search</label>
              <div className="relative group">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant transition-colors duration-150 group-focus-within:text-primary" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by Name, Serial, or ID..."
                  className="sa-input pl-10 pr-4 py-2.5 text-[13px] rounded-md w-64 placeholder:text-on-surface-variant"
                />
              </div>
            </div>
            {[
              { label: "Asset Category", value: category, set: setCategory, options: ["All Categories", "Laptops", "Servers", "Network", "Workstations"] },
              { label: "Location", value: location, set: setLocation, options: ["Global Locations", "HQ - San Francisco", "Data Center East", "EMEA"] },
            ].map((f) => (
              <div key={f.label} className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">{f.label}</label>
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
              <span className="text-[12px] font-bold text-primary">{filtered.length} results</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden bg-surface-container-low p-2">
          <table className="sa-table w-full">
            <thead>
              <tr className="bg-surface-container-low">
                {["Asset ID", "Name & Model", "Type", "Manufacturer", "Serial Number", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.08em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset) => {
                const tc = typeColors[asset.type] ?? typeColors.OTHER;
                return (
                  <tr
                    key={asset.id}
                    className="bg-surface-container-lowest transition-colors duration-100 hover:bg-surface-container-low group"
                  >
                    <td className="px-5 py-4 text-[12px] font-mono text-on-surface-variant font-medium rounded-l-xl">{asset.id}</td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/assets/${asset.id}`}>
                        <p className="text-[13px] font-semibold text-on-surface group-hover:text-primary transition-colors duration-150">{asset.name}</p>
                        <p className="text-[11px] text-on-surface-variant mt-0.5">{asset.department}</p>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide" style={{ background: tc.bg, color: tc.color }}>
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-on-surface-variant">{asset.manufacturer}</td>
                    <td className="px-5 py-4 text-[12px] font-mono text-on-surface-variant">{asset.serialNumber}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={asset.status} dot />
                    </td>
                    <td className="px-5 py-4 rounded-r-xl">
                      <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                        {/* Assign button */}
                        <button
                          onClick={() => { setAssignAsset(asset); setSelectedUser(""); setUserSearch(""); }}
                          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[11px] font-bold transition-all duration-150 bg-surface-container-low text-primary hover:bg-secondary-container"
                        >
                          <UserCheck size={12} /> Assign
                        </button>
                        <button
                          className="w-7 h-7 flex items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all duration-150"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-5 py-3.5 flex items-center justify-between bg-surface-container-low rounded-xl">
            <p className="text-[12px] text-on-surface-variant">
              Showing <span className="font-bold text-on-surface">{filtered.length}</span> of <span className="font-bold text-on-surface">2,491</span> assets
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

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="rounded-2xl p-5 relative overflow-hidden" style={{ background: "linear-gradient(145deg, #050d1f, #0d2550)", boxShadow: "0 4px 16px rgba(5,13,31,0.25)" }}>
            <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-[60px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(96,144,227,0.25), transparent 70%)" }} />
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={14} className="text-primary" />
                <span className="text-[11px] font-bold text-[#4a6a90] uppercase tracking-[0.1em]">Inventory Health</span>
              </div>
              <p className="text-[2rem] font-bold text-white tracking-tight leading-none">98.4%</p>
              <p className="text-[12px] text-[#4a6a90] mt-2">Compliance rate across all managed assets</p>
            </div>
          </div>
          <div
            className="rounded-2xl p-5 transition-shadow duration-150"
            style={{ background: "#ffffff", border: "1px solid rgba(96,144,227,0.16)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(96,144,227,0.12)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Smartphone size={14} className="text-primary" />
              <span className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">Mobile Fleet</span>
            </div>
            <p className="text-[2rem] font-bold text-[#080f1e] tracking-tight leading-none">82%</p>
            <p className="text-[12px] text-[#8a9fb8] mt-2">Security patch rollout status</p>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "#f0f4f8" }}>
              <div className="h-full rounded-full" style={{ width: "82%", background: "linear-gradient(to right, #1a4680, #6090E3)" }} />
            </div>
          </div>
          <div
            className="rounded-2xl p-5 transition-shadow duration-150"
            style={{ background: "#ffffff", border: "1px solid rgba(239,68,68,0.16)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(239,68,68,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">Untracked Assets</span>
            </div>
            <p className="text-[2rem] font-bold text-red-600 tracking-tight leading-none">12</p>
            <p className="text-[12px] text-[#8a9fb8] mt-2">Flagged during last network scan</p>
            <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "#fee2e2" }}>
              <div className="h-full rounded-full bg-red-400" style={{ width: "15%" }} />
            </div>
          </div>
        </div>

      </div>

      {/* ── Assign Asset Modal ── */}
      {assignAsset && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(8,15,30,0.55)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setAssignAsset(null); }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 space-y-5"
            style={{ background: "#ffffff", boxShadow: "0 24px 60px rgba(8,15,30,0.2)", border: "1px solid #edf0f5" }}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                    <UserCheck size={14} className="text-primary" />
                  </div>
                  <h2 className="text-[15px] font-bold text-[#080f1e] tracking-tight">Assign Asset</h2>
                </div>
                <p className="text-[12px] text-[#8a9fb8] ml-9">
                  Select a user to assign <span className="font-semibold text-[#3a5070]">{assignAsset.name}</span>
                </p>
              </div>
              <button
                onClick={() => setAssignAsset(null)}
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] transition-all duration-150"
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; e.currentTarget.style.color = "#5a7090"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b0bfcc"; }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Asset info strip */}
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold" style={{ background: (typeColors[assignAsset.type] ?? typeColors.OTHER).bg, color: (typeColors[assignAsset.type] ?? typeColors.OTHER).color }}>
                {assignAsset.type}
              </span>
              <span className="text-[12px] font-semibold text-[#080f1e]">{assignAsset.name}</span>
              <span className="text-[11px] font-mono text-[#b0bfcc] ml-auto">{assignAsset.id}</span>
            </div>

            {/* User search */}
            <div>
              <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em] mb-1.5">Search User</label>
              <div className="relative">
                <Users size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0bfcc]" />
                <input
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  placeholder="Search by name or email..."
                  className="pl-9 pr-4 py-2.5 text-[13px] rounded-xl w-full placeholder:text-[#b8c8d8] focus:outline-none transition-all duration-150"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#080f1e" }}
                  onFocus={(e) => { e.currentTarget.style.border = "1.5px solid #6090E3"; e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,144,227,0.10)"; }}
                  onBlur={(e) => { e.currentTarget.style.border = "1.5px solid #edf0f5"; e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>
            </div>

            {/* User list */}
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {filteredUsers.map((user) => {
                const initials = user.name.split(" ").map((n) => n[0]).join("").slice(0, 2);
                const gradIdx  = user.id.charCodeAt(1) % avatarGradients.length;
                const isSelected = selectedUser === user.id;
                return (
                  <button
                    key={user.id}
                    onClick={() => setSelectedUser(user.id)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                    style={isSelected
                      ? { background: "rgba(96,144,227,0.1)", border: "1.5px solid rgba(96,144,227,0.3)" }
                      : { background: "#f7f9fc", border: "1.5px solid transparent" }
                    }
                    onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = "#edf2fb"; }}
                    onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = "#f7f9fc"; }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold shrink-0"
                      style={{ background: avatarGradients[gradIdx] }}
                    >
                      {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#080f1e] truncate">{user.name}</p>
                      <p className="text-[11px] text-[#b0bfcc] truncate">{user.email}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md shrink-0" style={{ background: "rgba(96,144,227,0.1)", color: "#1a4680" }}>
                      {user.department}
                    </span>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{ background: "#6090E3" }}>
                        <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1" style={{ borderTop: "1px solid #edf0f5" }}>
              <button
                onClick={() => setAssignAsset(null)}
                className="flex-1 py-2.5 rounded-xl text-[13px] font-semibold text-[#5a7090] transition-all duration-150"
                style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#edf0f5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; }}
              >
                Cancel
              </button>
              <button
                disabled={!selectedUser}
                onClick={() => setAssignAsset(null)}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: selectedUser ? "0 2px 10px rgba(96,144,227,0.35)" : "none" }}
                onMouseEnter={(e) => { if (selectedUser) { e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)"; } }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)"; }}
              >
                <UserCheck size={14} /> Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

    </AdminShell>
  );
}
