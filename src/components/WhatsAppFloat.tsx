import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const phone = "15551234567"; // demo number
  const msg = encodeURIComponent("Hi Maison Crumb! I'd like to place an order.");
  return (
    <a
      href={`https://wa.me/${phone}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-[#25D366]/40 transition-transform hover:scale-110 active:scale-95"
    >
      <MessageCircle className="size-6" />
      <span className="absolute -top-1 -right-1 flex size-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
        <span className="relative inline-flex size-3 rounded-full bg-[#25D366] ring-2 ring-background" />
      </span>
    </a>
  );
}
