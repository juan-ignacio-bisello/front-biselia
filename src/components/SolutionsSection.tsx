import { BarChart3, Cloud, Cpu, ArrowRight } from 'lucide-react';

const SOLUTIONS = [
  {
    id: 'erp',
    icon: BarChart3,
    iconColor: '#8F79B3',
    tag: 'Gestión Empresarial',
    title: 'Plataformas ERP & Gestión Multisucursal',
    description:
      'Control centralizado de operaciones con sincronización de stock y ventas en tiempo real. CRM transaccional, paneles operativos de alto rendimiento y flujos de aprobación configurables para equipos distribuidos.',
    features: [
      'Sincronización multicanal en tiempo real',
      'CRM transaccional integrado',
      'Paneles analíticos configurables',
      'Punto de venta y control de stock',
    ],
    href: '#contact',
  },
  {
    id: 'saas',
    icon: Cloud,
    iconColor: '#a78bfa',
    tag: 'SaaS Vertical',
    title: 'Desarrollo de Plataformas SaaS',
    description:
      'Arquitectura multitenant diseñada para escalar. Infraestructura en la nube con alta disponibilidad, pipelines de CI/CD y estrategias de rollout que garantizan continuidad operativa sin interrupciones.',
    features: [
      'Arquitectura multitenant robusta',
      'Infraestructura cloud (AWS / GCP)',
      'Alta disponibilidad y autoscaling',
      'Onboarding y billing integrado',
    ],
    href: '#contact',
  },
  {
    id: 'custom',
    icon: Cpu,
    iconColor: '#c4b5fd',
    tag: 'Software a Medida',
    title: 'Ingeniería de Software a Medida',
    description:
      'Digitalización de flujos operativos complejos para empresas que superaron las limitaciones del software genérico. Desde la especificación funcional hasta el despliegue en producción, con validación rigurosa de datos.',
    features: [
      'Análisis y modelado de dominio',
      'APIs REST / GraphQL tipadas',
      'Integraciones con sistemas legados',
      'Automatización de procesos críticos',
    ],
    href: '#contact',
  },
];

export default function SolutionsSection() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="services" style={{ padding: '100px 1.5rem', position: 'relative', overflow: 'hidden' }}>
      {/* BG orb */}
      <div
        className="orb orb-primary animate-glow-pulse"
        style={{ width: '500px', height: '500px', top: '10%', left: '-150px', animationDelay: '1s' }}
      />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="section-label">Nuestras Soluciones</span>
          </div>
          <h2
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: '1rem',
            }}
          >
            Soluciones diseñadas para{' '}
            <span className="gradient-text-brand">desafíos reales</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Cada proyecto parte de un entendimiento profundo del negocio. No vendemos software genérico —
            construimos sistemas que resuelven problemas específicos con precisión técnica.
          </p>
        </div>

        {/* Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <article
                key={sol.id}
                id={`solution-card-${sol.id}`}
                className="card-surface card-surface-hover"
                style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
              >
                {/* Icon + Tag */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '10px',
                      background: `${sol.iconColor}14`,
                      border: `1px solid ${sol.iconColor}30`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={22} color={sol.iconColor} />
                  </div>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: sol.iconColor,
                    }}
                  >
                    {sol.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    lineHeight: 1.3,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {sol.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.7,
                    flexGrow: 1,
                  }}
                >
                  {sol.description}
                </p>

                {/* Features list */}
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {sol.features.map((feat) => (
                    <li
                      key={feat}
                      style={{
                        fontSize: '0.875rem',
                        color: 'var(--color-text-secondary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                      }}
                    >
                      <span
                        style={{
                          width: '5px',
                          height: '5px',
                          borderRadius: '50%',
                          background: sol.iconColor,
                          flexShrink: 0,
                        }}
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={sol.href}
                  id={`solution-cta-${sol.id}`}
                  onClick={(e) => handleClick(e, sol.href)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: sol.iconColor,
                    textDecoration: 'none',
                    marginTop: '0.25rem',
                    transition: 'gap 0.2s',
                  }}
                  onMouseEnter={(e) => { (e.currentTarget.style.gap = '0.6rem'); }}
                  onMouseLeave={(e) => { (e.currentTarget.style.gap = '0.35rem'); }}
                >
                  Consultar solución <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
