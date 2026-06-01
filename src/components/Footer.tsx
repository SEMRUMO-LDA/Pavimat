import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Check, ArrowRight, Instagram, Facebook } from 'lucide-react';
import { ContactTheme, Category } from '../types';

export interface FooterProps {
  contactTheme: ContactTheme;
  setContactTheme: (theme: ContactTheme) => void;
  onSubmitContact: (name: string, email: string, message: string, subject: string) => Promise<boolean>;
  onSubscribeNewsletter: (email: string) => Promise<boolean>;
  categoriesList: Category[];
  onCategoryClick: (catId: string) => void;
  onScrollTo: (sectionId: string) => void;
}

export const Footer = ({ 
  contactTheme, 
  setContactTheme, 
  onSubmitContact, 
  onSubscribeNewsletter,
  categoriesList,
  onCategoryClick,
  onScrollTo
}: FooterProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const themes: { id: ContactTheme; label: string; icon: string }[] = [
    { id: 'especialista', label: 'Especialista', icon: '📞' },
    { id: 'orcamento', label: 'Orçamento', icon: '📄' },
    { id: 'showroom', label: 'Showroom', icon: '✨' },
    { id: 'outro', label: 'Outro', icon: '✉️' },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('nome') as string;
    const email = formData.get('email') as string;
    const message = formData.get('mensagem') as string;
    const subject = themes.find(t => t.id === contactTheme)?.label || contactTheme;

    try {
      const success = await onSubmitContact(name, email, message, subject);
      if (success) {
        setFormSubmitted(true);
      } else {
        setFormError('Ocorreu um erro ao submeter o formulário. Por favor, tente novamente.');
      }
    } catch (err: any) {
      setFormError(err.message || 'Erro de ligação ao servidor.');
    } finally {
      setFormLoading(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setNewsletterStatus('loading');
    try {
      const success = await onSubscribeNewsletter(newsletterEmail);
      if (success) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 5000);
      } else {
        setNewsletterStatus('error');
        setTimeout(() => setNewsletterStatus('idle'), 4000);
      }
    } catch {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 4000);
    }
  };

  return (
    <footer id="contactos" data-nav-theme="dark" className="relative text-white py-24 px-6 md:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-brand-green overflow-hidden">
        <div className="absolute top-[10%] -right-[10%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-[20%] -left-[10%] w-[900px] h-[900px] bg-brand-black/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '14s' }} />
        <svg
          viewBox="0 0 616.641 603.9885"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          preserveAspectRatio="xMaxYMax meet"
          className="absolute top-0 -right-40 w-[95vw] max-w-[1100px] h-auto text-brand-orange pointer-events-none"
        >
          <path
            fill="currentColor"
            d="M0,305.6806c0-31.6217,11.2478-57.6255,33.7313-77.9994,22.4775-20.392,62.5321-40.7658,120.1635-61.1397L616.6406,0v176.029s-398.4474,129.6515-398.4474,129.6515l398.4477,126.4925v171.8155s-460.6361-161.2727-460.6361-161.2727c-58.3368-20.3919-98.9218-40.5849-121.7489-60.6091C11.4287,362.0764,0,336.5971,0,305.6806Z"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative mb-24 pb-24 border-b border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase block mb-6">CONTACTOS</span>
              <h2 className="text-4xl md:text-7xl lg:text-display font-black text-white leading-[0.95] tracking-tight mb-8 md:mb-12">
                A base sólida <br />
                para a sua <br />
                <span className="text-brand-orange italic font-medium">próxima obra</span>
              </h2>
              <p className="text-zinc-300 text-lg md:text-xl font-medium mb-12 max-w-xl leading-relaxed">
                Traga-nos a sua planta ou ideia. Apoiamos arquitectos, designers e construtores com rigor técnico e os materiais certos, validados por décadas de experiência no sector.
              </p>

              <ul className="space-y-5 text-zinc-200 font-medium">
                <li className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <a 
                    href="tel:+351289587313" 
                    className="hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    +351 289 587 313 <span className="text-xs text-white/50 block font-normal">(chamada para a rede fixa nacional)</span>
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <a 
                    href="mailto:escritorio@pavimat.pt" 
                    className="hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    escritorio@pavimat.pt
                  </a>
                </li>
                <li className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0" />
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Pavimat+Vale+Para%C3%ADso+Albufeira" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-brand-orange transition-colors focus:outline-none"
                  >
                    VALE PARAISO, 8200-567 Albufeira, Portugal
                  </a>
                </li>
              </ul>
            </motion.div>

            <div className="bg-brand-green/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 lg:p-12 rounded-brand-large shadow-[0_20px_50px_rgba(0,0,0,0.3)] min-h-[480px] flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="footer-cta-form"
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="space-y-3">
                      <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1 block">Assunto</label>
                      <div className="flex flex-wrap gap-x-8 gap-y-3 border-b border-white/30">
                        {themes.map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setContactTheme(t.id)}
                            className={`relative pb-3 text-eyebrow font-black uppercase tracking-widest transition-colors ${
                              contactTheme === t.id
                                ? 'text-brand-orange'
                                : 'text-white hover:text-brand-orange'
                            }`}
                          >
                            {t.label}
                            {contactTheme === t.id && (
                              <span className="absolute -bottom-px left-0 right-0 h-0.5 bg-brand-orange" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                    {formError && (
                      <div className="text-sm font-semibold bg-red-500/10 border border-red-500/20 px-6 py-4 rounded-brand-input text-red-400">
                        {formError}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1">Nome</label>
                        <input required name="nome" type="text" className="w-full bg-white/10 border border-white/20 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/60" placeholder="Nome Completo" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1">Email</label>
                        <input required name="email" type="email" className="w-full bg-white/10 border border-white/20 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/60" placeholder="exemplo@mail.com" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1">Mensagem</label>
                      <textarea required name="mensagem" rows={4} className="w-full bg-white/10 border border-white/20 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/60 resize-none" placeholder="Conte-nos sobre o seu projecto..." />
                    </div>
                    <button type="submit" disabled={formLoading} className="w-full bg-brand-orange text-white py-6 rounded-brand-input font-black uppercase text-xs tracking-eyebrow hover:bg-white hover:text-brand-green transition-all shadow-brand-medium active:scale-95 flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed">
                      {formLoading ? 'A enviar...' : 'Enviar mensagem'}
                      {!formLoading && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="footer-success-msg"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="text-center py-6 flex flex-col items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-brand-orange rounded-full flex items-center justify-center mb-6 shadow-xl">
                      <Check size={32} className="text-white" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight">Mensagem Enviada!</h3>
                    <p className="text-zinc-300 text-sm md:text-base mb-8 max-w-sm mx-auto leading-relaxed">
                      Obrigado pelo seu interesse. Um dos nossos especialistas entrará em contacto consigo muito brevemente.
                    </p>
                    <button 
                      onClick={() => setFormSubmitted(false)}
                      className="text-brand-orange font-black uppercase text-xs tracking-widest hover:text-white transition-colors"
                    >
                      Enviar nova mensagem
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12 lg:gap-24 mb-16">
          <div>
            <div
              role="button"
              aria-label="Pavimat"
              className="mb-8 bg-brand-orange cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => {
                window.location.href = '/';
              }}
              style={{
                maskImage: 'url(/img/SVG/pavimat-logo-tagline.svg)',
                WebkitMaskImage: 'url(/img/SVG/pavimat-logo-tagline.svg)',
                maskSize: 'contain',
                WebkitMaskSize: 'contain',
                maskRepeat: 'no-repeat',
                WebkitMaskRepeat: 'no-repeat',
                maskPosition: 'left center',
                WebkitMaskPosition: 'left center',
                width: '240px',
                height: '64px',
              }}
            />
            <p className="text-zinc-100 font-medium mb-8 leading-relaxed max-w-[260px]">
              A sua referência em cerâmica, banho e materiais de construção desde 1985.
            </p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: 'https://www.instagram.com/pavimat.pt' },
                { Icon: Facebook, href: 'https://fb.com/pavimat.pt' }
              ].map(({ Icon, href }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-12 h-12 rounded-brand bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-all shadow-brand-soft hover:-translate-y-1"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h4 className="text-lg font-bold mb-8">Soluções</h4>
              <ul className="space-y-4 text-zinc-300 font-medium">
                {categoriesList.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => onCategoryClick(cat.id)}
                      className="hover:text-white transition-colors text-left font-medium focus:outline-none transition-all hover:translate-x-1"
                    >
                      {cat.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Empresa</h4>
              <ul className="space-y-4 text-zinc-300 font-medium">
                {[
                  { name: 'Produtos', action: () => onScrollTo('colecoes') },
                  { name: 'Marcas', action: () => onScrollTo('marcas') },
                  { name: 'Sobre', action: () => onScrollTo('sobre') },
                  { name: 'Showroom', action: () => onScrollTo('showroom') },
                  { name: 'Recrutamento', action: null, href: 'mailto:escritorio@pavimat.pt' }
                ].map(item => (
                  <li key={item.name}>
                    {item.action ? (
                      <button 
                        onClick={item.action} 
                        className="hover:text-white transition-colors text-left font-medium focus:outline-none transition-all hover:translate-x-1"
                      >
                        {item.name}
                      </button>
                    ) : (
                      <a href={item.href} className="hover:text-white transition-colors block transition-all hover:translate-x-1">
                        {item.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-6">
                Novidades sobre produtos, projectos e eventos no showroom.
              </p>
              <form
                onSubmit={handleNewsletterSubmit}
                className="space-y-3"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="o.seu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-brand-input px-5 py-3.5 text-white placeholder:text-white/30 focus:border-brand-orange outline-none transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={newsletterStatus === 'loading'}
                  className="w-full bg-brand-orange text-white py-3.5 rounded-brand-input text-eyebrow font-black uppercase tracking-eyebrow hover:bg-white hover:text-brand-green transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {newsletterStatus === 'loading' ? 'A enviar...' :
                   newsletterStatus === 'success' ? 'Subscrito!' :
                   newsletterStatus === 'error' ? 'Erro. Tentar novamente' : 'Subscrever'}
                  {newsletterStatus === 'idle' && <ArrowRight size={14} />}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-4 text-sm text-white font-medium">
          <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-y-2 sm:gap-x-2">
            <p>© {new Date().getFullYear()} PARAISODECOR, LDA. Todos os direitos reservados.</p>
            <span className="hidden sm:inline" aria-hidden="true">—</span>
            <p>
              Desenvolvido por{' '}
              <a
                href="https://aorubro.pt/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-black hover:text-brand-orange transition-colors"
              >
                AORUBRO
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2 sm:gap-8">
            <a href="#" className="hover:text-brand-orange transition-colors">Política de Privacidade & Cookies</a>
            <a
              href="https://www.livroreclamacoes.pt/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-orange transition-colors"
            >
              Livro de Reclamações Online
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
