import React, { useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import UzCore from './components/core/UzCore';
import Navbar from './components/Navbar';

// Fonni Yalqov yuklash
const UzBg = lazy(() => import('./components/backgrounds/UzBg'));

// Yangi fayllarni xavfsiz (Lazy) yuklaymiz. Shunda fayl ichida xato bo'lsa ham butun sayt oq ekran bo'lib qotmaydi.
const UzEcosystem = lazy(() => import('./components/sections/UzEcosystem').catch(() => ({ default: () => <div className="text-white text-center pt-40">Ekotizim fayli topilmadi yoki xato bor</div> })));
const UzProjects = lazy(() => import('./components/sections/UzProjects').catch(() => ({ default: () => <div className="text-white text-center pt-40">Loyihalar fayli topilmadi yoki xato bor</div> })));
const UzServices = lazy(() => import('./components/sections/UzServices').catch(() => ({ default: () => <div className="text-white text-center pt-40">Xizmatlar fayli topilmadi yoki xato bor</div> })));
const UzTeam = lazy(() => import('./components/sections/UzTeam').catch(() => ({ default: () => <div className="text-white text-center pt-40">Jamoa fayli topilmadi yoki xato bor</div> })));

export default function App() {
  const [lang, setLang] = useState('uz'); 
  const [currentView, setCurrentView] = useState('dashboard');

  return (
    <div className="relative min-h-screen w-full bg-[#010308] overflow-hidden font-sans select-none">
      
      {/* 1. DINAMIK TO'LQIN FON */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense fallback={<div className="absolute inset-0 bg-[#02050f] animate-pulse" />}>
          <AnimatePresence mode="wait">
            {lang === 'uz' && <UzBg key="uz" />}
          </AnimatePresence>
        </Suspense>
      </div>

      {/* 2. YANGI KIBER-NAVBAR */}
      <Navbar lang={lang} setLang={setLang} setCurrentView={setCurrentView} />

      {/* 3. ASOSIY KONTENT */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="wait">
          
          {currentView === 'dashboard' && (
            <motion.div key="dash" className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <UzCore />
            </motion.div>
          )}

          {currentView === 'ecosystem' && (
            <motion.div key="eco" className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Suspense fallback={<div className="text-white text-center pt-40">Yuklanmoqda...</div>}>
                <UzEcosystem />
              </Suspense>
            </motion.div>
          )}

          {currentView === 'projects' && (
            <motion.div key="proj" className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Suspense fallback={<div className="text-white text-center pt-40">Yuklanmoqda...</div>}>
                <UzProjects />
              </Suspense>
            </motion.div>
          )}

          {currentView === 'services' && (
            <motion.div key="serv" className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Suspense fallback={<div className="text-white text-center pt-40">Yuklanmoqda...</div>}>
                <UzServices />
              </Suspense>
            </motion.div>
          )}

          {currentView === 'team' && (
            <motion.div key="team" className="absolute inset-0 w-full h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <Suspense fallback={<div className="text-white text-center pt-40">Yuklanmoqda...</div>}>
                <UzTeam />
              </Suspense>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
    </div>
  );
}