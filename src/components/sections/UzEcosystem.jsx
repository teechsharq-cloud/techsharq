import React from 'react';
import { motion } from 'framer-motion';
import logoSht from './sht.svg';

// ==========================================
// GLOBAL RITM SOZLAMALARI
// ==========================================
const CYCLE = 6.2;

const T = {
  beat1: 0.07,
  beat1End: 0.12,

  beat2: 0.16,
  beat2End: 0.22,

  // To'lqin ikkinchi yurak urishidan keyin chiqadi
  outStart: 0.205,

  // Karta bilan urilish nuqtasi
  hit: 0.48,

  // Urilgandan keyin cho'zilib/sekinlashib qolmaydi
  hitEnd: 0.535,

  end: 1
};

// ==========================================
// SHARQTECH 6-TUGUNLI EKOTIZIM XARITASI
// ==========================================
const ecoNodes = [
  {
    id: 'idea',
    title: "G'OYA VA TAHLIL",
    color: 'text-cyan-300',
    bg: 'bg-cyan-500/20',
    stroke: '#22d3ee',
    x: 22,
    y: 19,
    items: [
      { icon: '👁️', title: 'Kuzatuv', desc: 'Bozor va vizual muhit tahlili' },
      { icon: '📊', title: 'Analiz', desc: 'Auditoriya va raqobat' },
      { icon: '📈', title: 'Strategiya', desc: "Rivojlanish yo'l xaritasi" }
    ]
  },
  {
    id: 'creative',
    title: 'KREATIV VIZUAL',
    color: 'text-blue-300',
    bg: 'bg-blue-500/20',
    stroke: '#60a5fa',
    x: 8,
    y: 50,
    items: [
      { icon: '🎨', title: 'UI/UX Dizayn', desc: 'Premium kiber-interfeyslar' },
      { icon: '🧊', title: '3D Obyektlar', desc: 'Veb uchun hajmli modellar' },
      { icon: '✨', title: 'Animatsiya', desc: 'Framer Motion effektlar' }
    ]
  },
  {
    id: 'dev',
    title: "DASTURIY TA'MINOT",
    color: 'text-purple-300',
    bg: 'bg-purple-500/20',
    stroke: '#c084fc',
    x: 22,
    y: 81,
    items: [
      { icon: '🏗️', title: 'Arxitektura', desc: 'Mustahkam tizim poydevori' },
      { icon: '💻', title: 'Front & Back', desc: 'React, WebGL, API server' },
      { icon: '🤖', title: 'AI & Avtomat', desc: 'Botlar va neyrotarmoqlar' }
    ]
  },
  {
    id: 'freelance',
    title: 'BUYURTMA & XIZMAT',
    color: 'text-emerald-300',
    bg: 'bg-emerald-500/20',
    stroke: '#34d399',
    x: 78,
    y: 19,
    items: [
      { icon: '🛒', title: 'B2B Loyihalar', desc: 'Biznes uchun maxsus yechimlar' },
      { icon: '🤝', title: 'Frilans', desc: 'Qisqa muddatli tezkor kod' },
      { icon: '🛠️', title: 'Texnik Qorovul', desc: 'Loyihalarni doimiy nazorat' }
    ]
  },
  {
    id: 'intern',
    title: 'AMALIYOT DASTURI',
    color: 'text-amber-300',
    bg: 'bg-amber-500/20',
    stroke: '#fbbf24',
    x: 92,
    y: 50,
    items: [
      { icon: '🎓', title: "Ta'lim", desc: "Zamonaviy IT kasblar o'qitish" },
      { icon: '🧪', title: 'Inkubator', desc: 'Real loyihalarda tajriba' },
      { icon: '🏆', title: 'Ishga Qabul', desc: 'Eng yaxshi kadrlar tanlovi' }
    ]
  },
  {
    id: 'business',
    title: 'BIZNES & STARTAP',
    color: 'text-pink-300',
    bg: 'bg-pink-500/20',
    stroke: '#f472b6',
    x: 78,
    y: 81,
    items: [
      { icon: '🚀', title: 'Startap', desc: "G'oyalarni moliyalashtirish" },
      { icon: '📢', title: 'Marketing', desc: 'Loyihani ommaga olib chiqish' },
      { icon: '🛡️', title: 'Xavfsizlik', desc: 'Kiber himoya va testlash' }
    ]
  }
];

// ==========================================
// HOVERDA KARTA QAYSI TOMONGA KENGAYISHINI ANIQLAYDI
// ==========================================
const getCardAnchor = (x, y) => {
  const horizontal =
    x < 50
      ? { left: '0px', right: 'auto' }
      : { left: 'auto', right: '0px' };

  const vertical =
    y < 35
      ? { top: '0px', bottom: 'auto', translateY: '0' }
      : y > 65
        ? { top: 'auto', bottom: '0px', translateY: '0' }
        : { top: '50%', bottom: 'auto', translateY: '-50%' };

  return {
    ...horizontal,
    ...vertical
  };
};

// ==========================================
// KARTA
// ==========================================
const EcoCard = ({ data, mobile = false }) => {
  const anchor = mobile
    ? {
        left: 'auto',
        right: 'auto',
        top: 'auto',
        bottom: 'auto',
        translateY: '0'
      }
    : getCardAnchor(data.x, data.y);

  const wrapperStyle = mobile
    ? {
        '--st-node-color': data.stroke,
        '--st-cycle': `${CYCLE}s`,
        '--st-card-left': anchor.left,
        '--st-card-right': anchor.right,
        '--st-card-top': anchor.top,
        '--st-card-bottom': anchor.bottom,
        '--st-card-translate-y': anchor.translateY
      }
    : {
        top: `${data.y}%`,
        left: `${data.x}%`,
        '--st-node-color': data.stroke,
        '--st-cycle': `${CYCLE}s`,
        '--st-card-left': anchor.left,
        '--st-card-right': anchor.right,
        '--st-card-top': anchor.top,
        '--st-card-bottom': anchor.bottom,
        '--st-card-translate-y': anchor.translateY
      };

  return (
    <div
      className={
        mobile
          ? 'st-eco-card-shell st-mobile-card relative z-20 w-full flex justify-center'
          : 'st-eco-card-shell absolute z-20 -translate-x-1/2 -translate-y-1/2'
      }
      style={wrapperStyle}
    >
      <div className="st-eco-card-body bg-[#02050f]/18 backdrop-blur-sm border border-slate-700/40 rounded-xl shadow-2xl flex flex-col overflow-hidden relative cursor-pointer">
        <div className="st-card-sweep absolute inset-0 z-[1] pointer-events-none rounded-xl" />
        <div className="st-card-frame absolute inset-0 z-[2] pointer-events-none rounded-xl" />
        <div className="st-card-hover absolute inset-0 z-[3] pointer-events-none rounded-xl" />

        <div className={`h-1 w-full ${data.bg} absolute top-0 left-0 z-10`} />

        <div
          className={`st-card-header px-2.5 py-2 border-b border-slate-700/30 ${data.bg} bg-opacity-30 flex items-center justify-center relative z-10`}
        >
          <span className={`st-card-main-title font-black uppercase ${data.color}`}>
            {data.title}
          </span>
        </div>

        <div className="st-card-content flex flex-col relative z-10">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className="st-eco-card-item flex items-center rounded cursor-pointer"
              style={{ '--st-item-color': data.stroke }}
            >
              <div className="st-item-icon bg-[#010308]/70 rounded shadow-inner flex-shrink-0 border border-slate-600/50 transition-colors z-10">
                {item.icon}
              </div>

              <div className="flex flex-col z-10 min-w-0">
                <span className="st-item-title font-extrabold tracking-wide leading-tight transition-colors">
                  {item.title}
                </span>
                <span className="st-item-desc leading-tight font-semibold transition-colors">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// ASOSIY KOMPONENT
// ==========================================
export default function UzEcosystem() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden relative pt-32 pb-12">
      <style>{`
        /* ==========================================
           CARD JOYLASHUVI
        ========================================== */
        .st-eco-card-shell {
          width: 162px;
          height: 122px;
          opacity: 0;
          overflow: visible;
          animation: stCardVisibility var(--st-cycle) ease-in-out infinite;
          will-change: opacity;
        }

        .st-mobile-card {
          width: 100%;
          height: auto;
          opacity: 1;
          animation: none;
        }

        .st-eco-card-shell:hover {
          opacity: 1 !important;
          z-index: 350 !important;
        }

        .st-eco-card-body {
          position: absolute;
          left: var(--st-card-left);
          right: var(--st-card-right);
          top: var(--st-card-top);
          bottom: var(--st-card-bottom);
          transform: translateY(var(--st-card-translate-y)) translateZ(0);

          width: 162px;
          min-height: 122px;

          background: rgba(2, 5, 15, 0.18);
          border-color: rgba(51,65,85,0.38);

          animation: stCardImpact var(--st-cycle) ease-in-out infinite;
          transition:
            width 220ms cubic-bezier(.2,.8,.2,1),
            min-height 220ms cubic-bezier(.2,.8,.2,1),
            box-shadow 220ms ease,
            border-color 220ms ease,
            background-color 220ms ease,
            backdrop-filter 220ms ease;
          will-change: width, min-height, box-shadow, border-color;
        }

        .st-mobile-card .st-eco-card-body {
          position: relative;
          left: auto;
          right: auto;
          top: auto;
          bottom: auto;
          transform: none;
          width: 100%;
          max-width: 320px;
          min-height: auto;
          animation: none;
          opacity: 1;
          background: rgba(2,5,15,0.34);
          border-color: var(--st-node-color);
          box-shadow:
            inset 0 0 14px color-mix(in srgb, var(--st-node-color) 16%, transparent),
            0 0 16px color-mix(in srgb, var(--st-node-color) 20%, transparent);
        }

        /* ==========================================
           TEXT — SCALE EMAS, REAL FONT SIZE
        ========================================== */
        .st-card-main-title {
          font-size: 8.5px;
          letter-spacing: 0.18em;
          line-height: 1.1;
          white-space: nowrap;
          color: color-mix(in srgb, var(--st-node-color) 82%, white 18%);
          text-shadow:
            0 0 7px color-mix(in srgb, var(--st-node-color) 36%, transparent),
            0 1px 2px rgba(0,0,0,0.82);
          transition:
            font-size 220ms ease,
            letter-spacing 220ms ease,
            color 220ms ease,
            text-shadow 220ms ease;
        }

        .st-card-content {
          padding: 6px;
          gap: 4px;
          transition:
            padding 220ms ease,
            gap 220ms ease;
        }

        .st-eco-card-item {
          gap: 6px;
          padding: 6px;
          transition:
            transform 160ms ease-out,
            background-color 160ms ease-out,
            box-shadow 160ms ease-out,
            padding 220ms ease,
            gap 220ms ease;
          will-change: transform;
        }

        .st-item-icon {
          font-size: 10px;
          padding: 4px;
          filter: saturate(1.08) brightness(1.05);
          transition:
            font-size 220ms ease,
            padding 220ms ease,
            background-color 160ms ease,
            border-color 160ms ease;
        }

        .st-item-title {
          font-size: 8.4px;
          color: rgba(248,250,252,0.97);
          text-shadow: 0 1px 2px rgba(0,0,0,0.82);
          transition:
            font-size 220ms ease,
            color 160ms ease,
            text-shadow 160ms ease;
        }

        .st-item-desc {
          font-size: 6.7px;
          margin-top: 2px;
          color: rgba(226,232,240,0.94);
          text-shadow: 0 1px 2px rgba(0,0,0,0.82);
          transition:
            font-size 220ms ease,
            color 160ms ease,
            text-shadow 160ms ease;
        }

        /* ==========================================
           HOVERDA READING MODE
           MUHIM: SCALE YO'Q.
           Shuning uchun text xira chiqmaydi.
           Karta oqarmaydi, dark glass shaffofligi saqlanadi.
        ========================================== */
        .st-eco-card-shell:hover .st-eco-card-body {
          width: 252px;
          min-height: 176px;
          border-color: var(--st-node-color) !important;
          background: rgba(2, 5, 15, 0.40) !important;
          backdrop-filter: blur(16px) saturate(1.28);
          box-shadow:
            0 0 18px color-mix(in srgb, var(--st-node-color) 58%, transparent),
            0 0 42px color-mix(in srgb, var(--st-node-color) 22%, transparent),
            0 30px 72px rgba(0,0,0,0.62),
            inset 0 0 18px color-mix(in srgb, var(--st-node-color) 18%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.10) !important;
        }

        .st-eco-card-shell:hover .st-card-main-title {
          font-size: 12px;
          letter-spacing: 0.13em;
          color: color-mix(in srgb, var(--st-node-color) 48%, white 52%) !important;
          text-shadow:
            0 0 10px color-mix(in srgb, var(--st-node-color) 65%, transparent),
            0 2px 4px rgba(0,0,0,0.90) !important;
        }

        .st-eco-card-shell:hover .st-card-content {
          padding: 10px;
          gap: 8px;
          background: rgba(2,5,15,0.08);
        }

        .st-eco-card-shell:hover .st-eco-card-item {
          gap: 10px;
          padding: 9px;
          background-color: rgba(2,5,15,0.18);
        }

        .st-eco-card-shell:hover .st-item-icon {
          font-size: 15px;
          padding: 7px;
          background: rgba(2,5,15,0.46);
          border-color: color-mix(in srgb, var(--st-node-color) 38%, rgba(148,163,184,0.22) 62%);
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.06),
            0 1px 4px rgba(0,0,0,0.24);
        }

        .st-eco-card-shell:hover .st-item-title {
          font-size: 12px;
          color: rgba(248,250,252,0.99) !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.92) !important;
        }

        .st-eco-card-shell:hover .st-item-desc {
          font-size: 9.4px;
          color: rgba(226,232,240,0.97) !important;
          text-shadow: 0 2px 4px rgba(0,0,0,0.92) !important;
        }

        .st-eco-card-shell:hover .st-eco-card-item:hover {
          transform: translateY(-1px);
          background-color: color-mix(in srgb, var(--st-item-color) 34%, rgba(2,5,15,0.42) 66%);
          box-shadow:
            inset 0 0 10px rgba(255,255,255,0.08),
            0 0 10px color-mix(in srgb, var(--st-item-color) 30%, transparent);
        }

        /*
          Hoverda ichki impuls o'qishga xalaqit bermaydi.
          Animation o'chirilmaydi, faqat ko'rinmaydi.
          Shu sabab hoverdan chiqqanda ritm buzilmaydi.
        */
        .st-eco-card-shell:hover .st-card-sweep,
        .st-eco-card-shell:hover .st-card-frame {
          opacity: 0 !important;
        }

        .st-eco-card-shell:hover .st-card-hover {
          opacity: 0.86 !important;
          border-color: var(--st-node-color);
          background:
            linear-gradient(
              145deg,
              color-mix(in srgb, var(--st-node-color) 22%, transparent) 0%,
              rgba(2,5,15,0.14) 48%,
              color-mix(in srgb, var(--st-node-color) 12%, transparent) 100%
            );
          box-shadow:
            0 0 18px color-mix(in srgb, var(--st-node-color) 46%, transparent),
            inset 0 0 18px color-mix(in srgb, var(--st-node-color) 22%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.08);
        }

        /* ==========================================
           IMPULS KARTA ICHIDA KO'RINISHI
        ========================================== */
        .st-card-sweep {
          opacity: 0;
          background:
            linear-gradient(
              110deg,
              transparent 0%,
              transparent 30%,
              rgba(255,255,255,0.04) 42%,
              color-mix(in srgb, var(--st-node-color) 72%, white 8%) 50%,
              rgba(255,255,255,0.04) 58%,
              transparent 70%,
              transparent 100%
            );
          mix-blend-mode: screen;
          animation: stCardSweep var(--st-cycle) ease-in-out infinite;
        }

        .st-card-frame {
          opacity: 0;
          border: 1px solid var(--st-node-color);
          box-shadow:
            inset 0 0 12px color-mix(in srgb, var(--st-node-color) 65%, transparent),
            0 0 14px color-mix(in srgb, var(--st-node-color) 58%, transparent);
          animation: stCardFrame var(--st-cycle) ease-in-out infinite;
        }

        .st-card-hover {
          opacity: 0;
          border: 1px solid rgba(255,255,255,0.16);
          box-shadow:
            0 0 16px color-mix(in srgb, var(--st-node-color) 62%, transparent),
            inset 0 0 12px rgba(255,255,255,0.05);
          transition: opacity 200ms ease;
        }

        @keyframes stCardVisibility {
          0%   { opacity: 0; }
          46%  { opacity: 0; }
          49%  { opacity: 1; }
          62%  { opacity: 1; }
          70%  { opacity: 0; }
          100% { opacity: 0; }
        }

        @keyframes stCardImpact {
          0% {
            border-color: rgba(51,65,85,0.24);
            background-color: rgba(2,5,15,0.12);
            box-shadow: none;
          }

          46% {
            border-color: rgba(51,65,85,0.24);
            background-color: rgba(2,5,15,0.12);
            box-shadow: none;
          }

          49% {
            border-color: var(--st-node-color);
            background-color: rgba(2,5,15,0.54);
            box-shadow:
              0 0 12px color-mix(in srgb, var(--st-node-color) 68%, transparent),
              0 0 26px color-mix(in srgb, var(--st-node-color) 34%, transparent),
              inset 0 0 18px rgba(255,255,255,0.05);
          }

          58% {
            border-color: var(--st-node-color);
            background-color: rgba(2,5,15,0.34);
            box-shadow:
              0 0 8px color-mix(in srgb, var(--st-node-color) 44%, transparent),
              inset 0 0 12px rgba(255,255,255,0.03);
          }

          70% {
            border-color: rgba(71,85,105,0.20);
            background-color: rgba(2,5,15,0.14);
            box-shadow: none;
          }

          100% {
            border-color: rgba(51,65,85,0.24);
            background-color: rgba(2,5,15,0.12);
            box-shadow: none;
          }
        }

        @keyframes stCardSweep {
          0%   { opacity: 0; transform: translateX(-36%) skewX(-12deg); }
          46%  { opacity: 0; transform: translateX(-36%) skewX(-12deg); }
          49%  { opacity: 0.58; transform: translateX(-10%) skewX(-12deg); }
          58%  { opacity: 0.20; transform: translateX(18%) skewX(-12deg); }
          68%  { opacity: 0; transform: translateX(36%) skewX(-12deg); }
          100% { opacity: 0; transform: translateX(36%) skewX(-12deg); }
        }

        @keyframes stCardFrame {
          0%   { opacity: 0; transform: scale(0.998); }
          46%  { opacity: 0; transform: scale(0.998); }
          49%  { opacity: 0.84; transform: scale(1); }
          58%  { opacity: 0.30; transform: scale(1.01); }
          68%  { opacity: 0; transform: scale(1.02); }
          100% { opacity: 0; transform: scale(1.02); }
        }

        /* ==========================================
           MOBILE
        ========================================== */
        @media (max-width: 1023px) {
          .st-eco-card-shell {
            opacity: 1;
            animation: none;
          }

          .st-mobile-card {
            width: 100%;
            height: auto;
          }

          .st-mobile-card .st-eco-card-body {
            width: 100%;
            max-width: 340px;
            background: rgba(2,5,15,0.34);
            border-color: var(--st-node-color);
            box-shadow:
              inset 0 0 14px color-mix(in srgb, var(--st-node-color) 16%, transparent),
              0 0 16px color-mix(in srgb, var(--st-node-color) 20%, transparent);
          }

          .st-card-sweep,
          .st-card-frame {
            display: none;
          }

          .st-card-main-title {
            font-size: 9px;
          }

          .st-item-title {
            font-size: 9px;
          }

          .st-item-desc {
            font-size: 7.2px;
          }
        }
      `}</style>

      {/* ==========================================
          DESKTOP SINXRON ANIMATSIYA
      ========================================== */}
      <div className="hidden lg:flex relative w-full max-w-[1080px] h-[520px] mx-auto items-center justify-center flex-shrink-0 mt-4">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 w-full h-full z-0 pointer-events-none"
          preserveAspectRatio="none"
        >
          {ecoNodes.map((node, i) => {
            const cpX = (50 + node.x) / 2;
            const pathD = `M 50 50 C ${cpX} 50, ${cpX} ${node.y}, ${node.x} ${node.y}`;

            return (
              <g key={`line-${i}`}>
                <path
                  d={pathD}
                  stroke={node.stroke}
                  strokeWidth="0.2"
                  fill="none"
                  opacity="0"
                />

                {/* IMPULS AURASI */}
                <motion.path
                  d={pathD}
                  stroke={node.stroke}
                  strokeWidth="0.72"
                  fill="none"
                  strokeLinecap="butt"
                  initial={{ pathLength: 0.055, pathSpacing: 1, pathOffset: -0.07 }}
                  animate={{
                    pathOffset: [-0.07, -0.03, 0.93, 1.12, 1.12],
                    opacity: [0, 0.36, 0.28, 0, 0]
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    times: [0, T.outStart, T.hit, T.hitEnd, T.end],
                    ease: 'linear'
                  }}
                />

                {/* ASOSIY QISQA IMPULS */}
                <motion.path
                  d={pathD}
                  stroke={node.stroke}
                  strokeWidth="0.34"
                  fill="none"
                  strokeLinecap="butt"
                  initial={{ pathLength: 0.038, pathSpacing: 1, pathOffset: -0.055 }}
                  animate={{
                    pathOffset: [-0.055, -0.018, 0.94, 1.13, 1.13],
                    opacity: [0, 0.88, 0.58, 0, 0]
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    times: [0, T.outStart, T.hit, T.hitEnd, T.end],
                    ease: 'linear'
                  }}
                />

                {/* NOZIK OQ TOMIR */}
                <motion.path
                  d={pathD}
                  stroke="rgba(255,255,255,0.82)"
                  strokeWidth="0.105"
                  fill="none"
                  strokeLinecap="butt"
                  initial={{ pathLength: 0.022, pathSpacing: 1, pathOffset: -0.045 }}
                  animate={{
                    pathOffset: [-0.045, -0.012, 0.945, 1.125, 1.125],
                    opacity: [0, 0.72, 0.38, 0, 0]
                  }}
                  transition={{
                    duration: CYCLE,
                    repeat: Infinity,
                    times: [0, T.outStart, T.hit, T.hitEnd, T.end],
                    ease: 'linear'
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* MARKAZIY YURAK / LOGO */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30">
          <motion.div
            animate={{
              opacity: [0, 0.72, 0.14, 0.96, 0.10, 0],
              scale: [0.95, 1.07, 0.98, 1.12, 0.99, 0.95],
              filter: [
                'drop-shadow(0 0 8px rgba(0,229,255,0))',
                'drop-shadow(0 0 18px rgba(0,229,255,0.28))',
                'drop-shadow(0 0 8px rgba(0,229,255,0.04))',
                'drop-shadow(0 0 24px rgba(0,229,255,0.34))',
                'drop-shadow(0 0 8px rgba(0,229,255,0.02))',
                'drop-shadow(0 0 8px rgba(0,229,255,0))'
              ]
            }}
            transition={{
              repeat: Infinity,
              duration: CYCLE,
              times: [0, T.beat1, T.beat1End, T.beat2, T.beat2End, T.end],
              ease: 'easeInOut'
            }}
            className="w-28 h-28 flex items-center justify-center relative cursor-pointer z-50"
            whileHover={{
              scale: 1.08,
              opacity: 1,
              filter: 'drop-shadow(0 0 18px rgba(0,229,255,0.28))',
              transition: { duration: 0.2, ease: 'easeOut' }
            }}
          >
            <img
              src={logoSht}
              alt="SharqTech Logo"
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {ecoNodes.map((node) => (
          <EcoCard key={node.id} data={node} />
        ))}
      </div>

      {/* MOBILE */}
      <div className="flex lg:hidden flex-col items-center gap-4 px-4 w-full max-w-sm mx-auto relative z-20 overflow-y-auto pb-20 h-full mt-10">
        <motion.div
          animate={{
            opacity: [0.2, 0.82, 0.2, 0.94, 0.16, 0.2],
            scale: [0.96, 1.05, 0.98, 1.08, 0.99, 0.96]
          }}
          transition={{
            duration: CYCLE,
            repeat: Infinity,
            times: [0, 0.12, 0.18, 0.26, 0.40, 1],
            ease: 'easeInOut'
          }}
          className="w-24 h-24 drop-shadow-[0_0_16px_rgba(0,229,255,0.18)] flex items-center justify-center relative mb-2 flex-shrink-0"
        >
          <img src={logoSht} alt="SharqTech Logo" className="w-full h-full object-contain" />
        </motion.div>

        {ecoNodes.map((node) => (
          <EcoCard key={node.id} data={node} mobile />
        ))}
      </div>
    </div>
  );
}