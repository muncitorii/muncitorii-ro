// Tipuri de lucrare pentru intake-ul /cerere (schema din handoff Sprint 1).
export type JobType = {
  slug: string;
  label: string;
};

export const jobTypes: JobType[] = [
  { slug: "baie", label: "Baie" },
  { slug: "bucatarie", label: "Bucătărie" },
  { slug: "electric", label: "Electric" },
  { slug: "sanitar", label: "Sanitar" },
  { slug: "zugraveli", label: "Zugrăveli" },
  { slug: "pardoseli", label: "Pardoseli" },
  { slug: "apartament-complet", label: "Apartament complet" },
  { slug: "altele", label: "Altele" },
];

export function getJobTypeLabel(slug: string | undefined): string {
  return jobTypes.find((t) => t.slug === slug)?.label ?? slug ?? "—";
}
