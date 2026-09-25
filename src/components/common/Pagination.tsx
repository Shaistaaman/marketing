import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** How many numbered buttons to show before the ellipsis. */
  visiblePages?: number;
}

/**
 * Numbered pagination bar with prev/next arrows and an ellipsis when there
 * are more pages than `visiblePages`. Shared by the Collections grid and the
 * Experience collection list.
 */
export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  visiblePages = 3,
}: PaginationProps) {
  const { t } = useTranslation();

  if (totalPages <= 1) return null;

  const leading = Array.from(
    { length: Math.min(visiblePages, totalPages) },
    (_, i) => i + 1,
  );
  const showEllipsis = totalPages > visiblePages + 1;
  const showLast = totalPages > visiblePages;

  const pageButton = (page: number) => (
    <button
      key={page}
      type="button"
      onClick={() => onPageChange(page)}
      aria-current={currentPage === page ? "page" : undefined}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center border text-sm font-medium transition-colors ${
        currentPage === page
          ? "border-black bg-black text-white"
          : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400"
      }`}
    >
      {page}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-10 w-10 cursor-pointer items-center justify-center border border-neutral-200 text-neutral-800 transition-colors hover:border-neutral-400 disabled:opacity-30"
        aria-label={t("pagination.previous")}
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {leading.map(pageButton)}

      {showEllipsis && (
        <span className="flex h-10 w-10 items-center justify-center text-sm font-medium text-neutral-500">
          ...
        </span>
      )}

      {showLast && pageButton(totalPages)}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 cursor-pointer items-center justify-center border border-neutral-200 text-neutral-800 transition-colors hover:border-neutral-400 disabled:opacity-30"
        aria-label={t("pagination.next")}
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
