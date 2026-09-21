// Shared types used across LandingPage, PropertySearch, and NavigationHeader.

export type Language = "en" | "it";

export type Guests = {
  adults: number;
  children: number;
  infants: number;
};

export type ActiveTab = "STAY" | "EXPERIENCE" | "OWN";

// Mirrors the shape of TRANSLATIONS.en / TRANSLATIONS.it in lib/translations.ts.
export type Translation = {
  selectDates: string;
  title: string;
  subtitle: string;
  stay: string;
  experience: string;
  own: string;
  location: string;
  whereGoing: string;
  checkIn: string;
  checkOut: string;
  addDate: string;
  guests: string;
  addGuests: string;
  bookYourStay: string;
  lang: string;
  selectLang: string;
  close: string;
  search: string;
  bookingTitle: string;
  searchTitle: string;
};
