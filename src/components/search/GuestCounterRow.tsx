import { Minus, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

interface GuestCounterRowProps {
  label: string;
  sublabel: string;
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

/**
 * A single "label + sublabel + minus/count/plus" row used in the guest
 * picker popover (Adults / Children / Infants).
 */
export default function GuestCounterRow({
  label,
  sublabel,
  value,
  onDecrement,
  onIncrement,
}: GuestCounterRowProps) {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-between">
      <div className="text-left">
        <h5 className="text-sm font-semibold text-white">{label}</h5>
        <p className="text-[10px] text-white/50">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrement}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white active:bg-white/10"
          aria-label={t("common.aria.decreaseLabel", { label })}
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="text-sm font-medium w-4 text-center text-white">
          {value}
        </span>
        <button
          onClick={onIncrement}
          className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 text-white active:bg-white/10"
          aria-label={t("common.aria.increaseLabel", { label })}
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
