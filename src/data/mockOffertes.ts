export interface OfferteItem {
  product: string;
  hoeveelheid: number;
  eenheid: string;
  prijs_per_eenheid: number;
  totaal: number;
}

export interface Offerte {
  offerte_id: string;
  klant_naam: string;
  klant_email: string;
  status: "Concept" | "Verzonden" | "Goedgekeurd" | "Afgewezen" | "Verlopen";
  items: OfferteItem[];
  subtotaal: number;
  btw_bedrag: number;
  totaal_incl_btw: number;
  created_at: string;
}

export const mockOffertes: Offerte[] = [
  {
    offerte_id: "OFF-2024-001",
    klant_naam: "Albert Heijn Distributie",
    klant_email: "inkoop@ah-distributie.nl",
    status: "Goedgekeurd",
    items: [
      { product: "Hollandse Tomaten", hoeveelheid: 500, eenheid: "kg", prijs_per_eenheid: 2.40, totaal: 1200 },
      { product: "Komkommers", hoeveelheid: 300, eenheid: "stuks", prijs_per_eenheid: 0.85, totaal: 255 },
      { product: "Paprika Mix", hoeveelheid: 200, eenheid: "kg", prijs_per_eenheid: 3.10, totaal: 620 },
    ],
    subtotaal: 2075,
    btw_bedrag: 187.76,
    totaal_incl_btw: 2262.76,
    created_at: "2024-03-25",
  },
  {
    offerte_id: "OFF-2024-002",
    klant_naam: "Jumbo Supermarkten",
    klant_email: "vers@jumbo.nl",
    status: "Verzonden",
    items: [
      { product: "Jonagold Appels", hoeveelheid: 400, eenheid: "kg", prijs_per_eenheid: 1.95, totaal: 780 },
      { product: "Aardbeien", hoeveelheid: 150, eenheid: "dozen", prijs_per_eenheid: 4.50, totaal: 675 },
    ],
    subtotaal: 1455,
    btw_bedrag: 131.77,
    totaal_incl_btw: 1586.77,
    created_at: "2024-03-24",
  },
  {
    offerte_id: "OFF-2024-003",
    klant_naam: "Spar Retail",
    klant_email: "bestelling@spar.nl",
    status: "Concept",
    items: [
      { product: "Broccoli", hoeveelheid: 200, eenheid: "stuks", prijs_per_eenheid: 1.20, totaal: 240 },
      { product: "Wortelen", hoeveelheid: 300, eenheid: "kg", prijs_per_eenheid: 0.95, totaal: 285 },
      { product: "Bloemkool", hoeveelheid: 100, eenheid: "stuks", prijs_per_eenheid: 1.80, totaal: 180 },
    ],
    subtotaal: 705,
    btw_bedrag: 63.86,
    totaal_incl_btw: 768.86,
    created_at: "2024-03-23",
  },
  {
    offerte_id: "OFF-2024-004",
    klant_naam: "PLUS Supermarkt",
    klant_email: "inkoop@plus.nl",
    status: "Afgewezen",
    items: [
      { product: "Sinaasappels", hoeveelheid: 600, eenheid: "kg", prijs_per_eenheid: 1.50, totaal: 900 },
    ],
    subtotaal: 900,
    btw_bedrag: 81.49,
    totaal_incl_btw: 981.49,
    created_at: "2024-03-22",
  },
  {
    offerte_id: "OFF-2024-005",
    klant_naam: "Dirk van den Broek",
    klant_email: "vers@dirk.nl",
    status: "Verlopen",
    items: [
      { product: "Peren", hoeveelheid: 250, eenheid: "kg", prijs_per_eenheid: 2.20, totaal: 550 },
      { product: "Druiven", hoeveelheid: 100, eenheid: "kg", prijs_per_eenheid: 3.80, totaal: 380 },
    ],
    subtotaal: 930,
    btw_bedrag: 84.21,
    totaal_incl_btw: 1014.21,
    created_at: "2024-03-20",
  },
];
