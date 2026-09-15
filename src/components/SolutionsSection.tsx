import { BarChart3, Cloud, Cpu, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function SolutionsSection() {
  const { t } = useTranslation();

  const solutions = [
    {
      id: 'erp',
      icon: BarChart3,
      iconColor: '#8F79B3',
      tag: t('solutions.items.erp.tag'),
      title: t('solutions.items.erp.title'),
      description: t('solutions.items.erp.description'),
      features: t('solutions.items.erp.features', { returnObjects: true }) as string[],
      href: '#contact',
    },
    {
      id: 'saas',
      icon: Cloud,
      iconColor: '#a78bfa',
      tag: t('solutions.items.saas.tag'),
      title: t('solutions.items.saas.title'),
      description: t('solutions.items.saas.description'),
      features: t('solutions.items.saas.features', { returnObjects: true }) as string[],
      href: '#contact',
    },
    {
      id: 'custom',
      icon: Cpu,
      iconColor: '#c4b5fd',
      tag: t('solutions.items.custom.tag'),
      title: t('solutions.items.custom.title'),
      description: t('solutions.items.custom.description'),
      features: t('solutions.items.custom.features', { returnObjects: true }) as string[],
      href: '#contact',
    },
  ];

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
            <span className="section-label">{t('solutions.sectionLabel')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
            {t('solutions.titlePrefix')}{' '}
            <span className="gradient-text-brand">{t('solutions.titleHighlight')}</span>
          </h2>
          <p className="text-[var(--color-text-secondary)] max-w-xl mx-auto leading-relaxed text-base">
            {t('solutions.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol) => {
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
                  {Array.isArray(sol.features) && sol.features.map((feat) => (
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
                  {t('solutions.cta')} <ArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
