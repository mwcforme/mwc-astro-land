import { useState, useRef } from "react";
import type { FaqItem } from "../data/faqs";

interface FAQAccordionProps {
  faqs: FaqItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (i: number) => {
    const isOpening = open !== i;
    setOpen(isOpening ? i : null);
    if (isOpening) {
      window.setTimeout(() => {
        itemRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 50);
    }
  };

  const scrollToForm = () => {
    const el = document.getElementById("hero-form") ?? document.getElementById("final-cta");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="faq" style={{ scrollMarginTop: 64, background: "var(--brand-cream)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", padding: "64px 24px 0" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--brand-navy)", marginBottom: 12, textAlign: "center" }}>
          Common Questions
        </p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            textTransform: "uppercase",
            textAlign: "center",
            color: "var(--brand-navy)",
            fontSize: "clamp(26px, 3vw, 38px)",
            letterSpacing: "0.02em",
            marginBottom: 40,
          }}
        >
          Frequently Asked Questions
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((f, i) => {
            const isOpen = open === i;
            const panelId = `faq-panel-${i}`;
            return (
              <div
                key={f.q}
                ref={(el) => { itemRefs.current[i] = el; }}
                style={{ border: "1px solid var(--c-border-on-light)", borderRadius: 12, overflow: "hidden", background: "var(--bg-white)" }}
              >
                <button
                  type="button"
                  onClick={() => handleToggle(i)}
                  style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left", padding: "16px 20px", cursor: "pointer", color: "var(--brand-navy)", fontFamily: "var(--font-body)", background: "none", border: "none" }}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                >
                  <span style={{ fontWeight: 600, fontSize: 17 }}>{f.q}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--brand-cta)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    style={{ flexShrink: 0, transition: "transform 200ms", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    style={{ padding: "0 20px 20px", lineHeight: 1.65, fontSize: 16, color: "var(--c-text-on-light)", fontFamily: "var(--font-body)" }}
                  >
                    <p style={{ margin: 0 }}>{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Post-FAQ CTA */}
      <div style={{ marginTop: 32, paddingBottom: 64, display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          onClick={scrollToForm}
          style={{ fontFamily: "var(--font-display)", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, justifyContent: "center", height: 56, padding: "0 32px", background: "var(--brand-cta)", color: "var(--c-text-on-dark)", border: "none", borderRadius: 60, fontSize: 15, textTransform: "uppercase", letterSpacing: "0.07em" }}
        >
          Book in-person visit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </section>
  );
}
