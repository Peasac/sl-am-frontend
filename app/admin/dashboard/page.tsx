"use client";

import { AdminShell } from "@/components/layout/admin-shell";
import Link from "next/link";
import {
  Package, Users, Wrench, CheckCircle2, ArrowUpRight,
  Plus, UserCheck, ArrowRightLeft, RotateCcw,
  Laptop, Server, Monitor, Wifi, AlertCircle,
  TrendingUp, AlertTriangle, Activity,
} from "lucide-react";

// ── Data ─────────────────────────────────────────────────────────────────────

const topStats = [
  {
    label: "Total Assets", value: "2,491", sub: "+38 this month", subColor: "#12B76A",
    icon: Package, iconColor: "#6090E3",
    accent: "#6090E3", accentBg: "rgba(96,144,227,0.08)", accentBorder: "rgba(96,144,227,0.16)",
    barColor: "#6090E3", barPct: 100,
  },
  {
    label: "In Use", value: "1,847", sub: "74% utilisation", subColor: "#6090E3",
    icon: CheckCircle2, iconColor: "#12B76A",
    accent: "#12B76A", accentBg: "rgba(18,183,106,0.08)", accentBorder: "rgba(18,183,106,0.16)",
    barColor: "#12B76A", barPct: 74,
  },
  {
    label: "Available", value: "512", sub: "Ready to assign", subColor: "#8a9fb8",
    icon: ArrowUpRight, iconColor: "#f59e0b",
    accent: "#f59e0b", accentBg: "rgba(245,158,11,0.07)", accentBorder: "rgba(245,158,11,0.16)",
    barColor: "#f59e0b", barPct: 21,
  },
  {
    label: "Under Repair", value: "132", sub: "12 overdue", subColor: "#ef4444",
    icon: Wrench, iconColor: "#ef4444",
    accent: "#ef4444", accentBg: "rgba(239,68,68,0.07)", accentBorder: "rgba(239,68,68,0.16)",
    barColor: "#ef4444", barPct: 5,
  },
];

const categoryBars = [
  { label: "Laptops",      count: 1104, pct: 72, color: "#6090E3", trackBg: "rgba(96,144,227,0.1)"  },
  { label: "Monitors",     count: 640,  pct: 52, color: "#818cf8", trackBg: "rgba(129,140,248,0.1)" },
  { label: "Servers",      count: 320,  pct: 36, color: "#34d399", trackBg: "rgba(52,211,153,0.1)"  },
  { label: "Network",      count: 280,  pct: 28, color: "#fb923c", trackBg: "rgba(251,146,60,0.1)"  },
  { label: "Workstations", count: 147,  pct: 18, color: "#a78bfa", trackBg: "rgba(167,139,250,0.1)" },
];

const categoryIcons: Record<string, React.ReactNode> = {
  Laptops:      <Laptop  size={13} />,
  Monitors:     <Monitor size={13} />,
  Servers:      <Server  size={13} />,
  Network:      <Wifi    size={13} />,
  Workstations: <Package size={13} />,
};

const userInsights = [
  { label: "Total Users",          value: "1,284", color: "#080f1e", dot: "#6090E3" },
  { label: "Users with Assets",    value: "1,102", color: "#12B76A", dot: "#12B76A" },
  { label: "Users without Assets", value: "182",   color: "#f59e0b", dot: "#f59e0b" },
];

const recentActivity = [
  { id: "a1", type: "assign",   title: "MacBook Pro 16\" assigned",    desc: "Assigned to Jordan Lee · Engineering",    time: "12 min ago" },
  { id: "a2", type: "new",      title: "50 Dell Monitors added",        desc: "Bulk import by Julianne Davenport",       time: "1 hour ago" },
  { id: "a3", type: "repair",   title: "Server Rack-42 flagged",        desc: "Marked under repair · Data Center East", time: "3 hours ago" },
  { id: "a4", type: "reassign", title: "ThinkPad X1 reassigned",        desc: "Marcus Kane → Sarah Rosencrantz",        time: "Yesterday"  },
  { id: "a5", type: "new",      title: "Cisco Catalyst 9300 onboarded", desc: "Added to Core Infrastructure pool",      time: "Yesterday"  },
];

const activityIcon: Record<string, { icon: React.ReactNode; dot: string; bg: string }> = {
  assign:   { icon: <UserCheck   size={13} />, dot: "#12B76A", bg: "rgba(18,183,106,0.10)"  },
  new:      { icon: <Plus        size={13} />, dot: "#6090E3", bg: "rgba(96,144,227,0.10)"  },
  repair:   { icon: <Wrench      size={13} />, dot: "#ef4444", bg: "rgba(239,68,68,0.10)"   },
  reassign: { icon: <ArrowRightLeft size={12} />, dot: "#f59e0b", bg: "rgba(245,158,11,0.10)" },
};

const alerts = [
  {
    id: "al1", icon: <AlertTriangle size={14} />,
    color: "#f59e0b", bg: "rgba(245,158,11,0.07)", border: "rgba(245,158,11,0.20)",
    label: "Unassigned", count: 512, desc: "assets available with no owner",
  },
  {
    id: "al2", icon: <Wrench size={14} />,
    color: "#ef4444", bg: "rgba(239,68,68,0.07)", border: "rgba(239,68,68,0.20)",
    label: "In Repair", count: 132, desc: "assets currently under repair",
  },
  {
    id: "al3", icon: <Users size={14} />,
    color: "#6090E3", bg: "rgba(96,144,227,0.07)", border: "rgba(96,144,227,0.20)",
    label: "No Assets", count: 182, desc: "users without any assigned asset",
  },
];

const quickActions = [
  { label: "Add Asset",          icon: Plus,           href: "/admin/assets/new", primary: true  },
  { label: "Assign Asset",       icon: UserCheck,      href: "/admin/assets",     primary: false },
  { label: "Reassign Asset",     icon: ArrowRightLeft, href: "/admin/assets",     primary: false },
  { label: "Mark Under Repair",  icon: Wrench,         href: "/admin/assets",     primary: false },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  return (
    <AdminShell userName="Secure Architect">
      <div className="space-y-5">

        {/* Header + insight */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">Asset Management</h1>
            <p className="text-[13px] text-[#8a9fb8] mt-0.5">Overview of assets, allocation, and user assignments.</p>
          </div>
          {/* System status insight pill */}
          <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{ background: "rgba(18,183,106,0.08)", border: "1px solid rgba(18,183,106,0.18)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[12px] font-semibold text-[#0a6644]">
              98.4% fleet healthy · 12 items need attention
            </span>
          </div>
        </div>

        {/* ── Row 1: 4 stat cards ── */}
        <div className="grid grid-cols-4 gap-4">
          {topStats.map(({ label, value, sub, subColor, icon: Icon, iconColor, accent, accentBg, accentBorder, barColor, barPct }) => (
            <div
              key={label}
              className="rounded-2xl p-5 relative overflow-hidden transition-shadow duration-150"
              style={{ background: "#ffffff", border: `1px solid ${accentBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 4px 16px ${accentBg}, 0 1px 4px rgba(0,0,0,0.04)`; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
            >
              {/* Accent top bar */}
              <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: accent }} />

              <div className="flex items-center justify-between mb-4 mt-1">
                <p className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">{label}</p>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: accentBg }}>
                  <Icon size={15} style={{ color: iconColor }} />
                </div>
              </div>
              <p className="text-[1.85rem] font-bold text-[#080f1e] tracking-tight leading-none">{value}</p>
              <p className="text-[12px] font-semibold mt-2" style={{ color: subColor }}>{sub}</p>

              {/* Mini progress bar */}
              <div className="mt-3 h-1 rounded-full" style={{ background: "rgba(0,0,0,0.05)" }}>
                <div className="h-1 rounded-full" style={{ width: `${barPct}%`, background: barColor }} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Row 2: Category + User insights + Quick actions ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Asset distribution */}
          <div className="col-span-1 rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Activity size={12} className="text-primary" />
                </div>
                <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">By Category</p>
              </div>
              <span className="text-[10px] font-bold text-primary uppercase tracking-[0.08em] px-2.5 py-1 rounded-lg" style={{ background: "rgba(96,144,227,0.08)", border: "1px solid rgba(96,144,227,0.16)" }}>
                2,491 total
              </span>
            </div>
            <div className="space-y-3.5">
              {categoryBars.map((bar) => (
                <div
                  key={bar.label}
                  className="group rounded-xl px-3 py-2.5 -mx-1 transition-colors duration-150"
                  style={{}}
                  onMouseEnter={(e) => { e.currentTarget.style.background = bar.trackBg; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: bar.trackBg }}>
                        <span style={{ color: bar.color }}>{categoryIcons[bar.label]}</span>
                      </div>
                      <span className="text-[12px] font-semibold text-[#3a5070]">{bar.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-[#8a9fb8]">{bar.pct}%</span>
                      <span className="text-[12px] font-bold text-[#080f1e]">{bar.count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full" style={{ background: "#f0f4f8" }}>
                    <div
                      className="h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${bar.pct}%`, background: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User insights */}
          <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Users size={12} className="text-primary" />
                </div>
                <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">User Insights</p>
              </div>
            </div>
            <div className="space-y-2.5 mb-5">
              {userInsights.map(({ label, value, color, dot }) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2.5 px-3 rounded-xl transition-colors duration-150"
                  style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#edf2fb"; e.currentTarget.style.border = "1px solid rgba(96,144,227,0.15)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.border = "1px solid #edf0f5"; }}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
                    <span className="text-[12px] font-medium text-[#5a7090]">{label}</span>
                  </div>
                  <span className="text-[14px] font-bold" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="pt-3.5" style={{ borderTop: "1px solid #edf0f5" }}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-[#8a9fb8]">Coverage rate</span>
                <span className="text-[12px] font-bold text-[#12B76A]">86%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#f0f4f8" }}>
                <div className="h-full rounded-full" style={{ width: "86%", background: "linear-gradient(to right, #12B76A, #6090E3)" }} />
              </div>
              <p className="text-[11px] text-[#b0bfcc] mt-1.5">of users have at least one active asset</p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                <TrendingUp size={12} className="text-primary" />
              </div>
              <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">Quick Actions</p>
            </div>
            <div className="space-y-2">
              {quickActions.map(({ label, icon: Icon, href, primary }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[13px] font-semibold transition-all duration-150"
                  style={primary ? {
                    background: "linear-gradient(135deg, #1a4680, #6090E3)",
                    color: "#ffffff",
                    boxShadow: "0 2px 10px rgba(96,144,227,0.35)",
                  } : {
                    background: "#f7f9fc",
                    color: "#3a5070",
                    border: "1px solid #edf0f5",
                  }}
                  onMouseEnter={(e) => {
                    if (primary) {
                      e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)";
                      e.currentTarget.style.boxShadow = "0 4px 14px rgba(96,144,227,0.45)";
                    } else {
                      e.currentTarget.style.background = "#edf2fb";
                      e.currentTarget.style.border = "1px solid rgba(96,144,227,0.2)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (primary) {
                      e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)";
                      e.currentTarget.style.boxShadow = "0 2px 10px rgba(96,144,227,0.35)";
                    } else {
                      e.currentTarget.style.background = "#f7f9fc";
                      e.currentTarget.style.border = "1px solid #edf0f5";
                    }
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: primary ? "rgba(255,255,255,0.18)" : "rgba(96,144,227,0.1)" }}
                  >
                    <Icon size={14} style={{ color: primary ? "#ffffff" : "#6090E3" }} />
                  </div>
                  {label}
                  {primary && (
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded-md" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
                      New
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Recent activity + Needs Attention ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Recent activity */}
          <div className="col-span-2 rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Activity size={12} className="text-primary" />
                </div>
                <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">Recent Activity</p>
              </div>
              <button
                className="w-7 h-7 flex items-center justify-center rounded-lg text-[#b0bfcc] transition-all duration-150"
                onMouseEnter={(e) => { e.currentTarget.style.background = "#f0f4f8"; e.currentTarget.style.color = "#6090E3"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#b0bfcc"; }}
              >
                <RotateCcw size={13} />
              </button>
            </div>
            <div className="space-y-0.5">
              {recentActivity.map((item) => {
                const s = activityIcon[item.type];
                return (
                  <div
                    key={item.id}
                    className="flex gap-3 px-3 py-3 rounded-xl transition-all duration-100 group cursor-default"
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#f7f9fc"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                  >
                    <div
                      className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: s.bg, color: s.dot }}
                    >
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-[#080f1e] leading-snug">{item.title}</p>
                      <p className="text-[12px] text-[#8a9fb8] mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[11px] text-[#b0bfcc] font-medium shrink-0 mt-0.5 tabular-nums">{item.time}</span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/admin/assets"
              className="flex items-center justify-center gap-1.5 mt-3 pt-3 text-[12px] font-semibold text-primary hover:text-[#1a4680] transition-colors duration-150"
              style={{ borderTop: "1px solid #edf0f5" }}
            >
              View all activity <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Needs Attention */}
          <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(239,68,68,0.1)" }}>
                <AlertCircle size={13} className="text-[#ef4444]" />
              </div>
              <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">Needs Attention</p>
            </div>
            <div className="space-y-2.5">
              {alerts.map(({ id, icon, color, bg, border, label, count, desc }) => (
                <div
                  key={id}
                  className="rounded-xl p-4 transition-all duration-150 cursor-default"
                  style={{ background: bg, border: `1px solid ${border}` }}
                  onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.97)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-1.5">
                      <span style={{ color }}>{icon}</span>
                      <span className="text-[11px] font-bold uppercase tracking-[0.08em]" style={{ color }}>{label}</span>
                    </div>
                    <span className="text-[22px] font-bold leading-none" style={{ color }}>{count}</span>
                  </div>
                  <p className="text-[12px] text-[#8a9fb8] leading-snug">{desc}</p>
                </div>
              ))}
            </div>
            <Link
              href="/admin/assets"
              className="flex items-center justify-center gap-2 mt-4 w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-150"
              style={{ background: "rgba(96,144,227,0.07)", border: "1px solid rgba(96,144,227,0.18)", color: "#6090E3" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(96,144,227,0.13)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(96,144,227,0.07)"; }}
            >
              Review All Issues <ArrowUpRight size={12} />
            </Link>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
