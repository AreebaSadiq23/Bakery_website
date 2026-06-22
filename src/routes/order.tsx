import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { createOrder } from "@/lib/bakery.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useCart, formatPrice } from "@/lib/cart";
import { toast } from "sonner";
import { CheckCircle2, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export const Route = createFileRoute("/order")({
  head: () => ({
    meta: [
      { title: "Cart & Checkout — Maison Crumb" },
      { name: "description", content: "Review your order and check out for same-day pickup or next-day delivery." },
    ],
  }),
  component: OrderPage,
});

function OrderPage() {
  const { items, setQty, remove, total, clear } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "", method: "pickup" as "pickup" | "delivery" });
  const [confirmed, setConfirmed] = useState<{ id: string; total_cents: number } | null>(null);
  const submit = useServerFn(createOrder);

  const mutation = useMutation({
    mutationFn: async () =>
      submit({
        data: {
          customer_name: form.name.trim(),
          customer_email: form.email.trim(),
          customer_phone: form.phone.trim() || null,
          notes: `[${form.method}] ${form.notes.trim()}` || null,
          items: items.map((i) => ({ slug: i.slug, name: i.name, price_cents: i.price_cents, quantity: i.quantity })),
        },
      }),
    onSuccess: (res) => { setConfirmed(res); clear(); toast.success("Order placed!"); },
    onError: (e: Error) => toast.error(e.message || "Could not place order."),
  });

  if (confirmed) {
    return (
      <div className="min-h-dvh bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-blush text-primary">
            <CheckCircle2 className="size-8" />
          </div>
          <p className="mt-6 font-script text-2xl text-primary">thank you</p>
          <h1 className="mt-1 font-serif text-4xl font-bold sm:text-5xl">Your order is in the oven.</h1>
          <p className="mt-4 text-muted-foreground">
            Confirmation sent to your email.<br />
            Order <span className="font-mono">#{confirmed.id.slice(0, 8)}</span> · Total{" "}
            <span className="font-semibold text-foreground">{formatPrice(confirmed.total_cents)}</span>
          </p>
          <Link to="/menu" className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform">
            Keep browsing
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <header>
          <p className="font-script text-xl text-primary">your basket</p>
          <h1 className="mt-1 font-serif text-5xl font-bold">Checkout</h1>
        </header>

        {items.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-border bg-card p-12 text-center">
            <div className="mx-auto grid size-14 place-items-center rounded-full bg-secondary text-primary">
              <ShoppingBag className="size-6" />
            </div>
            <p className="mt-4 text-muted-foreground">Your basket is empty.</p>
            <Link to="/menu" className="mt-6 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:scale-105 transition-transform">
              Browse the menu
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
            <section className="space-y-3">
              {items.map((i) => (
                <div key={i.slug} className="grid grid-cols-[1fr_auto] items-center gap-4 rounded-2xl border border-border bg-card p-4 sm:grid-cols-[1fr_auto_auto]">
                  <div className="min-w-0">
                    <h3 className="font-serif text-lg font-bold">{i.name}</h3>
                    <div className="text-sm text-primary font-semibold">{formatPrice(i.price_cents)}</div>
                  </div>
                  <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1">
                    <div className="flex items-center gap-1 rounded-full border border-border bg-background">
                      <button onClick={() => setQty(i.slug, i.quantity - 1)} className="grid size-9 place-items-center hover:bg-secondary rounded-l-full" aria-label="Decrease"><Minus className="size-3.5" /></button>
                      <span className="w-7 text-center text-sm font-semibold">{i.quantity}</span>
                      <button onClick={() => setQty(i.slug, i.quantity + 1)} className="grid size-9 place-items-center hover:bg-secondary rounded-r-full" aria-label="Increase"><Plus className="size-3.5" /></button>
                    </div>
                    <button onClick={() => remove(i.slug)} className="grid size-9 place-items-center rounded-full hover:bg-destructive/10" aria-label="Remove">
                      <Trash2 className="size-4 text-destructive" />
                    </button>
                  </div>
                </div>
              ))}
            </section>

            <aside className="rounded-3xl border border-border bg-card p-6 warm-shadow">
              <h2 className="font-serif text-2xl font-bold">Your details</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!form.name || !form.email) return toast.error("Name and email are required.");
                  mutation.mutate();
                }}
                className="mt-4 space-y-4"
              >
                <div className="grid grid-cols-2 gap-2">
                  {(["pickup", "delivery"] as const).map((m) => (
                    <button
                      type="button"
                      key={m}
                      onClick={() => setForm({ ...form, method: m })}
                      className={`rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-widest ${form.method === m ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
                <Field label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
                <Field label="Email" type="email" required value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                <Field label="Phone" type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Notes</span>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    rows={2}
                    className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-primary focus:outline-none"
                  />
                </label>

                <div className="flex items-center justify-between border-t border-border pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Total</span>
                  <span className="font-serif text-3xl font-bold text-primary">{formatPrice(total)}</span>
                </div>

                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {mutation.isPending ? "Placing order..." : "Place order"}
                </button>
              </form>
            </aside>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}

function Field({ label, value, onChange, type = "text", required }: { label: string; value: string; onChange: (v: string) => void; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{label}{required ? " *" : ""}</span>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-border bg-background p-3 text-sm focus:border-primary focus:outline-none"
      />
    </label>
  );
}
