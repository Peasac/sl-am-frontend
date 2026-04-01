import { cn } from "@/lib/utils";
import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: React.ReactNode;
  error?: string;
}

export function Input({ label, icon, error, className, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-on-surface-variant">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
            {icon}
          </span>
        )}
        <input
          className={cn(
            "sa-input w-full rounded-md px-3 py-2.5 text-sm placeholder:text-on-surface-variant",
            icon && "pl-9",
            error && "border-error focus:border-error",
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
