import { useRef, useEffect } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassPanel } from '../components/GlassPanel';
import BrandName from '../components/BrandName';
import { SEO } from '../components/SEO';
import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);


const philosophies = [
  {
    title: 'DESIGN',
    heading: 'From Whole to Parts.',
    body: 'Design governs the cost and performance of any project. Every engineer is empowered to consider the smallest of details — and their cascading impact at every level.',
    image: '/images/home_design.png',
  },
  {
    title: 'INTEGRATE',
    heading: 'Technology Meets Human Experience.',
    body: 'Promoting a blend of technology, keen observation and human experience enables seamless integration of each service into the system.',
    image: '/images/home_integrate_technical.png',
  },
  {
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

      // Unified Hero Entrance Sequence (triggers on load)
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        rotateX: -30,
        stagger: 0.2,
        duration: 2.2,
        ease: 'expo.out',
        delay: 0.6
      });

      // Section Reveals
      gsap.utils.toArray<HTMLElement>('.section-reveal').forEach((section: any) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
          }
        });
      });

      // Directional Reveals (Zigzag)
      gsap.utils.toArray<HTMLElement>('.reveal-left').forEach((el: any) => {
        gsap.from(el, {
          x: -100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
          }
        });
      });

      gsap.utils.toArray<HTMLElement>('.reveal-right').forEach((el: any) => {
        gsap.from(el, {
          x: 100,
          opacity: 0,
          duration: 1.5,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
          }
        });
      });

      // --- TYPOGRAPHIC STORYTELLING TIERS ---

      // Tier 1: 3D Split-Word Reveals
      gsap.utils.toArray<HTMLElement>('.tier-1').forEach((el: any) => {
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
      gsap.utils.toArray<HTMLElement>('.tier-2').forEach((el: any) => {
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

      // Tier 3: Float-in Staggers (Only for scrollable sections)
      gsap.utils.toArray<HTMLElement>('.tier-3-stagger').forEach((container: any) => {
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
        onUpdate: (self: any) => {
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

    const refreshHandler = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refreshHandler);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', refreshHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#FAF9F6] selection:bg-[#2B2B2B]/10 selection:text-[#2B2B2B]">
      <SEO 
        title="Trielement Design | Engineering Precision & Architectural Innovation"
        description="World-class MEP engineering, sustainability, and BIM solutions for global prestige projects."
        canonical="https://trielementdesign.com/"
      />

      {/* --- PREMIUM HERO SECTION --- */}
      <section ref={heroRef} className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-12 pb-12 md:pb-20 pt-20 md:pt-39 overflow-hidden bg-[#FAF9F6]">
        {/* Cinematic Video Background Layer - Full screen experience behind floating navbar */}
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 will-change-transform [backface-visibility:hidden]">
          <motion.div
            style={{ y: yParallax }}
            className="w-full h-full relative will-change-transform [backface-visibility:hidden]"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="/hero_poster.png"
              className="w-full h-full object-cover brightness-[0.95] contrast-[1.1]"
            >
              <source src="/hero_video.mp4" type="video/mp4" />
            </video>

            {/* Minimal Overlay for subtle depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-[1]" />
          </motion.div>
        </div>

        {/* Content Overlay - Centered inside the video area */}
        <div className="relative z-10 max-w-[1440px] w-full mx-auto text-center px-6 md:px-12 mt-0">

          <div className="overflow-hidden mb-6 md:mb-8">
            <h1 className="hero-reveal leading-[0.85] tracking-tighter drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
              <span className="block text-[clamp(2rem,8vw,4.8rem)] sm:text-[clamp(2.6rem,7.5vw,4.8rem)] font-bold italic text-[#FAF9F6] font-[var(--font-display)] mb-2 break-words">
                Bespoke
              </span>
              <span className="block text-[clamp(2rem,11vw,7.6rem)] sm:text-[clamp(3.3rem,11vw,7.6rem)] font-extrabold uppercase text-[#FAF9F6] font-[var(--font-display)] break-words">
                Intelligence
              </span>
            </h1>
            <div className="hero-reveal mt-6 opacity-90 text-[13px] md:text-[15px] font-semibold uppercase tracking-[0.4em] font-mono text-[#FAF9F6] mb-4 ml-[0.4em]">
              THE POWER OF THREE
            </div>
          </div>

          <div className="overflow-hidden mb-12 max-w-3xl mx-auto">
            <p className="hero-reveal text-lg md:text-2xl text-[#FAF9F6] font-light leading-[1.6] font-[var(--font-body)] drop-shadow-xl border-t border-[#FAF9F6]/30 pt-8 mt-2 text-balance max-w-2xl mx-auto">
              At <BrandName />, we believe every project reaches its peak through the three pillars of <br className="hidden md:block" /> <i className="font-serif italic font-medium">Hydraulic Precision</i>, <i className="font-serif italic font-medium">Electrical Resilience</i>, and <i className="font-serif italic font-medium">HVAC Innovation</i>.
            </p>
          </div>

          <div className="hero-reveal flex flex-wrap gap-8 items-center justify-center relative z-20">
            <div ref={exploreBtnRef}>
              <Link to="/contact" className="px-10 py-4 bg-[#FAF9F6] text-black border border-black rounded-full text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-black hover:text-[#FAF9F6] transition-all duration-700 hover:scale-105 active:scale-95 block shadow-xl">
                Start Your Journey
              </Link>
            </div>
            <Link to="/services" className="text-[10px] uppercase tracking-[0.3em] text-[#FAF9F6]/60 hover:text-[#FAF9F6] transition-colors font-medium border-b border-transparent hover:border-[#FAF9F6]/30 pb-1">
              Explore Our Craft
            </Link>
          </div>
        </div>


        {/* Scroll Indicator */}
        <div className="absolute bottom-12 right-12 hidden md:flex flex-col items-center gap-4">
          <span className="text-[8px] uppercase tracking-[0.3em] text-[#FAF9F6]/40 rotate-90 mb-8 origin-left">Scroll to Explore</span>
          <div className="w-[1px] h-20 bg-gradient-to-b from-[#FAF9F6]/40 to-transparent" />
        </div>
      </section>


      {/* --- PHILOSOPHY: STORYTELLING LAYOUT --- */}
      {philosophies.map((item, i) => (
        <section key={i} className="relative py-16 md:py-24 flex items-center px-6 md:px-12 bg-[#F5F1EA]/50 border-b border-[#E5E2DB]/30 overflow-hidden">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 md:gap-24 items-center`}>
              {/* Visual Side */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'} cursor-view`}>
                <div className="relative aspect-[4/5] md:aspect-video overflow-hidden group rounded-3xl md:rounded-[3rem]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover brightness-[1.02] contrast-[1.05]"
                  />
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
              </div>
            </div>
          </div>
        </section>
      ))}


      {/* --- CTA: AMBIENT BLOOM --- */}
      <section className="relative py-20 md:py-32 flex items-center justify-center text-center overflow-hidden px-6 md:px-12 bg-[#FAF9F6]">
        <div className="absolute inset-0 z-0 scale-110">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6]" />
          <div className="w-full h-full bg-[#E5E2DB]/20 blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        <div className="relative z-10 max-w-4xl">
          <h2 className="section-reveal text-5xl md:text-8xl mb-12">
            Ready to <i>Illuminate</i>?
          </h2>
          <p className="section-reveal text-lg md:text-xl text-[#2B2B2B]/60 mb-16 max-w-2xl mx-auto font-[var(--font-body)]">
            Let our engineering precision guide your architectural vision into reality.
            Sustainable, intelligent, and timeless.
          </p>
          <Link to="/contact" className="section-reveal block">
            <div ref={journeyBtnRef}>
              <GlassPanel
                variant="heavy"
                className="inline-block px-16 py-6 bg-[#FAF9F6] text-black border border-black rounded-full text-[12px] hover:bg-black hover:text-[#FAF9F6] uppercase tracking-[0.3em] font-medium hover:scale-105 active:scale-95 transition-all duration-700 shadow-2xl shadow-black/10"
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