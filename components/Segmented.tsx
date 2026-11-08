"use client";

// iOS segmented control: grey track, white pill on the selected option.
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-[14px] bg-line p-1">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`press flex-1 rounded-[11px] py-2 text-sm font-bold transition-all duration-calm ${
            value === o.value ? "bg-card text-ink shadow-card" : "text-muted"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
