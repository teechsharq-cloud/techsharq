import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const content = {
  subtitle: "ALGORITMLAR IMPERIYASI", 
  titlePart1: "RAQAMLI",
  titlePart2: "EVOLYUTSIYA", 
  titlePart3: "ME'MORLARI",
  description: "Biz shunchaki kod yozmaymiz, biz davrni o'zgartiradigan raqamli ekotizimlarga jon kiritamiz. Sun'iy intellekt va blokcheyn qudrati bilan bugun imkonsiz tuyulgan g'oyalarni ertangi kunning haqiqatiga aylantiramiz.",
  buttonText: "Koinotni Kashf Etish" 
};

// ==========================================
// 1. MIKRO-GLITCH: 0.4s TEZLIK + FRAKTAL RANGLAR
// ==========================================
const GlitchedChar = ({ char, isNeon }) => {
  const [isGlitching, setIsGlitching] = useState(false);
  const baseShadow = isNeon ? "0 0 20px rgba(0,210,255,0.6)" : "0 0 0px transparent";
  const baseColor = isNeon ? "text-[#00d2ff]" : "text-white";

  useEffect(() => {
    let timeoutId;
    
    const scheduleNext = () => {
      // Sokinlik saqlanadi (bitta harf 20-50 soniyada bir marta tok uradi)
      const randomDelay = Math.random() * 30000 + 20000; 
      timeoutId = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          scheduleNext();
        }, 400); // <--- ENG TEZ: 0.4 SONIYA (Mikro-Glitch)
      }, randomDelay);
    };

    // Boshlanishdagi tasodifiy tok urishlar
    timeoutId = setTimeout(() => {
        setIsGlitching(true);
        setTimeout(() => {
          setIsGlitching(false);
          scheduleNext();
        }, 400); // <--- ENG TEZ: 0.4 SONIYA
    }, Math.random() * 20000 + 1000);

    return () => clearTimeout(timeoutId);
  }, []);

  const burstTransition = {
    duration: 0.4, // <--- ANIMATSIYA HAM 0.4 SONIYA
    ease: "steps(4, end)", // "steps" - bu harakatni silliq emas, pikselli/robotlashgan qiladi (kuchli effekt!)
    times: [0, 0.25, 0.5, 0.75, 1], // Qisqa tebranish intervallari
  };

  return (
    <span className="relative inline-block whitespace-pre" data-char={char}>
      
      {/* 0. ASOSIY HARF (Glitch vaqtida qisqa yo'qoladi) */}
      <motion.span
        className={`relative z-10 ${baseColor}`}
        style={{ textShadow: baseShadow }}
        animate={{ opacity: isGlitching ? 0 : 1 }} 
        transition={{ duration: 0.1 }} 
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

      {/* 1. QIRQILGAN BO'LAK: TEPASI (Yashil/Binafsha soyalar ham qo'shildi) */}
      <motion.span
        className={`absolute inset-0 z-20 ${baseColor}`}
        initial={{ opacity: 0, clipPath: "inset(0 0 70% 0)" }} 
        animate={isGlitching ? {
          opacity: 1,
          x: [0, -15, 20, -10, 0], // Keskin siljish (Steps bilan)
          skewX: [0, -8, 10, -5, 0], 
          textShadow: [
            `-5px 0 0 #ff003c, 5px 0 0 #00ffff, -2px -2px 0 #39ff14, ${baseShadow}`, // Qizil, Ko'k va Neon Yashil
            `5px 0 0 #ff003c, -5px 0 0 #00ffff, 2px 2px 0 #ff00ff, ${baseShadow}`, // + Binafsharang
            `-5px 0 0 #ff003c, 5px 0 0 #00ffff, 3px -3px 0 #39ff14, ${baseShadow}`,
            `5px 0 0 #ff003c, -5px 0 0 #00ffff, -2px 2px 0 #ff00ff, ${baseShadow}`,
            baseShadow
          ]
        } : { opacity: 0, x: 0, skewX: 0 }}
        transition={burstTransition}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

      {/* 2. QIRQILGAN BO'LAK: O'RTASI */}
      <motion.span
        className={`absolute inset-0 z-20 ${baseColor}`}
        initial={{ opacity: 0, clipPath: "inset(30% 0 30% 0)" }} 
        animate={isGlitching ? {
          opacity: 1,
          x: [0, 25, -15, 20, 0], // Keskin teskari siljish
          skewX: [0, 15, -10, 12, 0], 
          textShadow: [
            `5px 0 0 #00ffff, -5px 0 0 #ff003c, 3px 3px 0 #ff00ff, ${baseShadow}`, // Ko'k, Qizil va Binafsha
            `-5px 0 0 #00ffff, 5px 0 0 #ff003c, -3px -3px 0 #39ff14, ${baseShadow}`, // + Yashil
            `5px 0 0 #00ffff, -5px 0 0 #ff003c, 2px -2px 0 #ff00ff, ${baseShadow}`,
            `-5px 0 0 #00ffff, 5px 0 0 #ff003c, -2px 2px 0 #39ff14, ${baseShadow}`,
            baseShadow
          ]
        } : { opacity: 0, x: 0, skewX: 0 }}
        transition={burstTransition}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

      {/* 3. QIRQILGAN BO'LAK: PASTKI QISMI */}
      <motion.span
        className={`absolute inset-0 z-20 ${baseColor}`}
        initial={{ opacity: 0, clipPath: "inset(70% 0 0 0)" }} 
        animate={isGlitching ? {
          opacity: 1,
          x: [0, -10, 15, -5, 0], 
          skewX: [0, -5, 8, -3, 0], 
          textShadow: [
            `-4px 0 0 #ff003c, 4px 0 0 #00ffff, -2px 2px 0 #39ff14, ${baseShadow}`,
            `4px 0 0 #ff003c, -4px 0 0 #00ffff, 2px -2px 0 #ff00ff, ${baseShadow}`,
            `-4px 0 0 #ff003c, 4px 0 0 #00ffff, -3px -3px 0 #39ff14, ${baseShadow}`,
            `4px 0 0 #ff003c, -4px 0 0 #00ffff, 3px 3px 0 #ff00ff, ${baseShadow}`,
            baseShadow
          ]
        } : { opacity: 0, x: 0, skewX: 0 }}
        transition={burstTransition}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>

    </span>
  );
};

const renderGlitchedWord = (word, isNeon = false) => {
  return word.split("").map((char, index) => (
    <GlitchedChar key={index} char={char} isNeon={isNeon} />
  ));
};

// ==========================================
// 2. KASKAD ANIMATSIYALAR VA YONIB YARATILISH
// ==========================================
const sentence = {
  hidden: { opacity: 1 },
  visible: { opacity: 1, transition: { delay: 0.8, staggerChildren: 0.03 } },
};

const letter = {
  hidden: { opacity: 0, display: "none" },
  visible: { opacity: 1, display: "inline" }, 
};

const titleVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
};

export default function HeroText() {
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  return (
    <div className="w-full lg:w-[45%] z-20 pointer-events-auto flex flex-col justify-center pr-10 pl-4">
      
      {/* SHIOR */}
      <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="flex items-center gap-3 mb-6">
        <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-12 h-[2px] bg-[#00d2ff] shadow-[0_0_15px_#00d2ff]" />
        <span className="text-[#00d2ff] text-[11px] md:text-sm font-bold tracking-[0.4em] uppercase drop-shadow-[0_0_8px_#00d2ff]">
          {content.subtitle}
        </span>
      </motion.div>

      {/* ASOSIY SARLAVHA */}
      <motion.h1 
        initial="hidden" 
        animate="visible" 
        transition={{ staggerChildren: 0.2 }}
        className="text-5xl md:text-[75px] font-black leading-[1.05] mb-8 uppercase tracking-tighter"
      >
        <motion.div variants={titleVariants} className="pb-1 overflow-visible text-white">
          {renderGlitchedWord(content.titlePart1, false)}
        </motion.div>
        
        <motion.div variants={titleVariants} className="pb-1 overflow-visible relative">
          <span className="relative z-10 drop-shadow-[0_0_15px_rgba(0,210,255,0.8)]">
            {renderGlitchedWord(content.titlePart2, true)}
          </span>
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[80%] h-[120%] bg-[#00d2ff] blur-[60px] opacity-15 pointer-events-none" />
        </motion.div>

        <motion.div variants={titleVariants} className="overflow-visible text-white">
          {renderGlitchedWord(content.titlePart3, false)}
        </motion.div>
      </motion.h1>
      
      {/* IZOH */}
      <motion.div 
        variants={sentence}
        initial="hidden"
        animate="visible"
        onAnimationComplete={() => setIsTypingComplete(true)}
        className="relative text-[#a3c2e0] text-base md:text-[17px] leading-[1.8] font-medium mb-12 max-w-[95%] border-l-[3px] border-[#00d2ff]/40 pl-6 whitespace-pre-wrap"
        style={{ textShadow: "0 0 10px rgba(0,210,255,0.1)" }}
      >
        {content.description.split("").map((char, index) => (
          <motion.span key={char + "-" + index} variants={letter}>
            {char}
          </motion.span>
        ))}
        {!isTypingComplete && (
          <motion.span 
            animate={{ opacity: [1, 0, 1] }} 
            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            className="inline-block w-[2px] h-5 bg-[#00d2ff] ml-1 align-middle shadow-[0_0_10px_#00d2ff]"
          />
        )}
      </motion.div>
      
      {/* TUGMA */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: isTypingComplete ? 1 : 0, y: isTypingComplete ? 0 : 20 }} transition={{ duration: 0.6 }}>
        <button className="relative group overflow-hidden px-10 py-4 bg-[#0a1128]/50 backdrop-blur-md border border-[#00d2ff]/30 rounded-full text-white font-black uppercase tracking-widest text-xs transition-all duration-300 hover:border-[#00d2ff] hover:bg-[#00d2ff]/10 hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:scale-105">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-[#00d2ff]/30 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out" />
          <span className="relative z-10 flex items-center gap-2">
            {content.buttonText}
            <span className="text-[#00d2ff] group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </button>
      </motion.div>

    </div>
  );
}