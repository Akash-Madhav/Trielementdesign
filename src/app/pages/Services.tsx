import { useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useMagnetic } from '../hooks/useMagnetic';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'MEP Engineering',
    category: 'Precision',
    image: '/images/services_mep.png',
    description: 'The vital organs of architecture. We design electrical, plumbing, and HVAC systems tailored to highly complex facilities, with dedicated engineering expertise spanning across these critical typologies:',
    sectors: ['Commercial and Mixed Use', 'Healthcare', 'High-Rise', 'Hospitality', 'Retail'],
  },
  {
    title: 'Sustainability',
    category: 'Legacy',
    image: '/images/services_sustain.png',
    description: 'Engineering for the planet. We implement integrated green solutions and net-zero strategies, providing specialized sustainability expertise specifically for these highly demanding sectors:',
    sectors: ['Education', 'Existing Buildings', 'Heritage', 'Cultural'],
  },
  {
    title: 'BIM & Digital Twin',
    category: 'Intelligence',
    image: '/images/services_bim.png',
    description: 'The data-driven ghost of construction. We eliminate spatial conflict through immersive 3D coordination, providing rigorous digital modeling capabilities tailored for the following asset classes:',
    sectors: ['Government', 'Residential', 'Sports and Events', 'Workplace'],
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const inquireBtnRef = useMagnetic();
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, 250]);

  useEffect(() => {
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

      // Hero Entrance
      gsap.from('.services-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.8,
        ease: 'expo.out',
        delay: 0.3
      });

      // Service Blocks reveal
      gsap.utils.toArray<HTMLElement>('.service-item').forEach((item) => {
        gsap.from(item, {
          y: 80,
          opacity: 0,
          duration: 2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 92%',
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
            start: 'top 92%',
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
            start: 'top 92%',
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

    }, containerRef);

    const refreshHandler = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refreshHandler);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', refreshHandler);
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen selection:bg-[#2B2B2B]/10 overflow-hidden">

      {/* --- PREMIUM HERO: CINEMATIC MEDIA --- */}
      <section className="relative min-h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 md:px-12 pt-28 md:pt-32">
        {/* Full screen experience behind floating navbar */}
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-full overflow-hidden z-0 will-change-transform [backface-visibility:hidden]">
          <motion.div
            style={{ y: yParallax }}
            className="w-full h-full relative will-change-transform [backface-visibility:hidden]"
          >
            <img
              src="/images/services_hero_v2.png"
              alt="Architectural Precision"
              loading="eager"
              fetchPriority="high"
              className="w-full h-full object-cover grayscale-0 brightness-[0.7] contrast-[1.1]"
            />
            {/* Technical Blueprint Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: `linear-gradient(#FAF9F6 1px, transparent 1px), linear-gradient(90deg, #FAF9F6 1px, transparent 1px)`,
                backgroundSize: '40px 40px'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </div>

        <div className="services-hero-content relative z-10 max-w-[1440px] w-full mx-auto px-6 text-center md:text-left">
          <div className="overflow-hidden mb-6">
            <span className="services-reveal tier-3 block text-[9px] uppercase tracking-[0.5em] text-[#FAF9F6]/60 font-bold">Our Specialties</span>
          </div>
          <div className="overflow-hidden mb-10">
            <h1 className="services-reveal tier-1 text-[clamp(1.8rem,7.5vw,6.3rem)] italic leading-[0.95] text-[#FAF9F6] font-[var(--font-display)] drop-shadow-xl relative pb-4 md:pb-6">
              The <i className="font-bold">Art</i> of <br /> Engineering.
            </h1>
          </div>

          <div className="services-reveal tier-2 md:border-l border-[#FAF9F6]/20 md:pl-8 max-w-2xl mx-auto md:mx-0">
            <p className="text-base md:text-[clamp(1rem,1.4vw,1.35rem)] text-[#FAF9F6]/90 font-medium leading-relaxed font-[var(--font-body)] drop-shadow-lg">
              Precise MEP solutions, sustainable lifecycle planning, and collaborative BIM environments—bridging the gap between theory and legacy.
            </p>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY TRANSITION: THE INTENTION --- */}
      <section className="relative py-20 md:py-32 flex items-center justify-center overflow-hidden bg-white/20 border-y border-[#E5E2DB]/20">
        <div className="max-w-5xl px-6 text-center">
          <span className="tier-3 block text-[10px] uppercase tracking-[1.2em] text-[#2B2B2B]/30 mb-8 font-medium">Core Conviction</span>
          <h2 className="tier-2 text-[clamp(1.2rem,3.5vw,2.5rem)] text-[#2B2B2B] font-[var(--font-display)] leading-[1.3] italic font-light">
            "Where every pipe, wire, and duct is placed with the same intention as the architecture it serves."
          </h2>
          <div className="mt-10 h-px w-20 bg-[#2B2B2B]/10 mx-auto" />
        </div>
      </section>

      {/* --- MAIN SERVICES: FULL-SCREEN GALLERY --- */}
      {services.map((s, i) => (
        <section key={i} className="min-h-[100dvh] md:h-screen flex items-center px-6 md:px-12 border-b border-[#E5E2DB]/30 bg-white/30">
          <div className="max-w-[1440px] mx-auto w-full">
            <div className="service-item grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-24 items-center overflow-hidden cursor-view">
              <div className={`md:col-span-7 ${i % 2 === 1 ? 'md:order-2' : ''} ${i % 2 === 0 ? 'reveal-left' : 'reveal-right'}`}>
                <div className="relative overflow-hidden group aspect-[16/10] rounded-[2rem] md:rounded-[3rem] shadow-2xl">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className={`md:col-span-5 ${i % 2 === 1 ? 'md:order-1' : ''} ${i % 2 === 0 ? 'reveal-right' : 'reveal-left'}`}>
                <span className="tier-3 text-[10px] uppercase tracking-[0.4em] text-[#2B2B2B]/40 mb-6 block">Service {s.category}</span>
                <h2 className="tier-1 text-4xl md:text-6xl mb-10 italic leading-tight">{s.title}</h2>
                <p className="tier-2 text-lg text-[#2B2B2B]/60 mb-12 leading-relaxed max-w-sm">
                  {s.description}
                </p>
                <div className="tier-3-container grid grid-cols-2 gap-y-4 gap-x-6">
                  {s.sectors.map(sector => (
                    <div key={sector} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B5B0A8]" />
                      <span className="text-[11px] uppercase tracking-wider text-[#2B2B2B]/70">{sector}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}
      {/* --- FINAL CTA TEASER --- */}
      <section className="section-reveal py-32 md:py-48 flex flex-col justify-center text-center bg-white/10">
        <h2 className="text-[clamp(2.5rem,6vw,5rem)] mb-12 leading-tight">
          Crafting the <i>Next</i> <br /> Generation of <i>Space</i>.
        </h2>
        <div ref={inquireBtnRef} className="inline-block">
          <Link to="/contact" className="inline-block px-16 py-6 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium transition-all duration-700 hover:scale-105 active:scale-95 shadow-2xl">
            Inquire Now
          </Link>
        </div>
      </section>

    </div>
  );
}