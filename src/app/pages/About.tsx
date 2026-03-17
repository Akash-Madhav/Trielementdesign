import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Heart, Users, Building2 } from 'lucide-react';

const commitments = [
  {
    title: 'Service',
    icon: Heart,
    description: 'We treat every client\'s challenge as our own. Our teams go beyond deliverables to provide consultative, proactive service that anticipates needs before they arise.',
  },
  {
    title: 'Quality',
    icon: Building2,
    description: 'Precision in every detail. Our rigorous design review processes ensure that every drawing, model, and report meets the highest standard of technical excellence.',
  },
  {
    title: 'Understanding',
    icon: Users,
    description: 'We invest in deeply understanding the unique context of every project — its geography, stakeholder goals, and long-term operational vision.',
  },
];

const csrInitiatives = [
  {
    name: 'DFWAC',
    description: 'Dubai Foundation for Women & Children',
    icon: Heart,
  },
  {
    name: 'Pain & Palliative Care',
    description: 'Care Units, Kerala',
    icon: Heart,
  },
  {
    name: 'Labour Welfare',
    description: 'Dubai Labour Camps',
    icon: Users,
  },
];

export default function About() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="bg-white pt-24">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center">
        <div className="max-w-[1440px] mx-auto px-6 md:px-[120px] grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <p className="text-[#C8972B] text-xs tracking-[0.3em] uppercase font-['JetBrains_Mono'] mb-4">
                EST. 2005 · DUBAI
              </p>
              <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
                Engineering with Purpose
              </h1>
              <p className="text-lg text-[#6B6B7A] font-['Inter'] leading-relaxed">
                SEED Engineering Consultants was formed in 2005 with a vision to bridge the gap in building 
                engineering and to positively impact the design of MEP Engineering Services worldwide.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="relative h-[400px] md:h-[500px]">
              <motion.div
                className="absolute inset-0 opacity-20"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, ease: 'easeInOut' }}
              >
                <svg className="w-full h-full" viewBox="0 0 400 500">
                  <motion.path
                    d="M50 50 L350 50 L350 450 L50 450 Z M100 100 L100 400 M150 100 L150 400 M200 100 L200 400 M250 100 L250 400 M300 100 L300 400"
                    stroke="#C8972B"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />
                  <motion.circle cx="200" cy="250" r="80" stroke="#C8972B" strokeWidth="2" fill="none" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2, delay: 1 }}
                  />
                </svg>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Principles Quote */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <blockquote className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] italic mb-8 leading-tight">
            "Sustainable & Energy-Efficient Design is not just our practice — it is our purpose."
          </blockquote>
          <p className="text-lg text-[#6B6B7A] font-['Inter'] max-w-3xl">
            Our sustainability group within SEED Engineering lends management and advisory services to 
            Green Building projects across UAE and India.
          </p>
        </ScrollReveal>
      </section>

      {/* The SEED Commitment */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
            The SEED Commitment
          </h2>
          <p className="text-lg text-[#6B6B7A] font-['Inter'] mb-12 max-w-3xl">
            Our experience across industries and sectors has led us to identify three key elements in the 
            success of engineering in any project.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => (
            <ScrollReveal key={commitment.title} delay={index * 0.1}>
              <motion.div
                className="relative p-8 rounded-lg backdrop-blur-md bg-[rgba(0,0,0,0.02)] 
                         border border-[rgba(0,0,0,0.08)] overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, index)}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  transform: hoveredCard === index
                    ? `perspective(800px) rotateX(${(mousePosition.y - 150) / 20}deg) rotateY(${(mousePosition.x - 150) / 20}deg)`
                    : 'perspective(800px) rotateX(0deg) rotateY(0deg)',
                }}
                transition={{ duration: 0.1 }}
              >
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(200,151,43,0.15), transparent 60%)`,
                    }}
                  />
                )}
                <commitment.icon className="w-12 h-12 text-[#C8972B] mb-4" />
                <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-4">
                  {commitment.title}
                </h3>
                <p className="text-[#6B6B7A] font-['Inter'] leading-relaxed">
                  {commitment.description}
                </p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Built on Experience */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto bg-[#F8F8FA]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <div>
              <div className="mb-8">
                <div className="text-7xl font-['Cormorant_Garamond'] text-[#C8972B] mb-2">60+</div>
                <div className="text-xl text-[#6B6B7A] font-['Inter']">Design Professionals</div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div>
              <p className="text-lg text-[#6B6B7A] font-['Inter'] leading-relaxed mb-6">
                SEED is one of the fastest-growing engineering practices in the cities we serve, with offices 
                across Dubai, Kochi, and Bangalore.
              </p>
              <p className="text-lg text-[#6B6B7A] font-['Inter'] leading-relaxed">
                Our focus on quality in design and deliverables has lent us credibility that takes us to 
                landmark projects in the Middle East, Africa, and the Indian sub-continent.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CSR Section */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-6">
            Beyond Projects. Beyond Profits.
          </h2>
          <p className="text-lg text-[#6B6B7A] font-['Inter'] mb-12 max-w-3xl">
            We understand that businesses have responsibilities beyond their bottom line. Our role in 
            improving the world around us is pivotal.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {csrInitiatives.map((initiative, index) => (
            <ScrollReveal key={initiative.name} delay={index * 0.1}>
              <motion.div
                className="p-8 rounded-lg bg-[rgba(0,0,0,0.02)] border border-[rgba(0,0,0,0.05)]
                         hover:border-[#C8972B] transition-all"
                whileHover={{ y: -8 }}
              >
                <initiative.icon className="w-10 h-10 text-[#C8972B] mb-4" />
                <h3 className="text-xl font-['Cormorant_Garamond'] text-[#0A0A0C] mb-2">
                  {initiative.name}
                </h3>
                <p className="text-[#6B6B7A] font-['Inter']">{initiative.description}</p>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="text-sm text-[#6B6B7A] font-['Inter'] text-center">
            To seek our support or learn more, write to{' '}
            <a href="mailto:contact@seedengineering.com" className="text-[#C8972B] hover:underline">
              contact@seedengineering.com
            </a>
          </p>
        </ScrollReveal>
      </section>
    </div>
  );
}