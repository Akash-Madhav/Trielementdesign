import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, MapPin, Phone, ArrowUpRight } from 'lucide-react';

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Entrance
      gsap.from('.contact-reveal', {
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 1.8,
        ease: 'expo.out',
        delay: 0.3
      });

      // Form & Info Reveal
      gsap.from('.section-reveal', {
        y: 40,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: '.contact-content',
          start: 'top 85%',
        }
      });
    }, containerRef);

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
    <div ref={containerRef} className="bg-[#FAF9F6] min-h-screen pt-40 pb-64 px-6 md:px-12 selection:bg-[#2B2B2B]/10">
      
      {/* --- PREMIUM HERO --- */}
      <section className="max-w-[1440px] mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
           <div>
              <span className="contact-reveal block text-[10px] uppercase tracking-[0.5em] text-[#2B2B2B]/50 mb-8 font-medium">Inquiry</span>
              <h1 className="contact-reveal text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-tighter mb-10">
                Let's Start a <br /> <i>Dialogue</i>.
              </h1>
           </div>
           <div className="contact-reveal max-w-md pb-10">
              <p className="text-lg md:text-xl text-[#2B2B2B]/60 leading-relaxed font-[var(--font-body)]">
                Whether you're conceptualizing a landmark or refining a vision, 
                our engineers are ready to elevate your project.
              </p>
           </div>
        </div>
        <div className="contact-reveal w-full h-[1px] bg-[#E5E2DB]" />
      </section>

      {/* --- CONTACT CONTENT --- */}
      <section className="max-w-[1440px] mx-auto contact-content grid grid-cols-1 lg:grid-cols-12 gap-20 md:gap-32">
        
        {/* --- LEFT: INFOMATION --- */}
        <div className="lg:col-span-4 space-y-20 section-reveal">
           {/* Direct Email */}
           <div className="group">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 mb-6 block">Email</span>
              <a href="mailto:hello@tri-element.studio" className="text-2xl font-[var(--font-display)] flex items-center gap-4 hover:italic transition-all duration-500">
                hello@tri-element.studio <ArrowUpRight size={20} className="text-[#B5B0A8] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </a>
           </div>

           {/* Offices */}
           <div className="space-y-12">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#2B2B2B]/40 block">Global Presence</span>
              {offices.map((o, i) => (
                 <div key={i} className="flex gap-10 items-start">
                    <span className="text-[10px] font-medium text-[#2B2B2B]/30 pt-1">{o.country}</span>
                    <div>
                       <h3 className="text-xl mb-2 italic">{o.city}</h3>
                       <p className="text-xs text-[#2B2B2B]/50 leading-loose max-w-[200px] mb-2">{o.address}</p>
                       <p className="text-[10px] text-[#2B2B2B]/70 tracking-widest">{o.phone}</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>

        {/* --- RIGHT: FORM --- */}
        <div className="lg:col-span-8 section-reveal">
           <div className="bg-[#F5F1EA]/50 p-8 md:p-16 rounded-[40px] relative overflow-hidden">
             {/* Background Bloom */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 blur-[100px] -z-10" />
             
             <AnimatePresence mode="wait">
               {!success ? (
                 <motion.form 
                   key="form"
                   onSubmit={handleSubmit}
                   className="space-y-12"
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.6 }}
                 >
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div className="relative">
                        <input required type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-4 text-base focus:border-[#2B2B2B] outline-none transition-colors placeholder:text-[#2B2B2B]/20" />
                      </div>
                      <div className="relative">
                        <input required type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-4 text-base focus:border-[#2B2B2B] outline-none transition-colors placeholder:text-[#2B2B2B]/20" />
                      </div>
                   </div>

                   <div className="relative">
                      <select required className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-4 text-base focus:border-[#2B2B2B] outline-none transition-colors text-[#2B2B2B]/20 appearance-none">
                         <option value="" disabled selected>Nature of Inquiry</option>
                         <option value="project">Project Quotation</option>
                         <option value="career">Job Application</option>
                         <option value="general">General Inquiry</option>
                      </select>
                   </div>

                   <div className="relative">
                      <textarea required placeholder="Briefly describe your vision..." rows={4} className="w-full bg-transparent border-b border-[#2B2B2B]/10 py-4 text-base focus:border-[#2B2B2B] outline-none transition-colors placeholder:text-[#2B2B2B]/20 resize-none" />
                   </div>

                   <button 
                     type="submit" 
                     disabled={isSubmitting}
                     className="px-16 py-6 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[12px] uppercase tracking-[0.3em] font-medium transition-all duration-700 hover:scale-105 active:scale-95 disabled:opacity-50"
                   >
                     {isSubmitting ? 'Transmitting...' : 'Send Inquiry'}
                   </button>
                 </motion.form>
               ) : (
                 <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-20"
                 >
                    <h2 className="text-4xl md:text-6xl mb-8 italic">Received.</h2>
                    <p className="text-lg text-[#2B2B2B]/60 max-w-sm mx-auto mb-10">
                       Our engineers are reviewing your message. We shall reach out shortly to begin the dialogue.
                    </p>
                    <button onClick={() => setSuccess(false)} className="text-[10px] uppercase tracking-widest text-[#2B2B2B]/40 hover:text-[#2B2B2B] transition-colors">Send Another Message</button>
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>

      </section>

      {/* --- FOOTER TEASER VISUAL --- */}
      <section className="section-reveal py-64 mt-40 flex justify-center overflow-hidden">
         <div className="relative w-full max-w-[1440px] aspect-video">
            <img 
               src="https://images.unsplash.com/photo-1544450171-f9b71b12f112?auto=format&fit=crop&q=80&w=2000" 
               className="w-full h-full object-cover grayscale opacity-20" 
               alt="Abstract Architecture" 
            />
            <div className="absolute inset-0 bg-[#FAF9F6] mix-blend-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
               <h2 className="text-[clamp(1.5rem,5vw,4rem)] text-[#2B2B2B]/20 font-[var(--font-display)] leading-tight text-center max-w-4xl px-6">
                 "Architecture is the learned game, correct and magnificent, of forms assembled in the light."
               </h2>
            </div>
         </div>
      </section>

    </div>
  );
}