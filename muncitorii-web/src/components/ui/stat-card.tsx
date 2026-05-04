import { cn } from "./utils";
import { Card } from "./card";

interface StatCardProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCard({ value, label, className }: StatCardProps) {
  return (
    <Card variant="flat" className={cn("p-4 text-center", className)}>
      <p className="text-3xl font-bold text-slate-950">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </Card>
  );
}
