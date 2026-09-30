import { buildBrandOgImage, OG_SIZE } from "./_og-shared";

export const alt = "Muncitorii.ro — Renovări coordonate, cu dovadă";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function TwitterImage() {
  return buildBrandOgImage();
}
