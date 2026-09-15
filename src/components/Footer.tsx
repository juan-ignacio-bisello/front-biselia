import { Globe, Briefcase, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BrandLogo from '../assets/logo/BrandLogo';
import { getEnvironments } from '../helpers/getEnvironments';

const getWhatsAppNumber = () => {
  const phoneNumber = getEnvironments().VITE_WHATSAPP_NUMBER;
  return phoneNumber;
};

const SOCIAL = [
  { id: 'footer-linkedin', icon: Briefcase, label: 'LinkedIn', href: 'https://www.linkedin.com/in/juan-ignacio-bisello-aa94281a7' },
  { id: 'footer-github', icon: Globe, label: 'GitHub', href: 'https://github.com/juan-ignacio-bisello' },
  { id: 'footer-whatsapp', icon: Phone, label: 'WhatsApp', href: `https://wa.me/${getWhatsAppNumber()}` },
];

export default function Footer() {
  const { t } = useTranslation();

  const footerLinks = {
    [t('footer.sections.services')]: [
      { label: t('footer.links.erp'), href: '#services' },
      { label: t('footer.links.saas'), href: '#saas' },
      { label: t('footer.links.custom'), href: '#services' },
      { label: t('footer.links.integrations'), href: '#services' },
    ],
    [t('footer.sections.company')]: [
      { label: t('footer.links.about'), href: '#about' },
      { label: t('footer.links.methodology'), href: '#about' },
      { label: t('footer.links.contact'), href: '#contact' },
    ],
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer
      id="footer"
      className="bg-[var(--color-surface)] border-t border-white/10 pt-16 pb-8 px-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-2">
            <a
              href="#"
              id="footer-logo"
              className="inline-block mb-5 no-underline"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <BrandLogo height={70} />
            </a>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed max-w-xs mb-6">
              {t('footer.description')}
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {SOCIAL.map(({ id, icon: Icon, label, href }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[var(--color-text-secondary)] no-underline transition-all duration-200 hover:bg-[rgba(143,121,179,0.12)] hover:border-[rgba(143,121,179,0.3)] hover:text-[var(--color-brand-glow)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-[var(--color-text-muted)] mb-5">
                {section}
              </h4>
              <ul className="list-none p-0 m-0 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      id={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-sm text-[var(--color-text-secondary)] no-underline transition-colors hover:text-[var(--color-text-primary)]"
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
        <div className="pt-7 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--color-text-muted)]">
          <p className="m-0">
            {t('footer.copyright', { year: new Date().getFullYear() })}
          </p>
          <p className="m-0">
            {t('footer.tagline')}
          </p>
        </div>
      </div>
    </footer>
  );
}
