import { Link } from 'react-router';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-6 selection:bg-[#2B2B2B]/10">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
          className="mb-12"
        >
          <span
            className="font-[var(--font-display)] italic text-[#2B2B2B]/10 leading-none"
            style={{ fontSize: 'clamp(8rem, 25vw, 15rem)' }}
          >
            404
          </span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: "circOut" }}
          className="text-4xl md:text-5xl font-[var(--font-display)] text-[#2B2B2B] mb-6 italic"
        >
          Lost in Space.
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: "circOut" }}
          className="text-lg text-[#2B2B2B]/60 font-[var(--font-body)] mb-12 max-w-sm mx-auto leading-relaxed"
        >
          The coordinate you're seeking doesn't exist within our technical grid. 
          Let us return to the foundation.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
        >
          <Link
            to="/"
            className="inline-block px-12 py-5 bg-[#2B2B2B] text-[#FAF9F6] rounded-full text-[11px] uppercase tracking-[0.3em] font-medium transition-all duration-700 hover:scale-105 active:scale-95"
          >
            Return Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}