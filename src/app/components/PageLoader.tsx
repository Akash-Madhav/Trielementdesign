import { motion } from 'motion/react';
import BrandWordmark from '../../imports/BrandWordmark';

export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <BrandWordmark showStudio={false} className="text-4xl" />
        </motion.div>

        {/* Loading Animation */}
        <motion.div
          className="flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className="w-2 h-2 bg-[var(--color-accent-signal)] rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          className="text-[var(--color-ink)] opacity-40 text-xs tracking-[0.2em] uppercase mt-8 font-[var(--font-body)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 0.5 }}
        >
          Design. Integrate. Sustain.
        </motion.p>
      </div>
    </motion.div>
  );
}
