import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { KibanTestimonial } from '../lib/kiban';

export const AboutUs = ({ testimonialsList }: { testimonialsList: KibanTestimonial[] }) => {
  const milestones = [
    { year: 'Anos 70', label: 'As Nossas Raízes', desc: 'Primeiros passos na comercialização de materiais pelos pais do Sr. Norberto Cabrita.' },
    { year: '1985', label: 'Fundação', desc: 'Fundação da Vale Paraíso — Materiais de Construção.' },
    { year: '1997', label: 'Exclusividade Recer', desc: 'Início da comercialização exclusiva de cerâmica de excelência.' },
    { year: '2000+', label: 'Expansão e Inovação', desc: 'Integração de marcas de referência e gama completa de remodelação.' },
  ];

  const testimonials = testimonialsList && testimonialsList.length > 0 ? testimonialsList : [
    {
      quote: 'O showroom é uma experiência única. Saímos com total clareza sobre o que escolher e porquê.',
      name: 'Ana Sousa',
      role: 'Designer de Interiores · Porto',
    },
    {
      quote: 'A Pavimat acompanhou-nos do design ao acabamento. A consultoria técnica fez toda a diferença.',
      name: 'Joana Ribeiro',
      role: 'Arquitecta · Coimbra',
    },
    {
      quote: 'Materiais de excelência, prazos cumpridos e uma equipa que sabe dar resposta a cada detalhe.',
      name: 'Carlos Mendes',
      role: 'Construtor · Aveiro',
    },
  ];

  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const activeTestimonial = testimonials[testimonialIdx] || testimonials[0];
  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="sobre" data-nav-theme="light" className="py-32 md:py-48 px-6 md:px-8 bg-brand-lilac overflow-hidden">
      <div className="max-w-7xl mx-auto">

        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase block mb-6"
        >
          Sobre
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-7xl lg:text-display font-black text-brand-green leading-[0.95] tracking-tight mb-20 md:mb-28 max-w-5xl"
        >
          Décadas de Tradição<br />
          e <span className="text-brand-orange italic font-medium">Excelência</span>
        </motion.h2>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 mb-24 md:mb-32">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-xl md:text-2xl font-bold text-brand-green leading-relaxed mb-6">
              A história da PAVIMAT (uma marca da Paraisodecor, Lda) é construída sobre alicerces sólidos e uma profunda paixão pelo setor da construção.
            </p>
            <p className="text-lg text-zinc-600 font-medium leading-relaxed">
              Com um percurso que atravessa gerações, o nosso maior orgulho é ter crescido lado a lado com os projetos e os sonhos dos nossos clientes.
            </p>
          </motion.div>
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 lg:pl-10 lg:border-l border-zinc-300/60"
          >
            <h4 className="text-xl font-bold text-brand-green mb-4">As Nossas Raízes</h4>
            <p className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">
              A nossa experiência nasce de uma autêntica herança familiar. Nos anos 70, os pais do nosso Sócio-Gerente, Sr. Norberto Cabrita, plantaram a semente do nosso futuro. Em 1985, o legado formalizou-se com a fundação da Vale Paraíso – Materiais de Construção (mais tarde evoluindo para a Pavimat), fornecendo as bases de qualquer grande obra.
            </p>
          </motion.aside>
        </div>

        <div className="py-12 md:py-16 mb-24 md:mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12">
            {milestones.map((m, idx) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="relative pt-10 pr-6 md:pr-10"
              >
                <div className="absolute top-2 left-0 w-full h-px bg-zinc-300/80" />
                <div className="absolute top-2 left-0 -translate-y-1/2 w-3 h-3 rounded-full bg-brand-orange z-10">
                  <div className="absolute inset-0 rounded-full bg-brand-orange animate-ping opacity-60" style={{ animationDuration: '2s' }} />
                </div>
                
                <div className="text-5xl md:text-6xl font-black text-brand-green tracking-tighter leading-none mb-3">
                  {m.year}
                </div>
                <div className="text-brand-orange text-eyebrow font-black uppercase tracking-eyebrow mb-2">
                  {m.label}
                </div>
                <div className="text-zinc-500 text-sm font-medium">
                  {m.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto text-center"
        >
          <span className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase mb-10 block">
            Quem trabalha connosco
          </span>

          <div className="relative min-h-[14rem] md:min-h-[16rem]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={testimonialIdx}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <blockquote className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-green leading-[1.15] tracking-tight mb-10">
                  <span className="text-brand-orange">"</span>
                  {activeTestimonial.quote}
                  <span className="text-brand-orange">"</span>
                </blockquote>
                <figcaption className="flex items-center justify-center gap-4 text-sm">
                  <span className="text-brand-green font-black uppercase tracking-wide">{activeTestimonial.name}</span>
                  <span className="w-8 h-px bg-zinc-300" />
                  <span className="text-zinc-500 font-medium">{activeTestimonial.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              aria-label="Testemunho anterior"
              className="p-2 rounded-full text-brand-green/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setTestimonialIdx(idx)}
                  aria-label={`Testemunho ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === testimonialIdx ? 'w-8 bg-brand-orange' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Testemunho seguinte"
              className="p-2 rounded-full text-brand-green/60 hover:text-brand-orange transition-colors cursor-pointer"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
