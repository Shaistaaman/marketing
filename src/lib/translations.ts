import type { Language, Translation } from "./types";

/**
 * Landing page copy, extracted from the Next.js page.tsx so it can be
 * shared by the hero, the search widget, and the navigation header.
 */
export const TRANSLATIONS: Record<Language, Translation> = {
  en: {
    selectDates: "Select Dates",
    title: "Skylife – Your Italian Connection",
    subtitle:
      "Exceptional homes, curated experiences, and full-service property management — all in one place.",
    stay: "STAY",
    experience: "EXPERIENCE",
    own: "OWN",
    location: "Location",
    whereGoing: "Where are you going?",
    checkIn: "Check in",
    checkOut: "Check out",
    addDate: "Add date",
    guests: "Guests",
    addGuests: "Add guests",
    bookYourStay: "Book Your Stay",
    lang: "Eng",
    selectLang: "Select Language",
    close: "Close",
    search: "Search",
    bookingTitle: "Reserve Your Skylife Experience",
    searchTitle: "Custom Italian Itinerary",
  },
  it: {
    selectDates: "Seleziona Date",
    title: "Skylife – La Tua Connessione Italiana",
    subtitle:
      "Case eccezionali, esperienze curate e gestione completa della proprietà — tutto in un unico posto.",
    stay: "SOGGIORNA",
    experience: "ESPERIENZA",
    own: "PROPRIETÀ",
    location: "Località",
    whereGoing: "Dove vuoi andare?",
    checkIn: "Check-in",
    checkOut: "Check-out",
    addDate: "Aggiungi data",
    guests: "Ospiti",
    addGuests: "Aggiungi ospiti",
    bookYourStay: "Prenota il Soggiorno",
    lang: "Ita",
    selectLang: "Seleziona Lingua",
    close: "Chiudi",
    search: "Cerca",
    bookingTitle: "Riserva la Tua Esperienza Skylife",
    searchTitle: "Itinerario Italiano Personalizzato",
  },
};
