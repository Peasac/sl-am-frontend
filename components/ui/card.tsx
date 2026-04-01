import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-surface-container-lowest rounded-2xl p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("flex items-center justify-between mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn("text-sm font-semibold text-on-surface-variant uppercase tracking-wide", className)}>{children}</h3>;
}

export function CardValue({ children, className }: CardProps) {
  return <p className={cn("text-3xl font-bold text-on-surface mt-1", className)}>{children}</p>;
}
