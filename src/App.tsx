import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
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

interface NavbarProps {
  onScrollTo: (id: string) => void;
  onCtaClick: (theme: ContactTheme) => void;
}

const Navbar = ({ onScrollTo, onCtaClick }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const textColor = useTransform(scrollY, [0, 100], ["#FFFFFF", "#006F42"]);
  const navBg = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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
          <div
            className="flex items-center gap-2 cursor-pointer magnetic"
            onClick={() => {
              setIsOpen(false);
              onScrollTo('top');
            }}
          >
            <span className="text-2xl md:text-3xl font-black tracking-[-0.05em]">pavimat</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-eyebrow">
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
            {/* Header CTA — Orçamento */}
            <button
              onClick={() => handleCtaClick('orcamento')}
              className="hidden sm:inline-flex items-center bg-brand-orange text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-eyebrow font-black uppercase tracking-widest hover:bg-brand-green transition-all active:scale-95 shadow-brand-medium cursor-pointer magnetic"
            >
              Orçamento
            </button>

            {/* Burger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-current hover:opacity-70 transition-opacity z-[80]"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[65] bg-white pt-32 px-8 flex flex-col items-center justify-start h-screen overflow-hidden"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {menuItems.map((item, idx) => (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                  key={item.name}
                  onClick={() => handleLinkClick(item.id)}
                  className="text-3xl font-black text-brand-green uppercase tracking-tighter hover:text-brand-orange transition-colors"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 pt-8 border-t border-zinc-100 w-full flex flex-col items-center gap-6"
              >
                <div className="flex gap-6">
                  <Instagram className="text-zinc-300 hover:text-brand-orange transition-colors cursor-pointer" size={24} />
                  <Linkedin className="text-zinc-300 hover:text-brand-orange transition-colors cursor-pointer" size={24} />
                </div>
                <button
                  onClick={() => handleCtaClick('orcamento')}
                  className="w-full bg-brand-orange text-white py-5 rounded-full text-xs font-black uppercase tracking-eyebrow shadow-brand-deep"
                >
                  Orçamento
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface HeroProps {
  onContactClick: (theme: ContactTheme) => void;
  onScrollTo: (id: string) => void;
}

const Hero = ({ onContactClick, onScrollTo }: HeroProps) => {
  return (
    <section className="relative h-screen w-full bg-white z-40">
      <div className="relative h-full w-full overflow-hidden rounded-brand-hero shadow-[0_20px_80px_rgba(0,0,0,0.3)] z-10">
        <div className="absolute inset-0 z-0 bg-brand-orange overflow-hidden">
          {/* Ambient highlights — warm light + soft shadow for depth on orange */}
          <div className="absolute top-[5%] -right-[5%] w-[800px] h-[800px] bg-white/10 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[30%] -left-[10%] w-[900px] h-[900px] bg-brand-black/20 rounded-full blur-[150px] animate-pulse" style={{ animationDuration: '12s' }} />

          {/* Brand chevron — anchored bottom-right, peeks from behind the cards */}
          <svg
            viewBox="0 0 616.641 603.9885"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            preserveAspectRatio="xMaxYMax meet"
            className="absolute -bottom-32 -right-40 w-[95vw] max-w-[1100px] h-auto text-brand-green pointer-events-none"
          >
            <path
              fill="currentColor"
              d="M0,305.6806c0-31.6217,11.2478-57.6255,33.7313-77.9994,22.4775-20.392,62.5321-40.7658,120.1635-61.1397L616.6406,0v176.029s-398.4474,129.6515-398.4474,129.6515l398.4477,126.4925v171.8155s-460.6361-161.2727-460.6361-161.2727c-58.3368-20.3919-98.9218-40.5849-121.7489-60.6091C11.4287,362.0764,0,336.5971,0,305.6806Z"
            />
          </svg>
        </div>
        
        <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col pt-24 md:pt-32">
          {/* Main Content Area */}
          <div className="flex-grow flex flex-col lg:flex-row items-center justify-between px-6 md:px-20">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-full lg:w-3/5"
            >
              <h1 className="text-5xl sm:text-6xl md:text-display font-black text-white leading-[0.95] mb-8 tracking-tight">
                Construa o seu<br />
                <span className="text-brand-orange italic drop-shadow-[0_0_30px_rgba(255,90,0,0.3)]">Legado</span> de<br />
                Confiança.
              </h1>
              
              <p className="text-lg md:text-xl text-white/90 font-medium mb-10 leading-relaxed max-w-xl">
                Fornecemos as bases sólidas para os seus projetos.<br className="hidden md:block" />
                Materiais certificados e aconselhamento<br className="hidden md:block" />
                especializado para quem exige excelência técnica.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onContactClick('especialista')}
                  className="bg-brand-orange hover:bg-brand-orange/90 text-white px-8 py-3.5 rounded-full text-eyebrow font-black uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer magnetic"
                >
                  Falar com especialista <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onScrollTo('colecoes')}
                  className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-3.5 rounded-full text-eyebrow font-black uppercase tracking-widest transition-all cursor-pointer magnetic"
                >
                  Explorar Coleções
                </button>
              </div>
            </motion.div>

            {/* Right Content - Floating Cards */}
            <div className="hidden lg:block w-full lg:w-5/12 relative h-[550px]">

              {/* Card 1 - Showroom */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute top-0 right-4 bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[340px] z-10 magnetic"
              >
                <div className="w-16 h-16 rounded-brand-icon bg-brand-orange flex items-center justify-center flex-shrink-0 shadow-lg">
                  <LayoutGrid className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-0.5 tracking-tight">Showroom 700m²</h4>
                  <p className="text-white/60 text-sm">Consultoria tátil e técnica.</p>
                </div>
              </motion.div>

              {/* Card 2 - Qualidade Master */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-[130px] left-0 bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[340px] z-10 magnetic"
              >
                <div className="w-16 h-16 rounded-brand-icon bg-brand-green flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-white w-8 h-8 opacity-80" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-0.5 tracking-tight">Qualidade Master</h4>
                  <p className="text-white/60 text-sm">Marcas líderes mundiais.</p>
                </div>
              </motion.div>

              {/* Card 3 - Frota Própria */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
                className="absolute top-[260px] right-0 bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[340px] z-10 magnetic"
              >
                <div className="w-16 h-16 rounded-brand-icon bg-brand-black flex items-center justify-center flex-shrink-0">
                  <Truck className="text-white w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-0.5 tracking-tight">Frota Própria</h4>
                  <p className="text-white/60 text-sm">Logística rápida e segura.</p>
                </div>
              </motion.div>

              {/* Card 4 - Desde 1994 */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute top-[390px] left-12 bg-brand-green/40 backdrop-blur-xl border border-white/10 p-4 rounded-brand-large flex items-center gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] w-[340px] z-10 magnetic"
              >
                <div className="w-16 h-16 rounded-brand-icon bg-white flex items-center justify-center flex-shrink-0 shadow-xl">
                  <Star className="text-brand-orange w-8 h-8 fill-current" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-0.5 tracking-tight">DESDE 1994</h4>
                  <p className="text-white/60 text-sm">Décadas de experiência.</p>
                </div>
              </motion.div>
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

const AboutUs = () => {
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
    <section id="sobre" className="py-24 md:py-40 px-6 lg:px-12 bg-brand-lilac overflow-hidden relative">
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
              <h2 className="text-5xl md:text-display font-black text-brand-green leading-[0.9] tracking-tighter mb-12">
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
    <section id="showroom" className="py-20 md:py-32 px-6 lg:px-12 bg-white">
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
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "anticipate" }}
                    src={showroomImages[currentImgIndex].url}
                    alt={showroomImages[currentImgIndex].title}
                    className="w-full h-full object-cover parallax-img"
                    referrerPolicy="no-referrer"
                  />
                </AnimatePresence>
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Navigation Arrows */}
                <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => { e.stopPropagation(); prevImg(); }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-brand-orange hover:scale-110 transition-all active:scale-90"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); nextImg(); }}
                    className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-brand-orange hover:scale-110 transition-all active:scale-90"
                  >
                    <ChevronRight size={24} />
                  </button>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <motion.div
                    key={`info-${currentImgIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-eyebrow font-black uppercase tracking-eyebrow bg-brand-orange px-3 py-1.5 rounded-full mb-3 inline-block shadow-lg">
                      Espaço Showroom
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black tracking-tight leading-none">
                      {showroomImages[currentImgIndex].title}
                    </h3>
                  </motion.div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="relative mt-0">
                <div 
                  className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar py-14 px-12 -my-4"
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

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const children = Array.from(container.children).filter(
        (child) => (child as HTMLElement).getAttribute('data-category') === 'true'
      ) as HTMLElement[];
      
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closest: { category: any; distance: number } | null = null;

      children.forEach((child, idx) => {
        const rect = child.getBoundingClientRect();
        const childCenter = rect.top + rect.height / 2;
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
    <section id="colecoes" className="min-h-screen py-10 lg:py-12 px-6 lg:px-12 bg-white overflow-hidden flex flex-col justify-center">
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
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          
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
                
                {/* Floating Micro-Badge */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-brand-green text-white px-6 py-2 rounded-full shadow-2xl flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
                  <span className="text-eyebrow font-black uppercase tracking-widest whitespace-nowrap">Especificação Premium</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Area: Cards + Indicator */}
          <div className="w-full lg:w-5/12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Center-Right: Cards Container */}
            <div className="w-full relative lg:h-[500px]">
              <div 
                ref={scrollRef}
                className="w-full flex lg:flex-col gap-4 md:gap-6 overflow-x-auto lg:overflow-y-auto h-full no-scrollbar snap-x lg:snap-y p-8 md:p-12 -m-8 md:-m-12 scroll-smooth"
                style={{
                  paddingTop: '35%',
                  paddingBottom: '35%',
                  maskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 15%, black 85%, transparent)'
                }}
              >
                {showcaseCategories.map((cat, idx) => (
                  <motion.div
                    key={cat.id}
                    data-category="true"
                    onClick={() => {
                      if (scrollRef.current) {
                        const target = scrollRef.current.children[idx] as HTMLElement;
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                      setActiveCategory(cat);
                      if (onBrandCategoryClick) {
                        onBrandCategoryClick(cat.id);
                      }
                    }}
                    className={`flex-shrink-0 snap-center cursor-pointer flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-brand-large transition-all text-left w-[260px] md:w-full group relative border ${
                      activeCategory.id === cat.id
                        ? 'bg-white shadow-brand-medium border-zinc-100 opacity-100'
                        : 'opacity-20 hover:opacity-100 bg-white/50 backdrop-blur-sm border-transparent'
                    }`}
                  >
                    <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex-shrink-0 overflow-hidden border-2 transition-all duration-500 ${
                      activeCategory.id === cat.id ? 'border-brand-orange scale-110 shadow-brand-soft' : 'border-zinc-200'
                    }`}>
                      <img 
                        src={cat.imageUrl} 
                        className={`w-full h-full object-cover transition-transform duration-700 ${activeCategory.id === cat.id ? 'scale-110' : 'scale-100'}`} 
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    
                    <div className="relative z-10">
                      <span className={`text-eyebrow font-black uppercase tracking-widest mb-1 transition-colors ${activeCategory.id === cat.id ? 'text-brand-orange' : 'text-zinc-400'}`}>
                        0{idx + 1} &mdash; Linha
                      </span>
                      <h4 className="text-brand-green font-black text-lg md:text-xl mb-2 tracking-tight">
                         {cat.title}
                      </h4>
                      <p className="text-xs text-zinc-500 font-medium leading-relaxed max-w-[200px] md:max-w-[240px]">
                        {cat.description}
                      </p>
                    </div>

                    {activeCategory.id === cat.id && (
                      <motion.div 
                        layoutId="active-nav-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-brand-orange rounded-full hidden md:block"
                      />
                    )}
                  </motion.div>
                ))}
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
                      if (scrollRef.current) {
                        const target = scrollRef.current.children[i] as HTMLElement;
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
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

              <div className="absolute -bottom-10 flex flex-col items-center gap-1">
                <span className="text-eyebrow font-black text-zinc-300 uppercase tracking-widest">Capacidade</span>
                <span className="text-sm font-black text-brand-green tabular-nums">0{showcaseCategories.length}</span>
              </div>
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
    <section id="marcas" className="py-24 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <h3 className="text-eyebrow font-black uppercase tracking-eyebrow text-zinc-300 mb-8">
          Parceiros de Confiança
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-8 py-3 rounded-full font-bold text-eyebrow uppercase tracking-widest transition-all cursor-pointer ${
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
    <footer id="contactos" className="relative text-white py-24 px-6 lg:px-12 overflow-hidden">
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
                  <h2 className="text-4xl md:text-7xl font-black text-white leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter">
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

                <div className="bg-brand-green/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-brand-large shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="space-y-4">
                      <label className="text-eyebrow uppercase tracking-eyebrow text-white/50 font-black ml-1 block">Assunto</label>
                      <div className="flex flex-wrap gap-2.5">
                        {themes.map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setContactTheme(t.id)}
                            className={`px-5 py-2.5 rounded-full text-eyebrow font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${
                              contactTheme === t.id
                                ? 'bg-brand-orange text-white shadow-lg'
                                : 'bg-white/10 border border-white/10 text-white/40 hover:text-white hover:bg-white/20'
                            }`}
                          >
                            <span className="text-sm">{t.icon}</span>
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <label className="text-eyebrow uppercase tracking-eyebrow text-white/50 font-black ml-1">Nome</label>
                        <input required type="text" className="w-full bg-white/10 border border-white/10 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/20" placeholder="Nome Completo" />
                      </div>
                      <div className="space-y-3">
                        <label className="text-eyebrow uppercase tracking-eyebrow text-white/50 font-black ml-1">Email</label>
                        <input required type="email" className="w-full bg-white/10 border border-white/10 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/20" placeholder="exemplo@mail.com" />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-eyebrow uppercase tracking-eyebrow text-white/50 font-black ml-1">Mensagem</label>
                      <textarea required rows={4} className="w-full bg-white/10 border border-white/10 rounded-brand-input px-6 py-4 text-white focus:border-brand-orange outline-none transition-all placeholder:text-white/20 resize-none" placeholder="Conte-nos sobre o seu projeto..." />
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-black tracking-tighter">PAVIMAT</span>
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
            </div>
            <p className="text-zinc-100 font-medium mb-8 leading-relaxed">
              Elevando a arquitetura desde 1970 com materiais que definem padrões de luxo e durabilidade.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Facebook].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 rounded-brand bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-all shadow-brand-soft hover:-translate-y-1">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

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
            <h4 className="text-lg font-bold mb-8">Contacto</h4>
            <ul className="space-y-6 text-zinc-300 font-medium text-sm">
              <li className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>Rua Principal, 400<br/>3000-001 Coimbra, Portugal</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>+351 239 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-orange flex-shrink-0" />
                <span>geral@pavimat.pt</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-zinc-400 font-medium">
          <p>© 2024 Pavimat S.A. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white">Privacidade</a>
            <a href="#" className="hover:text-white">Termos de Uso</a>
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
