"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { territories, Territory } from "@/data/territories";

interface TerritoryMarkerProps {
  territory: Territory;
  onHover: (t: Territory | null) => void;
  onClick: (t: Territory) => void;
  isHovered: boolean;
}

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function TerritoryMarker({ territory, onHover, onClick, isHovered }: TerritoryMarkerProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(territory.lat, territory.lon, 2.02), [territory]);
  const color = new THREE.Color(territory.color);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const size = territory.radiusDeg * 0.02;

  return (
    <group position={pos}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(territory); }}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(territory); }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.9 : 0.6} />
      </mesh>
      {/* Glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[size * 1.2, size * 1.8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.5 : 0.2} side={THREE.DoubleSide} />
      </mesh>
      {isHovered && (
        <Html distanceFactor={8} className="pointer-events-none">
          <div className="glass-strong rounded-xl p-4 min-w-[240px] text-white shadow-2xl">
            <h3 className="font-bold text-lg" style={{ color: territory.color }}>
              {territory.name}
            </h3>
            <p className="text-gray-300 text-xs mt-1 italic">{territory.tagline}</p>
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-400">
              <span>Plots:</span>
              <span className="text-white">{territory.totalPlots}</span>
              <span>Available:</span>
              <span className="text-cosmic-teal">{territory.totalPlots - territory.claimedPlots}</span>
              <span>Claimed:</span>
              <span className="text-white">{territory.claimedPlots}</span>
              <span>Price:</span>
              <span className="text-amber">{territory.priceRange}</span>
            </div>
            <p className="text-[10px] text-gray-500 mt-2">Click to explore plots</p>
          </div>
        </Html>
      )}
    </group>
  );
}

function Moon() {
  const meshRef = useRef<THREE.Mesh>(null);

  const moonTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    // Base color - lunar grey
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#b8b4a8");
    gradient.addColorStop(0.3, "#9a9588");
    gradient.addColorStop(0.5, "#c4bfab");
    gradient.addColorStop(0.7, "#8a8474");
    gradient.addColorStop(1, "#a8a392");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mare regions (darker basalt plains)
    const mares = [
      { x: 1150, y: 460, rx: 200, ry: 160 }, // Tranquillitatis
      { x: 850, y: 320, rx: 250, ry: 200 },  // Imbrium
      { x: 650, y: 380, rx: 120, ry: 100 },   // Procellarum
      { x: 1000, y: 400, rx: 100, ry: 80 },   // Serenitatis
      { x: 750, y: 500, rx: 80, ry: 60 },     // Nubium
      { x: 900, y: 250, rx: 60, ry: 50 },     // Frigoris
    ];

    for (const mare of mares) {
      const g = ctx.createRadialGradient(mare.x, mare.y, 0, mare.x, mare.y, mare.rx);
      g.addColorStop(0, "rgba(70, 65, 58, 0.6)");
      g.addColorStop(0.7, "rgba(70, 65, 58, 0.3)");
      g.addColorStop(1, "rgba(70, 65, 58, 0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.ellipse(mare.x, mare.y, mare.rx, mare.ry, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Craters
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
    };
    const rand = rng(42);

    for (let i = 0; i < 500; i++) {
      const cx = rand() * canvas.width;
      const cy = rand() * canvas.height;
      const r = rand() * 20 + 2;

      // Shadow
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(40, 38, 35, ${rand() * 0.3 + 0.1})`;
      ctx.fill();

      // Highlight rim
      ctx.beginPath();
      ctx.arc(cx - r * 0.2, cy - r * 0.2, r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 175, 160, ${rand() * 0.2 + 0.05})`;
      ctx.fill();
    }

    // Add noise/texture
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (rand() - 0.5) * 20;
      imageData.data[i] += noise;
      imageData.data[i + 1] += noise;
      imageData.data[i + 2] += noise;
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={moonTexture} roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

function Scene({
  hoveredTerritory,
  setHoveredTerritory,
  onTerritoryClick,
}: {
  hoveredTerritory: Territory | null;
  setHoveredTerritory: (t: Territory | null) => void;
  onTerritoryClick: (t: Territory) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#aab" />
      <Moon />
      {territories.map((t) => (
        <TerritoryMarker
          key={t.id}
          territory={t}
          onHover={setHoveredTerritory}
          onClick={onTerritoryClick}
          isHovered={hoveredTerritory?.id === t.id}
        />
      ))}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
      />
    </>
  );
}

interface MoonGlobeProps {
  onTerritoryClick: (territory: Territory) => void;
}

export default function MoonGlobe({ onTerritoryClick }: MoonGlobeProps) {
  const [hoveredTerritory, setHoveredTerritory] = useState<Territory | null>(null);

  return (
    <section id="globe" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-heading">
            Explore the <span className="text-gradient-teal">Moon</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Click and drag to rotate. Scroll to zoom. Hover over territories to see details.
            Click a territory to explore available plots.
          </p>
        </div>

        <div className="relative w-full aspect-square max-w-2xl mx-auto rounded-2xl overflow-hidden">
          {/* Ambient glow */}
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-teal/5 via-transparent to-transparent pointer-events-none z-10" />

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene
              hoveredTerritory={hoveredTerritory}
              setHoveredTerritory={setHoveredTerritory}
              onTerritoryClick={onTerritoryClick}
            />
          </Canvas>
        </div>

        {/* Territory legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {territories.map((t) => (
            <button
              key={t.id}
              onClick={() => onTerritoryClick(t)}
              className="glass rounded-lg px-4 py-2 flex items-center gap-2 hover:border-white/30 transition-all cursor-pointer"
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: t.color }}
              />
              <span className="text-sm text-gray-300">{t.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
