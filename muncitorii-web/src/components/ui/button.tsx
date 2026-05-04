import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "./utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  pill?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary-900 text-white hover:bg-primary-700 disabled:bg-slate-300 disabled:text-slate-500",
  secondary:
    "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400",
  ghost:
    "text-slate-700 hover:text-slate-950 hover:bg-slate-100 disabled:text-slate-400",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", pill, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-semibold transition-all duration-200 ease-out focus:outline-none focus:ring-2 focus:ring-primary-500/40 disabled:cursor-not-allowed",
          pill ? "rounded-full" : "rounded-2xl",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
