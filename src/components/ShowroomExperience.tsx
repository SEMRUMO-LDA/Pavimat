import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Layout } from 'lucide-react';
import { KibanShowroomImage } from '../lib/kiban';

export const ShowroomExperience = ({ showroomImagesList }: { showroomImagesList: KibanShowroomImage[] }) => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const showroomImages = showroomImagesList && showroomImagesList.length > 0 ? showroomImagesList : [
    {
      url: "/gallery-1.jpg",
      title: "Pavimat - Ambiente e Detalhes"
    },
    {
      url: "/gallery-2.jpg",
      title: "Design e Sofisticação"
    },
    {
      url: "/gallery-3.jpg",
      title: "Inspiração para Ambientes"
    },
    {
      url: "/gallery-4.jpg",
      title: "Detalhes de Excelência"
    },
    {
      url: "/gallery-5.jpg",
      title: "Frota Pavimat"
    }
  ];

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % showroomImages.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + showroomImages.length) % showroomImages.length);
  };

  return (
    <section id="showroom" data-nav-theme="light" className="py-20 md:py-32 px-6 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase block mb-6">
                Showroom
              </span>
              <h2 className="text-4xl md:text-7xl lg:text-display font-black text-brand-green leading-[0.95] tracking-tight mb-6 md:mb-8">
                Espaço de <br/>
                <span className="text-brand-orange italic font-medium">inspiração</span>
              </h2>
              <p className="text-zinc-500 mb-10 text-lg leading-relaxed font-medium">
                Para que possa ver, tocar e imaginar os nossos produtos no seu espaço, criámos um <span className="text-brand-green font-bold">Showroom com 700 m²</span> de área de exposição. Este espaço foi concebido para facilitar o acesso às nossas diversas gamas, proporcionando o ambiente ideal para escolher os materiais da sua próxima obra ou remodelação.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { title: 'Consultoria Técnica', desc: 'Especificação por projecto, com a precisão que a obra exige.' },
                  { title: 'Galeria Completa', desc: 'Cerâmicos, pedras naturais, sanitários e revestimentos sob o mesmo tecto.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/5 flex items-center justify-center flex-shrink-0">
                      <Layout className="text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-black text-brand-green uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                      <p className="text-zinc-400 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Pavimat+Vale+Para%C3%ADso+Albufeira', '_blank')}
                  className="bg-brand-green text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-orange hover:scale-105 transition-all shadow-2xl active:scale-95 cursor-pointer"
                >
                  Visitar o Showroom
                </button>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative group">
              <div className="relative aspect-square md:aspect-[4/3] rounded-brand-large overflow-hidden shadow-brand-deep border border-zinc-100 bg-zinc-50">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImgIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    src={showroomImages[currentImgIndex].url}
                    alt={showroomImages[currentImgIndex].title}
                    className="absolute inset-0 w-full h-[120%] -top-[10%] object-cover"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    decoding="async"
                  />
                </AnimatePresence>

                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => { e.stopPropagation(); prevImg(); }}
                    aria-label="Imagem anterior"
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-brand-orange hover:scale-110 transition-all active:scale-90"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); nextImg(); }}
                    aria-label="Próxima imagem"
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-brand-orange hover:scale-110 transition-all active:scale-90"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>
              </div>

              <div className="relative mt-0">
                <div
                  className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar py-14 px-6 md:px-12 -my-4"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                  }}
                >
                  {showroomImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      aria-label={`Ver imagem ${idx + 1}`}
                      className={`relative flex-shrink-0 w-28 md:w-32 aspect-video rounded-brand-tag transition-all duration-500 cursor-pointer ${
                        idx === currentImgIndex 
                          ? 'scale-110 z-10 shadow-2xl shadow-brand-orange/40 ring-2 ring-brand-orange' 
                          : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-brand-tag overflow-hidden">
                        <img 
                          src={img.url} 
                          alt={`Thumbnail ${idx + 1}`} 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
