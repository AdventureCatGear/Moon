"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { territories, Territory } from "@/data/territories";
import { landmarks, futureClaims, Landmark, FutureClaim } from "@/data/landmarks";

// ── Shared helpers ──────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

// ── Territory Marker ────────────────────────────────────────────────────────

interface TerritoryMarkerProps {
  territory: Territory;
  onHover: (t: Territory | null) => void;
  onClick: (t: Territory) => void;
  isHovered: boolean;
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
        <Html distanceFactor={15} className="pointer-events-none" style={{ transform: 'translate(-50%, -110%)' }}>
          <div className="rounded-lg p-2.5 min-w-[160px] text-white shadow-2xl border border-white/10" style={{ background: 'rgba(11, 16, 38, 0.8)', backdropFilter: 'blur(12px)' }}>
            <h3 className="font-bold text-[11px] leading-tight" style={{ color: territory.color }}>
              {territory.name}
            </h3>
            <p className="text-gray-400 text-[9px] mt-0.5 italic">{territory.tagline}</p>
            <div className="mt-1.5 grid grid-cols-2 gap-x-3 gap-y-0.5 text-[9px] text-gray-400">
              <span>Plots:</span>
              <span className="text-white">{territory.totalPlots}</span>
              <span>Available:</span>
              <span className="text-cosmic-teal">{territory.totalPlots - territory.claimedPlots}</span>
              <span>Claimed:</span>
              <span className="text-white">{territory.claimedPlots}</span>
              <span>Price:</span>
              <span className="text-amber">{territory.priceRange}</span>
            </div>
            <p className="text-[8px] text-gray-500 mt-1.5">Click to explore plots</p>
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Landmark Pin ────────────────────────────────────────────────────────────

function LandmarkPin({ landmark, isHovered, onHover }: {
  landmark: Landmark;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const pos = useMemo(() => latLonToVec3(landmark.lat, landmark.lon, 2.03), [landmark]);
  const pinRef = useRef<THREE.Group>(null);

  const pinColor = landmark.type === "historic" ? "#FBBF24"
    : landmark.type === "scientific" ? "#60A5FA"
    : "#94A3B8";

  useFrame((state) => {
    if (pinRef.current) {
      const bounce = Math.sin(state.clock.elapsedTime * 3 + landmark.lat) * 0.005;
      pinRef.current.position.copy(pos).normalize().multiplyScalar(2.03 + bounce);
    }
  });

  return (
    <group
      ref={pinRef}
      position={pos}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(landmark.id); }}
      onPointerLeave={() => onHover(null)}
    >
      {/* Pin stem */}
      <mesh>
        <cylinderGeometry args={[0.004, 0.004, 0.08, 6]} />
        <meshBasicMaterial color={pinColor} />
      </mesh>
      {/* Pin head */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.02, 12, 12]} />
        <meshBasicMaterial color={pinColor} transparent opacity={isHovered ? 1 : 0.85} />
      </mesh>
      {/* Small glow */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={pinColor} transparent opacity={isHovered ? 0.3 : 0.1} />
      </mesh>
      {isHovered && (
        <Html distanceFactor={15} className="pointer-events-none" style={{ transform: 'translate(-50%, -140%)' }}>
          <div className="rounded-lg p-2 min-w-[140px] text-white shadow-2xl border border-white/10" style={{ background: 'rgba(11, 16, 38, 0.8)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px]">{landmark.icon}</span>
              <h3 className="font-bold text-[10px] leading-tight" style={{ color: pinColor }}>
                {landmark.name}
              </h3>
            </div>
            <p className="text-gray-400 text-[8px] mt-0.5">{landmark.description}</p>
            {landmark.year && (
              <p className="text-[8px] mt-0.5" style={{ color: pinColor }}>{landmark.year}</p>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Future Claim Pin ────────────────────────────────────────────────────────

function FutureClaimPin({ claim, isHovered, onHover }: {
  claim: FutureClaim;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const pos = useMemo(() => latLonToVec3(claim.lat, claim.lon, 2.03), [claim]);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  const statusLabel = claim.status === "planned" ? "Planned"
    : claim.status === "announced" ? "Announced"
    : "Proposed";

  return (
    <group
      position={pos}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(claim.id); }}
      onPointerLeave={() => onHover(null)}
    >
      {/* Diamond-shaped marker */}
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.03, 0.03, 0.005]} />
        <meshBasicMaterial color={claim.color} transparent opacity={isHovered ? 1 : 0.7} />
      </mesh>
      {/* Rotating dashed ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.04, 0.055, 16]} />
        <meshBasicMaterial color={claim.color} transparent opacity={isHovered ? 0.5 : 0.2} side={THREE.DoubleSide} />
      </mesh>
      {isHovered && (
        <Html distanceFactor={15} className="pointer-events-none" style={{ transform: 'translate(-50%, -140%)' }}>
          <div className="rounded-lg p-2 min-w-[150px] text-white shadow-2xl border border-white/10" style={{ background: 'rgba(11, 16, 38, 0.8)', backdropFilter: 'blur(12px)' }}>
            <h3 className="font-bold text-[10px] leading-tight" style={{ color: claim.color }}>
              {claim.name}
            </h3>
            <p className="text-[8px] mt-0.5" style={{ color: claim.color }}>{claim.entity}</p>
            <p className="text-gray-400 text-[8px] mt-0.5">{claim.description}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-[8px] px-1.5 py-0.5 rounded-full border" style={{ borderColor: claim.color, color: claim.color }}>
                {statusLabel}
              </span>
              {claim.year && <span className="text-gray-500 text-[8px]">~{claim.year}</span>}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}

// ── Moon Mesh (texture only, no rotation — parent group rotates) ─────────

function MoonMesh() {
  const moonTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 2048;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d")!;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#b8b4a8");
    gradient.addColorStop(0.3, "#9a9588");
    gradient.addColorStop(0.5, "#c4bfab");
    gradient.addColorStop(0.7, "#8a8474");
    gradient.addColorStop(1, "#a8a392");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Mare regions
    const mares = [
      { x: 1150, y: 460, rx: 200, ry: 160 },
      { x: 850, y: 320, rx: 250, ry: 200 },
      { x: 650, y: 380, rx: 120, ry: 100 },
      { x: 1000, y: 400, rx: 100, ry: 80 },
      { x: 750, y: 500, rx: 80, ry: 60 },
      { x: 900, y: 250, rx: 60, ry: 50 },
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
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(40, 38, 35, ${rand() * 0.3 + 0.1})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - r * 0.2, cy - r * 0.2, r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180, 175, 160, ${rand() * 0.2 + 0.05})`;
      ctx.fill();
    }

    // Noise
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

  return (
    <mesh>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={moonTexture} roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

// ── Rotating group: moon + all surface markers ──────────────────────────────

function MoonWithMarkers({
  hoveredTerritory,
  setHoveredTerritory,
  onTerritoryClick,
  hoveredPin,
  setHoveredPin,
}: {
  hoveredTerritory: Territory | null;
  setHoveredTerritory: (t: Territory | null) => void;
  onTerritoryClick: (t: Territory) => void;
  hoveredPin: string | null;
  setHoveredPin: (id: string | null) => void;
}) {
  const groupRef = useRef<THREE.Group>(null);

  // Slow auto-rotation applied to the entire group
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <group ref={groupRef}>
      <MoonMesh />

      {/* Territory markers */}
      {territories.map((t) => (
        <TerritoryMarker
          key={t.id}
          territory={t}
          onHover={setHoveredTerritory}
          onClick={onTerritoryClick}
          isHovered={hoveredTerritory?.id === t.id}
        />
      ))}

      {/* Landmark pins */}
      {landmarks.map((lm) => (
        <LandmarkPin
          key={lm.id}
          landmark={lm}
          isHovered={hoveredPin === lm.id}
          onHover={setHoveredPin}
        />
      ))}

      {/* Future claim pins */}
      {futureClaims.map((fc) => (
        <FutureClaimPin
          key={fc.id}
          claim={fc}
          isHovered={hoveredPin === fc.id}
          onHover={setHoveredPin}
        />
      ))}
    </group>
  );
}

// ── Scene ────────────────────────────────────────────────────────────────────

function Scene({
  hoveredTerritory,
  setHoveredTerritory,
  onTerritoryClick,
  hoveredPin,
  setHoveredPin,
}: {
  hoveredTerritory: Territory | null;
  setHoveredTerritory: (t: Territory | null) => void;
  onTerritoryClick: (t: Territory) => void;
  hoveredPin: string | null;
  setHoveredPin: (id: string | null) => void;
}) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#aab" />
      <MoonWithMarkers
        hoveredTerritory={hoveredTerritory}
        setHoveredTerritory={setHoveredTerritory}
        onTerritoryClick={onTerritoryClick}
        hoveredPin={hoveredPin}
        setHoveredPin={setHoveredPin}
      />
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

// ── Main export ──────────────────────────────────────────────────────────────

interface MoonGlobeProps {
  onTerritoryClick: (territory: Territory) => void;
}

export default function MoonGlobe({ onTerritoryClick }: MoonGlobeProps) {
  const [hoveredTerritory, setHoveredTerritory] = useState<Territory | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

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
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-teal/5 via-transparent to-transparent pointer-events-none z-10" />

          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <Scene
              hoveredTerritory={hoveredTerritory}
              setHoveredTerritory={setHoveredTerritory}
              onTerritoryClick={onTerritoryClick}
              hoveredPin={hoveredPin}
              setHoveredPin={setHoveredPin}
            />
          </Canvas>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {territories.map((t) => (
            <button
              key={t.id}
              onClick={() => onTerritoryClick(t)}
              className="glass rounded-lg px-4 py-2 flex items-center gap-2 hover:border-white/30 transition-all cursor-pointer"
            >
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }} />
              <span className="text-sm text-gray-300">{t.name}</span>
            </button>
          ))}
          {/* Pin legend */}
          <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400" />
            <span className="text-xs text-gray-400">Historic</span>
          </div>
          <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-gray-400">Scientific</span>
          </div>
          <div className="glass rounded-lg px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 rotate-45 bg-purple-400" style={{ width: 8, height: 8 }} />
            <span className="text-xs text-gray-400">Future Claims</span>
          </div>
        </div>
      </div>
    </section>
  );
}
