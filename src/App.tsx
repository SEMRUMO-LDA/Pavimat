import React, { useState, useEffect, useRef } from 'react';
import * as LucideIcons from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  getCategories,
  getPartners,
  getTestimonials,
  getShowroomImages,
  submitContactForm,
  subscribeNewsletter,
  getHeroConfig,
  getSEOSettings,
  KibanHeroConfig,
  KibanSEOSettings,
  KibanTestimonial,
  KibanShowroomImage
} from './lib/kiban';
import { useGSAP } from '@gsap/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import { Category, BrandPartner, ContactTheme } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ShowroomExperience } from './components/ShowroomExperience';
import { DynamicShowcase } from './components/DynamicShowcase';
import { BrandScroller } from './components/BrandScroller';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

// Helper to render Lucide icons dynamically from a string name
const getIconNode = (iconName: string): React.ReactNode => {
  const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.HelpCircle;
  return <IconComponent className="w-6 h-6" />;
};

const defaultCategories: Category[] = [
  {
    id: 'pavimentos-e-revestimentos',
    title: 'Pavimentos e Revestimentos',
    description: 'Texturas, formatos e acabamentos que definem o carácter de cada espaço.',
    icon: <LucideIcons.LayoutGrid className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'casa-de-banho',
    title: 'Casa de Banho',
    description: 'Sanitários, hidromassagem e mobiliário com a precisão dos grandes nomes europeus.',
    icon: <LucideIcons.Droplets className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'materiais-de-construcao',
    title: 'Materiais de Construção',
    description: 'A base técnica de cada obra — argamassas, impermeabilização e soluções de fundação.',
    icon: <LucideIcons.Hammer className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'mobiliario-e-decoracao',
    title: 'Mobiliário e Decoração',
    description: 'Pedras nobres e pavimentos flutuantes para interiores que duram gerações.',
    icon: <LucideIcons.Gem className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 'ferramentas-e-drogaria',
    title: 'Ferramentas e Drogaria',
    description: 'Ferramentas profissionais, acessórios e produtos de drogaria para todos os trabalhos em obra.',
    icon: <LucideIcons.Hammer className="w-6 h-6" />,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800'
  }
];

const defaultPartners: BrandPartner[] = [
  { name: 'Recer',     category: 'pavimentos-e-revestimentos', url: 'https://www.recer.pt' },
  { name: 'Margres',   category: 'pavimentos-e-revestimentos', url: 'https://www.margres.com' },
  { name: 'Jacuzzi',   category: 'casa-de-banho',              url: 'https://www.jacuzzi.pt' },
  { name: 'Sanindusa', category: 'casa-de-banho',              url: 'https://www.sanindusa.pt' },
  { name: 'Grohe',     category: 'casa-de-banho',              url: 'https://www.grohe.pt' },
  { name: 'Silestone', category: 'pavimentos-e-revestimentos', url: 'https://www.cosentino.com/silestone/' },
  { name: 'Weber',     category: 'materiais-de-construcao',    url: 'https://www.pt.weber/' },
  { name: 'Sika',      category: 'materiais-de-construcao',    url: 'https://prt.sika.com/' },
];

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const [categoriesList, setCategoriesList] = useState<Category[]>(defaultCategories);
  const [partnersList, setPartnersList] = useState<BrandPartner[]>(defaultPartners);
  const [testimonialsList, setTestimonialsList] = useState<KibanTestimonial[]>([]);
  const [showroomImagesList, setShowroomImagesList] = useState<KibanShowroomImage[]>([]);
  const [activeBrandTab, setActiveBrandTab] = useState<string>(defaultCategories[0].id);
  const [contactTheme, setContactTheme] = useState<ContactTheme>('especialista');
  const [heroConfig, setHeroConfig] = useState<KibanHeroConfig | null>(null);
  const [seoSettings, setSeoSettings] = useState<KibanSEOSettings | null>(null);

  useEffect(() => {
    const fetchCmsData = async () => {
      // Execute all independent API calls concurrently using Promise.allSettled
      // This prevents the "waterfall" effect and drastically reduces loading time.
      const results = await Promise.allSettled([
        getCategories(),
        getPartners(),
        getTestimonials(),
        getShowroomImages(),
        getHeroConfig(),
        getSEOSettings()
      ]);

      const [categoriesResult, partnersResult, testimonialsResult, showroomImagesResult, heroConfigResult, seoResult] = results;

      if (categoriesResult.status === 'fulfilled' && categoriesResult.value && categoriesResult.value.length > 0) {
        const mappedCategories = categoriesResult.value.map(cat => ({
          id: cat.id,
          title: cat.title,
          description: cat.description,
          icon: getIconNode(cat.icon),
          imageUrl: cat.imageUrl,
        }));
        setCategoriesList(mappedCategories);
        setActiveBrandTab(mappedCategories[0].id);
      } else if (categoriesResult.status === 'rejected') {
        console.warn('Failed to load categories from KibanCMS, using fallback static data.', categoriesResult.reason);
      }

      if (partnersResult.status === 'fulfilled' && partnersResult.value && partnersResult.value.length > 0) {
        setPartnersList(partnersResult.value);
      } else if (partnersResult.status === 'rejected') {
        console.warn('Failed to load partners from KibanCMS, using fallback static data.', partnersResult.reason);
      }

      if (testimonialsResult.status === 'fulfilled' && testimonialsResult.value && testimonialsResult.value.length > 0) {
        setTestimonialsList(testimonialsResult.value);
      } else if (testimonialsResult.status === 'rejected') {
        console.warn('Failed to load testimonials from KibanCMS, using fallback static data.', testimonialsResult.reason);
      }

      if (showroomImagesResult.status === 'fulfilled' && showroomImagesResult.value && showroomImagesResult.value.length > 0) {
        setShowroomImagesList(showroomImagesResult.value);
      } else if (showroomImagesResult.status === 'rejected') {
        console.warn('Failed to load showroom images from KibanCMS, using fallback static data.', showroomImagesResult.reason);
      }

      if (heroConfigResult.status === 'fulfilled' && heroConfigResult.value) {
        setHeroConfig(heroConfigResult.value);
      } else if (heroConfigResult.status === 'rejected') {
        console.warn('Failed to load Hero config from KibanCMS, using fallback static data.', heroConfigResult.reason);
      }

      if (seoResult.status === 'fulfilled' && seoResult.value) {
        setSeoSettings(seoResult.value);
        if (seoResult.value.meta_title) {
          document.title = seoResult.value.meta_title;
        }
        if (seoResult.value.meta_description) {
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.setAttribute('name', 'description');
            document.head.appendChild(metaDesc);
          }
          metaDesc.setAttribute('content', seoResult.value.meta_description);
        }
        if (seoResult.value.favicon_url) {
          let link = document.querySelector('link[rel~="icon"]') as HTMLLinkElement;
          if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
          }
          link.href = seoResult.value.favicon_url;
        }
      }
    };

    fetchCmsData();
  }, []);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_KIBAN_API_URL;
    const apiKey = import.meta.env.VITE_KIBAN_API_KEY;

    if (apiUrl && apiKey && apiKey !== 'your_kiban_api_key_here') {
      const script = document.createElement('script');
      script.src = `${apiUrl}/api/v1/widgets/loader.js`;
      script.setAttribute('data-api-key', apiKey);
      script.async = true;
      document.body.appendChild(script);

      return () => {
        try {
          document.body.removeChild(script);
        } catch (e) {
          // Ignore
        }
      };
    }
  }, []);

  const handleContactSubmit = async (name: string, email: string, message: string, subject: string): Promise<boolean> => {
    try {
      const response = await submitContactForm({
        form_name: 'contact',
        name,
        email,
        subject,
        message,
        source_url: window.location.href,
      });
      return response.success;
    } catch (err) {
      console.error('Error submitting contact form to KibanCMS:', err);
      throw err;
    }
  };

  const handleNewsletterSubscribe = async (email: string): Promise<boolean> => {
    try {
      const response = await subscribeNewsletter(email, 'footer');
      return response.success;
    } catch (err) {
      console.error('Error subscribing to newsletter on KibanCMS:', err);
      throw err;
    }
  };

  useEffect(() => {
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
    } as any);
    lenisRef.current = lenis;

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
    gsap.to(".hero-curtain", {
      yPercent: -105,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: ".content-overlay",
        pinSpacing: true,
        scrub: 1,
        onLeave: () => gsap.set(".hero-curtain", { display: "none" }),
        onEnterBack: () => gsap.set(".hero-curtain", { display: "block" }),
        invalidateOnRefresh: true
      }
    });

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

  }, { scope: containerRef });

  const handleScrollToSection = (id: string) => {
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

    let target = 0;
    let cur: HTMLElement | null = element;
    while (cur) {
      target += cur.offsetTop;
      cur = cur.offsetParent as HTMLElement | null;
    }

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
      className="relative selection:bg-brand-orange/30 selection:text-brand-green bg-brand-green"
    >
      <Navbar onScrollTo={handleScrollToSection} onCtaClick={handleGoToContact} />

      <div className="content-overlay relative z-10 bg-brand-green">
        <DynamicShowcase 
          categoriesList={categoriesList}
          onBrandCategoryClick={(catId) => {
            setActiveBrandTab(catId);
            handleScrollToSection('marcas');
          }} 
        />
        <BrandScroller 
          activeTab={activeBrandTab} 
          setActiveTab={setActiveBrandTab} 
          partnersList={partnersList}
          categoriesList={categoriesList}
        />
        <AboutUs testimonialsList={testimonialsList} />
        <ShowroomExperience showroomImagesList={showroomImagesList} />
        <Footer
          contactTheme={contactTheme}
          setContactTheme={setContactTheme}
          onSubmitContact={handleContactSubmit}
          onSubscribeNewsletter={handleNewsletterSubscribe}
          categoriesList={categoriesList}
          onCategoryClick={(catId) => {
            setActiveBrandTab(catId);
            handleScrollToSection('marcas');
          }}
          onScrollTo={handleScrollToSection}
        />
      </div>

      <div className="hero-curtain fixed inset-x-0 top-0 h-screen z-30 will-change-transform">
        <Hero onContactClick={handleGoToContact} onScrollTo={handleScrollToSection} heroConfig={heroConfig} />
      </div>
    </div>
  );
}
