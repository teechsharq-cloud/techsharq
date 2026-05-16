import React from 'react';
import { motion } from 'framer-motion';

const CyberSphere = () => {
  return (
    <div className="relative w-64 h-64 flex items-center justify-center">
      {/* Tashqi aylanuvchi xalqalar */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute w-full h-full border-2 border-dashed border-primary/30 rounded-full"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute w-[80%] h-[80%] border border-primary/50 rounded-full border-t-transparent"
      />
      
      {/* Markaziy Yadro (Glow) */}
      <div className="relative w-32 h-32 rounded-full bg-primary shadow-[0_0_60px_rgba(0,210,255,0.8)] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
        <div className="z-10 text-black font-black text-xs">ST-CORE</div>
      </div>
    </div>
  );
};

export default CyberSphere;