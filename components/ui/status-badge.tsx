import { cn } from "@/lib/utils";

type Status = "COMPLIANT" | "CRITICAL" | "PENDING" | "NON_COMPLIANT" | "active" | "inactive" | "ADMIN" | "USER" | "AUDITOR";

const statusConfig: Record<string, { label: string; className: string }> = {
  COMPLIANT: { label: "Compliant", className: "bg-green-100 text-green-700" },
  CRITICAL: { label: "Critical", className: "bg-red-100 text-red-700" },
  PENDING: { label: "Pending", className: "bg-yellow-100 text-yellow-700" },
  NON_COMPLIANT: { label: "Non-Compliant", className: "bg-red-100 text-red-700" },
  active: { label: "Active", className: "bg-green-100 text-green-700" },
  inactive: { label: "Inactive", className: "bg-gray-100 text-gray-600" },
  ADMIN: { label: "Admin", className: "bg-blue-100 text-blue-700" },
  USER: { label: "Employee", className: "bg-purple-100 text-purple-700" },
  AUDITOR: { label: "Auditor", className: "bg-orange-100 text-orange-700" },
};

interface StatusBadgeProps {
  status: string;
  dot?: boolean;
  className?: string;
}

export function StatusBadge({ status, dot = false, className }: StatusBadgeProps) {
  const config = statusConfig[status] ?? { label: status, className: "bg-gray-100 text-gray-600" };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        config.className,
        className
      )}
    >
      {dot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", {
            "bg-green-600": status === "COMPLIANT" || status === "active",
            "bg-red-600": status === "CRITICAL" || status === "NON_COMPLIANT",
            "bg-yellow-500": status === "PENDING",
            "bg-gray-400": status === "inactive",
          })}
        />
      )}
      {config.label}
    </span>
  );
}
