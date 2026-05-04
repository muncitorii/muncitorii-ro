import { cn } from "@/components/ui/utils";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  className?: string;
  /** When placed on a dark background (e.g. navy hero) */
  variant?: "default" | "light";
}

const textSizes: Record<LogoSize, string> = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-2xl",
};

export function Logo({ size = "md", className, variant = "default" }: LogoProps) {
  const isLight = variant === "light";

  return (
    <p
      className={cn(
        "font-extrabold tracking-[-0.025em]",
        textSizes[size],
        isLight ? "text-white" : "text-slate-950",
        className,
      )}
    >
      Muncitorii<span className="text-accent-700">.</span>ro
    </p>
  );
}
