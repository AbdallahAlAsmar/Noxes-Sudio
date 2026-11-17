const PHRASES = ['WORLDS IN MOTION', 'COMPLEXITY MOVES · CLARITY IS AUTHORED', 'BUILT FOR CREATORS. NOT CONSUMERS.'];

function TickerGroup() {
  return (
    <div className="brand-ticker-group">
      {PHRASES.map((phrase) => (
        <span key={phrase} className="flex items-center gap-10 whitespace-nowrap">
          {phrase}
          <span aria-hidden="true" className="h-1 w-1 rotate-45 bg-[#E83708]" />
        </span>
      ))}
    </div>
  );
}

/** Decorative brand strip. Hidden from assistive tech because it repeats the hero copy. */
export default function BrandTicker() {
  return (
    <div aria-hidden="true" className="brand-ticker relative z-10 border-y border-[#414548] bg-[#111315]/80">
      <div className="brand-ticker-track">
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
