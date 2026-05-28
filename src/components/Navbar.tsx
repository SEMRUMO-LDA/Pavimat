import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Menu, X, Instagram, Linkedin } from 'lucide-react';
import { PavimatLogo } from './PavimatLogo';
import { ContactTheme } from '../types';

interface NavbarProps {
  onScrollTo: (id: string) => void;
  onCtaClick: (theme: ContactTheme) => void;
}

export const Navbar = ({ onScrollTo, onCtaClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const NAV_PROBE_Y = 60;
    const updateTheme = () => {
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let activeTheme: 'dark' | 'light' = 'dark';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.height === 0) return;
        if (rect.top <= NAV_PROBE_Y && rect.bottom > NAV_PROBE_Y) {
          activeTheme = (section.getAttribute('data-nav-theme') as 'dark' | 'light') ?? 'dark';
        }
      });
      setNavTheme(activeTheme);
    };
    updateTheme();
    window.addEventListener('scroll', updateTheme, { passive: true });
    window.addEventListener('resize', updateTheme);
    return () => {
      window.removeEventListener('scroll', updateTheme);
      window.removeEventListener('resize', updateTheme);
    };
  }, []);

  const isDark = navTheme === 'dark';
  const textColor = isDark ? '#FFFFFF' : '#006F42';
  const logoColor = isDark ? '#FFFFFF' : '#FF6600';

  const menuItems = [
    { name: 'Produtos', id: 'colecoes' },
    { name: 'Marcas', id: 'marcas' },
    { name: 'Sobre', id: 'sobre' },
    { name: 'Showroom', id: 'showroom' },
    { name: 'Contactos', id: 'contactos' }
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onScrollTo(id);
  };

  const handleCtaClick = (theme: ContactTheme) => {
    setIsOpen(false);
    onCtaClick(theme);
  };

  return (
    <>
      <motion.nav 
        style={{ color: isOpen ? "var(--color-brand-green)" : textColor, backgroundColor: isOpen ? "transparent" : navBg }}
        className={`fixed top-0 left-0 right-0 z-[70] px-6 md:px-8 py-5 md:py-6 flex items-center justify-between w-full ${!isOpen ? 'glass' : ''} shadow-none transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <motion.div
            style={{ color: isOpen ? '#FF6600' : logoColor }}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            <PavimatLogo className="h-6 md:h-7 w-auto" />
          </motion.div>

          <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm font-bold uppercase tracking-wider">
            {menuItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleLinkClick(item.id)}
                className="hover:opacity-70 transition-opacity relative group cursor-pointer"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => handleCtaClick('orcamento')}
              className={`hidden sm:inline-flex items-center px-6 md:px-8 py-2 md:py-3 rounded-full text-eyebrow font-black uppercase tracking-widest transition-all active:scale-95 shadow-brand-medium cursor-pointer ${
                isDark
                  ? 'bg-white text-brand-orange hover:bg-white/90'
                  : 'bg-brand-orange text-white hover:bg-brand-green'
              }`}
            >
              Orçamento
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fechar menu' : 'Abrir menu'}
              className="lg:hidden p-2 text-current hover:opacity-70 transition-opacity z-[80]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-0 z-[65] bg-white flex flex-col"
              style={{ paddingTop: 'max(6rem, env(safe-area-inset-top, 6rem))', paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 2rem))' }}
            >
              <nav className="flex-1 flex flex-col justify-center items-center gap-8 px-8">
                {menuItems.map((item, idx) => (
                  <motion.button
                    key={item.name}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + idx * 0.07, duration: 0.4 }}
                    onClick={() => handleLinkClick(item.id)}
                    className="text-4xl font-black uppercase tracking-tighter transition-colors hover:text-brand-orange"
                    style={{ color: '#006F42' }}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + menuItems.length * 0.07, duration: 0.4 }}
                className="px-8 flex flex-col items-center gap-6"
              >
                <div className="flex gap-6">
                  <Instagram className="text-zinc-400 hover:text-brand-orange transition-colors cursor-pointer" size={22} />
                  <Linkedin className="text-zinc-400 hover:text-brand-orange transition-colors cursor-pointer" size={22} />
                </div>
                <button
                  type="button"
                  onClick={() => handleCtaClick('orcamento')}
                  className="w-full max-w-md bg-brand-orange text-white py-5 rounded-full text-eyebrow font-black uppercase tracking-eyebrow shadow-brand-deep hover:bg-brand-green transition-colors"
                >
                  Orçamento
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
