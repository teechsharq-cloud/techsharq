import React from 'react';
import { motion } from 'framer-motion';

export default function EnBg() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-[#000500]">
      <div className="absolute inset-0 bg-radial-gradient from-green-900/20 to-transparent blur-2xl" />
    </motion.div>
  );
}