import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import { Cake, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import wedding from "@/assets/gallery-wedding.jpg";

export const Route = createFileRoute("/custom-cake")({
  head: () => ({
    meta: [
      { title: "Custom Cakes — Maison Crumb" },
      { name: "description", content: "Design your dream cake — weddings, birthdays, anniversaries. Custom flavors, fillings and hand-painted details." },
      { property: "og:title", content: "Custom Cakes — Maison Crumb" },
      { property: "og:description", content: "Design your dream cake with our pastry team." },
    ],
  }),
  component: CustomCakePage,
});

const sizes = [
  { id: "6", label: '6" round', serves: "8–10", price: 65 },
  { id: "8", label: '8" round', serves: "15–20", price: 95 },
  { id: "10", label: '10" round', serves: "25–30", price: 135 },
  { id: "tier", label: "Tiered cake", serves: "40+", price: 220 },
];
const flavors = ["Vanilla bean", "Chocolate fudge", "Red velvet", "Strawberry", "Lemon poppy", "Matcha", "Salted caramel", "Pistachio"];
const fillings = ["Vanilla buttercream", "Chocolate ganache", "Fresh berries", "Caramel cream", "Cream cheese", "Lemon curd"];

const formSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  date: z.string().min(1),
  message: z.string().max(1000).optional(),
});

function CustomCakePage() {
  const [size, setSize] = useState(sizes[1].id);
  const [flavor, setFlavor] = useState(flavors[0]);
  const [filling, setFilling] = useState(fillings[0]);
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", message: "" });

  const selectedSize = sizes.find((s) => s.id === size)!;
  const estimate = selectedSize.price + (method === "delivery" ? 15 : 0);

  if (done) {
    return (
      <div className="min-h-dvh bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-blush text-primary">
            <CheckCircle2 className="size-8" />
          </div>
          <p className="mt-6 font-script text-2xl text-primary">request received</p>
          <h1 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">We'll be in touch within 24 hours.</h1>
          <p className="mt-4 text-muted-foreground">Our pastry team will email you a quote and design sketch.</p>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10 bakery-gradient opacity-60" />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20">
            <div>
              <p className="font-script text-xl text-primary">made for you</p>
              <h1 className="mt-1 font-serif text-5xl font-bold leading-tight sm:text-6xl">
                Your moment,<br /><span className="font-script text-primary">on a cake.</span>
              </h1>
              <p className="mt-5 text-lg text-muted-foreground max-w-md">
                Weddings, birthdays, anniversaries — designed with you, baked with love.
              </p>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] warm-shadow">
              <img src={wedding} alt="Tiered wedding cake with sugar flowers" width={1024} height={1280} className="size-full object-cover" />
            </div>
          </div>
        </section>

        {/* Designer */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const parsed = formSchema.safeParse(form);
                if (!parsed.success) return toast.error("Please fill in name, valid email, and date.");
                toast.success("Cake request sent!");
                setDone(true);
              }}
              className="space-y-8"
            >
              <Section title="Cake size" subtitle="How many guests?">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {sizes.map((s) => (
                    <button type="button" key={s.id} onClick={() => setSize(s.id)} className={`rounded-2xl border p-4 text-left transition-all ${size === s.id ? "border-primary bg-secondary" : "border-border bg-card hover:border-primary/40"}`}>
                      <div className="font-serif text-lg font-bold">{s.label}</div>
                      <div className="text-xs text-muted-foreground">Serves {s.serves}</div>
                      <div className="mt-2 text-sm font-bold text-primary">${s.price}+</div>
                    </button>
                  ))}
                </div>
              </Section>

              <Section title="Flavor" subtitle="Pick your sponge.">
                <div className="flex flex-wrap gap-2">
                  {flavors.map((f) => (
                    <button type="button" key={f} onClick={() => setFlavor(f)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${flavor === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>{f}</button>
                  ))}
                </div>
              </Section>

              <Section title="Filling" subtitle="Add a little extra love.">
                <div className="flex flex-wrap gap-2">
                  {fillings.map((f) => (
                    <button type="button" key={f} onClick={() => setFilling(f)} className={`rounded-full border px-4 py-2 text-sm transition-colors ${filling === f ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>{f}</button>
                  ))}
                </div>
              </Section>

              <Section title="Design inspiration" subtitle="Upload a sketch or reference image (optional).">
                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-card p-8 text-sm text-muted-foreground hover:border-primary hover:bg-secondary">
                  <Upload className="size-5 text-primary" />
                  {file ? file.name : "Drag & drop an image, or click to browse"}
                  <input type="file" accept="image/*" className="sr-only" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
                </label>
              </Section>

              <Section title="Delivery method">
                <div className="grid grid-cols-2 gap-3">
                  {(["pickup", "delivery"] as const).map((m) => (
                    <button type="button" key={m} onClick={() => setMethod(m)} className={`rounded-2xl border px-4 py-3 text-sm font-bold uppercase tracking-widest ${method === m ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card hover:bg-secondary"}`}>{m}</button>
                  ))}
                </div>
              </Section>

              <Section title="Your details">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                  <Input label="Email *" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                  <Input label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                  <Input label="Event date *" type="date" value={form.date} onChange={(v) => setForm({ ...form, date: v })} />
                </div>
                <label className="mt-3 block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Tell us about your vision</span>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} rows={3} className="w-full rounded-xl border border-border bg-card p-3 text-sm focus:border-primary focus:outline-none" />
                </label>
              </Section>

              <button type="submit" className="w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform hover:scale-[1.01]">
                Request quote
              </button>
            </form>

            {/* Summary */}
            <aside className="sticky top-24 h-fit space-y-4 rounded-3xl border border-border bg-card p-6 warm-shadow">
              <div className="flex items-center gap-2 text-primary"><Cake className="size-5" /><span className="font-script text-xl">your cake</span></div>
              <Row k="Size" v={selectedSize.label} />
              <Row k="Serves" v={selectedSize.serves} />
              <Row k="Flavor" v={flavor} />
              <Row k="Filling" v={filling} />
              <Row k="Method" v={method} />
              <div className="border-t border-border pt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Estimate</span>
                  <span className="font-serif text-3xl font-bold text-primary">${estimate}+</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Final price confirmed after design consultation.</p>
              </div>
              <div className="rounded-2xl bg-secondary p-4 text-sm">
                <Sparkles className="size-4 text-primary" />
                <p className="mt-2"><span className="font-semibold">Free</span> consultation with our pastry chef included.</p>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <h2 className="font-serif text-2xl font-bold">{title}</h2>
      {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
      <div className="mt-4">{children}</div>
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
function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span className="font-semibold capitalize">{v}</span>
    </div>
  );
}
