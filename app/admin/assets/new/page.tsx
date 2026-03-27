"use client";

import { useState, useRef } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import Link from "next/link";
import {
  ArrowLeft, ChevronRight, Cpu, Shield, Tag,
  Wifi, User, Building2, FileText, Paperclip, X,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-3" style={{ borderBottom: "1px solid #edf0f5" }}>
      <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "rgba(96,144,227,0.1)" }}>
        <span className="text-primary">{icon}</span>
      </div>
      <h2 className="text-[13px] font-bold text-[#080f1e] tracking-tight">{title}</h2>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.08em]">
        {label}{required && <span className="text-primary ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass = "px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 placeholder:text-[#b8c8d8] w-full";
const inputStyle = { background: "#f7f9fc", border: "1.5px solid #edf0f5", color: "#080f1e" };
const focusOn  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.border = "1.5px solid #6090E3";
  e.currentTarget.style.background = "#ffffff";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(96,144,227,0.10)";
};
const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.border = "1.5px solid #edf0f5";
  e.currentTarget.style.background = "#f7f9fc";
  e.currentTarget.style.boxShadow = "none";
};

function TextInput({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={inputClass}
      style={inputStyle}
      onFocus={focusOn}
      onBlur={focusOff}
    />
  );
}

function SelectInput({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`${inputClass} appearance-none cursor-pointer`}
      style={inputStyle}
      onFocus={focusOn}
      onBlur={focusOff}
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function NewAssetPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  // Form state
  const [assetName, setAssetName]           = useState("");
  const [assetType, setAssetType]           = useState("Select type");
  const [customType, setCustomType]         = useState("");
  const [manufacturer, setManufacturer]     = useState("");
  const [modelNumber, setModelNumber]       = useState("");
  const [serialNumber, setSerialNumber]     = useState("");
  const [category, setCategory]             = useState("Select category");
  const [department, setDepartment]         = useState("");
  const [owner, setOwner]                   = useState("");
  const [costCenter, setCostCenter]         = useState("");
  const [os, setOs]                         = useState("");
  const [cpu, setCpu]                       = useState("");
  const [ram, setRam]                       = useState("");
  const [storage, setStorage]               = useState("");
  const [deviceConfig, setDeviceConfig]     = useState("");
  const [vendorName, setVendorName]         = useState("");
  const [vendorContact, setVendorContact]   = useState("");
  const [licenseKey, setLicenseKey]         = useState("Select");
  const [compliance, setCompliance]         = useState("Select");
  const [lastAudit, setLastAudit]           = useState("");
  const [encryption, setEncryption]         = useState("Select");
  const [antivirus, setAntivirus]           = useState("Select");
  const [notes, setNotes]                   = useState("");

  const cardStyle = { background: "#ffffff", border: "1px solid #edf0f5", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };

  return (
    <AdminShell userName="Secure Architect">
      <div className="max-w-4xl space-y-5">

        {/* Header */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/assets"
            className="flex items-center gap-1.5 text-[12px] font-medium text-[#8a9fb8] hover:text-primary transition-colors duration-150"
          >
            <ArrowLeft size={13} /> Asset Inventory
          </Link>
          <ChevronRight size={12} className="text-[#c8d4e0]" />
          <span className="text-[12px] font-medium text-[#3a5070]">New Asset</span>
        </div>

        <div>
          <h1 className="text-[22px] font-bold text-[#080f1e] tracking-tight">Add New Asset</h1>
          <p className="text-[13px] text-[#8a9fb8] mt-0.5">Fill in the details below to register a new asset in the inventory.</p>
        </div>

        {/* ── Section 1: Identity ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <SectionHeader icon={<Tag size={12} />} title="Asset Identity" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Asset Name" required>
              <TextInput placeholder='e.g. MacBook Pro 16"' value={assetName} onChange={setAssetName} />
            </Field>
            <Field label="Asset Type" required>
              <SelectInput
                value={assetType}
                onChange={setAssetType}
                options={["Select type", "Laptop", "Server", "Monitor", "Network Device", "Workstation", "Tablet", "Phone", "Custom"]}
              />
            </Field>
            {assetType === "Custom" && (
              <Field label="Custom Type">
                <TextInput placeholder="Describe the asset type" value={customType} onChange={setCustomType} />
              </Field>
            )}
            <Field label="Category" required>
              <SelectInput
                value={category}
                onChange={setCategory}
                options={["Select category", "Hardware", "Network", "Software", "Peripheral", "Infrastructure", "Mobile", "Other"]}
              />
            </Field>
            <Field label="Manufacturer">
              <TextInput placeholder="e.g. Apple Inc." value={manufacturer} onChange={setManufacturer} />
            </Field>
            <Field label="Model Number">
              <TextInput placeholder="e.g. MacBook Pro 16-inch M3" value={modelNumber} onChange={setModelNumber} />
            </Field>
            <Field label="Serial Number" required>
              <TextInput placeholder="e.g. C02FX1G9MD6R" value={serialNumber} onChange={setSerialNumber} />
            </Field>
          </div>
        </div>

        {/* ── Section 2: Ownership ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <SectionHeader icon={<User size={12} />} title="Ownership & Assignment" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="User Department">
              <TextInput placeholder="e.g. Engineering" value={department} onChange={setDepartment} />
            </Field>
            <Field label="Owner (Responsible Person)">
              <TextInput placeholder="e.g. Jordan Lee" value={owner} onChange={setOwner} />
            </Field>
            <Field label="Cost Center (Accounting Unit)">
              <TextInput placeholder="e.g. CC-8812-ENG" value={costCenter} onChange={setCostCenter} />
            </Field>
          </div>
        </div>

        {/* ── Section 3: Hardware Specs ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <SectionHeader icon={<Cpu size={12} />} title="Hardware Specifications" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Operating System">
              <TextInput placeholder="e.g. macOS Sonoma 14.2" value={os} onChange={setOs} />
            </Field>
            <Field label="CPU">
              <TextInput placeholder="e.g. Apple M3 Pro 12-Core" value={cpu} onChange={setCpu} />
            </Field>
            <Field label="RAM">
              <TextInput placeholder="e.g. 32GB LPDDR5X" value={ram} onChange={setRam} />
            </Field>
            <Field label="Storage">
              <TextInput placeholder="e.g. 1TB SSD NVMe" value={storage} onChange={setStorage} />
            </Field>
            <div className="col-span-2">
              <Field label="Device Config">
                <textarea
                  value={deviceConfig}
                  onChange={(e) => setDeviceConfig(e.target.value)}
                  placeholder="Any custom hardware/software setup, peripherals, accessories..."
                  rows={3}
                  className="px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 placeholder:text-[#b8c8d8] w-full resize-none"
                  style={inputStyle}
                  onFocus={focusOn}
                  onBlur={focusOff}
                />
              </Field>
            </div>
          </div>
        </div>

        {/* ── Section 4: Network ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <SectionHeader icon={<Wifi size={12} />} title="Vendor Details" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Vendor Name">
              <TextInput placeholder="e.g. CDW Corporation" value={vendorName} onChange={setVendorName} />
            </Field>
            <Field label="Vendor Contact">
              <TextInput placeholder="e.g. vendor@cdw.com or +1 800 000 0000" value={vendorContact} onChange={setVendorContact} />
            </Field>
            <Field label="License Key Available">
              <SelectInput value={licenseKey} onChange={setLicenseKey} options={["Select", "Yes", "No", "N/A"]} />
            </Field>
          </div>
        </div>

        {/* ── Section 5: Security & Compliance ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <SectionHeader icon={<Shield size={12} />} title="Security & Compliance" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Compliance Status">
              <SelectInput
                value={compliance}
                onChange={setCompliance}
                options={["Select", "Compliant", "Non-Compliant", "Pending Review", "Exempt"]}
              />
            </Field>
            <Field label="Last Audit Date">
              <input
                type="date"
                value={lastAudit}
                onChange={(e) => setLastAudit(e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </Field>
            <Field label="Encryption Status">
              <SelectInput
                value={encryption}
                onChange={setEncryption}
                options={["Select", "Enabled", "Disabled", "Partial", "N/A"]}
              />
            </Field>
            <Field label="Antivirus Installed">
              <SelectInput value={antivirus} onChange={setAntivirus} options={["Select", "Yes", "No"]} />
            </Field>
          </div>
        </div>

        {/* ── Section 6: Notes & Attachment ── */}
        <div className="rounded-2xl p-5" style={cardStyle}>
          <SectionHeader icon={<FileText size={12} />} title="Notes & Attachments" />
          <div className="space-y-4">
            <Field label="Notes / Comments">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes or context about this asset..."
                rows={3}
                className="px-3.5 py-2.5 text-[13px] rounded-xl focus:outline-none transition-all duration-150 placeholder:text-[#b8c8d8] w-full resize-none"
                style={inputStyle}
                onFocus={focusOn}
                onBlur={focusOff}
              />
            </Field>

            <Field label="Attachment (Photo / Document)">
              <div
                className="rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-150"
                style={{ background: "#f7f9fc", border: "1.5px dashed #d4e0f0" }}
                onClick={() => fileRef.current?.click()}
                onMouseEnter={(e) => { e.currentTarget.style.border = "1.5px dashed #6090E3"; e.currentTarget.style.background = "#edf2fb"; }}
                onMouseLeave={(e) => { e.currentTarget.style.border = "1.5px dashed #d4e0f0"; e.currentTarget.style.background = "#f7f9fc"; }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "rgba(96,144,227,0.1)" }}>
                  <Paperclip size={15} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  {fileName ? (
                    <p className="text-[13px] font-semibold text-[#080f1e] truncate">{fileName}</p>
                  ) : (
                    <>
                      <p className="text-[13px] font-semibold text-[#3a5070]">Click to upload a file</p>
                      <p className="text-[11px] text-[#b0bfcc] mt-0.5">PNG, JPG, PDF up to 10MB</p>
                    </>
                  )}
                </div>
                {fileName && (
                  <button
                    onClick={(e) => { e.stopPropagation(); setFileName(null); }}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#b0bfcc] hover:text-[#ef4444] transition-colors duration-150 shrink-0"
                    style={{ background: "#edf0f5" }}
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*,.pdf"
                className="hidden"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
              />
            </Field>
          </div>
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center justify-between pb-6">
          <Link
            href="/admin/assets"
            className="px-5 py-2.5 rounded-xl text-[13px] font-semibold text-[#5a7090] transition-all duration-150"
            style={{ background: "#f7f9fc", border: "1px solid #edf0f5" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#edf0f5"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "#f7f9fc"; }}
          >
            Cancel
          </Link>
          <button
            className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-semibold text-white transition-all duration-150"
            style={{ background: "linear-gradient(135deg, #1a4680, #6090E3)", boxShadow: "0 2px 10px rgba(96,144,227,0.35)" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1f5090, #6fa0f0)"; e.currentTarget.style.boxShadow = "0 4px 14px rgba(96,144,227,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #1a4680, #6090E3)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(96,144,227,0.35)"; }}
          >
            <Building2 size={14} /> Create Asset
          </button>
        </div>

      </div>
    </AdminShell>
  );
}
