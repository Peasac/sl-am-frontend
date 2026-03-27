"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockAssets } from "@/lib/mock-data";
import { Search, Download, RefreshCw, ChevronLeft, ChevronRight, MoreVertical, TrendingUp, Smartphone, AlertTriangle } from "lucide-react";

const typeColors: Record<string, { bg: string; color: string }> = {
  LAPTOP:      { bg: "rgba(96,144,227,0.1)",   color: "#1a4680" },
  SERVER:      { bg: "rgba(124,58,237,0.1)",    color: "#5b21b6" },
  NETWORK:     { bg: "rgba(20,184,166,0.1)",    color: "#0f766e" },
  WORKSTATION: { bg: "rgba(245,158,11,0.1)",    color: "#b45309" },
  MONITOR:     { bg: "rgba(100,116,139,0.1)",   color: "#475569" },
  OTHER:       { bg: "rgba(100,116,139,0.08)",  color: "#64748b" },
};

export default function AssetInventoryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [location, setLocation] = useState("Global Locations");

  const filtered = mockAssets.filter((a) => {
    const q = search.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.serialNumber.toLowerCase().includes(q)
    );
  });

  return (
    <AdminShell userName="Secure Architect">
      <div className="space-y-5">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">Asset Inventory</h1>
            <p className="text-[13px] text-[#8a9fb8] mt-1">Management and tracking of enterprise hardware across all global jurisdictions.</p>
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
              style={{ background: "linear-gradient(135deg, #0e2a4e, #1a4680)", boxShadow: "0 3px 10px rgba(10,37,64,0.25)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #122f58, #1f5090)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #0e2a4e, #1a4680)"; }}
            >
              <RefreshCw size={14} /> Refresh Audit
            </button>
          </div>
        </div>

        {/* Filters bar */}
        <div className="rounded-2xl p-4" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <div className="flex gap-4 items-end flex-wrap">
            <div className="space-y-1.5">
              <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">Quick Search</label>
              <div className="relative group">
                <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#b0bfcc] transition-colors duration-150 group-focus-within:text-[#6090E3]" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter by Name, Serial, or ID..."
                  className="pl-10 pr-4 py-2.5 text-[13px] rounded-xl w-64 placeholder:text-[#b8c8d8] focus:outline-none transition-all duration-150"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#080f1e" }}
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
                  className="px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 font-medium appearance-none cursor-pointer"
                  style={{ background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#3a5070", minWidth: 160 }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = "1.5px solid #6090E3";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,144,227,0.10)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = "1.5px solid #edf0f5";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {f.options.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: "1px solid #f0f4f8" }}>
                {["Asset ID", "Name & Model", "Type", "Manufacturer", "Serial Number", "Status", ""].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((asset, i) => {
                const tc = typeColors[asset.type] ?? typeColors.OTHER;
                return (
                  <tr
                    key={asset.id}
                    style={{ borderBottom: i < filtered.length - 1 ? "1px solid #f7f9fc" : "none" }}
                    className="transition-colors duration-100 hover:bg-[#fafbfe]"
                  >
                    <td className="px-5 py-4 text-[12px] font-mono text-[#8a9fb8] font-medium">{asset.id}</td>
                    <td className="px-5 py-4">
                      <Link href={`/admin/assets/${asset.id}`}>
                        <p className="text-[13px] font-semibold text-[#080f1e] hover:text-[#6090E3] transition-colors duration-150">{asset.name}</p>
                        <p className="text-[11px] text-[#b0bfcc] mt-0.5">{asset.department}</p>
                      </Link>
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide"
                        style={{ background: tc.bg, color: tc.color }}
                      >
                        {asset.type}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[13px] text-[#5a7090]">{asset.manufacturer}</td>
                    <td className="px-5 py-4 text-[12px] font-mono text-[#8a9fb8]">{asset.serialNumber}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={asset.status} dot />
                    </td>
                    <td className="px-5 py-4">
                      <button
                        className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] hover:text-[#5a7090] transition-all duration-150"
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
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
          <div className="px-5 py-3.5 flex items-center justify-between" style={{ borderTop: "1px solid #f0f4f8" }}>
            <p className="text-[12px] text-[#8a9fb8]">
              Showing <span className="font-semibold text-[#3a5070]">{filtered.length}</span> of <span className="font-semibold text-[#3a5070]">2,491</span> assets
            </p>
            <div className="flex items-center gap-1">
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] hover:text-[#5a7090] transition-all duration-150"
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
                    ? { background: "linear-gradient(135deg, #0e2a4e, #1a4680)", color: "#ffffff", boxShadow: "0 2px 6px rgba(10,37,64,0.2)" }
                    : { color: "#8a9fb8" }}
                  onMouseEnter={(e) => { if (p !== 1) e.currentTarget.style.background = "#f0f4f8"; }}
                  onMouseLeave={(e) => { if (p !== 1) e.currentTarget.style.background = "transparent"; }}
                >
                  {p}
                </button>
              ))}
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] hover:text-[#5a7090] transition-all duration-150"
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom stats */}
        <div className="grid grid-cols-3 gap-4">
          <div
            className="rounded-2xl p-5"
            style={{ background: "linear-gradient(145deg, #050d1f, #091c3a)", boxShadow: "0 4px 16px rgba(5,13,31,0.25)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={14} className="text-[#6090E3]" />
              <span className="text-[11px] font-bold text-[#4a6a90] uppercase tracking-[0.1em]">Inventory Health</span>
            </div>
            <p className="text-[2rem] font-bold text-white tracking-tight leading-none">98.4%</p>
            <p className="text-[12px] text-[#4a6a90] mt-2">Compliance rate across all managed assets</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-3">
              <Smartphone size={14} className="text-[#6090E3]" />
              <span className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">Mobile Fleet</span>
            </div>
            <p className="text-[2rem] font-bold text-[#080f1e] tracking-tight leading-none">82%</p>
            <p className="text-[12px] text-[#8a9fb8] mt-2">Security patch rollout status</p>
          </div>
          <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle size={14} className="text-red-500" />
              <span className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">Untracked Assets</span>
            </div>
            <p className="text-[2rem] font-bold text-red-600 tracking-tight leading-none">12</p>
            <p className="text-[12px] text-[#8a9fb8] mt-2">Flagged during last network scan</p>
          </div>
        </div>

      </div>
    </AdminShell>
  );
}
