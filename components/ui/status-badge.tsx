import { cn } from "@/lib/utils";

type Status = "COMPLIANT" | "CRITICAL" | "PENDING" | "NON_COMPLIANT" | "active" | "inactive" | "ADMIN" | "USER" | "AUDITOR";

const statusConfig: Record<string, { label: string; className: string }> = {
  COMPLIANT: { label: "Compliant", className: "bg-tertiary-container text-tertiary" },
  CRITICAL: { label: "Critical", className: "bg-error-container text-error" },
  PENDING: { label: "Pending", className: "bg-surface-container-low text-primary" },
  NON_COMPLIANT: { label: "Non-Compliant", className: "bg-error-container text-error" },
  active: { label: "Active", className: "bg-tertiary-container text-tertiary" },
  inactive: { label: "Inactive", className: "bg-surface-container-low text-on-surface-variant" },
  ADMIN: { label: "Admin", className: "bg-secondary-container text-primary" },
  USER: { label: "Employee", className: "bg-secondary-container text-on-surface" },
  AUDITOR: { label: "Auditor", className: "bg-surface-container-low text-on-surface" },
};

interface StatusBadgeProps {
  status: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ status, dot = false, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: "bg-surface-container-low text-on-surface-variant" };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold",
        config.className,
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", {
            "bg-tertiary": status === "COMPLIANT" || status === "active",
            "bg-error": status === "CRITICAL" || status === "NON_COMPLIANT",
            "bg-primary": status === "PENDING",
            "bg-on-surface-variant": status === "inactive",
          })}
        />
      )}
      {config.label}
    </span>
  );
}
