"use client";

import { useState } from "react";
import { useApp } from "@/components/AppProvider";
import { BottomNav } from "@/components/BottomNav";
import { Segmented } from "@/components/Segmented";
import { Button, Card, Locked, Pill, ProgressBar } from "@/components/ui";

type Market = "overview" | "amazon" | "uzum";

// DEMO DATA ONLY: these numbers are examples, not real research or real profit.
const DEMO = { researched: 12, review: 3, opportunities: 2, profitNow: 18, profitTarget: 100 };

export default function Dashboard() {
  const { t, locale, setLocale, theme, toggleTheme } = useApp();
  const [market, setMarket] = useState<Market>("overview");

  return (
    <main className="mx-auto max-w-md px-page pb-32 pt-8">
      <header className="mb-5 flex items-start justify-between">
        <div>
          <div className="font-mono text-xs font-semibold tracking-wide text-faint">{t("appName")}</div>
          <h1 className="mt-1 text-[28px] font-extrabold leading-tight tracking-tight">{t("dashboardTitle")}</h1>
          <p className="text-sm text-muted">{t("dashboardSubtitle")}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" className="!h-10 !rounded-xl !px-3 !text-xs" onClick={() => setLocale(locale === "uz" ? "ru" : "uz")}>
            {locale === "uz" ? t("langRu") : t("langUz")}
          </Button>
          <Button variant="glass" className="!h-10 !rounded-xl !px-3 !text-xs" onClick={toggleTheme}>
            {theme === "light" ? t("themeDark") : t("themeLight")}
          </Button>
        </div>
      </header>

      <div className="mb-4">
        <Segmented<Market>
          value={market}
          onChange={setMarket}
          options={[
            { value: "overview", label: t("marketOverview") },
            { value: "amazon", label: t("marketAmazon") },
            { value: "uzum", label: t("marketUzum") },
          ]}
        />
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Pill tone="yellow">{t("demoBadge")}</Pill>
        <span className="text-xs text-muted">{t("demoNote")}</span>
      </div>

      <div className="space-y-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-muted">{t("levelLabel")} 0</div>
              <div className="text-xl font-extrabold">{t("level0Name")}</div>
            </div>
            <Pill tone="blue">{t("level0Rule")}</Pill>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="text-sm font-semibold">{t("progressTitle")}</span>
            <span className="font-mono text-sm font-semibold">
              ${DEMO.profitNow} / ${DEMO.profitTarget}
            </span>
          </div>
          <div className="mt-2">
            <ProgressBar value={(DEMO.profitNow / DEMO.profitTarget) * 100} />
          </div>
          <p className="mt-2 text-xs text-muted">{t("progressHint")}</p>
        </Card>

        <Locked title={t("lockedTitle")} hint={t("lockedHint")}>
          <Card>
            <div className="text-xl font-extrabold">{t("lockedTitle")}</div>
            <div className="mt-2 h-3 w-3/4 rounded bg-line" />
            <div className="mt-2 h-3 w-1/2 rounded bg-line" />
            <div className="mt-4 h-2.5 w-full rounded-full bg-line" />
          </Card>
        </Locked>

        <div className="grid grid-cols-3 gap-3">
          {[
            { label: t("statResearched"), value: DEMO.researched },
            { label: t("statReview"), value: DEMO.review },
            { label: t("statOpportunities"), value: DEMO.opportunities },
          ].map((s) => (
            <Card key={s.label} className="!p-4">
              <div className="font-mono text-2xl font-extrabold">{s.value}</div>
              <div className="mt-1 text-[11px] leading-snug text-muted">{s.label}</div>
            </Card>
          ))}
        </div>

        <Card className="!bg-warning-soft">
          <div className="text-sm font-extrabold text-warning-ink">{t("safetyTitle")}</div>
          <p className="mt-1 text-sm text-warning-ink">{t("safetyBody")}</p>
        </Card>
      </div>

      <BottomNav />
    </main>
  );
}
