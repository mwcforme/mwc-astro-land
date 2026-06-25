import { useState } from "react";
import type { Location } from "../data/locations";

interface LocationSelectorProps {
  locations: Location[];
}

const CARDS = [
  { slug: "richmond-va" as const, city: "Richmond", region: "Richmond Area", driveTime: "5 min from I-64" },
  { slug: "virginia-beach-va" as const, city: "Virginia Beach", region: "Coastal Virginia", driveTime: "5 min from I-264" },
  { slug: "newport-news-va" as const, city: "Newport News", region: "Peninsula", driveTime: "3 min from I-64, Exit 258A" },
];

export default function LocationSelector({ locations }: LocationSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleBook = (slug: string) => {
    setSelected(slug);
    setTimeout(() => {
      const el = document.getElementById("final-cta") ?? document.getElementById("hero-form");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  };

  return (
    <section
      id="locations"
      aria-labelledby="mwc-loc-heading"
      style={{ scrollMarginTop: 64, background: "var(--brand-cream)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 20px 80px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
          <img
            src="/images/cro/virginia-silhouette.webp"
            alt="Virginia"
            style={{ height: 48, width: "auto", opacity: 0.15 }}
            loading="lazy"
            decoding="async"
          />
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, marginBottom: 10, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-cta-accessible)", textAlign: "center" }}>
          3 Virginia Centers
        </p>
        <h2
          id="mwc-loc-heading"
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", textAlign: "center", color: "var(--brand-navy)", fontSize: "clamp(26px, 3vw, 38px)", letterSpacing: "0.02em", marginBottom: 10 }}
        >
          Pick Your Location
        </h2>
        <p style={{ textAlign: "center", fontSize: 16, marginBottom: 36, fontFamily: "var(--font-body)", color: "var(--c-text-on-light-muted)", lineHeight: 1.5 }}>
          Same-day appointments available at all three centers.
        </p>

        {/* Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {CARDS.map((card) => {
            const loc = locations.find(l => l.slug === card.slug)!;
            const isSelected = selected === card.slug;

            return (
              <article
                key={card.slug}
                aria-labelledby={`loc-city-${card.slug}`}
                style={{
                  background: isSelected ? "var(--brand-navy)" : "var(--bg-white)",
                  border: isSelected ? "2px solid var(--brand-cta)" : "2px solid rgba(11,16,41,0.10)",
                  borderRadius: 16,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  transition: "border-color 150ms ease, background 150ms ease, box-shadow 150ms ease",
                  boxShadow: isSelected
                    ? "0 0 0 4px rgba(232,103,10,0.14), 0 8px 32px rgba(11,16,41,0.14)"
                    : "0 2px 8px rgba(11,16,41,0.06)",
                  position: "relative",
                }}
              >
                {isSelected && (
                  <div style={{ position: "absolute", top: 16, right: 16, width: 28, height: 28, borderRadius: "50%", background: "var(--brand-cta)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}

                <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: isSelected ? "var(--brand-cta)" : "var(--c-text-on-light-muted)", marginBottom: 5 }}>
                    {card.region}
                  </p>
                  <h3
                    id={`loc-city-${card.slug}`}
                    style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", letterSpacing: "0.02em", textTransform: "uppercase", color: isSelected ? "var(--brand-cream)" : "var(--brand-navy)", lineHeight: 1.1, marginBottom: 16 }}
                  >
                    {card.city}
                  </h3>

                  <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, marginBottom: 10, fontFamily: "var(--font-body)", fontWeight: 600, color: "var(--brand-cta)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    {card.driveTime}
                  </div>

                  <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: isSelected ? "rgba(245,240,235,0.75)" : "var(--c-text-on-light-muted)", lineHeight: 1.5, marginBottom: 20, userSelect: "text" }}>
                    {loc.address}<br />{loc.cityStateZip}
                  </div>

                  <div style={{ marginBottom: 20 }} />

                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 600, color: isSelected ? "rgba(245,240,235,0.85)" : "var(--brand-navy)", marginBottom: 20 }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.43 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                    <a
                      href={loc.phoneHref}
                      style={{ color: "inherit", textDecoration: "none" }}
                      aria-label={`Call ${loc.city} at ${loc.phone}`}
                    >
                      {loc.phone}
                    </a>
                  </div>

                  <div style={{ marginTop: "auto" }}>
                    <button
                      type="button"
                      onClick={() => handleBook(card.slug)}
                      aria-label={`Book a no-cost visit at the ${card.city} center`}
                      style={{ width: "100%", minHeight: 52, background: "var(--brand-cta)", color: "#fff", border: "none", borderRadius: 60, cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "background 150ms ease", boxShadow: "0 4px 16px rgba(232,103,10,0.40)" }}
                    >
                      {isSelected ? "Confirmed. Scroll to book" : "Book in-person visit"}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points={isSelected ? "20 6 9 17 4 12" : "5 12 14 12 / 14 19 14 5"}/><path d={isSelected ? "" : "M5 12h14M12 5l7 7-7 7"}/></svg>
                    </button>

                    <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: 11, color: isSelected ? "rgba(245,240,235,0.55)" : "var(--c-text-on-light-muted)", marginTop: 10, lineHeight: 1.5 }}>
                      60-minute in-person visit. No cost, no obligation.
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <p style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: 13, color: selected ? "var(--brand-cta-accessible)" : "var(--c-text-on-light-muted)", fontWeight: selected ? 600 : 400, marginTop: 20, lineHeight: 1.5, transition: "color 200ms ease" }}>
          {selected
            ? "Good choice. Scroll up and pick your time."
            : "Not sure? Any center can run your labs the same day."}
        </p>
      </div>
    </section>
  );
}
