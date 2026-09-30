# Muncitorii.ro → „Renovări coordonate" — Sprint 1

Acest fișier documentează pivotul din Sprint 1 (2026-09-30): trecerea de la
marketplace ("caută meseriași, postează o lucrare publică") la serviciul de
coordonare a renovărilor cu dovadă ("lucrare clară, ofertă clară, dovadă
clară"). Citește `handoff.md` (`../business/muncitorii-coordonare/handoff.md`)
pentru deciziile originale. Acest document e "ce s-a implementat, cum se
rulează, ce urmează".

## Ce s-a schimbat

**Produsul nu mai e marketplace.** Clientul descrie lucrarea cu poze → primește
caiet de sarcini + oferte comparabile → lucrarea are etape cu poze
înainte/după și confirmarea lui → costurile extra se aprobă în scris → dosar
digital la final.

### Rute noi (publice)

| Rută | Ce face |
|---|---|
| `/` | Homepage rescris: 5 promisiuni, cum lucrăm (4 pași), CTA „Descrie lucrarea" |
| `/cerere` | Intake: tip lucrare, descriere (+ dictare vocală browser), poze (max 8, comprimate client-side), oraș, buget/termen orientativ, nume, telefon |
| `/cerere/confirmare` | Confirmare + link de urmărire (`/p/[token]`) |
| `/cum-lucram` | Flow complet (fost `/cum-functioneaza`, rescris) — 6 pași, plata 40/40/20, ce nu facem |
| `/parteneri` | Formular pentru meseriași care vor să intre în rețeaua de subcontractori |
| `/p/[token]` | Portal client fără cont: status, etape cu poze, confirmare etapă, aprobare costuri suplimentare, documente (URL-uri semnate) |

### Rute noi (admin, auth Supabase necesar + rol `admin`)

| Rută | Ce face |
|---|---|
| `/admin` | Listă lucrări cu status |
| `/admin/lucrari/[id]` | Detaliu lucrare: brief, adaugă/reordonează etape, marchează etapă in_progress/awaiting_approval, upload poze before/after, creează costuri suplimentare, upload documente, schimbă statusul lucrării, copiază linkul de client |
| `/login` | Repurpose-uit — acum e doar pentru admin (nu mai are înregistrare client/muncitor) |

### Ce s-a arhivat (mutat în `src/_archive/`, NU șters, NU mai e rutat)

Motivul general: aceste pagini erau construite pe tabela veche `public.jobs`
(marketplace, client public + muncitor aplică) și pe rolurile `client`/`worker`
cu autentificare proprie. Migrația 004 redenumește tabela veche în
`legacy_marketplace_jobs`, deci codul vechi n-ar mai fi compilat pe noua
schemă indiferent. Am mers dincolo de lista explicită din handoff (care
menționa doar `/muncitori`, `/register/muncitor`, `/dashboard/muncitor/*`)
pentru că `/dashboard/client`, `/lucrari/*`, `/register`, `/register/client`,
`/verify` depindeau de exact același model vechi și n-ar fi avut sens fără el.

- `src/_archive/app/public/muncitori/` (fost `(public)/muncitori`, `(public)/muncitori/[slug]`)
- `src/_archive/app/public/register/` (fost `(public)/register`, `register/client`, `register/muncitor`)
- `src/_archive/app/public/verify/` (fost `(public)/verify`)
- `src/_archive/app/dashboard/` (fost `(dashboard)/dashboard/client`, `dashboard/muncitor/*`, `lucrari/*`, layout-ul grupului)
- `src/_archive/components/`: `worker-card.tsx`, `worker-profile-form.tsx`, `new-job-form.tsx`, `auth-card.tsx`, `verify-otp-form.tsx`, `header-user-menu.tsx`, `dashboard-layout.tsx`
- `src/_archive/lib/`: `workers.ts`, `jobs.ts` (mock data pentru marketplace)

Componente reținute și refolosite ca atare: `dashboard-logout.tsx` (folosit
acum de `/admin/layout.tsx`), `contact-form.tsx`, `contact-button.tsx`,
`whatsapp-button.tsx` (neafișat momentan — homepage are un link WhatsApp
direct în hero, per cerința din handoff).

## Schema (migrația 004)

Fișier: `supabase/migrations/004_coordonare.sql`. **Nu a fost rulată pe
Supabase live.** Migrațiile 001-003 nu au fost modificate.

Ce face:
- Redenumește `public.jobs` (marketplace) → `public.legacy_marketplace_jobs`
  (evită coliziunea de nume cu noua tabelă `jobs`). Datele vechi rămân intacte.
- Adaugă rolul `admin` la constrângerea de rol din `profiles`.
- Creează: `clients`, `subcontractors`, `jobs` (coordonare — brief jsonb,
  status enum, `public_token` unic), `job_stages`, `rfqs`, `offers`,
  `change_orders`, `photos`, `documents`.
- RLS: toate tabelele noi au RLS activat, fără politici pentru
  anon/authenticated — accesul public (intake, portal, parteneri) trece
  *întotdeauna* prin server actions cu `SUPABASE_SERVICE_ROLE_KEY` (bypass
  RLS). Există o politică „admin full access" pe fiecare tabelă, pentru un
  eventual acces direct din client autentificat ca admin (nu e folosită
  momentan de UI, dar e pregătită).
- Bucket privat `job-photos` (poze + documente, `/documents` ca subfolder).

### Cum rulezi migrația (manual, NU automat)

```bash
# Din Supabase Dashboard > SQL Editor: lipești tot conținutul fișierului și
# rulezi. SAU, cu Supabase CLI configurat pe proiect:
supabase db push
```

### Cum promovezi un utilizator la rol `admin`

Nu există auto-creare de admin. După ce migrația a rulat și utilizatorul
și-a creat cont (ex. prin flow-ul vechi de `signUp`, sau direct din Supabase
Dashboard > Authentication), rulezi în SQL Editor:

```sql
update public.profiles set role = 'admin' where id = '<user-uuid>';
```

Dacă nu există deja un rând în `profiles` pentru acel user (trigger-ul
`handle_new_user` ar trebui să-l fi creat automat la signup), inserează:

```sql
insert into public.profiles (id, role, full_name) values ('<user-uuid>', 'admin', 'Nume Admin');
```

## Variabile de mediu

Vezi `.env.local.example` pentru lista completă cu comentarii. Rezumat:

| Variabilă | Obligatorie | Ce se rupe fără ea |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Da (dar au fallback hardcodat în cod, din setup-ul anterior) | Auth admin, listarea `profiles` |
| `SUPABASE_SERVICE_ROLE_KEY` | **Da, pentru orice date reale** | `/cerere`, `/parteneri`, `/p/[token]` (aprobări), `/admin` (tot CRUD-ul) afișează/salvează date seed sau întorc un mesaj de eroare clar; NU fac fallback silențios |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Nu (are fallback) | Linkul WhatsApp din hero |
| `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_NOTIFY_EMAIL` | Nu | Emailul de notificare la cerere nouă (`/api/jobs/notify`) — cererea se salvează normal în DB indiferent |

**La momentul acestui commit, `.env.local` NU are `SUPABASE_SERVICE_ROLE_KEY`
setat.** Fără ea:
- `/cerere` și `/parteneri` întorc o eroare vizibilă în formular ("Supabase
  service role key nu e configurat...") — nu salvează nimic silențios.
- `/admin` și `/p/[token]` afișează o singură lucrare seed (`src/lib/
  coordonare/seed.ts`, token `demo-token-0000`) cu un banner galben "date
  demo". E suficient pentru a vedea layout-ul și fluxul de aprobare (butoanele
  de aprobare din seed mode nu persistă nimic, doar rulează server action-ul
  care întoarce `ok:false` — nici o eroare vizibilă, dar și nici o schimbare).

## Ce s-a testat manual

Cu `npm run dev` (fără `SUPABASE_SERVICE_ROLE_KEY`, seed fallback activ):
- `/` → 200, hero + secțiuni randează
- `/cerere` → 200, formular randează (nu s-a testat submit real, fără service role key)
- `/cum-lucram` → 200
- `/parteneri` → 200
- `/p/demo-token-0000` → 200, timeline etape + change order pending + banner seed
- `/p/token-invalid-oricare` → 404 (notFound corect)
- `/admin` → 307 redirect la `/login` (neautentificat, corect)
- `/login` → 200
- `/muncitori` (arhivat) → 404, confirmă că nu mai e rutat

Nu s-a testat: submit real prin `/cerere`/`/parteneri` (necesită service role
key), flow-ul admin complet (necesită cont admin real + service role key),
upload de poze/documente în bucket-ul `job-photos` (necesită bucket creat prin
migrația 004 pe un proiect Supabase real), trimiterea efectivă de email prin
Resend.

`npm run build` — trece fără erori, fără warning-uri.
`npm run lint` — curat.

## Ce e blocat / necesită acțiune din partea ta

1. **Rulează migrația 004** pe proiectul Supabase (SQL Editor sau `supabase db push`).
2. **Adaugă `SUPABASE_SERVICE_ROLE_KEY` în `.env.local`** (și pe Vercel, când
   sunteți pregătiți să faceți deploy — task-ul ăsta NU a touched Vercel).
3. **Promovează un cont la rol `admin`** (SQL de mai sus).
4. Opțional: `RESEND_API_KEY` dacă vrei notificări pe email la cerere nouă.

## Sprint 2-8 (ce urmează, neconstruit acum)

Din handoff — explicit lăsat pentru sprinturi ulterioare: portal
subcontractor (cont propriu pentru meseriași), generare AI a caietului de
sarcini din brief, generare PDF pentru oferte/documente, integrare WhatsApp
API (în loc de link `wa.me` simplu), procesare plăți, rating-uri/recenzii
pentru subcontractori. De asemenea, admin-ul nu are momentan o pagină de
listare a aplicațiilor din `/parteneri` (`subcontractors` cu status
`pending`) — datele se salvează, dar revizuirea lor e manuală din Supabase
Dashboard până la Sprint 2.
