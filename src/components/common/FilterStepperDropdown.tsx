import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface FilterStepperDropdownProps {
  /** Label when nothing is selected, e.g. "Bathrooms" */
  label: string;
  /** Prefix when a value is selected, e.g. "Baths" -> "Baths: 3" */
  selectedPrefix: string;
  /** Heading inside the popover, e.g. "Bathrooms (Max 6)" */
  popoverTitle: string;
  value: number | null;
  onChange: (value: number | null) => void;
  max: number;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  /** Width of the popover panel */
  panelWidth?: string;
}

/**
 * A filter control: trigger button + popover containing a −/+ stepper and a
 * grid of quick-pick pills. Used for Beds / Bathrooms / Guests, which were
 * three near-identical ~90-line blocks in the original.
 */
export default function FilterStepperDropdown({
  label,
  selectedPrefix,
  popoverTitle,
  value,
  onChange,
  max,
  isOpen,
  onToggle,
  onClose,
  panelWidth = "w-64",
}: FilterStepperDropdownProps) {
  const step = (delta: number) => {
    const next = (value === null ? 0 : value) + delta;
    if (next < 1) return onChange(null);
    onChange(Math.min(next, max));
  };

  const isActive = isOpen || value !== null;

  return (
    <div className="relative min-w-[110px]">
      <button
        onClick={onToggle}
        className={`flex w-full cursor-pointer items-center justify-between rounded-md border bg-white px-4 py-3 text-sm font-normal transition-colors select-none ${
          isActive
            ? "border-neutral-900 text-neutral-900"
            : "border-neutral-300 text-neutral-800"
        }`}
      >
        <span>{value ? `${selectedPrefix}: ${value}` : label}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-neutral-600" />
        ) : (
          <ChevronDown className="h-4 w-4 text-neutral-600" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className={`absolute top-full left-0 z-30 mt-2 ${panelWidth} rounded-lg border border-neutral-200 bg-white p-4 shadow-xl`}
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                {popoverTitle}
              </span>
              {value && (
                <button
                  onClick={() => onChange(null)}
                  className="text-[11px] text-neutral-500 underline hover:text-neutral-900"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Stepper */}
            <div className="mb-3 flex items-center justify-between rounded-md border border-neutral-200 bg-neutral-50 p-2">
              <button
                onClick={() => step(-1)}
                disabled={value === null || value <= 1}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-100 disabled:opacity-40"
                aria-label={`Decrease ${label}`}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="text-sm font-semibold text-neutral-900">
                {value ?? "Any"}
              </span>
              <button
                onClick={() => step(1)}
                disabled={value !== null && value >= max}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded border border-neutral-300 bg-white text-neutral-800 transition-colors hover:bg-neutral-100 disabled:opacity-40"
                aria-label={`Increase ${label}`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Quick-pick pills */}
            <div className="grid grid-cols-6 gap-1">
              {Array.from({ length: max }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => {
                    onChange(num);
                    onClose();
                  }}
                  className={`cursor-pointer rounded border py-1.5 text-xs font-medium transition-colors ${
                    value === num
                      ? "border-neutral-900 bg-neutral-900 text-white"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
