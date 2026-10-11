import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import {
  ArrowRight, BriefcaseBusiness, CalendarDays, Check, ChevronRight,
  Clock3, Headphones, MapPin, Menu, MessageCircle, Phone, Route as RouteIcon,
  ShieldCheck, Sparkles, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandMark } from "@/components/BrandMark";
import { QuotePopup } from "@/components/QuotePopup";
import { business, destinations, fleet, navItems, reviews, services, trustStats, whatsappUrl } from "@/config/business";
import heroImage from "@/assets/nanda-hero.jpg";
import fleetImage from "@/assets/nanda-fleet.jpg";
import outstationImage from "@/assets/nanda-outstation.jpg";
import cityImage from "@/assets/nanda-hyderabad.jpg";
import ownerImage from "@/assets/nanda-owner.jpg.asset.json";
import airportImage from "@/assets/nanda-service-airport.jpg.asset.json";
import familyImage from "@/assets/nanda-service-family.jpg.asset.json";
import excursionImage from "@/assets/nanda-service-excursion.jpg.asset.json";
import onewayImage from "@/assets/nanda-service-oneway.jpg.asset.json";
import roundImage from "@/assets/nanda-service-round.jpg.asset.json";

const seoTitle = "Nanda Tours & Travels | Premium Cab & Travel Services in Hyderabad";
const seoDescription = "Nanda Tours & Travels offers reliable cab, airport transfer, Hyderabad local, corporate, family and outstation travel services from Hyderabad, Telangana.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: seoTitle }, { name: "description", content: seoDescription },
      { property: "og:title", content: seoTitle }, { property: "og:description", content: seoDescription },
      { property: "og:type", content: "website" }, { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@graph": [
          { "@type": ["LocalBusiness", "TravelAgency", "TaxiService"], name: business.name, telephone: business.phoneDisplay, address: { "@type": "PostalAddress", streetAddress: "29-159/3, New Vidya Nagar, Bank Colony, Malkajgiri", addressLocality: "Secunderabad", addressRegion: "Telangana", postalCode: "500056", addressCountry: "IN" }, openingHours: "Mo-Su 00:00-23:59", aggregateRating: { "@type": "AggregateRating", ratingValue: business.rating, reviewCount: business.reviewCount }, areaServed: ["Hyderabad", "Secunderabad", "Malkajgiri", "Telangana", "Andhra Pradesh"] },
        ],
      }),
    }],
  }),
  component: Index,
});

const imageMap = { city: cityImage, hero: heroImage, road: outstationImage, fleet: fleetImage, airport: airportImage.url, family: familyImage.url, excursion: excursionImage.url, oneway: onewayImage.url, round: roundImage.url };
const whatsAppGeneral = whatsappUrl("Hello Nanda Tours & Travels, I would like to enquire about a journey.");

function ActionLink({ href, children, light = false, className = "" }: { href: string; children: React.ReactNode; light?: boolean; className?: string }) {
  return <Button asChild variant={light ? "travelOutline" : "travel"} className={`h-auto min-h-12 whitespace-normal px-5 py-3 text-xs font-semibold uppercase ${className}`}><a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{children}</a></Button>;
}

function SectionHeading({ eyebrow, title, text, invert = false }: { eyebrow: string; title: string; text?: string; invert?: boolean }) {
  return <div className="max-w-3xl"><p className="eyebrow">{eyebrow}</p><h2 className={`mt-4 font-display text-[1.65rem] font-normal leading-[1.3] sm:text-3xl lg:text-[2.65rem] ${invert ? "text-ivory" : "text-foreground"}`}>{title}</h2>{text && <p className={`mt-5 max-w-2xl text-sm leading-7 sm:text-base ${invert ? "text-ivory/65" : "text-muted-foreground"}`}>{text}</p>}</div>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState("#home");
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(`#${entry.target.id}`); });
    }, { rootMargin: "-80px 0px -55% 0px", threshold: 0 });
    document.querySelectorAll("section[id]").forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggleRef.current?.focus(); }
      if (event.key === "Tab") {
        const items = [toggleRef.current, ...Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? [])].filter((item): item is HTMLButtonElement | HTMLAnchorElement => item !== null);
        const first = items[0]; const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", keyboard);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", keyboard); };
  }, [open]);
  return <header className="site-header fixed inset-x-0 top-0 z-50 border-b border-ivory/10 bg-navy/95 backdrop-blur-lg">
    <div className="section-shell flex h-18 items-center justify-between gap-4 lg:h-20">
      <a href="#home" aria-label="Nanda Tours & Travels home"><BrandMark /></a>
      <nav className="hidden items-center gap-4 2xl:flex" aria-label="Main navigation">{navItems.map(([label, href]) => <a key={href} href={href} aria-current={active === href ? "location" : undefined} className={`inline-flex min-h-11 items-center border-b text-xs font-medium transition-colors ${active === href ? "border-gold text-ivory" : "border-transparent text-ivory/75 hover:text-gold"}`}>{label}</a>)}</nav>
      <div className="ml-auto hidden items-center gap-2 md:flex">
        <Button asChild variant="travelOutline" size="icon" className="size-11 border-transparent"><a href={business.phoneHref} aria-label="Call now" title="Call now"><Phone /></a></Button>
        <Button asChild variant="travelOutline" size="icon" className="size-11 border-transparent"><a href={whatsAppGeneral} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="WhatsApp"><MessageCircle /></a></Button>
        <ActionLink href="#booking">Book a ride</ActionLink>
      </div>
      <Button ref={toggleRef} type="button" variant="travelOutline" size="icon" onClick={() => setOpen(!open)} className="size-11 shrink-0 border-transparent 2xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu">{open ? <X /> : <Menu />}</Button>
    </div>
    {open && <><div className="fixed inset-x-0 bottom-0 top-18 h-screen bg-navy/65 2xl:hidden" onClick={() => {setOpen(false); toggleRef.current?.focus();}} aria-hidden="true"/><nav ref={menuRef} id="mobile-menu" className="mobile-menu relative border-t border-ivory/10 bg-navy px-6 pb-6 pt-2 2xl:hidden" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} aria-current={active === href ? "location" : undefined} className="flex min-h-12 items-center justify-between border-b border-ivory/10 text-sm text-ivory/85">{label}<ChevronRight className="size-4 text-gold" /></a>)}</nav></>}
  </header>;
}

function BookingForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = `Hello Nanda Tours & Travels, I would like a journey quote.\n\nPickup: ${data.get("pickup")}\nDrop: ${data.get("drop")}\nTravel date: ${data.get("date")}\nPickup time: ${data.get("time")}\nTrip type: ${data.get("tripType")}\nPassengers: ${data.get("passengers")}`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }
  const inputClass = "journey-input min-h-12 min-w-0 w-full border-b border-border bg-transparent px-0 text-base font-normal normal-case text-foreground outline-none placeholder:text-muted-foreground focus:border-gold";
  return <form onSubmit={submit} className="booking-fields grid gap-x-6 gap-y-5 md:grid-cols-3 xl:grid-cols-6">
    <label className="min-w-0 text-[11px] font-semibold uppercase text-muted-foreground">Pickup location<input required name="pickup" placeholder="Enter pickup" className={inputClass} /></label>
    <label className="min-w-0 text-[11px] font-semibold uppercase text-muted-foreground">Drop location<input required name="drop" placeholder="Enter destination" className={inputClass} /></label>
    <label className="min-w-0 text-[11px] font-semibold uppercase text-muted-foreground">Travel date<input required name="date" type="date" className={inputClass} /></label>
    <label className="min-w-0 text-[11px] font-semibold uppercase text-muted-foreground">Pickup time<input required name="time" type="time" className={inputClass} /></label>
    <label className="min-w-0 text-[11px] font-semibold uppercase text-muted-foreground">Trip type<select required name="tripType" className={inputClass} defaultValue=""><option value="" disabled>Select type</option>{["One Way", "Round Trip", "Local Package", "Airport Transfer", "Outstation"].map(option => <option key={option}>{option}</option>)}</select></label>
    <label className="min-w-0 text-[11px] font-semibold uppercase text-muted-foreground">Passengers<input required min="1" name="passengers" type="number" placeholder="Number" className={inputClass} /></label>
    <Button type="submit" className="h-14 rounded-none text-xs font-semibold uppercase md:col-span-3 xl:col-span-6">Get a quote <ArrowRight /></Button>
  </form>;
}

function Index() {
  const why = [[ShieldCheck,"Experienced Drivers"],[Sparkles,"Clean & Comfortable Vehicles"],[BriefcaseBusiness,"Professional Service"],[Check,"Reasonable Pricing"],[Clock3,"24/7 Availability"],[MapPin,"Reliable Pickup & Drop"],[RouteIcon,"Flexible Travel Options"],[Headphones,"Customer-Focused Service"]] as const;
  useEffect(() => {
    window.history.scrollRestoration = "manual";
    if (window.location.hash) window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const resetEntry = (event: PageTransitionEvent) => { if (event.persisted) window.scrollTo({ top: 0, left: 0, behavior: "instant" }); };
    const resetHash = () => {
      if (!window.location.hash) return;
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };
    window.addEventListener("pageshow", resetEntry);
    window.addEventListener("hashchange", resetHash);
    return () => { window.removeEventListener("pageshow", resetEntry); window.removeEventListener("hashchange", resetHash); };
  }, []);
  function navigateSection(event: MouseEvent<HTMLElement>) {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
    if (!link) return;
    const target = document.getElementById(link.getAttribute("href")?.slice(1) ?? "");
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  return <main className="site-main pb-20 md:pb-0" onClick={navigateSection}>
    <QuotePopup />
    <Header />
    <section id="home" className="home-hero relative overflow-hidden bg-navy pt-18 lg:pt-20">
      <img src={heroImage} alt="Premium chauffeur vehicle at an illuminated Hyderabad palace" width={1920} height={1088} fetchPriority="high" decoding="async" className="absolute inset-0 size-full object-cover object-[68%_center] motion-safe:lg:animate-[drift_14s_ease-in-out_infinite_alternate]" />
      <div className="hero-shade absolute inset-0" />
      <div className="hero-inner section-shell relative flex items-center py-10 lg:py-20">
        <div className="hero-copy max-w-2xl reveal">
          <p className="eyebrow">Premium travel & chauffeur services</p>
          <h1 className="hero-title mt-5 font-display font-normal text-ivory">YOUR JOURNEY.<br/><span className="text-gold">OUR COMMITMENT.</span></h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-ivory/90 sm:text-lg sm:leading-7">Premium Travel & Chauffeur Services Across Hyderabad and Beyond.</p>
          <p className="mt-3 max-w-xl text-xs leading-6 text-ivory/80 sm:mt-4 sm:text-sm sm:leading-7">Reliable vehicles, experienced drivers and professional service for local travel, airport transfers, family journeys, corporate travel and outstation trips.</p>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row"><ActionLink href="#booking">Book your journey <ArrowRight className="size-4" /></ActionLink><ActionLink href={whatsAppGeneral} light><MessageCircle className="size-4" /> WhatsApp us</ActionLink></div>
          <div className="mt-6 flex items-center gap-4 text-ivory sm:mt-8"><span className="text-gold">★★★★★</span><span className="h-8 w-px bg-ivory/20"/><span className="text-xs leading-5"><strong className="block">4.9 Rated on Google</strong><span className="text-ivory/55">{business.reviewCount}+ Customer Reviews</span></span></div>
        </div>
      </div>
    </section>

    <section id="booking" className="relative z-10 -mt-6 pb-12 lg:-mt-8"><div className="booking-panel section-shell border-t-2 border-gold bg-card p-6 sm:p-9"><div className="mb-7 flex flex-col justify-between gap-2 sm:flex-row sm:items-end"><div><p className="eyebrow">Personalised travel</p><h2 className="mt-2 font-display text-xl leading-8 sm:text-2xl">Plan Your Journey</h2></div><a href={whatsAppGeneral} target="_blank" rel="noreferrer" className="text-xs font-bold text-navy underline decoration-gold decoration-2 underline-offset-4">Book instantly on WhatsApp</a></div><BookingForm /></div></section>

    <section aria-label="Trust indicators" className="border-y border-border bg-background py-9"><div className="trust-grid section-shell grid grid-cols-2 gap-y-6 md:grid-cols-4">{trustStats.map((stat)=><div key={stat.label} className="px-4 py-4 text-center"><strong className="font-sans text-3xl font-medium tabular-nums text-navy sm:text-4xl">{stat.value}</strong><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{stat.label}</span>{stat.note && <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-gold">{stat.note}</span>}</div>)}</div></section>

    <section id="services" className="py-24 lg:py-32"><div className="section-shell"><SectionHeading eyebrow="Our services" title="TRAVEL SERVICES, REDEFINED." text="From short city rides to long-distance journeys, experience dependable travel with professional service."/><div className="services-grid mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{services.map((service,index)=><article key={service.title} className="group border border-border bg-card"><div className="relative aspect-[4/3] overflow-hidden"><img src={imageMap[service.image]} alt="" width={640} height={480} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute left-4 top-4 grid size-9 place-items-center bg-navy text-xs font-bold text-gold">{String(index+1).padStart(2,"0")}</span></div><div className="p-5"><h3 className="font-display text-lg font-normal leading-7">{service.title}</h3><p className="mt-3 min-h-20 text-sm leading-6 text-muted-foreground">{service.text}</p><a href={`${whatsAppGeneral}%0AService%3A%20${encodeURIComponent(service.title)}`} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-navy">Explore service <ArrowRight className="size-3.5 text-gold"/></a></div></article>)}</div></div></section>

    <section id="fleet" className="bg-navy py-24 lg:py-32"><div className="section-shell"><div className="grid items-end gap-10 lg:grid-cols-[0.8fr_1.2fr]"><SectionHeading eyebrow="Our fleet" title="TRAVEL IN COMFORT." text="Choose the right vehicle category for your journey. Contact us for current vehicle details and availability." invert/><div className="overflow-hidden"><img src={fleetImage} alt="Premium vehicle categories for chauffeur travel" width={1600} height={1000} loading="lazy" className="aspect-[16/8] w-full object-cover"/></div></div><div className="mt-10 grid border-y border-ivory/15 sm:grid-cols-2 lg:grid-cols-4">{fleet.map((vehicle,index)=><article key={vehicle} className="border-b border-ivory/15 p-6 sm:border-r"><span className="text-xs text-gold">0{index+1}</span><h3 className="mt-8 font-display text-2xl font-normal text-ivory">{vehicle}</h3><a href={whatsappUrl(`Hello Nanda Tours & Travels, I would like to enquire about the ${vehicle} category.`)} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-ivory/65 hover:text-gold">Enquire now <ArrowRight className="size-4"/></a></article>)}</div></div></section>

    <section id="outstation" className="py-24 lg:py-32"><div className="section-shell grid gap-12 lg:grid-cols-2 lg:items-center"><div className="relative overflow-hidden"><img src={outstationImage} alt="Comfortable outstation journey through South Indian hills" width={1600} height={1000} loading="lazy" className="aspect-[5/4] size-full object-cover"/><div className="absolute bottom-0 left-0 bg-navy p-5 text-ivory"><span className="eyebrow">Telangana & Andhra Pradesh</span></div></div><div><SectionHeading eyebrow="Outstation travel" title="GO BEYOND THE CITY." text="Discover Telangana and Andhra Pradesh with comfortable vehicles and experienced drivers."/><div className="mt-8 grid grid-cols-2 gap-px bg-border">{destinations.map(destination=><a key={destination} href={whatsappUrl(`Hello Nanda Tours & Travels, I would like a quote for an outstation trip to ${destination}.`)} target="_blank" rel="noreferrer" className="flex min-h-14 items-center justify-between bg-background px-4 text-sm font-semibold hover:bg-secondary">{destination}<ChevronRight className="size-4 text-gold"/></a>)}</div><ActionLink href={whatsappUrl("Hello Nanda Tours & Travels, I would like to plan an outstation trip.")} className="mt-8">Plan an outstation trip</ActionLink></div></div></section>

    <section id="hyderabad" className="relative min-h-[680px] overflow-hidden bg-navy"><img src={cityImage} alt="Premium local travel near Charminar in Hyderabad" width={1600} height={1000} loading="lazy" className="absolute inset-0 size-full object-cover"/><div className="local-shade absolute inset-0"/><div className="section-shell relative grid min-h-[680px] items-center py-20 lg:grid-cols-2"><div className="max-w-xl py-7 sm:py-12"><SectionHeading eyebrow="Hyderabad local" title="HYDERABAD, YOUR WAY." text="Dependable local transportation for the journeys that shape your day." invert/><div className="mt-8 grid gap-3 sm:grid-cols-2">{["Business travel","Shopping","Family travel","Events","Airport transfers","Full-day local packages","City sightseeing"].map(item=><span key={item} className="flex items-center gap-3 text-sm text-ivory/75"><Check className="size-4 text-gold"/>{item}</span>)}</div><ActionLink href={whatsappUrl("Hello Nanda Tours & Travels, I would like to enquire about a Hyderabad local package.")} className="mt-9">Local package enquiry</ActionLink></div></div></section>

    <section className="bg-navy-soft py-24 lg:py-32"><div className="section-shell"><SectionHeading eyebrow="The Nanda standard" title="WHY TRAVEL WITH NANDA?" invert/><div className="mt-14 grid gap-px bg-ivory/15 sm:grid-cols-2 lg:grid-cols-4">{why.map(([Icon,label])=><div key={label} className="bg-navy-soft p-7 text-ivory"><Icon className="size-7 stroke-1 text-gold"/><h3 className="mt-8 font-display text-base font-normal leading-6">{label}</h3></div>)}</div></div></section>

    <section id="about" className="py-24 lg:py-32"><div className="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center"><div className="owner-portrait relative mx-auto max-w-sm border border-border p-3"><img src={ownerImage.url} alt="Owner of Nanda Tours & Travels" width={768} height={1024} loading="lazy" decoding="async" className="w-full object-cover"/><div className="absolute bottom-3 inset-x-3 bg-navy px-4 py-4 text-ivory"><strong className="font-display text-xl">Nanda Tours & Travels</strong><span className="block text-[10px] uppercase tracking-[0.12em] text-gold">Hyderabad • Telangana & Andhra Pradesh</span></div></div><div><SectionHeading eyebrow="A personal commitment" title="PERSONAL SERVICE. PROFESSIONAL TRAVEL."/><div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base"><p>At Nanda Tours & Travels, we believe every journey deserves dependable service, comfortable vehicles and personal attention. From Hyderabad city travel and airport transfers to family trips, corporate travel and outstation journeys, we are committed to making every trip comfortable, safe and hassle-free.</p><p>With professional service and experienced drivers, our goal is simple — to provide a reliable travel experience that customers can trust.</p></div><div className="mt-8 h-px w-24 bg-gold"/></div></div></section>

    <section id="reviews" className="bg-secondary py-24 lg:py-32"><div className="section-shell"><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><SectionHeading eyebrow="Google reviews" title="WHAT OUR CUSTOMERS SAY"/><div><div className="text-xl text-gold">★★★★★</div><strong className="font-sans text-5xl font-semibold tabular-nums">4.9 <span className="text-2xl text-muted-foreground">/ 5</span></strong><span className="block text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{business.reviewCount} Google Reviews</span></div></div><div className="mt-14 grid gap-px bg-border md:grid-cols-2">{reviews.map((review,index)=><blockquote key={review} className={`bg-background p-8 ${index===4?"md:col-span-2":""}`}><div className="text-sm text-gold">★★★★★</div><p className="mt-8 font-display text-lg leading-8">“{review}”</p><footer className="mt-8 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Google review · <span className="font-sans tabular-nums">0{index+1}</span></footer></blockquote>)}</div><a href={business.googleBusinessUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em]">View all Google Reviews <ArrowRight className="size-4 text-gold"/></a></div></section>

    <section className="py-24 lg:py-32"><div className="section-shell"><SectionHeading eyebrow="Simple booking" title="YOUR JOURNEY, IN FOUR STEPS."/><div className="relative mt-14 grid gap-8 md:grid-cols-4"><div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block"/>{[["01","Tell us your journey"],["02","Choose your travel option"],["03","Confirm your booking"],["04","Enjoy the journey"]].map(([number,label])=><div key={number} className="relative bg-background"><span className="grid size-14 place-items-center border border-gold bg-background font-sans text-xl font-semibold tabular-nums text-navy">{number}</span><h3 className="mt-5 font-display text-lg font-normal leading-7">{label}</h3></div>)}</div></div></section>

    <section className="bg-navy py-24 lg:py-32"><div className="section-shell grid gap-12 lg:grid-cols-2"><div><SectionHeading eyebrow="Service area" title="WHEREVER YOUR JOURNEY TAKES YOU." text="Contact us for destination-specific availability and travel arrangements." invert/><div className="mt-9 flex flex-wrap gap-2">{["Hyderabad","Secunderabad","Malkajgiri","Telangana","Andhra Pradesh"].map(area=><span key={area} className="border border-ivory/20 px-4 py-3 text-xs font-semibold text-ivory/75">{area}</span>)}</div></div><div className="grid place-items-center border border-ivory/15 p-10 text-center"><MapPin className="size-14 stroke-1 text-gold"/><p className="mt-6 max-w-sm font-display text-2xl text-ivory">Local familiarity. Long-distance capability. Personal attention throughout.</p></div></div></section>

    <section className="relative overflow-hidden py-28 text-center"><img src={outstationImage} alt="" loading="lazy" className="absolute inset-0 size-full object-cover"/><div className="absolute inset-0 bg-navy/85"/><div className="section-shell relative"><p className="eyebrow">Travel with confidence</p><h2 className="mt-5 font-display text-3xl font-normal leading-[1.3] text-ivory sm:text-5xl">YOUR NEXT JOURNEY<br/>STARTS HERE.</h2><p className="mt-6 text-ivory/70">Travel comfortably. Travel confidently. Travel with Nanda.</p><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><ActionLink href="#booking">Book your journey</ActionLink><ActionLink href={whatsAppGeneral} light>WhatsApp us</ActionLink><ActionLink href={business.phoneHref} light>Call now</ActionLink></div></div></section>

    <section id="contact" className="py-24 lg:py-32"><div className="section-shell"><SectionHeading eyebrow="Contact" title="READY WHEN YOU ARE."/><div className="mt-12 grid overflow-hidden border border-border lg:grid-cols-[0.8fr_1.2fr]"><div className="bg-navy p-7 text-ivory sm:p-10"><BrandMark/><div className="mt-10 space-y-7"><div className="flex gap-4"><MapPin className="mt-1 size-5 shrink-0 text-gold"/><p className="text-sm leading-7 text-ivory/70">{business.addressLines.map(line=><span key={line} className="block">{line}</span>)}</p></div><div className="flex gap-4"><Phone className="size-5 text-gold"/><a href={business.phoneHref} className="text-sm">{business.phoneDisplay}</a></div><div className="flex gap-4"><Phone className="size-5 text-gold"/><a href={business.phone2Href} className="text-sm">{business.phone2Display}</a></div><div className="flex gap-4"><Clock3 className="size-5 text-gold"/><span className="text-sm">{business.hours}</span></div></div><div className="mt-10 grid gap-2 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3"><ActionLink href={business.phoneHref}>Call now</ActionLink><ActionLink href={whatsAppGeneral} light>WhatsApp</ActionLink><ActionLink href={business.directionsUrl} light>Directions</ActionLink></div></div><iframe title="Nanda Tours & Travels location map" src={business.mapEmbedUrl} loading="lazy" className="min-h-[430px] w-full border-0" referrerPolicy="no-referrer-when-downgrade" /></div></div></section>

    <footer className="bg-navy pb-10 pt-16 text-ivory"><div className="section-shell grid gap-12 border-b border-ivory/10 pb-12 md:grid-cols-2 lg:grid-cols-4"><div><BrandMark/><p className="mt-5 text-sm leading-6 text-ivory/55">Premium travel and cab services for local, airport, corporate, family and outstation journeys.</p></div><div><h3 className="eyebrow">Navigate</h3><div className="mt-5 grid gap-3 text-sm text-ivory/65">{navItems.map(([label,href])=><a key={href} href={href} className="hover:text-gold">{label}</a>)}</div></div><div><h3 className="eyebrow">Services</h3><div className="mt-5 grid gap-3 text-sm text-ivory/65">{["Local Travel","Airport Transfer","Outstation","Corporate Travel","Family Trips","Day Trips"].map(item=><a key={item} href={whatsappUrl(`Hello Nanda Tours & Travels, I would like to enquire about ${item}.`)} target="_blank" rel="noreferrer" className="hover:text-gold">{item}</a>)}</div></div><div><h3 className="eyebrow">Contact</h3><a href={business.phoneHref} className="mt-5 block font-sans text-2xl font-semibold tabular-nums">{business.phoneDisplay}</a><a href={business.phone2Href} className="mt-2 block font-sans text-2xl font-semibold tabular-nums">{business.phone2Display}</a><div className="mt-5 flex gap-3"><a href={business.googleBusinessUrl} target="_blank" rel="noreferrer" className="grid size-11 place-items-center border border-ivory/15 text-ivory hover:border-gold" aria-label="Google Business"><MapPin className="size-4"/></a><a href={whatsAppGeneral} target="_blank" rel="noreferrer" className="grid size-11 place-items-center border border-ivory/15 text-ivory hover:border-gold" aria-label="WhatsApp"><MessageCircle className="size-4"/></a></div></div></div><div className="section-shell pt-7 text-[10px] uppercase tracking-[0.12em] text-ivory/35">© <span className="font-sans tabular-nums">{new Date().getFullYear()}</span> Nanda Tours & Travels. All rights reserved.</div></footer>

    <nav className="quick-actions fixed inset-x-0 bottom-0 z-50 grid min-h-18 grid-cols-3 border-t border-ivory/15 bg-navy text-ivory md:hidden" aria-label="Quick actions"><a href={business.phoneHref} className="grid place-items-center border-r border-ivory/10 text-[10px] font-bold uppercase tracking-[0.1em]"><Phone className="size-5 text-gold"/>Call</a><a href={whatsAppGeneral} target="_blank" rel="noreferrer" className="grid place-items-center border-r border-ivory/10 text-[10px] font-bold uppercase tracking-[0.1em]"><MessageCircle className="size-5 text-gold"/>WhatsApp</a><a href="#booking" className="grid place-items-center bg-gold text-[10px] font-bold uppercase tracking-[0.1em] text-navy"><CalendarDays className="size-5"/>Book now</a></nav>
  </main>;
}