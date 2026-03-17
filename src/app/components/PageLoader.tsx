import { motion } from 'motion/react';

export function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-white flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      onAnimationComplete={(definition: any) => {
        if (definition.opacity === 0) {
          const loader = document.getElementById('page-loader');
          if (loader) loader.style.display = 'none';
        }
      }}
      id="page-loader"
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-6xl font-['Cormorant_Garamond'] text-[#C8972B] tracking-[0.3em] mb-4 flex items-center justify-center gap-2">
            TRI - EL
            <span className="inline-flex flex-col gap-[3px] mx-[2px]">
              <span className="w-[16px] h-[3px] bg-[#C8972B] rounded-full"></span>
              <span className="w-[16px] h-[3px] bg-[#C8972B] rounded-full"></span>
              <span className="w-[16px] h-[3px] bg-[#C8972B] rounded-full"></span>
            </span>
            MENT
          </h1>
          <motion.div
            className="flex gap-2 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="w-2 h-2 rounded-full bg-[#C8972B]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#C8972B]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 rounded-full bg-[#C8972B]"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}