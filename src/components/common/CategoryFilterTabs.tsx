import {
  Compass,
  HandPlatter,
  Heart,
  House,
  Landmark,
  LayoutGrid,
  Navigation,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

const CATEGORIES_FILTER = [
  { id: "All", label: "All", icon: LayoutGrid },
  { id: "History & Culture", label: "History & Culture", icon: Landmark },
  {
    id: "Culinary Adventures",
    label: "Culinary Adventures",
    icon: HandPlatter,
  },
  { id: "Outdoor Tours", label: "Outdoor Tours", icon: Compass },
  { id: "Closed to the Public", label: "Closed to the Public", icon: Users },
  { id: "Family", label: "Family", icon: Heart },
  { id: "At Home", label: "At Home", icon: House },
  { id: "One Day City Escape", label: "One Day City Escape", icon: Navigation },
] as const;

interface CategoryFilterTabsProps {
  selected: string;
  onSelect: (categoryId: string) => void;
  /**
   * Unique id for the sliding underline. Two instances rendered on the same
   * page must use different values or motion will animate between them.
   */
  layoutId: string;
}

/**
 * Icon + label category filter row with an animated active underline.
 * Shared by AllExperiences and ExperienceCollectionList.
 */
export default function CategoryFilterTabs({
  selected,
  onSelect,
  layoutId,
}: CategoryFilterTabsProps) {
  return (
    <div className="scrollbar-none flex w-full flex-wrap items-center justify-center gap-x-3 gap-y-4 overflow-x-auto py-1 sm:gap-x-5 lg:flex-nowrap lg:justify-end lg:gap-x-3 xl:gap-x-5">
      {CATEGORIES_FILTER.map((cat) => {
        const IconComp = cat.icon;
        const isActive = selected === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className="group relative flex shrink-0 cursor-pointer flex-col items-center gap-1.5 pb-2 select-none focus:outline-none"
          >
            <div
              className={`p-1 transition-all duration-300 ${
                isActive
                  ? "scale-110 text-neutral-900"
                  : "text-neutral-400 group-hover:scale-105 group-hover:text-neutral-900"
              }`}
            >
              <IconComp className="h-4 w-4 stroke-[1.5] sm:h-5 sm:w-5" />
            </div>
            <span
              className={`font-sans text-[10px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors duration-300 xl:text-[11px] xl:tracking-[0.12em] ${
                isActive
                  ? "font-semibold text-neutral-900"
                  : "text-neutral-400 group-hover:text-neutral-900"
              }`}
            >
              {cat.label}
            </span>
            {isActive && (
              <motion.div
                layoutId={layoutId}
                className="absolute right-0 bottom-0 left-0 h-[1.5px] bg-neutral-900"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
