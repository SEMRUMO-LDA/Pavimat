import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Category } from '../types';

export interface DynamicShowcaseProps {
  onBrandCategoryClick?: (id: string) => void;
  categoriesList: Category[];
}

export const DynamicShowcase = ({ onBrandCategoryClick, categoriesList }: DynamicShowcaseProps) => {
  const showcaseCategories = categoriesList;
  const [activeCategory, setActiveCategory] = useState(showcaseCategories[0] || categoriesList[0]);
  const activeIndex = showcaseCategories.findIndex(c => c.id === (activeCategory?.id || ''));
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showcaseCategories.length > 0) {
      setActiveCategory(showcaseCategories[0]);
    }
  }, [categoriesList]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || showcaseCategories.length === 0) return;
    const t = setTimeout(() => {
      const firstChild = container.children[0] as HTMLElement | undefined;
      if (!firstChild) return;
      const isHorizontal = container.scrollWidth > container.clientWidth + 1;
      if (isHorizontal) {
        const offset = firstChild.offsetLeft - (container.clientWidth - firstChild.clientWidth) / 2;
        container.scrollTo({ left: Math.max(0, offset), behavior: 'instant' as ScrollBehavior });
      } else {
        const offset = firstChild.offsetTop - (container.clientHeight - firstChild.clientHeight) / 2;
        container.scrollTo({ top: Math.max(0, offset), behavior: 'instant' as ScrollBehavior });
      }
    }, 50);
    return () => clearTimeout(t);
  }, [showcaseCategories]);

  const scrollToCard = (idx: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const target = container.children[idx] as HTMLElement | undefined;
    if (!target) return;
    const isHorizontal = container.scrollWidth > container.clientWidth + 1;
    if (isHorizontal) {
      const offset = target.offsetLeft - (container.clientWidth - target.clientWidth) / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    } else {
      const offset = target.offsetTop - (container.clientHeight - target.clientHeight) / 2;
      container.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const children = Array.from(container.children).filter(
        (child) => (child as HTMLElement).getAttribute('data-category') === 'true'
      ) as HTMLElement[];

      const containerRect = container.getBoundingClientRect();
      const isHorizontal = container.scrollWidth > container.clientWidth + 1;
      const containerCenter = isHorizontal
        ? containerRect.left + containerRect.width / 2
        : containerRect.top + containerRect.height / 2;

      let closest: { category: any; distance: number } | null = null;

      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const childCenter = isHorizontal
          ? rect.left + rect.width / 2
          : rect.top + rect.height / 2;
        const distance = Math.abs(containerCenter - childCenter);

        if (closest === null || distance < closest.distance) {
          closest = { category: showcaseCategories[idx], distance };
        }
      });

      if (closest && closest.category.id !== activeCategory.id) {
        setActiveCategory(closest.category);
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => container?.removeEventListener('scroll', handleScroll);
  }, [activeCategory.id, showcaseCategories]);

  return (
    <section id="colecoes" data-nav-theme="light" className="relative z-10 lg:min-h-screen pt-28 pb-16 lg:pt-32 lg:pb-12 px-6 md:px-8 bg-white flex flex-col lg:justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        <div className="flex flex-col lg:flex-row-reverse items-start justify-between gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative flex justify-center items-start lg:-mt-10">
            <div className="absolute inset-0 bg-brand-green/2 rounded-full blur-[100px] scale-75 md:scale-100 -z-10" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-square max-w-[440px] md:max-w-[540px]"
              >
                <div className="absolute inset-4 border border-brand-orange/20 rounded-full animate-spin-slow pointer-events-none" />
                <img
                   src={activeCategory.imageUrl}
                   alt={activeCategory.title}
                   className="w-full h-full object-cover rounded-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] border-[8px] md:border-[16px] border-white"
                   referrerPolicy="no-referrer"
                   loading="lazy"
                   decoding="async"
                 />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="w-full lg:w-5/12 flex flex-col relative z-10">
            <div className="mb-12 lg:mb-16 flex-shrink-0">
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase block mb-6"
              >
                Produtos
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl lg:text-display font-black text-brand-green leading-[0.95] tracking-tight"
              >
                Onde a <span className="text-brand-orange italic font-medium">técnica</span><br/>eleva o design
              </motion.h2>
            </div>

            <div className="w-full flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
              <div className="w-full relative lg:h-[500px]">
              <div
                ref={scrollRef}
                style={{ scrollPaddingLeft: '24px' }}
                className="w-screen lg:w-full -ml-6 lg:ml-0 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto h-full no-scrollbar snap-x snap-mandatory lg:snap-y pl-6 pr-6 py-24 lg:p-12 lg:pr-12 -my-24 lg:-m-12 scroll-smooth cards-mask"
              >
                {showcaseCategories.map((cat, idx) => {
                  const isActive = activeCategory.id === cat.id;
                  return (
                  <motion.div
                    key={cat.id}
                    data-category="true"
                    onClick={() => {
                      if (isActive) {
                        if (onBrandCategoryClick) onBrandCategoryClick(cat.id);
                      } else {
                        scrollToCard(idx);
                        setActiveCategory(cat);
                      }
                    }}
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.4,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                    className={`flex-shrink-0 snap-start lg:snap-center cursor-pointer p-6 md:p-7 rounded-brand-large text-left w-[260px] md:w-full group relative border ${
                      isActive
                        ? 'bg-white shadow-brand-deep border-zinc-100'
                        : 'bg-white/60 border-transparent'
                    }`}
                  >
                    <div className="relative z-10">
                      <h4 className="text-brand-green font-black text-lg md:text-xl mb-2 tracking-tight leading-tight">
                         {cat.title}
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed mb-4">
                        {cat.description}
                      </p>
                      <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-colors mt-4 ${isActive ? 'text-brand-orange' : 'text-zinc-400 group-hover:text-brand-orange'}`}>
                        Ver Marcas <ChevronDown size={14} className="-rotate-90" />
                      </span>
                    </div>

                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-brand-orange rounded-full hidden md:block"
                      />
                    )}
                  </motion.div>
                  );
                })}
              </div>
            </div>

            <div 
              className="hidden lg:flex flex-col items-center h-[350px] w-16 relative cursor-ns-resize group/indicator"
              onWheel={(e) => {
                if (scrollRef.current) {
                  scrollRef.current.scrollTop += e.deltaY;
                }
              }}
            >
              <div className="w-[1px] h-full bg-zinc-100 rounded-full overflow-hidden transition-all group-hover/indicator:w-[3px] group-hover/indicator:bg-zinc-200">
                <motion.div 
                  className="w-full bg-brand-orange"
                  initial={{ height: 0 }}
                  animate={{ height: `${((activeIndex + 1) / showcaseCategories.length) * 100}%` }}
                />
              </div>
              
              <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between py-2">
                {showcaseCategories.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      scrollToCard(i);
                      setActiveCategory(showcaseCategories[i]);
                    }}
                    className="flex justify-center w-full group/dot cursor-pointer"
                    aria-label={`Ir para categoria ${showcaseCategories[i].title}`}
                  >
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-500 group-hover/dot:scale-150 ${
                      i <= activeIndex 
                        ? 'bg-brand-orange border-brand-orange shadow-[0_0_15px_rgba(255,107,0,0.6)]' 
                        : 'bg-white border-zinc-200 hover:border-brand-orange'
                    }`} />
                  </button>
                ))}
              </div>

              <button
                type="button"
                aria-label="Produto anterior"
                onClick={() => {
                  const newIdx = Math.max(0, activeIndex - 1);
                  scrollToCard(newIdx);
                  setActiveCategory(showcaseCategories[newIdx]);
                }}
                disabled={activeIndex === 0}
                className="absolute -top-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-zinc-400 disabled:hover:border-zinc-200"
              >
                <ChevronUp size={18} />
              </button>

              <button
                type="button"
                aria-label="Produto seguinte"
                onClick={() => {
                  const newIdx = Math.min(showcaseCategories.length - 1, activeIndex + 1);
                  scrollToCard(newIdx);
                  setActiveCategory(showcaseCategories[newIdx]);
                }}
                disabled={activeIndex === showcaseCategories.length - 1}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-9 h-9 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-400 hover:text-brand-orange hover:border-brand-orange transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:text-zinc-400 disabled:hover:border-zinc-200"
              >
                <ChevronDown size={18} />
              </button>
            </div>

          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}} />
    </section>
  );
};
