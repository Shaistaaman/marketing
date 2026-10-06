import { ChevronDown, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import CategoryFilterTabs from "../../../components/common/CategoryFilterTabs";
import Pagination from "../../../components/common/Pagination";
import {
  COLLECTION_EXPERIENCES,
  DESTINATIONS,
} from "../../../data/experiences";
import { ROUTES } from "../../../lib/constants";

const ITEMS_PER_PAGE = 6;

export default function ExperienceCollectionList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedDestination, setSelectedDestination] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cardImageIndices, setCardImageIndices] = useState<
    Record<string, number>
  >({});
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
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

  const filteredExperiences = COLLECTION_EXPERIENCES.filter((exp) => {
    const matchesDestination =
      selectedDestination === "ALL" ||
      exp.location.toLowerCase() === selectedDestination.toLowerCase();
    const matchesCategory =
      selectedCategory === "All" ||
      exp.categories.some(
        (cat) => cat.toLowerCase() === selectedCategory.toLowerCase(),
      );
    return matchesDestination && matchesCategory;
  });

  const totalPages = Math.max(
    1,
    Math.ceil(filteredExperiences.length / ITEMS_PER_PAGE),
  );
  const displayedExperiences = filteredExperiences.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    document
      .getElementById("explore-experiences-header")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="border-b border-neutral-100 bg-white py-16 font-sans text-neutral-900 sm:py-24">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-8 lg:px-12">
        {/* HEADER */}
        <div
          id="explore-experiences-header"
          className="mb-10 text-center sm:mb-14"
        >
          <h2 className="font-serif text-4xl font-normal tracking-tight text-neutral-900 italic sm:text-6xl lg:text-7xl">
            {t("experiencesPage.collection.listHeading")}
          </h2>
        </div>

        {/* CONTROLS */}
        <div className="mb-12 flex w-full flex-col items-stretch justify-between gap-4 border-b border-neutral-200 pb-6 lg:flex-row lg:items-center lg:gap-6">
          {/* Destination dropdown */}
          <div className="relative w-full shrink-0 lg:w-48 xl:w-52">
            <select
              value={selectedDestination}
              onChange={(e) => {
                setSelectedDestination(e.target.value);
                setCurrentPage(1);
              }}
              aria-label={t("common.aria.filterByDestination")}
              className="w-full cursor-pointer appearance-none rounded-none border border-neutral-300 bg-white px-3.5 py-3 pr-9 font-sans text-xs font-medium tracking-[0.18em] text-neutral-900 uppercase focus:border-neutral-900 focus:outline-none"
            >
              {DESTINATIONS.map((dest) => (
                <option key={dest} value={dest}>
                  {dest}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-neutral-600" />
          </div>

          <CategoryFilterTabs
            selected={selectedCategory}
            onSelect={(id) => {
              setSelectedCategory(id);
              setCurrentPage(1);
            }}
            layoutId="activeCategoryCollectionIndicator"
          />
        </div>

        {/* GRID */}
        {displayedExperiences.length > 0 ? (
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10 lg:grid-cols-3">
            {displayedExperiences.map((exp) => {
              const currentImgIdx = cardImageIndices[exp.id] ?? 0;
              const isFav = favorites[exp.id] ?? false;

              return (
                <div
                  key={exp.id}
                  className="group flex cursor-pointer flex-col"
                  onClick={() => navigate(ROUTES.experienceDetail(exp.id))}
                >
                  {/* Image */}
                  <div className="relative mb-4 aspect-[1.3] w-full overflow-hidden rounded-none bg-neutral-100">
                    <img
                      src={exp.images[currentImgIdx]}
                      alt={exp.name}
                      loading="eager"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />

                    {exp.images.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) =>
                            handlePrevImage(exp.id, exp.images.length, e)
                          }
                          className="absolute top-1/2 left-3 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/90 text-neutral-900 opacity-80 shadow-sm transition-all group-hover:opacity-100 hover:bg-white"
                          aria-label={t("common.aria.previousImage")}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) =>
                            handleNextImage(exp.id, exp.images.length, e)
                          }
                          className="absolute top-1/2 right-3 z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/90 text-neutral-900 opacity-80 shadow-sm transition-all group-hover:opacity-100 hover:bg-white"
                          aria-label={t("common.aria.nextImage")}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </>
                    )}

                    {/* Wishlist */}
                    <button
                      type="button"
                      onClick={(e) => toggleFavorite(exp.id, e)}
                      className="absolute top-3 right-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-black/5 bg-white/95 text-neutral-800 shadow-sm transition-transform hover:scale-105"
                      aria-label={t("common.aria.saveToWishlist")}
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

                  {/* Title */}
                  <h3 className="mb-2 font-sans text-xl leading-snug font-medium tracking-tight text-neutral-900 transition-colors group-hover:text-neutral-600 sm:text-[22px]">
                    {exp.name}
                  </h3>

                  {/* Description */}
                  <p className="line-clamp-2 font-sans text-xs leading-relaxed font-light text-neutral-600 sm:text-sm">
                    {exp.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="mx-auto mb-16 max-w-xl rounded-lg border border-dashed border-neutral-200 py-20 text-center font-sans text-sm text-neutral-500">
            {t("experiencesPage.collection.emptyState")}
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
