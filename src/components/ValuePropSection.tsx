import { Shield, Activity, Layers, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ValuePropSection() {
  const { t } = useTranslation();

  const pillars = [
    {
      id: 'reliability',
      icon: Shield,
      iconColor: '#8F79B3',
      title: t('valueProp.pillars.reliability.title'),
      description: t('valueProp.pillars.reliability.description'),
      points: t('valueProp.pillars.reliability.points', { returnObjects: true }) as string[],
    },
    {
      id: 'realtime',
      icon: Activity,
      iconColor: '#a78bfa',
      title: t('valueProp.pillars.realtime.title'),
      description: t('valueProp.pillars.realtime.description'),
      points: t('valueProp.pillars.realtime.points', { returnObjects: true }) as string[],
    },
    {
      id: 'modular',
      icon: Layers,
      iconColor: '#c4b5fd',
      title: t('valueProp.pillars.modular.title'),
      description: t('valueProp.pillars.modular.description'),
      points: t('valueProp.pillars.modular.points', { returnObjects: true }) as string[],
    },
  ];

  const methodologySteps = t('valueProp.steps', { returnObjects: true }) as Array<{
    step: string;
    title: string;
    desc: string;
  }>;

  return (
    <section id="about" className="py-24 px-6 bg-[var(--color-surface)] relative">
      {/* Top divider */}
      <div className="section-divider absolute top-0 left-0 right-0" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-18">
          <div className="mb-4">
            <span className="section-label">{t('valueProp.sectionLabel')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {t('valueProp.titlePrefix')}{' '}
            <span className="gradient-text-brand">{t('valueProp.titleHighlight')}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed text-base">
            {t('valueProp.subtitle')}
          </p>
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar) => {
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
                  {Array.isArray(pillar.points) && pillar.points.map((point) => (
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
            {t('valueProp.methodologyTitle')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.isArray(methodologySteps) && methodologySteps.map((step, index) => (
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
