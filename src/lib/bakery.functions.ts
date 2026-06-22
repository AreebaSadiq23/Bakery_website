import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

function serverSupabase() {
  return createClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_PUBLISHABLE_KEY!,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
  );
}

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price_cents: number;
  model_label: string | null;
  accent_color: string | null;
  sort_order: number;
};

export const getProducts = createServerFn({ method: "GET" }).handler(async (): Promise<Product[]> => {
  const supabase = serverSupabase();
  const { data, error } = await supabase
    .from("products")
    .select("id,slug,name,description,price_cents,model_label,accent_color,sort_order")
    .eq("is_active", true)
    .order("sort_order");
  if (error) {
    console.error("getProducts", error);
    return [];
  }
  return data ?? [];
});

const OrderSchema = z.object({
  customer_name: z.string().min(1).max(120),
  customer_email: z.string().email().max(200),
  customer_phone: z.string().max(40).optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
  items: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        price_cents: z.number().int().positive(),
        quantity: z.number().int().min(1).max(50),
      }),
    )
    .min(1)
    .max(50),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => OrderSchema.parse(input))
  .handler(async ({ data }) => {
    const supabase = serverSupabase();
    const total_cents = data.items.reduce((s, i) => s + i.price_cents * i.quantity, 0);
    const orderId = crypto.randomUUID();
    const { error } = await supabase
      .from("orders")
      .insert({
        id: orderId,
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        customer_phone: data.customer_phone ?? null,
        notes: data.notes ?? null,
        items: data.items,
        total_cents,
      });
    if (error) {
      console.error("createOrder", error);
      throw new Error("Could not place order. Please try again.");
    }
    return { id: orderId, total_cents };
  });

const RecipeSchema = z.object({ prompt: z.string().min(3).max(2000) });

export const generateRecipe = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => RecipeSchema.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("AI is not configured.");

    const { generateText } = await import("ai");
    const { createLovableAiGatewayProvider } = await import("@/lib/ai-gateway.server");
    const gateway = createLovableAiGatewayProvider(key);

    const system = `You are NeuralKnead's experimental bakery AI. Given a flavor prompt, design a unique loaf or pastry.
Respond ONLY with valid minified JSON (no markdown, no code fences) matching:
{"name":"string (3-5 words)","tagline":"string (one short sentence)","ingredients":["string",...4-7 items],"technique":"string (1-2 sentences on method)","bake_time_minutes":number,"hydration_pct":number}`;

    let text: string;
    try {
      const res = await generateText({
        model: gateway("google/gemini-3-flash-preview"),
        system,
        prompt: data.prompt,
        temperature: 0.9,
      });
      text = res.text.trim();
    } catch (e: unknown) {
      const msg = (e as Error)?.message ?? "";
      if (msg.includes("429")) throw new Error("Our AI oven is overheating. Try again in a moment.");
      if (msg.includes("402")) throw new Error("AI credits exhausted. Please add credits in workspace settings.");
      console.error("generateRecipe AI", e);
      throw new Error("AI generation failed. Try a different prompt.");
    }

    // Strip code fences if present
    text = text.replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
    let recipe: unknown;
    try {
      recipe = JSON.parse(text);
    } catch {
      throw new Error("Our AI returned an unreadable recipe. Try again.");
    }

    const supabase = serverSupabase();
    await supabase.from("ai_recipes").insert({ prompt: data.prompt, recipe: recipe as never });

    return recipe as {
      name: string;
      tagline: string;
      ingredients: string[];
      technique: string;
      bake_time_minutes: number;
      hydration_pct: number;
    };
  });
