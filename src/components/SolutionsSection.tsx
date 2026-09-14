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
    <section id="services" className="py-24 px-6 relative overflow-hidden">
      {/* BG orb */}
      <div className="orb orb-primary animate-glow-pulse w-[500px] h-[500px] top-[10%] -left-[150px] [animation-delay:1s]" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="mb-4">
            <span className="section-label">Nuestras Soluciones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Soluciones diseñadas para{' '}
            <span className="gradient-text-brand">desafíos reales</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed text-base">
            Cada proyecto parte de un entendimiento profundo del negocio. No vendemos software genérico —
            construimos sistemas que resuelven problemas específicos con precisión técnica.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SOLUTIONS.map((sol) => {
            const Icon = sol.icon;
            return (
              <article
                key={sol.id}
                id={`solution-card-${sol.id}`}
                className="card-surface card-surface-hover p-8 flex flex-col gap-5"
              >
                {/* Icon + Tag */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{
                      backgroundColor: `${sol.iconColor}14`,
                      borderColor: `${sol.iconColor}30`,
                    }}
                  >
                    <Icon size={22} color={sol.iconColor} />
                  </div>
                  <span
                    className="text-[0.7rem] font-bold tracking-widest uppercase"
                    style={{ color: sol.iconColor }}
                  >
                    {sol.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold tracking-tight leading-snug text-[var(--color-text-primary)]">
                  {sol.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-grow">
                  {sol.description}
                </p>

                {/* Features list */}
                <ul className="space-y-2 list-none p-0 m-0 flex flex-col">
                  {sol.features.map((feat) => (
                    <li
                      key={feat}
                      className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: sol.iconColor }}
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
                  className="inline-flex items-center gap-1.5 text-sm font-semibold mt-1 transition-all duration-200 hover:gap-2.5"
                  style={{ color: sol.iconColor }}
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
