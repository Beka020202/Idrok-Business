"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "./AppProvider";
import type { MessageKey } from "@/lib/i18n";

// Only pages that exist get a real link; others stay disabled until we build them.
const items: { key: MessageKey; icon: string; href?: string }[] = [
  { key: "navHome", icon: "◉", href: "/" },
  { key: "navProducts", icon: "▦", href: "/products" },
  { key: "navApprovals", icon: "✓" },
  { key: "navLearn", icon: "▶" },
  { key: "navSettings", icon: "⚙" },
];

// Floating glass bar; the active tab gets a soft blue pill behind it.
export function BottomNav() {
  const { t } = useApp();
  const path = usePathname();
  return (
    <nav className="glass fixed inset-x-4 bottom-4 z-20 mx-auto flex max-w-md items-center justify-between rounded-[26px] p-2 shadow-card">
      {items.map((it) => {
        const active = it.href === path;
        const cls = `press flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-semibold transition-colors duration-calm ${
          active ? "bg-brand-soft text-brand" : "text-muted"
        }`;
        const inner = (
          <>
            <span className="text-base leading-none">{it.icon}</span>
            {t(it.key)}
          </>
        );
        return it.href ? (
          <Link key={it.key} href={it.href} className={cls}>
            {inner}
          </Link>
        ) : (
          <span key={it.key} className={`${cls} opacity-40`} aria-disabled="true">
            {inner}
          </span>
        );
      })}
    </nav>
  );
}
