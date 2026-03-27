"use client";

import { UserShell } from "@/components/layout/user-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockAssets } from "@/lib/mock-data";
import { Laptop, Monitor, HelpCircle, Info, MapPin, Tag, Calendar, Package } from "lucide-react";

const userAssets = mockAssets.filter((a) => a.assignedTo === "Alex");

const typeConfig: Record<string, { icon: React.ReactNode; bg: string; color: string; accent: string; accentBorder: string }> = {
  LAPTOP:  { icon: <Laptop  size={20} />, bg: "rgba(96,144,227,0.1)",  color: "#6090E3", accent: "#6090E3", accentBorder: "rgba(96,144,227,0.18)"  },
  MONITOR: { icon: <Monitor size={20} />, bg: "rgba(124,58,237,0.1)",  color: "#7c3aed", accent: "#7c3aed", accentBorder: "rgba(124,58,237,0.18)"  },
};

const fallbackConfig = { icon: <Package size={20} />, bg: "rgba(100,116,139,0.1)", color: "#64748b", accent: "#64748b", accentBorder: "rgba(100,116,139,0.18)" };

export default function MyAssetsPage() {
  const activeCount  = userAssets.filter((a) => a.status === "ACTIVE").length;
  const repairCount  = userAssets.filter((a) => a.status === "REPAIR").length;

  return (
    <UserShell userName="Alex">
      <div className="space-y-5 max-w-4xl">

        {/* Header */}
        <div>
          <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">My Assets</h1>
          <p className="text-[13px] text-[#8a9fb8] mt-0.5">All hardware assets currently assigned to your profile.</p>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Total Assigned", value: userAssets.length.toString(), color: "#6090E3", bg: "rgba(96,144,227,0.08)", border: "rgba(96,144,227,0.18)", accent: "#6090E3" },
            { label: "Active",         value: activeCount.toString(),        color: "#12B76A", bg: "rgba(18,183,106,0.08)", border: "rgba(18,183,106,0.18)", accent: "#12B76A" },
            { label: "Under Repair",   value: repairCount.toString(),        color: "#ef4444", bg: "rgba(239,68,68,0.08)",  border: "rgba(239,68,68,0.18)",  accent: "#ef4444" },
          ].map(({ label, value, color, bg, border, accent }) => (
            <div
              key={label}
              className="rounded-2xl p-4 relative overflow-hidden"
              style={{ background: bg, border: `1px solid ${border}` }}
            >
              <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: accent }} />
              <p className="text-[11px] font-bold uppercase tracking-[0.08em] mb-2 mt-0.5" style={{ color }}>{label}</p>
              <p className="text-[1.75rem] font-bold leading-none" style={{ color }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Asset cards */}
        {userAssets.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {userAssets.map((asset) => {
              const tc = typeConfig[asset.type] ?? fallbackConfig;
              return (
                <div
                  key={asset.id}
                  className="rounded-2xl p-5 relative overflow-hidden transition-all duration-150"
                  style={{ background: "#ffffff", border: `1px solid ${tc.accentBorder}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 4px 16px ${tc.bg}, 0 1px 4px rgba(0,0,0,0.04)`; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)"; }}
                >
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: tc.accent }} />

                  {/* Card header */}
                  <div className="flex items-start justify-between mb-4 mt-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: tc.bg }}>
                      <span style={{ color: tc.color }}>{tc.icon}</span>
                    </div>
                    <StatusBadge status={asset.status} dot />
                  </div>

                  <h3 className="text-[14px] font-bold text-[#080f1e] tracking-tight">{asset.name}</h3>
                  <p className="text-[11px] font-mono text-[#b0bfcc] mt-0.5">{asset.id}</p>

                  {/* Info rows */}
                  <div className="mt-4 space-y-1.5">
                    <InfoRow icon={<Tag size={11} />}      label="Model"    value={asset.model} />
                    <InfoRow icon={<Tag size={11} />}      label="Serial"   value={asset.serialNumber} mono />
                    <InfoRow icon={<MapPin size={11} />}   label="Location" value={asset.location ?? "—"} />
                    <InfoRow icon={<Calendar size={11} />} label="Assigned" value={asset.purchaseDate ?? "—"} />
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 flex items-center justify-between" style={{ borderTop: "1px solid #edf0f5" }}>
                    <button
                      className="flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-150 px-3 py-1.5 rounded-lg"
                      style={{ background: tc.bg, color: tc.color }}
                      onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.95)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
                    >
                      <HelpCircle size={12} /> Request Support
                    </button>
                    <button className="flex items-center gap-1.5 text-[12px] font-semibold text-[#8a9fb8] hover:text-primary transition-colors duration-150">
                      <Info size={12} /> Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="rounded-2xl p-14 flex flex-col items-center text-center"
            style={{ background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(96,144,227,0.1)" }}>
              <Laptop size={24} className="text-primary" />
            </div>
            <p className="text-[14px] font-bold text-[#080f1e]">No assets assigned</p>
            <p className="text-[13px] text-[#8a9fb8] mt-1.5">Contact your IT administrator to get assets assigned to your profile.</p>
          </div>
        )}

      </div>
    </UserShell>
  );
}

function InfoRow({ icon, label, value, mono }: { icon: React.ReactNode; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5 px-3 rounded-lg" style={{ background: "#f7f9fc" }}>
      <div className="flex items-center gap-2">
        <span className="text-[#b0bfcc]">{icon}</span>
        <span className="text-[11px] font-medium text-[#8a9fb8]">{label}</span>
      </div>
      <span className={`text-[11px] font-semibold text-[#3a5070] ${mono ? "font-mono" : ""}`}>{value}</span>
    </div>
  );
}
