import type React from "react";

interface SearchCapsuleFieldProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick: () => void;
  truncateValue?: boolean;
}

/**
 * A single field in the capsule search bar (icon + label + value, click to
 * open its popover). Used for Location / Check-in / Check-out / Guests.
 */
export default function SearchCapsuleField({
  icon,
  label,
  value,
  onClick,
  truncateValue = false,
}: SearchCapsuleFieldProps) {
  return (
    <div
      onClick={onClick}
      className="flex-1 px-4 py-3 md:py-2 flex items-center gap-3.5 hover:bg-white/[0.03] rounded-2xl md:rounded-full cursor-pointer transition-colors group select-none"
    >
      <div className="p-2.5 rounded-full bg-white/[0.04] group-hover:bg-white/10 transition-colors text-white">
        {icon}
      </div>
      <div className="text-left">
        <h4 className="font-sans font-medium text-xs tracking-wider uppercase text-white/95">
          {label}
        </h4>
        <p
          className={`font-sans font-light text-xs text-white/55 mt-0.5 ${
            truncateValue ? "truncate max-w-[150px]" : ""
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}
