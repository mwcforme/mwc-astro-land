import { useState, useEffect, useRef } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero");
      setVisible(hero ? window.scrollY > hero.offsetHeight * 0.6 : window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const targets = [
      document.getElementById("hero-form"),
      document.getElementById("final-cta"),
    ].filter(Boolean) as HTMLElement[];
    if (!targets.length) return;

    const seen = new WeakSet<Element>();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => e.isIntersecting ? seen.add(e.target) : seen.delete(e.target));
        setFormInView(targets.some(t => seen.has(t)));
      },
      { threshold: 0.2 }
    );
    targets.forEach(t => observerRef.current!.observe(t));
    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToForm = () => {
    const target = document.getElementById("hero-form") ?? document.getElementById("final-cta");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const show = visible && !formInView;

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        transform: show ? "translateY(0)" : "translateY(110%)",
        transition: "transform 300ms ease",
        background: "rgba(11,16,41,0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 16px",
        paddingBottom: "max(14px, env(safe-area-inset-bottom))",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.40)",
      }}
      aria-hidden={!show}
    >
      <button
        type="button"
        onClick={scrollToForm}
        style={{ boxShadow: "0 8px 24px rgba(232,103,10,0.40)", width: "100%", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 60, fontFamily: "var(--font-display)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", fontSize: 16, color: "#fff", cursor: "pointer", border: "none", minHeight: 52, background: "var(--brand-cta)", gap: 8 }}
      >
        Book in-person visit
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
      <p style={{ textAlign: "center", marginTop: 6, fontFamily: "var(--font-body)", fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
        60-minute in-person visit &middot; Men&apos;s Wellness Centers
      </p>
    </div>
  );
}
