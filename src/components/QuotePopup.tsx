import { useEffect, useState, type FormEvent } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { business, fleet, whatsappUrl } from "@/config/business";

const seenKey = "nanda-quote-popup-seen";

export function QuotePopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try { if (sessionStorage.getItem(seenKey)) return; } catch { /* Storage may be unavailable. */ }
    const timer = window.setTimeout(() => {
      try { sessionStorage.setItem(seenKey, "1"); } catch { /* Still show once for this page. */ }
      setOpen(true);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello ${business.name}, I would like a journey quote.\n\nName: ${String(data.get("name") ?? "").trim()}\nPhone: ${String(data.get("phone") ?? "").trim()}\nVehicle category: ${data.get("vehicle")}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-navy/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 motion-reduce:animate-none" />
      <DialogPrimitive.Content onOpenAutoFocus={event => event.preventDefault()} className="fixed left-1/2 top-1/2 z-[61] max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-sm border border-border border-t-2 border-t-gold bg-card p-6 text-card-foreground shadow-lg data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 motion-reduce:animate-none sm:p-8">
        <DialogPrimitive.Close asChild><Button variant="ghost" size="icon" className="absolute right-2 top-2 size-11" aria-label="Close quote popup" title="Close"><X /></Button></DialogPrimitive.Close>
        <p className="eyebrow pr-8">{business.shortName} Tours & Travels</p>
        <DialogPrimitive.Title className="mt-4 font-display text-2xl font-normal leading-9">Get a Quote</DialogPrimitive.Title>
        <DialogPrimitive.Description className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"><MessageCircle className="size-4 text-gold" />Book instantly on WhatsApp</DialogPrimitive.Description>
        <form onSubmit={submit} className="mt-7 grid gap-5">
          <label className="grid gap-2 text-xs font-semibold text-foreground">Your name<Input required name="name" autoComplete="name" maxLength={100} placeholder="Your name" className="h-12 rounded-sm bg-background text-base md:text-base" /></label>
          <label className="grid gap-2 text-xs font-semibold text-foreground">Phone number<Input required name="phone" type="tel" autoComplete="tel" inputMode="tel" pattern="[+0-9 ()-]{7,20}" title="Enter a valid phone number" maxLength={20} placeholder="Phone number" className="h-12 rounded-sm bg-background text-base md:text-base" /></label>
          <label className="grid gap-2 text-xs font-semibold text-foreground">Vehicle category<select required name="vehicle" defaultValue="" className="h-12 w-full min-w-0 rounded-sm border border-input bg-background px-3 font-sans text-base font-normal text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"><option value="" disabled>Select car</option>{fleet.map(vehicle => <option key={vehicle}>{vehicle}</option>)}</select></label>
          <Button type="submit" variant="travel" className="mt-1 h-13 text-xs font-semibold uppercase">Get a quote <ArrowRight /></Button>
        </form>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  </DialogPrimitive.Root>;
}