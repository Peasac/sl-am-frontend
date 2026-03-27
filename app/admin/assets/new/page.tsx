"use client";

import { AdminShell } from "@/components/layout/admin-shell";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NewAssetPage() {
  return (
    <AdminShell>
      <div className="max-w-2xl space-y-6">
        <div className="flex items-center gap-3">
          <Link href="/admin/assets" className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800 transition-colors">
            <ArrowLeft size={15} /> Back to Inventory
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-[#101828]">Add New Asset</h1>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
          {[
            { label: "Asset Name", placeholder: "e.g. MacBook Pro 16\"" },
            { label: "Serial Number", placeholder: "e.g. C02FX1G9MD6R" },
            { label: "Manufacturer", placeholder: "e.g. Apple Inc." },
          ].map((f) => (
            <div key={f.label} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{f.label}</label>
              <input placeholder={f.placeholder} className="px-3 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6090E3] focus:border-transparent placeholder:text-gray-400" />
            </div>
          ))}
          <button className="w-full py-2.5 bg-[#101828] hover:bg-[#1d2939] rounded-xl text-white text-sm font-semibold transition-colors mt-2">
            Create Asset
          </button>
        </div>
      </div>
    </AdminShell>
  );
}
