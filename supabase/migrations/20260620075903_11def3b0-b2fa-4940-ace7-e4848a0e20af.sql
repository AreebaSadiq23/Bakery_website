GRANT INSERT ON public.orders TO anon, authenticated;
GRANT ALL ON public.orders TO service_role;

GRANT SELECT ON public.products TO anon, authenticated;
GRANT ALL ON public.products TO service_role;

GRANT INSERT ON public.ai_recipes TO anon, authenticated;
GRANT ALL ON public.ai_recipes TO service_role;