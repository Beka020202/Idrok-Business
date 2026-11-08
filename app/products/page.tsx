"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/AppProvider";
import { BottomNav } from "@/components/BottomNav";
import { Segmented } from "@/components/Segmented";
import { Button, Card, Pill } from "@/components/ui";
import type { MessageKey } from "@/lib/i18n";
import {
  addProduct,
  loadProducts,
  removeProduct,
  updateStatus,
  validateProduct,
  STATUSES,
  type Marketplace,
  type Product,
  type ProductStatus,
} from "@/lib/products";

const statusKey: Record<ProductStatus, MessageKey> = {
  new: "statusNew",
  researching: "statusResearching",
  needs_review: "statusNeedsReview",
  approved: "statusApproved",
  rejected: "statusRejected",
};
const statusTone: Record<ProductStatus, "blue" | "yellow" | "green" | "red" | "purple"> = {
  new: "blue",
  researching: "purple",
  needs_review: "yellow",
  approved: "green",
  rejected: "red",
};

const fieldCls =
  "h-12 w-full rounded-field border border-line bg-card px-4 text-[15px] outline-none transition-shadow duration-calm focus:border-brand focus:shadow-ring";

export default function ProductsPage() {
  const { t } = useApp();
  const [list, setList] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [sourceUrl, setSourceUrl] = useState("");
  const [notes, setNotes] = useState("");
  const [market, setMarket] = useState<Marketplace>("amazon");
  const [error, setError] = useState<"name" | "url" | null>(null);

  useEffect(() => setList(loadProducts()), []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const err = validateProduct({ name, sourceUrl });
    setError(err);
    if (err) return;
    setList(addProduct({ name, category: category.trim(), sourceUrl: sourceUrl.trim(), notes: notes.trim(), marketplace: market }));
    setName("");
    setCategory("");
    setSourceUrl("");
    setNotes("");
  }

  return (
    <main className="mx-auto max-w-md px-page pb-32 pt-8">
      <header className="mb-5">
        <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">{t("productsTitle")}</h1>
        <p className="text-sm text-muted">{t("productsSubtitle")}</p>
      </header>

      <Card className="mb-5">
        <form onSubmit={submit} className="space-y-3" noValidate>
          <Segmented<Marketplace>
            value={market}
            onChange={setMarket}
            options={[
              { value: "amazon", label: t("marketAmazon") },
              { value: "uzum", label: t("marketUzum") },
            ]}
          />
          <input className={fieldCls} placeholder={t("fieldName")} value={name} maxLength={200} onChange={(e) => setName(e.target.value)} />
          {error === "name" && <p className="text-xs font-semibold text-danger-ink">{t("errName")}</p>}
          <input className={fieldCls} placeholder={t("fieldCategory")} value={category} onChange={(e) => setCategory(e.target.value)} />
          <input className={fieldCls} placeholder={t("fieldUrl")} value={sourceUrl} inputMode="url" onChange={(e) => setSourceUrl(e.target.value)} />
          {error === "url" && <p className="text-xs font-semibold text-danger-ink">{t("errUrl")}</p>}
          <textarea
            className={`${fieldCls} h-24 py-3`}
            placeholder={t("fieldNotes")}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Button type="submit" className="w-full">
            {t("addProduct")}
          </Button>
        </form>
        <p className="mt-3 text-xs text-muted">{t("localModeNote")}</p>
      </Card>

      {list.length === 0 ? (
        <p className="text-center text-sm text-muted">{t("emptyProducts")}</p>
      ) : (
        <div className="space-y-3">
          {list.map((p) => (
            <Card key={p.id} className="!p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-base font-extrabold">{p.name}</div>
                  <div className="text-xs text-muted">
                    {p.marketplace === "amazon" ? t("marketAmazon") : t("marketUzum")}
                    {p.category ? ` · ${p.category}` : ""}
                  </div>
                </div>
                <Pill tone={statusTone[p.status]}>{t(statusKey[p.status])}</Pill>
              </div>
              {p.notes && <p className="mt-2 text-sm text-muted">{p.notes}</p>}
              <div className="mt-3 flex items-center gap-2">
                <select
                  className="h-10 flex-1 rounded-xl border border-line bg-card px-3 text-sm font-semibold"
                  value={p.status}
                  onChange={(e) => setList(updateStatus(p.id, e.target.value as ProductStatus))}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {t(statusKey[s])}
                    </option>
                  ))}
                </select>
                <Button variant="glass" className="!h-10 !rounded-xl !px-3 !text-xs" onClick={() => setList(removeProduct(p.id))}>
                  {t("deleteLabel")}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      <BottomNav />
    </main>
  );
}
