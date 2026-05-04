import { ReactNode } from "react";
import { cn } from "./utils";

type BadgeVariant = "default" | "accent" | "success" | "pending";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, { badge: string; dot: string }> = {
  default: { badge: "bg-slate-100 text-slate-700", dot: "bg-slate-500" },
  accent: { badge: "bg-accent-50 text-accent-700", dot: "bg-accent-700" },
  success: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  pending: {
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
  },
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-xs",
};

export function Badge({
  variant = "default",
  size = "md",
  dot,
  children,
  className,
}: BadgeProps) {
  const v = variantClasses[variant];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-semibold",
        v.badge,
        sizeClasses[size],
        className,
      )}
    >
      {dot && <span className={cn("size-1.5 rounded-full", v.dot)} />}
      {children}
    </span>
  );
}
