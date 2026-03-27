import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn("bg-white rounded-2xl shadow-sm border border-gray-100 p-6", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return <div className={cn("flex items-center justify-between mb-4", className)}>{children}</div>;
}

export function CardTitle({ children, className }: CardProps) {
  return <h3 className={cn("text-sm font-medium text-gray-500 uppercase tracking-wide", className)}>{children}</h3>;
}

export function CardValue({ children, className }: CardProps) {
  return <p className={cn("text-3xl font-bold text-neutral mt-1", className)}>{children}</p>;
}
