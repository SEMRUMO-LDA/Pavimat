import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  ChevronLeft,
  ChevronUp,
  ChevronDown,
  Layout,
  Menu, 
  X, 
  LayoutGrid, 
  Droplets, 
  Hammer, 
  Gem,
  Instagram,
  Linkedin,
  Facebook,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Truck,
  Star
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// --- Types ---
interface Category {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  imageUrl: string;
}

interface BrandPartner {
  name: string;
  category: string;
  url: string;
}

// --- Data ---
const categories: Category[] = [
  {
    id: 'ceramics',
    title: 'Cerâmicos e Revestimentos',
    description: 'A vanguarda em texturas e acabamentos para superfícies que contam histórias.',
    icon: <LayoutGrid className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'bath',
    title: 'Soluções de Banho',
    description: 'Design escandinavo e minimalismo funcional para o seu santuário particular.',
    icon: <Droplets className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'stone',
    title: 'Pedra Natural e Flutuantes',
    description: 'A nobreza da matéria-prima em harmonia com o conforto contemporâneo.',
    icon: <Gem className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'structural',
    title: 'Materiais Estruturais',
    description: 'Soluções robustas e tecnicamente superiores para a fundação do seu amanhã.',
    icon: <Hammer className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  }
];

const partners: BrandPartner[] = [
  { name: 'Recer', category: 'ceramics', url: 'https://www.recer.pt' },
  { name: 'Margres', category: 'ceramics', url: 'https://www.margres.com' },
  { name: 'Jacuzzi', category: 'bath', url: 'https://www.jacuzzi.pt' },
  { name: 'Sanindusa', category: 'bath', url: 'https://www.sanindusa.pt' },
  { name: 'Grohe', category: 'bath', url: 'https://www.grohe.pt' },
  { name: 'Silestone', category: 'stone', url: 'https://www.cosentino.com/silestone/' },
  { name: 'Weber', category: 'structural', url: 'https://www.pt.weber/' },
  { name: 'Sika', category: 'structural', url: 'https://prt.sika.com/' },
];

// --- Components ---

/**
 * Pavimat brand logo (inline SVG, fill="currentColor" so the colour follows
 * the parent's `color` style — used for navbar (white→orange on scroll) and
 * footer (always white). Source: public/img/SVG/pavimat-white.svg.
 */
const PavimatLogo = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 1273.8298 299.502"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Pavimat"
    className={className}
    fill="currentColor"
  >
    <path d="M0,299.502V49.9164h45.5917l4.3258,27.9542c6.4316-10.6498,14.8601-18.8025,25.2912-24.4593,10.4255-5.6579,21.6303-8.4857,33.611-8.4857,16.8571,0,31.4997,4.216,43.9266,12.6456,12.4225,8.433,22.0732,20.0807,28.9522,34.942,6.8733,14.8657,10.3156,32.0603,10.3156,51.5804,0,17.9705-2.5531,33.278-7.6537,45.9236-5.1062,12.6456-11.8708,23.0196-20.2994,31.1151-8.4341,8.1011-17.7519,14.0337-27.9531,17.8034-10.208,3.7697-20.3005,5.6579-30.2831,5.6579-10.4311,0-20.1334-1.997-29.1192-5.9898-8.9847-3.9939-16.5869-9.8694-22.7953-17.6375v78.5356H0ZM94.5102,200.334c13.0874,0,23.4602-4.8259,31.1151-14.4766,7.6537-9.6507,11.4806-22.7953,11.4806-39.4337s-3.8269-29.8357-11.4806-39.6008c-7.6549-9.7606-18.0277-14.6426-31.1151-14.6426-12.4281,0-22.2963,4.882-29.6182,14.6426-7.3207,9.7651-10.9817,22.9612-10.9817,39.6008s3.6609,29.783,10.9817,39.4337c7.3219,9.6507,17.1901,14.4766,29.6182,14.4766Z" />
    <path d="M288.6499,244.5937c-16.8627,0-31.78-4.3258-44.7586-12.9786-12.9786-8.6528-23.1283-20.6324-30.4502-35.9399-7.3207-15.3086-10.9817-32.8317-10.9817-52.5794,0-19.3014,3.5466-36.3256,10.6498-51.0826,7.0976-14.7514,16.8571-26.2892,29.2841-34.6089,12.4225-8.3198,26.7321-12.4785,42.9287-12.4785,12.4225,0,23.4613,2.3861,33.1121,7.1548,9.6507,4.7732,17.4704,11.3707,23.4613,19.8004l2.9949-21.9644h44.5927v189.6854h-44.5927l-2.9949-24.9582c-5.7723,9.3177-13.3116,16.6384-22.6294,21.9633s-19.5246,7.9868-30.6161,7.9868ZM298.3006,197.3391c12.4225,0,22.2963-4.8775,29.6171-14.6426,7.3219-9.7595,10.9817-22.9624,10.9817-39.6008s-3.6598-29.7841-10.9817-39.4349c-7.3207-9.6507-17.1946-14.4755-29.6171-14.4755-12.6456,0-22.6294,4.8248-29.9501,14.4755-7.3219,9.6507-10.9817,22.7953-10.9817,39.4349s3.6598,29.8413,10.9817,39.6008c7.3207,9.7651,17.3045,14.6426,29.9501,14.6426Z" />
    <path d="M494.4295,243.949c-9.9837,0-18.1936-3.551-24.6263-10.6486-6.4372-7.0976-12.8687-19.7432-19.3014-37.938l-52.5794-146.0906h55.5743l40.9329,125.7913,39.9327-125.7913h54.2434l-50.9155,145.4257c-6.4372,18.4168-12.8116,31.2294-19.1344,38.4358-6.3228,7.2075-14.3668,10.8157-24.1262,10.8157Z" />
    <rect x="598.4777" y="49.2717" width="53.9104" height="189.6854" />
    <path d="M665.412,239.6018v-113.1456c0-16.4153,3.3806-30.8336,10.1508-43.2617,6.7646-12.4214,16.1395-22.1808,28.1191-29.2841,11.9807-7.0976,25.7341-10.6486,41.2648-10.6486,13.9777,0,26.8408,2.885,38.6029,8.6517,11.7565,5.7723,21.2984,13.759,28.6191,23.9603,7.5394-10.2013,17.1385-18.188,28.7851-23.9603,11.6477-5.7667,24.346-8.6517,38.1039-8.6517,15.5261,0,29.1708,3.551,40.9317,10.6486,11.7565,7.1032,20.9654,16.8627,27.6212,29.2841,6.6558,12.4281,9.9837,26.8464,9.9837,43.2617v113.1456h-54.2434v-113.1456c0-10.2013-2.8861-18.521-8.6528-24.9582-5.7711-6.4316-13.5348-9.6507-23.2943-9.6507-9.542,0-17.3617,3.2191-23.4613,9.6507-6.1042,6.4372-9.1518,14.757-9.1518,24.9582v113.1456h-53.9104v-113.1456c0-10.2013-3.0521-18.521-9.1506-24.9582-6.1053-6.4316-14.0349-9.6507-23.7943-9.6507-9.542,0-17.3617,3.2191-23.4613,9.6507-6.1042,6.4372-9.1506,14.757-9.1506,24.9582v113.1456h-53.9115Z" />
    <path d="M1054.23,244.5893c-16.8627,0-31.78-4.3258-44.7586-12.9786-12.9786-8.6528-23.1283-20.6324-30.4502-35.9399-7.3207-15.3086-10.9817-32.8317-10.9817-52.5794,0-19.3014,3.5466-36.3256,10.6498-51.0826,7.0976-14.7514,16.8571-26.2892,29.2841-34.6089,12.4225-8.3198,26.7321-12.4785,42.9287-12.4785,12.4225,0,23.4613,2.3861,33.1121,7.1548,9.6507,4.7732,17.4704,11.3707,23.4613,19.8004l2.9949-21.9644h44.5927v189.6854h-44.5927l-2.9949-24.9582c-5.7723,9.3177-13.3116,16.6384-22.6294,21.9633-9.3177,5.3249-19.5246,7.9868-30.6161,7.9868ZM1063.8807,197.3348c12.4225,0,22.2963-4.8775,29.6171-14.6426,7.3219-9.7595,10.9817-22.9624,10.9817-39.6008s-3.6598-29.7841-10.9817-39.4349c-7.3207-9.6507-17.1946-14.4755-29.6171-14.4755-12.6456,0-22.6294,4.8248-29.9501,14.4755-7.3219,9.6507-10.9817,22.7953-10.9817,39.4349s3.6598,29.8413,10.9817,39.6008c7.3207,9.7651,17.3045,14.6426,29.9501,14.6426Z" />
    <path d="M1236.5818,239.6018c-15.5318,0-28.0103-4.7104-37.4379-14.1436-9.4321-9.4265-14.1436-21.9061-14.1436-37.4379v-94.8421h-19.492v-43.2617h19.492V0h53.9104v49.9164h34.9192v43.2617h-34.9192v85.5244c0,4.2171,1.3321,7.6549,3.9939,10.3168,2.6619,2.6619,5.9898,3.9928,9.9837,3.9928h20.9415v46.5896h-37.248Z" />
  </svg>
);

interface NavbarProps {
  onScrollTo: (id: string) => void;
  onCtaClick: (theme: ContactTheme) => void;
}

const Navbar = ({ onScrollTo, onCtaClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

  // Theme-aware colour: sections with `data-nav-theme="dark"` (Hero, Footer)
  // → white menu / white logo. Sections with "light" → green menu / orange logo.
  const [navTheme, setNavTheme] = useState<'dark' | 'light'>('dark');
  useEffect(() => {
    const NAV_PROBE_Y = 60; // y-coordinate just below the visible navbar
    const updateTheme = () => {
      const sections = document.querySelectorAll<HTMLElement>('[data-nav-theme]');
      let activeTheme: 'dark' | 'light' = 'dark';
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        // Skip hidden sections (e.g. hero curtain after GSAP sets display:none)
        if (rect.height === 0) return;
        // Active if the probe line falls inside this section's vertical range.
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

  // No-op: Lenis manages scroll. Setting body.overflow conflicts with Lenis's
  // smooth-scroll engine and was leaving the page blank when the menu opened.

  const menuItems = [
    { name: 'Produtos', id: 'colecoes' },
    { name: 'Sobre', id: 'sobre' },
    { name: 'Marcas', id: 'marcas' },
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
            className="flex items-center gap-2 cursor-pointer magnetic"
            onClick={() => {
              setIsOpen(false);
              onScrollTo('top');
            }}
          >
            <PavimatLogo className="h-6 md:h-7 w-auto" />
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-xs font-bold uppercase tracking-eyebrow">
            {menuItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => handleLinkClick(item.id)}
                className="hover:opacity-70 transition-opacity relative group cursor-pointer magnetic"
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* Header CTA — Orçamento (theme-aware: inverts on dark sections so it pops on the orange hero) */}
            <button
              onClick={() => handleCtaClick('orcamento')}
              className={`hidden sm:inline-flex items-center px-6 md:px-8 py-2 md:py-3 rounded-full text-eyebrow font-black uppercase tracking-widest transition-all active:scale-95 shadow-brand-medium cursor-pointer magnetic ${
                isDark
                  ? 'bg-white text-brand-orange hover:bg-white/90'
                  : 'bg-brand-orange text-white hover:bg-brand-green'
              }`}
            >
              Orçamento
            </button>

            {/* Burger Button — visible until lg (when the desktop menu kicks in) */}
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

      {/* Mobile Menu Overlay — portal wraps AnimatePresence so framer-motion
          can track enter/exit correctly (the inverse pattern breaks because
          AnimatePresence's child is a portal element, not the motion.div). */}
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
              {/* Center: menu links — vertically + horizontally centered */}
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

              {/* Bottom: socials + primary CTA — within thumb reach */}
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

interface HeroProps {
  onContactClick: (theme: ContactTheme) => void;
  onScrollTo: (id: string) => void;
}

const Hero = ({ onContactClick, onScrollTo }: HeroProps) => {
  // Loop: cycle through cards every 2.8s
  const heroCards = [
    { Icon: LayoutGrid, iconBg: 'bg-brand-orange', iconClass: 'text-white', title: 'Showroom 700m²', subtitle: 'Consultoria tátil e técnica.' },
    { Icon: ShieldCheck, iconBg: 'bg-brand-green', iconClass: 'text-white opacity-80', title: 'Qualidade Master', subtitle: 'Marcas líderes mundiais.' },
    { Icon: Truck, iconBg: 'bg-brand-black', iconClass: 'text-white', title: 'Frota Própria', subtitle: 'Logística rápida e segura.' },
    { Icon: Star, iconBg: 'bg-white', iconClass: 'text-brand-orange fill-current', title: 'DESDE 1994', subtitle: 'Décadas de experiência.' },
  ];
  const [activeCardIdx, setActiveCardIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCardIdx((prev) => (prev + 1) % heroCards.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [heroCards.length]);
  const activeCard = heroCards[activeCardIdx];
  const ActiveIcon = activeCard.Icon;

  return (
    <section data-nav-theme="dark" className="relative h-screen w-full bg-white z-40">
      <div className="relative h-full w-full overflow-hidden rounded-brand-hero shadow-[0_20px_80px_rgba(0,0,0,0.3)] z-10">
        <div className="absolute inset-0 z-0 bg-brand-orange overflow-hidden">
          {/* Ambient highlights — warm light + soft shadow for depth on orange */}
          <div className="absolute top-[5%] -right-[5%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[30%] -left-[10%] w-[900px] h-[900px] bg-brand-black/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />

          {/* Brand chevron — on mobile sits behind the cycling card area so the
              glassmorphism reads; on lg+ peeks from bottom-right of the floating cards. */}
          <svg
            viewBox="0 0 616.641 603.9885"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMaxYMax meet"
            className="absolute bottom-[5%] lg:bottom-[-128px] right-0 lg:-right-40 w-[88vw] lg:w-[95vw] max-w-[1100px] h-auto text-brand-green pointer-events-none"
          >
            <path
              fill="currentColor"
              d="M0,305.6806c0-31.6217,11.2478-57.6255,33.7313-77.9994,22.4775-20.392,62.5321-40.7658,120.1635-61.1397L616.6406,0v176.029s-398.4474,129.6515-398.4474,129.6515l398.4477,126.4925v171.8155s-460.6361-161.2727-460.6361-161.2727c-58.3368-20.3919-98.9218-40.5849-121.7489-60.6091C11.4287,362.0764,0,336.5971,0,305.6806Z"
            />
          </svg>
        </div>
        
        <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col pt-32 md:pt-32">
          {/* Main Content Area */}
          <div className="flex-grow flex flex-col lg:flex-row items-center justify-start lg:justify-between px-6 md:px-12 lg:px-20 gap-10 lg:gap-0">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-3/5"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-display font-black text-white leading-[0.95] mb-6 tracking-tight">
                Construa o seu<br />
                <span className="text-brand-green italic">Legado</span> de<br />
                Confiança.
              </h1>

              <p className="text-base md:text-xl text-white/90 font-medium mb-8 leading-relaxed max-w-xl">
                Fornecemos as bases sólidas para os seus projetos. Materiais certificados e aconselhamento especializado para quem exige excelência técnica.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onContactClick('especialista')}
                  className="bg-white hover:bg-white/90 text-brand-orange px-8 py-3.5 rounded-full text-eyebrow font-black uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer magnetic"
                >
                  Falar com especialista <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onScrollTo('colecoes')}
                  className="bg-transparent border border-white hover:bg-white hover:text-brand-orange text-white px-8 py-3.5 rounded-full text-eyebrow font-black uppercase tracking-widest transition-all cursor-pointer magnetic"
                >
                  Explorar Coleções
                </button>
              </div>
            </motion.div>

            {/* Mobile/Tablet: single card cycling — vertically centered in the space below the CTAs */}
            <div className="flex items-center justify-center w-full my-auto lg:hidden lg:my-0">
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
            </div>

            {/* Desktop: 4 floating cards in staggered absolute layout */}
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
                    className={`bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 magnetic w-[340px] ${positions[idx]}`}
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

          {/* Scroll Down Indicator */}
          <div className="pb-8 md:pb-12 flex justify-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 1 }}
              className="flex flex-col items-center gap-3 cursor-pointer group"
              onClick={() => onScrollTo('sobre')}
            >
              <span className="text-white/40 uppercase font-black text-eyebrow tracking-eyebrow group-hover:text-white transition-colors duration-300">
                Descobrir Mais
              </span>
              <div className="w-[18px] h-[30px] border-2 border-white/20 rounded-full flex justify-center p-1 group-hover:border-white/40 transition-colors duration-300">
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
                  className="w-1 h-1.5 bg-brand-orange rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * AboutUs V1 — original layout: 4 milestone cards on the left, storytelling on
 * the right. Kept here as a reference snapshot. Not rendered. The active
 * AboutUs export below replaces the cards with a testimonials block.
 */
const AboutUsV1 = () => {
  const cards = [
    {
      icon: <Star className="w-5 h-5 text-white" />,
      iconBg: 'bg-brand-orange',
      tag: 'ANOS 70',
      title: 'Herança Familiar',
      desc: 'Raízes profundas nos anos 70, evoluindo de uma empresa familiar para referência em materiais técnicos.'
    },
    {
      icon: <LayoutGrid className="w-5 h-5 text-white" />,
      iconBg: 'bg-brand-green',
      tag: 'MARCOS 1997',
      title: 'Expandir Horizontes',
      desc: 'Em 1997 iniciámos a exclusividade Recer, elevando a curadoria técnica de pavimentos em Portugal.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-white" />,
      iconBg: 'bg-brand-black',
      tag: 'PARCEIROS GLOBAIS',
      title: 'Soluções de Luxo',
      desc: 'Desde 2000 que oferecemos hidromassagem Jacuzzi e sanitários de design Sanindusa.'
    },
    {
      icon: <Layout className="w-5 h-5 text-white" />,
      iconBg: 'bg-brand-orange',
      tag: 'CONSULTORIA TÁTIL',
      title: 'Espaço Sensorial',
      desc: '700m² de showroom onde a estética e o acompanhamento técnico garantem o sucesso da sua obra.'
    }
  ];

  return (
    <section id="sobre" data-nav-theme="light" className="py-24 md:py-40 px-6 lg:px-12 bg-brand-lilac overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          
          {/* Left: Floating Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 order-2 lg:order-1">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white p-8 rounded-brand-card shadow-[0_15px_40px_rgba(0,0,0,0.04)] border-2 border-transparent transition-all duration-500 group relative overflow-hidden cursor-default
                  ${card.iconBg === 'bg-brand-orange' ? 'hover:border-brand-orange/30' : card.iconBg === 'bg-brand-green' ? 'hover:border-brand-green/30' : 'hover:border-zinc-800/30'}`}
              >
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-12 h-12 rounded-brand-icon ${card.iconBg} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <span className="text-eyebrow font-black text-zinc-300 tracking-eyebrow">{card.tag}</span>
                </div>
                
                <h4 className={`font-black text-lg mb-4 tracking-tight transition-colors duration-300
                  ${card.iconBg === 'bg-brand-orange' ? 'text-brand-green group-hover:text-brand-orange' : card.iconBg === 'bg-brand-green' ? 'text-brand-green group-hover:text-brand-green' : 'text-brand-green group-hover:text-zinc-800'}`}>
                  {card.title}
                </h4>
                
                <p className="text-zinc-400 text-xs leading-relaxed font-medium mb-6">
                  {card.desc}
                </p>
                
                <div className={`w-8 h-[2px] transition-all duration-500
                  ${card.iconBg === 'bg-brand-orange' ? 'bg-zinc-100 group-hover:bg-brand-orange group-hover:w-16' : card.iconBg === 'bg-brand-green' ? 'bg-zinc-100 group-hover:bg-brand-green group-hover:w-16' : 'bg-zinc-100 group-hover:bg-zinc-800 group-hover:w-16'}`} 
                />
              </motion.div>
            ))}
          </div>

          {/* Right: Storytelling Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Top Label */}
              <div className="flex items-center gap-6 mb-12">
                <span className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase whitespace-nowrap">
                  EST. 1985 / RAÍZES ANOS 70
                </span>
                <div className="w-full h-[1px] bg-zinc-200/50" />
              </div>

              {/* Headline */}
              <h2 className="text-5xl md:text-7xl lg:text-display font-black text-brand-green leading-[0.9] tracking-tighter mb-12">
                Onde a <br />
                <span className="text-brand-orange italic font-medium">Tradição</span> <br />
                Encontra a <br />
                Engenharia.
              </h2>

              {/* Quote Block */}
              <div className="border-l-4 border-brand-orange pl-8 mb-12">
                <p className="text-zinc-500 text-lg md:text-xl italic font-medium leading-relaxed">
                  "O nosso percurso começou nos anos 70 como uma empresa familiar, evoluindo da robustez dos materiais básicos para a sofisticação do design contemporâneo."
                </p>
              </div>

              {/* Narrative Text */}
              <div className="space-y-8 text-zinc-500 text-sm md:text-base font-medium leading-relaxed mb-16">
                <p>
                  Fundada originalmente como Vale Paraíso em 1985, a Pavimat consolidou-se através de parcerias estratégicas, como a exclusividade Recer em 1997.
                </p>
                <p>
                  Hoje, oferecemos soluções integrais: de cerâmicos a pastilha para piscina, passando por mobiliário de banho e sanitários de alto padrão. O nosso compromisso é o acompanhamento constante, garantindo que a visão técnica e a estética se unem em cada projeto.
                </p>
              </div>

              <div className="w-full h-[1px] bg-zinc-100 mb-12" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

/**
 * AboutUs V2 — storytelling on the right, customer testimonials on the left.
 * Replaces the milestone-cards layout with social proof.
 */
const AboutUs = () => {
  const testimonials = [
    {
      quote: 'A Pavimat acompanhou-nos do design ao acabamento. A consultoria técnica fez toda a diferença.',
      name: 'Joana Ribeiro',
      role: 'Arquiteta · Coimbra',
    },
    {
      quote: 'Materiais de excelência, prazos cumpridos e uma equipa que sabe responder a cada detalhe.',
      name: 'Carlos Mendes',
      role: 'Construtor · Aveiro',
    },
    {
      quote: 'O showroom é uma experiência. Saímos com clareza do que escolher e porquê.',
      name: 'Ana Sousa',
      role: 'Designer de Interiores · Porto',
    },
  ];

  return (
    <section id="sobre" data-nav-theme="light" className="py-24 md:py-40 px-6 lg:px-12 bg-brand-lilac overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">

          {/* Left: Testimonials — minimalist editorial style */}
          <div className="flex flex-col gap-10 order-2 lg:order-1">
            <span className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase block">
              O que dizem de nós
            </span>
            <div className="flex flex-col gap-10">
              {testimonials.map((t, idx) => (
                <motion.figure
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  viewport={{ once: true }}
                  className="border-l border-zinc-200 pl-6"
                >
                  <p className="text-zinc-600 text-base md:text-lg italic font-medium leading-relaxed mb-3">
                    "{t.quote}"
                  </p>
                  <figcaption className="text-zinc-400 text-xs font-medium tracking-wide">
                    <span className="text-brand-green font-black">{t.name}</span>
                    <span className="mx-2 text-zinc-300">·</span>
                    {t.role}
                  </figcaption>
                </motion.figure>
              ))}
            </div>
          </div>

          {/* Right: Storytelling Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Top Label */}
              <div className="flex items-center gap-6 mb-12">
                <span className="text-brand-orange font-black text-eyebrow tracking-eyebrow uppercase whitespace-nowrap">
                  EST. 1985 / RAÍZES ANOS 70
                </span>
                <div className="w-full h-[1px] bg-zinc-200/50" />
              </div>

              {/* Headline */}
              <h2 className="text-5xl md:text-7xl lg:text-display font-black text-brand-green leading-[0.9] tracking-tighter mb-12">
                Onde a <br />
                <span className="text-brand-orange italic font-medium">Tradição</span> <br />
                Encontra a <br />
                Engenharia.
              </h2>

              {/* Quote Block */}
              <div className="border-l-4 border-brand-orange pl-8 mb-12">
                <p className="text-zinc-500 text-lg md:text-xl italic font-medium leading-relaxed">
                  "O nosso percurso começou nos anos 70 como uma empresa familiar, evoluindo da robustez dos materiais básicos para a sofisticação do design contemporâneo."
                </p>
              </div>

              {/* Narrative Text */}
              <div className="space-y-8 text-zinc-500 text-sm md:text-base font-medium leading-relaxed mb-16">
                <p>
                  Fundada originalmente como Vale Paraíso em 1985, a Pavimat consolidou-se através de parcerias estratégicas, como a exclusividade Recer em 1997.
                </p>
                <p>
                  Hoje, oferecemos soluções integrais: de cerâmicos a pastilha para piscina, passando por mobiliário de banho e sanitários de alto padrão. O nosso compromisso é o acompanhamento constante, garantindo que a visão técnica e a estética se unem em cada projeto.
                </p>
              </div>

              <div className="w-full h-[1px] bg-zinc-100 mb-12" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

const ShowroomExperience = () => {
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const showroomImages = [
    {
      url: "/img/pavimat-showroom-out1.png",
      title: "Showroom Pavimat - Exterior"
    },
    {
      url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200",
      title: "Design de Interiores"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      title: "Pavimentos Modernos"
    },
    {
      url: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1200",
      title: "Espaços Gourmet"
    },
    {
      url: "https://images.unsplash.com/photo-1616489953149-75897fa94ee3?auto=format&fit=crop&q=80&w=1200",
      title: "Revestimentos de Luxo"
    },
    {
      url: "https://images.unsplash.com/photo-1616137422495-1e90558f2473?auto=format&fit=crop&q=80&w=1200",
      title: "Soluções Térmicas"
    }
  ];

  const nextImg = () => {
    setCurrentImgIndex((prev) => (prev + 1) % showroomImages.length);
  };

  const prevImg = () => {
    setCurrentImgIndex((prev) => (prev - 1 + showroomImages.length) % showroomImages.length);
  };

  return (
    <section id="showroom" data-nav-theme="light" className="py-20 md:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="text-brand-orange font-black uppercase text-eyebrow tracking-eyebrow mb-4 md:mb-6 inline-block">
                Espaço Inspiracional
              </span>
              <h2 className="text-3xl md:text-6xl font-black text-brand-green tracking-tight mb-6 md:mb-8 leading-[1.1]">
                Uma Experiência <br/>Sensorial <span className="text-brand-orange italic font-medium">Tátil</span>.
              </h2>
              <p className="text-zinc-500 mb-10 text-lg leading-relaxed font-medium">
                No nosso showroom de 700m², a matéria-prima ganha vida. Explore texturas, cores e acabamentos com o apoio da nossa equipa de consultoria especializada.
              </p>
              
              <div className="space-y-6 mb-12">
                {[
                  { title: 'Consultoria Técnica', desc: 'Apoio especializado na seleção de materiais e especificações.' },
                  { title: 'Amostras Exclusivas', desc: 'Vasta galeria de revestimentos, cerâmicos e pedras naturais.' }
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
                  onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Pavimat+Anadia+Malaposta', '_blank')}
                  className="bg-brand-green text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-orange hover:scale-105 transition-all shadow-2xl active:scale-95 cursor-pointer magnetic"
                >
                  Visitar o Showroom
                </button>
              </div>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative group">
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] rounded-brand-large overflow-hidden shadow-brand-deep border border-zinc-100 bg-zinc-50">
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
                  />
                </AnimatePresence>

                {/* Navigation Arrows — always visible on touch, fade-on-hover on desktop */}
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

              {/* Thumbnails */}
              <div className="relative mt-0">
                <div 
                  className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar py-8 md:py-14 px-6 md:px-12 -my-2 md:-my-4"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
                    WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
                  }}
                >
                  {showroomImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIndex(idx)}
                      className={`relative flex-shrink-0 w-28 md:w-32 aspect-video rounded-brand-tag transition-all duration-500 cursor-pointer ${
                        idx === currentImgIndex 
                          ? 'scale-110 z-10 shadow-2xl shadow-brand-orange/40 ring-2 ring-brand-orange' 
                          : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0 hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-brand-tag overflow-hidden">
                        <img 
                          src={img.url} 
                          alt="" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
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

interface DynamicShowcaseProps {
  onBrandCategoryClick?: (id: string) => void;
}

const DynamicShowcase = ({ onBrandCategoryClick }: DynamicShowcaseProps) => {
  const showcaseCategories = categories.slice(0, 4);
  const [activeCategory, setActiveCategory] = useState(showcaseCategories[0]);
  const activeIndex = showcaseCategories.findIndex(c => c.id === activeCategory.id);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll only the cards container — using element.scrollIntoView({block:'center'})
  // also bubbles up to the document/window, causing the whole page to shift.
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
      // Detect orientation: vertical scroll on lg+ (flex-col), horizontal on mobile (flex-row).
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
    <section id="colecoes" data-nav-theme="light" className="min-h-screen pt-28 pb-10 lg:pt-32 lg:pb-12 px-6 lg:px-12 bg-white overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full">
        {/* Header (Top) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 lg:mb-10 px-4 flex-shrink-0">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-orange font-black uppercase tracking-eyebrow text-eyebrow block mb-6 px-1 border-l-2 border-brand-orange"
            >
              Coleções de Excelência
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black text-brand-green tracking-tighter leading-[0.9]"
            >
              Onde a <span className="text-brand-orange italic font-medium">Técnica</span><br/>Eleva o Design.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-zinc-500 max-w-sm font-medium text-lg leading-relaxed"
          >
            Explore o detalhe técnico e a estética superior que sustenta os projetos mais exclusivos.
          </motion.p>
        </div>

        {/* Main Layout Area */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-0 lg:gap-24">
          
          {/* Left: Dynamic Image Display */}
          <div className="w-full lg:w-1/2 relative flex justify-center items-center">
            <div className="absolute inset-0 bg-brand-green/2 rounded-full blur-[100px] scale-75 md:scale-100 -z-10" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full aspect-square max-w-[380px] md:max-w-[480px]"
              >
                <div className="absolute inset-4 border border-brand-orange/20 rounded-full animate-spin-slow pointer-events-none" />
                <img
                   src={activeCategory.imageUrl}
                   alt={activeCategory.title}
                   className="w-full h-full object-cover rounded-full shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] border-[8px] md:border-[16px] border-white"
                   referrerPolicy="no-referrer"
                 />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Area: Cards + Indicator */}
          <div className="w-full lg:w-5/12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16 -mt-10 lg:mt-0 relative z-10">
            
            {/* Center-Right: Cards Container */}
            <div className="w-full relative lg:h-[500px]">
              <div
                ref={scrollRef}
                style={{ scrollPaddingLeft: '24px' }}
                className="w-screen lg:w-full -ml-6 lg:ml-0 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto h-full no-scrollbar snap-x snap-mandatory lg:snap-y pl-6 pr-6 py-12 lg:p-12 lg:pr-12 -my-12 lg:-m-12 scroll-smooth cards-mask"
              >
                {showcaseCategories.map((cat, idx) => {
                  const isActive = activeCategory.id === cat.id;
                  return (
                  <motion.div
                    key={cat.id}
                    data-category="true"
                    onClick={() => {
                      scrollToCard(idx);
                      setActiveCategory(cat);
                      if (onBrandCategoryClick) {
                        onBrandCategoryClick(cat.id);
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
                      <span className={`text-eyebrow font-black uppercase tracking-widest mb-2 block transition-colors ${isActive ? 'text-brand-orange' : 'text-zinc-400'}`}>
                        0{idx + 1} &mdash; Linha
                      </span>
                      <h4 className="text-brand-green font-black text-lg md:text-xl mb-2 tracking-tight leading-tight">
                         {cat.title}
                      </h4>
                      <p className="text-xs md:text-sm text-zinc-500 font-medium leading-relaxed">
                        {cat.description}
                      </p>
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

            {/* Far-Right: Indicator Line (Desktop Only) */}
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
                  >
                    <div className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border-2 transition-all duration-500 group-hover/dot:scale-150 ${
                      i <= activeIndex 
                        ? 'bg-brand-orange border-brand-orange shadow-[0_0_15px_rgba(255,107,0,0.6)]' 
                        : 'bg-white border-zinc-200 hover:border-brand-orange'
                    }`} />
                  </button>
                ))}
              </div>

              {/* Previous arrow — top of the indicator */}
              <button
                type="button"
                aria-label="Coleção anterior"
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

              {/* Next arrow — bottom of the indicator */}
              <button
                type="button"
                aria-label="Coleção seguinte"
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

interface BrandScrollerProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const BrandScroller = ({ activeTab, setActiveTab }: BrandScrollerProps) => {
  const filteredPartners = partners.filter(p => p.category === activeTab);
  
  // Create a robust set of items (repeat enough times to cover any width, then double for loop)
  const baseItems = filteredPartners.length > 0 ? [...filteredPartners, ...filteredPartners, ...filteredPartners] : [];
  const trackItems = [...baseItems, ...baseItems];

  return (
    <section id="marcas" data-nav-theme="light" className="py-24 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <h3 className="text-eyebrow font-black uppercase tracking-eyebrow text-zinc-300 mb-8">
          Parceiros de Confiança
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-5 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold text-eyebrow uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20'
                  : 'bg-zinc-50 text-zinc-300 hover:text-brand-green'
              }`}
            >
              {cat.id === 'ceramics' ? 'Cerâmicos' : 
               cat.id === 'bath' ? 'Soluções Banho' : 
               cat.id === 'stone' ? 'Pedra e Madeira' : 'Estruturais'}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-full flex overflow-hidden group">
        {/* Shadow Overlays */}
        <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-16 py-4 animate-infinite-scroll flex-nowrap">
          {trackItems.map((partner, idx) => (
            <a 
              key={`${activeTab}-${idx}`} 
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 text-4xl md:text-6xl font-black text-zinc-100 uppercase whitespace-nowrap hover:text-brand-orange transition-colors cursor-pointer select-none px-4 no-underline"
            >
              {partner.name}
            </a>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes infiniteScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infiniteScroll 30s linear infinite;
          display: flex;
          width: max-content;
        }
        .group:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}} />
    </section>
  );
};

interface FooterProps {
  contactTheme: ContactTheme;
  setContactTheme: (theme: ContactTheme) => void;
}

const Footer = ({ contactTheme, setContactTheme }: FooterProps) => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const themes: { id: ContactTheme; label: string; icon: string }[] = [
    { id: 'especialista', label: 'Especialista', icon: '📞' },
    { id: 'orcamento', label: 'Orçamento', icon: '📄' },
    { id: 'showroom', label: 'Showroom', icon: '✨' },
    { id: 'outro', label: 'Outro', icon: '✉️' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <footer id="contactos" data-nav-theme="dark" className="relative text-white py-24 px-6 lg:px-12 overflow-hidden">
      {/* ── BG LAYER ── (mirrors the hero pattern: solid canvas + ambient
          highlights + chevron all in a single absolute z-0 layer, separated
          from the content layer so backdrop-filter sees through cleanly) */}
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

      {/* ── CONTENT LAYER ── */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* CTA Section Integrated in Footer */}
        <div className="relative mb-24 pb-24 border-b border-white/10">
          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.div
                key="footer-cta-form"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
              >
                <div>
                  <span className="text-brand-orange font-black uppercase text-xs tracking-eyebrow mb-8 block">Projectar o Futuro</span>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter">
                    Vamos Iniciar o seu <br />
                    <span className="text-brand-orange italic font-medium">Próximo Legado</span>.
                  </h2>
                  <p className="text-zinc-300 text-lg md:text-xl font-medium mb-12 max-w-xl leading-relaxed">
                    Trabalhamos em estreita colaboração com arquitetos e promotores para garantir a máxima qualidade técnica em cada metro quadrado.
                  </p>

                  <ul className="space-y-5 text-zinc-200 font-medium">
                    <li className="flex items-center gap-4">
                      <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                      <span>+351 239 000 000</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
                      <span>geral@pavimat.pt</span>
                    </li>
                    <li className="flex items-center gap-4">
                      <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0" />
                      <span>Rua Principal, 400 — 3000-001 Coimbra, Portugal</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-brand-green/40 backdrop-blur-xl border border-white/10 p-6 md:p-8 lg:p-12 rounded-brand-large shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <form onSubmit={handleSubmit} className="space-y-8">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1">Nome</label>
                        <input required type="text" className="w-full bg-white/10 border border-white/20 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/60" placeholder="Nome Completo" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1">Email</label>
                        <input required type="email" className="w-full bg-white/10 border border-white/20 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/60" placeholder="exemplo@mail.com" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-eyebrow uppercase tracking-eyebrow text-white font-black ml-1">Mensagem</label>
                      <textarea required rows={4} className="w-full bg-white/10 border border-white/20 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/60 resize-none" placeholder="Conte-nos sobre o seu projeto..." />
                    </div>
                    <button type="submit" className="w-full bg-brand-orange text-white py-6 rounded-brand-input font-black uppercase text-xs tracking-eyebrow hover:bg-white hover:text-brand-green transition-all shadow-brand-medium active:scale-95 flex items-center justify-center gap-4 group">
                      Enviar mensagem <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="footer-success-msg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10 md:py-20 flex flex-col items-center"
              >
                <div className="w-20 h-20 bg-brand-orange rounded-full flex items-center justify-center mb-8 shadow-2xl">
                  <Check size={40} className="text-white" />
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter">Mensagem Enviada!</h2>
                <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-md mx-auto leading-relaxed">
                  Obrigado pelo seu interesse. Um dos nossos especialistas entrará em contacto muito brevemente.
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

        {/* Brand zone (col 1) gets explicit separation from the utility columns */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-12 lg:gap-24 mb-16">
          {/* Brand block */}
          <div>
            <div
              role="img"
              aria-label="Pavimat"
              className="mb-8 bg-brand-orange"
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
              Elevando a arquitetura desde 1970 com materiais que definem padrões de luxo e durabilidade.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-brand bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-all shadow-brand-soft hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Utility columns — Soluções, Empresa, Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            <div>
              <h4 className="text-lg font-bold mb-8">Soluções</h4>
              <ul className="space-y-4 text-zinc-300 font-medium">
                {['Cerâmicos', 'Sanitários', 'Cozinhas', 'Pavimentos', 'Construção'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-8">Empresa</h4>
              <ul className="space-y-4 text-zinc-300 font-medium">
                {['Sobre Nós', 'Showroom', 'Carreiras', 'Projetos', 'Contacto'].map(item => (
                  <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-zinc-300 text-sm font-medium leading-relaxed mb-6">
                Novidades sobre coleções, projetos e eventos no showroom.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  // TODO: wire up to email service
                }}
                className="space-y-3"
              >
                <label htmlFor="newsletter-email" className="sr-only">Email</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  placeholder="o.seu@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-brand-input px-5 py-3.5 text-white placeholder:text-white/30 focus:border-brand-orange outline-none transition-colors text-sm"
                />
                <button
                  type="submit"
                  className="w-full bg-brand-orange text-white py-3.5 rounded-brand-input text-eyebrow font-black uppercase tracking-eyebrow hover:bg-white hover:text-brand-green transition-colors flex items-center justify-center gap-2"
                >
                  Subscrever <ArrowRight size={14} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-white font-medium">
          <p>© 2024 Pavimat S.A. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-brand-orange transition-colors">Privacidade</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};



export type ContactTheme = 'especialista' | 'orcamento' | 'showroom' | 'outro';

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [activeBrandTab, setActiveBrandTab] = useState<string>(categories[0].id);
  const [contactTheme, setContactTheme] = useState<ContactTheme>('especialista');

  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    lenisRef.current = lenis;

    // Keep ScrollTrigger in sync with Lenis's smooth scroll
    lenis.on('scroll', ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useGSAP(() => {
    // Hero Curtain Reveal: page is pinned at the top while the hero (overlay) slides up.
    gsap.to(".hero-curtain", {
      yPercent: -105, // Slightly more to ensure shadow is gone
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: ".content-overlay",
        pinSpacing: true,
        scrub: 1,
        snap: {
          snapTo: 1,
          duration: 1.2,
          ease: "power3.inOut"
        },
        onLeave: () => gsap.set(".hero-curtain", { display: "none" }),
        onEnterBack: () => gsap.set(".hero-curtain", { display: "block" }),
        invalidateOnRefresh: true
      }
    });

    // Skew effect on scroll for images
    let proxy = { skew: 0 },
        skewSetter = gsap.quickSetter(".parallax-img", "skewY", "deg"),
        clamp = gsap.utils.clamp(-2, 2);

    ScrollTrigger.create({
      onUpdate: (self) => {
        let skew = clamp(self.getVelocity() / -400);
        if (Math.abs(skew) > Math.abs(proxy.skew)) {
          proxy.skew = skew;
          gsap.to(proxy, {
            skew: 0,
            duration: 0.8,
            ease: "power3",
            overwrite: true,
            onUpdate: () => skewSetter(proxy.skew)
          });
        }
      }
    });

    // Parallax Images
    const parallaxImages = document.querySelectorAll('.parallax-img');
    parallaxImages.forEach((img) => {
      gsap.to(img, {
        yPercent: -15,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Magnetic Buttons
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach((el) => {
      el.addEventListener('mousemove', (e: any) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(el, {
          x: x * 0.4,
          y: y * 0.4,
          duration: 0.5,
          ease: "power2.out"
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });
  }, { scope: containerRef });

  const handleScrollToSection = (id: string) => {
    // Lenis controls scroll — use its scrollTo so the smooth-scroll engine
    // actually animates to the target (native scrollIntoView gets overridden
    // by Lenis's RAF loop).
    const lenis = lenisRef.current;
    if (id === 'top') {
      if (lenis) lenis.scrollTo(0, { duration: 1.4 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (!element) return;

    if (!lenis) {
      element.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Compute the document offset via the offsetTop chain. getBoundingClientRect
    // returns the *visual* position, which is wrong during the curtain pin —
    // every section reads 1 viewport short of its post-pin scroll target.
    let target = 0;
    let cur: HTMLElement | null = element;
    while (cur) {
      target += cur.offsetTop;
      cur = cur.offsetParent as HTMLElement | null;
    }

    // .content-overlay is pinned with pinSpacing: true, which adds one viewport
    // of phantom scroll before the content. Compensate when target is inside it.
    const overlay = document.querySelector('.content-overlay');
    if (overlay?.contains(element)) {
      target += window.innerHeight;
    }

    lenis.scrollTo(target, { duration: 1.4 });
  };

  const handleGoToContact = (theme: ContactTheme) => {
    setContactTheme(theme);
    handleScrollToSection('contactos');
  };

  return (
    <div 
      ref={containerRef}
      className="relative selection:bg-brand-orange/30 selection:text-brand-green bg-white"
    >
      <Navbar onScrollTo={handleScrollToSection} onCtaClick={handleGoToContact} />

      {/* Page Content — sits at the top of the document, hidden under the hero curtain
          until the hero slides up. ScrollTrigger pins this in place during the reveal,
          so the page is perfectly stationary while only the hero moves. */}
      <div className="content-overlay relative z-10 bg-white">
        <DynamicShowcase onBrandCategoryClick={(catId) => {
          setActiveBrandTab(catId);
          handleScrollToSection('marcas');
        }} />
        <AboutUs />
        <BrandScroller activeTab={activeBrandTab} setActiveTab={setActiveBrandTab} />
        <ShowroomExperience />
        <Footer
          contactTheme={contactTheme}
          setContactTheme={setContactTheme}
        />
      </div>

      {/* Hero — fixed overlay above the content. Animates upward on scroll to
          reveal the (pinned) page beneath it. */}
      <div className="hero-curtain fixed inset-x-0 top-0 h-screen z-30 will-change-transform">
        <Hero onContactClick={handleGoToContact} onScrollTo={handleScrollToSection} />
      </div>
    </div>
  );
}
