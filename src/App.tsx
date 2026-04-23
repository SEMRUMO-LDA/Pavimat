import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  ArrowRight, 
  ChevronRight, 
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
  MapPin
} from 'lucide-react';

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

const Navbar = ({ onScrollTo }: { onScrollTo: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const textColor = useTransform(scrollY, [0, 100], ["#FFFFFF", "var(--color-brand-green)"]);
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

  return (
    <>
      <motion.nav 
        style={{ color: isOpen ? "var(--color-brand-green)" : textColor, backgroundColor: isOpen ? "transparent" : navBg }}
        className={`fixed top-0 left-0 right-0 z-[70] px-6 md:px-8 py-5 md:py-6 flex items-center justify-between w-full ${!isOpen ? 'glass' : ''} shadow-none transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setIsOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <span className="text-2xl md:text-3xl font-black tracking-[-0.05em]">pavimat</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10 text-[10px] font-bold uppercase tracking-[0.2em]">
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
              onClick={() => handleLinkClick('contactos')}
              className="hidden sm:block bg-brand-orange text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-brand-green transition-all active:scale-95 shadow-brand-medium cursor-pointer"
            >
              Orcamento
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
                  onClick={() => handleLinkClick('contactos')}
                  className="w-full bg-brand-orange text-white py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-brand-deep"
                >
                  Pedir Orçamento
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full bg-white z-40">
      <div className="relative h-full w-full overflow-hidden bg-brand-orange rounded-brand-hero shadow-brand-hero z-10">
        {/* Background Graphic Shapes - Now Full Screen */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
            <rect width="1920" height="1080" fill="var(--color-brand-orange)" />
            
            {/* Left organic shape */}
            <motion.path
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              d="M-100 -100 L 400 -100 C 400 400, 300 1000, -100 1100 Z"
              fill="var(--color-brand-green)"
            />
            
            <motion.path
              initial={{ x: 200, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              d="M1920 200 C 1300 250, 900 600, 1920 1000 L 2200 1000 L 2200 200 Z"
              fill="var(--color-brand-green)"
            />
          </svg>
        </div>

        <div className="relative z-10 h-full max-w-7xl mx-auto flex flex-col pt-24 md:pt-32">
          {/* Content Overlay */}
          <div className="flex-grow flex flex-col justify-center px-6 md:px-20 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[1.1] md:leading-[0.95] mb-6 md:mb-8 tracking-tight">
                Materiais de<br/>
                Construção<br/>
                de Confiança.
              </h1>
              
              <p className="text-lg md:text-2xl text-white font-medium mb-10 md:mb-12 leading-relaxed max-w-xl opacity-90">
                Fornecemos as bases sólidas para os seus projetos. Materiais certificados e aconselhamento especializado para quem exige o melhor.
              </p>
            </motion.div>
          </div>

          <div className="pb-16 flex justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center gap-4 text-white/40 uppercase font-black text-[10px] tracking-[0.5em]"
              >
                Explorar
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  const stats = [
    { label: 'Anos de Experiência', value: '25+' },
    { label: 'Projetos Realizados', value: '1.2k' },
    { label: 'Especialistas', value: '45' },
    { label: 'Showroom', value: '700m²' }
  ];

  return (
    <section id="sobre" className="py-20 md:py-32 px-6 lg:px-12 bg-brand-lilac overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-brand-large overflow-hidden shadow-brand-deep aspect-[4/5] z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=1200" 
                alt="Architecture and materials"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-green/20" />
            </motion.div>
            
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-brand-orange p-6 md:p-10 rounded-brand shadow-brand-deep z-20 text-white max-w-[220px] md:max-w-[280px]"
            >
              <span className="text-[10px] font-black uppercase tracking-widest block mb-2 md:mb-4">A Nossa Missão</span>
              <p className="text-lg md:text-xl font-bold leading-tight">
                Transformamos visões arquitetónicas em realidades tangíveis e duradouras.
              </p>
            </motion.div>

            {/* Background decorative element */}
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-brand-green/5 rounded-full blur-3xl -z-10" />
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-6 inline-block">
                Fundada em 1998
              </span>
              <h2 className="text-4xl md:text-6xl font-black text-brand-green tracking-tight mb-8 leading-[1.1]">
                Onde a <br/>Herança Encontra a <span className="text-brand-orange italic font-medium">Inovação</span>.
              </h2>
              <p className="text-zinc-500 mb-8 text-lg leading-relaxed font-medium">
                Com mais de duas décadas de liderança no mercado, a Pavimat consolidou-se como o parceiro preferencial para os projetos mais exigentes de Portugal. A nossa história é escrita através da seleção rigorosa da matéria-prima e de um acompanhamento técnico sem paralelo.
              </p>
              <p className="text-zinc-500 mb-12 text-lg leading-relaxed font-medium">
                Não fornecemos apenas materiais; oferecemos o conhecimento técnico que garante que cada escolha estética é suportada por uma performance estrutural superior.
              </p>

              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-5xl font-black text-brand-green mb-1 tracking-tighter">
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-black text-brand-orange uppercase tracking-widest">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ShowroomExperience = () => {
  return (
    <section id="showroom" className="py-20 md:py-32 px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-xl"
            >
              <span className="text-brand-orange font-black uppercase text-[10px] tracking-[0.4em] mb-4 md:mb-6 inline-block">
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
                      <ChevronRight className="text-brand-orange" />
                    </div>
                    <div>
                      <h4 className="font-black text-brand-green uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                      <p className="text-zinc-400 text-sm font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => window.open('https://www.google.com/maps/dir/?api=1&destination=Pavimat+Anadia+Malaposta', '_blank')}
                className="bg-brand-green text-white px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest hover:bg-brand-orange hover:scale-105 transition-all shadow-2xl active:scale-95 cursor-pointer"
              >
                Visitar o Showroom
              </button>
            </motion.div>
          </div>

          <div className="order-1 lg:order-2 relative group h-[500px] md:h-[600px]">
            <div className="absolute -inset-4 bg-brand-orange/5 rounded-brand-large blur-2xl group-hover:bg-brand-orange/10 transition-colors" />
            <div className="relative h-full w-full overflow-hidden rounded-brand-large shadow-brand-deep border border-zinc-100">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200" 
                alt="Showroom Pavimat"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-10 left-10 p-2">
                <div className="flex gap-3 items-center">
                  <div className="flex -space-x-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-brand-soft">
                        <img src={`https://i.pravatar.cc/100?img=${i+45}`} alt="Expert" />
                      </div>
                    ))}
                  </div>
                  <div className="glass px-4 py-2 rounded-full">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">Equipa de Especialistas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => {
  return (
    <section className="py-20 md:py-32 px-6 lg:px-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative bg-brand-green rounded-brand-large p-8 md:p-12 lg:p-24 overflow-hidden border border-white/10 shadow-brand-deep">
          {/* Animated Background Element */}
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] pointer-events-none"
          />
          
          <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="text-brand-orange font-black uppercase text-xs tracking-[0.5em] mb-8 md:mb-10">Solicite Orçamento</span>
            <h2 className="text-4xl md:text-8xl font-black text-white leading-[1.1] md:leading-[0.9] mb-8 md:mb-12 tracking-tighter">
              Vamos Projetar o seu <span className="text-brand-orange italic font-medium">Próximo Legado</span>.
            </h2>
            <p className="text-zinc-300 text-lg md:text-xl font-medium mb-16 max-w-2xl leading-relaxed">
              Trabalhamos em estreita colaboração com arquitetos e promotores para garantir a máxima qualidade técnica em cada metro quadrado.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button className="bg-brand-orange text-white px-14 py-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-white hover:text-brand-green transition-all shadow-brand-medium active:scale-95 flex items-center gap-4">
                Falar com Especialista <ArrowRight size={18} />
              </button>
              <button className="bg-transparent border border-white/20 text-white px-14 py-6 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-white/10 transition-all active:scale-95">
                Ver Portefólio
              </button>
            </div>
          </div>

          <div className="absolute bottom-[-10%] left-[-5%] w-64 h-64 bg-white/5 rounded-full blur-[60px]" />
        </div>
      </div>
    </section>
  );
};

const DynamicShowcase = () => {
  const showcaseCategories = categories.slice(0, 4);
  const [activeCategory, setActiveCategory] = useState(showcaseCategories[0]);
  const activeIndex = showcaseCategories.findIndex(c => c.id === activeCategory.id);

  return (
    <section id="colecoes" className="min-h-screen py-20 px-6 lg:px-12 bg-white overflow-hidden flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header (Top) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-4">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-brand-orange font-black uppercase tracking-[0.5em] text-[10px] block mb-6 px-1 border-l-2 border-brand-orange"
            >
              Coleções de Excelência
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-brand-green tracking-tighter leading-[0.9]"
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
                className="relative w-full aspect-square max-w-[400px] md:max-w-[550px]"
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
                  <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Especificação Premium</span>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Area: Cards + Indicator */}
          <div className="w-full lg:w-5/12 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            
            {/* Center-Right: Cards Container */}
            <div className="w-full flex lg:flex-col gap-4 md:gap-5 overflow-x-auto lg:overflow-y-auto lg:h-[480px] no-scrollbar snap-x lg:snap-y pb-6 lg:pb-0 px-2 lg:px-0 scroll-smooth pr-6">
              {showcaseCategories.map((cat, idx) => (
                <motion.button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex-shrink-0 snap-center lg:snap-start flex items-center gap-4 md:gap-6 p-5 md:p-6 rounded-brand-large transition-all text-left w-[260px] md:w-full group relative overflow-hidden border ${
                    activeCategory.id === cat.id
                      ? 'bg-white shadow-brand-medium border-zinc-100'
                      : 'opacity-40 hover:opacity-100 bg-white/50 backdrop-blur-sm border-transparent'
                  }`}
                  whileHover={activeCategory.id !== cat.id && window.innerWidth > 1024 ? { x: 10, backgroundColor: 'rgba(255,255,255,0.8)' } : {}}
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
                    <span className={`text-[10px] font-black uppercase tracking-widest mb-1 transition-colors ${activeCategory.id === cat.id ? 'text-brand-orange' : 'text-zinc-400'}`}>
                      0{idx + 1} &mdash; Linha
                    </span>
                    <h4 className="text-brand-green font-black text-lg md:text-xl mb-2 tracking-tight">
                       {cat.title}
                    </h4>
                    <p className="text-[11px] md:text-xs text-zinc-500 font-medium leading-relaxed max-w-[200px] md:max-w-[240px]">
                      {cat.description}
                    </p>
                  </div>

                  {activeCategory.id === cat.id && (
                    <motion.div 
                      layoutId="active-nav-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-12 bg-brand-orange rounded-full hidden md:block"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Far-Right: Indicator Line (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-center h-[350px] w-16 relative">
              <div className="w-[1px] h-full bg-zinc-100 rounded-full overflow-hidden">
                <motion.div 
                  className="w-full bg-brand-orange"
                  initial={{ height: 0 }}
                  animate={{ height: `${((activeIndex + 1) / showcaseCategories.length) * 100}%` }}
                />
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-between py-2 pointer-events-none">
                {showcaseCategories.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full border-2 transition-colors ${i <= activeIndex ? 'bg-brand-orange border-brand-orange shadow-[0_0_10px_rgba(255,107,0,0.5)]' : 'bg-white border-zinc-200'}`} />
                ))}
              </div>

              <div className="absolute -bottom-10 flex flex-col items-center gap-1">
                <span className="text-[9px] font-black text-zinc-300 uppercase tracking-widest">Capacidade</span>
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

const BrandScroller = () => {
  const [activeTab, setActiveTab] = useState<string>(categories[0].id);

  const filteredPartners = partners.filter(p => p.category === activeTab);
  
  // Create a robust set of items (repeat enough times to cover any width, then double for loop)
  const baseItems = filteredPartners.length > 0 ? [...filteredPartners, ...filteredPartners, ...filteredPartners] : [];
  const trackItems = [...baseItems, ...baseItems];

  return (
    <section id="marcas" className="py-24 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center mb-16">
        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-8">
          Parceiros de Confiança
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-8 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === cat.id 
                  ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/20' 
                  : 'bg-zinc-50 text-gray-400 hover:text-brand-green'
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

const Footer = () => {
  return (
    <footer id="contactos" className="relative bg-brand-green text-white py-24 px-6 lg:px-12 overflow-hidden">
      {/* Custom Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" preserveAspectRatio="center slice" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(500, 200)">
            {/* Left Shape */}
            <path 
              d="M -600,-150 L -200,0 L -600,150 Q -100,0 -600,-150" 
              fill="var(--color-brand-orange)" 
              opacity="0.8"
            />
            {/* Right Shape */}
            <path 
              d="M 600,-150 L 200,0 L 600,150 Q 100,0 600,-150" 
              fill="var(--color-brand-orange)" 
              opacity="0.8"
            />
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-8">
              <span className="text-3xl font-black tracking-tighter">PAVIMAT</span>
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
            </div>
            <p className="text-gray-400 font-medium mb-8 leading-relaxed">
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
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Cerâmicos', 'Sanitários', 'Cozinhas', 'Pavimentos', 'Construção'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Empresa</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {['Sobre Nós', 'Showroom', 'Carreiras', 'Projetos', 'Contacto'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-8">Contacto</h4>
            <ul className="space-y-6 text-gray-400 font-medium text-sm">
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

        <div className="pt-8 border-top border-white/10 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-500 font-medium">
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

const MainContent = () => {
  return (
    <>
      <DynamicShowcase />
      <AboutUs />
      <BrandScroller />
      <ShowroomExperience />
      <CTASection />
      <Footer />
    </>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const [vh, setVh] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVh(window.innerHeight);
    const handleResize = () => {
      setVh(window.innerHeight);
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // Set a timeout to ensure dynamic content Is rendered before measuring
    const timer = setTimeout(handleResize, 500);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  // 1. Hero Lift: Moves from 0 up past the viewport to hide shadow completely
  const heroY = useTransform(scrollY, [0, vh], [0, -(vh + 200)]);
  
  // 2. Content Scroll: Stays at 0 until scroll exceeds vh, then matches scroll speed
  const contentY = useTransform(scrollY, (value) => {
    if (value <= vh) return 0;
    return -(value - vh);
  });

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // The scroll position in the main window needs to be vh + element.offsetTop
      // because the content only begins to move after vh.
      window.scrollTo({
        top: vh + element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div 
      className="relative selection:bg-brand-orange/30 selection:text-brand-green bg-white"
      style={{ height: vh + contentHeight }} // Total scrollable height
    >
      <Navbar onScrollTo={handleScrollToSection} />
      
      <main className="relative">
        {/* Layer 1: The Hero "Cover" (No fade, lifts completely) */}
        <motion.div 
          style={{ y: heroY }}
          className="fixed top-0 left-0 w-full h-screen z-40 bg-white"
        >
          <Hero />
        </motion.div>

        {/* 
          Layer 0: The Rest of the Content revealed Underneath
          Stays static (contentY = 0) during the first vh of scroll.
        */}
        <motion.div 
          ref={contentRef}
          style={{ y: contentY }}
          className="fixed top-0 left-0 w-full z-10 bg-white"
        >
          <MainContent />
        </motion.div>
      </main>
    </div>
  );
}

