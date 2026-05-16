import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const translations = {
  uz: { menus: [{ id: 'ecosystem', label: 'Ekotizim' }, { id: 'projects', label: 'Loyihalar' }, { id: 'services', label: 'Xizmatlar' }, { id: 'team', label: 'Jamoa' }] },
  ru: { menus: [{ id: 'ecosystem', label: 'Экосистема' }, { id: 'projects', label: 'Проекты' }, { id: 'services', label: 'Услуги' }, { id: 'team', label: 'Команда' }] },
  en: { menus: [{ id: 'ecosystem', label: 'Ecosystem' }, { id: 'projects', label: 'Projects' }, { id: 'services', label: 'Services' }, { id: 'team', label: 'Team' }] }
};

// ==========================================
// TUZATILGAN MENYU ANIMATSIYASI
// ==========================================
const AnimatedMenuLink = ({ id, text, onClick }) => {
  return (
    <motion.a
      onClick={() => onClick(id)}
      initial="initial"
      whileHover="hover"
      className="relative flex flex-col items-center justify-center cursor-pointer px-2 py-2 group"
    >
      {/* 20px aniq balandlik berildi va flex items-center olib tashlandi */}
      <div className="relative h-[20px] overflow-hidden">
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: "-20px" } // Aniq 20 piksel yuqoriga siljiydi
          }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          className="flex flex-col"
        >
          {/* Oq matn */}
          <span className="text-gray-300 text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase h-[20px] flex items-center">
            {text}
          </span>
          {/* Neon matn */}
          <span className="text-[#00d2ff] text-[11px] lg:text-xs font-bold tracking-[0.2em] uppercase h-[20px] flex items-center drop-shadow-[0_0_8px_rgba(0,210,255,0.8)]">
            {text}
          </span>
        </motion.div>
      </div>

      <motion.div
        variants={{
          initial: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 }
        }}
        transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent shadow-[0_0_10px_#00d2ff]"
        style={{ originX: 0.5 }}
      />
    </motion.a>
  );
};

// ==========================================
// KIBER-SAYYORALAR PARAMETRLARI
// ==========================================
const languagePlanets = [
  { 
    id: 'uz', name: "O'ZBEK", orbitSize: 180, planetSize: 32, 
    orbitSpeed: '120s', spinSpeed: '30s', orbitDelay: '-20s',
    hoverGlow: '0 0 15px #0099B5, 0 0 30px #ffffff, 0 0 45px #1E9E41',
    flagColors: 'linear-gradient(to bottom, #0099B5 33%, #ffffff 33%, #ffffff 66%, #1E9E41 66%)',
    lineColor: '#00d2ff',
    normalContinentColor: '#00d2ff', 
    continentTransform: 'none'
  },
  { 
    id: 'ru', name: 'РУССКИЙ', orbitSize: 280, planetSize: 30, 
    orbitSpeed: '160s', spinSpeed: '40s', orbitDelay: '-80s', 
    hoverGlow: '0 0 15px #ffffff, 0 0 30px #0039A6, 0 0 45px #D52B1E',
    flagColors: 'linear-gradient(to bottom, #ffffff 33%, #0039A6 33%, #0039A6 66%, #D52B1E 66%)',
    lineColor: '#00d2ff',
    normalContinentColor: '#00d2ff', 
    continentTransform: 'rotateX(180deg)'
  },
  { 
    id: 'en', name: 'ENGLISH', orbitSize: 380, planetSize: 38, 
    orbitSpeed: '200s', spinSpeed: '50s', orbitDelay: '-150s', 
    hoverGlow: '0 0 15px #012169, 0 0 30px #ffffff, 0 0 45px #C8102E',
    flagColors: 'linear-gradient(135deg, #012169 25%, #C8102E 50%, #012169 75%)',
    lineColor: '#00ffcc',
    normalContinentColor: '#00d2ff', 
    continentTransform: 'rotateX(180deg) scaleX(-1)' 
  }
];

export default function Navbar({ lang, setLang, setCurrentView }) {
  const t = translations[lang] || translations['uz'];
  const [isSystemOpen, setIsSystemOpen] = useState(false);
  const [hoveredPlanet, setHoveredPlanet] = useState(null);
  const [expandingPlanet, setExpandingPlanet] = useState(null);

  const handleLanguageSelect = (planet) => {
    setExpandingPlanet(planet);
    setTimeout(() => {
      setLang(planet.id);
      setIsSystemOpen(false);
      setExpandingPlanet(null);
    }, 1200); 
  };

  const flightTransition = { duration: 1.2, type: "spring", damping: 18, stiffness: 80 };

  return (
    <>
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 bg-transparent pt-4 pb-2 pointer-events-none"
      >
        <div className="w-full flex items-center justify-between pr-4 pl-4 lg:pr-12 lg:pl-[7.7rem] py-3 pointer-events-auto">
          
          <div className="flex items-center cursor-pointer mt-2" onClick={() => setCurrentView('dashboard')}>
            <span className="text-xl md:text-2xl font-black text-white tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
              SHARQ<span className="text-[#00d2ff] drop-shadow-[0_0_10px_#00d2ff]">TECH</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-10">
            {t.menus.map((menu) => (
              <AnimatedMenuLink key={menu.id} id={menu.id} text={menu.label} onClick={setCurrentView} />
            ))}
          </div>

          {/* 1. KICHIK YER SAYYORASI */}
          <div className="relative flex items-center justify-end z-[999] w-[50px] h-[50px]">
            <AnimatePresence>
              {!isSystemOpen && !expandingPlanet && (
                <motion.button 
                  layoutId="planet-uz" 
                  initial={false}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={flightTransition} 
                  whileHover={{ scale: 1.15, filter: "brightness(1.3)" }}
                  onClick={() => setIsSystemOpen(true)}
                  className="absolute w-[45px] h-[45px] rounded-full flex items-center justify-center focus:outline-none shadow-[0_0_15px_rgba(0,210,255,0.4)]"
                  style={{ background: 'transparent' }}
                >
                  <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.8), inset 1px 1px 4px rgba(255,255,255,0.4)" }} />
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div
                      className="w-full h-full"
                      style={{
                        WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                        WebkitMaskSize: "200% 100%", WebkitMaskRepeat: "repeat-x",
                        maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                        maskSize: "200% 100%", maskRepeat: "repeat-x",
                        background: '#00d2ff',
                        animation: "planet-texture-spin 15s linear infinite"
                      }}
                    />
                  </div>
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.nav>


      {/* 2. ULKAN QUYOSH TIZIMI */}
      <div className="fixed pointer-events-none perspective-[1200px] z-[999]" style={{ width: '500px', height: '500px', top: '-100px', right: '-80px' }}>
        
        {/* Tumanli qora Koinot foni */}
        <AnimatePresence>
          {isSystemOpen && !expandingPlanet && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.0, ease: "easeInOut" }}
              className="fixed inset-0 pointer-events-auto cursor-default w-screen h-screen bg-[#02050a]/70 backdrop-blur-md" 
              onClick={() => setIsSystemOpen(false)} 
            />
          )}
        </AnimatePresence>

        {/* QATLAM 1: Quyosh, Orbitalar, va Ru/En sayyoralar */}
        <AnimatePresence>
          {isSystemOpen && !expandingPlanet && (
            <motion.div 
              exit={{ opacity: 1, transition: { duration: 1.5 } }} 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg) rotateY(-10deg)' }}
            >
              
              {/* QUYOSH YADROSI */}
              <div className="absolute flex items-center justify-center pointer-events-none" style={{ transform: "rotateY(10deg) rotateX(-70deg) translateZ(5px)" }}>
                <motion.div 
                  initial={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
                  animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                  exit={{ scale: 3, opacity: 0, filter: "blur(20px)" }}
                  transition={{ duration: 1.5, type: "spring", damping: 22, stiffness: 80 }}
                  className="relative flex items-center justify-center"
                >
                  <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.8, 0.6] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute w-[100px] h-[100px] rounded-full" style={{ background: "radial-gradient(circle, rgba(255,87,34,0.6) 0%, transparent 60%)", filter: "blur(8px)" }} />
                  <motion.div animate={{ rotate: 360, borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 60% 30% 70% 40%", "40% 60% 70% 30% / 40% 50% 60% 50%"] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute w-[62px] h-[62px] bg-[#ff3d00] mix-blend-screen opacity-90" style={{ filter: "blur(2.5px)" }} />
                  <motion.div animate={{ rotate: -360, borderRadius: ["50% 50% 30% 70% / 50% 30% 70% 50%", "30% 70% 50% 50% / 70% 50% 30% 50%", "50% 50% 30% 70% / 50% 30% 70% 50%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} className="absolute w-[56px] h-[56px] bg-[#ffeb3b] mix-blend-screen opacity-80" style={{ filter: "blur(1.5px)" }} />
                  <div className="relative w-[48px] h-[48px] rounded-full overflow-hidden" style={{ background: "radial-gradient(circle at 45% 45%, #ffffff 0%, #fff700 20%, #ff5722 65%, #8e0000 100%)", boxShadow: "inset -3px -3px 8px rgba(0,0,0,0.8), 0 0 15px rgba(255,87,34,0.8)" }}>
                    <motion.div animate={{ rotate: 360, scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} className="absolute inset-[-50%] w-[200%] h-[200%] mix-blend-color-burn opacity-70" style={{ backgroundImage: "radial-gradient(circle at 30% 30%, #5e0000 0%, transparent 20%), radial-gradient(circle at 70% 60%, #3a0000 0%, transparent 30%)", filter: "blur(2px)" }} />
                    <motion.div animate={{ rotate: -360, scale: [1.1, 1, 1.1], opacity: [0.6, 0.9, 0.6] }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} className="absolute inset-[-50%] w-[200%] h-[200%] mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #ffffff 0%, transparent 30%), conic-gradient(from 0deg, transparent 0%, rgba(255,255,255,0.7) 20%, transparent 40%, #ffeb3b 60%, transparent 80%)", filter: "blur(3px)" }} />
                  </div>
                </motion.div>
              </div>

              {/* BARCHA ORBITALAR (Chiziqlar) */}
              {languagePlanets.map((planet) => (
                <div key={`orbit-${planet.id}`} className="absolute" style={{ width: planet.orbitSize, height: planet.orbitSize, transformStyle: 'preserve-3d' }}>
                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1.0, delay: 0.1 }}
                    className="absolute inset-0 rounded-full border-[2px] border-dashed border-[#00d2ff]/40"
                  />
                </div>
              ))}

              {/* FAQAT RU VA EN SAYYORALARI */}
              {languagePlanets.filter(p => p.id !== 'uz').map((planet) => (
                <div key={`planet-${planet.id}`} className="absolute" style={{ width: planet.orbitSize, height: planet.orbitSize, transformStyle: 'preserve-3d' }}>
                  <div className="absolute w-full h-full" style={{ transformStyle: 'preserve-3d', animation: `orbit-spin ${planet.orbitSpeed} linear infinite ${planet.orbitDelay}` }}>
                    <div className="absolute pointer-events-auto cursor-pointer" style={{ top: 0, left: '50%', transformStyle: 'preserve-3d', animation: `orbit-counter-spin ${planet.orbitSpeed} linear infinite ${planet.orbitDelay}` }}>
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} transition={{ duration: 1.2, type: "spring", damping: 15 }}
                        whileHover={{ scale: 1.4 }} 
                        onMouseEnter={() => setHoveredPlanet(planet.id)} onMouseLeave={() => setHoveredPlanet(null)} onClick={(e) => { e.stopPropagation(); handleLanguageSelect(planet); }}
                        className="relative rounded-full flex items-center justify-center focus:outline-none"
                        style={{ width: planet.planetSize, height: planet.planetSize, marginTop: `-${planet.planetSize / 2}px`, marginLeft: `-${planet.planetSize / 2}px`, boxShadow: hoveredPlanet === planet.id ? planet.hoverGlow : '0 0 10px rgba(0,210,255,0.3)', background: 'transparent' }}
                      >
                        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.8), inset 1px 1px 4px rgba(255,255,255,0.4)", background: "transparent" }} />
                        
                        <div className="absolute inset-0 rounded-full overflow-hidden" style={{ transform: planet.continentTransform }}>
                          <div
                            className="absolute inset-0 transition-opacity duration-300"
                            style={{
                              opacity: hoveredPlanet === planet.id ? 0 : 1,
                              WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              WebkitMaskSize: "200% 100%", WebkitMaskRepeat: "repeat-x",
                              maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              maskSize: "200% 100%", maskRepeat: "repeat-x",
                              background: planet.normalContinentColor,
                              animation: `planet-texture-spin ${planet.spinSpeed} linear infinite`
                            }}
                          />
                          <div
                            className="absolute inset-0 transition-opacity duration-300"
                            style={{
                              opacity: hoveredPlanet === planet.id ? 1 : 0,
                              WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              WebkitMaskSize: "200% 100%", WebkitMaskRepeat: "repeat-x",
                              maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              maskSize: "200% 100%", maskRepeat: "repeat-x",
                              background: planet.flagColors,
                              animation: `planet-texture-spin ${planet.spinSpeed} linear infinite`
                            }}
                          />
                        </div>

                        <div className={`absolute -top-[45px] pointer-events-none flex flex-col items-center transition-all duration-300 ${hoveredPlanet === planet.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'}`}>
                           <div className="bg-[#050b14]/80 backdrop-blur-md px-3 py-1 border border-[#00d2ff]/40 rounded-md">
                             <span className="text-[10px] font-black uppercase text-white tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                               {planet.name}
                             </span>
                           </div>
                           <div className="w-[1px] h-[15px]" style={{ backgroundColor: planet.lineColor, boxShadow: `0 0 8px ${planet.lineColor}` }} />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>


        {/* QATLAM 2: FAQAT UZBEK SAYYORASI */}
        <AnimatePresence>
          {isSystemOpen && !expandingPlanet && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{ transformStyle: 'preserve-3d', transform: 'rotateX(70deg) rotateY(-10deg)' }}
            >
              {languagePlanets.filter(p => p.id === 'uz').map((planet) => (
                <div key={`flight-${planet.id}`} className="absolute" style={{ width: planet.orbitSize, height: planet.orbitSize, transformStyle: 'preserve-3d' }}>
                  <div className="absolute w-full h-full" style={{ transformStyle: 'preserve-3d', animation: `orbit-spin ${planet.orbitSpeed} linear infinite ${planet.orbitDelay}` }}>
                    <div className="absolute pointer-events-auto cursor-pointer" style={{ top: 0, left: '50%', transformStyle: 'preserve-3d', animation: `orbit-counter-spin ${planet.orbitSpeed} linear infinite ${planet.orbitDelay}` }}>
                      <motion.button
                        layoutId="planet-uz" 
                        transition={flightTransition} 
                        whileHover={{ scale: 1.4 }} 
                        onMouseEnter={() => setHoveredPlanet(planet.id)} onMouseLeave={() => setHoveredPlanet(null)} onClick={(e) => { e.stopPropagation(); handleLanguageSelect(planet); }}
                        className="relative rounded-full flex items-center justify-center focus:outline-none"
                        style={{ width: planet.planetSize, height: planet.planetSize, marginTop: `-${planet.planetSize / 2}px`, marginLeft: `-${planet.planetSize / 2}px`, boxShadow: hoveredPlanet === planet.id ? planet.hoverGlow : '0 0 10px rgba(0,210,255,0.3)', background: 'transparent' }}
                      >
                        <div className="absolute inset-0 rounded-full" style={{ boxShadow: "inset -4px -4px 10px rgba(0,0,0,0.8), inset 1px 1px 4px rgba(255,255,255,0.4)", background: "transparent" }} />
                        
                        <div className="absolute inset-0 rounded-full overflow-hidden" style={{ transform: planet.continentTransform }}>
                          <div
                            className="absolute inset-0 transition-opacity duration-300"
                            style={{
                              opacity: hoveredPlanet === planet.id ? 0 : 1,
                              WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              WebkitMaskSize: "200% 100%", WebkitMaskRepeat: "repeat-x",
                              maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              maskSize: "200% 100%", maskRepeat: "repeat-x",
                              background: planet.normalContinentColor,
                              animation: `planet-texture-spin ${planet.spinSpeed} linear infinite`
                            }}
                          />
                          <div
                            className="absolute inset-0 transition-opacity duration-300"
                            style={{
                              opacity: hoveredPlanet === planet.id ? 1 : 0,
                              WebkitMaskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              WebkitMaskSize: "200% 100%", WebkitMaskRepeat: "repeat-x",
                              maskImage: "url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')",
                              maskSize: "200% 100%", maskRepeat: "repeat-x",
                              background: planet.flagColors,
                              animation: `planet-texture-spin ${planet.spinSpeed} linear infinite`
                            }}
                          />
                        </div>

                        <div className={`absolute -top-[45px] pointer-events-none flex flex-col items-center transition-all duration-300 ${hoveredPlanet === planet.id ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'}`}>
                           <div className="bg-[#050b14]/80 backdrop-blur-md px-3 py-1 border border-[#00d2ff]/40 rounded-md">
                             <span className="text-[10px] font-black uppercase text-white tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                               {planet.name}
                             </span>
                           </div>
                           <div className="w-[1px] h-[15px]" style={{ backgroundColor: planet.lineColor, boxShadow: `0 0 8px ${planet.lineColor}` }} />
                        </div>
                      </motion.button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {expandingPlanet && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 300, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "circIn" }}
            className="fixed top-1/2 left-1/2 rounded-full pointer-events-none z-[9999]"
            style={{ 
              width: '20px', height: '20px',
              background: expandingPlanet.flagColors || '#00d2ff',
              boxShadow: expandingPlanet.hoverGlow,
              transform: 'translate(-50%, -50%)' 
            }}
          />
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbit-spin {
          from { transform: rotateZ(0deg); }
          to { transform: rotateZ(360deg); }
        }
        @keyframes orbit-counter-spin {
          from { transform: rotateZ(0deg) rotateX(-70deg) rotateY(-10deg); }
          to { transform: rotateZ(-360deg) rotateX(-70deg) rotateY(-10deg); }
        }
        @keyframes planet-texture-spin {
          from { -webkit-mask-position: 0px 0px; mask-position: 0px 0px; }
          to { -webkit-mask-position: 200px 0px; mask-position: 200px 0px; }
        }
        @keyframes spinEarthSeamless {
          0% { -webkit-mask-position: 0px 0; mask-position: 0px 0; }
          100% { -webkit-mask-position: 90px 0; mask-position: 90px 0; }
        }
      `}} />
    </>
  );
}