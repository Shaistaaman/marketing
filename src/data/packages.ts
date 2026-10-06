import { IMG } from "./imageMap";

export interface PackageHighlightBlock {
  category: string;
  heading: string;
  description: string;
  image: string;
}

export interface PackageItinerarySegment {
  day: string;
  title: string;
  description: string;
}

export interface PackageDetailData {
  id: string;
  name: string;
  duration: string;
  basePrice: string;
  guestCapacity: string;
  bestSeason: string;
  location: string;
  image: string;
  description: string;
  highlights: string[];
  galleryImages: string[];
  inclusions: PackageHighlightBlock[];
  itinerary?: PackageItinerarySegment[];
}

/** Standard 6-image collage used when a package has no gallery of its own. */
export const DEFAULT_COLLAGE_IMAGES = [
  IMG.go,
  IMG.romeRoof,
  IMG.great,
  IMG.palazzoBath,
  IMG.rome,
  IMG.coastalTown,
];

const STANDARD_GALLERY = [
  IMG.tuscanDining,
  IMG.florenceSuite,
  IMG.aboutSky,
  IMG.lakeComo,
  IMG.italyProperty,
  IMG.coastalTown,
];

export const PACKAGES_DATA: PackageDetailData[] = [
  {
    id: "roman-edit",
    duration: "4 Nights",
    name: "The Roman Edit",
    bestSeason: "January - March",
    location: "Rome, Lazio",
    image: IMG.great,
    basePrice: "€2,850",
    guestCapacity: "2-4 Guests",
    description:
      "Immerse in private penthouses, secret Colosseum access, and curated dining atop ancient rooftops. Experience the eternal city with exclusive access to Rome's most coveted cultural treasures.",
    highlights: [
      "Rooftop terrace apartment with panoramic city views",
      "Private city orientation tour with local expert",
      "After-hours access to Ancient Rome archaeological sites",
      "24/7 dedicated concierge service throughout your stay",
    ],
    galleryImages: STANDARD_GALLERY,
    inclusions: [
      {
        category: "CULTURE & HERITAGE",
        heading: "Ancient Rome After Hours",
        description:
          "Experience the Colosseum and Roman Forum with exclusive after-hours access. Walk through history without the crowds, guided by expert archaeologists who bring ancient stories to life under the moonlight.",
        image: IMG.go,
      },
      {
        category: "GASTRONOMY & LUXURY",
        heading: "Rooftop Culinary Experience",
        description:
          "Private rooftop dining prepared by a Michelin-starred chef overlooking St. Peter's Basilica. Savor authentic Roman cuisine paired with fine Italian wines as the sun sets over the eternal city.",
        image: IMG.great,
      },
      {
        category: "LIFESTYLE & CONCIERGE",
        heading: "Private City Orientation",
        description:
          "Your dedicated local expert provides an intimate introduction to Rome's hidden gems, secret passages, and best local trattorias. Experience the city like a true Roman with personalized recommendations.",
        image: IMG.rome,
      },
    ],
  },
  {
    id: "grande-bellezza",
    duration: "9 Nights",
    name: "La Grande Bellezza",
    bestSeason: "March - September",
    location: "Florence, Venice & Rome",
    image: IMG.go,
    basePrice: "€4,200",
    guestCapacity: "2-6 Guests",
    description:
      "The ultimate Grand Tour through Italy's historic palazzos, renaissance art, and private canal serenades. A multi-city journey capturing the essence of Italian grandeur.",
    highlights: [
      "Night tour of the Valley of the Temples in Sicily",
      "Private Renaissance palazzo accommodations in Florence",
      "Sunset gondola serenade in Venice canals",
      "Luxury chauffeur-driven transfers between all cities",
    ],
    galleryImages: [
      IMG.romePenthouse,
      IMG.romeRoof,
      IMG.curatedInterior,
      IMG.palazzoBath,
      IMG.italyProperty,
      IMG.coastalTown,
    ],
    inclusions: [
      {
        category: "ART & RENAISSANCE",
        heading: "Florence Renaissance Journey",
        description:
          "Private access to the Uffizi Gallery and exclusive viewing of Michelangelo's David. Stay in a historic palazzo and experience Florence's artistic heritage with renowned art historians as your guides.",
        image: IMG.tuscanDining,
      },
      {
        category: "ROMANCE & WATERWAYS",
        heading: "Venice Private Gondola Serenade",
        description:
          "Glide through Venice's secret canals at sunset with a private gondola and live serenade. Experience the magic of La Serenissima away from tourist routes, discovering hidden corners of this floating masterpiece.",
        image: IMG.florenceSuite,
      },
      {
        category: "ANCIENT WONDERS",
        heading: "Valley of the Temples by Night",
        description:
          "Witness Sicily's magnificent Greek temples illuminated under the stars. This exclusive after-hours tour reveals ancient history in the most dramatic setting, followed by a private dinner featuring Sicilian delicacies.",
        image: IMG.aboutSky,
      },
    ],
  },
  {
    id: "islands-light",
    duration: "8 Nights",
    name: "Islands of Light",
    bestSeason: "April - October",
    location: "Sardinia & Sicily",
    image: IMG.final,
    basePrice: "€3,950",
    guestCapacity: "2-8 Guests",
    description:
      "Secluded seaside estates and private boat days exploring emerald waters and volcanic island coastlines. Discover Italy's most pristine Mediterranean islands.",
    highlights: [
      "Private waterfront villas in Sardinia and Sicily",
      "Full-day private yacht excursions to hidden coves",
      "Island boat days with captain and chef",
      "Coastal vineyard tours and seafood experiences",
    ],
    galleryImages: STANDARD_GALLERY,
    inclusions: [
      {
        category: "COASTAL LUXURY",
        heading: "Private Waterfront Villas",
        description:
          "Stay in exclusive beachfront estates with direct Mediterranean access. Your private villa features infinity pools, personal chef service, and stunning views of turquoise waters and white sand beaches.",
        image: IMG.palazzoBath,
      },
      {
        category: "NAUTICAL ADVENTURES",
        heading: "Full-Day Yacht Excursions",
        description:
          "Explore hidden coves and secret beaches aboard your private yacht. With an experienced captain and onboard chef, discover secluded swimming spots and enjoy gourmet lunches on the water.",
        image: IMG.italyProperty,
      },
      {
        category: "ISLAND GASTRONOMY",
        heading: "Coastal Vineyard & Seafood Journey",
        description:
          "Visit family-owned vineyards producing rare island wines and indulge in fresh-caught seafood prepared by local chefs. Experience authentic island cuisine paired with spectacular coastal sunsets.",
        image: IMG.coastalTown,
      },
    ],
  },
  {
    id: "amalfi-dream",
    duration: "7 Nights",
    name: "Coastal Masterpiece",
    bestSeason: "May - September",
    location: "Amalfi Coast & Capri",
    image: IMG.rome,
    basePrice: "€3,750",
    guestCapacity: "2-6 Guests",
    description:
      "Cliffside luxury living with private Riva yacht charters along Positano and Capri's Faraglioni. Experience the dramatic beauty of Italy's most famous coastline.",
    highlights: [
      "Cliffside boutique hotel with infinity pool and sea views",
      "Guided Path of the Gods hiking experience",
      "Private Riva speedboat yacht charter to Capri",
      "VIP access to exclusive beach clubs and Michelin dining",
    ],
    galleryImages: STANDARD_GALLERY,
    inclusions: [
      {
        category: "CLIFFSIDE LUXURY",
        heading: "Boutique Hotel Paradise",
        description:
          "Your cliffside retreat features an infinity pool overlooking the Mediterranean, private terraces, and direct access to exclusive beach clubs. Wake up to breathtaking views of Positano's colorful cascade.",
        image: IMG.lakeComo,
      },
      {
        category: "ADVENTURE & NATURE",
        heading: "Path of the Gods Hiking",
        description:
          "Trek the legendary Sentiero degli Dei with an expert guide. This spectacular coastal trail offers panoramic views of the Amalfi Coast, followed by a private lunch at a cliffside restaurant.",
        image: IMG.romePenthouse,
      },
      {
        category: "NAUTICAL ELEGANCE",
        heading: "Private Riva to Capri",
        description:
          "Cruise to Capri in style aboard a vintage Riva speedboat. Explore the Blue Grotto, circle the Faraglioni rocks, and dock at exclusive beach clubs accessible only by sea.",
        image: IMG.romeRoof,
      },
    ],
  },
];

/** Fallback shown when a package id isn't recognised. */
export const DEFAULT_PACKAGE: PackageDetailData = {
  id: "rome-eternal-elegance",
  name: "Rome Eternal Elegance",
  duration: "10 Nights",
  basePrice: "€3,750",
  guestCapacity: "Family Friendly",
  bestSeason: "Summer & Spring",
  location: "Rome, Lazio & Vatican City",
  image: IMG.romeRoof,
  description:
    "Immerse in private penthouses overlooking ancient monuments, secret after-hours Colosseum access, and curated rooftop dining experiences designed exclusively for discerning travelers.",
  highlights: [
    "Private rooftop penthouse with panoramic views of St. Peter's Basilica",
    "After-hours private tour of the Vatican Museums and Sistine Chapel",
    "Exclusive candlelit rooftop dinner prepared by a Michelin-starred private chef",
    "Chauffeur-driven vintage Alfa Romeo day tour through ancient Rome and Appian Way",
    "24/7 dedicated local Skylife lifestyle manager & private concierge",
  ],
  galleryImages: DEFAULT_COLLAGE_IMAGES,
  inclusions: [
    {
      category: "CULTURE & GASTRONOMY",
      heading: "Soak In The City",
      description:
        "Your private tour starts in the oldest market, where you'll have the opportunity to indulge in authentic street food. Next, you will explore the wide boulevards, baroque palaces and some of the city's much-loved sites.",
      image: IMG.romePenthouse,
    },
    {
      category: "HISTORY & HERITAGE",
      heading: "Valley Of Temple By Night",
      description:
        "Join our local guide in discovering the stories that each of the eight temples bring. Witness the mighty Temple of Concordia lit up against the night sky while you learn more about the history of this special corner of the world.",
      image: IMG.nightWaterfront,
    },
    {
      category: "CRAFT & FLAVOR",
      heading: "Secrets Of Sicilian Kitchen",
      description:
        "Both declared UNESCO World Heritage Sites, these towns are a historian and photographer's delight with impressive Baroque architecture. You'll visit the oldest confectionary shop and sample chocolate unique to the region.",
      image: IMG.tuscanDining,
    },
  ],
  itinerary: [
    {
      day: "Days 1 - 3",
      title: "Arrival & Rooftop Welcome in Imperial Rome",
      description:
        "Private airport greeting and transfer to your penthouse. Evening sunset aperitivo on your terrace followed by a private midnight stroll to Trevi Fountain.",
    },
    {
      day: "Days 4 - 6",
      title: "Vatican Secrets & Culinary Masterclass",
      description:
        "VIP after-hours access to the Sistine Chapel. Afternoon hands-on pasta and truffle masterclass with a master chef in a private Palazzo.",
    },
    {
      day: "Days 7 - 9",
      title: "Vintage Alfa Romeo Escapes & Hidden Gardens",
      description:
        "Self-drive or chauffeur vintage sports car tour to Villa d'Este in Tivoli and private wine tasting at historic Roman castles.",
    },
    {
      day: "Day 10",
      title: "Farewell Gala & Private Transfer",
      description:
        "Leisurely brunch overlooking the Colosseum, personalized departure gift, and luxury private transfer.",
    },
  ],
};

/** Look up a package by id, falling back to the default record. */
export function findPackageData(
  packageId: string | undefined,
): PackageDetailData {
  if (!packageId) return DEFAULT_PACKAGE;
  return PACKAGES_DATA.find((pkg) => pkg.id === packageId) ?? DEFAULT_PACKAGE;
}
