import { ArrowRight, ChevronDown, Zap } from 'lucide-react';

export default function HeroSection() {
  const handleCTAClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 1.5rem 80px',
        overflow: 'hidden',
      }}
    >
      {/* Background orbs */}
      <div
        className="orb orb-primary animate-glow-pulse"
        style={{
          width: '700px',
          height: '700px',
          top: '-200px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      />
      <div
        className="orb orb-glow animate-glow-pulse"
        style={{
          width: '500px',
          height: '500px',
          bottom: '0',
          right: '-100px',
          animationDelay: '1.5s',
        }}
      />

      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, black 30%, transparent 80%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '900px',
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        {/* Badge */}
        <div className="animate-fade-in-up" style={{ marginBottom: '1.75rem' }}>
          <span className="section-label">
            <Zap size={13} />
            Ingeniería de Software Empresarial
          </span>
        </div>

        {/* Headline */}
        <h1
          className="animate-fade-in-up-delay-1"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
          }}
        >
          Sistemas que{' '}
          <span className="gradient-text-brand">escalan</span>
          {' '}con tu empresa
        </h1>

        {/* Subheadline */}
        <p
          className="animate-fade-in-up-delay-2"
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            fontWeight: 400,
          }}
        >
          Diseñamos y construimos <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>plataformas SaaS</strong>, sistemas de gestión empresarial
          y software a medida para empresas que exigen precisión,{' '}
          <strong style={{ color: 'var(--color-text-primary)', fontWeight: 600 }}>cero tiempo de inactividad</strong> y resultados medibles.
        </p>

        {/* CTAs */}
        <div
          className="animate-fade-in-up-delay-3"
          style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#contact"
            id="hero-cta-primary"
            className="btn-primary"
            onClick={(e) => handleCTAClick(e, '#contact')}
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            Hablar con el equipo
            <ArrowRight size={18} />
          </a>
          <a
            href="#services"
            id="hero-cta-secondary"
            className="btn-secondary"
            onClick={(e) => handleCTAClick(e, '#services')}
            style={{ fontSize: '1rem', padding: '0.875rem 2rem' }}
          >
            Ver soluciones
          </a>
        </div>

        {/* Stats */}
        <div
          className="animate-fade-in-up-delay-3"
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '4rem',
            paddingTop: '3rem',
            borderTop: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {[
            { value: '99.9%', label: 'Uptime garantizado' },
            { value: '< 200ms', label: 'Latencia API promedio' },
            { value: '10+', label: 'Sistemas en producción' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  marginBottom: '0.35rem',
                }}
                className="gradient-text-brand"
              >
                {stat.value}
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        onClick={(e) => handleCTAClick(e, '#services')}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--color-text-muted)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          textDecoration: 'none',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          transition: 'color 0.2s',
        }}
        className="animate-float"
      >
        <span>Explorar</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
