import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';

const partners = [
  'Gensler', 'HOK', 'Perkins+Will', 'SOM', 'Kohn Pedersen Fox',
  'Foster + Partners', 'Zaha Hadid Architects', 'BIG', 'NBBJ', 'Aedas',
  'Atkins', 'AECOM', 'Jacobs', 'Woods Bagot', 'Arquitectonica',
  'Callison RTKL', 'Benoy', 'DP Architects', 'Broadway Malyan', 'Godwin Austen Johnson',
];

export default function Partnerships() {
  return (
    <div className="bg-[#0A0A0C] pt-24">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex items-center px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
              Globally Collaborative
            </h1>
            <p className="text-2xl text-[#C8972B] font-['Cormorant_Garamond'] italic mb-8">
              Sowing the seeds of a shared future.
            </p>
            <p className="text-lg text-[#8A8A9A] font-['Inter'] leading-relaxed">
              SEED has associated with major international architects and consultants, enabling streamlined 
              design processes and innovative engineering concepts based on the latest global trends.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Partner Logos Grid */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="text-3xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-12 text-center">
            Our Global Network
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {partners.map((partner, index) => (
            <ScrollReveal key={partner} delay={index * 0.02}>
              <motion.div
                className="aspect-square flex items-center justify-center p-6 
                         bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] 
                         rounded-sm text-center hover:border-[#C8972B] transition-all"
                whileHover={{ y: -8, backgroundColor: 'rgba(200,151,43,0.05)' }}
              >
                <span className="text-[#8A8A9A] hover:text-[#F0EDE8] font-['Inter'] text-sm transition-colors">
                  {partner}
                </span>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Infinite Scrolling Marquee */}
      <section className="py-16 overflow-hidden bg-[#111116]">
        <div className="mb-8">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [0, -1200] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <span
                key={index}
                className="text-2xl font-['Cormorant_Garamond'] text-[#8A8A9A]/30"
              >
                {partner}
              </span>
            ))}
          </motion.div>
        </div>

        <div>
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: [-1200, 0] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <span
                key={index}
                className="text-2xl font-['Cormorant_Garamond'] text-[#8A8A9A]/30"
              >
                {partner}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Philosophy Band */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-3xl md:text-4xl font-['Cormorant_Garamond'] text-[#F0EDE8] italic leading-tight mb-8">
              "Every great building begins with a great collaboration. At SEED, partnerships are not 
              transactions — they are long-term relationships built on shared excellence."
            </blockquote>
          </div>
        </ScrollReveal>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto bg-[#111116]">
        <ScrollReveal>
          <h2 className="text-4xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-12 text-center">
            Why Partner with SEED?
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          <ScrollReveal delay={0.1}>
            <div className="p-8 bg-[rgba(255,255,255,0.02)] rounded-sm border border-[rgba(255,255,255,0.05)]">
              <div className="text-5xl font-['Cormorant_Garamond'] text-[#C8972B] mb-4">01</div>
              <h3 className="text-xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-3">
                Technical Excellence
              </h3>
              <p className="text-[#8A8A9A] font-['Inter'] leading-relaxed">
                Our team brings deep MEP expertise and sustainable design capabilities to every collaboration.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 bg-[rgba(255,255,255,0.02)] rounded-sm border border-[rgba(255,255,255,0.05)]">
              <div className="text-5xl font-['Cormorant_Garamond'] text-[#C8972B] mb-4">02</div>
              <h3 className="text-xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-3">
                Regional Insight
              </h3>
              <p className="text-[#8A8A9A] font-['Inter'] leading-relaxed">
                Offices across the Middle East and India provide on-ground expertise and local knowledge.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="p-8 bg-[rgba(255,255,255,0.02)] rounded-sm border border-[rgba(255,255,255,0.05)]">
              <div className="text-5xl font-['Cormorant_Garamond'] text-[#C8972B] mb-4">03</div>
              <h3 className="text-xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-3">
                Collaborative Spirit
              </h3>
              <p className="text-[#8A8A9A] font-['Inter'] leading-relaxed">
                We integrate seamlessly with design teams, working as an extension of your practice.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
            Let's Collaborate
          </h2>
          <p className="text-lg text-[#8A8A9A] font-['Inter'] mb-8 max-w-2xl mx-auto">
            Interested in partnering with SEED? We'd love to explore how we can support your next project.
          </p>
          <a
            href="/contact"
            className="inline-block px-12 py-4 bg-[#C8972B] text-[#0A0A0C] rounded-sm font-['Inter'] 
                     hover:bg-[#d4a535] transition-all"
          >
            Get in Touch
          </a>
        </ScrollReveal>
      </section>
    </div>
  );
}
