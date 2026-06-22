import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getProducts } from "@/lib/bakery.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart, formatPrice } from "@/lib/cart";
import { toast } from "sonner";
import { ArrowRight, Award, Cake, Clock, Heart, Leaf, Quote, Sparkles, Star, Truck } from "lucide-react";
import heroCake from "@/assets/hero-cake.jpg";
import galleryMacarons from "@/assets/gallery-macarons.jpg";
import galleryCupcakes from "@/assets/gallery-cupcakes.jpg";
import galleryPastries from "@/assets/gallery-pastries.jpg";
import galleryWedding from "@/assets/gallery-wedding.jpg";
import productRye from "@/assets/product-rye.jpg";
import productCroissant from "@/assets/product-croissant.jpg";
import productBun from "@/assets/product-bun.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Crumb — Artisan Bakery & Custom Cakes" },
      { name: "description", content: "Premium artisan bakery. Fresh breads, pastries, macarons and custom cakes baked daily. Order online for pickup or delivery." },
      { property: "og:title", content: "Maison Crumb — Artisan Bakery" },
      { property: "og:description", content: "Fresh artisan breads, pastries & custom cakes baked daily." },
    ],
  }),
  component: Home,
});

const fallbackImages: Record<string, string> = {
  "cyber-rye": productRye,
  "fractal-croissant": productCroissant,
  "data-seed-bun": productBun,
};

function Home() {
  const fetchProducts = useServerFn(getProducts);
  const { data: products = [] } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const featured = products.slice(0, 3);
  const { add } = useCart();

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bakery-gradient opacity-70" />
        <div className="pointer-events-none absolute -left-40 top-10 -z-10 size-[28rem] rounded-full bg-peach/40 blur-3xl animate-float-slow" />
        <div className="pointer-events-none absolute -right-40 bottom-0 -z-10 size-[32rem] rounded-full bg-blush/50 blur-3xl animate-float-slow" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.035]"
          style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }}
        />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 md:grid-cols-12 md:gap-12 md:pb-20 md:pt-16 lg:pt-24">
          {/* Left copy */}
          <div className="space-y-7 animate-fade-up md:col-span-6 lg:col-span-7">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card/70 px-4 py-1.5 text-xs font-semibold text-primary backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Freshly baked · open today
            </span>

            <h1 className="font-serif font-bold leading-[0.95] tracking-tight text-[clamp(2.75rem,7vw,5.75rem)]">
              Sweet moments,
              <br />
              baked with{" "}
              <span className="relative inline-block font-script text-primary">
                love
                <svg className="absolute -bottom-3 left-0 w-full" viewBox="0 0 200 12" fill="none" preserveAspectRatio="none" aria-hidden>
                  <path d="M2 8 Q 50 2, 100 6 T 198 5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/60" />
                </svg>
              </span>
              .
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Hand‑crafted breads, pastries and custom cakes — made from heirloom recipes,
              organic flour and the finest seasonal ingredients.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/menu"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:scale-[1.03] hover:shadow-primary/40"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                Shop the menu
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/custom-cake"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-7 py-4 text-sm font-semibold backdrop-blur transition-colors hover:bg-secondary"
              >
                <Cake className="size-4 text-primary" /> Design a custom cake
              </Link>
            </div>

            {/* Stat row */}
            <div className="grid max-w-lg grid-cols-3 gap-4 border-t border-border/60 pt-6">
              <div>
                <div className="flex items-baseline gap-1 font-serif text-2xl font-bold sm:text-3xl">
                  4.9<Star className="size-4 fill-gold text-gold" />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">800+ reviews</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold sm:text-3xl">120<span className="text-primary">+</span></div>
                <div className="mt-1 text-xs text-muted-foreground">Daily bakes</div>
              </div>
              <div>
                <div className="font-serif text-2xl font-bold sm:text-3xl">12<span className="text-primary">y</span></div>
                <div className="mt-1 text-xs text-muted-foreground">Family craft</div>
              </div>
            </div>
          </div>

          {/* Right collage */}
          <div className="relative md:col-span-6 lg:col-span-5">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2.25rem] warm-shadow animate-float-slow">
              <img src={heroCake} alt="Pink rose buttercream cake with strawberries" width={1280} height={1280} className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-cocoa/30 via-transparent to-transparent" />
            </div>

            {/* Secondary image */}
            <div className="absolute -left-4 bottom-10 hidden aspect-square w-36 overflow-hidden rounded-3xl border-4 border-background warm-shadow sm:block lg:w-44">
              <img src={galleryMacarons} alt="Pastel macarons" loading="lazy" className="size-full object-cover" />
            </div>

            {/* Award card */}
            <div className="absolute -bottom-4 right-2 rounded-2xl border border-border bg-card/90 p-3 warm-shadow backdrop-blur sm:-right-4 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-full bg-blush text-primary"><Award className="size-5" /></div>
                <div>
                  <div className="font-serif text-sm font-bold leading-tight sm:text-base">Award winning</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">Best bakery · 2024</div>
                </div>
              </div>
            </div>

            {/* Floating fresh badge */}
            <div className="absolute -right-2 top-6 grid size-20 animate-float-slow place-items-center rounded-full bg-primary text-center text-primary-foreground warm-shadow sm:size-24">
              <div>
                <div className="font-script text-xl leading-none sm:text-2xl">fresh</div>
                <div className="mt-1 text-[9px] font-bold uppercase tracking-widest opacity-90">today</div>
              </div>
            </div>

            {/* Sparkle chip */}
            <div className="absolute left-2 top-4 hidden items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold backdrop-blur warm-shadow sm:inline-flex">
              <Sparkles className="size-3.5 text-primary" /> Hand‑decorated
            </div>
          </div>
        </div>

        {/* Marquee strip */}
        <div className="relative border-y border-border/60 bg-card/40 backdrop-blur">
          <div className="flex gap-12 overflow-hidden whitespace-nowrap py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="flex shrink-0 animate-[marquee_30s_linear_infinite] gap-12 px-6 font-script text-2xl text-primary/80">
              {Array.from({ length: 2 }).map((_, k) => (
                <div key={k} className="flex shrink-0 items-center gap-12">
                  {["Sourdough", "Macarons", "Croissants", "Wedding cakes", "Brunch boxes", "Seasonal tarts"].map((w) => (
                    <span key={w} className="flex items-center gap-12">
                      {w}
                      <span className="text-primary/40">✦</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-script text-xl text-primary">our favourites</p>
            <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Today's best sellers</h2>
          </div>
          <Link to="/menu" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            View all <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {featured.map((p, i) => (
            <article key={p.id} className="group overflow-hidden rounded-3xl border border-border bg-card hover-lift hover:warm-shadow" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="aspect-[4/5] w-full overflow-hidden bg-secondary">
                {fallbackImages[p.slug] ? (
                  <img src={fallbackImages[p.slug]} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <div className="grid size-full place-items-center text-xs uppercase tracking-widest text-muted-foreground">{p.name}</div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-serif text-xl font-bold">{p.name}</h3>
                  <span className="text-base font-bold text-primary">{formatPrice(p.price_cents)}</span>
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
      </section>

      {/* Why choose us */}
      <section className="bg-secondary/40 px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-script text-xl text-primary">why maison crumb</p>
            <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Crafted with care, every loaf</h2>
            <p className="mt-4 text-muted-foreground">Small batches, slow ferments, and recipes passed down through generations.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, t: "Organic ingredients", d: "Locally sourced flour, butter and seasonal fruit." },
              { icon: Clock, t: "Slow fermentation", d: "24-48hr fermented dough for deeper flavor." },
              { icon: Heart, t: "Made by hand", d: "No shortcuts. Every detail shaped by our bakers." },
              { icon: Truck, t: "Fresh delivery", d: "Same-day delivery across the city." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-6 text-center hover-lift hover:warm-shadow">
                <div className="mx-auto grid size-14 place-items-center rounded-full bg-blush text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="mt-4 font-serif text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special offer */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="relative overflow-hidden rounded-[2.5rem] bakery-gradient p-8 sm:p-12 md:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-peach/40 blur-3xl" />
          <div className="relative grid items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-card/80 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary backdrop-blur">Limited time</span>
              <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-cocoa sm:text-5xl">
                Weekend brunch box — <span className="font-script text-primary">20% off</span>
              </h2>
              <p className="mt-4 max-w-md text-cocoa/80">
                A curated selection of 6 pastries, 2 baguettes and our signature jam. Perfect for sharing.
              </p>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream hover:scale-105 transition-transform"
              >
                Claim offer <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl warm-shadow">
              <img src={galleryPastries} alt="Brunch pastries with berries" loading="lazy" className="size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-script text-xl text-primary">kind words</p>
          <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Loved by our community</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "Amelia R.", r: "The strawberry cake was beyond perfect. Light, fluffy, and the buttercream tasted like clouds.", a: "AR" },
            { n: "Marcus T.", r: "We've made Maison Crumb our Sunday morning ritual. The almond croissants are unreal.", a: "MT" },
            { n: "Priya K.", r: "Ordered a custom cake for our anniversary — they nailed every tiny detail. Beautiful and delicious.", a: "PK" },
          ].map((t) => (
            <figure key={t.n} className="rounded-3xl border border-border bg-card p-6 hover-lift hover:warm-shadow">
              <Quote className="size-7 text-primary/40" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground/90">"{t.r}"</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <div className="grid size-10 place-items-center rounded-full bg-blush font-serif text-sm font-bold text-primary">{t.a}</div>
                <div>
                  <div className="text-sm font-semibold">{t.n}</div>
                  <div className="flex text-gold">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="size-3.5 fill-current" />)}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Instagram gallery */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-script text-xl text-primary">@maisoncrumb</p>
            <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">From our kitchen</h2>
          </div>
          <Link to="/gallery" className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all">
            Full gallery <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
          {[galleryMacarons, galleryCupcakes, galleryPastries, galleryWedding].map((src, i) => (
            <a key={i} href="#" className="group relative aspect-square overflow-hidden rounded-2xl bg-secondary">
              <img src={src} alt="" loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-cocoa/0 transition-colors group-hover:bg-cocoa/30" />
            </a>
          ))}
        </div>
      </section>

      {/* AI CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="rounded-[2rem] border border-border bg-card p-8 text-center warm-shadow sm:p-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
            <Sparkles className="size-3.5" /> Powered by AI
          </span>
          <h2 className="mt-5 font-serif text-3xl font-bold sm:text-4xl">
            Dream up your own pastry
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Describe a craving and our recipe AI will design a one-of-a-kind bake just for you.
          </p>
          <Link to="/ai-generator" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            Try the AI generator <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
