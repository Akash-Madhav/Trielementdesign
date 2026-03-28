import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import BrandWordmark from '../../imports/BrandWordmark';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const partners = ['WASL', 'TBC Bank', 'Commerz', 'Emaar', 'Hilton', 'Park Hyatt', 'Mandarin Oriental', 'Radisson', 'Marriott', 'Sobha', 'IMG Group'];

const stats = [
  { value: '300+', label: 'Projects' },
  { value: '15+', label: 'Sectors' },
  { value: '$5Bn+', label: 'Project Value' },
  { value: '50Mn+', label: 'Sq Ft' },
  { value: '20+', label: 'Countries' },
];

const philosophies = [
  {
    number: '01',
    title: 'DESIGN',
    heading: 'From Whole to Parts.',
    body: 'Design governs the cost and performance of any project. Every engineer is empowered to consider the smallest of details — and their cascading impact at every level.',
    image: '/images/home_design_1774695495228.png',
  },
  {
    number: '02',
    title: 'INTEGRATE',
    heading: 'Technology Meets Human Experience.',
    body: 'Promoting a blend of technology, keen observation and human experience enables seamless integration of each service into the system.',
    image: '/images/home_integrate_1774695517309.png',
  },
  {
    number: '03',
    title: 'SUSTAIN',
    heading: 'Built for Tomorrow.',
    body: 'Transcend industry expectations by planning systems and technologies to last the test of time. Our designers foresee tomorrow\'s demands.',
    image: '/images/home_sustain_fixed_1774696030727.png',
  },
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  
  // Magnetic refs
  const exploreBtnRef = useMagnetic();
  const journeyBtnRef = useMagnetic();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 300]);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Cinematic Media Reveal
      gsap.fromTo(
        heroMediaRef.current,
        { clipPath: 'inset(10% 10% 10% 10% round 40px)', opacity: 0, scale: 1.1 },
        { 
          clipPath: 'inset(0% 0% 0% 0% round 0px)', 
          opacity: 1, 
          scale: 1, 
          duration: 2.5, 
          ease: 'expo.inOut',
          delay: 0.2
        }
      );

      // Narrative Text Stagger (Letter-based reveal simulation)
      gsap.from('.hero-text-reveal', {
        y: 100,
        opacity: 0,
        rotateX: -45,
        stagger: 0.2,
        duration: 2,
        ease: 'expo.out',
        delay: 0.8
      });

      // Section Reveals
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
          }
        });
      });

      // Directional Reveals (Zigzag)
      gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el) => {
        gsap.from(el, {
          x: -100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-right').forEach((el) => {
        gsap.from(el, {
          x: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          }
        });
      });

      // --- TYPOGRAPHIC STORYTELLING TIERS ---
      
      // Tier 1: 3D Split-Word Reveals
      gsap.utils.toArray<HTMLElement>('.tier-1').forEach((el) => {
        gsap.from(el, {
          y: 40,
          rotateX: -30,
          opacity: 0,
          duration: 1.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          }
        });
      });

      // Tier 2: Cinematic Blur-to-Focus
      gsap.utils.toArray<HTMLElement>('.tier-2').forEach((el) => {
        gsap.from(el, {
          filter: 'blur(15px)',
          opacity: 0,
          y: 20,
          duration: 2.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
          }
        });
      });

      // Tier 3: Float-in Staggers
      gsap.utils.toArray<HTMLElement>('.tier-3-container').forEach((container) => {
        gsap.from(container.children, {
          y: 15,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: container,
            start: 'top 92%',
          }
        });
      });

      // Background Highlight Shift
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          // Subtle bg shift from #FAF9F6 to a slightly warmer/deeper #F5F1EA
          gsap.to(containerRef.current, {
            backgroundColor: p > 0.3 && p < 0.7 ? '#F5F1EA' : '#FAF9F6',
            duration: 1,
            ease: 'power2.inOut'
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FAF9F6] selection:bg-[#2B2B2B]/10 selection:text-[#2B2B2B]">
      
      {/* --- PREMIUM HERO SECTION --- */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center p-6 md:p-12 overflow-hidden">
        {/* Cinematic Video Background Layer */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            ref={heroMediaRef}
            style={{ y: yParallax }}
            className="w-full h-full relative"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover brightness-[1.05] contrast-[1.1] grayscale opacity-40 mix-blend-multiply"
            >
              <source src="/Drone_Video_Loop_Refinement.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay Layers for Lumière Atmosphere */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#FAF9F6]/20 via-transparent to-[#FAF9F6]/80" />
            <div className="absolute inset-0 bg-[#FAF9F6]/10 mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto text-center px-6">
          <div className="inline-block mb-10 overflow-hidden">
            <span className="hero-text-reveal tier-3 block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/60 font-[var(--font-body)]">
               Engineering Ethereal Spaces
            </span>
          </div>
          
          <div className="overflow-hidden mb-8">
            <h1 className="hero-text-reveal tier-1 text-center leading-[0.95] tracking-tight">
              <span className="block text-[clamp(3.5rem,12vw,10rem)] font-[var(--font-display)] italic text-[#2B2B2B]">
                Bespoke
              </span>
              <span className="block text-[clamp(3.5rem,12vw,10rem)] font-[var(--font-display)] uppercase text-[#2B2B2B]">
                Intelligence
              </span>
              <div className="flex justify-center mt-4 opacity-20 text-[8px] tracking-[1em] font-mono animate-pulse">
                [ 25.1972° N, 55.2744° E ]
              </div>
            </h1>
          </div>

          <div className="overflow-hidden mb-16">
            <p className="hero-text-reveal tier-2 text-lg md:text-xl text-[#2B2B2B]/70 font-[var(--font-body)] max-w-2xl mx-auto leading-relaxed">
              Transforming complex engineering into seamless architectural poetry. 
              The future of spatial experience, illuminated.
            </p>
          </div>

          <motion.div className="hero-text-reveal tier-3-container flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div ref={exploreBtnRef}>
              <Link to="/services" className="px-12 py-4 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.2em] font-[var(--font-body)] hover:bg-[#2B2B2B]/80 transition-all duration-700 hover:scale-105 active:scale-95 block">
                Explore Our Craft
              </Link>
            </div>
            <Link to="/project-locations" className="text-[11px] uppercase tracking-[0.25em] font-[var(--font-body)] text-[#2B2B2B] group relative overflow-hidden h-5">
              <span>View Portfolio</span>
              <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B] translate-y-2 group-hover:translate-y-0 transition-transform duration-700" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
           <div className="w-[1px] h-12 bg-gradient-to-b from-[#2B2B2B]/40 to-transparent" />
        </div>
      </section>

      {/* --- PARTNER MARQUEE --- */}
      <section className="py-12 md:py-20 bg-white border-y border-[#E5E2DB]/50 overflow-hidden">
        <motion.div
           animate={{ x: [0, -2000] }}
           transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
           className="flex gap-20 whitespace-nowrap items-center px-10"
        >
          {[...partners, ...partners, ...partners].map((partner, i) => (
             <span key={i} className="text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/30 font-[var(--font-body)]">
               {partner}
             </span>
          ))}
        </motion.div>
      </section>

      {/* --- STATISTICS: MINIMALIST GRID --- */}
      <section className="py-12 md:py-24 px-6 md:px-12 border-b border-[#E5E2DB]/30">
        <div className="max-w-[1440px] mx-auto">
          <div className="tier-3-container grid grid-cols-2 md:grid-cols-5 gap-12 sm:gap-16">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col gap-2 items-center md:items-start">
                <span className="text-4xl md:text-5xl font-[var(--font-display)] text-[#2B2B2B]">
                   {stat.value}
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#2B2B2B]/50 font-[var(--font-body)]">
                   {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY: STORYTELLING LAYOUT --- */}
      <section className="py-16 md:py-32 px-6 md:px-12 bg-[#F5F1EA]/30 border-b border-[#E5E2DB]/30">
        <div className="max-w-[1440px] mx-auto space-y-20 md:space-y-40">
          {philosophies.map((item, i) => (
            <div key={i} className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center overflow-hidden`}>
               {/* Visual Side */}
               <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} cursor-view`}>
                 <div className="relative aspect-[4/5] md:aspect-video overflow-hidden group">
                   <motion.img 
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                     src={item.image} 
                     alt={item.title} 
                     className="w-full h-full object-cover brightness-[1.02] contrast-[1.05]"
                   />
                   <div className="absolute top-8 left-8">
                     <span className="font-[var(--font-display)] italic text-6xl text-[#FAF9F6]/20">
                       {item.number}
                     </span>
                   </div>
                 </div>
               </div>

               {/* Text Side */}
               <div className={`w-full md:w-1/2 pt-10 md:pt-0 ${i % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
                  <span className="tier-3 text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/50 mb-6 block">
                    {item.title}
                  </span>
                  <h2 className="tier-1 text-4xl md:text-6xl mb-8 leading-[1.1]">
                    {item.heading}
                  </h2>
                  <p className="tier-2 text-base md:text-lg text-[#2B2B2B]/70 font-[var(--font-body)] leading-relaxed max-w-xl">
                    {item.body}
                  </p>
                  <motion.div 
                    whileHover={{ x: 10 }} 
                    className="tier-3 mt-12 inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.2em] font-medium cursor-pointer group"
                  >
                    Explore Discipline
                    <div className="w-8 h-[1px] bg-[#2B2B2B] group-hover:w-12 transition-all duration-500" />
                  </motion.div>
               </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PROJECTS: IMMERSIVE GALLERY (TEASER) --- */}
      <section className="py-20 md:py-40 px-6 md:px-12 overflow-hidden border-b border-[#E5E2DB]/30 bg-white/30">
        <div className="max-w-[1440px] mx-auto text-center mb-16 md:mb-24">
           <span className="tier-3 text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/40 mb-6 block font-medium uppercase">Portfolio Teaser</span>
           <h2 className="tier-1 text-4xl md:text-7xl mb-8">Iconic Environments.</h2>
           <p className="tier-2 text-[#2B2B2B]/60 max-w-2xl mx-auto uppercase tracking-[0.2em] text-[10px] font-medium leading-loose">
             A curation of precision-driven architecture and sustainable engineering across the globe.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 min-h-[600px] md:h-[800px] cursor-explore">
           <div className="md:col-span-8 relative group overflow-hidden section-reveal">
              <img src="/images/home_projects_hyatt_1774695556179.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Park Hyatt" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
              <div className="absolute bottom-10 left-10 text-white">
                 <span className="text-[10px] uppercase tracking-widest block mb-2 opacity-60">Hospitality / Zanzibar</span>
                 <h3 className="text-3xl font-[var(--font-display)]">Park Hyatt Zanzibar</h3>
              </div>
           </div>
           <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <div className="relative group overflow-hidden section-reveal">
                 <img src="/images/home_projects_wasl_1774695576365.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="WASL Tower" />
                 <div className="absolute bottom-8 left-8 text-white">
                   <span className="text-[10px] uppercase tracking-widest block mb-1 opacity-60">High-rise / Dubai</span>
                   <h3 className="text-xl font-[var(--font-display)]">WASL Tower</h3>
                 </div>
              </div>
              <div className="relative group overflow-hidden section-reveal">
                 <img src="/images/home_projects_mandarin_1774695606811.png" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Mandarin JBR" />
                 <div className="absolute bottom-8 left-8 text-white">
                   <span className="text-[10px] uppercase tracking-widest block mb-1 opacity-60">Luxury / Dubai</span>
                   <h3 className="text-xl font-[var(--font-display)]">Mandarin JBR</h3>
                 </div>
              </div>
           </div>
        </div>

        <div className="text-center mt-20 section-reveal">
           <Link to="/project-locations" className="inline-block px-12 py-5 border border-[#2B2B2B]/20 rounded-full text-[11px] uppercase tracking-[0.2em] font-medium hover:bg-[#2B2B2B] hover:text-[#FAF9F6] transition-all duration-700">
             Discover Global Impact
           </Link>
        </div>
      </section>

      {/* --- CTA: AMBIENT BLOOM --- */}
      <section className="relative py-16 md:py-32 px-6 md:px-12 flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
           <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
           <div className="w-full h-full bg-[#E5E2DB]/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        </div>
        
        <div className="relative z-10 max-w-4xl">
           <h2 className="text-5xl md:text-8xl mb-12">
             Ready to <i>Illuminate</i>?
           </h2>
           <p className="text-lg md:text-xl text-[#2B2B2B]/60 mb-16 max-w-2xl mx-auto font-[var(--font-body)]">
             Let our engineering precision guide your architectural vision into reality. 
             Sustainable, intelligent, and timeless.
           </p>
           <Link to="/contact">
             <div ref={journeyBtnRef}>
               <GlassPanel 
                 variant="heavy" 
                 className="inline-block px-16 py-6 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium hover:scale-105 active:scale-95 transition-all duration-700 shadow-2xl shadow-black/10"
               >
                 Start Your Journey
               </GlassPanel>
             </div>
           </Link>
        </div>
      </section>

    </div>
  );
}