import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts } from "@/lib/bakery.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart, formatPrice } from "@/lib/cart";
import { toast } from "sonner";
import { Search, Star } from "lucide-react";
import productRye from "@/assets/product-rye.jpg";
import productCroissant from "@/assets/product-croissant.jpg";
import productBun from "@/assets/product-bun.jpg";
import macarons from "@/assets/gallery-macarons.jpg";
import cupcakes from "@/assets/gallery-cupcakes.jpg";
import pastries from "@/assets/gallery-pastries.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Maison Crumb" },
      { name: "description", content: "Our full daily menu of artisan breads, pastries, macarons and seasonal specials." },
      { property: "og:title", content: "Menu — Maison Crumb" },
      { property: "og:description", content: "Browse the daily bakery menu." },
    ],
  }),
  component: MenuPage,
});

const images: Record<string, string> = {
  "cyber-rye": productRye,
  "fractal-croissant": productCroissant,
  "data-seed-bun": productBun,
};

const categoryFor = (slug: string) => {
  if (slug.includes("rye") || slug.includes("bread")) return "Breads";
  if (slug.includes("croissant") || slug.includes("pastry")) return "Pastries";
  return "Buns";
};

const CATEGORIES = ["All", "Breads", "Pastries", "Buns", "Cakes", "Macarons"] as const;

function MenuPage() {
  const fetchProducts = useServerFn(getProducts);
  const { data: products = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const { add } = useCart();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");

  const enriched = useMemo(() => products.map((p) => ({ ...p, category: categoryFor(p.slug) })), [products]);
  const filtered = useMemo(() => enriched.filter((p) => {
    const matchQ = q ? (p.name + " " + p.description).toLowerCase().includes(q.toLowerCase()) : true;
    const matchC = cat === "All" ? true : p.category === cat;
    return matchQ && matchC;
  }), [enriched, q, cat]);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="mx-auto max-w-3xl text-center">
          <p className="font-script text-xl text-primary">our menu</p>
          <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">Baked fresh today</h1>
          <p className="mt-4 text-muted-foreground">
            Browse our daily selection. Everything is made from scratch in small batches.
          </p>
        </header>

        <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search croissants, sourdough..."
              className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-secondary"}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="aspect-[4/5] animate-pulse rounded-3xl bg-secondary" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="mt-16 rounded-3xl border border-border bg-card p-12 text-center text-muted-foreground">
            No items match your search.
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <article key={p.id} className="group overflow-hidden rounded-3xl border border-border bg-card hover-lift hover:warm-shadow">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-secondary">
                  {images[p.slug] ? (
                    <img src={images[p.slug]} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="grid size-full place-items-center text-xs uppercase tracking-widest text-muted-foreground">{p.name}</div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary backdrop-blur">
                    {p.category}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-xl font-bold">{p.name}</h3>
                    <span className="text-base font-bold text-primary">{formatPrice(p.price_cents)}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-gold text-xs">
                    {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3 fill-current" />)}
                    <span className="ml-1 text-muted-foreground">(120)</span>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.description}</p>
                  <button
                    onClick={() => {
                      add({ slug: p.slug, name: p.name, price_cents: p.price_cents });
                      toast.success(`${p.name} added to cart`);
                    }}
                    className="mt-4 w-full rounded-full bg-secondary px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Visual category teasers */}
        <section className="mt-20 grid gap-6 md:grid-cols-3">
          {[
            { img: macarons, t: "Macarons", d: "Delicate French shells, classic & seasonal flavors." },
            { img: cupcakes, t: "Cupcakes", d: "Soft sponge, silky buttercream, party-ready." },
            { img: pastries, t: "Pastries", d: "Buttery, flaky, baked at dawn." },
          ].map((c) => (
            <div key={c.t} className="group relative aspect-[4/5] overflow-hidden rounded-3xl">
              <img src={c.img} alt={c.t} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/80 via-cocoa/10 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-cream">
                <h3 className="font-serif text-2xl font-bold">{c.t}</h3>
                <p className="mt-1 text-sm opacity-90">{c.d}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
