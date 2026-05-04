export type WorkerBadge = "Verificat" | "Răspunde rapid" | "Recomandat" | "Profil complet";

export type PortfolioItem = {
  id: string;
  title: string;
  description: string;
};

export type Review = {
  id: string;
  authorName: string;
  authorCity: string;
  text: string;
  rating: number;
  date: string;
  jobTitle: string;
};

export type Worker = {
  id: string;
  slug: string;
  name: string;
  trade: string;
  tradeSlug: string;
  city: string;
  county: string;
  rating: number;
  reviewCount: number;
  experienceYears: number;
  responseTime: string;
  availability: string;
  bio: string;
  badges: WorkerBadge[];
  portfolio: PortfolioItem[];
  reviews: Review[];
};

export const workers: Worker[] = [
  {
    id: "1",
    slug: "alex-popescu",
    name: "Alex Popescu",
    trade: "Electrician",
    tradeSlug: "electrician",
    city: "București",
    county: "București",
    rating: 4.9,
    reviewCount: 47,
    experienceYears: 8,
    responseTime: "În aceeași zi",
    availability: "Disponibil",
    bio: "Execut instalații electrice pentru apartamente, case și spații comerciale. Lucrez curat, respect termenele și explic clar tot ce fac. Autorizat ANRE.",
    badges: ["Verificat", "Răspunde rapid"],
    portfolio: [
      {
        id: "p1",
        title: "Tablou electric nou — bloc Militari",
        description: "Înlocuire tablou vechi cu tablou modern, 16 circuite, apartament 3 camere.",
      },
      {
        id: "p2",
        title: "Instalație completă vilă Bragadiru",
        description: "Instalație electrică de la zero pentru o vilă de 220mp, inclusiv sistem de automatizare.",
      },
      {
        id: "p3",
        title: "Reparație priză și siguranțe",
        description: "Intervenție rapidă — siguranțe defecte și 3 prize nefuncționale.",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Andreea M.",
        authorCity: "București",
        text: "Foarte serios și punctual. A explicat clar ce a făcut și a lucrat curat. Recomand cu toată încrederea.",
        rating: 5,
        date: "15 apr 2026",
        jobTitle: "Reparație instalație electrică",
      },
      {
        id: "r2",
        authorName: "Dan P.",
        authorCity: "Ilfov",
        text: "A răspuns rapid și a rezolvat problema în aceeași zi. Prețul a fost exact ce a spus la telefon.",
        rating: 5,
        date: "8 apr 2026",
        jobTitle: "Înlocuire tablou electric",
      },
      {
        id: "r3",
        authorName: "Cristina V.",
        authorCity: "București",
        text: "Bun profesionist. Știe meseria, e ordonat și lasă locul curat după ce termină.",
        rating: 4,
        date: "22 mar 2026",
        jobTitle: "Instalație electrică vilă",
      },
    ],
  },
  {
    id: "2",
    slug: "marian-ionescu",
    name: "Marian Ionescu",
    trade: "Zugrav",
    tradeSlug: "zugrav",
    city: "Constanța",
    county: "Constanța",
    rating: 4.8,
    reviewCount: 31,
    experienceYears: 12,
    responseTime: "În 2–3 ore",
    availability: "Disponibil",
    bio: "Zugrăveli interioare și finisaje curate pentru apartamente, case și spații comerciale. Lucrez cu vopsea lavabilă, tencuieli decorative și vopsele speciale. Referințe la cerere.",
    badges: ["Verificat"],
    portfolio: [
      {
        id: "p1",
        title: "Zugrăvit apartament 3 camere",
        description: "Pregătire suprafețe, glet, 2 straturi vopsea lavabilă. Finisaj impecabil.",
      },
      {
        id: "p2",
        title: "Tencuială decorativă hol",
        description: "Tencuială structurată tip mătase pe 18mp, culoare personalizată.",
      },
      {
        id: "p3",
        title: "Renovare completă casă veche",
        description: "Demolat tapete vechi, gletuit și vopsit 6 camere + hol.",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Mihai C.",
        authorCity: "Constanța",
        text: "Marian a transformat apartamentul. Lucrare curată, finisaj net superior față de alți zugrav pe care i-am avut.",
        rating: 5,
        date: "12 apr 2026",
        jobTitle: "Zugrăvit apartament",
      },
      {
        id: "r2",
        authorName: "Ioana T.",
        authorCity: "Constanța",
        text: "Serios, vine la timp, lasă totul curat după. Prețuri corecte.",
        rating: 5,
        date: "28 mar 2026",
        jobTitle: "Renovare living",
      },
      {
        id: "r3",
        authorName: "Radu M.",
        authorCity: "Mangalia",
        text: "Am rămas mulțumit. Finisajele sunt îngrijite și a terminat în termenul estimat.",
        rating: 4,
        date: "10 mar 2026",
        jobTitle: "Zugrăvit casă",
      },
    ],
  },
  {
    id: "3",
    slug: "robert-pavel",
    name: "Robert Pavel",
    trade: "Instalator",
    tradeSlug: "instalator",
    city: "Cluj-Napoca",
    county: "Cluj",
    rating: 5.0,
    reviewCount: 22,
    experienceYears: 6,
    responseTime: "În aceeași zi",
    availability: "Disponibil",
    bio: "Intervenții rapide, reparații și montaj pentru instalații sanitare și termice. Gresie, faianță, chiuvete, baterii, calorifere. Urgențe rezolvate rapid.",
    badges: ["Verificat", "Recomandat", "Răspunde rapid"],
    portfolio: [
      {
        id: "p1",
        title: "Montaj gresie și faianță baie",
        description: "Baie 7mp, gresie și faianță client, rosturi uniforme 2mm.",
      },
      {
        id: "p2",
        title: "Înlocuire coloană apă",
        description: "Coloană apă rece și caldă, bloc P+4, cu izolație fonoabsorbantă.",
      },
      {
        id: "p3",
        title: "Montaj baterii și chiuvetă",
        description: "Schimbare completă baterie cadă + chiuvetă + vas WC.",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Alina S.",
        authorCity: "Cluj-Napoca",
        text: "Robert a venit în aceeași zi și a rezolvat o urgență cu o țeavă spartă. Profesionist și rapid.",
        rating: 5,
        date: "18 apr 2026",
        jobTitle: "Urgență instalație sanitară",
      },
      {
        id: "r2",
        authorName: "Bogdan F.",
        authorCity: "Cluj-Napoca",
        text: "A montat gresia impecabil. Rosturi drepte, nu a spart nimic, a lăsat totul curat.",
        rating: 5,
        date: "5 apr 2026",
        jobTitle: "Montaj gresie baie",
      },
    ],
  },
  {
    id: "4",
    slug: "florin-matei",
    name: "Florin Matei",
    trade: "Dulgher",
    tradeSlug: "dulgher",
    city: "Brașov",
    county: "Brașov",
    rating: 4.7,
    reviewCount: 18,
    experienceYears: 15,
    responseTime: "A doua zi",
    availability: "Disponibil parțial",
    bio: "Mobilier la comandă, montaj uși și parchet, lucrări personalizate din lemn. Lucrez atât în atelierul propriu cât și la client. Ofer garanție 2 ani pentru mobilier.",
    badges: ["Profil complet"],
    portfolio: [
      {
        id: "p1",
        title: "Bucătărie la comandă",
        description: "Bucătărie MDF vopsit, 6 module superioare și 8 inferioare, electrocasnice integrate.",
      },
      {
        id: "p2",
        title: "Parchet lemn masiv",
        description: "Montaj parchet stejar, 60mp, cu plinte și praguri.",
      },
      {
        id: "p3",
        title: "Uși interioare montaj",
        description: "Montaj 6 uși interioare cu tocuri și balamale ascunse.",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Liviu C.",
        authorCity: "Brașov",
        text: "Bucătăria arată extraordinar. Calitate bună a materialelor și finisajele sunt la nivel.",
        rating: 5,
        date: "10 apr 2026",
        jobTitle: "Bucătărie la comandă",
      },
      {
        id: "r2",
        authorName: "Maria D.",
        authorCity: "Brașov",
        text: "Parchetul e montat frumos, fără goluri sau scânduri care scârțâie.",
        rating: 4,
        date: "20 mar 2026",
        jobTitle: "Montaj parchet",
      },
    ],
  },
  {
    id: "5",
    slug: "sorin-enache",
    name: "Sorin Enache",
    trade: "Electrician autorizat",
    tradeSlug: "electrician",
    city: "Timișoara",
    county: "Timiș",
    rating: 4.6,
    reviewCount: 15,
    experienceYears: 10,
    responseTime: "În 2–4 ore",
    availability: "Disponibil",
    bio: "Electrician autorizat ANRE, execut lucrări de instalații electrice, panouri fotovoltaice și automatizări. Vin cu diagnostic complet și ofertă clară.",
    badges: ["Verificat"],
    portfolio: [
      {
        id: "p1",
        title: "Panou fotovoltaic 6kWp",
        description: "Instalație fotovoltaică rezidențială cu invertor hibrid și baterie.",
      },
      {
        id: "p2",
        title: "Tablou general hală",
        description: "Tablou trifazat cu protecție diferențial și automatizare.",
      },
      {
        id: "p3",
        title: "Instalație electrică vilă nouă",
        description: "Proiect complet de la faza gri la recepție.",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Gabriel M.",
        authorCity: "Timișoara",
        text: "A instalat panourile fotovolice perfect. Totul a funcționat din prima zi.",
        rating: 5,
        date: "14 apr 2026",
        jobTitle: "Instalație fotovoltaică",
      },
      {
        id: "r2",
        authorName: "Oana R.",
        authorCity: "Lugoj",
        text: "Serios, bun pe parte electrică. Puțin mai greu de programat, dar merită așteptarea.",
        rating: 4,
        date: "2 apr 2026",
        jobTitle: "Instalație electrică casă",
      },
    ],
  },
  {
    id: "6",
    slug: "andrei-chirila",
    name: "Andrei Chirilă",
    trade: "Faianțar",
    tradeSlug: "instalator",
    city: "Iași",
    county: "Iași",
    rating: 4.8,
    reviewCount: 29,
    experienceYears: 9,
    responseTime: "În aceeași zi",
    availability: "Disponibil",
    bio: "Montaj gresie, faianță și mozaic pentru băi, bucătării și spații comerciale. Lucrez cu rosturi la nivel și finisaje precise. Aprovizionare materiale la cerere.",
    badges: ["Răspunde rapid", "Verificat"],
    portfolio: [
      {
        id: "p1",
        title: "Baie completă reabilitare",
        description: "Demolat, impermeabilizat, montat gresie și faianță 10mp.",
      },
      {
        id: "p2",
        title: "Bucătărie faianță",
        description: "Faianță bucătărie 25mp, inclusiv decupaje chiuvetă și plită.",
      },
      {
        id: "p3",
        title: "Holuri și livinguri gresie",
        description: "Gresie mari format 80×80, hol și living 45mp.",
      },
    ],
    reviews: [
      {
        id: "r1",
        authorName: "Silvia P.",
        authorCity: "Iași",
        text: "Baia arată ca în revistă. Andrei e meticulos și nu taie colțuri. Super recomandat.",
        rating: 5,
        date: "16 apr 2026",
        jobTitle: "Reabilitare baie",
      },
      {
        id: "r2",
        authorName: "Vasile M.",
        authorCity: "Iași",
        text: "Lucrare curată, finisaje bune. A terminat mai repede decât spusese inițial.",
        rating: 5,
        date: "3 apr 2026",
        jobTitle: "Montaj faianță bucătărie",
      },
      {
        id: "r3",
        authorName: "Elena D.",
        authorCity: "Pașcani",
        text: "Satisfăcută de rezultat. Câteva rosturi sunt puțin inegale dar în rest e ok.",
        rating: 4,
        date: "18 mar 2026",
        jobTitle: "Gresie living",
      },
    ],
  },
];

export function getWorkerBySlug(slug: string): Worker | undefined {
  return workers.find((w) => w.slug === slug);
}

export function getFeaturedWorkers(count = 3): Worker[] {
  return workers
    .filter((w) => w.badges.includes("Verificat"))
    .slice(0, count);
}

export function searchWorkers(trade?: string, city?: string): Worker[] {
  return workers.filter((w) => {
    const matchTrade =
      !trade ||
      w.trade.toLowerCase().includes(trade.toLowerCase()) ||
      w.tradeSlug === trade.toLowerCase();
    const matchCity =
      !city ||
      w.city.toLowerCase().includes(city.toLowerCase()) ||
      w.county.toLowerCase().includes(city.toLowerCase());
    return matchTrade && matchCity;
  });
}
