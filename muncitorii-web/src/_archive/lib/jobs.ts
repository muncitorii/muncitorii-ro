export type JobStatus = "activ" | "în lucru" | "finalizat" | "anulat";
export type ApplicationStatus = "în așteptare" | "acceptat" | "respins";

export type Job = {
  id: string;
  slug: string;
  title: string;
  category: string;
  city: string;
  county: string;
  budget: string;
  deadline: string;
  status: JobStatus;
  description: string;
  applicants: number;
  postedAt: string;
  clientName: string;
  urgency: "scăzută" | "medie" | "ridicată";
  publicType: "publică" | "invitație directă";
  details: string;
  postedBy: string;
  postedDate: string;
};

export type Application = {
  id: string;
  jobId: string;
  workerName: string;
  workerTrade: string;
  message: string;
  priceOffer: string;
  status: ApplicationStatus;
  sentAt: string;
};

export const jobs: Job[] = [
  {
    id: "1",
    slug: "reparatie-instalatie-electrica-bucuresti",
    title: "Reparație instalație electrică",
    category: "Electrician",
    city: "București",
    county: "București",
    budget: "300–500 lei",
    deadline: "30 apr",
    status: "activ",
    description:
      "Tablou electric defect, siguranțe care sar des și două prize nefuncționale într-un apartament vechi.",
    applicants: 3,
    postedAt: "astăzi",
    clientName: "Andreea I.",
    urgency: "ridicată",
    publicType: "publică",
    details:
      "Apartament 3 camere, bloc vechi, tablou electric din anii '80. Am identificat 2-3 prize care nu mai funcționează și o siguranță care sare frecvent. Caut un electrician serios care să verifice toată instalația și să facă ce e necesar.",
    postedBy: "Andreea M.",
    postedDate: "18 apr 2026",
  },
  {
    id: "2",
    slug: "zugravit-living-si-dormitor-bucuresti",
    title: "Zugrăvit living și dormitor",
    category: "Zugrav",
    city: "București",
    county: "București",
    budget: "1000–1500 lei",
    deadline: "15 mai",
    status: "activ",
    description:
      "Două camere de aproximativ 18mp fiecare. Clientul vrea finisaj curat și poate asigura o parte din materiale.",
    applicants: 5,
    postedAt: "ieri",
    clientName: "Cristina P.",
    urgency: "medie",
    publicType: "publică",
    details:
      "Living 20mp și dormitor 16mp. Pereții au deja tapetul scos. Se lucrează cu vopsea lavabilă pe care o furnizez eu. Caut un zugrav experimentat care lucrează curat și respectă programul.",
    postedBy: "Mihai C.",
    postedDate: "17 apr 2026",
  },
  {
    id: "3",
    slug: "montaj-gresie-si-faianta-baie-cluj",
    title: "Montaj gresie și faianță baie",
    category: "Instalator",
    city: "Cluj-Napoca",
    county: "Cluj",
    budget: "800–1200 lei",
    deadline: "20 mai",
    status: "finalizat",
    description:
      "Baie de 6mp, gresia și faianța sunt deja cumpărate. Lucrarea cere montaj curat și rosturi uniforme.",
    applicants: 2,
    postedAt: "acum 4 zile",
    clientName: "Mihai T.",
    urgency: "scăzută",
    publicType: "publică",
    details:
      "Baie 6mp, gresie și faianță furnizate de client. Montaj curat cu rost uniform de 2mm. Caut un faianțar cu experiență și referințe.",
    postedBy: "Raluca S.",
    postedDate: "16 apr 2026",
  },
  {
    id: "4",
    slug: "instalare-aer-conditionat-constanta",
    title: "Instalare aer condiționat",
    category: "Electrician",
    city: "Constanța",
    county: "Constanța",
    budget: "400–600 lei",
    deadline: "10 mai",
    status: "în lucru",
    description:
      "Montaj pentru un split de 9000 BTU, cu găurire perete exterior și verificare alimentare electrică.",
    applicants: 4,
    postedAt: "astăzi",
    clientName: "Daniel M.",
    urgency: "medie",
    publicType: "invitație directă",
    details:
      "Un split de 9000BTU deja achiziționat. Necesită găurire perete exterior și racordare electrică. Apartament la etaj 3.",
    postedBy: "Dan P.",
    postedDate: "19 apr 2026",
  },
];

export const applications: Application[] = [
  {
    id: "a1",
    jobId: "1",
    workerName: "Alex Popescu",
    workerTrade: "Electrician",
    message: "Pot veni azi după ora 17:00. Am experiență pe tablouri vechi și verific și prizele incluse.",
    priceOffer: "450 lei",
    status: "în așteptare",
    sentAt: "astăzi",
  },
  {
    id: "a2",
    jobId: "1",
    workerName: "Sorin Enache",
    workerTrade: "Electrician autorizat",
    message: "Vin cu scule proprii și fac diagnostic complet înainte de intervenție.",
    priceOffer: "500 lei",
    status: "acceptat",
    sentAt: "astăzi",
  },
  {
    id: "a3",
    jobId: "2",
    workerName: "Marius Ilie",
    workerTrade: "Zugrav",
    message: "Pot începe săptămâna viitoare. Lucrez curat și pot aduce și un coleg pentru ritm mai bun.",
    priceOffer: "1300 lei",
    status: "în așteptare",
    sentAt: "ieri",
  },
];

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id);
}

export function getApplicationsForJob(jobId: string) {
  return applications.filter((application) => application.jobId === jobId);
}

export function getJobsByStatus(status: JobStatus) {
  return jobs.filter((job) => job.status === status);
}
