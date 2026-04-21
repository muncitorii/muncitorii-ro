# MUNCITORII_MASTER_PLAN.md

## 1. Viziune
Muncitorii.ro va fi un marketplace românesc pentru servicii și lucrări locale, construit să fie foarte simplu pentru clienți, dar suficient de puternic pentru muncitori și firme. Obiectivul este să conecteze rapid cererea cu oferta pentru lucrări de orice nivel, de la reparații mici la echipe disponibile cu ora sau la zi.

## 2. Obiective principale
- Lansare rapidă a unui MVP real și utilizabil
- Experiență clară și intuitivă pentru utilizatorii din România
- Încredere prin profiluri, recenzii, badge-uri și comunicare internă
- Arhitectură care permite extindere spre aplicație mobilă și automatizări ulterioare
- Costuri controlate în faza inițială

## 3. Tipuri de utilizatori
### Client
- Creează cont
- Postează o lucrare
- Caută muncitori
- Primește oferte
- Alege muncitorul
- Discută prin chat
- Lasă recenzie după finalizare

### Muncitor
- Creează cont
- Completează profil profesional
- Adaugă poze și descriere
- Primește sau caută lucrări
- Aplică la lucrări
- Discută prin chat
- Primește recenzii și badge-uri

## 4. MVP confirmat
### Pagină principală
- Hero clar cu CTA dublu: „Postează o lucrare” și „Găsește muncitor”
- Căutare după meserie și locație
- Secțiune „Cum funcționează”
- Secțiune cu muncitori recomandați / top
- Recenzii / testimoniale
- Footer complet

### Autentificare
- Înregistrare și login
- Roluri separate: client și muncitor
- Bază pentru onboarding simplu

### Profil muncitor
- Nume, foto, descriere
- Meserii / categorii
- Locație
- Galerie lucrări
- Rating și recenzii
- Badge-uri
- Disponibilitate

### Postare lucrare
- Titlu
- Descriere
- Locație
- Buget
- Termen
- Categorie
- Alegere între cerere publică sau invitație directă

### Listare și aplicare
- Lucrările publice pot fi văzute de muncitori
- Muncitorii pot aplica la lucrări
- Clientul compară și alege

### Chat intern
- Mesagerie între client și muncitor
- Istoric conversații
- Bază pentru mascarea informațiilor sensibile în faze viitoare

### Recenzii și rating
- După finalizarea lucrării
- Vizibile pe profil
- Folosite în ranking

### Dashboard minim
- Client: lucrări postate, oferte, conversații
- Muncitor: profil, aplicații, conversații, recenzii

### Admin minim
- Gestionare utilizatori
- Gestionare lucrări
- Moderare conținut de bază

## 5. Funcții pentru versiuni ulterioare
- Verificare identitate / badge „Verificat”
- Ranking mai avansat în funcție de activitate și calitate
- Tutoriale video integrate în platformă
- Notificări email / push
- Aplicație mobilă
- Sistem firme / echipe / angajare cu ora sau ziua
- Protecție automată în chat pentru numere de telefon / contacte
- Monetizare activă prin abonamente, credite sau taxă de listare
- Plăți integrate dacă modelul de business o va cere

## 6. Monetizare recomandată
### Recomandare de start
Faza 1: validare piață cu fricțiune minimă
- acces gratuit sau aproape gratuit pentru primele testări
- focus pe adopție și lichiditate în platformă

Faza 2: monetizare după validare
- muncitori: abonament sau pachete de credite pentru vizibilitate / aplicări
- clienți: taxă mică pentru publicarea anunțurilor premium sau evidențiate

### Ce NU recomand acum
- escrow complicat din prima
- comisioane dificile înainte să existe volum
- prea multe reguli de taxare înainte de validarea pieței

## 7. Stack tehnic recomandat
- Frontend: Next.js
- UI: Tailwind CSS
- Backend + auth + DB + storage: Supabase
- Deploy: Vercel
- Domeniu: Muncitorii.ro

### De ce acest stack
- dezvoltare rapidă
- cost inițial mic
- auth, DB și storage într-un singur ecosistem
- bun pentru MVP și extindere ulterioară
- potrivit pentru viitoare aplicație mobilă și API-uri

## 8. Principii de produs
- foarte simplu pentru utilizator
- claritate mare în flow-urile principale
- mobile-first
- încredere vizibilă în fiecare ecran
- cât mai puțini pași până la acțiunea principală
- accent pe adopție rapidă și utilitate practică

## 9. Etape de dezvoltare
### Etapa 1: Blueprint și arhitectură
- definire clară a paginilor
- definire roluri și flow-uri
- definire schemă de date
- definire MVP final

### Etapa 2: UI + structură aplicație
- homepage
- autentificare
- dashboard-uri
- profil muncitor
- postare lucrare
- listări și detalii

### Etapa 3: Backend și logică reală
- auth
- DB
- storage pentru imagini
- CRUD pentru profiluri și lucrări
- chat intern
- recenzii

### Etapa 4: Lansare MVP
- conectare domeniu
- QA
- seed minim de conținut
- lansare beta controlată

### Etapa 5: Optimizare și monetizare
- feedback real
- îmbunătățiri UX
- activare monetizare
- început SEO și marketing

## 10. Ce facem imediat după acest document
1. Confirmăm monetizarea de start
2. Definim paginile și flow-urile exacte
3. Începem structura tehnică a proiectului
4. Construim MVP-ul în ordinea corectă

## 11. Decizii curente confirmate
- Nume proiect: Muncitorii.ro
- Platformă pentru România
- Focus inițial: MVP rapid, real și funcțional
- Direcție: marketplace simplu de folosit, dar extensibil
- Prioritate: validare piață + construcție eficientă
