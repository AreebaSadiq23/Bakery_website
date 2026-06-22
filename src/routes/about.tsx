import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Award, Heart, Leaf, Users } from "lucide-react";
import baker from "@/assets/about-baker.jpg";
import pastries from "@/assets/gallery-pastries.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Maison Crumb" },
      { name: "description", content: "How Maison Crumb began — a love letter to artisan bread, made by hand in small batches since 2019." },
      { property: "og:title", content: "Our Story — Maison Crumb" },
      { property: "og:description", content: "A neighborhood bakery built on craft and care." },
    ],
  }),
  component: AboutPage,
});

const timeline = [
  { y: "2019", t: "A home oven beginning", d: "Founder Elena starts baking sourdough loaves from her Brooklyn kitchen for friends and neighbors." },
  { y: "2020", t: "Pop-up Sundays", d: "A weekly farmers' market stall draws lines around the block and a loyal community." },
  { y: "2022", t: "The bakery opens", d: "We open our first storefront on Rosewood Lane, pairing breads with French pastries." },
  { y: "2024", t: "Custom cake studio", d: "We launch a custom cake studio designing wedding & celebration cakes for over 200 events a year." },
];

const team = [
  { n: "Elena Rossi", r: "Head Baker & Founder", a: "ER" },
  { n: "Theo Park", r: "Pastry Chef", a: "TP" },
  { n: "Mira Khalil", r: "Cake Designer", a: "MK" },
  { n: "Jules Moreau", r: "Bread Lead", a: "JM" },
];

function AboutPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24">
          <div>
            <p className="font-script text-xl text-primary">our story</p>
            <h1 className="mt-1 font-serif text-5xl font-bold leading-tight sm:text-6xl">A small bakery with a big heart.</h1>
            <p className="mt-5 text-lg text-muted-foreground">
              Maison Crumb began as a home oven hobby and grew into a neighborhood ritual. We believe in slow ferments, real butter, and the kind of bread that turns mornings into memories.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-4">
              {[{n:"500+",l:"cakes / month"},{n:"6yr",l:"baking"},{n:"4.9★",l:"rating"}].map((s) => (
                <div key={s.l} className="rounded-2xl border border-border bg-card p-4 text-center">
                  <div className="font-serif text-2xl font-bold text-primary">{s.n}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-widest text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] warm-shadow">
            <img src={baker} alt="Baker shaping dough" width={1280} height={960} className="size-full object-cover" />
          </div>
        </section>

        {/* Values */}
        <section className="bg-secondary/40 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <p className="font-script text-xl text-primary">what we believe</p>
              <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Our values</h2>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { i: Leaf, t: "Real ingredients", d: "Organic flour, French butter, seasonal fruit." },
                { i: Heart, t: "Made by hand", d: "No machines for shaping. Just human touch." },
                { i: Award, t: "Award-winning", d: "Best neighborhood bakery, 2023 & 2024." },
                { i: Users, t: "Community first", d: "Daily bread donations to local shelters." },
              ].map(({ i: Icon, t, d }) => (
                <div key={t} className="rounded-2xl bg-card p-6 text-center">
                  <div className="mx-auto grid size-14 place-items-center rounded-full bg-blush text-primary"><Icon className="size-6" /></div>
                  <h3 className="mt-4 font-serif text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
          <div className="text-center">
            <p className="font-script text-xl text-primary">our journey</p>
            <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">From home oven to bakery</h2>
          </div>
          <ol className="relative mt-14 space-y-10 border-l-2 border-dashed border-primary/30 pl-8">
            {timeline.map((s) => (
              <li key={s.y} className="relative">
                <span className="absolute -left-[2.4rem] grid size-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground ring-4 ring-background">
                  {s.y.slice(2)}
                </span>
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="font-script text-2xl text-primary">{s.y}</div>
                  <h3 className="mt-1 font-serif text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Team */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="text-center">
            <p className="font-script text-xl text-primary">our bakers</p>
            <h2 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Meet the team</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((m) => (
              <div key={m.n} className="overflow-hidden rounded-3xl border border-border bg-card text-center hover-lift hover:warm-shadow">
                <div className="grid aspect-square place-items-center bg-blush">
                  <span className="font-serif text-6xl font-bold text-primary">{m.a}</span>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold">{m.n}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{m.r}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
          <div className="relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] bakery-gradient p-10 md:grid-cols-2 md:p-16">
            <div>
              <h2 className="font-serif text-4xl font-bold leading-tight text-cocoa sm:text-5xl">Come say hello.</h2>
              <p className="mt-3 max-w-md text-cocoa/80">Visit us on Rosewood Lane — coffee's on the house when you come in for a loaf.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream hover:scale-105 transition-transform">Get directions</Link>
                <Link to="/menu" className="rounded-full border border-cocoa/30 bg-card/70 px-6 py-3 text-sm font-semibold text-cocoa backdrop-blur hover:bg-card">Order online</Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-3xl warm-shadow">
              <img src={pastries} alt="Bakery pastries" loading="lazy" className="size-full object-cover" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
