import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as LucideIcons from 'lucide-react';
import { ArrowRight } from 'lucide-react';
import { BrandChevron } from './BrandChevron';
import { KibanHeroConfig } from '../lib/kiban';
import { ContactTheme } from '../types';

interface HeroProps {
  onContactClick: (theme: ContactTheme) => void;
  onScrollTo: (id: string) => void;
  heroConfig: KibanHeroConfig | null;
}

export const Hero = ({ onContactClick, onScrollTo, heroConfig }: HeroProps) => {
  const config = heroConfig;

  const getIconComp = (name: string) => {
    return (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  };

  const heroCards = config ? [
    { Icon: getIconComp(config.card1Icon), iconBg: 'bg-brand-orange', iconClass: 'text-white',          title: config.card1Title, subtitle: config.card1Subtitle },
    { Icon: getIconComp(config.card2Icon), iconBg: 'bg-brand-green',  iconClass: 'text-white opacity-80', title: config.card2Title, subtitle: config.card2Subtitle },
    { Icon: getIconComp(config.card3Icon), iconBg: 'bg-brand-orange', iconClass: 'text-white',          title: config.card3Title, subtitle: config.card3Subtitle },
    { Icon: getIconComp(config.card4Icon), iconBg: 'bg-brand-green',  iconClass: 'text-white',          title: config.card4Title, subtitle: config.card4Subtitle },
  ] : [];

  const [activeCardIdx, setActiveCardIdx] = useState(0);
  useEffect(() => {
    if (heroCards.length === 0) return;
    const interval = setInterval(() => {
      setActiveCardIdx((prev) => (prev + 1) % heroCards.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [heroCards.length]);

  const activeCard = heroCards[activeCardIdx] ?? null;
  const ActiveIcon = activeCard?.Icon ?? null;

  return (
    <section data-nav-theme="dark" className="relative h-screen w-full bg-white z-40">
      <div className="relative h-full w-full overflow-hidden rounded-brand-hero shadow-[0_20px_80px_rgba(0,0,0,0.3)] z-10 px-6 md:px-8">
        <div className="absolute inset-0 z-0 bg-brand-orange overflow-hidden">
          <div className="absolute top-[5%] -right-[5%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-[10%] -left-[10%] w-[900px] h-[900px] bg-brand-black/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />
          <BrandChevron className="absolute bottom-[5%] lg:bottom-[-128px] right-0 lg:-right-40 w-[88vw] lg:w-[95vw] max-w-[1100px] h-auto text-brand-green pointer-events-none" />
        </div>
        
        <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col pt-32 md:pt-32 w-full">
          <div className="flex-grow flex flex-col lg:flex-row items-center justify-start lg:justify-between gap-10 lg:gap-0 w-full">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-3/5"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-display font-black text-white leading-[0.95] mb-6 tracking-tight">
                {config ? (
                  <>
                    {config.titlePrefix} <br />
                    <span className="text-brand-green italic">{config.titleHighlight}</span>{' '}
                    {config.titleSuffix?.includes('Experiência') ? (
                      <>
                        {config.titleSuffix.replace(/Experiência\.?/, '').trim()} <br />
                        Experiência{config.titleSuffix.endsWith('.') ? '.' : ''}
                      </>
                    ) : (config.titleSuffix ?? null)}
                  </>
                ) : (
                  <span className="opacity-0 select-none">&#8203;</span>
                )}
              </h1>

              <p className="text-base md:text-xl text-white/90 font-medium mb-8 leading-relaxed max-w-xl">
                {config?.subtitle ?? ''}
              </p>

              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <button
                  onClick={() => onContactClick('especialista')}
                  className="w-full sm:w-auto bg-white hover:bg-white/90 text-brand-orange px-8 py-3.5 rounded-full text-eyebrow font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Falar com especialista <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onScrollTo('colecoes')}
                  className="w-full sm:w-auto bg-transparent border border-white hover:bg-white hover:text-brand-orange text-white px-8 py-3.5 rounded-full text-eyebrow font-black uppercase tracking-widest transition-all cursor-pointer"
                >
                  Explorar Produtos
                </button>
              </div>
            </motion.div>

            <div className="flex items-center justify-center w-full my-auto lg:hidden lg:my-0">
              {activeCard && ActiveIcon && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCardIdx}
                    initial={{ opacity: 0, scale: 0.4, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: -20 }}
                    transition={{ type: 'spring', stiffness: 240, damping: 16 }}
                    className="bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-full max-w-[320px]"
                  >
                    <div className={`w-14 h-14 rounded-brand-icon ${activeCard.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <ActiveIcon className={`w-7 h-7 ${activeCard.iconClass}`} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-base mb-0.5 tracking-tight">{activeCard.title}</h4>
                      <p className="text-white/60 text-sm">{activeCard.subtitle}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            <div className="hidden lg:block lg:w-5/12 lg:relative lg:h-[550px]">
              {heroCards.map((card, idx) => {
                const positions = [
                  'lg:absolute lg:top-0 lg:right-4',
                  'lg:absolute lg:top-[130px] lg:left-0',
                  'lg:absolute lg:top-[260px] lg:right-0',
                  'lg:absolute lg:top-[390px] lg:left-12',
                ];
                const CardIcon = card.Icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, scale: 0.6, y: 30 }}
                    animate={{
                      opacity: 1,
                      scale: activeCardIdx === idx ? 1.06 : 0.96,
                      y: activeCardIdx === idx ? -8 : 0,
                    }}
                    transition={{
                      opacity: { duration: 0.6, delay: 0.6 + idx * 0.2 },
                      scale: { type: 'spring', stiffness: 220, damping: 14 },
                      y: { type: 'spring', stiffness: 220, damping: 14 },
                    }}
                    className={`bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 w-[340px] ${positions[idx]}`}
                  >
                    <div className={`w-16 h-16 rounded-brand-icon ${card.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <CardIcon className={`w-8 h-8 ${card.iconClass}`} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-white font-bold text-lg mb-0.5 tracking-tight">{card.title}</h4>
                      <p className="text-white/60 text-sm">{card.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="hidden sm:flex pb-8 md:pb-12 justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="flex flex-col items-center gap-3 cursor-pointer"
              onClick={() => onScrollTo('colecoes')}
            >
              <span className="text-white/60 uppercase font-black text-eyebrow tracking-eyebrow">
                Descobrir Mais
              </span>
              <div className="w-[18px] h-[30px] border-2 border-white/40 rounded-full flex justify-center p-1">
                <motion.div
                  animate={{
                    y: [0, 8, 0],
                    opacity: [1, 0.4, 1]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-1 h-1.5 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
