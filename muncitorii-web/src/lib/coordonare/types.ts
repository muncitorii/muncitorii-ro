import type { Database, JobBrief } from "@/lib/supabase/types";

export type Job = Database["public"]["Tables"]["jobs"]["Row"];
export type JobStage = Database["public"]["Tables"]["job_stages"]["Row"];
export type ChangeOrder = Database["public"]["Tables"]["change_orders"]["Row"];
export type Photo = Database["public"]["Tables"]["photos"]["Row"];
export type Document = Database["public"]["Tables"]["documents"]["Row"];
export type Client = Database["public"]["Tables"]["clients"]["Row"];
export type Subcontractor = Database["public"]["Tables"]["subcontractors"]["Row"];

export type JobWithClient = Job & { client: Client | null };

export type JobFull = Job & {
  client: Client | null;
  stages: JobStage[];
  change_orders: ChangeOrder[];
  photos: Photo[];
  documents: Document[];
};

export type { JobBrief };

/** true dacă lucrarea a fost încărcată din date seed (fără Supabase service role key) */
export type WithSeedFlag<T> = T & { __seed?: boolean };
