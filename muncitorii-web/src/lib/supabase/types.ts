// Tipuri pentru schema "coordonare" (migration 004). Tabelele vechi de
// marketplace (workers, portfolio_items, reviews, legacy_marketplace_jobs)
// nu mai sunt folosite de nicio pagină activă, deci nu mai sunt tipizate
// aici — codul lor arhivat din src/_archive/ nu se compilează în build.

export type ProfileRole = "client" | "worker" | "admin";

export type JobStatus = "intake" | "evaluare" | "oferte" | "in_lucru" | "finalizat";
export type StageStatus = "pending" | "in_progress" | "awaiting_approval" | "approved";
export type ApprovalMethod = "click_link" | "admin_override";
export type SubcontractorStatus = "pending" | "approved" | "rejected";
export type ChangeOrderStatus = "pending" | "approved" | "rejected";
export type PhotoKind = "intake" | "before" | "after";
export type DocumentKind = "invoice" | "warranty" | "instructions" | "pv" | "offer_pdf";

export type JobBrief = {
  work_type?: string;
  description?: string;
  name?: string;
  phone?: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: ProfileRole;
          full_name: string | null;
          phone: string | null;
          city: string | null;
          county: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role: ProfileRole;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          county?: string | null;
        };
        Update: {
          role?: ProfileRole;
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          county?: string | null;
        };
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          user_id: string | null;
          status: "new" | "read" | "replied" | "archived";
          created_at: string;
        };
        Insert: {
          name: string;
          email: string;
          subject?: string;
          message: string;
          user_id?: string | null;
        };
        Update: {
          status?: "new" | "read" | "replied" | "archived";
        };
      };
      clients: {
        Row: {
          id: string;
          full_name: string;
          phone: string;
          email: string | null;
          city: string | null;
          created_at: string;
        };
        Insert: {
          full_name: string;
          phone: string;
          email?: string | null;
          city?: string | null;
        };
        Update: {
          full_name?: string;
          phone?: string;
          email?: string | null;
          city?: string | null;
        };
      };
      subcontractors: {
        Row: {
          id: string;
          full_name: string;
          trade: string;
          city: string | null;
          phone: string;
          experience_years: number | null;
          portfolio_photos: string[];
          status: SubcontractorStatus;
          created_at: string;
        };
        Insert: {
          full_name: string;
          trade: string;
          city?: string | null;
          phone: string;
          experience_years?: number | null;
          portfolio_photos?: string[];
          status?: SubcontractorStatus;
        };
        Update: {
          status?: SubcontractorStatus;
        };
      };
      jobs: {
        Row: {
          id: string;
          client_id: string;
          brief: JobBrief;
          status: JobStatus;
          public_token: string;
          city: string | null;
          budget_hint: string | null;
          deadline_hint: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          client_id: string;
          brief?: JobBrief;
          status?: JobStatus;
          city?: string | null;
          budget_hint?: string | null;
          deadline_hint?: string | null;
        };
        Update: {
          brief?: JobBrief;
          status?: JobStatus;
          city?: string | null;
          budget_hint?: string | null;
          deadline_hint?: string | null;
        };
      };
      job_stages: {
        Row: {
          id: string;
          job_id: string;
          sequence: number;
          name: string;
          deadline: string | null;
          status: StageStatus;
          client_approved_at: string | null;
          client_approved_ip: string | null;
          client_approved_method: ApprovalMethod | null;
          created_at: string;
        };
        Insert: {
          job_id: string;
          sequence: number;
          name: string;
          deadline?: string | null;
          status?: StageStatus;
        };
        Update: {
          name?: string;
          deadline?: string | null;
          sequence?: number;
          status?: StageStatus;
          client_approved_at?: string | null;
          client_approved_ip?: string | null;
          client_approved_method?: ApprovalMethod | null;
        };
      };
      rfqs: {
        Row: {
          id: string;
          job_id: string;
          subcontractor_id: string | null;
          status: "sent" | "responded" | "declined";
          created_at: string;
        };
        Insert: {
          job_id: string;
          subcontractor_id?: string | null;
          status?: "sent" | "responded" | "declined";
        };
        Update: {
          status?: "sent" | "responded" | "declined";
        };
      };
      offers: {
        Row: {
          id: string;
          job_id: string;
          subcontractor_id: string | null;
          amount: number | null;
          notes: string;
          status: "pending" | "accepted" | "rejected";
          created_at: string;
        };
        Insert: {
          job_id: string;
          subcontractor_id?: string | null;
          amount?: number | null;
          notes?: string;
          status?: "pending" | "accepted" | "rejected";
        };
        Update: {
          amount?: number | null;
          notes?: string;
          status?: "pending" | "accepted" | "rejected";
        };
      };
      change_orders: {
        Row: {
          id: string;
          job_id: string;
          stage_id: string | null;
          description: string;
          extra_cost: number;
          status: ChangeOrderStatus;
          approved_at: string | null;
          approved_ip: string | null;
          approved_method: ApprovalMethod | null;
          created_at: string;
        };
        Insert: {
          job_id: string;
          stage_id?: string | null;
          description: string;
          extra_cost: number;
          status?: ChangeOrderStatus;
        };
        Update: {
          status?: ChangeOrderStatus;
          approved_at?: string | null;
          approved_ip?: string | null;
          approved_method?: ApprovalMethod | null;
        };
      };
      photos: {
        Row: {
          id: string;
          job_id: string;
          stage_id: string | null;
          kind: PhotoKind;
          storage_path: string;
          created_at: string;
        };
        Insert: {
          job_id: string;
          stage_id?: string | null;
          kind: PhotoKind;
          storage_path: string;
        };
        Update: Record<string, never>;
      };
      documents: {
        Row: {
          id: string;
          job_id: string;
          kind: DocumentKind;
          storage_path: string;
          label: string;
          created_at: string;
        };
        Insert: {
          job_id: string;
          kind: DocumentKind;
          storage_path: string;
          label?: string;
        };
        Update: Record<string, never>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
