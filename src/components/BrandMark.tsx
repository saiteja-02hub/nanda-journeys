export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="flex min-w-0 items-center gap-3">
      <span className="grid size-10 shrink-0 place-items-center border border-gold/60" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="size-6 fill-none stroke-gold" strokeWidth="1.5">
          <path d="M5 23c5-8 9-12 22-15-6 5-9 10-10 17" />
          <path d="M5 23c5-1 9 0 12 2M12 16l2 2m3-6 2 2m3-5 2 2" />
        </svg>
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-base font-semibold text-ivory">{compact ? "NANDA" : "NANDA TOURS & TRAVELS"}</span>
        <span className="block text-[9px] uppercase tracking-[0.24em] text-gold">Journeys with distinction</span>
      </span>
    </span>
  );
}