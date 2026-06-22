import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Cake, Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        {/* Newsletter */}
        <div className="grid items-center gap-8 rounded-3xl bg-card p-8 warm-shadow md:grid-cols-2 md:p-12">
          <div>
            <p className="font-script text-2xl text-primary">stay sweet</p>
            <h3 className="mt-1 font-serif text-3xl font-bold leading-tight md:text-4xl">
              Fresh recipes, straight from our oven.
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Join our newsletter for seasonal specials, baker's notes, and 10% off your first order.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return toast.error("Please enter a valid email.");
              toast.success("You're on the list! Check your inbox.");
              setEmail("");
            }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              maxLength={200}
              className="flex-1 rounded-full border border-border bg-background px-5 py-3 text-sm focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:scale-[1.02]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="grid size-10 place-items-center rounded-full bg-primary text-primary-foreground">
                <Cake className="size-5" />
              </span>
              <span className="font-serif text-xl font-bold">Maison Crumb</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              An artisan bakery crafting fresh breads, pastries and custom cakes with seasonal ingredients since 2019.
            </p>
            <div className="mt-5 flex gap-3">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" className="grid size-9 place-items-center rounded-full border border-border bg-card transition-colors hover:bg-primary hover:text-primary-foreground">
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Shop</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/menu" className="hover:text-primary">Daily Menu</Link></li>
              <li><Link to="/custom-cake" className="hover:text-primary">Custom Cakes</Link></li>
              <li><Link to="/ai-generator" className="hover:text-primary">AI Recipe</Link></li>
              <li><Link to="/order" className="hover:text-primary">Cart & Checkout</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Bakery</div>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
              <li><Link to="/gallery" className="hover:text-primary">Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-primary">Journal</Link></li>
              <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-primary">Visit</div>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-primary" /> 14 Rosewood Lane, Brooklyn NY</li>
              <li className="flex items-start gap-2"><Phone className="mt-0.5 size-4 shrink-0 text-primary" /> (555) 123-4567</li>
              <li className="flex items-start gap-2"><Mail className="mt-0.5 size-4 shrink-0 text-primary" /> hello@maisoncrumb.co</li>
              <li className="mt-2 text-foreground/80">Tue–Sun · 7am – 7pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Maison Crumb. Baked with love.</div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-primary">Privacy</a>
            <a href="#" className="hover:text-primary">Terms</a>
            <a href="#" className="hover:text-primary">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
