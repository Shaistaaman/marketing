import { IMG as MAP } from "./imageMap";

export type ExperienceCategory =
  | "History & Culture"
  | "Culinary Adventures"
  | "Outdoor Tours"
  | "Closed to the Public"
  | "Family"
  | "At Home"
  | "One Day City Escape";

export interface ExperienceItem {
  id: string;
  title: string;
  location: string;
  category: ExperienceCategory;
  images: [string, string, string];
  subtitle: string;
  description: string;
  duration: string;
  highlights: string[];
}

export const DESTINATIONS = [
  "ALL",
  "Rome",
  "Florence",
  "Venice",
  "Tuscany",
  "Lake Como",
  "Amalfi Coast",
  "Naples",
] as const;

const IMG = {
  go: MAP.go,
  great: MAP.great,
  rome: MAP.rome,
};

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "pompeii-naples",
    title: "Pompeii & Naples: A Journey Through Time",
    location: "Naples",
    category: "History & Culture",
    images: [IMG.go, IMG.great, IMG.rome],
    subtitle: "Exclusive ruins tour & Neapolitan gourmet tasting",
    description:
      "Step back in time at ancient Pompeii with a private archaeologist, then plunge into Naples for an authentic Neapolitan pizza and street food odyssey at a private chef table.",
    duration: "Full Day (8 Hours)",
    highlights: [
      "Private archaeologist access to closed Pompeii villas",
      "VIP speedboat transfer along Neapolitan coastline",
      "Exclusive 3-course street food & pizza masterclass",
    ],
  },
  {
    id: "colosseum-forum",
    title: "Colosseum & Forum Private After-Hours",
    location: "Rome",
    category: "History & Culture",
    images: [IMG.great, IMG.go, IMG.rome],
    subtitle: "Walk the gladiatorial floor in total evening tranquility",
    description:
      "Experience Rome's iconic arena after public closing. Walk the underground hypogeum and gladiator floor illuminated solely for your private party.",
    duration: "3.5 Hours",
    highlights: [
      "Private keyholder access after general public leaves",
      "Historian-guided walk through ancient Roman Forum",
      "Rooftop Prosecco toast overlooking the lit Colosseum",
    ],
  },
  {
    id: "tuscan-harvest",
    title: "Tuscan Estate Private Vineyard Harvest",
    location: "Tuscany",
    category: "Culinary Adventures",
    images: [IMG.rome, IMG.go, IMG.great],
    subtitle: "Grape harvest, master cellar tasting & alfresco lunch",
    description:
      "Join a noble winemaking family in Val d'Orcia for an exclusive private harvest, cellar barrel tasting of vintage Brunello, and a candlelit garden feast.",
    duration: "6 Hours",
    highlights: [
      "Private vineyard tour with 15th-generation estate owner",
      "Sommelier barrel tasting of rare reserve vintages",
      "Farm-to-table multi-course lunch paired with grand crus",
    ],
  },
  {
    id: "lake-como-boat",
    title: "Lake Como Vintage Wooden Boat Voyage",
    location: "Lake Como",
    category: "Outdoor Tours",
    images: [IMG.go, IMG.great, IMG.rome],
    subtitle: "Private Riva yacht cruise & hidden villa gardens",
    description:
      "Cruise the crystalline waters of Lake Como in a classic wooden Riva. Tour private aristocratic villa gardens closed to the general public.",
    duration: "5 Hours",
    highlights: [
      "Custom mahogany Riva speedboat with private captain",
      "Exclusive private entry to Villa Balbianello water gate",
      "Champagne aperitivo floating off Bellagio promontory",
    ],
  },
  {
    id: "florence-duomo-chef",
    title: "Florentine Terrace Private Chef Experience",
    location: "Florence",
    category: "At Home",
    images: [IMG.great, IMG.go, IMG.rome],
    subtitle: "Michelin-starred culinary performance over the Duomo skyline",
    description:
      "A celebrated Italian chef prepares a custom multi-course tasting menu directly inside your private penthouse terrace overlooking Brunelleschi's Dome.",
    duration: "4 Hours",
    highlights: [
      "Personalized menu crafting with Michelin-trained chef",
      "Rare Tuscan wine pairings curated by top sommelier",
      "Sunset classical acoustic guitar performance",
    ],
  },
  {
    id: "amalfi-chopper-yacht",
    title: "Amalfi Coast Chopper & Capri Hideaways",
    location: "Amalfi Coast",
    category: "One Day City Escape",
    images: [IMG.rome, IMG.go, IMG.great],
    subtitle: "Helicopter transfer over Vesuvius & private Capri cove swims",
    description:
      "Take off by private chopper to soar above Mount Vesuvius before landing directly on Capri for a private yacht charter around the Faraglioni rocks.",
    duration: "Full Day (9 Hours)",
    highlights: [
      "Scenic private helicopter flight over Naples Bay",
      "50ft Luxury yacht charter with private skipper",
      "Private cliffside dining reservation at La Fontelina",
    ],
  },
  {
    id: "secret-palazzo-milano",
    title: "Secret Milanese Palazzo & Haute Couture Atelier",
    location: "Florence",
    category: "Closed to the Public",
    images: [IMG.go, IMG.great, IMG.rome],
    subtitle: "Private museum archives & bespoke artisan atelier",
    description:
      "Step behind locked doors into private noble sanctuaries and private fashion archives with personal stylists and Master craftsmen.",
    duration: "4 Hours",
    highlights: [
      "Private access to restricted private art collection",
      "Personal appointment at legendary leather workshop",
      "Private champagne fitting session with fashion curator",
    ],
  },
  {
    id: "venice-gondola-glass",
    title: "Venetian Lagoon & Murano Master Glassblowing",
    location: "Venice",
    category: "Family",
    images: [IMG.great, IMG.go, IMG.rome],
    subtitle:
      "Private island hopping & hands-on artisan masterclass for families",
    description:
      "Embark on a private water taxi across the Venetian lagoon to Murano and Burano, where a master artisan guides your family through custom glassblowing.",
    duration: "5 Hours",
    highlights: [
      "Private water taxi charter throughout the day",
      "Hands-on family glass sculpting with a Venetian maestro",
      "Candlelit gondola ride along quiet secret canals",
    ],
  },
];

/** Look up an experience by id. */
export function findExperience(
  id: string | undefined,
): ExperienceItem | undefined {
  if (!id) return undefined;
  return EXPERIENCES_DATA.find((exp) => exp.id === id);
}

/* ------------------------------------------------------------------ *
 * Full experience collection (the /experiences/collection listing).
 * All images were broken /src/assets/* paths in the source; remapped
 * via the shared IMG pool.
 * ------------------------------------------------------------------ */

export interface ExperienceCollectionItem {
  id: string;
  title: string;
  location: string;
  category: ExperienceCategory;
  images: string[];
  description: string;
  duration?: string;
  highlights?: string[];
}

export const COLLECTION_EXPERIENCES: ExperienceCollectionItem[] = [
  {
    id: "vatican-vip-tour",
    title: "Vatican VIP Tour",
    location: "Rome",
    category: "History & Culture",
    images: [MAP.romePenthouse, MAP.romeRoof],
    description:
      "Enjoy exclusive, priority access to the Vatican Museums and Sistine Chapel, guided by an expert.",
    duration: "3.5 Hours",
    highlights: [
      "Private keyholder opening before public entry",
      "Exclusive access to Sistine Chapel & Raphael Rooms",
      "Dedicated art historian guide",
    ],
  },
  {
    id: "cooking-class-grandmothers",
    title: "Cooking Class with Authentic Italian Grandmothers",
    location: "Rome",
    category: "Culinary Adventures",
    images: [MAP.curatedInterior, MAP.tuscanDining],
    description:
      "Taste And Create The Flavors Of The Bel Paese Yourself Along With Real Italian Grandmothers.",
    duration: "4 Hours",
    highlights: [
      "Hands-on pasta making from scratch",
      "Authentic nonna secret family recipes",
      "Three-course wine-paired feast",
    ],
  },
  {
    id: "roman-golf-cart-tour",
    title: "Roman Golf Cart Tour",
    location: "Rome",
    category: "Outdoor Tours",
    images: [MAP.romeRoof, MAP.coastalTown],
    description:
      "Discover Rome's top sights, from the Trevi Fountain to the Colosseum, in comfort and style.",
    duration: "3 Hours",
    highlights: [
      "Eco-friendly luxury golf cart ride through ancient alleyways",
      "Pass by Trevi Fountain, Pantheon & Piazza Navona",
      "Gelato & espresso stop included",
    ],
  },
  {
    id: "day-castel-gandolfo",
    title: "A Day in Castel Gandolfo",
    location: "Rome",
    category: "One Day City Escape",
    images: [MAP.florenceSkyline, MAP.tuscany],
    description:
      "Experience the charm, history, and flavors of Castel Gandolfo.",
    duration: "Full Day (6 Hours)",
    highlights: [
      "Pontifical Villa & Papal Gardens private access",
      "Organic farm lunch on Lake Albano shores",
      "Private roundtrip luxury transfer from Rome",
    ],
  },
  {
    id: "pizza-tiramisu-masterclass",
    title: "Pizza & Tiramisù Masterclass",
    location: "Rome",
    category: "Culinary Adventures",
    images: [MAP.tuscanDining, MAP.curatedInterior],
    description: "Craft your own pizza and tiramisù in the heart of Rome!",
    duration: "3 Hours",
    highlights: [
      "Learn dough fermentation & brick-oven baking",
      "Authentic espresso tiramisù crafting",
      "Unlimited wine & soft drinks",
    ],
  },
  {
    id: "campo-fiori-food-tour",
    title: "Campo de Fiori Food Tour",
    location: "Rome",
    category: "Culinary Adventures",
    images: [MAP.nightWaterfront, MAP.coastalTown],
    description:
      "Savor Rome's culinary delights as you explore the historic Campo de' Fiori and Piazza Navona.",
    duration: "3.5 Hours",
    highlights: [
      "Artisanal cured meats, cheeses & supplì tastings",
      "Historic bakery visit & fresh pasta tasting",
      "Local foodie guide expertise",
    ],
  },
  {
    id: "colosseum-after-hours",
    title: "Colosseum & Forum Private After-Hours",
    location: "Rome",
    category: "Closed to the Public",
    images: [MAP.romePenthouse, MAP.romeRoof, MAP.curatedInterior],
    description:
      "Walk the gladiatorial floor and underground chambers in total evening tranquility without crowd queues.",
    duration: "3.5 Hours",
    highlights: [
      "Exclusive night access to the arena floor",
      "Underground hypogeum guided inspection",
      "Prosecco toast overlooking ancient Rome",
    ],
  },
  {
    id: "pompeii-naples-journey",
    title: "Pompeii & Naples: A Journey Through Time",
    location: "Naples",
    category: "History & Culture",
    images: [MAP.coastalTown, MAP.nightWaterfront, MAP.romePenthouse],
    description:
      "Step back in time at ancient Pompeii with a private archaeologist, then enjoy authentic Neapolitan pizza.",
    duration: "Full Day (8 Hours)",
    highlights: [
      "Private archaeologist tour of Pompeii ruins",
      "VIP coastline transfer",
      "Neapolitan street food tasting",
    ],
  },
  {
    id: "tuscan-vineyard-harvest",
    title: "Tuscan Estate Private Vineyard Harvest",
    location: "Tuscany",
    category: "Culinary Adventures",
    images: [MAP.tuscanDining, MAP.tuscany, MAP.florenceSuite],
    description:
      "Join a noble winemaking family in Val d'Orcia for an exclusive private harvest and cellar barrel tasting.",
    duration: "6 Hours",
    highlights: [
      "Private vineyard walk with estate owner",
      "Brunello barrel tasting",
      "Farm-to-table garden feast",
    ],
  },
  {
    id: "lake-como-riva-voyage",
    title: "Lake Como Vintage Wooden Boat Voyage",
    location: "Lake Como",
    category: "Outdoor Tours",
    images: [MAP.lakeComo, MAP.palazzoBath, MAP.italyProperty],
    description:
      "Cruise the crystalline waters of Lake Como in a classic wooden Riva and visit hidden aristocratic gardens.",
    duration: "5 Hours",
    highlights: [
      "Mahogany Riva speedboat charter",
      "Private access to Villa Balbianello water gate",
      "Champagne aperitivo on the lake",
    ],
  },
  {
    id: "florence-duomo-private-chef",
    title: "Florentine Terrace Private Chef Experience",
    location: "Florence",
    category: "At Home",
    images: [MAP.florenceSuite, MAP.florenceSkyline, MAP.curatedInterior],
    description:
      "A celebrated chef prepares a multi-course tasting menu inside your penthouse terrace overlooking Brunelleschi's Dome.",
    duration: "4 Hours",
    highlights: [
      "Michelin-trained chef performance",
      "Rare Tuscan wine pairings",
      "Sunset guitar acoustic serenade",
    ],
  },
  {
    id: "venetian-glass-lagoon",
    title: "Venetian Lagoon & Murano Master Glassblowing",
    location: "Venice",
    category: "Family",
    images: [MAP.nightWaterfront, MAP.coastalTown, MAP.aboutSky],
    description:
      "Private water taxi across the Venetian lagoon to Murano, where a master artisan guides your family in glassblowing.",
    duration: "5 Hours",
    highlights: [
      "Private water taxi charter",
      "Hands-on family glass sculpting",
      "Gondola ride through secret canals",
    ],
  },
];

/**
 * Look up an experience for the detail page: checks the full collection
 * first, then the curated carousel set, then falls back to a default.
 */
export function findExperienceDetail(
  id: string | undefined,
): ExperienceCollectionItem {
  const fromCollection = COLLECTION_EXPERIENCES.find((e) => e.id === id);
  if (fromCollection) return fromCollection;

  const fromCarousel = EXPERIENCES_DATA.find((e) => e.id === id);
  if (fromCarousel) {
    return {
      id: fromCarousel.id,
      title: fromCarousel.title,
      location: fromCarousel.location,
      category: fromCarousel.category,
      images: [...fromCarousel.images],
      description: fromCarousel.description,
      duration: fromCarousel.duration,
      highlights: fromCarousel.highlights,
    };
  }

  return DEFAULT_EXPERIENCE;
}

export const DEFAULT_EXPERIENCE: ExperienceCollectionItem = {
  id: "cooking-class-grandmothers",
  title: "Cooking Class with Authentic Italian Grandmothers",
  location: "Rome",
  category: "Culinary Adventures",
  images: [
    MAP.tuscanDining,
    MAP.curatedInterior,
    MAP.tuscanDining,
    MAP.curatedInterior,
  ],
  description:
    "Taste and create the flavors of the Bel Paese yourself along with real Italian grandmothers.",
  duration: "3 Hours",
  highlights: [
    "Step into the kitchen with real Italian grandmothers — culinary wizards who've been perfecting pasta longer than you've been alive.",
    "In this 3-hour hands-on class, you'll roll dough, stir sauces, and master the art of Italian cooking with just your hands, fresh ingredients, and Nonna's laser-sharp critiques.",
    'Forget fancy machines — this is the old-school way. Each dish you make comes with a side of storytelling, laughter, and the occasional wine-fueled toast to "la dolce vita."',
    "Pro tip: compliment Nonna's sauce, and you might just get a second helping!",
  ],
};
