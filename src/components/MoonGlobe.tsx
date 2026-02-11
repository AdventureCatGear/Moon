"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { territories, Territory } from "@/data/territories";
import { landmarks, futureClaims, Landmark, FutureClaim } from "@/data/landmarks";

// ── Helpers ─────────────────────────────────────────────────────────────────

function latLonToVec3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

/** Quaternion that rotates local +Y to point radially outward from sphere center */
function surfaceQuaternion(pos: THREE.Vector3): THREE.Quaternion {
  const up = new THREE.Vector3(0, 1, 0);
  const normal = pos.clone().normalize();
  return new THREE.Quaternion().setFromUnitVectors(up, normal);
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
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const color = new THREE.Color(territory.color);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = isHovered ? 1.3 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const size = territory.radiusDeg * 0.02;

  return (
    <group position={pos} quaternion={quat}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(territory); }}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(territory); }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={isHovered ? 0.9 : 0.6} />
      </mesh>
      {/* Glow ring — flat on surface */}
      <mesh>
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

const LANDMARK_COLORS: Record<string, string> = {
  historic: "#FBBF24",
  scientific: "#60A5FA",
  geographic: "#94A3B8",
  rover: "#4ADE80",
};

function LandmarkPin({ landmark, isHovered, onHover }: {
  landmark: Landmark;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}) {
  const pos = useMemo(() => latLonToVec3(landmark.lat, landmark.lon, 2.01), [landmark]);
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const pinColor = LANDMARK_COLORS[landmark.type] || "#94A3B8";

  return (
    <group
      position={pos}
      quaternion={quat}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(landmark.id); }}
      onPointerLeave={() => onHover(null)}
    >
      {/* Pin stem — points radially outward thanks to quaternion */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 8]} />
        <meshBasicMaterial color={pinColor} />
      </mesh>
      {/* Pin head */}
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.035, 16, 16]} />
        <meshBasicMaterial color={pinColor} transparent opacity={isHovered ? 1 : 0.9} />
      </mesh>
      {/* Glow */}
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.055, 12, 12]} />
        <meshBasicMaterial color={pinColor} transparent opacity={isHovered ? 0.35 : 0.1} />
      </mesh>
      {/* Surface dot */}
      <mesh position={[0, 0.005, 0]}>
        <circleGeometry args={[0.02, 16]} />
        <meshBasicMaterial color={pinColor} transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      {isHovered && (
        <Html distanceFactor={15} className="pointer-events-none" style={{ transform: 'translate(-50%, -180%)' }}>
          <div className="rounded-lg p-2 min-w-[150px] max-w-[200px] text-white shadow-2xl border border-white/10" style={{ background: 'rgba(11, 16, 38, 0.8)', backdropFilter: 'blur(12px)' }}>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px]">{landmark.icon}</span>
              <h3 className="font-bold text-[10px] leading-tight" style={{ color: pinColor }}>
                {landmark.name}
              </h3>
            </div>
            <p className="text-gray-400 text-[8px] mt-0.5 leading-snug">{landmark.description}</p>
            {landmark.year && (
              <p className="text-[8px] font-semibold mt-0.5" style={{ color: pinColor }}>{landmark.year}</p>
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
  const pos = useMemo(() => latLonToVec3(claim.lat, claim.lon, 2.01), [claim]);
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  const statusLabel = claim.status === "planned" ? "Planned"
    : claim.status === "announced" ? "Announced"
    : "Proposed";

  return (
    <group
      position={pos}
      quaternion={quat}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(claim.id); }}
      onPointerLeave={() => onHover(null)}
    >
      {/* Diamond marker */}
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.05, 0.05, 0.01]} />
        <meshBasicMaterial color={claim.color} transparent opacity={isHovered ? 1 : 0.8} />
      </mesh>
      {/* Rotating ring */}
      <mesh ref={ringRef} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.06, 0.08, 6]} />
        <meshBasicMaterial color={claim.color} transparent opacity={isHovered ? 0.5 : 0.25} side={THREE.DoubleSide} />
      </mesh>
      {/* Surface zone ring */}
      <mesh position={[0, 0.005, 0]}>
        <ringGeometry args={[0.03, 0.05, 24]} />
        <meshBasicMaterial color={claim.color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
      {isHovered && (
        <Html distanceFactor={15} className="pointer-events-none" style={{ transform: 'translate(-50%, -180%)' }}>
          <div className="rounded-lg p-2 min-w-[150px] max-w-[200px] text-white shadow-2xl border border-white/10" style={{ background: 'rgba(11, 16, 38, 0.8)', backdropFilter: 'blur(12px)' }}>
            <h3 className="font-bold text-[10px] leading-tight" style={{ color: claim.color }}>
              {claim.name}
            </h3>
            <p className="text-[8px] mt-0.5 font-medium" style={{ color: claim.color }}>{claim.entity}</p>
            <p className="text-gray-400 text-[8px] mt-0.5 leading-snug">{claim.description}</p>
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

// ── Moon Mesh with detailed procedural texture ──────────────────────────────

function MoonMesh() {
  const moonTexture = useMemo(() => {
    const W = 4096, H = 2048;
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // Seeded RNG
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
    };
    const rand = rng(42);

    // Helper: lat/lon to canvas pixel
    const ll2px = (lat: number, lon: number): [number, number] => {
      const x = ((lon + 180) / 360) * W;
      const y = ((90 - lat) / 180) * H;
      return [x, y];
    };

    // Base highland color
    const baseGrad = ctx.createLinearGradient(0, 0, 0, H);
    baseGrad.addColorStop(0, "#a8a090");
    baseGrad.addColorStop(0.3, "#b0a898");
    baseGrad.addColorStop(0.5, "#bab2a0");
    baseGrad.addColorStop(0.7, "#a09888");
    baseGrad.addColorStop(1, "#989080");
    ctx.fillStyle = baseGrad;
    ctx.fillRect(0, 0, W, H);

    // Subtle latitude banding
    for (let y = 0; y < H; y += 4) {
      const alpha = 0.02 + rand() * 0.03;
      const bright = 100 + rand() * 60;
      ctx.fillStyle = `rgba(${bright},${bright - 5},${bright - 15},${alpha})`;
      ctx.fillRect(0, y, W, 4);
    }

    // ── Accurate maria ──────────────────────────────────────────────────────
    // Painted at correct lat/lon positions with realistic shapes
    const maria: { lat: number; lon: number; rx: number; ry: number; angle?: number; name: string }[] = [
      // Near side major maria
      { lat: 8.5, lon: 31.4, rx: 180, ry: 140, name: "Tranquillitatis" },
      { lat: 36, lon: -16, rx: 280, ry: 240, name: "Imbrium" },
      { lat: 28, lon: 17.5, rx: 140, ry: 120, name: "Serenitatis" },
      { lat: 18.4, lon: -57.4, rx: 320, ry: 280, name: "Procellarum" },
      { lat: 17, lon: 59.1, rx: 100, ry: 80, name: "Crisium" },
      { lat: -15, lon: -22, rx: 100, ry: 80, name: "Nubium" },
      { lat: 7, lon: 1, rx: 90, ry: 70, angle: 0.3, name: "Vaporum" },
      { lat: 15, lon: -3.5, rx: 60, ry: 50, name: "Aestuum" },
      { lat: 45, lon: -32, rx: 100, ry: 50, angle: -0.2, name: "Sinus Iridum" },
      { lat: -20, lon: 28, rx: 80, ry: 60, name: "Nectaris" },
      { lat: -14, lon: 52, rx: 120, ry: 100, name: "Fecunditatis" },
      { lat: 13, lon: 38, rx: 60, ry: 50, name: "Somniorum fringe" },
      { lat: 56, lon: 2, rx: 180, ry: 40, name: "Frigoris" },
      { lat: -19.3, lon: -3.2, rx: 70, ry: 50, name: "Medii" },
      { lat: 2, lon: -47, rx: 100, ry: 70, name: "Humorum" },
    ];

    for (const mare of maria) {
      const [mx, my] = ll2px(mare.lat, mare.lon);
      ctx.save();
      ctx.translate(mx, my);
      if (mare.angle) ctx.rotate(mare.angle);

      // Multiple layers for depth
      for (let layer = 0; layer < 3; layer++) {
        const scale = 1 - layer * 0.15;
        const darkness = 0.25 + layer * 0.1;
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, mare.rx * scale);
        g.addColorStop(0, `rgba(55, 50, 42, ${darkness})`);
        g.addColorStop(0.5, `rgba(60, 55, 45, ${darkness * 0.7})`);
        g.addColorStop(0.8, `rgba(65, 58, 48, ${darkness * 0.3})`);
        g.addColorStop(1, `rgba(70, 63, 52, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(0, 0, mare.rx * scale, mare.ry * scale, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    // ── Named craters at real positions ──────────────────────────────────────
    const namedCraters: { lat: number; lon: number; r: number; name: string; bright?: boolean }[] = [
      { lat: -43.31, lon: -11.36, r: 22, name: "Tycho", bright: true },
      { lat: 9.62, lon: -20.08, r: 24, name: "Copernicus", bright: true },
      { lat: 23.73, lon: -47.49, r: 16, name: "Aristarchus", bright: true },
      { lat: 51.6, lon: -9.3, r: 26, name: "Plato" },
      { lat: -58.4, lon: -14.4, r: 50, name: "Clavius" },
      { lat: 29.7, lon: -4.0, r: 20, name: "Archimedes" },
      { lat: 21.4, lon: -5.0, r: 10, name: "Autolycus" },
      { lat: -10.5, lon: -20.1, r: 16, name: "Bullialdus" },
      { lat: 32.8, lon: 35.5, r: 16, name: "Posidonius" },
      { lat: -34.7, lon: -17.0, r: 14, name: "Pitatus" },
      { lat: 45.4, lon: 2.4, r: 12, name: "Aristillus" },
      { lat: -8.0, lon: -10.0, r: 15, name: "Ptolemaeus" },
      { lat: -13.7, lon: -4.0, r: 12, name: "Alphonsus" },
      { lat: -22.0, lon: 46.0, r: 14, name: "Petavius" },
      { lat: -5.0, lon: -2.0, r: 11, name: "Hipparchus" },
    ];

    for (const crater of namedCraters) {
      const [cx, cy] = ll2px(crater.lat, crater.lon);

      // Dark floor
      ctx.beginPath();
      ctx.arc(cx, cy, crater.r, 0, Math.PI * 2);
      ctx.fillStyle = crater.bright
        ? `rgba(180, 175, 160, 0.3)`
        : `rgba(35, 32, 28, 0.35)`;
      ctx.fill();

      // Rim highlight
      ctx.beginPath();
      ctx.arc(cx - crater.r * 0.1, cy - crater.r * 0.1, crater.r * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = crater.bright
        ? `rgba(220, 215, 200, 0.4)`
        : `rgba(145, 138, 125, 0.3)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Shadow inside
      ctx.beginPath();
      ctx.arc(cx + crater.r * 0.15, cy + crater.r * 0.15, crater.r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30, 28, 25, 0.15)`;
      ctx.fill();

      // Bright rays for Tycho / Copernicus / Aristarchus
      if (crater.bright) {
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2 + rand() * 0.3;
          const len = crater.r * (3 + rand() * 5);
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          ctx.strokeStyle = `rgba(200, 195, 180, ${0.06 + rand() * 0.04})`;
          ctx.lineWidth = 2 + rand() * 3;
          ctx.stroke();
        }
      }
    }

    // ── Random small craters (multi-scale) ──────────────────────────────────
    // Large craters
    for (let i = 0; i < 200; i++) {
      const cx = rand() * W;
      const cy = rand() * H;
      const r = 8 + rand() * 18;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(40, 38, 35, ${rand() * 0.2 + 0.05})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - r * 0.2, cy - r * 0.2, r * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(170, 165, 150, ${rand() * 0.15 + 0.03})`;
      ctx.fill();
    }
    // Medium craters
    for (let i = 0; i < 600; i++) {
      const cx = rand() * W;
      const cy = rand() * H;
      const r = 2 + rand() * 7;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(45, 42, 38, ${rand() * 0.2 + 0.05})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - r * 0.2, cy - r * 0.2, r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(160, 155, 140, ${rand() * 0.1 + 0.02})`;
      ctx.fill();
    }
    // Tiny craterlets
    for (let i = 0; i < 2000; i++) {
      const cx = rand() * W;
      const cy = rand() * H;
      const r = 0.5 + rand() * 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(50, 47, 42, ${rand() * 0.3 + 0.05})`;
      ctx.fill();
    }

    // ── Per-pixel noise ─────────────────────────────────────────────────────
    const imageData = ctx.getImageData(0, 0, W, H);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const noise = (rand() - 0.5) * 16;
      imageData.data[i] = Math.max(0, Math.min(255, imageData.data[i] + noise));
      imageData.data[i + 1] = Math.max(0, Math.min(255, imageData.data[i + 1] + noise));
      imageData.data[i + 2] = Math.max(0, Math.min(255, imageData.data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return texture;
  }, []);

  return (
    <mesh>
      <sphereGeometry args={[2, 128, 64]} />
      <meshStandardMaterial map={moonTexture} roughness={0.9} metalness={0.05} />
    </mesh>
  );
}

// ── Scene — uses OrbitControls autoRotate so drag and spin stay unified ─────

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
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <pointLight position={[-5, -3, -5]} intensity={0.3} color="#aab" />

      {/* Single static group — camera orbits around it via OrbitControls */}
      <group>
        <MoonMesh />

        {territories.map((t) => (
          <TerritoryMarker
            key={t.id}
            territory={t}
            onHover={setHoveredTerritory}
            onClick={onTerritoryClick}
            isHovered={hoveredTerritory?.id === t.id}
          />
        ))}

        {landmarks.map((lm) => (
          <LandmarkPin
            key={lm.id}
            landmark={lm}
            isHovered={hoveredPin === lm.id}
            onHover={setHoveredPin}
          />
        ))}

        {futureClaims.map((fc) => (
          <FutureClaimPin
            key={fc.id}
            claim={fc}
            isHovered={hoveredPin === fc.id}
            onHover={setHoveredPin}
          />
        ))}
      </group>

      {/* OrbitControls handles ALL rotation — both auto-spin and user drag */}
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
        enableDamping
        dampingFactor={0.05}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.4}
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
            Click and drag to rotate. Scroll to zoom. Hover over pins to see details.
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
        <div className="mt-8 flex flex-wrap justify-center gap-3">
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
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: LANDMARK_COLORS.historic }} />
            <span className="text-xs text-gray-400">Apollo / Historic</span>
          </div>
          <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: LANDMARK_COLORS.rover }} />
            <span className="text-xs text-gray-400">Rovers</span>
          </div>
          <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: LANDMARK_COLORS.scientific }} />
            <span className="text-xs text-gray-400">Scientific</span>
          </div>
          <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ background: LANDMARK_COLORS.geographic }} />
            <span className="text-xs text-gray-400">Geographic</span>
          </div>
          <div className="glass rounded-lg px-3 py-1.5 flex items-center gap-2">
            <div className="w-2 h-2 rotate-45 bg-purple-400" style={{ width: 8, height: 8 }} />
            <span className="text-xs text-gray-400">Future Claims</span>
          </div>
        </div>
      </div>
    </section>
  );
}
