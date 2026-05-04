import { ReactNode } from "react";
import { cn } from "./utils";

type CardVariant = "default" | "bordered" | "flat";

interface CardProps {
  variant?: CardVariant;
  children: ReactNode;
  className?: string;
}

const variantClasses: Record<CardVariant, string> = {
  default: "bg-white shadow-card",
  bordered: "bg-white border border-slate-200",
  flat: "bg-slate-50",
};

export function Card({ variant = "default", children, className }: CardProps) {
  return (
    <div
      className={cn("rounded-3xl p-6 md:p-8", variantClasses[variant], className)}
    >
      {children}
    </div>
  );
}
