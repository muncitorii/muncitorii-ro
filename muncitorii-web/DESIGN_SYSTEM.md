# Muncitorii.ro — Design System Spec

Document de referință pentru implementare. Toate deciziile sunt finale (luate pe Opus 4.7). Implementarea se face pe Sonnet 4.6.

## Direcție generală

**A+ : Warm & human, cu disciplină premium.** Hibrid Airbnb (oameni reali, fotografie) + Stripe (tipografie, whitespace, paletă). Adaptat pentru piața românească.

Diferențiator: pe piața RO (Publi24, OLX, grupuri Facebook, eJobs), nimeni nu face "Airbnb pentru meseriași". Construim acel gol.

---

## Tokens

### Culori

```ts
// tailwind config — extended palette
const colors = {
  // Primary — încredere bancară românească, distinct de OLX/Publi24
  primary: {
    50:  '#eff4fb',
    100: '#dde7f5',
    500: '#3b6cc7',
    600: '#2d56a8',
    700: '#234487',  // CTA primary hover
    800: '#1e3a72',
    900: '#1e3a8a',  // CTA primary base
    950: '#172554',
  },
  // Accent — terracotta (cărămidă, lut, casă) — DOAR pentru badges premium / verificat
  accent: {
    50:  '#fef4ed',
    100: '#fde5d3',
    500: '#e87b3a',
    600: '#d65b1f',
    700: '#c2410c',  // accent base
    800: '#9a3412',
  },
  // Neutrals — slate scale standard Tailwind
  // text-slate-950 titluri, text-slate-600 body, text-slate-400 mute
  // bg-white surfaces, bg-slate-50 alternate sections
}
```

**Reguli stricte:**
- Niciodată mai mult de 3 culori plate într-o pagină (primary + 1 accent + neutrals).
- Statusuri (succes/warn/error): folosite cu `dot + outline + text colorat`, NU cu background plin (`bg-green-100 text-green-700` e infantil — folosim `border-emerald-200 text-emerald-700` cu dot punct).
- Hover-uri: `primary-700` peste `primary-900`. Disabled: `slate-300`. Focus ring: `primary-500/40`.
- NU: gradient pe butoane. NU: blue-100/blue-700 default Tailwind (banal).

### Tipografie

- **Font family:** Geist Sans (via `next/font/google`). Fallback: `system-ui, sans-serif`.
- **Mono (cod, nr. cont, ID):** Geist Mono.
- Verificat că are toate diacriticele românești corecte (ă â î ș ț Ă Â Î Ș Ț).

**Scale:**
```
display:   text-5xl md:text-7xl   font-extrabold tracking-[-0.03em]
h1:        text-4xl md:text-5xl   font-bold tracking-[-0.025em]
h2:        text-2xl md:text-3xl   font-bold tracking-[-0.02em]
h3:        text-xl md:text-2xl    font-semibold tracking-[-0.015em]
body-lg:   text-lg                leading-relaxed
body:      text-base              leading-relaxed (1.625)
small:     text-sm                leading-6
xs:        text-xs                leading-5 (metadata, badges)
```

**Reguli:**
- Tracking negativ pe titluri (-0.02 până la -0.03em). Asta singur ridică percepția de premium.
- Body NICIODATĂ sub 16px pe desktop, 15px pe mobile.
- Line-height: titluri tight, body relaxed.
- ELIMINĂ `font-family: Arial` din `globals.css`.

### Spacing & layout

- Container max width: `max-w-6xl` pentru pagini principale, `max-w-4xl` pentru article/single content.
- Padding orizontal: `px-4 md:px-6 lg:px-8`.
- Padding vertical secțiuni: `py-12 md:py-20 lg:py-24` (mai generos decât e acum).
- Gap între cards: `gap-4 md:gap-6`.
- ELIMIN `max-w-md` wrapper de pe homepage (mobile mock leak).

### Radius

```
rounded-xl   (12px)  — inputs, butoane mici
rounded-2xl  (16px)  — butoane mari, cards, pillole
rounded-3xl  (24px)  — hero cards, modal-style sections
rounded-full          — pill buttons, badges, avatars
```

ELIMIN `rounded-[2rem]` (32px) — overused. Înlocuiesc consistent cu `rounded-3xl` (24px) acolo unde e nevoie de hero feel.

### Shadow

**O singură shadow.** Nu colorate, nu blue-100/60.

```css
--shadow-card: 0 1px 3px rgba(15, 23, 42, 0.04), 0 1px 2px rgba(15, 23, 42, 0.02);
--shadow-card-hover: 0 4px 12px rgba(15, 23, 42, 0.08), 0 2px 4px rgba(15, 23, 42, 0.04);
```

În Tailwind config: `boxShadow.card`, `boxShadow.cardHover`.

### Motion

- Transition base: `transition-all duration-200 ease-out`
- Hover lift cards: `hover:-translate-y-0.5 hover:shadow-cardHover`
- Page enter: fade + slide 8px up, 0.4s ease-out (Framer Motion, NU pe SSR critical)
- Stagger pe liste: 0.05s delay între itemi
- ZERO: parallax, animații infinite, video bg, scroll-jack.

---

## Componente UI primitive (de creat în `src/components/ui/`)

### Button

Variante: `primary` (bg-primary-900 → hover primary-700), `secondary` (border-slate-300 bg-white), `ghost` (text-only).
Sizes: `sm` (px-4 py-2 text-sm), `md` (px-5 py-3 text-sm), `lg` (px-6 py-3.5 text-base).
Forme: default `rounded-2xl`, prop `pill` pentru `rounded-full`.

### Input

`rounded-xl border-slate-300 px-4 py-3 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none`.
Prop `leadingIcon` pentru iconițe lucide. Eroare: `border-rose-500` + helper text.

### Badge

Variante: `default` (slate-100 text-slate-700), `accent` (accent-50 text-accent-700), `success` (emerald-50 text-emerald-700 cu dot), `pending` (amber-50 text-amber-700 cu dot).
`size: sm | md`. Cu sau fără dot (`<span className="size-1.5 rounded-full bg-..." />`).

### Card

`rounded-3xl bg-white shadow-card p-6 md:p-8`. Variante: `bordered` (border-slate-200 fără shadow), `flat` (bg-slate-50 fără shadow).

### StatCard

Used in dashboards. `<Card variant="flat">` cu `<p className="text-3xl font-bold">value</p>` + `<p className="text-xs text-slate-500">label</p>`.

### Logo

SVG portat din `homepage-preview-concept-v7.html` linia 15 (cască + instrument în pătrat rotunjit, color primary-900). Componentă `<Logo size="sm|md|lg" />`. Folosit în header + favicon (generat din SVG via `next/og`).

---

## Pagini

### Homepage (`app/(public)/page.tsx`) — REWRITE

Structură finală:

1. **Header** — logo + nav (Muncitori, Cum funcționează, Pentru meseriași) + Login + Creează cont
2. **Hero** — un singur ecran:
   - Titlu mare 2 rânduri
   - Sub-titlu 1 propoziție
   - Card cu 2 inputs (Ce ai de făcut? + Oraș) + buton primary "Caută meseriași"
   - Link text secundar "Postează o lucrare"
   - Foto reală pe partea dreaptă (md:grid-cols-2)
3. **Trust strip** — bar subtil cu cifre: "2.400+ meseriași · 18.000+ lucrări · 4.8 rating mediu"
4. **Categorii** — grid 4 col, cards cu ilustrație SVG custom flat per categorie + nume
5. **Cum funcționează** — 3 pași (01-02-03), un titlu + 1 frază sub fiecare, vizual minimalist
6. **Meseriași recomandați** — 3 cards mari cu poze reale, badge-uri (Verificat, Răspunde rapid)
7. **Testimoniale** — 2 mari cu foto + nume complet + oraș + meseria contractată
8. **CTA final dual** — "Pentru clienți / Postează" + "Pentru meseriași / Creează cont"
9. **Footer minimal**

ELIMIN:
- Secțiunea "De ce Muncitorii.ro" (4 carduri "Vezi recenzii înainte de a alege") — redundantă.
- Cele 4 mini-cards "Recenzii reale / Profiluri complete / Răspuns rapid / Meseriași din zona ta" de sub hero — zgomot.

### Listare muncitori (`app/(public)/muncitori/page.tsx`)

- Hero scurt + bara de căutare avansată (categorie, oraș, tarif min-max, sortare)
- Grid de cards 3 col desktop / 1 col mobile
- Empty state cu desen + sugestii
- Skeleton loaders în timpul fetch-ului (când va fi DB)

### Profil muncitor (`app/(public)/muncitori/[slug]/page.tsx`) — FIX CRITIC

- Citește din `lib/workers.ts` (centralizat) cu `notFound()` dacă slug-ul nu există
- Hero cu poză portret 1:1 + nume + meserie + oraș + rating + button contact
- Trei coloane info: Răspuns / Experiență / Disponibilitate
- Galerie portofoliu (6-8 poze înainte/după)
- Recenzii cu nume + dată + rating
- Sticky CTA "Trimite cerere" pe mobile

### Auth (`app/login`, `app/register`, `app/register/muncitor`)

- AuthCard refactorat să folosească Input + Button primitives
- Validation cu `react-hook-form + zod` (la Sprint 1, când e Supabase)
- Pagini să mențină simetria stânga (text marketing) / dreapta (form)

### Dashboard-uri (`app/(dashboard)/dashboard/{client,muncitor}`)

- DashboardLayout refactorat să folosească Card + StatCard primitives
- Empty states reale când lista e goală
- Progress bar cu logică (când va fi date reale)
- Link-uri către pagini care există (sau elimină-le)

---

## Tehnice

### Stack adăugat

```json
{
  "dependencies": {
    "lucide-react": "latest",
    "framer-motion": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@next/font": "latest"
  }
}
```

Geist via `next/font/google` (built-in Next 15).

### Layout groups

```
app/
  (public)/
    layout.tsx          → SiteHeader + SiteFooter
    page.tsx            → homepage
    muncitori/
    cum-functioneaza/
    login/
    register/
  (dashboard)/
    layout.tsx          → DashboardLayout wrapper + (later) auth guard
    dashboard/
    lucrari/
```

ELIMIN duplicarea `<SiteHeader />` și `<SiteFooter />` din fiecare pagină.

### Mock data centralizat

- `src/lib/workers.ts` — Worker, Review, PortfolioItem types + arrays + helpers (`getWorkerBySlug`, `getFeaturedWorkers`)
- `src/lib/jobs.ts` — deja există, OK
- `src/lib/categories.ts` — array de categorii cu `{slug, name, icon: LucideIcon, illustration: ReactNode}`

### Imagini

- `public/images/` — structurate per uz (`hero/`, `workers/`, `portfolio/`, `categories/`)
- `next/image` peste tot, cu `width/height` setate
- Pentru fotografii placeholder: download manual de pe Unsplash, redimensionate, optimizate (WebP)
- Selecție: lumină naturală, fețe care **par** românești (nu Asian/American obvious)

### Diacritice & Romania

- Lista județelor în `src/lib/judete.ts` (cu diacritice)
- Format date: `Intl.DateTimeFormat('ro-RO', { dateStyle: 'long' })`
- Format monedă: `Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' })`

### Metadata

- `app/layout.tsx`: titluri default, OG, theme-color
- Per-page `generateMetadata` pentru profile muncitori și lucrări
- `app/sitemap.ts` — generat dinamic
- `app/robots.ts`
- `app/icon.tsx` — favicon generat din Logo SVG

---

## Tonul de scris (copy guide)

- Direct, scurt, fără corporate-ese
- "Caută meseriași" — NU "Descoperă profesioniștii"
- "Postează o lucrare" — NU "Începe proiectul tău"
- "Creează cont" — NU "Înscrie-te acum"
- "Verificat" — NU "Pro Verified Member"
- Persoana a doua singular ("tu", "îți", "ai"). Tutuiala e norma în RO digital în 2026.
- Eliminat exclamația automată. Punctul e suficient.

---

## Plan implementare (referință rapidă)

**Zi 1 — Fundație (Sonnet)**
- [ ] Install deps: lucide-react, framer-motion, clsx, tailwind-merge
- [ ] `next/font/google` Geist Sans + Geist Mono în `layout.tsx`
- [ ] `tailwind.config.ts` extended cu paletă + shadow-card + shadow-cardHover
- [ ] `globals.css` cleanup (scoate Arial)
- [ ] `components/logo.tsx` (SVG din v7)
- [ ] `components/ui/{button,input,badge,card,stat-card,utils}.tsx`
- [ ] Layout groups `(public)` și `(dashboard)`
- [ ] Move SiteHeader/SiteFooter din pagini în `(public)/layout.tsx`

**Zi 2 — Homepage premium (Sonnet + Opus review)**
- [ ] Hero rewrite cu foto reală + un singur CTA dominant
- [ ] Trust strip
- [ ] Categorii cu ilustrații custom SVG
- [ ] How it works simplificat
- [ ] Featured workers cu poze
- [ ] Testimoniale cu poze
- [ ] CTA final dual
- [ ] Framer Motion enter animations

**Zi 3 — Workers + jobs (Sonnet)**
- [ ] `lib/workers.ts` centralizat
- [ ] `lib/categories.ts` cu icons
- [ ] `lib/judete.ts`
- [ ] Refactor listare muncitori
- [ ] Refactor `[slug]` cu `notFound()`
- [ ] Fix link-uri moarte (creezi pagini placeholder pentru `/despre`, `/contact`, `/termeni`, `/politica-confidentialitate`)

**Zi 4 — Dashboards + polish (Sonnet)**
- [ ] Refactor dashboards cu primitives noi
- [ ] Empty states + skeleton loaders
- [ ] Metadata per pagină + sitemap + robots + favicon
- [ ] Cookie banner minimal
- [ ] Smoke test toate fluxurile

**Zi 5 — Opus review final**
- [ ] Tour vizual peste tot, identific inconsistențe
- [ ] Lighthouse audit (accessibility, performance, SEO)
- [ ] Decizie GO/NO-GO pentru pornirea Sprint 1 (Supabase)

---

## Notă importantă pentru implementator

`AGENTS.md` la rădăcina proiectului spune:
> This is NOT the Next.js you know. This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code.

Înainte de a scrie cod Next 15 non-trivial (layouts, generateMetadata, async params, server actions, sitemap, robots), CITEȘTE docs din `node_modules/next/dist/docs/` pentru API-ul exact. Nu te baza pe training data.
