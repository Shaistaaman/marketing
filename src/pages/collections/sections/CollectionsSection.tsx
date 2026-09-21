import {
  Bed,
  ChevronLeft,
  ChevronRight,
  Heart,
  Maximize2,
  RotateCcw,
  ShowerHead,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterStepperDropdown from "../../../components/common/FilterStepperDropdown";
import Pagination from "../../../components/common/Pagination";
import { ROUTES } from "../../../lib/constants";

interface CollectionProperty {
  id: string;
  title: string;
  location: string;
  region: string;
  beds: number;
  baths: number;
  guests: number;
  size: string;
  images: string[];
}

const IMG = {
  go: "/images/somuch/go.png",
  great: "/images/somuch/great.png",
  rome: "/images/somuch/rome.png",
};

const COLLECTION_PROPERTIES: CollectionProperty[] = [
  {
    id: "tiber-luxury",
    title: "Tiber Luxury Penthouse",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.go, IMG.great, IMG.rome],
  },
  {
    id: "art-gallery-penthouse",
    title: "Art Gallery Penthouse",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.great, IMG.go, IMG.rome],
  },
  {
    id: "skylife-monti-1",
    title: "Skylife Monti's Wonder",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.rome, IMG.go, IMG.great],
  },
  {
    id: "rooftop-360",
    title: "360° Rooftop Penthouse",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.go, IMG.great, IMG.rome],
  },
  {
    id: "skylife-modern-4",
    title: "Skylife Modern 4-Bedroom",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.great, IMG.go, IMG.rome],
  },
  {
    id: "skylife-monti-2",
    title: "Skylife Monti's Wonder",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.rome, IMG.go, IMG.great],
  },
  {
    id: "villa-bella-vista",
    title: "Villa Bella Vista",
    location: "Amalfi Coast, Italy",
    region: "Amalfi Coast",
    beds: 5,
    baths: 4,
    guests: 8,
    size: "450sqm",
    images: [IMG.go, IMG.great, IMG.rome],
  },
  {
    id: "palazzo-san-marco",
    title: "Palazzo San Marco",
    location: "Venice, Italy",
    region: "Venice",
    beds: 3,
    baths: 3,
    guests: 6,
    size: "320sqm",
    images: [IMG.great, IMG.go, IMG.rome],
  },
  {
    id: "lake-como-sola",
    title: "Villa Sola Cabiati Vista",
    location: "Lake Como, Italy",
    region: "Lake Como",
    beds: 6,
    baths: 5,
    guests: 10,
    size: "650sqm",
    images: [IMG.rome, IMG.go, IMG.great],
  },
  {
    id: "tiber-luxury1",
    title: "Tiber Luxury Penthouse",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.go, IMG.great, IMG.rome],
  },
  {
    id: "art-gallery-penthouse1",
    title: "Art Gallery Penthouse",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.great, IMG.go, IMG.rome],
  },
  {
    id: "skylife-monti-11",
    title: "Skylife Monti's Wonder",
    location: "Rome, Italy",
    region: "Rome",
    beds: 4,
    baths: 2,
    guests: 5,
    size: "400sqm",
    images: [IMG.rome, IMG.go, IMG.great],
  },
];

const MAX_BEDS = 6;
const MAX_BATHS = 6;
const MAX_GUESTS = 12;
const ITEMS_PER_PAGE = 6;

export default function CollectionsSection() {
  const navigate = useNavigate();

  // Filters
  const [locationSearch, setLocationSearch] = useState("");
  const [beds, setBeds] = useState<number | null>(null);
  const [baths, setBaths] = useState<number | null>(null);
  const [guests, setGuests] = useState<number | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<
    "beds" | "baths" | "guests" | null
  >(null);

  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [cardImageIndices, setCardImageIndices] = useState<
    Record<string, number>
  >({});
  const [currentPage, setCurrentPage] = useState(1);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleNextImage = (id: string, maxLen: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) + 1) % maxLen,
    }));
  };

  const handlePrevImage = (id: string, maxLen: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCardImageIndices((prev) => ({
      ...prev,
      [id]: ((prev[id] ?? 0) - 1 + maxLen) % maxLen,
    }));
  };

  const handleReset = () => {
    setLocationSearch("");
    setBeds(null);
    setBaths(null);
    setGuests(null);
    setActiveDropdown(null);
    setCurrentPage(1);
  };

  const filteredProperties = COLLECTION_PROPERTIES.filter((prop) => {
    if (locationSearch.trim() !== "") {
      const query = locationSearch.toLowerCase();
      const matchLoc =
        prop.location.toLowerCase().includes(query) ||
        prop.title.toLowerCase().includes(query) ||
        prop.region.toLowerCase().includes(query);
      if (!matchLoc) return false;
    }
    if (beds !== null && prop.beds < beds) return false;
    if (baths !== null && prop.baths < baths) return false;
    if (guests !== null && prop.guests < guests) return false;
    return true;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProperties.length / ITEMS_PER_PAGE),
  );
  const displayedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("explore-collections-section")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="explore-collections-section"
      className="w-full border-t border-neutral-100 bg-white py-16 font-sans text-neutral-900 md:py-24"
    >
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6 md:px-12">
        {/* Title */}
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-serif text-4xl leading-tight font-normal text-neutral-900 italic sm:text-5xl md:text-[56px]">
            Explore Properties
          </h2>
        </div>

        {/* Filter bar */}
        <div className="mb-12">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 sm:gap-4">
            {/* Location */}
            <div className="min-w-[200px] flex-1">
              <input
                type="text"
                value={locationSearch}
                onChange={(e) => {
                  setLocationSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Location"
                className="w-full rounded-md border border-neutral-300 bg-white px-4 py-3 text-sm text-neutral-900 shadow-xs transition-colors placeholder-neutral-500 focus:border-neutral-900 focus:outline-none"
              />
            </div>

            <FilterStepperDropdown
              label="Beds"
              selectedPrefix="Beds"
              popoverTitle={`Beds (Max ${MAX_BEDS})`}
              value={beds}
              onChange={(v) => {
                setBeds(v);
                setCurrentPage(1);
              }}
              max={MAX_BEDS}
              isOpen={activeDropdown === "beds"}
              onToggle={() =>
                setActiveDropdown(activeDropdown === "beds" ? null : "beds")
              }
              onClose={() => setActiveDropdown(null)}
            />

            <FilterStepperDropdown
              label="Bathrooms"
              selectedPrefix="Baths"
              popoverTitle={`Bathrooms (Max ${MAX_BATHS})`}
              value={baths}
              onChange={(v) => {
                setBaths(v);
                setCurrentPage(1);
              }}
              max={MAX_BATHS}
              isOpen={activeDropdown === "baths"}
              onToggle={() =>
                setActiveDropdown(activeDropdown === "baths" ? null : "baths")
              }
              onClose={() => setActiveDropdown(null)}
            />

            <FilterStepperDropdown
              label="Guests"
              selectedPrefix="Guests"
              popoverTitle={`Guests (Max ${MAX_GUESTS})`}
              value={guests}
              onChange={(v) => {
                setGuests(v);
                setCurrentPage(1);
              }}
              max={MAX_GUESTS}
              isOpen={activeDropdown === "guests"}
              onToggle={() =>
                setActiveDropdown(activeDropdown === "guests" ? null : "guests")
              }
              onClose={() => setActiveDropdown(null)}
              panelWidth="w-72"
            />

            {/* Reset */}
            <button
              onClick={handleReset}
              title="Reset Filters"
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-md border border-neutral-300 bg-white text-neutral-700 transition-colors hover:border-neutral-500 hover:text-neutral-900"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Property grid */}
        {displayedProperties.length > 0 ? (
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {displayedProperties.map((property) => {
              const currentImgIdx = cardImageIndices[property.id] ?? 0;
              const isFav = favorites[property.id] ?? false;

              return (
                <div
                  key={property.id}
                  onClick={() => navigate(ROUTES.propertyDetail(property.id))}
                  className="group flex cursor-pointer flex-col"
                >
                  {/* Image */}
                  <div className="relative mb-3 aspect-[1.15] w-full overflow-hidden rounded-none bg-neutral-100">
                    <img
                      src={property.images[currentImgIdx]}
                      alt={property.title}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />

                    {property.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) =>
                            handlePrevImage(
                              property.id,
                              property.images.length,
                              e,
                            )
                          }
                          className="absolute top-1/2 left-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/90 text-neutral-900 opacity-80 shadow-sm transition-all group-hover:opacity-100 hover:bg-white"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) =>
                            handleNextImage(
                              property.id,
                              property.images.length,
                              e,
                            )
                          }
                          className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/90 text-neutral-900 opacity-80 shadow-sm transition-all group-hover:opacity-100 hover:bg-white"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {/* Wishlist */}
                    <button
                      onClick={(e) => toggleFavorite(property.id, e)}
                      className="absolute top-3 right-3 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/95 text-neutral-800 shadow-sm transition-transform hover:scale-105"
                      aria-label="Save to wishlist"
                      aria-pressed={isFav}
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          isFav
                            ? "fill-red-500 text-red-500"
                            : "text-neutral-700"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Location */}
                  <span className="mb-1 font-sans text-[12px] tracking-tight text-neutral-500">
                    {property.location}
                  </span>

                  {/* Title */}
                  <h3 className="mb-3 line-clamp-1 font-serif text-xl font-normal tracking-tight text-neutral-900 md:text-[22px]">
                    {property.title}
                  </h3>

                  {/* Specs */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-xs text-neutral-700">
                    <span className="flex shrink-0 items-center gap-1.5">
                      <Bed
                        className="h-4 w-4 text-neutral-800"
                        strokeWidth={1.5}
                      />
                      {property.beds} Beds
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <ShowerHead
                        className="h-4 w-4 text-neutral-800"
                        strokeWidth={1.5}
                      />
                      {property.baths} Bathrooms
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <Users
                        className="h-4 w-4 text-neutral-800"
                        strokeWidth={1.5}
                      />
                      {property.guests}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5">
                      <Maximize2
                        className="h-4 w-4 text-neutral-800"
                        strokeWidth={1.5}
                      />
                      {property.size}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty state */
          <div className="mx-auto mb-16 max-w-xl rounded-lg border border-dashed border-neutral-200 py-16 text-center">
            <p className="mb-4 font-serif text-base text-neutral-600 italic">
              No properties matching your selected criteria.
            </p>
            <button
              onClick={handleReset}
              className="cursor-pointer rounded bg-black px-6 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-neutral-800"
            >
              Reset Filters
            </button>
          </div>
        )}

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
