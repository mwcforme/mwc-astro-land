import { useState, useEffect } from "react";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const form = document.getElementById("hero-form");
      const pastThreshold = window.scrollY > 700;

      let formInView = false;
      if (form) {
        const formRect = form.getBoundingClientRect();
        formInView = formRect.top < window.innerHeight && formRect.bottom > 0;
      }

      setVisible(pastThreshold && !formInView);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const scrollToForm = () => {
    const target = document.getElementById("hero-form") ?? document.getElementById("final-cta");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div
      className="sticky-mobile-cta-wrapper md:hidden"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "rgba(11,16,41,0.95)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "12px 16px",
        paddingBottom: "calc(12px + env(safe-area-inset-bottom, 0px))",
        transform: visible ? "translateY(0)" : "translateY(110%)",
        transition: "transform 300ms ease",
        boxShadow: "0 -8px 24px rgba(0,0,0,0.40)",
      }}
      aria-hidden={!visible}
    >
      <button
        type="button"
        onClick={scrollToForm}
        style={{
          width: "100%",
          height: 56,
          background: "#E8670A",
          color: "#FFFFFF",
          border: "none",
          borderRadius: 0,
          fontFamily: "Oswald, sans-serif",
          fontSize: 15,
          fontWeight: 700,
          textTransform: "uppercase" as const,
          letterSpacing: "0.08em",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
        }}
      >
        BOOK YOUR 60-MINUTE VISIT →
      </button>
      <p style={{
        textAlign: "center",
        fontFamily: "Montserrat, sans-serif",
        fontSize: 11,
        color: "#9CA3AF",
        margin: "6px 0 0",
        letterSpacing: "0.02em",
      }}>
        60-minute in-person visit · Men&apos;s Wellness Centers
      </p>
    </div>
  );
}
