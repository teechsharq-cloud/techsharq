import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshReflectorMaterial, Text } from "@react-three/drei";
import * as THREE from "three";

const GOLD = "#c99737";
const GOLD_SOFT = "#f1c56b";
const GOLD_LIGHT = "#ffe7b8";
const BLACK = "#050403";

const WALL_RADIUS = 6.85;
const COLUMN_RADIUS = 7.02;

export default function UzTeam() {
  const [mounted, setMounted] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [lightProgress, setLightProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("real-museum-mode");

    let start = null;
    const duration = 3200;
    const animate = (ts) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setLightProgress(eased);
      if (t < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("real-museum-mode");
      document.body.style.cursor = "default";
    };
  }, []);

  const members = useMemo(
    () => [
      {
        id: 1,
        name: "Abdulloh",
        role: "Founder & CEO",
        photo: "/team/member-1.jpg",
        angle: -72,
        y: 2.44,
        about: "SharqTech yo'nalishi, strategiyasi va mahsulot sifatini nazorat qiladi.",
        skills: ["Leadership", "Strategy", "Product"],
      },
      {
        id: 2,
        name: "Dilnoza",
        role: "UI/UX Designer",
        photo: "/team/member-2.jpg",
        angle: -48,
        y: 2.44,
        about: "Premium interfeys, foydalanuvchi tajribasi va dizayn tizimini yaratadi.",
        skills: ["Figma", "UI/UX", "Design System"],
      },
      {
        id: 3,
        name: "Sardor",
        role: "Lead Developer",
        photo: "/team/member-3.jpg",
        angle: -24,
        y: 2.44,
        about: "Server, API, real-time jarayonlar va barqaror ishlashga javob beradi.",
        skills: ["Node.js", "Express", "MongoDB"],
      },
      {
        id: 4,
        name: "Aziz",
        role: "Frontend Engineer",
        photo: "/team/member-4.jpg",
        angle: 0,
        y: 2.44,
        about: "Frontend sahifalar, animatsiyalar va interaktiv tajribani ishlab chiqadi.",
        skills: ["React", "Vite", "Motion"],
      },
      {
        id: 5,
        name: "Madina",
        role: "Project Manager",
        photo: "/team/member-5.jpg",
        angle: 24,
        y: 2.44,
        about: "Vazifalar ketma-ketligi, loyiha nazorati va yakuniy sifatni boshqaradi.",
        skills: ["Planning", "Control", "Teamwork"],
      },
      {
        id: 6,
        name: "Javohir",
        role: "Motion Designer",
        photo: "/team/member-6.jpg",
        angle: 48,
        y: 2.44,
        about: "Sahifa animatsiyalari, mikro-harakatlar va interaktiv o'tishlarga jon beradi.",
        skills: ["Animation", "Motion", "Interaction"],
      },
      {
        id: 7,
        name: "Farrux",
        role: "DevOps Engineer",
        photo: "/team/member-7.jpg",
        angle: 72,
        y: 2.44,
        about: "Deploy, server, monitoring va production barqarorligini nazorat qiladi.",
        skills: ["Deploy", "Monitoring", "Infrastructure"],
      },
    ],
    []
  );

  const selected = members.find((m) => m.id === selectedId) || null;
  const overlayOpacity = Math.max(0, 1 - lightProgress);

  if (!mounted) return null;

  return createPortal(
    <section className="real-museum-page">
      {/* Qorong'ulik overlay вЂ” sekin yo'qoladi */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "#000000",
          opacity: overlayOpacity,
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 2.05, 10.2], fov: 31, near: 0.1, far: 130 }}
      >
        <Suspense fallback={null}>
          <CameraLook />
          <color attach="background" args={[BLACK]} />
          <fog attach="fog" args={[BLACK, 38, 82]} />

          <SceneLights lightProgress={lightProgress} />
          <MuseumHall />

          {members.map((member) => (
            <ExhibitFrame
              key={member.id}
              item={member}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          ))}
        </Suspense>
      </Canvas>

      <div className={`member-card ${selected ? "show" : ""}`}>
        {selected && (
          <>
            <button
              type="button"
              className="member-close"
              onClick={() => setSelectedId(null)}
            >
              Г—
            </button>

            <div
              className="member-photo"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,.05), rgba(0,0,0,.48)), url("${selected.photo}")`,
              }}
            />

            <div className="member-text">
              <small>JAMOA A'ZOSI</small>
              <h2>{selected.name}</h2>
              <h3>{selected.role}</h3>
              <p>{selected.about}</p>
              <div className="member-tags">
                {selected.skills.map((skill) => (
                  <em key={skill}>{skill}</em>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <style>{`
        body.real-museum-mode {
          margin: 0 !important;
          overflow: hidden !important;
          background: #050403 !important;
        }
        body.real-museum-mode #root {
          visibility: hidden !important;
        }
        body.real-museum-mode header,
        body.real-museum-mode nav,
        body.real-museum-mode .navbar,
        body.real-museum-mode [class*="Navbar"],
        body.real-museum-mode [class*="navbar"] {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
        .real-museum-page {
          position: fixed;
          inset: 0;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background: #050403;
          color: #f7e4bd;
          z-index: 2147483647;
          font-family: Inter, Poppins, system-ui, sans-serif;
          visibility: visible !important;
        }
        .real-museum-page * {
          box-sizing: border-box;
          visibility: visible !important;
        }
        .real-museum-page::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          background:
            radial-gradient(circle at 50% 59%, transparent 0 58%, rgba(0,0,0,.035) 80%, rgba(0,0,0,.18) 100%),
            linear-gradient(90deg, rgba(0,0,0,.055), transparent 18%, transparent 82%, rgba(0,0,0,.055)),
            linear-gradient(180deg, rgba(0,0,0,.01), transparent 18%, transparent 88%, rgba(0,0,0,.06));
        }
        .real-museum-page::after {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 6;
          pointer-events: none;
          opacity: .04;
          mix-blend-mode: soft-light;
          background: repeating-linear-gradient(
            90deg,
            rgba(255,255,255,.025) 0,
            rgba(255,255,255,.025) 1px,
            transparent 1px,
            transparent 5px
          );
        }
        .member-card {
          position: absolute;
          left: 50%;
          bottom: 4%;
          width: min(650px, 90vw);
          min-height: 168px;
          z-index: 50;
          display: grid;
          grid-template-columns: 145px 1fr;
          gap: 18px;
          padding: 17px;
          opacity: 0;
          pointer-events: none;
          transform: translate(-50%, 28px) scale(.96);
          border: 1px solid rgba(242,193,78,.38);
          background: linear-gradient(180deg, rgba(22,15,9,.95), rgba(4,4,4,.97));
          box-shadow:
            inset 0 0 0 1px rgba(255,255,255,.03),
            0 22px 54px rgba(0,0,0,.50),
            0 0 26px rgba(242,193,78,.08);
          backdrop-filter: blur(14px);
          transition: .25s ease;
        }
        .member-card.show {
          opacity: 1;
          transform: translate(-50%, 0) scale(1);
          pointer-events: auto;
        }
        .member-close {
          position: absolute;
          right: 10px;
          top: 8px;
          width: 29px;
          height: 29px;
          border-radius: 50%;
          border: 1px solid rgba(242,193,78,.34);
          background: #050403;
          color: #f6e5bd;
          font-size: 21px;
          cursor: pointer;
        }
        .member-photo {
          min-height: 138px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(242,193,78,.22);
          background:
            radial-gradient(circle at center, rgba(242,193,78,.10), transparent 66%),
            #090705;
          background-size: cover;
          background-position: center;
          box-shadow: inset 0 0 34px rgba(0,0,0,.48);
        }
        .member-photo::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, transparent 42%, rgba(0,0,0,.66));
        }
        .member-text {
          padding-right: 28px;
        }
        .member-text small {
          display: block;
          color: #f2c14e;
          font-size: 10px;
          letter-spacing: .18em;
          margin-bottom: 8px;
        }
        .member-text h2 {
          margin: 0;
          color: #fff0cb;
          font-family: Georgia, serif;
          font-size: 34px;
          line-height: 1;
        }
        .member-text h3 {
          margin: 8px 0 0;
          color: #f2c14e;
          font-size: 13px;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .member-text p {
          margin: 12px 0 0;
          color: rgba(246,229,189,.78);
          font-size: 14px;
          line-height: 1.6;
        }
        .member-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 13px;
        }
        .member-tags em {
          font-style: normal;
          padding: 6px 10px;
          border: 1px solid rgba(242,193,78,.20);
          background: rgba(0,0,0,.26);
          color: rgba(246,229,189,.82);
          font-size: 11px;
        }
        @media (max-width: 900px) {
          .member-card {
            grid-template-columns: 1fr;
            width: min(430px, 92vw);
          }
          .member-photo {
            display: none;
          }
        }
      `}</style>
    </section>,
    document.body
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// CHIROQLAR вЂ” lightProgress bilan yonadi
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function SceneLights({ lightProgress }) {
  const p = lightProgress;
  return (
    <>
      <ambientLight intensity={4.2 * p} color="#ffe4b7" />
      <spotLight
        position={[0, 7.5, 4.1]}
        angle={1.17}
        penumbra={0.88}
        intensity={16.0 * p}
        color="#ffedc8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 5.7, -6.35]}    intensity={9.0 * p} color="#ffe5b5" />
      <pointLight position={[-6.6, 4.85, -4.25]} intensity={6.8 * p} color="#f8cb82" />
      <pointLight position={[6.6, 4.85, -4.25]}  intensity={6.8 * p} color="#f8cb82" />
      <pointLight position={[0, 1.25, 2.2]}      intensity={3.5 * p} color="#ebb45a" />
      <pointLight position={[0, 3.65, 2.65]}     intensity={3.0 * p} color="#ffd995" />
      <pointLight position={[0, 2.9, -2.3]}      intensity={3.8 * p} color="#f8c36f" />
      <pointLight position={[0, 0.3, 0]}         intensity={5.5 * p} color="#ffd580" />
      <pointLight position={[-4, 0.2, -3]}       intensity={3.2 * p} color="#ffcc66" />
      <pointLight position={[4, 0.2, -3]}        intensity={3.2 * p} color="#ffcc66" />
      <pointLight position={[0, 0.2, 4]}         intensity={2.8 * p} color="#ffe0a0" />
    </>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// KAMERA
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function CameraLook() {
  const { camera } = useThree();
  useEffect(() => {
    camera.lookAt(0, 2.06, -6.75);
  }, [camera]);
  return null;
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// MUZEY ZALI
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function MuseumHall() {
  const textures = useMuseumTextures();

  const wallAngles   = [-84, -72, -60, -48, -36, -24, -12, 0, 12, 24, 36, 48, 60, 72, 84];
  const columnAngles = [-84, -60, -36, -12, 12, 36, 60, 84];

  return (
    <>
      <Floor marbleTexture={textures.marbleTexture} />
      <Ceiling wallTexture={textures.wallTexture} />
      {wallAngles.map((angle) => (
        <WallSegment key={angle} angle={angle} wallTexture={textures.wallTexture} />
      ))}
      {columnAngles.map((angle) => (
        <Column key={angle} angle={angle} />
      ))}
      <HomeZone />
    </>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// TEXTURALAR
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function useMuseumTextures() {
  const wallTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 900;
    canvas.height = 900;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#2b1c12";
    ctx.fillRect(0, 0, 900, 900);

    for (let i = 0; i < 4500; i++) {
      const x = Math.random() * 900;
      const y = Math.random() * 900;
      const a = Math.random() * 0.08;
      ctx.fillStyle = `rgba(255,222,174,${a})`;
      ctx.fillRect(x, y, Math.random() * 2.4, Math.random() * 2.4);
    }

    for (let i = 0; i < 130; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * 900, Math.random() * 900);
      ctx.bezierCurveTo(
        Math.random() * 900, Math.random() * 900,
        Math.random() * 900, Math.random() * 900,
        Math.random() * 900, Math.random() * 900
      );
      ctx.strokeStyle = `rgba(255,218,160,${Math.random() * 0.052})`;
      ctx.lineWidth = Math.random() * 1.25;
      ctx.stroke();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1.1, 1.08);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  const marbleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");

    const grad = ctx.createLinearGradient(0, 0, 1200, 1200);
    grad.addColorStop(0,    "#1e1208");
    grad.addColorStop(0.22, "#4a2e18");
    grad.addColorStop(0.45, "#7a5030");
    grad.addColorStop(0.68, "#2e1a0e");
    grad.addColorStop(1,    "#100806");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1200, 1200);

    for (let i = 0; i < 350; i++) {
      ctx.beginPath();
      let x = Math.random() * 1200;
      let y = Math.random() * 1200;
      ctx.moveTo(x, y);
      for (let j = 0; j < 6; j++) {
        x += (Math.random() - 0.5) * 320;
        y += (Math.random() - 0.5) * 320;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle =
        i % 4 === 0
          ? `rgba(255,210,120,${0.45 + Math.random() * 0.3})`
          : `rgba(255,255,255,${0.12 + Math.random() * 0.12})`;
      ctx.lineWidth = i % 4 === 0 ? 2.0 : 0.9;
      ctx.stroke();
    }

    for (let i = 0; i < 80; i++) {
      const x = Math.random() * 1200;
      const y = Math.random() * 1200;
      const r = ctx.createRadialGradient(x, y, 0, x, y, 60 + Math.random() * 80);
      r.addColorStop(0, `rgba(255,230,160,${0.18 + Math.random() * 0.14})`);
      r.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = r;
      ctx.fillRect(0, 0, 1200, 1200);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2.0, 2.0);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  return { wallTexture, marbleTexture };
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// YORDAMCHI
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function wallTransform(angle, y = 2.43, radius = WALL_RADIUS, offset = 0.04) {
  const a = THREE.MathUtils.degToRad(angle);
  return {
    position: [Math.sin(a) * radius, y, -Math.cos(a) * radius + offset],
    rotation: [0, -a, 0],
  };
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// POL
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function Floor({ marbleTexture }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.045, -0.38]} receiveShadow>
        <circleGeometry args={[11.6, 280]} />
        <MeshReflectorMaterial
          map={marbleTexture}
          color="#6b3e22"
          roughness={0.0}
          metalness={0.9}
          blur={[1024, 512]}
          mixBlur={0.4}
          mixStrength={12.0}
          resolution={2048}
          mirror={1.0}
          depthScale={1.2}
          minDepthThreshold={0.05}
          maxDepthThreshold={2.5}
          reflectorOffset={0.02}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -0.38]} raycast={() => null}>
        <circleGeometry args={[11.6, 280]} />
        <meshPhysicalMaterial
          color="#c87020"
          transparent
          opacity={0.08}
          roughness={0.0}
          metalness={0.0}
          transmission={0.92}
          thickness={0.05}
          ior={1.5}
          clearcoat={1}
          clearcoatRoughness={0.0}
          side={THREE.FrontSide}
          depthWrite={false}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -0.38]} raycast={() => null}>
        <circleGeometry args={[4.5, 120]} />
        <meshBasicMaterial color="#ffe8b0" transparent opacity={0.04} depthWrite={false} />
      </mesh>

      <FloorLightRing radius={2.28} tube={0.042} opacity={0.88} />
      <FloorLightRing radius={6.23} tube={0.030} opacity={0.55} />
      <FloorLightRing radius={8.62} tube={0.022} opacity={0.35} />
      <FloorLightRing radius={1.1}  tube={0.018} opacity={0.45} />
      <FloorLightRing radius={4.5}  tube={0.020} opacity={0.30} />
    </group>
  );
}

function FloorLightRing({ radius, tube, opacity }) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -0.38]} raycast={() => null}>
      <torusGeometry args={[radius, tube, 12, 220]} />
      <meshBasicMaterial color={GOLD_LIGHT} transparent opacity={opacity} side={THREE.DoubleSide} />
    </mesh>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// SHIFT
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function Ceiling({ wallTexture }) {
  return (
    <group position={[0, 5.72, -1.85]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[10.45, 8]} />
        <meshStandardMaterial map={wallTexture} color="#5f3c23" roughness={0.5} metalness={0.25} emissive="#2d170b" emissiveIntensity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.055, 0]}>
        <circleGeometry args={[7.8, 8]} />
        <meshStandardMaterial map={wallTexture} color="#472b18" roughness={0.52} metalness={0.22} emissive="#291509" emissiveIntensity={0.42} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.105, 0]}>
        <circleGeometry args={[5.55, 8]} />
        <meshStandardMaterial map={wallTexture} color="#352012" roughness={0.54} metalness={0.2} emissive="#211108" emissiveIntensity={0.34} side={THREE.DoubleSide} />
      </mesh>
      {[3.12, 5.62, 7.82].map((radius, index) => (
        <mesh key={radius} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.12 - index * 0.015, 0]}>
          <torusGeometry args={[radius, index === 0 ? 0.07 : 0.05, 14, 180]} />
          <meshStandardMaterial
            color={index === 0 ? GOLD_LIGHT : GOLD}
            roughness={0.12}
            metalness={1}
            emissive={GOLD_LIGHT}
            emissiveIntensity={index === 0 ? 0.44 : 0.26}
          />
        </mesh>
      ))}
      <pointLight position={[0, -0.25, 0]} intensity={5.0} color="#ffe7bd" />
    </group>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// DEVOR SEGMENTI
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function WallSegment({ angle, wallTexture }) {
  const { position, rotation } = wallTransform(angle);
  return (
    <group position={position} rotation={rotation}>
      <mesh receiveShadow>
        <planeGeometry args={[1.43, 4.56]} />
        <meshStandardMaterial map={wallTexture} color="#442e22" roughness={0.5} metalness={0.27} emissive="#3d2413" emissiveIntensity={0.68} side={THREE.DoubleSide} />
      </mesh>
      <Panel width={1.12} height={3.18} y={-0.08} />
      <GoldLine x={0} y={2.12}  w={1.34} h={0.046} opacity={0.38} />
      <GoldLine x={0} y={1.86}  w={1.22} h={0.023} opacity={0.56} />
      <GoldLine x={0} y={-1.78} w={1.25} h={0.036} opacity={0.4}  />
    </group>
  );
}

function Panel({ width, height, y }) {
  return (
    <group position={[0, y, 0.055]}>
      <GoldLine x={0}          y={height / 2}   w={width}         h={0.015} opacity={0.36} />
      <GoldLine x={0}          y={-height / 2}  w={width}         h={0.015} opacity={0.36} />
      <GoldLine x={-width / 2} y={0}            w={0.015}         h={height} opacity={0.36} />
      <GoldLine x={width / 2}  y={0}            w={0.015}         h={height} opacity={0.36} />
      <GoldLine x={0}          y={height / 2 - 0.13}  w={width - 0.18} h={0.01} opacity={0.25} />
      <GoldLine x={0}          y={-height / 2 + 0.13} w={width - 0.18} h={0.01} opacity={0.25} />
      <GoldLine x={-width / 2 + 0.13} y={0} w={0.01} h={height - 0.23} opacity={0.25} />
      <GoldLine x={width / 2 - 0.13}  y={0} w={0.01} h={height - 0.23} opacity={0.25} />
    </group>
  );
}

function GoldLine({ x, y, w, h, opacity = 0.5 }) {
  return (
    <mesh position={[x, y, 0.03]} raycast={() => null}>
      <boxGeometry args={[w, h, 0.012]} />
      <meshBasicMaterial color={GOLD_SOFT} transparent opacity={opacity} />
    </mesh>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// USTUN
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function Column({ angle }) {
  const a = THREE.MathUtils.degToRad(angle);
  const x = Math.sin(a) * COLUMN_RADIUS;
  const z = -Math.cos(a) * COLUMN_RADIUS + 0.08;

  return (
    <group position={[x, 2.42, z]}>
      <mesh castShadow receiveShadow raycast={() => null}>
        <cylinderGeometry args={[0.082, 0.108, 4.36, 44]} />
        <meshStandardMaterial color="#110b07" roughness={0.32} metalness={0.72} emissive="#0b0503" emissiveIntensity={0.12} />
      </mesh>
      <mesh position={[0, 2.25, 0]} castShadow raycast={() => null}>
        <cylinderGeometry args={[0.24, 0.17, 0.18, 44]} />
        <meshStandardMaterial color="#4d2f17" roughness={0.18} metalness={0.84} emissive={GOLD} emissiveIntensity={0.06} />
      </mesh>
      <mesh position={[0, -2.25, 0]} castShadow raycast={() => null}>
        <cylinderGeometry args={[0.25, 0.18, 0.2, 44]} />
        <meshStandardMaterial color="#4d2f17" roughness={0.18} metalness={0.82} emissive={GOLD} emissiveIntensity={0.05} />
      </mesh>
      <mesh position={[0, 2.41, 0]} castShadow raycast={() => null}>
        <boxGeometry args={[0.45, 0.1, 0.45]} />
        <meshStandardMaterial color="#25180d" roughness={0.22} metalness={0.76} />
      </mesh>
      <mesh position={[0, -2.42, 0]} castShadow raycast={() => null}>
        <boxGeometry args={[0.49, 0.12, 0.49]} />
        <meshStandardMaterial color="#25180d" roughness={0.22} metalness={0.76} />
      </mesh>
    </group>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// RASM RAMKASI
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function ExhibitFrame({ item, selectedId, setSelectedId }) {
  const selected = selectedId === item.id;
  const size = { w: 0.86, h: 1.62 };
  const { position, rotation } = wallTransform(item.angle, item.y, WALL_RADIUS, 0.02);

  return (
    <group position={position} rotation={rotation}>
      <FrameWallMount width={size.w} height={size.h} />
      <FrameWallGlow height={size.h} />
      <group
        scale={selected ? 1.045 : 1}
        position={[0, selected ? 0.035 : 0, selected ? 0.06 : 0]}
      >
        <FrameShell width={size.w} height={size.h} />
        <PortraitPlane item={item} width={size.w * 0.69} height={size.h * 0.72} />

        <mesh
          position={[0, -0.02, 0.24]}
          onClick={(e) => { e.stopPropagation(); setSelectedId((prev) => (prev === item.id ? null : item.id)); }}
          onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
          onPointerOut={() => { document.body.style.cursor = "default"; }}
        >
          <planeGeometry args={[size.w * 1.12, size.h * 1.35]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}

function PortraitPlane({ item, width, height }) {
  const [texture, setTexture] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setTexture(null);
    setFailed(false);

    const loader = new THREE.TextureLoader();
    loader.load(
      item.photo,
      (loadedTexture) => {
        if (!alive) return;
        loadedTexture.colorSpace = THREE.SRGBColorSpace;
        loadedTexture.wrapS = THREE.ClampToEdgeWrapping;
        loadedTexture.wrapT = THREE.ClampToEdgeWrapping;

        const image = loadedTexture.image;
        if (image?.width && image?.height) {
          const imageAspect = image.width / image.height;
          const frameAspect = width / height;
          if (imageAspect > frameAspect) {
            const repeatX = frameAspect / imageAspect;
            loadedTexture.repeat.set(repeatX, 1);
            loadedTexture.offset.set((1 - repeatX) / 2, 0);
          } else {
            const repeatY = imageAspect / frameAspect;
            loadedTexture.repeat.set(1, repeatY);
            loadedTexture.offset.set(0, (1 - repeatY) / 2);
          }
        }

        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
      },
      undefined,
      () => { if (alive) setFailed(true); }
    );
    return () => { alive = false; };
  }, [item.photo, width, height]);

  return (
    <group position={[0, 0.12, 0.115]}>
      <mesh raycast={() => null}>
        <planeGeometry args={[width, height]} />
        {texture && !failed ? (
          <meshBasicMaterial map={texture} toneMapped={false} />
        ) : (
          <meshStandardMaterial color="#090705" roughness={0.62} metalness={0.25} />
        )}
      </mesh>

      {(!texture || failed) && (
        <Text position={[0, 0, 0.012]} fontSize={0.42} color="#fff0c5" anchorX="center" anchorY="middle" raycast={() => null}>
          {item.name.charAt(0)}
        </Text>
      )}

      <mesh position={[0, 0, 0.018]} raycast={() => null}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.08} depthWrite={false} />
      </mesh>
      <mesh position={[0, -height * 0.34, 0.02]} raycast={() => null}>
        <planeGeometry args={[width, height * 0.22]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.18} depthWrite={false} />
      </mesh>
    </group>
  );
}

function FrameWallMount({ width, height }) {
  return (
    <group position={[0, -0.01, 0.018]}>
      <mesh raycast={() => null}>
        <planeGeometry args={[width * 1.22, height * 1.18]} />
        <meshStandardMaterial color="#1a1009" transparent opacity={0.14} roughness={0.75} metalness={0.12} />
      </mesh>
      <GoldLine x={0}           y={height * 0.58}  w={width * 1.04} h={0.01} opacity={0.1} />
      <GoldLine x={0}           y={-height * 0.58} w={width * 1.04} h={0.01} opacity={0.1} />
      <GoldLine x={-width * 0.58} y={0}            w={0.01} h={height * 1.1} opacity={0.08} />
      <GoldLine x={width * 0.58}  y={0}            w={0.01} h={height * 1.1} opacity={0.08} />
    </group>
  );
}

function FrameWallGlow({ height }) {
  return (
    <mesh position={[0, height / 2 - 0.66, 0.03]} raycast={() => null}>
      <planeGeometry args={[0.88, 1.32]} />
      <meshBasicMaterial color="#ffd997" transparent opacity={0.016} side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

function FrameShell({ width, height }) {
  return (
    <group>
      <FrameBars width={width} height={height} z={0.07} />
      <FrameCornerLights width={width} height={height} />
      <mesh position={[0, 0.02, 0.025]} raycast={() => null}>
        <planeGeometry args={[width * 0.83, height * 0.8]} />
        <meshStandardMaterial color="#090705" roughness={0.62} metalness={0.3} />
      </mesh>
      <Ornaments width={width} height={height} />
    </group>
  );
}

function FrameBars({ width, height, z = 0.07 }) {
  const t = 0.05;
  return (
    <group>
      <mesh position={[0, height / 2, z]} raycast={() => null}>
        <boxGeometry args={[width + t, t, t]} />
        <meshStandardMaterial color={GOLD} roughness={0.14} metalness={1} emissive={GOLD} emissiveIntensity={0.11} />
      </mesh>
      <mesh position={[0, -height / 2, z]} raycast={() => null}>
        <boxGeometry args={[width + t, t, t]} />
        <meshStandardMaterial color={GOLD} roughness={0.14} metalness={1} emissive={GOLD} emissiveIntensity={0.11} />
      </mesh>
      <mesh position={[-width / 2, 0, z]} raycast={() => null}>
        <boxGeometry args={[t, height + t, t]} />
        <meshStandardMaterial color={GOLD} roughness={0.14} metalness={1} emissive={GOLD} emissiveIntensity={0.11} />
      </mesh>
      <mesh position={[width / 2, 0, z]} raycast={() => null}>
        <boxGeometry args={[t, height + t, t]} />
        <meshStandardMaterial color={GOLD} roughness={0.14} metalness={1} emissive={GOLD} emissiveIntensity={0.11} />
      </mesh>
    </group>
  );
}

function FrameCornerLights({ width, height }) {
  return (
    <group>
      <mesh position={[width / 2 - 0.16, height / 2 + 0.04, 0.118]} raycast={() => null}>
        <boxGeometry args={[0.34, 0.018, 0.018]} />
        <meshBasicMaterial color={GOLD_LIGHT} toneMapped={false} />
      </mesh>
      <mesh position={[width / 2 + 0.04, height / 2 - 0.16, 0.118]} raycast={() => null}>
        <boxGeometry args={[0.018, 0.34, 0.018]} />
        <meshBasicMaterial color={GOLD_LIGHT} toneMapped={false} />
      </mesh>
      <pointLight position={[width / 2 - 0.1, height / 2 - 0.08, 0.22]} intensity={0.8} distance={1.4} decay={2} color="#ffe7b8" />

      <mesh position={[-width / 2 + 0.16, -height / 2 - 0.04, 0.118]} raycast={() => null}>
        <boxGeometry args={[0.34, 0.018, 0.018]} />
        <meshBasicMaterial color={GOLD_LIGHT} toneMapped={false} />
      </mesh>
      <mesh position={[-width / 2 - 0.04, -height / 2 + 0.16, 0.118]} raycast={() => null}>
        <boxGeometry args={[0.018, 0.34, 0.018]} />
        <meshBasicMaterial color={GOLD_LIGHT} toneMapped={false} />
      </mesh>
      <pointLight position={[-width / 2 + 0.1, -height / 2 + 0.08, 0.22]} intensity={0.58} distance={1.25} decay={2} color="#ffe7b8" />
    </group>
  );
}

function Ornaments({ width, height }) {
  const topY    = height / 2 + 0.05;
  const bottomY = -height / 2 - 0.05;
  return (
    <group>
      <mesh position={[0, topY, 0.11]} raycast={() => null}>
        <sphereGeometry args={[0.05, 24, 24]} />
        <meshStandardMaterial color={GOLD_LIGHT} roughness={0.12} metalness={1} emissive={GOLD_LIGHT} emissiveIntensity={0.18} />
      </mesh>
      <mesh position={[0, bottomY, 0.11]} raycast={() => null}>
        <sphereGeometry args={[0.05, 22, 22]} />
        <meshStandardMaterial color={GOLD_LIGHT} roughness={0.14} metalness={1} emissive={GOLD} emissiveIntensity={0.1} />
      </mesh>
      {[
        [-width / 2,  height / 2],
        [ width / 2,  height / 2],
        [-width / 2, -height / 2],
        [ width / 2, -height / 2],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.11]} raycast={() => null}>
          <sphereGeometry args={[0.04, 22, 22]} />
          <meshStandardMaterial color={GOLD_LIGHT} roughness={0.14} metalness={1} emissive={GOLD} emissiveIntensity={0.09} />
        </mesh>
      ))}
    </group>
  );
}

// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// YASHIRIN BOSH SAHIFAGA QAYTISH ZONASI
// в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
function HomeZone() {
  const goHome = () => { window.location.href = "/"; };

  return (
    <group position={[0, 0.02, -0.9]}>
      {/* Pol ustidagi yashirin bosish maydoni */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        onClick={(e) => { e.stopPropagation(); goHome(); }}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = "pointer"; }}
        onPointerOut={() => { document.body.style.cursor = "default"; }}
      >
        <circleGeometry args={[1.6, 64]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Juda ham nozik oltin doira вЂ” atmosfera uchun, deyarli ko'rinmaydi */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, 0]} raycast={() => null}>
        <ringGeometry args={[1.35, 1.38, 128]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.035} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
    </group>
  );
}
