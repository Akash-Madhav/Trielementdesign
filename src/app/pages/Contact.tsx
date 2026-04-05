import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, ArrowUpRight, Minus } from 'lucide-react';
import { useMagnetic } from '../hooks/useMagnetic';
import BrandName from '../components/BrandName';

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
  const magneticButtonRef = useMagnetic();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic Media Reveal (consistent with Home)
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

      // --- TYPOGRAPHIC STORYTELLING TIERS (Production Perfect) ---
      
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
            start: 'top 92%',
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
            start: 'top 92%',
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

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });
      const result = await response.json();
      if (result.success) {
        setSuccess(true);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen text-[#2B2B2B] overflow-hidden selection:bg-[#2B2B2B]/10">

      {/* 1. CINEMATIC HERO SECTION */}
      <section className="hero-section relative min-h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FAF9F6] px-6 md:px-12 pt-20">
        {/* Full screen experience behind floating navbar */}
        <div ref={heroMediaRef} className="absolute inset-0 w-full h-full overflow-hidden bg-black z-0">
          <motion.div 
            style={{ y: 0 }} // Keeping static y for now as defined, wait original had parallax on image
            className="w-full h-full relative"
          >
            <img
              ref={heroImageRef}
              src="/images/contact_hero.png" 
              loading="lazy"
              className="w-full h-[120%] object-cover grayscale-0 brightness-[0.7] contrast-[1.1] absolute inset-0"
              alt="Architectural Visual"
            />
            {/* Technical Blueprint Grid Overlay */}
            <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" 
              style={{ 
                backgroundImage: `linear-gradient(#FAF9F6 1px, transparent 1px), linear-gradient(90deg, #FAF9F6 1px, transparent 1px)`,
                backgroundSize: '40px 40px' 
              }} 
            />
            {/* Dark Gradient safely mapped to bottom */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          </motion.div>
        </div>

        <div className="contact-hero-content relative z-10 max-w-[1440px] w-full mx-auto px-6 text-center md:text-left">
          <div className="overflow-hidden mb-6">
            <span className="tier-3 block text-[9px] uppercase tracking-[0.5em] text-[#FAF9F6]/80 font-bold"><BrandName /> Studio</span>
          </div>
          <div className="overflow-hidden mb-10">
            <h1 className="tier-1 text-[clamp(1.8rem,7.5vw,6.3rem)] italic leading-[0.95] text-[#FAF9F6] font-[var(--font-display)] drop-shadow-xl relative">
              <span className="inline-block font-bold">Let's Start a</span> <br />
              <i className="inline-block font-bold">Dialogue.</i>
              <div className="mt-6 opacity-60 text-[8px] tracking-[1.4em] font-mono animate-pulse">
                [ COLLABORATION_ACTIVE ]
              </div>
            </h1>
          </div>
          
          <div className="tier-2 md:border-l border-[#FAF9F6]/20 md:pl-8 max-w-2xl mx-auto md:mx-0">
            <p className="text-base md:text-[clamp(1rem,1.4vw,1.35rem)] text-[#FAF9F6]/90 font-medium leading-relaxed font-[var(--font-body)] drop-shadow-lg">
              Whether you're conceptualizing a landmark design or seeking world-class structural refinement, our engineers are ready to elevate your vision.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CONTENT GRID */}
      <section className="contact-grid relative z-[1] bg-[#FAF9F6] min-h-[100dvh] flex items-center max-w-[1440px] mx-auto px-6 md:px-12 py-32 md:py-48 grid grid-cols-1 lg:grid-cols-12 gap-20 md:gap-32">

        {/* LEFT: INFORMATION & OFFICES */}
        <div className="lg:col-span-12 xl:col-span-4 space-y-32 cursor-explore pt-8">
          <div className="reveal-section space-y-12">
            <div className="group border-b border-[#2B2B2B]/10 pb-12 cursor-pointer overflow-hidden">
              <span className="tier-3 text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block font-medium">Direct Inquiry</span>
              <a href="mailto:hello@tri-element.studio" className="tier-2 relative text-2xl md:text-3xl font-[var(--font-display)] flex items-center justify-between group transition-all duration-700">
                <span className="group-hover:italic transition-all">hello@tri-element.studio</span>
                <ArrowUpRight size={24} className="text-[#B5B0A8] group-hover:text-[#2B2B2B] transition-colors" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[#2B2B2B] translate-y-[200%] group-hover:translate-y-0 transition-transform duration-700" />
              </a>
            </div>

            <div className="group border-b border-[#2B2B2B]/10 pb-12 cursor-pointer">
              <span className="tier-3 text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block font-medium">Global Connect</span>
              <a href="tel:+97142564882" className="tier-2 text-2xl font-[var(--font-display)] flex items-center gap-4 hover:italic transition-all">
                +971 42 564 882
              </a>
            </div>
          </div>

          <div className="reveal-section space-y-16">
            <span className="tier-3 text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 block border-b border-[#2B2B2B]/10 pb-4 font-medium">Global Presence</span>
            <div className="tier-3-container grid grid-cols-1 gap-12">
              {offices.map((o, i) => (
                <div key={i} className="flex gap-10 items-start group">
                  <span className="text-[10px] font-medium text-[#2B2B2B]/30 pt-1">0{i + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl italic font-[var(--font-display)]">{o.city}</h3>
                      <span className="text-[10px] text-[#2B2B2B]/40 font-medium tracking-widest">{o.country}</span>
                    </div>
                    <p className="text-xs text-[#2B2B2B]/50 leading-relaxed max-w-[220px] mb-3 group-hover:text-[#2B2B2B] transition-colors font-light">{o.address}</p>
                    <p className="text-[10px] text-[#2B2B2B]/70 tracking-[0.3em] font-mono">{o.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: INQUIRY FORM */}
        <div className="lg:col-span-12 xl:col-span-8 flex flex-col justify-center cursor-view">
          <div className="reveal-section bg-[#F5F1EA] p-8 md:p-20 rounded-[4rem] relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.03)] selection:bg-[#2B2B2B]/20">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/40 blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B5B0A8]/10 blur-[80px] -z-10" />

            <div className="mb-20">
              <h2 className="tier-1 text-3xl md:text-5xl font-[var(--font-display)] mb-6 italic">Brief Your Vision.</h2>
              <p className="tier-2 text-[#2B2B2B]/50 max-w-sm text-sm leading-relaxed font-light">Tell us about your project or career goals, and we'll reach out to start the dialogue.</p>
              <div className="mt-8 h-px w-20 bg-[#2B2B2B]/10" />
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
                  <div className="flex items-center gap-2 mb-10 opacity-20 text-[7px] tracking-[1.5em] font-mono animate-pulse">
                    <div className="w-1 h-1 bg-[#2B2B2B] rounded-full" />
                    [ CONNECTION_LINK_ESTABLISHED ]
                  </div>

                  <input type="hidden" name="access_key" value="YOUR_ACCESS_KEY_HERE" />
                  <input type="hidden" name="from_name" value="Trielement Studio Contact" />
                  <input type="hidden" name="subject" value="New Project Inquiry from Trielement Studio" />
                  <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
                    <div className="group relative">
                      <input required type="text" name="name" placeholder="Full Name" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-base md:text-lg focus:border-[#2B2B2B] outline-none transition-all placeholder:text-[#2B2B2B]/20 font-[var(--font-body)] font-light" />
                      <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                      <div className="absolute -top-4 right-0 opacity-0 group-focus-within:opacity-100 transition-opacity text-[6px] tracking-widest font-mono text-[#2B2B2B]/30">[ CAPTURING_NAME ]</div>
                    </div>
                    <div className="group relative">
                      <input required type="email" name="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all placeholder:text-[#2B2B2B]/20 font-[var(--font-body)] font-light" />
                      <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                      <div className="absolute -top-4 right-0 opacity-0 group-focus-within:opacity-100 transition-opacity text-[6px] tracking-widest font-mono text-[#2B2B2B]/30">[ SYNCING_COMM_CHANNEL ]</div>
                    </div>
                  </div>

                  <div className="relative group">
                    <select required name="inquiry_type" defaultValue="" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all text-[#2B2B2B]/40 appearance-none font-[var(--font-body)] font-light">
                      <option value="" disabled>Nature of Inquiry</option>
                      <option value="project">Project Quotation</option>
                      <option value="career">Career Application</option>
                      <option value="general">Partnership / Other</option>
                    </select>
                    <ArrowUpRight size={20} className="absolute right-0 bottom-6 text-[#2B2B2B]/20 rotate-45" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                  </div>


                  <div className="relative group">
                    <textarea required name="message" placeholder="Briefly describe your vision..." rows={3} className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-5 text-lg focus:border-[#2B2B2B] outline-none transition-all placeholder:text-[#2B2B2B]/20 resize-none font-[var(--font-body)] font-light" />
                    <div className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#2B2B2B] transition-all duration-700 group-focus-within:w-full" />
                    <div className="absolute -top-4 right-0 opacity-0 group-focus-within:opacity-100 transition-opacity text-[6px] tracking-widest font-mono text-[#2B2B2B]/30">[ STREAMING_INPUT_DATA ]</div>
                  </div>

                  <div className="pt-8 flex flex-col md:flex-row items-center gap-10">
                    <div ref={magneticButtonRef as any}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="relative px-20 py-8 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.4em] font-medium transition-all duration-700 group overflow-hidden disabled:opacity-50"
                      >
                        <span className="relative z-10">{isSubmitting ? 'Transmitting...' : 'Send Inquiry'}</span>
                        <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
                      </button>
                    </div>
                    {isSubmitting && (
                      <div className="text-[7px] tracking-[0.8em] font-mono text-[#2B2B2B]/30 animate-pulse">
                        [ ENCRYPTING_PACKETS_010011 ]
                      </div>
                    )}
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
                  <div className="mb-4 opacity-10 text-[7px] tracking-[2em] font-mono">[ DATA_TRANSMISSION_COMPLETE ]</div>
                  <div className="w-20 h-20 bg-[#2B2B2B] rounded-full flex items-center justify-center mx-auto mb-12">
                    <ArrowUpRight className="text-[#FAF9F6] -rotate-45" size={32} />
                  </div>
                  <h2 className="text-4xl md:text-6xl mb-8 font-[var(--font-display)] italic text-[#2B2B2B]">Transmitted.</h2>
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
      <section className="relative min-h-[100dvh] md:h-screen flex items-center justify-center overflow-hidden bg-white/30 backdrop-blur-3xl border-t border-[#E5E2DB]">
        <div className="max-w-5xl px-6 text-center">
          <span className="tier-3 block text-[10px] uppercase tracking-[1em] text-[#2B2B2B]/20 mb-12 font-medium">Manifesto</span>
          <h2 className="tier-2 text-[clamp(1.5rem,5vw,3.5rem)] text-[#2B2B2B] font-[var(--font-display)] leading-tight italic font-light">
            "Structural engineering is the art of molding materials we do not wholly understand into shapes we cannot precisely analyze, so as to withstand forces we cannot really assess."
          </h2>

        </div>
        {/* Cinematic Subtle Background Text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 select-none pointer-events-none opacity-[0.03] text-[22vw] font-bold tracking-tighter whitespace-nowrap font-[var(--font-display)]">
          <BrandName />
        </div>
      </section>
    </div>
  );
}
