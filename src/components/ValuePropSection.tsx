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
    <section id="about" style={{ padding: '100px 1.5rem', background: 'var(--color-surface)', position: 'relative' }}>
      {/* Top divider */}
      <div className="section-divider" style={{ position: 'absolute', top: 0, left: 0, right: 0 }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span className="section-label">Nuestra Metodología</span>
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
            Ingeniería con{' '}
            <span className="gradient-text-brand">responsabilidad técnica</span>
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Resolvemos requerimientos críticos donde el margen de error es mínimo.
            Cada decisión técnica está respaldada por experiencia real en sistemas de producción.
          </p>
        </div>

        {/* Pillars */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '5rem',
          }}
        >
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                id={`pillar-${pillar.id}`}
                style={{
                  padding: '2rem',
                  borderRadius: 'var(--radius-card)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  background: 'rgba(10, 9, 16, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${pillar.iconColor}12`,
                    border: `1px solid ${pillar.iconColor}25`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={24} color={pillar.iconColor} />
                </div>

                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {pillar.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.7, flexGrow: 1 }}>
                  {pillar.description}
                </p>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {pillar.points.map((point) => (
                    <li
                      key={point}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}
                    >
                      <CheckCircle2 size={14} color={pillar.iconColor} style={{ flexShrink: 0 }} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Methodology steps */}
        <div
          style={{
            borderRadius: 'var(--radius-card)',
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'rgba(52, 25, 84, 0.08)',
            padding: '3rem 2.5rem',
          }}
        >
          <h3
            style={{
              fontSize: '1.375rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              marginBottom: '2.5rem',
              color: 'var(--color-text-primary)',
            }}
          >
            Cómo trabajamos
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {METHODOLOGY_STEPS.map((step, index) => (
              <div
                key={step.step}
                id={`methodology-step-${index + 1}`}
                style={{
                  textAlign: 'center',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    letterSpacing: '0.15em',
                    color: 'var(--color-brand-glow)',
                    marginBottom: '0.75rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {step.step}
                </div>
                <h4
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--color-text-primary)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {step.title}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="section-divider" style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
    </section>
  );
}
