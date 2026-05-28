import React from 'react';
import { BrandPartner, Category } from '../types';

export interface BrandScrollerProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  partnersList: BrandPartner[];
  categoriesList: Category[];
}

export const BrandScroller = ({ activeTab, setActiveTab, partnersList, categoriesList }: BrandScrollerProps) => {
  const filteredPartners = partnersList.filter(p => p.category === activeTab);

  return (
    <section id="marcas" data-nav-theme="light" className="py-24 bg-white px-6 md:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <div className="flex sm:flex-wrap justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto sm:overflow-visible no-scrollbar -mx-6 sm:mx-0 px-6 sm:px-0 py-4 sm:py-0 -my-4 sm:my-0">
          {categoriesList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-eyebrow uppercase tracking-widest whitespace-nowrap transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'bg-zinc-50 text-zinc-300 hover:text-brand-green'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div className="flex gap-8 md:gap-12 px-4 md:px-6">
            {filteredPartners.map((partner, idx) => (
              <a
                key={`group1-${activeTab}-${idx}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="flex-shrink-0 text-4xl md:text-6xl font-black text-zinc-100 uppercase whitespace-nowrap hover:text-brand-orange transition-colors cursor-pointer select-none px-2 no-underline"
              >
                {partner.name}
              </a>
            ))}
          </div>
          <div aria-hidden="true" className="flex gap-8 md:gap-12 px-4 md:px-6">
            {filteredPartners.map((partner, idx) => (
              <a
                key={`group2-${activeTab}-${idx}`}
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                className="flex-shrink-0 text-4xl md:text-6xl font-black text-zinc-100 uppercase whitespace-nowrap hover:text-brand-orange transition-colors cursor-pointer select-none px-2 no-underline"
              >
                {partner.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
