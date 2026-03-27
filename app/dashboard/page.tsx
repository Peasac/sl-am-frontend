"use client";

import { UserShell } from "@/components/layout/user-shell";
import { mockAssets } from "@/lib/mock-data";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  AlertTriangle, Laptop, Monitor, AlertCircle,
  ShoppingCart, MapPin, HelpCircle, ArrowRight,
  CheckCircle2, Clock,
} from "lucide-react";
import Link from "next/link";

const userAssets = mockAssets.filter((a) => a.assignedTo === "Alex").slice(0, 2);

const typeIcons: Record<string, React.ReactNode> = {
  LAPTOP:  <Laptop  size={18} />,
  MONITOR: <Monitor size={18} />,
};

const notifications = [
  {
    id: "n1",
    color: "#ef4444",
    bg: "rgba(239,68,68,0.07)",
    border: "rgba(239,68,68,0.18)",
    label: "Required Action",
    message: "Security update v2.4 pending for MacBook Pro. Deadline: Tomorrow.",
  },
  {
    id: "n2",
    color: "#12B76A",
    bg: "rgba(18,183,106,0.07)",
    border: "rgba(18,183,106,0.18)",
    label: "System Reminder",
    message: "Quarterly asset self-audit starting Nov 15th. Review your assets.",
  },
];

const supportActivity = [
  { id: "SR-99210", title: "VPN Access Request",   statusLabel: "In Progress", statusColor: "#6090E3", statusBg: "rgba(96,144,227,0.1)",  updated: "Updated 2 hours ago" },
  { id: "SR-98845", title: "Keyboard Replacement", statusLabel: "Resolved",    statusColor: "#12B76A", statusBg: "rgba(18,183,106,0.1)", updated: "Closed Oct 28" },
];

const quickActions = [
  { label: "Report Issue",       icon: AlertTriangle },
  { label: "Request Equipment",  icon: ShoppingCart  },
  { label: "Update Location",    icon: MapPin        },
  { label: "Get Support",        icon: HelpCircle    },
];

export default function UserDashboardPage() {
  return (
    <UserShell userName="Alex">
      <div className="space-y-5 max-w-5xl">

        {/* Welcome banner */}
        <div
          className="rounded-2xl p-7 relative overflow-hidden"
          style={{ background: "linear-gradient(135deg, #050d1f 0%, #091c3a 60%, #0b2550 100%)" }}
        >
          {/* Glow blobs */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-[80px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(96,144,227,0.18), transparent 70%)" }} />
          <div className="absolute -bottom-12 right-8 w-48 h-48 rounded-full blur-[70px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(18,183,106,0.12), transparent 70%)" }} />

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-[#4a6a90] uppercase tracking-[0.12em] mb-1.5">Welcome back</p>
              <h1 className="text-[1.6rem] font-bold text-white tracking-tight leading-tight">Alex Johnson</h1>
              <p className="text-[13px] text-[#5a7ea8] mt-1.5 max-w-xs">
                All systems are running normally. You have {userAssets.length} active assets assigned.
              </p>
            </div>
            <div className="flex gap-3">
              <div className="rounded-xl px-5 py-4 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[1.6rem] font-bold text-white leading-none">{userAssets.length}</p>
                <p className="text-[10px] font-bold text-[#4a6a90] uppercase tracking-[0.1em] mt-1.5">Assets</p>
              </div>
              <div className="rounded-xl px-5 py-4 text-center" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <p className="text-[1.6rem] font-bold text-white leading-none">0</p>
                <p className="text-[10px] font-bold text-[#4a6a90] uppercase tracking-[0.1em] mt-1.5">Alerts</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">

          {/* Left col: assets + quick actions */}
          <div className="col-span-2 space-y-4">

            {/* My Active Assets */}
            <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">My Active Assets</p>
                <Link
                  href="/dashboard/assets"
                  className="flex items-center gap-1 text-[12px] font-semibold text-[#6090E3] hover:text-[#1a4680] transition-colors duration-150"
                >
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {userAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="rounded-xl p-4 transition-all duration-150"
                    style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
                    onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid #d4e0f0"; e.currentTarget.style.background = "#f0f4fa"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid #edf0f5"; e.currentTarget.style.background = "#f7f9fc"; }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                        <span className="text-[#6090E3]">{typeIcons[asset.type] ?? <Laptop size={18} />}</span>
                      </div>
                      <StatusBadge status={asset.status} dot />
                    </div>
                    <p className="text-[13px] font-semibold text-[#080f1e] leading-snug">{asset.name}</p>
                    <p className="text-[11px] font-mono text-[#b0bfcc] mt-0.5">{asset.id}</p>
                    <button className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-[#8a9fb8] hover:text-[#6090E3] transition-colors duration-150">
                      <HelpCircle size={12} /> Request Support
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <p className="text-[14px] font-bold text-[#080f1e] tracking-tight mb-4">Quick Actions</p>
              <div className="grid grid-cols-4 gap-3">
                {quickActions.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    className="rounded-xl p-4 flex flex-col items-center gap-2.5 transition-all duration-150 group"
                    style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#edf2fb"; e.currentTarget.style.border = "1px solid rgba(96,144,227,0.2)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.border = "1px solid #edf0f5"; }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors duration-150" style={{ background: "rgba(96,144,227,0.1)" }}>
                      <Icon size={16} className="text-[#6090E3]" />
                    </div>
                    <span className="text-[11px] font-semibold text-[#5a7090] text-center leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right col: notifications + support */}
          <div className="space-y-4">

            {/* Notifications */}
            <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle size={14} className="text-[#f59e0b]" />
                <p className="text-[14px] font-bold text-[#080f1e] tracking-tight">Notifications</p>
              </div>
              <div className="space-y-3">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="rounded-xl p-3.5"
                    style={{ background: n.bg, border: `1px solid ${n.border}` }}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.08em] mb-1" style={{ color: n.color }}>{n.label}</p>
                    <p className="text-[12px] text-[#3a5070] leading-relaxed">{n.message}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Activity */}
            <div className="rounded-2xl p-5" style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
              <p className="text-[14px] font-bold text-[#080f1e] tracking-tight mb-4">Support Tickets</p>
              <div className="space-y-3">
                {supportActivity.map((ticket, i) => (
                  <div
                    key={ticket.id}
                    className="rounded-xl p-3"
                    style={{
                      background: "#f7f9fc",
                      border: "1px solid #edf0f5",
                      marginBottom: i < supportActivity.length - 1 ? undefined : 0,
                    }}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-[11px] font-mono text-[#b0bfcc]">{ticket.id}</p>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-md"
                        style={{ background: ticket.statusBg, color: ticket.statusColor }}
                      >
                        {ticket.statusLabel}
                      </span>
                    </div>
                    <p className="text-[12px] font-semibold text-[#080f1e]">{ticket.title}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={10} className="text-[#b0bfcc]" />
                      <p className="text-[11px] text-[#b0bfcc]">{ticket.updated}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                className="flex items-center justify-center gap-1.5 mt-3 w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-150"
                style={{ background: "#f7f9fc", border: "1px solid #edf0f5", color: "#5a7090" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#edf0f5"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; }}
              >
                <CheckCircle2 size={13} /> View All Tickets
              </button>
            </div>

          </div>
        </div>
      </div>
    </UserShell>
  );
}
