import { Shield, Activity, Layers, CheckCircle2 } from 'lucide-react';

const PILLARS = [
  {
    id: 'reliability',
    icon: Shield,
    iconColor: '#8F79B3',
    title: 'Confiabilidad Operativa',
    description:
      'Arquitecturas tolerantes a fallos con redundancia activa. Cada sistema se diseña para operar bajo carga sin degradación. Monitoreo proactivo y alertas tempranas antes de que el problema llegue al usuario.',
    points: [
      'Uptime 99.9% en producción',
      'Redundancia y failover automático',
      'Monitoreo 24/7 con alertas',
    ],
  },
  {
    id: 'realtime',
    icon: Activity,
    iconColor: '#a78bfa',
    title: 'Datos en Tiempo Real',
    description:
      'Sincronización de inventario, ventas y estados operativos en milisegundos. Interfaces que reflejan el estado real del negocio sin demoras, con validación rigurosa que elimina inconsistencias de datos.',
    points: [
      'Sincronización < 200ms',
      'Validación rigurosa en capas',
      'Cero inconsistencias de estado',
    ],
  },
  {
    id: 'modular',
    icon: Layers,
    iconColor: '#c4b5fd',
    title: 'Arquitectura Modular',
    description:
      'Sistemas que crecen con el negocio. Módulos desacoplados que se integran progresivamente, sin reescrituras costosas. La plataforma de hoy es compatible con los requerimientos de mañana.',
    points: [
      'Dominio desacoplado por módulo',
      'APIs versionadas y documentadas',
      'Integración incremental sin fricción',
    ],
  },
];

const METHODOLOGY_STEPS = [
  { step: '01', title: 'Análisis de Dominio', desc: 'Entendemos el negocio antes de escribir una línea de código.' },
  { step: '02', title: 'Diseño de Arquitectura', desc: 'Proponemos la solución técnica óptima para los requerimientos.' },
  { step: '03', title: 'Desarrollo Iterativo', desc: 'Entregas frecuentes con validación continua del cliente.' },
  { step: '04', title: 'Despliegue & Soporte', desc: 'Puesta en producción robusta y acompañamiento post-lanzamiento.' },
];

export default function ValuePropSection() {
  return (
    <section id="about" className="py-24 px-6 bg-[var(--color-surface)] relative">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-18">
          <div className="mb-4">
            <span className="section-label">Nuestra Metodología</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            Ingeniería con{' '}
            <span className="gradient-text-brand">responsabilidad técnica</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed text-base">
            Resolvemos requerimientos críticos donde el margen de error es mínimo.
            Cada decisión técnica está respaldada por experiencia real en sistemas de producción.
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                id={`pillar-${pillar.id}`}
                className="p-8 rounded-[var(--radius-card)] border border-white/5 bg-[rgba(10,9,16,0.5)] flex flex-col gap-4"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border"
                  style={{
                    backgroundColor: `${pillar.iconColor}12`,
                    borderColor: `${pillar.iconColor}25`,
                  }}
                >
                  <Icon size={24} color={pillar.iconColor} />
                </div>

                <h3 className="text-lg font-bold tracking-tight text-[var(--color-text-primary)]">
                  {pillar.title}
                </h3>

                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed flex-grow">
                  {pillar.description}
                </p>

                <ul className="list-none p-0 m-0 flex flex-col gap-2">
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]"
                    >
                      <CheckCircle2 size={14} color={pillar.iconColor} className="shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Methodology steps */}
        <div className="rounded-[var(--radius-card)] border border-white/10 bg-[rgba(52,25,84,0.08)] p-10 md:p-12">
          <h3 className="text-2xl font-bold tracking-tight text-center mb-10 text-[var(--color-text-primary)]">
            Cómo trabajamos
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHODOLOGY_STEPS.map((step, index) => (
              <div
                key={step.step}
                id={`methodology-step-${index + 1}`}
                className="text-center relative"
              >
                <div className="text-xs font-extrabold tracking-widest text-[var(--color-brand-glow)] mb-3">
                  {step.step}
                </div>
                <h4 className="text-base font-bold text-[var(--color-text-primary)] mb-2 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider absolute bottom-0 left-0 right-0" />
    </section>
  );
}
