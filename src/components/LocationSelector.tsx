import { useState, useCallback } from "react";
import type { Location } from "../data/locations";

interface LocationSelectorProps {
  locations: Location[];
}

interface CardMeta {
  slug: string;
  city: string;
  region: string;
  driveTime: string;
}

const CARDS: CardMeta[] = [
  { slug: "richmond-va",       city: "Richmond",      region: "Richmond Area",    driveTime: "5 min from I-64" },
  { slug: "virginia-beach-va", city: "Virginia Beach", region: "Coastal Virginia", driveTime: "5 min from I-264" },
  { slug: "newport-news-va",   city: "Newport News",   region: "Peninsula",        driveTime: "3 min from I-64, Exit 258A" },
];

export default function LocationSelector({ locations }: LocationSelectorProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = useCallback((slug: string) => {
    setSelected(slug);
    setTimeout(() => {
      const el = document.getElementById("hero-form") ?? document.getElementById("final-cta");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 180);
  }, []);

  return (
    <section
      id="locations"
      style={{
        background: "var(--cro-surface-secondary, #ECEAE6)",
        padding: "var(--section-y) 24px",
      }}
    >
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "clamp(36px, 5vw, 56px)" }}>
          <img
            src="/images/cro/virginia-silhouette.webp"
            alt=""
            aria-hidden
            style={{ height: 48, opacity: 0.15, display: "inline-block", marginBottom: 16 }}
            loading="lazy"
            decoding="async"
          />
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-eyebrow)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            color: "var(--orange, #E8670A)",
            margin: "0 0 8px",
          }}>
            3 VIRGINIA CENTERS
          </p>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--fs-h1)",
            fontWeight: 700,
            color: "var(--navy, #0B1029)",
            textTransform: "uppercase",
            lineHeight: 1.1,
            margin: 0,
          }}>
            PICK YOUR LOCATION
          </h2>
          <p style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--fs-body)",
            color: "var(--muted-gray, #6B7280)",
            marginTop: 12,
          }}>
            Same-day appointments available at all three centers.
          </p>
        </div>

        {/* Cards grid */}
        <div className="cro-loc-grid">
          {CARDS.map((card) => {
            const loc = locations.find((l) => l.slug === card.slug);
            if (!loc) return null;
            const isSelected = selected === card.slug;

            return (
              <div
                key={card.slug}
                onClick={() => handleSelect(card.slug)}
                style={{
                  background: isSelected ? "var(--navy, #0B1029)" : "var(--white, #FFFFFF)",
                  borderRadius: "var(--radius, 16px)",
                  border: isSelected
                    ? "2px solid var(--orange, #E8670A)"
                    : "1px solid rgba(11,16,41,0.12)",
                  boxShadow: isSelected
                    ? "0 4px 20px rgba(232,103,10,0.15)"
                    : "var(--shadow-card, 0 2px 8px rgba(11,16,41,0.06))",
                  padding: "clamp(24px, 3vw, 32px)",
                  cursor: "pointer",
                  position: "relative",
                  transition: "background 0.25s, border-color 0.25s",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
              >
                {/* Selected badge */}
                {isSelected && (
                  <div style={{
                    position: "absolute",
                    top: -10,
                    right: 16,
                    background: "var(--orange, #E8670A)",
                    color: "#FFFFFF",
                    fontSize: 11,
                    fontWeight: 700,
                    fontFamily: "var(--font-body)",
                    padding: "3px 10px",
                    borderRadius: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}>
                    ✓ Selected
                  </div>
                )}

                {/* Region eyebrow */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--fs-eyebrow)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: isSelected ? "var(--orange, #E8670A)" : "var(--muted-gray, #6B7280)",
                  margin: 0,
                }}>
                  {card.region}
                </p>

                {/* City */}
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--fs-h3)",
                  fontWeight: 700,
                  color: isSelected ? "#FFFFFF" : "var(--navy, #0B1029)",
                  textTransform: "uppercase",
                  margin: 0,
                }}>
                  {card.city}
                </h3>

                {/* Drive time */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontFamily: "var(--font-body)",
                  fontSize: 13,
                  color: isSelected ? "rgba(255,255,255,0.65)" : "var(--muted-gray, #6B7280)",
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  {card.driveTime}
                </div>

                {/* Address */}
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: isSelected ? "rgba(255,255,255,0.75)" : "var(--cro-text-body, #374151)",
                  margin: 0,
                  lineHeight: 1.5,
                }}>
                  {loc.address}
                  <br />
                  {loc.cityStateZip}
                </p>

                {/* Phone */}
                <div style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 14,
                  color: isSelected ? "var(--cream, #F5F0EB)" : "var(--navy, #0B1029)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.5 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012.43 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  <a
                    href={loc.phoneHref}
                    onClick={(e) => e.stopPropagation()}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {loc.phone}
                  </a>
                </div>

                {/* CTA */}
                <div style={{ marginTop: 8 }}>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(card.slug);
                    }}
                    style={{
                      width: "100%",
                      height: 52,
                      background: "var(--orange, #E8670A)",
                      color: "#FFFFFF",
                      border: "none",
                      borderRadius: "var(--radius-pill, 999px)",
                      fontFamily: "var(--font-display)",
                      fontSize: 15,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 4px 16px rgba(232,103,10,0.40)",
                    }}
                  >
                    {isSelected ? "Confirmed. Scroll to book" : "BOOK YOUR 60-MINUTE VISIT"}
                  </button>
                </div>

                {/* Micro-disclaimer */}
                <p style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: 12,
                  color: isSelected ? "rgba(255,255,255,0.45)" : "#9CA3AF",
                  textAlign: "center",
                  margin: 0,
                }}>
                  60-minute in-person visit. No cost, no obligation.
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{
          fontFamily: "Montserrat, sans-serif",
          fontSize: 14,
          color: "#6B7280",
          textAlign: "center",
          marginTop: 32,
        }}>
          Not sure? Any center can run your labs the same day.
        </p>
      </div>

      <style>{`
        .cro-loc-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 768px) {
          .cro-loc-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>
    </section>
  );
}
