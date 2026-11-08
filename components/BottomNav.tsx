"use client";

import { useState } from "react";
import { useApp } from "./AppProvider";
import type { MessageKey } from "@/lib/i18n";

const items: { key: MessageKey; icon: string }[] = [
  { key: "navHome", icon: "◉" },
  { key: "navProducts", icon: "▦" },
  { key: "navApprovals", icon: "✓" },
  { key: "navLearn", icon: "▶" },
  { key: "navSettings", icon: "⚙" },
];

// Floating glass bar; the active tab gets a soft blue pill behind it.
export function BottomNav() {
  const { t } = useApp();
  const [active, setActive] = useState<MessageKey>("navHome");
  return (
    <nav className="glass fixed inset-x-4 bottom-4 z-20 mx-auto flex max-w-md items-center justify-between rounded-[26px] p-2 shadow-card">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => setActive(it.key)}
          className={`press flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-semibold transition-colors duration-calm ${
            active === it.key ? "bg-brand-soft text-brand" : "text-muted"
          }`}
        >
          <span className="text-base leading-none">{it.icon}</span>
          {t(it.key)}
        </button>
      ))}
    </nav>
  );
}
