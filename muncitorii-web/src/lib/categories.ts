import {
  Lightbulb,
  Wrench,
  Paintbrush2,
  Hammer,
  Sparkles,
  Truck,
  Drill,
  TreePine,
  Square,
  Ruler,
  Wind,
  Flame,
  Snowflake,
  Lock,
  Home,
  Settings,
  MoreHorizontal,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  Icon: LucideIcon;
  /** Apare în grila de categorii de pe homepage */
  showOnHomepage?: boolean;
};

export const categories: Category[] = [
  { slug: "electrician", name: "Electrician", Icon: Lightbulb, showOnHomepage: true },
  { slug: "instalator", name: "Instalator", Icon: Wrench, showOnHomepage: true },
  { slug: "zugrav", name: "Zugrav", Icon: Paintbrush2, showOnHomepage: true },
  { slug: "faiantar", name: "Faianțar", Icon: Square, showOnHomepage: true },
  { slug: "dulgher", name: "Dulgher / Tâmplar", Icon: Hammer, showOnHomepage: true },
  { slug: "renovari", name: "Renovări complete", Icon: Home, showOnHomepage: true },
  { slug: "aer-conditionat", name: "Aer condiționat", Icon: Snowflake, showOnHomepage: true },
  { slug: "handyman", name: "Handyman", Icon: Drill, showOnHomepage: true },
  { slug: "curatenie", name: "Curățenie", Icon: Sparkles },
  { slug: "mutari", name: "Mutări", Icon: Truck },
  { slug: "gradinarit", name: "Grădinărit", Icon: TreePine },
  { slug: "termopane", name: "Geamuri / Termopane", Icon: Wind },
  { slug: "acoperisuri", name: "Acoperișuri", Icon: Ruler },
  { slug: "sudor", name: "Sudor", Icon: Flame },
  { slug: "lacatus", name: "Lăcătuș", Icon: Lock },
  { slug: "reparatii-electrocasnice", name: "Reparații electrocasnice", Icon: Settings },
  { slug: "altele", name: "Altele", Icon: MoreHorizontal },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getHomepageCategories(): Category[] {
  return categories.filter((c) => c.showOnHomepage);
}
