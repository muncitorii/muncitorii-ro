# MUNCITORII_MVP_FLOW.md

## 1. Scop
Acest document definește flow-urile principale din MVP pentru Muncitorii.ro, astfel încât dezvoltarea să fie clară, ordonată și orientată spre lansare rapidă.

## 2. Pagini MVP
### Public
- Homepage
- Cum funcționează
- Listare muncitori
- Detaliu profil muncitor
- Login / Înregistrare

### Client autentificat
- Dashboard client
- Postare lucrare
- Detaliu lucrare
- Oferte primite
- Chat
- Recenzii lăsate

### Muncitor autentificat
- Dashboard muncitor
- Editare profil
- Lucrări disponibile
- Aplicațiile mele
- Chat
- Recenzii primite

### Admin minim
- Admin utilizatori
- Admin lucrări
- Moderare conținut de bază

## 3. Flow client
### A. Client nou care caută rapid un muncitor
1. Intră pe homepage
2. Caută după meserie și locație
3. Vede lista de muncitori
4. Intră pe profiluri
5. Verifică poze, rating, descriere, recenzii
6. Decide să contacteze sau să posteze o lucrare
7. Dacă nu are cont, se înregistrează
8. Deschide chat sau postează cerere

### B. Client care postează o lucrare
1. Intră în cont
2. Apasă „Postează o lucrare”
3. Completează formularul:
   - titlu
   - descriere
   - categorie
   - locație
   - buget
   - termen
4. Publică lucrarea
5. Primește aplicații de la muncitori
6. Compară ofertele
7. Alege muncitorul
8. Continuă discuția în chat
9. Marchează lucrarea finalizată
10. Lasă recenzie

### C. Client care invită direct un muncitor
1. Găsește muncitorul în platformă
2. Intră pe profil
3. Apasă „Invită la lucrare” sau „Contactează”
4. Trimite detaliile lucrării
5. Discută în chat
6. Confirmă colaborarea
7. Lasă recenzie la final

## 4. Flow muncitor
### A. Muncitor nou
1. Intră pe pagina de înregistrare
2. Alege rolul „Muncitor”
3. Completează datele de bază
4. Intră în dashboard
5. Completează profilul:
   - meserie
   - zonă
   - descriere
   - tarif orientativ
   - poze lucrări
6. Publică profilul
7. Devine vizibil în platformă

### B. Muncitor care aplică la lucrări
1. Intră în cont
2. Merge la „Lucrări disponibile”
3. Filtrează după categorie și locație
4. Intră pe detaliul unei lucrări
5. Trimite ofertă / mesaj
6. Așteaptă răspunsul clientului
7. Dacă este ales, continuă în chat
8. După finalizare, primește recenzie

### C. Muncitor care primește contact direct
1. Primește notificare în platformă
2. Intră în chat sau în detaliul cererii
3. Discută cu clientul
4. Acceptă colaborarea
5. Execută lucrarea
6. Primește recenzie și își crește reputația

## 5. Flow chat
### MVP simplu
- Chat activ între client și muncitor
- Asociat unei lucrări sau unei invitații directe
- Mesajele rămân în istoric
- Fără protecții avansate în prima versiune, dar cu structură pregătită pentru ele

## 6. Flow recenzii
1. Lucrarea este marcată finalizată
2. Clientul primește prompt de recenzie
3. Lasă rating și comentariu
4. Recenzia apare pe profilul muncitorului
5. Ratingul mediu se actualizează

## 7. Flow ranking de bază
În MVP, ranking-ul muncitorilor va fi simplu și va ține cont de:
- profil complet
- număr recenzii
- rating mediu
- activitate recentă

## 8. Pagini și componente prioritare pentru build
### Prioritate 1
- Homepage
- Login / Register
- Dashboard client
- Dashboard muncitor
- Profil muncitor
- Postare lucrare
- Listare lucrări
- Listare muncitori

### Prioritate 2
- Chat
- Recenzii
- Admin minim

### Prioritate 3
- Badge-uri avansate
- FAQ / Help center
- Tutoriale video
- Notificări email

## 9. Schema de lucru recomandată
### Sprint 1
- setup proiect
- UI bază
- autentificare
- homepage
- structură dashboard-uri

### Sprint 2
- profil muncitor
- postare lucrare
- listări
- detalii

### Sprint 3
- aplicații
- chat
- recenzii
- admin minim

### Sprint 4
- polish UX
- testare
- conectare domeniu
- pregătire beta

## 10. Întrebări de confirmat înainte de build complet
- monetizarea exactă în MVP
- ce informații de contact se afișează și când
- dacă muncitorii pot aplica nelimitat în MVP
- dacă firmele intră din MVP sau din faza 2
- dacă ranking-ul avansat intră acum sau ulterior

## 11. Concluzie
MVP-ul trebuie să optimizeze două acțiuni principale:
1. clientul găsește repede un muncitor bun
2. muncitorul găsește repede lucrări relevante

Tot ce nu ajută direct aceste două obiective poate fi împins în faza următoare.
