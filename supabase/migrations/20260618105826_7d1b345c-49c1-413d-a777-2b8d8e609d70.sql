
DROP POLICY "Anyone can place an order" ON public.orders;
CREATE POLICY "Anyone can place a valid order" ON public.orders FOR INSERT
WITH CHECK (
  length(customer_name) BETWEEN 1 AND 120
  AND length(customer_email) BETWEEN 3 AND 200
  AND customer_email LIKE '%_@_%.__%'
  AND total_cents > 0
  AND total_cents < 1000000
  AND jsonb_array_length(items) > 0
  AND jsonb_array_length(items) < 100
);

DROP POLICY "Anyone can submit a recipe request" ON public.ai_recipes;
CREATE POLICY "Anyone can submit a valid recipe" ON public.ai_recipes FOR INSERT
WITH CHECK (length(prompt) BETWEEN 3 AND 2000);
