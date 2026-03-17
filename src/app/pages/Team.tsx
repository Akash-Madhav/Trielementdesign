import { useState } from 'react';
import { motion } from 'motion/react';
import { ScrollReveal } from '../components/ScrollReveal';
import { Linkedin } from 'lucide-react';

const leaders = [
  {
    name: 'Sanu Mathew',
    role: 'Managing Director',
    bio: '30 years of experience in Building Services Design, Site Supervision, and Project Management. As a founding member of SEED, Sanu inspires the team through his passion for excellence and sustainable design.',
    image: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzcxMjM4OXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Anand Krishnan',
    role: 'Director',
    bio: 'Chartered Engineer with 36 years of experience. Anand nurtures key client relationships and mentors the team to the highest levels of technical competency and self-reliance.',
    image: 'https://images.unsplash.com/photo-1584940121258-c2553b66a739?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW5pb3IlMjBleGVjdXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzM3MzMwNzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    name: 'Sankar N. Menon',
    role: 'Director',
    bio: 'Senior Mechanical Engineer with over 53 years of professional experience spanning planning, design, tendering, and execution of engineering services. Sankar heads SEED\'s Kochi operations, bringing unparalleled depth of knowledge in MEP systems.',
    image: 'https://images.unsplash.com/photo-1747811854184-95f49a6d024d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdpbmVlciUyMHByb2Zlc3Npb25hbCUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MzY3MTA2NHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export default function Team() {
  const [hoveredLeader, setHoveredLeader] = useState<number | null>(null);

  return (
    <div className="bg-[#0A0A0C] pt-24">
      {/* Hero Section */}
      <section className="min-h-[60vh] flex items-center px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <ScrollReveal>
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
              Our People
            </h1>
            <p className="text-xl text-[#8A8A9A] font-['Inter'] leading-relaxed">
              Our people are our roots — the foundation on which we are built. Our leadership brings an 
              uncanny sense of quality and adherence to effective service delivery.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* Leadership Grid */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <ScrollReveal key={leader.name} delay={index * 0.1}>
              <motion.div
                className="group relative bg-[#16161E] rounded-sm overflow-hidden cursor-pointer"
                onMouseEnter={() => setHoveredLeader(index)}
                onMouseLeave={() => setHoveredLeader(null)}
              >
                {/* Portrait Image */}
                <div className="relative h-[400px] overflow-hidden">
                  <motion.img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                    style={{
                      filter: hoveredLeader === index ? 'grayscale(0)' : 'grayscale(1)',
                    }}
                    animate={{
                      scale: hoveredLeader === index ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />

                  {/* Name & Role (Always Visible) */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-[#C8972B] font-['Inter']">{leader.role}</p>
                  </div>

                  {/* Bio Panel (Slides Up on Hover) */}
                  <motion.div
                    className="absolute inset-0 bg-[#0A0A0C]/95 p-6 flex flex-col justify-center"
                    initial={{ y: '100%' }}
                    animate={{ y: hoveredLeader === index ? '0%' : '100%' }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  >
                    <h3 className="text-2xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-2">
                      {leader.name}
                    </h3>
                    <p className="text-sm text-[#C8972B] font-['Inter'] mb-4">{leader.role}</p>
                    <p className="text-[#8A8A9A] font-['Inter'] text-sm leading-relaxed mb-4">
                      {leader.bio}
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[#C8972B] hover:text-[#d4a535] transition-colors"
                    >
                      <Linkedin size={18} />
                      <span className="text-sm font-['Inter']">Connect</span>
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 md:px-[120px] max-w-[1440px] mx-auto bg-[#111116]">
        <ScrollReveal>
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] text-[#F0EDE8] mb-6">
              Built on Integrity
            </h2>
            <p className="text-lg text-[#8A8A9A] font-['Inter'] leading-relaxed">
              Every member of the SEED team is united by a shared commitment to technical excellence, 
              client service, and sustainable innovation. We believe that the strength of our work is 
              inseparable from the strength of our people.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
