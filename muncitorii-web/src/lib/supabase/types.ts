export type WorkerBadge = "Verificat" | "Răspunde rapid" | "Recomandat" | "Profil complet";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          role: "client" | "worker";
          full_name: string | null;
          phone: string | null;
          city: string | null;
          county: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          role: "client" | "worker";
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          county?: string | null;
        };
        Update: {
          role?: "client" | "worker";
          full_name?: string | null;
          phone?: string | null;
          city?: string | null;
          county?: string | null;
        };
      };
      workers: {
        Row: {
          id: string;
          user_id: string;
          slug: string;
          name: string;
          trade: string;
          trade_slug: string;
          city: string;
          county: string;
          rating: number;
          review_count: number;
          experience_years: number;
          response_time: string;
          availability: string;
          bio: string;
          badges: WorkerBadge[];
          hourly_rate_min: number | null;
          hourly_rate_max: number | null;
          phone: string | null;
          is_verified: boolean;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          user_id: string;
          slug: string;
          name: string;
          trade: string;
          trade_slug: string;
          city: string;
          county: string;
          bio?: string;
          experience_years?: number;
          response_time?: string;
          availability?: string;
          hourly_rate_min?: number | null;
          hourly_rate_max?: number | null;
          phone?: string | null;
        };
        Update: {
          name?: string;
          trade?: string;
          trade_slug?: string;
          city?: string;
          county?: string;
          bio?: string;
          experience_years?: number;
          response_time?: string;
          availability?: string;
          hourly_rate_min?: number | null;
          hourly_rate_max?: number | null;
          phone?: string | null;
          is_active?: boolean;
        };
      };
      portfolio_items: {
        Row: {
          id: string;
          worker_id: string;
          title: string;
          description: string;
          images: string[];
          created_at: string;
        };
        Insert: {
          worker_id: string;
          title: string;
          description: string;
          images?: string[];
        };
        Update: {
          title?: string;
          description?: string;
          images?: string[];
        };
      };
      reviews: {
        Row: {
          id: string;
          worker_id: string;
          author_id: string | null;
          author_name: string;
          author_city: string;
          text: string;
          rating: number;
          job_title: string;
          created_at: string;
        };
        Insert: {
          worker_id: string;
          author_id?: string | null;
          author_name: string;
          author_city: string;
          text: string;
          rating: number;
          job_title: string;
        };
        Update: {
          text?: string;
          rating?: number;
        };
      };
      jobs: {
        Row: {
          id: string;
          client_id: string;
          title: string;
          description: string;
          category: string;
          city: string;
          county: string;
          budget_min: number | null;
          budget_max: number | null;
          status: "deschis" | "in_lucru" | "finalizat" | "anulat";
          created_at: string;
        };
        Insert: {
          client_id: string;
          title: string;
          description: string;
          category: string;
          city: string;
          county: string;
          budget_min?: number | null;
          budget_max?: number | null;
        };
        Update: {
          title?: string;
          description?: string;
          status?: "deschis" | "in_lucru" | "finalizat" | "anulat";
          budget_min?: number | null;
          budget_max?: number | null;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
