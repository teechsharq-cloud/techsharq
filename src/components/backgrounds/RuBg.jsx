import React from 'react';
import { motion } from 'framer-motion';

export default function RuBg() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#0a0000]">
      <div className="absolute inset-0 opacity-10 font-mono text-[10px] text-red-500 overflow-hidden">
        {Array(50).fill("SYSTEM.BUILD('CORE_RU'); ").map((t, i) => (
          <div key={i} className="whitespace-nowrap animate-pulse">{t.repeat(20)}</div>
        ))}
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] border-t border-x border-red-500/20 bg-gradient-to-t from-red-600/10 to-transparent" />
    </motion.div>
  );
}