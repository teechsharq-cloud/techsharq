import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

const PROJECT_COLORS = [
  "#3e6fb3",
  "#3b8f77",
  "#6d5ac9",
  "#b47a34",
  "#8c3f66",
  "#4f8a4d",
  "#2f3c5b",
  "#754b32",
  "#615a49",
  "#2b5879",
  "#8c6f4a",
  "#4b3a7b",
  "#7f5b32",
  "#2d6f82",
  "#934f42",
];

const FEATURED_PROJECTS = [
  {
    title: "ElTaksi",
    label: "Realtime taxi ecosystem",
    status: "PWA / Socket.IO",
    color: "#b57a28",
    accent: "#ffd166",
    link: "/projects/eltaksi",
    description:
      "Mijoz, haydovchi va admin paneli bir ekotizimda ishlaydigan real-time taxi va delivery platformasi. Buyurtmalar, navbat, geolokatsiya, statuslar va jonli xabarlar Socket.IO orqali boshqariladi.",
  },
  {
    title: "Taomzor",
    label: "Telegram + PWA ordering",
    status: "Mini app",
    color: "#2e8f6d",
    accent: "#39ffbf",
    link: "/projects/taomzor",
    description:
      "Telegram bot va PWA orqali ishlaydigan ovqat buyurtma tizimi. Kafe katalogi, rasmlar, buyurtma jarayoni, admin va superadmin boshqaruvi bilan mini app formatida qurilgan.",
  },
  {
    title: "Tizim24",
    label: "Shop management system",
    status: "Business system",
    color: "#3e6fb3",
    accent: "#7cc7ff",
    link: "/projects/tizim24",
    description:
      "Do‘konlar uchun kassa, sotuvlar, kirim-chiqim, qarzlar, yetkazib beruvchilar, xodim rollari va hisobotlarni boshqaradigan kompleks biznes tizim.",
  },
  {
    title: "Clauseg AI",
    label: "Legal AI document analysis",
    status: "AI lab",
    color: "#5942a8",
    accent: "#c0b2ff",
    link: "/projects/clauseg-ai",
    description:
      "Shartnoma, taklif va huquqiy hujjatlarni sun’iy intellekt yordamida tahlil qilishga mo‘ljallangan assistant. Matn ajratish, risklarni ko‘rsatish va huquqiy izohlar berishga yo‘naltirilgan.",
  },
  {
    title: "SharqTech",
    label: "Digital ecosystem",
    status: "Core brand",
    color: "#0f6b86",
    accent: "#00d8ff",
    link: "/projects/sharqtech",
    description:
      "Mahalliy ehtiyojlarga mos, premium va original IT mahsulotlar ekotizimi. SharqTech — g‘oya, dizayn, texnologiya va foydalanuvchi tajribasini birlashtiradigan asosiy brend.",
  },
  {
    title: "ZetaPlay",
    label: "Telegram game bot",
    status: "Gamified rewards",
    color: "#7e408f",
    accent: "#f0a6ff",
    link: "/projects/zetaplay",
    description:
      "Telegram ichida oddiy o‘yinlar orqali ball yig‘ish va mukofotlarga almashtirish g‘oyasiga asoslangan gamified bot. Premium, pozitsiya va boshqa sovrinlar tizimi uchun tayyorlanadi.",
  },
  {
    title: "ML League",
    label: "Mobile Legends tournament",
    status: "Tournament platform",
    color: "#8f4b2e",
    accent: "#ffb27a",
    link: "/projects/ml-league",
    description:
      "Mobile Legends musobaqalari, liga, reyting, ro‘yxatdan o‘tish, natijalar va livestream jarayonlarini birlashtiruvchi turnir ekotizimi.",
  },
];

const FEATURED_SLOTS = {
  "0-5": 0,
  "0-14": 1,
  "0-23": 2,
  "1-6": 3,
  "1-17": 4,
  "2-4": 5,
  "4-3": 6,
};

const ROW_BLUEPRINTS = [
  {
    density: "dense",
    clusters: [
      [-3.05, -2.42, 7],
      [-2.12, -1.48, 6],
      [-1.18, -0.42, 8],
      [-0.12, 0.48, 6],
      [0.82, 1.52, 7],
      [1.92, 2.44, 5],
      [2.72, 3.05, 3],
    ],
  },
  {
    density: "medium",
    clusters: [
      [-2.95, -2.46, 4],
      [-2.05, -1.38, 6],
      [-0.82, -0.22, 5],
      [0.24, 0.88, 5],
      [1.42, 1.96, 4],
      [2.48, 2.92, 3],
    ],
  },
  {
    density: "light",
    clusters: [
      [-2.82, -2.34, 3],
      [-1.68, -0.92, 6],
      [-0.28, 0.18, 3],
      [0.78, 1.42, 5],
      [2.18, 2.72, 3],
    ],
  },
  {
    density: "sparse",
    clusters: [
      [-2.7, -2.34, 2],
      [-1.18, -0.74, 3],
      [0.26, 0.62, 2],
      [1.68, 2.18, 3],
    ],
  },
  {
    density: "medium",
    clusters: [
      [-2.95, -2.22, 6],
      [-1.66, -1.18, 3],
      [-0.42, 0.18, 5],
      [0.92, 1.42, 4],
      [2.18, 2.88, 5],
    ],
  },
];

const RISE_DURATION = 4.2;
const RISE_START_Y = -4.35;
const RISE_END_Y = -0.45;

const LIGHT_DELAY_AFTER_RISE = 0.45;
const NEON_START_TIME = RISE_DURATION + LIGHT_DELAY_AFTER_RISE;
const NEON_STAGGER = 0.18;
const NEON_FLICKER_DURATION = 1.35;

const ROTATION_START_TIME =
  NEON_START_TIME + NEON_STAGGER * 4 + NEON_FLICKER_DURATION + 0.45;

function rand(a, b, c = 1) {
  const x = Math.sin(a * 91.17 + b * 17.73 + c * 43.11) * 10000;
  return x - Math.floor(x);
}

function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function smoothstep(edge0, edge1, x) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

function isPointerInsideShelfArea(element, clientX, clientY) {
  const rect = element.getBoundingClientRect();

  const x = (clientX - rect.left) / rect.width - 0.5;
  const y = (clientY - rect.top) / rect.height - 0.5;

  const radiusX = 0.29;
  const radiusY = 0.43;
  const offsetY = 0.015;

  return (
    (x * x) / (radiusX * radiusX) +
      ((y - offsetY) * (y - offsetY)) / (radiusY * radiusY) <=
    1
  );
}

function makeLabelTexture(title, accent = "#ffffff") {
  if (typeof document === "undefined") return null;

  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 1024;

  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, "rgba(7,10,18,0.12)");
  grad.addColorStop(1, "rgba(7,10,18,0.52)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = accent;
  ctx.fillRect(10, 24, 8, canvas.height - 48);

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.fillRect(28, canvas.height - 90, 72, 8);

  ctx.save();
  ctx.translate(canvas.width / 2 + 12, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 88px Arial";
  ctx.lineWidth = 10;
  ctx.strokeStyle = "rgba(10,12,16,0.92)";
  ctx.strokeText(title, 0, 0);
  ctx.fillStyle = "#fff1cf";
  ctx.fillText(title, 0, 0);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  return texture;
}

function ProjectSpineLabel({ title, accent, height, depth }) {
  const texture = useMemo(() => makeLabelTexture(title, accent), [title, accent]);

  if (!texture) return null;

  return (
    <>
      <mesh position={[0, 0, depth / 2 + 0.006]}>
        <planeGeometry args={[0.088, height * 0.78]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>

      <mesh position={[0, -height * 0.38, depth / 2 + 0.008]}>
        <boxGeometry args={[0.055, 0.012, 0.004]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.75}
          roughness={0.22}
        />
      </mesh>
    </>
  );
}

function OpenBookPages({ width, height, depth, project }) {
  const leftPage = useRef();
  const rightPage = useRef();
  const backCover = useRef();
  const progress = useRef(0);

  useFrame((_, delta) => {
    progress.current = THREE.MathUtils.damp(progress.current, 1, 5.8, delta);
    const p = progress.current;

    if (backCover.current) {
      backCover.current.scale.x = THREE.MathUtils.lerp(0.8, 1.16, p);
      backCover.current.scale.y = THREE.MathUtils.lerp(0.82, 1.1, p);
      backCover.current.position.z = THREE.MathUtils.lerp(
        depth / 2 + 0.012,
        depth / 2 + 0.055,
        p
      );
    }

    if (leftPage.current) {
      leftPage.current.rotation.y = THREE.MathUtils.lerp(0, 0.92, p);
      leftPage.current.position.x = THREE.MathUtils.lerp(-0.035, -0.26, p);
      leftPage.current.position.z = THREE.MathUtils.lerp(
        depth / 2 + 0.025,
        depth / 2 + 0.14,
        p
      );
      leftPage.current.scale.set(
        THREE.MathUtils.lerp(0.72, 1, p),
        THREE.MathUtils.lerp(0.76, 1.05, p),
        1
      );
    }

    if (rightPage.current) {
      rightPage.current.rotation.y = THREE.MathUtils.lerp(0, -0.92, p);
      rightPage.current.position.x = THREE.MathUtils.lerp(0.035, 0.26, p);
      rightPage.current.position.z = THREE.MathUtils.lerp(
        depth / 2 + 0.025,
        depth / 2 + 0.14,
        p
      );
      rightPage.current.scale.set(
        THREE.MathUtils.lerp(0.72, 1, p),
        THREE.MathUtils.lerp(0.76, 1.05, p),
        1
      );
    }
  });

  return (
    <group>
      <mesh ref={backCover} position={[0, 0, depth / 2 + 0.012]}>
        <boxGeometry args={[width * 1.2, height * 1.02, 0.018]} />
        <meshStandardMaterial
          color={project.color}
          roughness={0.48}
          metalness={0.05}
          emissive={project.accent}
          emissiveIntensity={0.2}
        />
      </mesh>

      <mesh ref={leftPage} position={[-0.035, 0, depth / 2 + 0.025]}>
        <boxGeometry args={[0.34, height * 0.98, 0.012]} />
        <meshStandardMaterial
          color="#fff0cf"
          roughness={0.68}
          metalness={0}
          emissive={project.accent}
          emissiveIntensity={0.045}
        />
      </mesh>

      <mesh ref={rightPage} position={[0.035, 0, depth / 2 + 0.025]}>
        <boxGeometry args={[0.34, height * 0.98, 0.012]} />
        <meshStandardMaterial
          color="#f4dfb8"
          roughness={0.7}
          metalness={0}
          emissive={project.accent}
          emissiveIntensity={0.055}
        />
      </mesh>

      <mesh position={[0, 0, depth / 2 + 0.18]}>
        <boxGeometry args={[0.014, height * 1.04, 0.018]} />
        <meshStandardMaterial
          color={project.accent}
          emissive={project.accent}
          emissiveIntensity={0.62}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function Book({
  angle,
  y,
  width,
  height,
  depth,
  color,
  tilt = 0,
  radius = 1.64,
  project = null,
  accent = "#d6b36a",
  selectedProject,
  onProjectSelect,
}) {
  const groupRef = useRef();

  const isProject = Boolean(project);
  const isSelected = isProject && selectedProject?.title === project.title;

  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  useFrame(() => {
    if (!groupRef.current) return;

    const out = isSelected ? 0.62 : 0;
    const targetX = Math.sin(angle) * (radius + out);
    const targetZ = Math.cos(angle) * (radius + out);
    const targetY = y + height / 2 + (isSelected ? 0.065 : 0);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.11
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.11
    );

    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetZ,
      0.11
    );

    const targetScale = isSelected ? 1.34 : 1;

    groupRef.current.scale.x = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      0.13
    );

    groupRef.current.scale.y = THREE.MathUtils.lerp(
      groupRef.current.scale.y,
      targetScale,
      0.13
    );

    groupRef.current.scale.z = THREE.MathUtils.lerp(
      groupRef.current.scale.z,
      targetScale,
      0.13
    );

    const selectedTilt = isSelected ? 0.075 : 0;

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      tilt + selectedTilt,
      0.12
    );
  });

  const handlePointerOver = (e) => {
    if (!project) return;
    e.stopPropagation();
    if (typeof document !== "undefined") document.body.style.cursor = "pointer";
  };

  const handlePointerOut = (e) => {
    if (!project) return;
    e.stopPropagation();
    if (typeof document !== "undefined") document.body.style.cursor = "default";
  };

  const handleClick = (e) => {
    if (!project) return;
    e.stopPropagation();
    onProjectSelect?.(project);
  };

  return (
    <group
      ref={groupRef}
      position={[x, y + height / 2, z]}
      rotation={[0, angle, tilt]}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <RoundedBox args={[width, height, depth]} radius={0.009} smoothness={3}>
        <meshStandardMaterial
          color={color}
          roughness={project ? 0.48 : 0.72}
          metalness={project ? 0.05 : 0.02}
          emissive={project ? accent : "#000000"}
          emissiveIntensity={isSelected ? 0.42 : project ? 0.055 : 0}
        />
      </RoundedBox>

      <mesh position={[-width / 2 + 0.012, 0, depth / 2 + 0.001]}>
        <boxGeometry args={[0.008, height * 0.82, 0.002]} />
        <meshStandardMaterial
          color={project ? accent : "#d6b36a"}
          emissive={project ? accent : "#6f4d00"}
          emissiveIntensity={isSelected ? 0.95 : project ? 0.3 : 0.08}
        />
      </mesh>

      <mesh position={[0, height / 2 - 0.025, depth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.56, 0.006, 0.002]} />
        <meshStandardMaterial
          color={project ? accent : "#b59655"}
          emissive={project ? accent : "#000000"}
          emissiveIntensity={isSelected ? 0.38 : 0}
        />
      </mesh>

      <mesh position={[0, -height / 2 + 0.035, depth / 2 + 0.001]}>
        <boxGeometry args={[width * 0.48, 0.006, 0.002]} />
        <meshStandardMaterial color={project ? accent : "#9f8048"} />
      </mesh>

      {project && (
        <>
          <mesh position={[width / 2 - 0.012, 0, depth / 2 + 0.002]}>
            <boxGeometry args={[0.008, height * 0.86, 0.003]} />
            <meshStandardMaterial
              color={accent}
              emissive={accent}
              emissiveIntensity={isSelected ? 1.05 : 0.34}
            />
          </mesh>

          <ProjectSpineLabel
            title={project.title}
            accent={accent}
            height={height}
            depth={depth}
          />

          {isSelected && (
            <OpenBookPages
              width={width}
              height={height}
              depth={depth}
              project={project}
            />
          )}
        </>
      )}
    </group>
  );
}

function createClusterAngles(start, end, count, rowIndex, clusterIndex) {
  if (count <= 0) return [];
  if (count === 1) return [(start + end) / 2];

  const result = [];
  const step = (end - start) / (count - 1);

  for (let i = 0; i < count; i++) {
    const edgeFactor = i === 0 || i === count - 1 ? 0.45 : 1;
    const jitter =
      (rand(rowIndex, clusterIndex * 100 + i, 17) - 0.5) *
      step *
      0.25 *
      edgeFactor;

    result.push(start + step * i + jitter);
  }

  return result;
}

function createBookConfig(
  rowIndex,
  localIndex,
  angle,
  project = null,
  density = "medium",
  clusterIndex = 0,
  indexInCluster = 0,
  clusterCount = 1
) {
  const r1 = rand(rowIndex, localIndex, 1);
  const r2 = rand(rowIndex, localIndex, 2);
  const r3 = rand(rowIndex, localIndex, 3);

  let widthBase = 0.055;
  let heightBase = 0.52;
  let depthBase = 0.14;

  if (density === "dense") {
    widthBase = 0.058;
    heightBase = 0.56;
    depthBase = 0.145;
  } else if (density === "medium") {
    widthBase = 0.056;
    heightBase = 0.54;
    depthBase = 0.142;
  } else if (density === "light") {
    widthBase = 0.06;
    heightBase = 0.57;
    depthBase = 0.148;
  } else if (density === "sparse") {
    widthBase = 0.062;
    heightBase = 0.58;
    depthBase = 0.15;
  }

  const width = project ? 0.115 + r1 * 0.022 : widthBase + r1 * 0.046;
  const height = project ? 0.76 + r2 * 0.12 : heightBase + r2 * 0.28;
  const depth = project ? 0.18 : depthBase + r3 * 0.03;

  let tilt = (r3 - 0.5) * 0.018;

  if (project) {
    tilt = localIndex % 2 === 0 ? -0.035 : 0.035;
  } else {
    if (indexInCluster === 0) tilt = -0.09;
    else if (indexInCluster === clusterCount - 1) tilt = 0.09;
    else if (indexInCluster % 5 === 0) tilt = -0.05;
    else if (indexInCluster % 4 === 0) tilt = 0.055;
    else if (indexInCluster % 3 === 0) tilt = -0.03;
  }

  const color =
    project?.color ||
    PROJECT_COLORS[
      Math.floor(rand(rowIndex, localIndex, 7) * PROJECT_COLORS.length)
    ];

  return {
    id: `${rowIndex}-${localIndex}`,
    angle,
    width,
    height,
    depth,
    tilt,
    color,
    project,
    accent: project?.accent || "#d6b36a",
  };
}

function ShelfBooks({ y, rowIndex, selectedProject, onProjectSelect }) {
  const books = useMemo(() => {
    const blueprint = ROW_BLUEPRINTS[rowIndex];
    if (!blueprint || blueprint.density === "empty") return [];

    const items = [];
    let localIndex = 0;

    blueprint.clusters.forEach((cluster, clusterIndex) => {
      const [start, end, count] = cluster;
      const angles = createClusterAngles(
        start,
        end,
        count,
        rowIndex,
        clusterIndex
      );

      angles.forEach((angle, indexInCluster) => {
        const slotKey = `${rowIndex}-${localIndex}`;
        const featuredIndex = FEATURED_SLOTS[slotKey];
        const project =
          featuredIndex !== undefined ? FEATURED_PROJECTS[featuredIndex] : null;

        items.push(
          createBookConfig(
            rowIndex,
            localIndex,
            angle,
            project,
            blueprint.density,
            clusterIndex,
            indexInCluster,
            angles.length
          )
        );

        localIndex += 1;
      });
    });

    return items;
  }, [rowIndex]);

  return (
    <>
      {books.map((b) => (
        <Book
          key={b.id}
          angle={b.angle}
          y={y}
          width={b.width}
          height={b.height}
          depth={b.depth}
          color={b.color}
          tilt={b.tilt}
          project={b.project}
          accent={b.accent}
          selectedProject={selectedProject}
          onProjectSelect={onProjectSelect}
        />
      ))}
    </>
  );
}

function ShelfRing({ y }) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.02, 2.02, 0.11, 96]} />
        <meshStandardMaterial
          color="#c7844f"
          roughness={0.38}
          metalness={0.03}
        />
      </mesh>

      <mesh position={[0, -0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.05, 2.05, 0.11, 96]} />
        <meshStandardMaterial
          color="#7a4424"
          roughness={0.52}
          metalness={0.02}
        />
      </mesh>

      <mesh position={[0, -0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.0, 0.017, 16, 96]} />
        <meshStandardMaterial
          color="#ffd2a0"
          emissive="#8a4b1b"
          emissiveIntensity={0.12}
          roughness={0.32}
        />
      </mesh>
    </group>
  );
}

function NeonShelfLight({ y, index, color = "#00d8ff" }) {
  const outerMat = useRef();
  const innerMat = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const start = NEON_START_TIME + index * NEON_STAGGER;

    let power = 0;

    if (t < start) {
      power = 0;
    } else if (t < start + NEON_FLICKER_DURATION) {
      const p = (t - start) / NEON_FLICKER_DURATION;
      const shortA = Math.abs(Math.sin(t * 27 + index * 0.8));
      const shortB = Math.abs(Math.sin(t * 43 + index * 1.4));
      const shortC = Math.abs(Math.sin(t * 71 + index * 0.5));
      const flicker = shortA * 0.68 + shortB * 0.25 + shortC * 0.12;
      const cut = Math.sin(t * 18 + index) > -0.15 ? 1 : 0.18;
      power = Math.min(1, (p * 0.45 + flicker * 0.58) * cut);
    } else {
      power = 0.9 + Math.sin(t * 2.2 + index) * 0.045;
    }

    if (outerMat.current) {
      outerMat.current.emissiveIntensity = 0.35 + power * 2.4;
      outerMat.current.opacity = 0.48 + power * 0.4;
    }

    if (innerMat.current) {
      innerMat.current.emissiveIntensity = 0.2 + power * 1.5;
      innerMat.current.opacity = 0.32 + power * 0.34;
    }

    if (lightRef.current) {
      lightRef.current.intensity = power * 1.75;
    }
  });

  return (
    <group position={[0, y + 0.06, 0]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.03, 0.025, 16, 120]} />
        <meshStandardMaterial
          ref={outerMat}
          color={color}
          emissive={color}
          emissiveIntensity={0}
          transparent
          opacity={0.3}
          roughness={0.25}
          metalness={0.05}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.005, 0]}>
        <torusGeometry args={[1.94, 0.01, 12, 100]} />
        <meshStandardMaterial
          ref={innerMat}
          color="#9befff"
          emissive="#9befff"
          emissiveIntensity={0}
          transparent
          opacity={0.22}
          roughness={0.2}
          metalness={0.02}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 0.06, 0]}
        color={color}
        intensity={0}
        distance={3.5}
        decay={2}
      />
    </group>
  );
}

function VerticalPost({ angle, height = 4.95, radius = 1.92 }) {
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  return (
    <mesh position={[x, 0.02, z]} castShadow receiveShadow>
      <cylinderGeometry args={[0.045, 0.045, height, 18]} />
      <meshStandardMaterial
        color="#5d3119"
        roughness={0.58}
        metalness={0.03}
      />
    </mesh>
  );
}

function InnerCore() {
  const bandYs = [2.08, 1.19, 0.3, -0.59, -1.48];

  return (
    <group>
      <mesh position={[0, -0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.28, 1.28, 5.2, 96]} />
        <meshStandardMaterial
          color="#5b2c15"
          roughness={0.72}
          metalness={0.015}
        />
      </mesh>

      {bandYs.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.29, 0.014, 12, 96]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#704022" : "#4e2611"}
            roughness={0.6}
            metalness={0.01}
          />
        </mesh>
      ))}
    </group>
  );
}

function CrownTop() {
  return (
    <group position={[0, 2.62, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.22, 2.28, 0.17, 96]} />
        <meshStandardMaterial color="#9b5e34" roughness={0.42} />
      </mesh>

      <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.08, 2.13, 0.13, 96]} />
        <meshStandardMaterial color="#ba7643" roughness={0.36} />
      </mesh>

      <mesh position={[0, 0.17, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.04, 0.055, 16, 120]} />
        <meshStandardMaterial color="#8f542d" roughness={0.36} />
      </mesh>

      <mesh position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.13, 0.048, 16, 120]} />
        <meshStandardMaterial color="#6a3a1c" roughness={0.46} />
      </mesh>
    </group>
  );
}

function BottomApron() {
  return (
    <group position={[0, -2.28, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.88, 1.88, 0.9, 96]} />
        <meshStandardMaterial
          color="#6b381b"
          roughness={0.58}
          metalness={0.02}
        />
      </mesh>

      <mesh position={[0, 0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.88, 0.03, 16, 120]} />
        <meshStandardMaterial color="#8a512d" roughness={0.4} />
      </mesh>

      <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.83, 0.024, 16, 120]} />
        <meshStandardMaterial color="#4f2914" roughness={0.48} />
      </mesh>
    </group>
  );
}

function BasePedestal() {
  return (
    <group position={[0, -2.9, 0]}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[2.16, 2.16, 0.2, 96]} />
        <meshStandardMaterial color="#a16537" roughness={0.38} />
      </mesh>

      <mesh position={[0, -0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[2.22, 2.27, 0.17, 96]} />
        <meshStandardMaterial color="#764121" roughness={0.5} />
      </mesh>

      <mesh position={[0, -0.23, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.055, 16, 120]} />
        <meshStandardMaterial color="#542b14" roughness={0.56} />
      </mesh>

      {[0, 2.15, -2.15].map((a, i) => {
        const x = Math.sin(a) * 1.7;
        const z = Math.cos(a) * 1.7;
        return (
          <mesh key={i} position={[x, -0.02, z]} castShadow>
            <sphereGeometry args={[0.065, 24, 24]} />
            <meshStandardMaterial color="#7b4726" roughness={0.28} />
          </mesh>
        );
      })}
    </group>
  );
}

function ShelfBody({ selectedProject, onProjectSelect }) {
  const shelfRows = [1.92, 1.03, 0.14, -0.75, -1.64];
  const postAngles = Array.from({ length: 10 }).map(
    (_, i) => (i / 10) * Math.PI * 2
  );

  return (
    <>
      <InnerCore />
      <CrownTop />
      <BottomApron />

      {shelfRows.map((y, i) => (
        <React.Fragment key={`shelf-${i}`}>
          <ShelfBooks
            y={y + 0.055}
            rowIndex={i}
            selectedProject={selectedProject}
            onProjectSelect={onProjectSelect}
          />
          <ShelfRing y={y} />
          <NeonShelfLight y={y} index={i} />
        </React.Fragment>
      ))}

      {postAngles.map((angle, i) => (
        <VerticalPost key={i} angle={angle} height={4.95} radius={1.92} />
      ))}

      <BasePedestal />
    </>
  );
}

function Bookshelf3D({
  selectedProject,
  isShelfHovered,
  shelfRotationRef,
  onProjectSelect,
}) {
  const root = useRef();
  const fillSpot = useRef();
  const warmFront = useRef();
  const warmLeft = useRef();
  const rimLight = useRef();
  const ambientRef = useRef();
  const hemiRef = useRef();

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    if (root.current) {
      const riseProgress = Math.min(t / RISE_DURATION, 1);
      const eased = easeOutCubic(riseProgress);

      const settle =
        riseProgress < 1
          ? 0
          : Math.sin((t - RISE_DURATION) * 5.8) *
            0.018 *
            Math.exp(-(t - RISE_DURATION) * 2.2);

      root.current.position.y =
        THREE.MathUtils.lerp(RISE_START_Y, RISE_END_Y, eased) + settle;

      if (t < RISE_DURATION) {
        root.current.rotation.y =
          THREE.MathUtils.lerp(-0.52, -0.08, eased) +
          Math.sin(t * 0.75) * 0.012;
      } else if (t < ROTATION_START_TIME) {
        root.current.rotation.y = -0.08 + shelfRotationRef.current;
      } else {
        const pauseAutoRotation = isShelfHovered || Boolean(selectedProject);

        if (!pauseAutoRotation) {
          shelfRotationRef.current += delta * 0.105;
        }

        root.current.rotation.y =
          -0.08 + shelfRotationRef.current + Math.sin(t * 0.42) * 0.012;
      }
    }

    const lightReveal = smoothstep(
      NEON_START_TIME - 0.08,
      ROTATION_START_TIME,
      t
    );

    const ignitionFlicker =
      t >= NEON_START_TIME && t < ROTATION_START_TIME
        ? (Math.sin(t * 23) +
            Math.sin(t * 41) * 0.45 +
            Math.sin(t * 67) * 0.2) *
          0.08
        : 0;

    if (fillSpot.current) {
      fillSpot.current.intensity = Math.max(
        0.12,
        0.12 + lightReveal * 2.45 + ignitionFlicker
      );
    }

    if (warmFront.current) {
      warmFront.current.intensity = Math.max(
        0.04,
        0.04 + lightReveal * 1.42 + ignitionFlicker * 0.4
      );
    }

    if (warmLeft.current) {
      warmLeft.current.intensity = Math.max(
        0.02,
        0.02 + lightReveal * 0.92 + ignitionFlicker * 0.24
      );
    }

    if (rimLight.current) {
      rimLight.current.intensity = Math.max(
        0.12,
        0.12 + lightReveal * 2.08 + ignitionFlicker * 0.18
      );
    }

    if (ambientRef.current) {
      ambientRef.current.intensity = 0.07 + lightReveal * 0.65;
    }

    if (hemiRef.current) {
      hemiRef.current.intensity = 0.08 + lightReveal * 0.7;
    }
  });

  return (
    <>
      <spotLight
        ref={fillSpot}
        position={[0, 2.8, 5.8]}
        angle={0.62}
        penumbra={1}
        distance={20}
        decay={1.85}
        intensity={0.12}
        color="#ffe1bc"
      />

      <pointLight
        ref={warmFront}
        position={[0, 1.8, 4.4]}
        intensity={0.04}
        distance={10}
        color="#ffd7ad"
      />

      <pointLight
        ref={warmLeft}
        position={[-2.8, 1.9, 3.2]}
        intensity={0.02}
        distance={9}
        color="#ffddb8"
      />

      <pointLight
        ref={rimLight}
        position={[0, 1.25, -3.6]}
        intensity={0.12}
        distance={9}
        color="#0ea5ff"
      />

      <ambientLight ref={ambientRef} intensity={0.07} />

      <hemisphereLight
        ref={hemiRef}
        intensity={0.08}
        color="#b9e7ff"
        groundColor="#2a1a11"
      />

      <group
        ref={root}
        position={[0, RISE_START_Y, 0]}
        scale={[0.74, 0.74, 0.74]}
      >
        <ShelfBody
          selectedProject={selectedProject}
          onProjectSelect={onProjectSelect}
        />
      </group>

      <ContactShadows
        position={[0, -3, 0]}
        opacity={0.22}
        scale={7.2}
        blur={3.4}
        far={4.2}
        resolution={1024}
        color="#000000"
      />
    </>
  );
}

function OpenedProjectBookModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="uzp-book-overlay" onClick={onClose}>
      <div
        className="uzp-book-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          "--accent": project.accent,
          "--bookColor": project.color,
        }}
      >
        <button className="uzp-book-close" onClick={onClose}>
          ×
        </button>

        <div className="uzp-book-left">
          <div className="uzp-book-left-glow" />
          <span className="uzp-book-status">{project.status}</span>
          <h2>{project.title}</h2>
          <p>{project.label}</p>
        </div>

        <div className="uzp-book-right">
          <div className="uzp-book-divider-line" />
          <h3>Loyiha haqida</h3>
          <p>{project.description}</p>

          <a href={project.link} className="uzp-book-link">
            Loyihaga o‘tish
          </a>
        </div>
      </div>
    </div>
  );
}

export default function UzProjects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isShelfHovered, setIsShelfHovered] = useState(false);

  const shelfRotationRef = useRef(0);

  return (
    <div className="uzp-3d-projects">
      <style>{`
        .uzp-3d-projects{
          position:absolute;
          inset:0;
          width:100%;
          height:100vh;
          overflow:hidden;
          pointer-events:none;
          background:transparent;
        }

        .uzp-3d-center-wrap{
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          pointer-events:none;
        }

        .uzp-3d-canvas{
          width:min(720px, 62vw);
          height:min(760px, 86vh);
          pointer-events:auto;
          background:transparent;
          transform: translateY(5px);
          overflow: visible;
          touch-action:none;
        }

        .uzp-book-overlay{
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          background:rgba(1, 7, 14, 0.18);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          pointer-events:auto;
          z-index:120;
          animation: uzpOverlayIn .32s ease-out both;
        }

        .uzp-book-modal{
          position:relative;
          width:min(860px, 78vw);
          min-height:420px;
          display:grid;
          grid-template-columns: 0.95fr 1.12fr;
          border-radius:26px;
          overflow:hidden;
          border:1px solid color-mix(in srgb, var(--accent), transparent 35%);
          background:
            linear-gradient(90deg, rgba(60,29,15,.96), rgba(15,21,31,.95) 48%, rgba(10,16,24,.96)),
            radial-gradient(circle at 20% 0%, color-mix(in srgb, var(--accent), transparent 76%), transparent 52%);
          box-shadow:
            0 28px 90px rgba(0,0,0,.58),
            0 0 42px color-mix(in srgb, var(--accent), transparent 70%),
            inset 0 0 30px rgba(255,255,255,.04);
          transform: perspective(1200px) rotateX(2deg) scale(1);
          animation: uzpBookIn .38s cubic-bezier(.16,1,.3,1) both;
        }

        .uzp-book-modal::before{
          content:"";
          position:absolute;
          left:46.5%;
          top:0;
          bottom:0;
          width:2px;
          background:linear-gradient(to bottom, transparent, rgba(255,255,255,.3), transparent);
          box-shadow:0 0 22px rgba(0,0,0,.9);
          z-index:4;
        }

        .uzp-book-left,
        .uzp-book-right{
          position:relative;
          z-index:5;
          padding:34px 32px;
        }

        .uzp-book-left{
          background:
            linear-gradient(135deg, color-mix(in srgb, var(--bookColor), black 28%), rgba(26,12,8,.85));
          border-right:1px solid rgba(255,255,255,.08);
          display:flex;
          flex-direction:column;
          justify-content:flex-end;
        }

        .uzp-book-left-glow{
          position:absolute;
          inset:22px;
          border-radius:20px;
          border:1px solid color-mix(in srgb, var(--accent), transparent 54%);
          box-shadow:
            inset 0 0 26px rgba(255,255,255,.05),
            0 0 28px color-mix(in srgb, var(--accent), transparent 80%);
        }

        .uzp-book-status{
          display:inline-flex;
          align-self:flex-start;
          position:relative;
          z-index:2;
          padding:7px 10px;
          border-radius:999px;
          border:1px solid color-mix(in srgb, var(--accent), transparent 45%);
          color:var(--accent);
          font-size:10px;
          letter-spacing:.18em;
          text-transform:uppercase;
          font-weight:900;
          margin-bottom:18px;
        }

        .uzp-book-left h2{
          position:relative;
          z-index:2;
          margin:0;
          font-size:48px;
          line-height:.92;
          letter-spacing:-.05em;
          color:#fff2d1;
          text-shadow:0 0 24px color-mix(in srgb, var(--accent), transparent 58%);
        }

        .uzp-book-left p{
          position:relative;
          z-index:2;
          margin:16px 0 0;
          font-size:14px;
          color:rgba(244,246,255,.74);
          line-height:1.5;
        }

        .uzp-book-right{
          background:
            linear-gradient(135deg, rgba(234,223,193,.1), rgba(8,14,22,.82));
        }

        .uzp-book-divider-line{
          width:64px;
          height:3px;
          border-radius:999px;
          background:var(--accent);
          box-shadow:0 0 14px var(--accent);
          margin-bottom:20px;
        }

        .uzp-book-right h3{
          margin:0 0 14px;
          font-size:22px;
          color:#fff3d6;
          letter-spacing:-.02em;
        }

        .uzp-book-right p{
          margin:0;
          font-size:14px;
          line-height:1.8;
          color:rgba(236,244,255,.78);
        }

        .uzp-book-link{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          margin-top:28px;
          padding:13px 18px;
          border-radius:999px;
          background:linear-gradient(135deg, var(--accent), rgba(255,255,255,.82));
          color:#081018;
          text-decoration:none;
          font-size:11px;
          font-weight:900;
          letter-spacing:.13em;
          text-transform:uppercase;
          box-shadow:0 0 20px color-mix(in srgb, var(--accent), transparent 55%);
        }

        .uzp-book-close{
          position:absolute;
          top:14px;
          right:14px;
          z-index:10;
          width:34px;
          height:34px;
          border-radius:999px;
          border:1px solid rgba(255,255,255,.18);
          background:rgba(0,0,0,.34);
          color:#fff;
          font-size:20px;
          cursor:pointer;
          backdrop-filter:blur(8px);
        }

        .uzp-book-close:hover{
          border-color:var(--accent);
          box-shadow:0 0 16px color-mix(in srgb, var(--accent), transparent 60%);
        }

        @keyframes uzpOverlayIn{
          from{
            opacity:0;
          }
          to{
            opacity:1;
          }
        }

        @keyframes uzpBookIn{
          0%{
            opacity:0;
            transform:perspective(1200px) rotateX(8deg) scale(.9) translateY(24px);
            filter:blur(10px);
          }
          100%{
            opacity:1;
            transform:perspective(1200px) rotateX(2deg) scale(1) translateY(0);
            filter:blur(0);
          }
        }

        @media (max-width: 980px){
          .uzp-3d-canvas{
            width:min(92vw, 540px);
            height:min(68vh, 540px);
            transform: translateY(12px);
          }

          .uzp-book-modal{
            width:min(92vw, 720px);
            min-height:unset;
            grid-template-columns:1fr;
          }

          .uzp-book-modal::before{
            display:none;
          }

          .uzp-book-left,
          .uzp-book-right{
            padding:24px 22px;
          }

          .uzp-book-left h2{
            font-size:34px;
          }

          .uzp-book-right p{
            font-size:13px;
          }
        }
      `}</style>

      <div className="uzp-3d-center-wrap">
        <div
          className="uzp-3d-canvas"
          onPointerMove={(e) => {
            const inside = isPointerInsideShelfArea(
              e.currentTarget,
              e.clientX,
              e.clientY
            );

            setIsShelfHovered((prev) => (prev === inside ? prev : inside));

            if (!inside && typeof document !== "undefined") {
              document.body.style.cursor = "default";
            }
          }}
          onPointerLeave={() => {
            setIsShelfHovered(false);
            if (typeof document !== "undefined") {
              document.body.style.cursor = "default";
            }
          }}
          onWheel={(e) => {
            const inside = isPointerInsideShelfArea(
              e.currentTarget,
              e.clientX,
              e.clientY
            );

            if (!inside || selectedProject) return;

            e.preventDefault();
            shelfRotationRef.current += e.deltaY * 0.0022;
          }}
        >
          <Canvas
            shadows
            dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }}
            camera={{ position: [0, 0.5, 11.6], fov: 30 }}
            onPointerMissed={() => {
              if (typeof document !== "undefined") {
                document.body.style.cursor = "default";
              }
            }}
            onCreated={({ gl }) => {
              gl.toneMappingExposure = 1.18;
            }}
          >
            <Bookshelf3D
              selectedProject={selectedProject}
              isShelfHovered={isShelfHovered}
              shelfRotationRef={shelfRotationRef}
              onProjectSelect={setSelectedProject}
            />
          </Canvas>
        </div>
      </div>

      <OpenedProjectBookModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          if (typeof document !== "undefined") {
            document.body.style.cursor = "default";
          }
        }}
      />
    </div>
  );
}