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
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-30 pb-20 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="orb orb-primary animate-glow-pulse w-[700px] h-[700px] -top-[200px] left-1/2 -translate-x-1/2" />
      <div className="orb orb-glow animate-glow-pulse w-[500px] h-[500px] bottom-0 -right-[100px] [animation-delay:1.5s]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_30%,transparent_80%)]"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-7">
          <span className="section-label">
            <Zap size={13} />
            Ingeniería de Software Empresarial
          </span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up-delay-1 text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight mb-6">
          Sistemas que{' '}
          <span className="gradient-text-brand">escalan</span>
          {' '}con tu empresa
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up-delay-2 text-base sm:text-lg lg:text-xl text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mx-auto mb-10 font-normal">
          Diseñamos y construimos <strong className="text-[var(--color-text-primary)] font-semibold">plataformas SaaS</strong>, sistemas de gestión empresarial
          y software a medida para empresas que exigen precisión,{' '}
          <strong className="text-[var(--color-text-primary)] font-semibold">cero tiempo de inactividad</strong> y resultados medibles.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up-delay-3 flex flex-wrap gap-4 justify-center">
          <a
            href="#contact"
            id="hero-cta-primary"
            className="btn-primary !text-base !px-8 !py-3.5"
            onClick={(e) => handleCTAClick(e, '#contact')}
          >
            Hablar con el equipo
            <ArrowRight size={18} />
          </a>
          <a
            href="#services"
            id="hero-cta-secondary"
            className="btn-secondary !text-base !px-8 !py-3.5"
            onClick={(e) => handleCTAClick(e, '#services')}
          >
            Ver soluciones
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in-up-delay-3 flex flex-wrap gap-12 justify-center mt-16 pt-12 border-t border-white/10">
          {[
            { value: '99.9%', label: 'Uptime garantizado' },
            { value: '< 200ms', label: 'Latencia API promedio' },
            { value: '10+', label: 'Sistemas en producción' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-extrabold tracking-tight leading-none mb-1.5 gradient-text-brand">
                {stat.value}
              </div>
              <div className="text-xs text-[var(--color-text-muted)] font-medium">
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
        className="animate-float absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-text-muted)] flex flex-col items-center gap-1.5 no-underline text-xs font-medium tracking-widest uppercase transition-colors hover:text-[var(--color-text-primary)]"
      >
        <span>Explorar</span>
        <ChevronDown size={18} />
      </a>
    </section>
  );
}
