// Product storage. Step 2 runs in LOCAL DEMO MODE (browser storage only),
// so the feature works before Supabase login exists. Supabase (see
// supabase/migrations/0001_init.sql) replaces this in the next step.

export type ProductStatus = "new" | "researching" | "needs_review" | "approved" | "rejected";
export type Marketplace = "amazon" | "uzum";

export type Product = {
  id: string;
  name: string;
  marketplace: Marketplace;
  category: string;
  sourceUrl: string;
  notes: string;
  status: ProductStatus;
  createdAt: string;
};

export const STATUSES: ProductStatus[] = ["new", "researching", "needs_review", "approved", "rejected"];

const KEY = "idrok-products";

export function loadProducts(): Product[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Product[]) : [];
  } catch {
    return [];
  }
}

function save(list: Product[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable: list stays in memory only */
  }
}

// Validate everything that comes from the form before storing it.
export function validateProduct(input: { name: string; sourceUrl: string }): "name" | "url" | null {
  const name = input.name.trim();
  if (name.length < 1 || name.length > 200) return "name";
  if (input.sourceUrl.trim()) {
    try {
      const u = new URL(input.sourceUrl.trim());
      if (u.protocol !== "https:" && u.protocol !== "http:") return "url";
    } catch {
      return "url";
    }
  }
  return null;
}

export function addProduct(input: Omit<Product, "id" | "status" | "createdAt">): Product[] {
  const product: Product = {
    ...input,
    name: input.name.trim(),
    id: crypto.randomUUID(),
    status: "new",
    createdAt: new Date().toISOString(),
  };
  const next = [product, ...loadProducts()];
  save(next);
  return next;
}

export function updateStatus(id: string, status: ProductStatus): Product[] {
  const next = loadProducts().map((p) => (p.id === id ? { ...p, status } : p));
  save(next);
  return next;
}

export function removeProduct(id: string): Product[] {
  const next = loadProducts().filter((p) => p.id !== id);
  save(next);
  return next;
}
