import {
  Lightbulb,
  Wrench,
  Paintbrush2,
  Hammer,
  Sparkles,
  Truck,
  Drill,
  TreePine,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Category = {
  slug: string;
  name: string;
  Icon: LucideIcon;
};

export const categories: Category[] = [
  { slug: "electrician", name: "Electrician", Icon: Lightbulb },
  { slug: "instalator", name: "Instalator", Icon: Wrench },
  { slug: "zugrav", name: "Zugrav", Icon: Paintbrush2 },
  { slug: "dulgher", name: "Dulgher", Icon: Hammer },
  { slug: "curatenie", name: "Curățenie", Icon: Sparkles },
  { slug: "mutari", name: "Mutări", Icon: Truck },
  { slug: "handyman", name: "Handyman", Icon: Drill },
  { slug: "gradinărit", name: "Grădinărit", Icon: TreePine },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
