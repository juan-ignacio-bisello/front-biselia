import { Globe, Briefcase, ExternalLink } from 'lucide-react';
import BrandLogo from '../assets/logo/BrandLogo';

const FOOTER_LINKS = {
  Servicios: [
    { label: 'ERP & Gestión Multisucursal', href: '#services' },
    { label: 'Plataformas SaaS', href: '#saas' },
    { label: 'Software a Medida', href: '#services' },
    { label: 'Integraciones', href: '#services' },
  ],
  Empresa: [
    { label: 'Nosotros', href: '#about' },
    { label: 'Metodología', href: '#about' },
    { label: 'Contacto', href: '#contact' },
  ],
};

const SOCIAL = [
  { id: 'footer-linkedin', icon: Briefcase, label: 'LinkedIn', href: 'https://linkedin.com' },
  { id: 'footer-twitter', icon: ExternalLink, label: 'Twitter / X', href: 'https://twitter.com' },
  { id: 'footer-github', icon: Globe, label: 'GitHub', href: 'https://github.com' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="footer"
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 1.5rem 2rem',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Top row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div>
            <a
              href="#"
              id="footer-logo"
              style={{ display: 'inline-block', marginBottom: '1.25rem', textDecoration: 'none' }}
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <BrandLogo height={32} />
            </a>
            <p
              style={{
                color: 'var(--color-text-secondary)',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                maxWidth: '320px',
                marginBottom: '1.5rem',
              }}
            >
              Estudio de ingeniería de software especializado en sistemas de gestión empresarial,
              plataformas SaaS y soluciones a medida de alta complejidad.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {SOCIAL.map(({ id, icon: Icon, label, href }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(143, 121, 179, 0.12)';
                    el.style.borderColor = 'rgba(143, 121, 179, 0.3)';
                    el.style.color = 'var(--color-brand-glow)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = 'rgba(255,255,255,0.04)';
                    el.style.borderColor = 'rgba(255,255,255,0.08)';
                    el.style.color = 'var(--color-text-secondary)';
                  }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h4
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--color-text-muted)',
                  marginBottom: '1.25rem',
                }}
              >
                {section}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        fontSize: '0.9rem',
                        color: 'var(--color-text-secondary)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)'; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)'; }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            paddingTop: '1.75rem',
            borderTop: '1px solid rgba(255,255,255,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            © {new Date().getFullYear()} BISELIA. Todos los derechos reservados.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Diseñado y desarrollado con precisión técnica.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 600px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
