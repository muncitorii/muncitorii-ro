import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "./utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: ReactNode;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ leadingIcon, error, className, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        <div className="relative">
          {leadingIcon && (
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
              {leadingIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all duration-200 ease-out placeholder:text-slate-400 focus:ring-2 focus:ring-primary-700/20",
              error
                ? "border-rose-500 focus:border-rose-500"
                : "border-slate-300 focus:border-primary-700",
              leadingIcon && "pl-10",
              className,
            )}
            {...props}
          />
        </div>
        {error && <p className="text-xs text-rose-600">{error}</p>}
      </div>
    );
  },
);
Input.displayName = "Input";
