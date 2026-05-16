import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  { id: 1, title: "EL TAXI", users: "1,200+", desc: "Tumanlar uchun arzon taksi", icon: "🚗" },
  { id: 2, title: "YO'LYO'LAKAY", users: "1M+", desc: "AI hujjat tahlili", icon: "🤖" },
  { id: 3, title: "CLAUSEG.AI", users: "500+", desc: "LegalTech AI tizimi", icon: "⚖️" },
  { id: 4, title: "SHARQMOVI", users: "10K+", desc: "Kino bot ekotizimi", icon: "🎬" },
];

const CoreSphere = () => {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      <AnimatePresence>
        {!selectedId && (
          <motion.div 
            initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 2, opacity: 0 }}
            className="relative w-64 h-64 flex items-center justify-center"
          >
            {/* Markaziy Sfera (2-rasmdagi) */}
            <div className="absolute w-full h-full rounded-full bg-primary/20 blur-3xl animate-pulse" />
            <img src="/sphere-core.png" className="z-10 w-full animate-[spin_20s_linear_infinite]" />

            {/* Aylanuvchi kartalar */}
            {projects.map((item, index) => {
              const angle = (index / projects.length) * Math.PI * 2;
              const x = Math.cos(angle) * 300;
              const y = Math.sin(angle) * 150;

              return (
                <motion.div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  className="absolute p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl cursor-pointer w-40 text-center"
                  animate={{
                    x: [x, x + 10, x],
                    y: [y, y - 10, y],
                  }}
                  transition={{ duration: 4, repeat: Infinity, delay: index }}
                  whileHover={{ scale: 1.2, zIndex: 50 }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="font-bold text-xs">{item.title}</div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tanlangan karta kengayishi */}
      <AnimatePresence>
        {selectedId && (
          <motion.div 
            layoutId={selectedId}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-xl"
          >
            <motion.div className="bg-zinc-900 border border-primary/50 p-10 rounded-3xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(0,210,255,0.3)]">
               <button onClick={() => setSelectedId(null)} className="absolute top-6 right-6 text-2xl text-white/50 hover:text-white">✕</button>
               
               <div className="flex gap-8 items-center">
                  <div className="text-8xl">{projects.find(p => p.id === selectedId).icon}</div>
                  <div>
                    <h2 className="text-5xl font-bold text-primary mb-4">{projects.find(p => p.id === selectedId).title}</h2>
                    <p className="text-xl text-gray-400 mb-6">{projects.find(p => p.id === selectedId).desc}</p>
                    <div className="flex items-center gap-4">
                      <span className="px-4 py-2 bg-primary/20 rounded-lg text-primary font-mono text-xl">
                        {projects.find(p => p.id === selectedId).users} foydalanuvchi
                      </span>
                      <button className="bg-primary text-black px-8 py-3 rounded-full font-bold">LOYIHANI KO'RISH</button>
                    </div>
                  </div>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CoreSphere;