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
    image: '/images/home_design.png',
  },
  {
    number: '02',
    title: 'INTEGRATE',
    heading: 'Technology Meets Human Experience.',
    body: 'Promoting a blend of technology, keen observation and human experience enables seamless integration of each service into the system.',
    image: '/images/home_integrate.png',
  },
  {
    number: '03',
    title: 'SUSTAIN',
    heading: 'Built for Tomorrow.',
    body: 'Transcend industry expectations by planning systems and technologies to last the test of time. Our designers foresee tomorrow\'s demands.',
    image: '/images/home_sustain.png',
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
      // Cinematic Media Reveal (consistent with Contact)
      gsap.fromTo(
        heroMediaRef.current,
        { clipPath: 'inset(15% 15% 15% 15% round 100px)', opacity: 0, scale: 1.2 },
        { 
          clipPath: 'inset(0% 0% 0% 0% round 0px)', 
          opacity: 1, 
          scale: 1, 
          duration: 2.5, 
          ease: 'expo.inOut',
          delay: 0.1
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
      <section ref={heroRef} className="relative h-[100vh] min-h-[700px] flex items-center justify-center p-6 md:p-12 overflow-hidden bg-[#FAF9F6]">
        {/* Cinematic Video Background Layer - Navbar Safe Zone [top-32] */}
        <div ref={heroMediaRef} className="absolute inset-0 top-32 w-full h-[calc(100%-8rem)] overflow-hidden rounded-3xl md:rounded-none z-0">
          <motion.div 
            style={{ y: yParallax }}
            className="w-full h-full relative"
          >
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="w-full h-full object-cover brightness-[0.75] contrast-[1.1]"
            >
              <source src="/Drone_Video_Loop_Refinement.mp4" type="video/mp4" />
            </video>
            
            {/* Minimal Overlay for subtle depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]" />
          </motion.div>
        </div>

        {/* Content Overlay - Centered and integrated into the image focal point, shifted down to avoid Navbar */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto text-center px-6 md:px-12 pt-48 pb-12">
          
          <div className="overflow-hidden mb-12">
            <h1 className="tier-1 leading-[0.85] tracking-tighter drop-shadow-[0_12px_50px_rgba(0,0,0,0.6)]">
              <span className="block text-[clamp(3.5rem,10vw,6.5rem)] font-bold italic text-[#FAF9F6] font-[var(--font-display)] mb-2">
                Bespoke
              </span>
              <span className="block text-[clamp(4.5rem,15vw,10.25rem)] font-extrabold uppercase text-[#FAF9F6] font-[var(--font-display)]">
                Intelligence
              </span>
            </h1>
            <div className="mt-8 opacity-75 text-[12px] uppercase tracking-[1.6em] font-mono animate-pulse text-[#FAF9F6]">
              [ DESIGN_INTEGRATE_SUSTAIN ]
            </div>
          </div>

          <div className="overflow-hidden mb-16 max-w-3xl mx-auto">
            <p className="tier-2 text-xl md:text-3xl text-[#FAF9F6] font-medium leading-[1.3] font-[var(--font-body)] drop-shadow-2xl border-t border-[#FAF9F6]/30 pt-12">
              Transforming complex engineering into <br className="hidden md:block"/> seamless architectural poetry. 
              The future of spatial experience, illuminated.
            </p>
          </div>

          <div className="tier-3-container flex flex-wrap gap-12 items-center justify-center">
            <div ref={exploreBtnRef}>
              <Link to="/services" className="px-14 py-5 bg-[#FAF9F6] text-[#2B2B2B] rounded-full text-[14px] uppercase tracking-[0.2em] font-bold hover:bg-[#FAF9F6]/90 transition-all duration-700 hover:scale-105 active:scale-95 block shadow-2xl">
                Explore Our Craft
              </Link>
            </div>
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-4">
           <span className="text-[8px] uppercase tracking-[0.3em] text-[#FAF9F6]/40 rotate-90 mb-8 origin-left">Scroll to Explore</span>
           <div className="w-[1px] h-20 bg-gradient-to-b from-[#FAF9F6]/40 to-transparent" />
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
                 <div className="relative aspect-[4/5] md:aspect-video overflow-hidden group rounded-3xl md:rounded-[3rem]">
                   <motion.img 
                     whileHover={{ scale: 1.05 }}
                     transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                     src={item.image} 
                     alt={item.title} 
                     loading="lazy"
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