import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Search, ArrowRight, Clock } from "lucide-react";
import macarons from "@/assets/gallery-macarons.jpg";
import pastries from "@/assets/gallery-pastries.jpg";
import baker from "@/assets/about-baker.jpg";
import cupcakes from "@/assets/gallery-cupcakes.jpg";
import wedding from "@/assets/gallery-wedding.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Journal — Maison Crumb" },
      { name: "description", content: "Recipes, baker's notes, and stories from the Maison Crumb kitchen." },
      { property: "og:title", content: "Journal — Maison Crumb" },
      { property: "og:description", content: "Recipes & stories from our bakery." },
    ],
  }),
  component: BlogPage,
});

type Post = { slug: string; title: string; excerpt: string; cat: string; date: string; read: string; img: string };
const posts: Post[] = [
  { slug: "perfect-croissant", title: "The science of the perfect croissant", excerpt: "Why slow lamination and cold butter make the difference between flaky and dense.", cat: "Technique", date: "Jun 02, 2026", read: "6 min", img: pastries },
  { slug: "macaron-myth", title: "The macaron myth — it's not as hard as you think", excerpt: "Our pastry chef Theo breaks down macaron-making into 5 simple, repeatable steps.", cat: "Recipes", date: "May 21, 2026", read: "8 min", img: macarons },
  { slug: "sourdough-starter", title: "Naming your sourdough starter", excerpt: "Yes, it's a thing. And yes, it might help you bake better bread.", cat: "Stories", date: "May 10, 2026", read: "3 min", img: baker },
  { slug: "summer-flavors", title: "Summer 2026: our seasonal menu", excerpt: "Apricot, fig, lavender — what we're putting in everything this season.", cat: "Seasonal", date: "Apr 28, 2026", read: "4 min", img: cupcakes },
  { slug: "wedding-cake-tips", title: "5 things to know before ordering your wedding cake", excerpt: "Timing, tastings, transport — a planner's guide from our cake studio.", cat: "Guides", date: "Apr 12, 2026", read: "7 min", img: wedding },
];
const CATS = ["All", "Technique", "Recipes", "Stories", "Seasonal", "Guides"] as const;

function BlogPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => posts.filter((p) => (cat === "All" || p.cat === cat) && (q ? (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()) : true)),
    [cat, q],
  );
  const featured = posts[0];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <p className="font-script text-xl text-primary">the journal</p>
          <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">Notes from the kitchen</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Recipes, baker's notes, and stories from the people behind the loaves.</p>
        </header>

        {/* Featured */}
        <article className="mt-12 grid items-center gap-8 overflow-hidden rounded-[2rem] border border-border bg-card p-6 warm-shadow md:grid-cols-2 md:p-10">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img src={featured.img} alt={featured.title} loading="lazy" className="size-full object-cover" />
          </div>
          <div>
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">Featured · {featured.cat}</span>
            <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">{featured.title}</h2>
            <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
              <span>{featured.date}</span><span className="flex items-center gap-1"><Clock className="size-3" />{featured.read}</span>
            </div>
            <a href="#" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">Read article <ArrowRight className="size-4" /></a>
          </div>
        </article>

        {/* Filters */}
        <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="w-full rounded-full border border-border bg-card py-3 pl-11 pr-4 text-sm focus:border-primary focus:outline-none" />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATS.map((c) => (
              <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-secondary"}`}>{c}</button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(1).map((p) => (
            <article key={p.slug} className="group overflow-hidden rounded-3xl border border-border bg-card hover-lift hover:warm-shadow">
              <div className="aspect-[5/3] overflow-hidden bg-secondary">
                <img src={p.img} alt={p.title} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{p.cat}</span>
                <h3 className="mt-2 font-serif text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{p.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.date}</span><span className="flex items-center gap-1"><Clock className="size-3" />{p.read}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
