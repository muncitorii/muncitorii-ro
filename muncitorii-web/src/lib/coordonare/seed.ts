// Date seed folosite când SUPABASE_SERVICE_ROLE_KEY nu e setat în env.
// Permit testarea manuală a /admin și /p/[token] fără o bază de date reală.
// NU sunt folosite dacă service role key e prezent — vezi src/lib/coordonare/data.ts.

import type { JobFull, Client, Subcontractor } from "./types";

export const SEED_PUBLIC_TOKEN = "demo-token-0000";

export const seedClient: Client = {
  id: "seed-client-1",
  full_name: "Andreea Munteanu",
  phone: "0740123456",
  email: "andreea@example.com",
  city: "Brașov",
  created_at: "2026-09-20T09:00:00.000Z",
};

export const seedJob: JobFull = {
  id: "seed-job-1",
  client_id: seedClient.id,
  brief: {
    work_type: "baie",
    description:
      "Renovare completă baie 5mp: gresie, faianță, sanitare noi, instalație electrică refăcută.",
    name: seedClient.full_name,
    phone: seedClient.phone,
  },
  status: "in_lucru",
  public_token: SEED_PUBLIC_TOKEN,
  city: "Brașov",
  budget_hint: "8000-12000 lei",
  deadline_hint: "3 săptămâni",
  created_at: "2026-09-20T09:00:00.000Z",
  updated_at: "2026-09-28T09:00:00.000Z",
  client: seedClient,
  stages: [
    {
      id: "seed-stage-1",
      job_id: "seed-job-1",
      sequence: 1,
      name: "Demolare și pregătire",
      deadline: "2026-09-24",
      status: "approved",
      client_approved_at: "2026-09-24T18:00:00.000Z",
      client_approved_ip: "seed",
      client_approved_method: "click_link",
      created_at: "2026-09-20T09:00:00.000Z",
    },
    {
      id: "seed-stage-2",
      job_id: "seed-job-1",
      sequence: 2,
      name: "Instalații (apă, electric)",
      deadline: "2026-09-28",
      status: "awaiting_approval",
      client_approved_at: null,
      client_approved_ip: null,
      client_approved_method: null,
      created_at: "2026-09-20T09:00:00.000Z",
    },
    {
      id: "seed-stage-3",
      job_id: "seed-job-1",
      sequence: 3,
      name: "Gresie și faianță",
      deadline: "2026-10-05",
      status: "pending",
      client_approved_at: null,
      client_approved_ip: null,
      client_approved_method: null,
      created_at: "2026-09-20T09:00:00.000Z",
    },
    {
      id: "seed-stage-4",
      job_id: "seed-job-1",
      sequence: 4,
      name: "Montaj sanitare și finisaje",
      deadline: "2026-10-10",
      status: "pending",
      client_approved_at: null,
      client_approved_ip: null,
      client_approved_method: null,
      created_at: "2026-09-20T09:00:00.000Z",
    },
  ],
  change_orders: [
    {
      id: "seed-co-1",
      job_id: "seed-job-1",
      stage_id: "seed-stage-2",
      description:
        "Țeava de scurgere era din fontă coclită — a trebuit înlocuită integral, nu era vizibilă la evaluare.",
      extra_cost: 450,
      status: "pending",
      approved_at: null,
      approved_ip: null,
      approved_method: null,
      created_at: "2026-09-27T10:00:00.000Z",
    },
  ],
  photos: [],
  documents: [],
};

export const seedJobs: JobFull[] = [seedJob];

export const seedSubcontractors: Subcontractor[] = [
  {
    id: "seed-sub-1",
    full_name: "Vasile Croitoru",
    trade: "Instalator",
    city: "Brașov",
    phone: "0745000000",
    experience_years: 12,
    portfolio_photos: [],
    status: "pending",
    created_at: "2026-09-25T09:00:00.000Z",
  },
];
