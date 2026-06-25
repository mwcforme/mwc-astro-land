import { useState, useId } from 'react';

const LOCATIONS = ['Richmond', 'Virginia Beach', 'Newport News'] as const;
type Location = typeof LOCATIONS[number];

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export default function HeroLeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<Location | ''>('');
  const [tcpa, setTcpa] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const nameId = useId();
  const phoneId = useId();

  const phoneDigits = phone.replace(/\D/g, '');
  const isValid =
    name.trim().length >= 3 &&
    phoneDigits.length === 10 &&
    location !== '' &&
    tcpa;

  function handlePhone(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatPhone(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setSubmitting(true);
    try {
      // Attempt to POST to /api/ghl; fall back to redirect on error
      const res = await fetch('/api/ghl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), phone: phoneDigits, location }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error('non-ok');
      }
    } catch {
      // Redirect fallback
      window.location.href = 'https://book.menswellnesscenters.com';
    } finally {
      setSubmitting(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    border: '1px solid rgba(255,255,255,0.35)',
    borderRadius: '16px',
    padding: '32px 28px',
    background: 'rgba(255,255,255,0.07)',
    maxWidth: '416px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '52px',
    background: 'rgba(255,255,255,0.08)',
    border: '1px solid rgba(255,255,255,0.25)',
    borderRadius: '8px',
    color: '#fff',
    fontFamily: 'var(--font-body, Montserrat, system-ui, sans-serif)',
    fontSize: '15px',
    padding: '0 16px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'var(--font-body, Montserrat, system-ui, sans-serif)',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase' as const,
    color: 'rgba(255,255,255,0.65)',
    marginBottom: '6px',
  };

  if (submitted) {
    return (
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8670A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p style={{ fontFamily: 'var(--font-display, Oswald, sans-serif)', fontSize: '22px', fontWeight: 700, color: '#fff', textTransform: 'uppercase', margin: '0 0 12px' }}>
            You're on the list.
          </p>
          <p style={{ fontFamily: 'var(--font-body, Montserrat, sans-serif)', fontSize: '15px', color: 'rgba(255,255,255,0.70)', margin: 0 }}>
            We'll reach out shortly to confirm your no-cost visit. Check your phone for a text from us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      <p style={{
        fontFamily: 'var(--font-display, Oswald, sans-serif)',
        fontSize: 'clamp(20px, 2.5vw, 24px)',
        fontWeight: 700,
        color: '#F5F0EB',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        margin: '0 0 8px',
        lineHeight: 1.1,
      }}>
        Start Feeling Like Yourself Again.
      </p>

      <p style={{
        fontFamily: 'var(--font-body, Montserrat, sans-serif)',
        fontSize: '13px',
        color: 'rgba(255,255,255,0.65)',
        lineHeight: 1.5,
        margin: '0 0 24px',
      }}>
        No-cost 60-minute visit. Same-day labs. No insurance needed. FSA &amp; HSA accepted.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div style={{ marginBottom: '16px', position: 'relative' }}>
          <label htmlFor={nameId} style={labelStyle}>Full Name</label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Smith"
            style={{
              ...inputStyle,
              borderColor: name.length > 0 && name.trim().length < 3
                ? 'rgba(255,80,80,0.6)'
                : 'rgba(255,255,255,0.25)',
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor={phoneId} style={labelStyle}>Phone Number</label>
          <input
            id={phoneId}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={handlePhone}
            placeholder="(804) 555-0123"
            style={{
              ...inputStyle,
              borderColor: phone.length > 0 && phoneDigits.length < 10
                ? 'rgba(255,80,80,0.6)'
                : 'rgba(255,255,255,0.25)',
            }}
          />
        </div>

        {/* Location */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ ...labelStyle, marginBottom: '10px' }}>Select Location</p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {LOCATIONS.map((loc) => (
              <label
                key={loc}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '60px',
                  border: '1px solid',
                  borderColor: location === loc ? 'transparent' : 'rgba(255,255,255,0.25)',
                  background: location === loc ? '#E8670A' : 'transparent',
                  color: '#fff',
                  fontFamily: 'var(--font-body, Montserrat, sans-serif)',
                  fontSize: '13px',
                  fontWeight: location === loc ? 700 : 400,
                  transition: 'background 0.18s, border-color 0.18s',
                  userSelect: 'none',
                  whiteSpace: 'nowrap',
                }}
              >
                <input
                  type="radio"
                  name="location"
                  value={loc}
                  checked={location === loc}
                  onChange={() => setLocation(loc)}
                  style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                />
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* TCPA */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <input
            type="checkbox"
            id="tcpa"
            checked={tcpa}
            onChange={(e) => setTcpa(e.target.checked)}
            style={{
              width: '18px',
              height: '18px',
              flexShrink: 0,
              marginTop: '2px',
              accentColor: '#E8670A',
              cursor: 'pointer',
            }}
          />
          <label htmlFor="tcpa" style={{
            fontFamily: 'var(--font-body, Montserrat, sans-serif)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.50)',
            lineHeight: 1.5,
            cursor: 'pointer',
          }}>
            By checking this box, I consent to receive calls, texts, and emails from Men's Wellness Centers at the number provided. Message frequency varies. Message and data rates may apply. Reply STOP to opt out.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid || submitting}
          style={{
            display: 'block',
            width: '100%',
            height: '54px',
            borderRadius: '60px',
            border: 'none',
            background: isValid && !submitting ? '#E8670A' : 'rgba(8,13,31,0.6)',
            color: '#fff',
            fontFamily: 'var(--font-display, Oswald, sans-serif)',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: isValid && !submitting ? 'pointer' : 'not-allowed',
            opacity: isValid && !submitting ? 1 : 0.55,
            transition: 'background 0.2s, opacity 0.2s',
          }}
        >
          {submitting ? 'Submitting…' : 'BOOK MY NO-COST VISIT →'}
        </button>
      </form>
    </div>
  );
}
