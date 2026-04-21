# MUNCITORII_TECH_SPEC.md

## 1. Scop
Acest document definește specificația tehnică de bază pentru MVP-ul Muncitorii.ro, astfel încât build-ul să fie coerent, scalabil și ușor de întreținut cu ajutorul AI-ului pe termen lung.

## 2. Stack tehnic final recomandat
### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui sau componente UI curate și reutilizabile

### Backend / BaaS
- Supabase
  - Auth
  - Postgres database
  - Storage
  - Realtime pentru chat în faza următoare

### Deploy
- Vercel pentru aplicația web
- Supabase pentru backend și DB

### Alte unelte
- Git pentru versionare
- ESLint + Prettier
- Zod pentru validare
- React Hook Form pentru formulare

## 3. Principii tehnice
- mobile-first
- componente reutilizabile
- naming clar și coerent
- separare bună între UI, logică și date
- evitarea complexității premature
- arhitectură ușor de înțeles pentru mentenanță cu AI

## 4. Structura aplicației
### Rute publice
- /
- /cum-functioneaza
- /muncitori
- /muncitori/[slug]
- /login
- /register

### Rute client autentificat
- /client/dashboard
- /client/lucrari
- /client/lucrari/noua
- /client/lucrari/[id]
- /client/oferte
- /client/chat

### Rute muncitor autentificat
- /muncitor/dashboard
- /muncitor/profil
- /muncitor/lucrari
- /muncitor/aplicatii
- /muncitor/chat

### Rute admin minime
- /admin
- /admin/utilizatori
- /admin/lucrari

## 5. Modele de date principale
### profiles
Rol: profil de bază pentru orice utilizator
Câmpuri propuse:
- id
- auth_user_id
- role (client | muncitor | admin)
- full_name
- phone (opțional mai târziu)
- city
- county
- avatar_url
- created_at
- updated_at

### worker_profiles
Rol: extensie pentru muncitori
Câmpuri propuse:
- id
- profile_id
- slug
- headline
- description
- primary_trade
- secondary_trades
- hourly_rate_min
- hourly_rate_max
- is_available
- average_rating
- reviews_count
- response_rate
- response_time_label
- created_at
- updated_at

### worker_portfolio_items
- id
- worker_profile_id
- image_url
- title
- description
- created_at

### jobs
Rol: lucrări postate de clienți
Câmpuri propuse:
- id
- client_profile_id
- title
- description
- category
- city
- county
- budget_min
- budget_max
- deadline_type
- status (draft | open | in_progress | completed | cancelled)
- visibility (public | invited)
- created_at
- updated_at

### job_applications
Rol: aplicațiile muncitorilor la lucrări
Câmpuri propuse:
- id
- job_id
- worker_profile_id
- message
- proposed_price
- status (pending | shortlisted | accepted | rejected)
- created_at
- updated_at

### conversations
Rol: container pentru chat
Câmpuri propuse:
- id
- job_id (nullable pentru contact direct)
- client_profile_id
- worker_profile_id
- created_at
- updated_at

### messages
- id
- conversation_id
- sender_profile_id
- body
- created_at

### reviews
- id
- job_id
- client_profile_id
- worker_profile_id
- rating
- comment
- created_at

## 6. Relații logice
- un auth user are un profile
- un profile cu role=muncitor are un worker_profile
- un worker_profile are multe itemuri de portofoliu
- un client poate avea mai multe jobs
- un job poate avea mai multe aplicații
- o conversație leagă un client și un muncitor, opțional prin job
- un job finalizat poate genera o recenzie

## 7. Auth și autorizare
### Roluri
- client
- muncitor
- admin

### MVP
- email + password login/register
- onboarding minim după register
- redirecționare în funcție de rol

### Acces
- clientul vede doar datele lui private
- muncitorul vede doar datele lui private
- profilurile publice ale muncitorilor sunt accesibile public
- adminul are acces separat

## 8. Componente UI de bază
- Header
- Mobile menu
- Hero search block
- Category chips/cards
- Worker card
- Testimonial card
- Section wrapper
- Form fields
- Dashboard sidebar/top nav
- Chat thread
- Job card
- Review card

## 9. Pagini MVP și ce trebuie să facă
### Homepage
- prezintă valoarea platformei
- oferă search rapid
- CTA-uri principale
- categorii populare
- secțiuni trust și how-it-works

### Register/Login
- alegere rol
- validare formulare
- creare cont

### Worker directory
- listare profiluri publice
- filtrare după categorie și locație

### Worker profile
- detalii publice
- galerie
- recenzii
- CTA contact / invită la lucrare

### New job page
- formular simplu și clar
- validare
- creare job în DB

### Jobs directory pentru muncitori
- listare joburi deschise
- filtre simple
- acces la aplicare

### Job detail
- informații complete despre lucrare
- CTA aplicare

### Chat
- listă conversații
- fir conversație
- trimitere mesaje

### Dashboards
- vizualizare rapidă a lucrărilor, aplicațiilor, conversațiilor și recenziilor

## 10. SEO și structură de conținut
### MVP
- titluri clare
- meta description pe paginile principale
- URL-uri curate
- profiluri publice indexabile
- pagini categorie / locație mai târziu

## 11. Siguranță și bune practici
- validare input frontend + backend
- rate limit mai târziu pentru formulare sensibile
- reguli RLS în Supabase
- evitarea expunerii datelor sensibile
- jurnalizare simplă a erorilor

## 12. Etapele de implementare recomandate
### Faza 1
- setup Next.js + Tailwind + TypeScript
- setup Supabase
- homepage
- auth

### Faza 2
- worker profiles
- worker directory
- new job flow
- jobs listing

### Faza 3
- job applications
- dashboards
- reviews

### Faza 4
- chat
- polish
- admin minim
- testare și lansare beta

## 13. Ce NU intră în prima implementare
- sistem de plată complex
- aplicație mobilă
- verificări avansate KYC
- ranking AI complex
- automatizări de matching foarte avansate
- sistem complet pentru firme cu echipe multiple

## 14. Rezultatul urmărit
Un MVP real, curat, rapid și ușor de extins, suficient de bun pentru lansare și validare, dar construit pe o fundație care permite dezvoltare serioasă în continuare.
