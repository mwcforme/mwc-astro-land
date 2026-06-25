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
      const [first, ...rest] = name.trim().split(/\s+/);
      const res = await fetch('https://book.menswellnesscenters.com/api/ghl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          path: '/contacts/upsert',
          method: 'POST',
          body: {
            firstName: first || 'Guest',
            lastName: rest.join(' ') || undefined,
            phone: '+1' + phoneDigits,
            source: 'astro-landing-page',
            customFields: [
              { id: 'Cou856tOhaxW62vwehVI', fieldValue: location },
            ],
          },
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        throw new Error('non-ok');
      }
    } catch {
      window.location.href = 'https://book.menswellnesscenters.com';
    } finally {
      setSubmitting(false);
    }
  }

  const cardStyle: React.CSSProperties = {
    background: '#FFFFFF',
    border: '1px solid rgba(11,16,41,0.06)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
    maxWidth: '440px',
    width: '100%',
    margin: '0 auto',
    boxSizing: 'border-box',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    height: '52px',
    background: '#F9F8F7',
    border: '1px solid rgba(11,16,41,0.14)',
    borderRadius: '8px',
    color: '#0B1029',
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
    color: '#6B7280',
    marginBottom: '6px',
  };

  if (submitted) {
    return (
      <div style={cardStyle}>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8670A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ margin: '0 auto 16px', display: 'block' }}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <p style={{ fontFamily: 'var(--font-display, Oswald, sans-serif)', fontSize: '22px', fontWeight: 700, color: '#0B1029', textTransform: 'uppercase', margin: '0 0 12px' }}>
            You're on the list.
          </p>
          <p style={{ fontFamily: 'var(--font-body, Montserrat, sans-serif)', fontSize: '15px', color: '#6B7280', margin: 0, lineHeight: 1.6 }}>
            We'll reach out shortly to confirm your no-cost visit. Check your phone for a text from us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      {/* Star rating at top */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
        <span style={{ display: 'flex', gap: '2px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A961" aria-hidden="true">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ))}
        </span>
        <span style={{ fontFamily: 'var(--font-body, Montserrat, sans-serif)', fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>
          4.9 · 191 verified Google reviews
        </span>
      </div>

      <p style={{
        fontFamily: 'var(--font-display, Oswald, sans-serif)',
        fontSize: 'clamp(20px, 2.5vw, 26px)',
        fontWeight: 700,
        color: '#0B1029',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        margin: '0 0 8px',
        lineHeight: 1.05,
      }}>
        Claim Your No-Cost Visit
      </p>

      <p style={{
        fontFamily: 'var(--font-body, Montserrat, sans-serif)',
        fontSize: '13px',
        color: '#6B7280',
        lineHeight: 1.5,
        margin: '0 0 24px',
      }}>
        No-cost 60-minute visit. Same-day labs. No insurance needed. FSA &amp; HSA accepted.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor={nameId} style={labelStyle}>Name</label>
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
                ? 'rgba(220,50,50,0.6)'
                : 'rgba(11,16,41,0.14)',
            }}
          />
        </div>

        {/* Phone */}
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor={phoneId} style={labelStyle}>Phone</label>
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
                ? 'rgba(220,50,50,0.6)'
                : 'rgba(11,16,41,0.14)',
            }}
          />
        </div>

        {/* Location */}
        <div style={{ marginBottom: '20px' }}>
          <p style={{ ...labelStyle, marginBottom: '10px' }}>Location</p>
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
                  borderColor: location === loc ? 'transparent' : 'rgba(11,16,41,0.20)',
                  background: location === loc ? '#E8670A' : 'transparent',
                  color: location === loc ? '#fff' : '#374151',
                  fontFamily: 'var(--font-body, Montserrat, sans-serif)',
                  fontSize: '13px',
                  fontWeight: location === loc ? 700 : 500,
                  transition: 'background 0.18s, border-color 0.18s, color 0.18s',
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
            color: '#9CA3AF',
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
            background: isValid && !submitting ? '#E8670A' : 'rgba(11,16,41,0.10)',
            color: isValid && !submitting ? '#fff' : '#9CA3AF',
            fontFamily: 'var(--font-display, Oswald, sans-serif)',
            fontSize: '16px',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: isValid && !submitting ? 'pointer' : 'not-allowed',
            opacity: isValid && !submitting ? 1 : 0.65,
            transition: 'background 0.2s, opacity 0.2s, color 0.2s',
            boxShadow: isValid && !submitting ? '0 4px 16px rgba(232,103,10,0.45)' : 'none',
          }}
        >
          {submitting ? 'Submitting…' : 'BOOK MY 60-MINUTE VISIT →'}
        </button>
      </form>
    </div>
  );
}
