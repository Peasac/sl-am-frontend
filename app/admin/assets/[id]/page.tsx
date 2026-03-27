"use client";

import Link from "next/link";
import { AdminShell } from "@/components/layout/admin-shell";
import { StatusBadge } from "@/components/ui/status-badge";
import { mockAssetDetail } from "@/lib/mock-data";
import {
  Edit2, Tag, Cpu, Wifi, Shield, User,
  ChevronRight, Calendar, MapPin, DollarSign, CheckCircle, Activity,
} from "lucide-react";

export default function AssetDetailPage() {
  const asset = mockAssetDetail;

  return (
    <AdminShell userName="Secure Architect">
      <div className="space-y-5 max-w-5xl">

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/admin/assets"
            className="text-[12px] font-medium text-[#8a9fb8] hover:text-primary transition-colors duration-150"
          >
            Asset Inventory
          </Link>
          <ChevronRight size={12} className="text-[#c8d4e0]" />
          <span className="text-[12px] font-medium text-[#3a5070]">{asset.id}</span>
        </div>

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className="px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide"
                style={{ background: "rgba(96,144,227,0.1)", color: "#1a4680", border: "1px solid rgba(96,144,227,0.2)" }}
              >
                {asset.type}
              </span>
              <StatusBadge status={asset.status} dot />
            </div>
            <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">{asset.name}</h1>
            <p className="text-[13px] text-[#8a9fb8] mt-1">
              Asset ID:&nbsp;<span className="font-mono font-semibold text-[#5a7090]">{asset.id}</span>
              &nbsp;·&nbsp;
              Serial:&nbsp;<span className="font-mono font-semibold text-[#5a7090]">{asset.serialNumber}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-[#5a7090] transition-all duration-150"
              style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#edf2fb"; e.currentTarget.style.border = "1px solid rgba(96,144,227,0.2)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.border = "1px solid #edf0f5"; }}
            >
              <Edit2 size={14} /> Edit Asset
            </button>
            <button
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[13px] font-semibold text-white transition-all duration-150"
              style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: "0 2px 10px rgba(96,144,227,0.35)" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(96,144,227,0.45)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(96,144,227,0.35)"; }}
            >
              <Tag size={14} /> Export Label
            </button>
          </div>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-3 gap-4">

          {/* Hardware Specs */}
          <div
            className="col-span-2 rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid rgba(96,144,227,0.16)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: "#6090E3" }} />
            <div className="flex items-center gap-2 mb-5 mt-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                <Cpu size={14} className="text-primary" />
              </div>
              <h2 className="text-[14px] font-bold text-[#080f1e] tracking-tight">Hardware Specifications</h2>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              <InfoField label="Manufacturer" value={asset.manufacturer} />
              <InfoField label="Model" value={asset.model} />
              <InfoField label="Category" value={asset.category} />
              <InfoField label="CPU" value={asset.cpu ?? "—"} />
              <InfoField label="RAM" value={asset.ram ?? "—"} />
              <InfoField label="Storage" value={asset.storage ?? "—"} />
            </div>
            {asset.deviceConfig && (
              <div>
                <p className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em] mb-2">Device Config</p>
                <pre
                  className="rounded-xl p-4 text-[12px] font-mono whitespace-pre-wrap leading-relaxed"
                  style={{ background: "#f7f9fc", border: "1px solid #edf0f5", color: "#3a5070" }}
                >
                  {asset.deviceConfig}
                </pre>
              </div>
            )}
          </div>

          {/* Ownership */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid rgba(96,144,227,0.16)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: "#6090E3" }} />
            <div className="flex items-center gap-2 mb-5 mt-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                <User size={14} className="text-primary" />
              </div>
              <h2 className="text-[14px] font-bold text-[#080f1e] tracking-tight">Ownership</h2>
            </div>

            <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid #edf0f5" }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-[12px] font-bold shrink-0"
                style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: "0 2px 8px rgba(96,144,227,0.3)" }}
              >
                {asset.assignedTo?.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <p className="text-[13px] font-bold text-[#080f1e]">{asset.assignedTo}</p>
                <p className="text-[11px] text-[#8a9fb8]">Primary Owner</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <OwnerField icon={<MapPin size={12} />}      label="Department"  value={asset.department ?? "—"} />
              <OwnerField icon={<User size={12} />}        label="Owner"       value={asset.owner ?? "—"} />
              <OwnerField icon={<DollarSign size={12} />}  label="Cost Center" value={asset.costCenter ?? "—"} />
              <OwnerField icon={<MapPin size={12} />}      label="Location"    value={asset.location ?? "—"} />
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-2 gap-4">

          {/* Network & OS */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid rgba(96,144,227,0.16)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: "#6090E3" }} />
            <div className="flex items-center gap-2 mb-5 mt-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
                <Wifi size={14} className="text-primary" />
              </div>
              <h2 className="text-[14px] font-bold text-[#080f1e] tracking-tight">Network & OS</h2>
            </div>
            <div className="space-y-3">
              <InfoField label="Operating System" value={asset.os ?? "—"} />
              <InfoField label="MAC Address" value={asset.macAddress ?? "—"} mono />
              <InfoField label="IP Address" value={asset.ipAddress ?? "—"} mono />
            </div>
          </div>

          {/* Security */}
          <div
            className="rounded-2xl p-5 relative overflow-hidden"
            style={{ background: "#ffffff", border: "1px solid rgba(18,183,106,0.2)", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <div className="absolute top-0 left-0 right-0 h-0.75 rounded-t-2xl" style={{ background: "#12B76A" }} />
            <div className="flex items-center justify-between mb-5 mt-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(18,183,106,0.1)" }}>
                  <Shield size={14} className="text-accent" />
                </div>
                <h2 className="text-[14px] font-bold text-[#080f1e] tracking-tight">Security Status</h2>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg" style={{ background: "rgba(18,183,106,0.08)", border: "1px solid rgba(18,183,106,0.18)" }}>
                <Activity size={11} className="text-accent" />
                <span className="text-[11px] font-semibold text-[#0a6644]">All clear</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <SecurityCard label="Encryption" value={asset.encryptionStatus ?? "—"} />
              <SecurityCard label="Antivirus" value={asset.antivirus ?? "—"} />
              <SecurityCard label="Compliance" value={asset.compliance ?? "—"} />
            </div>
            <div className="mt-4 flex items-center gap-2 pt-3.5" style={{ borderTop: "1px solid #edf0f5" }}>
              <Calendar size={11} className="text-[#b0bfcc]" />
              <span className="text-[11px] text-[#b0bfcc]">Last audit: <span className="font-semibold text-[#8a9fb8]">{asset.lastAudit}</span></span>
            </div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function InfoField({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em] mb-1">{label}</p>
      <p className={`text-[13px] font-semibold text-[#080f1e] whitespace-pre-line ${mono ? "font-mono" : ""}`}>{value}</p>
    </div>
  );
}

function OwnerField({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between py-2 px-3 rounded-xl transition-colors duration-150"
      style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "#edf2fb"; e.currentTarget.style.border = "1px solid rgba(96,144,227,0.18)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; e.currentTarget.style.border = "1px solid #edf0f5"; }}
    >
      <div className="flex items-center gap-2">
        <span className="text-[#b0bfcc]">{icon}</span>
        <span className="text-[12px] font-medium text-[#5a7090]">{label}</span>
      </div>
      <span className="text-[12px] font-semibold text-[#080f1e]">{value}</span>
    </div>
  );
}

function SecurityCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="rounded-xl p-3 transition-all duration-150"
      style={{ background: "rgba(18,183,106,0.06)", border: "1px solid rgba(18,183,106,0.15)" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(18,183,106,0.1)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(18,183,106,0.06)"; }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <CheckCircle size={11} className="text-accent" />
        <span className="text-[10px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">{label}</span>
      </div>
      <p className="text-[12px] font-bold text-[#080f1e]">{value}</p>
    </div>
  );
}
