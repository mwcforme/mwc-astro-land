import { useState } from "react";
import type { FaqItem } from "../data/faqs";

interface FAQAccordionProps {
  faqs: FaqItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const scrollToForm = () => {
    const el = document.getElementById("hero-form") ?? document.getElementById("final-cta");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="faq"
      style={{
        background: "var(--navy, #0B1029)",
        padding: "var(--section-y) var(--gutter)",
      }}
    >
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {/* Eyebrow */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "var(--fs-eyebrow)",
          fontWeight: 700,
          letterSpacing: "var(--ls-eyebrow)",
          textTransform: "uppercase" as const,
          color: "var(--orange, #E8670A)",
          marginBottom: 12,
          textAlign: "center" as const,
        }}>
          COMMON QUESTIONS
        </p>

        {/* Heading */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--fs-h1)",
          fontWeight: 700,
          lineHeight: "var(--lh-heading)",
          color: "#FFFFFF",
          textTransform: "uppercase" as const,
          textAlign: "center" as const,
          margin: "0 0 48px",
        }}>
          FREQUENTLY ASKED QUESTIONS
        </h2>

        {/* Accordion */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "var(--radius, 12px)",
                  border: "1px solid rgba(11,16,41,0.12)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                  overflow: "hidden",
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="cro-faq-btn"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    padding: "20px 24px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left" as const,
                    transition: "background 0.15s ease",
                  }}
                >
                  <span style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 17,
                    fontWeight: 600,
                    color: "var(--navy, #0B1029)",
                    lineHeight: 1.35,
                  }}>
                    {faq.q}
                  </span>
                  <span style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    color: "var(--orange, #E8670A)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </span>
                </button>

                <div
                  style={{
                    maxHeight: isOpen ? 500 : 0,
                    overflow: "hidden",
                    opacity: isOpen ? 1 : 0,
                    transition: "max-height 300ms ease, opacity 250ms ease",
                  }}
                  aria-hidden={!isOpen}
                >
                  <div style={{
                    padding: "0 24px 20px",
                    fontFamily: "var(--font-body)",
                    fontSize: "var(--fs-body)",
                    lineHeight: 1.7,
                    color: "#374151",
                  }}>
                    {faq.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            type="button"
            onClick={scrollToForm}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              height: 56,
              padding: "0 40px",
              background: "var(--orange, #E8670A)",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "var(--radius-pill, 999px)",
              fontFamily: "var(--font-display)",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase" as const,
              letterSpacing: "0.08em",
              cursor: "pointer",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            BOOK YOUR 60-MINUTE VISIT
          </button>
        </div>
      </div>

      <style>{`.cro-faq-btn:hover { background: rgba(255,255,255,0.05) !important; }`}</style>
    </section>
  );
}
