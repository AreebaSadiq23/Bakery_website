import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import { ChevronDown, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maison Crumb" },
      { name: "description", content: "Visit us, call us or send a message. We'd love to hear from you." },
      { property: "og:title", content: "Contact — Maison Crumb" },
      { property: "og:description", content: "Get in touch with our bakery team." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(2000),
});

const faqs = [
  { q: "How far in advance should I order a custom cake?", a: "We recommend 1–2 weeks for standard cakes and 4+ weeks for wedding cakes to ensure availability." },
  { q: "Do you offer gluten-free or vegan options?", a: "Yes — we have a rotating gluten-free and vegan selection. Please ask about custom options for special diets." },
  { q: "What's the delivery area?", a: "We deliver across Brooklyn and most of Manhattan. Delivery fee is $15 flat within range." },
  { q: "Can I pick up the same day?", a: "Most menu items are available same-day until 4pm. Custom orders require advance notice." },
];

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <header className="text-center">
            <p className="font-script text-xl text-primary">say hello</p>
            <h1 className="mt-1 font-serif text-5xl font-bold sm:text-6xl">We'd love to hear from you.</h1>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Questions, custom orders or just want to chat about pastries — we're all ears.</p>
          </header>

          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_420px]">
            {/* Map + info */}
            <div className="space-y-6">
              <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-border warm-shadow">
                <iframe
                  title="Maison Crumb location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9942%2C40.7138%2C-73.9742%2C40.7338&layer=mapnik"
                  className="size-full"
                  loading="lazy"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { i: MapPin, t: "Visit", v: "14 Rosewood Lane,\nBrooklyn NY 11201" },
                  { i: Phone, t: "Call", v: "(555) 123-4567" },
                  { i: Mail, t: "Email", v: "hello@maisoncrumb.co" },
                ].map(({ i: Icon, t, v }) => (
                  <div key={t} className="rounded-2xl border border-border bg-card p-5">
                    <div className="grid size-10 place-items-center rounded-full bg-blush text-primary"><Icon className="size-5" /></div>
                    <div className="mt-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t}</div>
                    <div className="mt-1 whitespace-pre-line text-sm font-semibold">{v}</div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl border border-border bg-card p-5">
                <div className="text-[10px] font-bold uppercase tracking-widest text-primary">Business hours</div>
                <ul className="mt-3 grid grid-cols-1 gap-1 text-sm sm:grid-cols-2">
                  {[
                    ["Tuesday – Friday", "7am – 7pm"],
                    ["Saturday", "8am – 8pm"],
                    ["Sunday", "8am – 6pm"],
                    ["Monday", "Closed"],
                  ].map(([d, t]) => (
                    <li key={d} className="flex justify-between border-b border-border/40 py-1.5 last:border-none"><span className="text-muted-foreground">{d}</span><span className="font-semibold">{t}</span></li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-3">
                {[Instagram, Facebook, Twitter, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" aria-label="Social link" className="grid size-11 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Form */}
            <aside className="rounded-3xl border border-border bg-card p-6 warm-shadow sm:p-8">
              <h2 className="font-serif text-2xl font-bold">Send a message</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const r = schema.safeParse(form);
                  if (!r.success) return toast.error("Please fill in all fields with a valid email.");
                  toast.success("Message sent — we'll reply within 24 hours.");
                  setForm({ name: "", email: "", subject: "", message: "" });
                }}
                className="mt-5 space-y-4"
              >
                <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Input label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Input label="Subject" value={form.subject} onChange={(v) => setForm({ ...form, subject: v })} />
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Message</span>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={5} className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-primary focus:outline-none" />
                </label>
                <button type="submit" className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01]">Send message</button>
              </form>
            </aside>
          </div>

          {/* FAQ */}
          <section className="mx-auto mt-20 max-w-3xl">
            <div className="text-center">
              <p className="font-script text-xl text-primary">questions</p>
              <h2 className="mt-1 font-serif text-4xl font-bold">Frequently asked</h2>
            </div>
            <div className="mt-8 space-y-3">
              {faqs.map((f, i) => (
                <div key={i} className="overflow-hidden rounded-2xl border border-border bg-card">
                  <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center justify-between gap-4 p-5 text-left">
                    <span className="font-serif text-lg font-semibold">{f.q}</span>
                    <ChevronDown className={`size-5 shrink-0 text-primary transition-transform ${open === i ? "rotate-180" : ""}`} />
                  </button>
                  {open === i ? <div className="border-t border-border px-5 pb-5 pt-3 text-sm text-muted-foreground">{f.a}</div> : null}
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-primary focus:outline-none" />
    </label>
  );
}
