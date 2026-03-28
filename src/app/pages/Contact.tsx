import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, ArrowUpRight, Minus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const offices = [
  { city: 'Dubai', country: 'UAE', address: 'Old Commercial Bank Building, Deira', phone: '+971 42 564 882' },
  { city: 'Singapore', country: 'SG', address: 'Anson Road, Office #29-10', phone: '+65 9887 9761' },
  { city: 'India', country: 'IN', address: 'Bangalore & Kochi', phone: '+91 80-41284668' },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroMediaRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinemtic Media Reveal (from Home)
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

      // Hero Background Parallax
      gsap.to(heroImageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Cinematic Text Reveal
      const tl = gsap.timeline();
      tl.from('.hero-subtitle', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power3.out',
        delay: 1.2 // Delay to sync with media reveal
      })
        .from('.hero-title span', {
          y: 100,
          opacity: 0,
          stagger: 0.1,
          rotateX: -45, // Adding 3D rotation from Home
          duration: 2,
          ease: 'expo.out',
        }, '-=0.5')
        .from('.hero-desc', {
          opacity: 0,
          y: 20,
          duration: 1.2,
          ease: 'power3.out',
        }, '-=1.2');

      // Scroll Sections Reveal
      gsap.from('.reveal-section', {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out',
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.contact-grid',
          start: 'top 80%',
        }
      });
    }, containerRef);

    // Magnetic Button Effect
    const magneticButton = magneticButtonRef.current;
    if (magneticButton) {
      const handleMouseMove = (e: MouseEvent) => {
        const { left, top, width, height } = magneticButton.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        gsap.to(magneticButton, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const handleMouseLeave = () => {
        gsap.to(magneticButton, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      magneticButton.addEventListener('mousemove', handleMouseMove);
      magneticButton.addEventListener('mouseleave', handleMouseLeave);
      return () => {
        magneticButton.removeEventListener('mousemove', handleMouseMove);
        magneticButton.removeEventListener('mouseleave', handleMouseLeave);
        ctx.revert();
      };
    }

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen text-[#2B2B2B] overflow-hidden selection:bg-[#2B2B2B]/10">

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="hero-section relative h-[90vh] min-h-[600px] flex items-end overflow-hidden px-6 md:px-12 py-20 bg-black">
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            ref={heroImageRef}
            src="/src/assets/contact/hero.png"
            className="absolute inset-0 w-full h-[120%] object-cover opacity-60 grayscale-[0.3]"
            alt="Architectural Visual"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

        <div className="relative z-10 max-w-[1440px] mx-auto w-full">
          <span className="hero-subtitle block text-[10px] uppercase tracking-[0.5em] text-[#FAF9F6]/50 mb-6 font-medium">Lumière Studio</span>
          <h1 className="hero-title text-[clamp(2.5rem,10vw,8rem)] leading-[0.9] tracking-tighter text-[#FAF9F6] mb-8 font-[var(--font-display)]">
            <span className="inline-block">Let's Start a</span> <br />
            <i className="inline-block">Dialogue.</i>
          </h1>
          <div className="hero-desc max-w-lg">
            <p className="text-lg md:text-xl text-[#FAF9F6]/70 leading-relaxed font-light">
              Whether you're conceptualizing a landmark design or seeking world-class structural refinement, our engineers are ready to elevate your vision.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT GRID */}
      <section className="contact-grid max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-20 md:gap-32">

        {/* LEFT: INFORMATION & OFFICES */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-32">
          <div className="reveal-section space-y-12">
            <div className="group border-b border-[#2B2B2B]/10 pb-12 cursor-pointer overflow-hidden">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block">Direct Inquiry</span>
              <a href="mailto:hello@tri-element.studio" className="relative text-2xl md:text-3xl font-[var(--font-display)] flex items-center justify-between group transition-all duration-700">
                <span className="group-hover:italic transition-all">hello@tri-element.studio</span>
                <ArrowUpRight size={24} className="text-[#B5B0A8] group-hover:text-[#2B2B2B] transition-colors" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B] translate-y-[200%] group-hover:translate-y-0 transition-transform duration-700" />
              </a>
            </div>

            <div className="group border-b border-[#2B2B2B]/10 pb-12 cursor-pointer">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block">Global Connect</span>
              <a href="tel:+97142564882" className="text-2xl font-[var(--font-display)] flex items-center gap-4 hover:italic transition-all">
                +971 42 564 882
              </a>
            </div>
          </div>

          <div className="reveal-section space-y-16">
            <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 block border-b border-[#2B2B2B]/10 pb-4">Global Presence</span>
            <div className="grid grid-cols-1 gap-12">
              {offices.map((o, i) => (
                <div key={i} className="flex gap-10 items-start group">
                  <span className="text-[10px] font-medium text-[#2B2B2B]/30 pt-1">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl italic font-[var(--font-display)]">{o.city}</h3>
                      <span className="text-[10px] text-[#2B2B2B]/40">{o.country}</span>
                    </div>
                    <p className="text-xs text-[#2B2B2B]/50 leading-relaxed max-w-[220px] mb-3 group-hover:text-[#2B2B2B] transition-colors">{o.address}</p>
                    <p className="text-[10px] text-[#2B2B2B]/70 tracking-widest">{o.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: INQUIRY FORM */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col justify-center">
          <div className="reveal-section bg-[#F5F1EA] p-8 md:p-20 rounded-[4rem] relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.03)] selection:bg-[#2B2B2B]/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B5B0A8]/10 blur-[80px] -z-10" />

            <div className="mb-20">
              <h2 className="text-3xl md:text-4xl font-[var(--font-display)] mb-6">Brief Your Vision</h2>
              <p className="text-[#2B2B2B]/50 max-w-sm text-sm">Tell us about your project or career goals, and we'll reach out to start the dialogue.</p>
            </div>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-16"
                  exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
                  transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    <div className="group relative">
                      <input required type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all placeholder:text-[#2B2B2B]/20 font-[var(--font-body)]" />
                      <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                    </div>
                    <div className="group relative">
                      <input required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all placeholder:text-[#2B2B2B]/20 font-[var(--font-body)]" />
                      <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                    </div>
                  </div>

                  <div className="relative group">
                    <select required className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all text-[#2B2B2B]/40 appearance-none font-[var(--font-body)]">
                      <option value="" disabled selected>Nature of Inquiry</option>
                      <option value="project">Project Quotation</option>
                      <option value="career">Career Application</option>
                      <option value="general">Partnership / Other</option>
                    </select>
                    <ArrowUpRight size={20} className="absolute right-0 bottom-6 text-[#2B2B2B]/20 rotate-45" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                  </div>

                  <div className="relative group">
                    <textarea required placeholder="Briefly describe your vision..." rows={3} className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all placeholder:text-[#2B2B2B]/20 resize-none font-[var(--font-body)]" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                  </div>

                  <div className="pt-8 flex justify-center md:justify-start">
                    <button
                      ref={magneticButtonRef}
                      type="submit"
                      disabled={isSubmitting}
                      className="relative px-20 py-8 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium transition-all duration-700 group overflow-hidden disabled:opacity-50"
                    >
                      <span className="relative z-10">{isSubmitting ? 'Transmitting...' : 'Send Inquiry'}</span>
                      <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  className="text-center py-32"
                  transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                >
                  <div className="w-20 h-20 bg-[#2B2B2B] rounded-full flex items-center justify-center mx-auto mb-12">
                    <ArrowUpRight className="text-[#FAF9F6] -rotate-45" size={32} />
                  </div>
                  <h2 className="text-4xl md:text-6xl mb-8 font-[var(--font-display)] italic">Transmitted.</h2>
                  <p className="text-lg text-[#2B2B2B]/60 max-w-sm mx-auto mb-12 leading-relaxed font-light">
                    Your vision has reached our engineering core. We shall review and initiate the dialogue within 48 hours.
                  </p>
                  <button onClick={() => setSuccess(false)} className="text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/30 hover:text-[#2B2B2B] transition-all hover:tracking-[0.7em] font-medium">Send Another Briefing</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 3. ATMOSPHERIC QUOTE SECTION */}
      <section className="reveal-section relative h-[60vh] flex items-center justify-center overflow-hidden bg-white/30 backdrop-blur-3xl border-t border-[#E5E2DB]">
        <div className="max-w-5xl px-6 text-center">
          <span className="block text-[10px] uppercase tracking-[1em] text-[#2B2B2B]/20 mb-12">Manifesto</span>
          <h2 className="text-[clamp(1.5rem,5vw,3.5rem)] text-[#2B2B2B] font-[var(--font-display)] leading-tight italic font-light">
            "Structural engineering is the art of molding materials we do not wholly understand into shapes we cannot precisely analyze, so as to withstand forces we cannot really assess."
          </h2>
          <div className="mt-12 flex items-center justify-center gap-4 text-[#2B2B2B]/30">
            <Minus size={24} strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-[0.4em]">A.R. Dykes</span>
          </div>
        </div>
        {/* Subtle Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none opacity-[0.02] text-[20vw] font-bold whitespace-nowrap">
          TRIELEMENT
        </div>
      </section>

    </div>
  );
}
