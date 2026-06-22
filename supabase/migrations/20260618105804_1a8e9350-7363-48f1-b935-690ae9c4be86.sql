
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price_cents INTEGER NOT NULL,
  image_url TEXT,
  model_label TEXT,
  accent_color TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (is_active = true);

CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  items JSONB NOT NULL,
  total_cents INTEGER NOT NULL,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can place an order" ON public.orders FOR INSERT WITH CHECK (true);

CREATE TABLE public.ai_recipes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  recipe JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.ai_recipes TO anon, authenticated;
GRANT ALL ON public.ai_recipes TO service_role;
ALTER TABLE public.ai_recipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a recipe request" ON public.ai_recipes FOR INSERT WITH CHECK (true);

INSERT INTO public.products (slug, name, description, price_cents, model_label, accent_color, sort_order) VALUES
('cyber-rye', 'Cyber-Rye v2.1', 'Activated charcoal, 72-hour cold ferment, optimized for antioxidant absorption.', 1400, 'SOURDOUGH-GPT-4', 'neural', 1),
('fractal-croissant', 'Fractal Croissant', '128 mathematically precise layers designed for the ultimate acoustic crunch.', 650, 'LAMINATION-LLM', 'orange', 2),
('data-seed-bun', 'Data-Seed Bun', 'Brioche base with a multi-grain crust sequenced for maximum flavor release.', 425, 'KERNEL-NET-7', 'purple', 3),
('quantum-baguette', 'Quantum Baguette', 'Wild-yeast starter trained on 1000 Parisian boulangeries. Crackling crust, open crumb.', 875, 'BAGUETTE-NET-9', 'neural', 4),
('neural-brioche', 'Neural Brioche', 'Cultured butter brioche, hydration tuned per loaf by a real-time humidity model.', 1100, 'CRUMB-MODEL-3', 'orange', 5),
('gradient-galette', 'Gradient Galette', 'Seasonal stone fruit galette with rye crust. Topology optimized for caramelization.', 925, 'PASTRY-DIFFUSION-1', 'purple', 6);
