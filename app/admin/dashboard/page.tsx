"use client";

import { useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import Link from "next/link";
import {
  Package, Users, Wrench, CheckCircle2, ArrowUpRight,
  Plus, UserCheck, ArrowRightLeft, RotateCcw,
  Laptop, Server, Monitor, Wifi,
  TrendingUp, AlertTriangle, Activity,Computer
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// ── Data ─────────────────────────────────────────────────────────────────────

const topStats = [
  {
    label: "Total Assets",  value: "2,491", sub: "+38 this month",  subColor: "#6090E3", icon: Package,      iconBg: "rgba(96,144,227,0.1)",  iconColor: "#6090E3",
  },
  {
    label: "In Use",        value: "1,847", sub: "74% utilisation", subColor: "#12B76A", icon: CheckCircle2, iconBg: "rgba(18,183,106,0.1)",  iconColor: "#12B76A",
  },
  {
    label: "Available",     value: "512",   sub: "Ready to assign", subColor: "#8a9fb8", icon: ArrowUpRight, iconBg: "rgba(245,158,11,0.1)",  iconColor: "#f59e0b",
  },
  {
    label: "Under Repair",  value: "132",   sub: "12 overdue",      subColor: "#ef4444", icon: Wrench,       iconBg: "rgba(239,68,68,0.08)",  iconColor: "#ef4444",
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
  Laptops:      <Laptop  size={20} />,
  Monitors:     <Monitor size={20} />,
  Servers:      <Server  size={20} />,
  Network:      <Wifi    size={20} />,
  Workstations: <Computer size={20} />,
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
  assign:   { icon: <UserCheck      size={13} />, dot: "#12B76A", bg: "rgba(18,183,106,0.10)"  },
  new:      { icon: <Plus           size={13} />, dot: "#6090E3", bg: "rgba(96,144,227,0.10)"  },
  repair:   { icon: <Wrench         size={13} />, dot: "#ef4444", bg: "rgba(239,68,68,0.10)"   },
  reassign: { icon: <ArrowRightLeft size={12} />, dot: "#f59e0b", bg: "rgba(245,158,11,0.10)"  },
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

const manufacturerData: Record<string, { label: string; value: number; color: string }[]> = {
  Laptops:      [
    { label: "Apple",   value: 38, color: "#6090E3" },
    { label: "Dell",    value: 27, color: "#818cf8" },
    { label: "Lenovo",  value: 19, color: "#34d399" },
    { label: "HP",      value: 11, color: "#fb923c" },
    { label: "Other",   value: 5,  color: "#cbd5e1" },
  ],
  Monitors:     [
    { label: "LG",       value: 34, color: "#6090E3" },
    { label: "Dell",     value: 28, color: "#818cf8" },
    { label: "Samsung",  value: 22, color: "#34d399" },
    { label: "BenQ",     value: 10, color: "#fb923c" },
    { label: "Other",    value: 6,  color: "#cbd5e1" },
  ],
  Servers:      [
    { label: "Dell",    value: 41, color: "#6090E3" },
    { label: "HP",      value: 30, color: "#818cf8" },
    { label: "Cisco",   value: 18, color: "#34d399" },
    { label: "IBM",     value: 11, color: "#fb923c" },
  ],
  Network:      [
    { label: "Cisco",    value: 52, color: "#6090E3" },
    { label: "Juniper",  value: 24, color: "#818cf8" },
    { label: "Aruba",    value: 14, color: "#34d399" },
    { label: "Other",    value: 10, color: "#cbd5e1" },
  ],
  Workstations: [
    { label: "Dell",    value: 44, color: "#6090E3" },
    { label: "HP",      value: 33, color: "#818cf8" },
    { label: "Lenovo",  value: 15, color: "#34d399" },
    { label: "Other",   value: 8,  color: "#cbd5e1" },
  ],
};

const quickActions = [
  { label: "Add Asset",          icon: Plus,           href: "/admin/assets/new", primary: true  },
  { label: "Assign Asset",       icon: UserCheck,      href: "/admin/assets",     primary: false },
  { label: "Reassign Asset",     icon: ArrowRightLeft, href: "/admin/assets",     primary: false },
  { label: "Mark Under Repair",  icon: Wrench,         href: "/admin/assets",     primary: false },
];

// ── Component ─────────────────────────────────────────────────────────────────

// ── Pie chart helper ─────────────────────────────────────────────────────────

function PieChart({ slices }: { slices: { label: string; value: number; color: string }[] }) {
  const total = slices.reduce((s, d) => s + d.value, 0);
  let cumulative = 0;
  const cx = 60, cy = 60, r = 52, inner = 30;

  const paths = slices.map((slice) => {
    const pct      = slice.value / total;
    const startAng = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    cumulative    += slice.value;
    const endAng   = (cumulative / total) * 2 * Math.PI - Math.PI / 2;
    const large    = pct > 0.5 ? 1 : 0;
    const x1 = cx + r * Math.cos(startAng), y1 = cy + r * Math.sin(startAng);
    const x2 = cx + r * Math.cos(endAng),   y2 = cy + r * Math.sin(endAng);
    const ix1 = cx + inner * Math.cos(startAng), iy1 = cy + inner * Math.sin(startAng);
    const ix2 = cx + inner * Math.cos(endAng),   iy2 = cy + inner * Math.sin(endAng);
    return (
      <path
        key={slice.label}
        d={`M ${ix1} ${iy1} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${inner} ${inner} 0 ${large} 0 ${ix1} ${iy1} Z`}
        fill={slice.color}
        opacity="0.9"
      />
    );
  });

  return (
    <svg viewBox="0 0 120 120" className="w-full h-full">
      {paths}
      <circle cx={cx} cy={cy} r={inner - 1} fill="#ffffff" />
      <text x={cx} y={cy - 5} textAnchor="middle" fontSize="11" fontWeight="700" fill="#080f1e">{total}%</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontSize="8" fill="#8a9fb8">total</text>
    </svg>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const categoryKeys = Object.keys(manufacturerData);
  const [activeCategory, setActiveCategory] = useState(categoryKeys[0]);
  const activeSlices = manufacturerData[activeCategory];

  return (
    <AdminShell userName="Secure Architect">
      <div className="space-y-5">

        {/* Header + insight */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[32px] font-bold text-primary tracking-tight">Asset Management</h1>
            <p className="text-[13px] text-[#8a9fb8] mt-0.5">Overview of assets, allocation, and user assignments.</p>
          </div>
          {/* System status insight pill */}
          {/* <div
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
            style={{ background: "rgba(96,144,227,0.08)", border: "1px solid rgba(96,144,227,0.2)" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[12px] font-semibold text-[#1a4680]">
              98.4% fleet healthy · 12 items need attention
            </span>
          </div> */}
        </div>

        {/* ── Row 1: 4 stat cards ── */}
        <div className="grid grid-cols-4 gap-4">
          
          {topStats.map(({ label, value, sub, subColor, icon: Icon, iconBg, iconColor }) => (
            <Card
              key={label}
              className="sa-card gap-0 rounded-2xl px-5 py-5 shadow-none  hover:shadow-[0_12px_28px_rgb(20_27_44/9%)]"
            >
              <CardHeader className="mb-0 p-0">
                <CardTitle className="text-[12px] font-bold flex items-center text-on-surface-variant uppercase tracking-widest">{label}</CardTitle>
                <CardAction className="w-8 h-8 rounded-xl flex items-center justify-center" >
                  <Icon size={25} style={{color:iconColor}} />
                </CardAction>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-[2.3rem] font-bold font-mono text-on-surface  tracking-tight Mano leading-none">{value}</p>
                
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ── Row 2: Category + User insights + Quick actions ── */}
        <div className="grid grid-cols-3 gap-4">

          {/* Asset distribution */}
          <div className="sa-card col-span-2 rounded-2xl p-5 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                {/* <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Activity size={12} className="text-primary" />
                </div> */}
                <p className="text-[22px] font-bold text-on-surface tracking-tight">By Category</p>
              </div>
              {/* <span className="text-[10px] font-bold text-primary uppercase tracking-[0.08em] px-2.5 py-1 rounded-lg bg-secondary-container">
                2,491 total
              </span> */}
            </div>
            <div className="space-y-3.5">
              {categoryBars.map((bar) => (
                <div
                  key={bar.label}
                  className="group -mx-1 rounded-xl px-3 py-2.5 "
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-md flex items-center justify-center primary" >
                        <span>{categoryIcons[bar.label]}</span>
                      </div>
                      <span className="text-[14px] font-semibold primary text-on-surface">{bar.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-on-surface-variant">{bar.pct}%</span>
                      <span className="text-[12px] font-bold text-on-surface">{bar.count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-surface-container-low">
                    <div
                      className="h-1.5 rounded-full transition-all duration-500 bg-primary"
                      style={{ width: `${bar.pct}%`, background: "primary" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* User insights */}
          {/* <div className="sa-card rounded-2xl p-5 shadow-none">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Users size={12} className="text-primary" />
                </div>
                <p className="text-[14px] font-bold text-on-surface tracking-tight">User Insights</p>
              </div>
            </div>
            <div className="space-y-2.5 mb-5">
              {userInsights.map(({ label, value, color, dot }) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-xl border border-(--sa-ghost-border) bg-surface px-3 py-2.5 transition-colors duration-150 hover:bg-surface-container-low"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: dot }} />
                    <span className="text-[12px] font-medium text-on-surface">{label}</span>
                  </div>
                  <span className="text-[14px] font-bold" style={{ color }}>{value}</span>
                </div>
              ))}
            </div>
            <div className="pt-3.5 border-t border-(--sa-ghost-border)">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-semibold text-on-surface-variant">Coverage rate</span>
                <span className="text-[12px] font-bold text-tertiary">86%</span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden bg-surface-container-low">
                <div className="h-full rounded-full" style={{ width: "86%", background: "linear-gradient(to right, #12B76A, #6090E3)" }} />
              </div>
              <p className="text-[11px] text-on-surface-variant mt-1.5">of users have at least one active asset</p>
            </div>
          </div> */}

          {/* Quick actions */}
          <div className="sa-card rounded-2xl p-5 shadow-none">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                <TrendingUp size={12} className="text-primary" />
              </div>
              <p className="text-[14px] font-bold text-on-surface tracking-tight">Quick Actions</p>
            </div>
            <div className="space-y-2">
              {quickActions.map(({ label, icon: Icon, href, primary }) => (
                <Button
                  key={label}
                  asChild
                  variant={primary ? "default" : "outline"}
                  className={primary
                    ? "sa-primary-gradient h-auto w-full justify-start gap-3 rounded-xl px-4 py-3 text-[13px] font-semibold hover:brightness-110"
                    : "h-auto w-full justify-start gap-3 rounded-xl border-(--sa-ghost-border) bg-surface px-4 py-3 text-[13px] font-semibold text-on-surface hover:bg-surface-container-low"
                  }
                >
                  <Link href={href}>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg shrink-0"
                      style={{ background: primary ? "rgba(255,255,255,0.18)" : "rgba(96,144,227,0.1)" }}
                    >
                      <Icon size={14} style={{ color: primary ? "#ffffff" : "#6090E3" }} />
                    </span>
                    {label}
                    {primary && (
                      <span className="ml-auto rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white/90">
                        New
                      </span>
                    )}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 3: Recent activity + Manufacturer breakdown ── */}
        <div className="grid grid-cols-7 gap-4">

          {/* Recent activity */}
          <div className="sa-card col-span-4 rounded-2xl p-5 shadow-none">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Activity size={12} className="text-primary" />
                </div>
                <p className="text-[14px] font-bold text-on-surface tracking-tight">Recent Activity</p>
              </div>
              <Button variant="ghost" size="icon-sm" className="text-on-surface-variant hover:text-primary hover:bg-surface-container-low">
                <RotateCcw size={13} />
              </Button>
            </div>
            <div className="space-y-0.5">
              {recentActivity.map((item) => {
                const s = activityIcon[item.type];
                return (
                  <div
                    key={item.id}
                    className="group flex cursor-default gap-3 rounded-xl px-3 py-3 transition-all duration-100 hover:bg-surface-container-low"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: s.bg, color: s.dot }}
                    >
                      {s.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[15px] font-semibold text-on-surface leading-snug">{item.title}</p>
                      <p className="text-[12px] text-on-surface-variant mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[11px] text-on-surface-variant font-medium shrink-0 mt-0.5 tabular-nums">{item.time}</span>
                  </div>
                );
              })}
            </div>
            <Link
              href="/admin/assets"
              className="mt-3 flex items-center justify-center gap-1.5 border-t border-(--sa-ghost-border) pt-3 text-[12px] font-semibold text-primary transition-colors duration-150 hover:text-primary/80"
            >
              View all activity <ArrowUpRight size={12} />
            </Link>
          </div>

          {/* Manufacturer Breakdown */}
          <div className="sa-card col-span-3 flex flex-col rounded-2xl p-5 shadow-none">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                <Package size={12} className="text-primary" />
              </div>
              <p className="text-[14px] font-bold text-on-surface tracking-tight">By Manufacturer</p>
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 mb-4">
              {categoryKeys.map((cat) => {
                const active = cat === activeCategory;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={active
                      ? "flex items-center gap-1 rounded-lg border border-primary/30 bg-secondary-container px-2.5 py-1 text-[12px] font-bold text-primary transition-all duration-150"
                      : "flex items-center gap-1 rounded-lg border border-transparent bg-surface px-2.5 py-1 text-[12px] font-bold text-on-surface-variant transition-all duration-150 hover:bg-surface-container-low"
                    }
                  >
                    <span style={{ color: active ? "#6090E3" : "#b0bfcc" }}>{categoryIcons[cat]}</span>
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Pie chart */}
            <div className="w-60 h-60 mx-auto mb-4">
              <PieChart slices={activeSlices} />
            </div>

            {/* Legend */}
            <div className="space-y-1.5 mt-auto">
              {activeSlices.map((s) => (
                <div key={s.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: s.color }} />
                    <span className="text-[13px] font-medium text-on-surface">{s.label}</span>
                  </div>
                  <span className="text-[13px] font-bold text-on-surface">{s.value}%</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </AdminShell>
  );
}
