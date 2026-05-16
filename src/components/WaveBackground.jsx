import React from 'react';
import { motion } from 'framer-motion';

const WaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-black">
      {/* To'lqinlar qatlami */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at ${20 + i * 15}% ${30 + i * 10}%, var(--primary-color) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Pastki oqim simulyatsiyasi */}
      <div className="absolute bottom-0 w-full h-[40vh] bg-gradient-to-t from-primary/20 to-transparent blur-3xl" />
    </div>
  );
};

export default WaveBackground;