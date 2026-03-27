"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, ShieldCheck, ArrowRight, Loader2, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { setAuth, MOCK_CREDENTIALS } from "@/lib/auth";
import type { Role } from "@/types";

type Tab = "USER" | "ADMIN";

export default function LoginPage() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("USER");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function autofill(role: Tab) {
    setTab(role);
    setError("");
    setEmail(role === "ADMIN" ? MOCK_CREDENTIALS.admin.email : MOCK_CREDENTIALS.user.email);
    setPassword(role === "ADMIN" ? MOCK_CREDENTIALS.admin.password : MOCK_CREDENTIALS.user.password);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const cred = tab === "ADMIN" ? MOCK_CREDENTIALS.admin : MOCK_CREDENTIALS.user;
    if (email === cred.email && password === cred.password) {
      setAuth({ role: cred.role as Role, name: cred.name, email: cred.email, token: "mock-jwt-" + cred.role.toLowerCase() });
      router.push(cred.role === "ADMIN" ? "/admin/dashboard" : "/dashboard");
    } else {
      setError("Incorrect email or password. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-9">

      {/* Outer glow ring */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[120px]" style={{ background: "radial-gradient(circle, #6090E3, transparent)" }} />
      </div>

      <div className="relative w-full max-w-6xl flex rounded-[28px] overflow-hidden shadow-[0_28px_70px_rgba(8,15,30,0.45)]">

        {/* ── LEFT PANEL ── */}
        <div
          className="hidden lg:flex w-[44%] shrink-0 flex-col justify-between gap-11 p-15 relative overflow-hidden"
          style={{ background: "linear-gradient(155deg, #050d1f 0%, #071428 35%, #091c3a 65%, #0b2550 100%)" }}
        >
          {/* Noise / dot texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.35]"
            style={{
              backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
              backgroundSize: "22px 22px",
            }}
          />

          {/* Top-left corner glow */}
          <div className="absolute -top-32 -left-32 w-[320px] h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(96,144,227,0.22), transparent 70%)" }} />
          {/* Bottom-right accent */}
          <div className="absolute -bottom-20 -right-16 w-65 h-65 rounded-full blur-[90px] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(18,183,106,0.14), transparent 70%)" }} />
          {/* Mid sweep */}
          <div className="absolute top-1/2 -translate-y-1/2 -right-24 w-[200px] h-[400px] rounded-full blur-[80px] pointer-events-none opacity-30" style={{ background: "linear-gradient(to bottom, #6090E3, transparent)" }} />

          {/* Soft edge blend */}
          <div className="absolute top-0 right-0 h-full w-6 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(5,13,31,0), rgba(5,13,31,0.45))" }} />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(96,144,227,0.18)", border: "1px solid rgba(96,144,227,0.35)", boxShadow: "0 0 20px rgba(96,144,227,0.2)" }}>
              <ShieldCheck size={18} className="text-[#6090E3]" />
            </div>
            <span className="text-white font-bold text-[25px] tracking-tight">Starlink</span>
          </div>

          {/* Headline block */}
          <div className="relative z-10 space-y-7">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-[#a8c4f0] tracking-wide" style={{ background: "rgba(96,144,227,0.12)", border: "1px solid rgba(96,144,227,0.22)" }}>
              <Zap size={11} className="text-[#6090E3]" fill="currentColor" />
              Enterprise ITAM Platform
            </div>

            {/* Headline with soft glow backdrop */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl blur-3xl opacity-30 pointer-events-none" style={{ background: "radial-gradient(ellipse, rgba(96,144,227,0.85), transparent 70%)" }} />
              <h1 className="relative text-white font-bold leading-[1.12] tracking-tight" style={{ fontSize: "2.6rem" }}>
                The Secure<br />Architect.
              </h1>
            </div>

            <p className="text-[#6a8bb5] text-[13.5px] leading-[1.7] max-w-[250px]">
              Intelligent IT asset management for the modern enterprise — monitor, audit, and secure your infrastructure.
            </p>

            {/* Stats */}
            <div className="flex gap-8 pt-1">
              {[{ value: "12,482", label: "Assets tracked" }, { value: "98.2%", label: "Compliance rate" }].map((s) => (
                <div key={s.label}>
                  <p className="text-white text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-[#4a6a90] text-[11px] mt-0.5 font-medium uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SOC2 badge */}
          <div className="relative z-10 flex items-center gap-3.5 px-4 py-3.5 rounded-2xl w-fit" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}>
            <div className="w-9 h-9 rounded-xl bg-[#12B76A] flex items-center justify-center flex-shrink-0" style={{ boxShadow: "0 0 20px rgba(18,183,106,0.35)" }}>
              <ShieldCheck size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white text-[11px] font-bold uppercase tracking-[0.1em]">SOC 2 Compliant</p>
              <p className="text-[#4a6a90] text-[11px] mt-0.5">Enterprise grade security</p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div
          className="flex-1 flex items-center justify-center px-10 py-12 lg:px-16"
          style={{ background: "linear-gradient(180deg, #ffffff 0%, #f4f7fb 100%)" }}
        >
          <div className="w-full max-w-[390px]">

            {/* Heading */}
            <div className="mb-9">
              <h2 className="text-[#080f1e] font-bold tracking-tight" style={{ fontSize: "1.85rem", lineHeight: 1.2 }}>
                Welcome back
              </h2>
              <p className="text-[#5f7390] text-[14px] mt-2 leading-relaxed">
                Sign in to access your ITAM control center.
              </p>
            </div>

            {/* Pill toggle */}
            <div className="flex p-1 mb-8 rounded-2xl gap-1" style={{ background: "#f0f3f8", border: "1px solid #e4e9f0" }}>
              {(["USER", "ADMIN"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => autofill(t)}
                  className={cn(
                    "flex-1 py-[11px] rounded-xl text-[13px] font-semibold transition-all duration-200 relative",
                    tab === t
                      ? "text-[#080f1e] bg-white"
                      : "text-[#8a9fb8] hover:text-[#3a5070]"
                  )}
                  style={tab === t ? { boxShadow: "0 2px 12px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.08)" } : {}}
                >
                  {t === "USER" ? "User Portal" : "Admin Access"}
                </button>
              ))}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">
                  Corporate Email
                </label>
                <div className="relative group">
                  <Mail
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b8c8d8] transition-colors duration-200 group-focus-within:text-[#6090E3]"
                  />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-11 pr-4 py-[13px] text-[14px] text-[#080f1e] rounded-xl transition-all duration-200 placeholder:text-[#b8c8d8] focus:outline-none"
                    style={{
                      background: "#f5f7fb",
                      border: "1.5px solid #dfe6f0",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1.5px solid #5a8fe0";
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.boxShadow = "0 0 0 4px rgba(90,143,224,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1.5px solid #dfe6f0";
                      e.currentTarget.style.background = "#f5f7fb";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-[11px] font-bold text-[#8a9fb8] uppercase tracking-[0.1em]">
                  Password
                </label>
                <div className="relative group">
                  <Lock
                    size={15}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b8c8d8] transition-colors duration-200 group-focus-within:text-[#6090E3]"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full pl-11 pr-4 py-[13px] text-[14px] text-[#080f1e] rounded-xl transition-all duration-200 placeholder:text-[#b8c8d8] focus:outline-none"
                    style={{
                      background: "#f5f7fb",
                      border: "1.5px solid #dfe6f0",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.border = "1.5px solid #5a8fe0";
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.boxShadow = "0 0 0 4px rgba(90,143,224,0.12)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.border = "1.5px solid #dfe6f0";
                      e.currentTarget.style.background = "#f5f7fb";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ background: "#fff5f5", border: "1px solid #fecdcd" }}>
                  <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                  <p className="text-[13px] text-red-600 font-medium">{error}</p>
                </div>
              )}

              {/* CTA Button */}
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex items-center justify-center gap-2.5 rounded-xl font-semibold text-white text-[14px] tracking-wide transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                style={{
                  padding: "14px 20px",
                  background: loading ? "#1d3a5e" : "linear-gradient(135deg, #0e2a4e 0%, #1a4680 100%)",
                  boxShadow: "0 3px 10px rgba(10,37,64,0.28), 0 1px 2px rgba(10,37,64,0.18), inset 0 1px 0 rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "linear-gradient(135deg, #122f58 0%, #1f5090 100%)";
                    e.currentTarget.style.boxShadow = "0 5px 16px rgba(10,37,64,0.38), 0 2px 5px rgba(10,37,64,0.2), inset 0 1px 0 rgba(255,255,255,0.1)";
                    e.currentTarget.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "linear-gradient(135deg, #0e2a4e 0%, #1a4680 100%)";
                  e.currentTarget.style.boxShadow = "0 3px 10px rgba(10,37,64,0.28), 0 1px 2px rgba(10,37,64,0.18), inset 0 1px 0 rgba(255,255,255,0.07)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translateY(0) scale(0.99)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translateY(-1px) scale(1.005)";
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in to Dashboard
                    <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            {/* <div className="flex items-center gap-3 my-7">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #e4e9f0)" }} />
              <span className="text-[11px] font-semibold text-[#b0bfcc] uppercase tracking-[0.1em]">Or continue with</span>
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #e4e9f0)" }} />
            </div> */}

            {/* SSO */}
            {/* <div className="grid grid-cols-3 gap-3">
              {["Google", "Azure AD", "Okta"].map((label) => (
                <button
                  key={label}
                  type="button"
                  className="py-2.5 rounded-xl text-[12px] font-semibold text-[#4a6080] transition-all duration-150"
                  style={{ background: "#f7f9fc", border: "1.5px solid #e4e9f0" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.border = "1.5px solid #c8d4e0";
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f7f9fc";
                    e.currentTarget.style.border = "1.5px solid #e4e9f0";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {label}
                </button>
              ))}
            </div> */}

            <p className="text-center text-[11px] text-[#b0bfcc] mt-9">
              © 2026 StarLink. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
