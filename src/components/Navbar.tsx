import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import BrandLogo from '../assets/logo/BrandLogo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.about'), href: '#about' },
    { label: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      id="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-[rgba(10,9,16,0.85)] backdrop-blur-md border-b border-white/10'
        : 'bg-transparent border-b border-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          id="navbar-logo"
          className="flex items-center no-underline"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <BrandLogo height={70} zoom={1.12} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              id={`nav-link-${link.href.replace('#', '')}`}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <a
              href="#contact"
              id="navbar-cta"
              className="btn-primary !px-5 !py-2 !text-sm"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              {t('nav.cta')}
            </a>
          </div>
        </div>

        {/* Mobile hamburger & switcher */}
        <div className="flex items-center gap-3 md:hidden">
          <LanguageSwitcher />
          <button
            id="mobile-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t('nav.openMenu')}
            className="bg-transparent border-none text-[var(--color-text-primary)] cursor-pointer p-2 flex items-center"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-[rgba(10,9,16,0.97)] backdrop-blur-xl border-t border-white/10 p-6 flex flex-col gap-5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-base"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn-primary justify-center"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            {t('nav.cta')}
          </a>
        </div>
      )}
    </header>
  );
}
