import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { generateRecipe } from "@/lib/bakery.functions";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const searchSchema = z.object({ q: z.string().optional() });

export const Route = createFileRoute("/ai-generator")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "AI Recipe Generator — Maison Crumb" },
      { name: "description", content: "Describe a flavor or memory and our AI pastry chef will design a one-of-a-kind recipe just for you." },
      { property: "og:title", content: "AI Recipe Generator — Maison Crumb" },
      { property: "og:description", content: "Custom AI-designed bakery recipes." },
    ],
  }),
  component: AiGeneratorPage,
});

type Recipe = {
  name: string;
  tagline: string;
  ingredients: string[];
  technique: string;
  bake_time_minutes: number;
  hydration_pct: number;
};

function AiGeneratorPage() {
  const { q = "" } = Route.useSearch();
  const [prompt, setPrompt] = useState(q);
  const callGenerate = useServerFn(generateRecipe);

  const mutation = useMutation<Recipe, Error, string>({
    mutationFn: async (p) => (await callGenerate({ data: { prompt: p } })) as Recipe,
    onError: (e) => toast.error(e.message || "Generation failed"),
  });

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <header className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-4 py-1.5 text-xs font-semibold text-primary">
            <Sparkles className="size-3.5" /> AI Pastry Chef · Live
          </span>
          <h1 className="mt-4 font-serif text-5xl font-bold leading-tight sm:text-6xl">
            Dream a recipe<br /><span className="font-script text-primary">we'll bake it.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Describe a flavor, a season, a memory. Our AI will design a complete recipe — ingredients, technique, hydration & bake time included.
          </p>
        </header>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (prompt.trim().length < 3) return toast.error("Tell us a little more.");
            mutation.mutate(prompt.trim());
          }}
          className="mt-10 rounded-3xl border border-border bg-card p-5 warm-shadow sm:p-6"
        >
          <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-primary">Your craving</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            placeholder="e.g. A morning in Tokyo with hints of miso and toasted sesame..."
            className="w-full resize-none rounded-2xl border border-border bg-background p-4 text-base placeholder:text-muted-foreground/50 focus:border-primary focus:outline-none"
            maxLength={2000}
          />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground">{prompt.length} / 2000</span>
            <button
              type="submit"
              disabled={mutation.isPending}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform disabled:opacity-50"
            >
              {mutation.isPending ? "Baking your idea..." : (<>Synthesize recipe <Sparkles className="size-4" /></>)}
            </button>
          </div>
        </form>

        {mutation.data ? <RecipeCard recipe={mutation.data} /> : null}

        {!mutation.data && !mutation.isPending ? (
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              "A summer thunderstorm with rye and black pepper",
              "Childhood Sunday morning — vanilla, brown butter, soft crumb",
              "Smoky highland whiskey with charred oak crust",
            ].map((s) => (
              <button
                key={s}
                onClick={() => setPrompt(s)}
                className="rounded-2xl border border-border bg-card p-4 text-left text-sm transition-colors hover:border-primary/40 hover:bg-secondary"
              >
                <div className="mb-1 text-[10px] font-bold uppercase tracking-widest text-primary">try</div>
                {s}
              </button>
            ))}
          </div>
        ) : null}
      </main>
      <SiteFooter />
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="mt-8 rounded-3xl border border-primary/30 bg-card p-6 warm-shadow sm:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] font-bold uppercase tracking-widest text-primary">recipe · generated</div>
          <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">{recipe.name}</h2>
          <p className="mt-2 font-script text-xl text-muted-foreground">{recipe.tagline}</p>
        </div>
        <div className="flex gap-3">
          <Stat label="Hydration" value={`${recipe.hydration_pct}%`} />
          <Stat label="Bake" value={`${recipe.bake_time_minutes}m`} />
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Ingredients</div>
          <ul className="space-y-2">
            {recipe.ingredients.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />{i}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Technique</div>
          <p className="text-sm leading-relaxed">{recipe.technique}</p>
        </div>
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-secondary px-4 py-2 text-center">
      <div className="font-serif text-lg font-bold text-primary">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}
