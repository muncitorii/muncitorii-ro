import { cn } from "@/components/ui/utils";

type LogoSize = "sm" | "md" | "lg";

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

const sizes = {
  sm: { container: "h-8 w-8", svgSize: 20, text: "text-base" },
  md: { container: "h-10 w-10", svgSize: 26, text: "text-lg" },
  lg: { container: "h-12 w-12", svgSize: 32, text: "text-xl" },
};

export function Logo({ size = "md", className }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div
        className={cn(
          "flex items-center justify-center rounded-2xl bg-primary-900 text-white",
          s.container,
        )}
      >
        <svg
          width={s.svgSize}
          height={s.svgSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14 28C14 17.5 22.3 10 32 10C41.7 10 50 17.5 50 28V31H14V28Z"
            fill="currentColor"
          />
          <path
            d="M18 34C18 43 24.1 49 32 49C39.9 49 46 43 46 34"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M24 49H40"
            stroke="currentColor"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p className={cn("font-extrabold tracking-tight text-slate-950", s.text)}>
        Muncitorii.ro
      </p>
    </div>
  );
}
