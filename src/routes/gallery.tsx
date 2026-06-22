import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { X } from "lucide-react";
import hero from "@/assets/hero-cake.jpg";
import macarons from "@/assets/gallery-macarons.jpg";
import cupcakes from "@/assets/gallery-cupcakes.jpg";
import pastries from "@/assets/gallery-pastries.jpg";
import wedding from "@/assets/gallery-wedding.jpg";
import baker from "@/assets/about-baker.jpg";
import rye from "@/assets/product-rye.jpg";
import croissant from "@/assets/product-croissant.jpg";
import bun from "@/assets/product-bun.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Maison Crumb" },
      { name: "description", content: "A visual journey through our breads, pastries and custom cakes." },
      { property: "og:title", content: "Gallery — Maison Crumb" },
      { property: "og:description", content: "Cakes, breads and pastries from our kitchen." },
    ],
  }),
  component: GalleryPage,
});

type Item = { src: string; cat: string; tall?: boolean; alt: string };
const items: Item[] = [
  { src: hero, cat: "Cakes", tall: true, alt: "Pink rose cake" },
  { src: macarons, cat: "Macarons", alt: "Pastel macarons" },
  { src: pastries, cat: "Pastries", alt: "Croissants with berries" },
  { src: wedding, cat: "Cakes", tall: true, alt: "Tiered wedding cake" },
  { src: cupcakes, cat: "Cupcakes", tall: true, alt: "Pink cupcakes" },
  { src: croissant, cat: "Pastries", alt: "Fresh croissants" },
  { src: baker, cat: "Bakery", alt: "Baker shaping dough" },
  { src: rye, cat: "Breads", alt: "Rye loaf" },
  { src: bun, cat: "Breads", alt: "Brioche bun" },
];

const CATS = ["All", "Cakes", "Cupcakes", "Macarons", "Pastries", "Breads", "Bakery"] as const;

function GalleryPage() {
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const [lightbox, setLightbox] = useState<Item | null>(null);
  const filtered = items.filter((i) => cat === "All" || i.cat === cat);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <p className="font-script text-xl text-primary">our gallery</p>
          <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">A taste, in pictures.</h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Browse moments from our kitchen, our customers' celebrations, and the bakes we're proudest of.</p>
        </header>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${cat === c ? "bg-primary text-primary-foreground" : "bg-card border border-border hover:bg-secondary"}`}>
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4 [&>*]:break-inside-avoid">
          {filtered.map((it, i) => (
            <button key={i} onClick={() => setLightbox(it)} className="group block w-full overflow-hidden rounded-2xl bg-secondary text-left">
              <img src={it.src} alt={it.alt} loading="lazy" className={`w-full ${it.tall ? "aspect-[3/4]" : "aspect-[4/3]"} object-cover transition-transform duration-700 group-hover:scale-110`} />
            </button>
          ))}
        </div>
      </main>

      {lightbox ? (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center bg-cocoa/80 p-4 backdrop-blur-sm animate-fade-up" onClick={() => setLightbox(null)}>
          <button aria-label="Close" className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-card text-foreground"><X className="size-5" /></button>
          <img src={lightbox.src} alt={lightbox.alt} className="max-h-[85vh] max-w-full rounded-2xl object-contain" onClick={(e) => e.stopPropagation()} />
        </div>
      ) : null}

      <SiteFooter />
    </div>
  );
}
