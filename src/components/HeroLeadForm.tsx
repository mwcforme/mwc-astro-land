import { useState, useId } from 'react';

const LOCATIONS = [
  { key: 'richmond',       label: 'Richmond' },
  { key: 'virginia-beach', label: 'Virginia Beach' },
  { key: 'newport-news',   label: 'Newport News' },
] as const;
type LocationKey = typeof LOCATIONS[number]['key'];

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Map-pin inline SVG */
function MapPinIcon({ color }: { color: string }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

/** Check-inside circle SVG */
function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <circle cx="10" cy="10" r="9" stroke="var(--orange, #E8670A)" strokeWidth="2" fill="var(--orange, #E8670A)" />
      <polyline points="6,10 9,13 14,7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Unchecked radio circle */
function RadioCircle() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 20,
        height: 20,
        borderRadius: 10,
        border: '1.5px solid #D1D5DB',
        background: 'transparent',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    />
  );
}

export default function HeroLeadForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState<LocationKey | ''>('');
  const [tcpa, setTcpa] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [hoveredLoc, setHoveredLoc] = useState<LocationKey | null>(null);

  const nameId = useId();
  const phoneId = useId();
  const tcpaId = useId();
  const locGroupId = useId();

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
      <a
        href="https://www.google.com/maps/search/?api=1&query=Men%27s+Wellness+Centers+Glen+Allen+VA"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '12px', textDecoration: 'none' }}
      >
        <span style={{ display: 'flex', gap: '2px' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#C9A961" aria-hidden="true">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
            </svg>
          ))}
        </span>
        <span style={{ fontFamily: 'var(--font-body, Montserrat, sans-serif)', fontSize: '13px', color: 'var(--cro-text-body, #374151)', fontWeight: 600 }}>
          4.9 &middot; 191 verified Google reviews
        </span>
      </a>

      {/* Heading */}
      <h2 style={{
        fontFamily: 'var(--font-display, Oswald, sans-serif)',
        fontSize: 'clamp(20px, 3vw, 24px)',
        fontWeight: 700,
        color: 'var(--navy, #0B1029)',
        lineHeight: 1.15,
        marginBottom: 4,
        marginTop: 0,
        textTransform: 'uppercase',
      }}>
        Claim Your No-Cost Visit
      </h2>

      {/* Subheading */}
      <p style={{
        fontFamily: 'var(--font-body, Montserrat, sans-serif)',
        fontSize: '13px',
        color: 'var(--cro-text-body, #374151)',
        lineHeight: 1.5,
        margin: '0 0 16px',
      }}>
        No-cost 60-minute visit. Same-day labs. No insurance needed. FSA &amp; HSA accepted.
      </p>

      <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {/* Name */}
        <div>
          <label htmlFor={nameId} style={labelStyle}>Name</label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John"
            style={{
              ...inputStyle,
              borderColor: name.length > 0 && name.trim().length < 3
                ? 'rgba(220,50,50,0.6)'
                : 'rgba(11,16,41,0.14)',
            }}
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={phoneId} style={labelStyle}>Phone</label>
          <input
            id={phoneId}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={phone}
            onChange={handlePhone}
            placeholder="(555) 000-0000"
            style={{
              ...inputStyle,
              borderColor: phone.length > 0 && phoneDigits.length < 10
                ? 'rgba(220,50,50,0.6)'
                : 'rgba(11,16,41,0.14)',
            }}
          />
        </div>

        {/* Location — stacked radio cards */}
        <div role="radiogroup" aria-label="Select center location" aria-required="true">
          <p style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.09em',
            textTransform: 'uppercase' as const,
            color: '#6B7280',
            marginBottom: 8,
            marginTop: 0,
            fontFamily: 'var(--font-body, Montserrat, sans-serif)',
          }}>
            Location
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {LOCATIONS.map(({ key, label }) => {
              const sel = location === key;
              const hov = hoveredLoc === key && !sel;
              return (
                <label
                  key={key}
                  onMouseEnter={() => setHoveredLoc(key)}
                  onMouseLeave={() => setHoveredLoc(null)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 52,
                    borderRadius: 8,
                    padding: '0 14px',
                    gap: 12,
                    cursor: 'pointer',
                    userSelect: 'none' as const,
                    background: sel ? 'rgba(232,103,10,0.08)' : '#F7F7F5',
                    border: `2px solid ${sel ? 'var(--orange, #E8670A)' : hov ? '#9CA3AF' : '#DBDBDB'}`,
                    boxShadow: sel ? '0 4px 12px rgba(232,103,10,0.15)' : 'none',
                    transform: sel ? 'scale(1.01)' : 'scale(1)',
                    transition: 'transform 150ms ease, border-color 150ms ease, background 150ms ease, box-shadow 150ms ease',
                  }}
                >
                  <input
                    type="radio"
                    name={`${locGroupId}-location`}
                    value={key}
                    checked={sel}
                    onChange={() => setLocation(key)}
                    aria-label={label}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
                  />
                  <MapPinIcon color={sel ? 'var(--orange, #E8670A)' : '#6B7280'} />
                  <span style={{
                    fontFamily: 'var(--font-body, Montserrat, sans-serif)',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#0B1029',
                    lineHeight: 1,
                    flex: 1,
                  }}>
                    {label}
                  </span>
                  {sel ? <CheckCircleIcon /> : <RadioCircle />}
                </label>
              );
            })}
          </div>
        </div>

        {/* TCPA */}
        <div>
          <input
            type="checkbox"
            id={tcpaId}
            checked={tcpa}
            onChange={(e) => setTcpa(e.target.checked)}
            style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
          />
          <label
            htmlFor={tcpaId}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              cursor: 'pointer',
              userSelect: 'none' as const,
              padding: '10px 12px',
              margin: '0 -12px',
              borderRadius: 8,
            }}
          >
            {/* Custom checkbox */}
            <span
              aria-hidden="true"
              style={{
                width: 24,
                height: 24,
                borderRadius: 5,
                border: `2px solid ${tcpa ? 'var(--orange, #E8670A)' : 'rgba(11,16,41,0.20)'}`,
                background: tcpa ? 'var(--orange, #E8670A)' : 'transparent',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                marginTop: 1,
                transition: 'background 150ms ease, border-color 150ms ease',
              }}
            >
              {tcpa && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </span>
            <span style={{
              fontFamily: 'var(--font-body, Montserrat, sans-serif)',
              fontSize: '11px',
              color: '#6B7280',
              lineHeight: 1.5,
            }}>
              I agree to receive SMS/calls &amp; texts from Men&rsquo;s Wellness Centers. Msg &amp; data rates may apply. Reply STOP to opt out.{' '}
              Not a condition of service. HIPAA Compliant.{' '}
              <a
                href="https://menswellnesscenters.com/privacy-practices/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--orange, #E8670A)', textDecoration: 'none' }}
              >
                Privacy Policy
              </a>
            </span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            marginTop: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            height: 56,
            borderRadius: 9999,
            border: 'none',
            background: '#E8670A',
            color: '#FFFFFF',
            fontFamily: 'var(--font-display, Oswald, sans-serif)',
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase' as const,
            cursor: submitting ? 'wait' : 'pointer',
            boxShadow: '0 4px 20px rgba(232,103,10,0.40)',
            transition: 'background 180ms ease, transform 180ms ease, box-shadow 180ms ease',
          }}
        >
          {submitting ? 'Booking…' : 'BOOK MY 60-MINUTE VISIT →'}
        </button>

        {/* CRO testimonial quote */}
        <p style={{
          fontSize: '11px',
          marginTop: 2,
          textAlign: 'center',
          lineHeight: 1.5,
          fontStyle: 'italic',
          color: '#6B7280',
          fontFamily: 'var(--font-body, Montserrat, sans-serif)',
        }}>
          &ldquo;I&rsquo;ve been to two GPs who told me my levels were fine. After one visit here I had answers and a plan. Game-changer for me.&rdquo; R.T., Richmond &middot; Verified member
        </p>
      </form>
    </div>
  );
}
