"use client";

import { useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { territories, Territory } from "@/data/territories";
import { landmarks, futureClaims, Landmark, FutureClaim } from "@/data/landmarks";

// ── Types for the detail panel ──────────────────────────────────────────────

type DetailItem =
  | { kind: "territory"; data: Territory }
  | { kind: "landmark"; data: Landmark }
  | { kind: "claim"; data: FutureClaim }
  | null;

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

function surfaceQuaternion(pos: THREE.Vector3): THREE.Quaternion {
  const up = new THREE.Vector3(0, 1, 0);
  const normal = pos.clone().normalize();
  return new THREE.Quaternion().setFromUnitVectors(up, normal);
}

// ── Landmark color map ──────────────────────────────────────────────────────

const LANDMARK_COLORS: Record<string, string> = {
  historic: "#FBBF24",
  scientific: "#60A5FA",
  geographic: "#94A3B8",
  rover: "#4ADE80",
  conspiracy: "#EF4444",
};

// ── Territory Marker (no Html tooltip) ──────────────────────────────────────

function TerritoryMarker({
  territory,
  onHover,
  onClick,
  isHovered,
  isHighlighted,
}: {
  territory: Territory;
  onHover: (t: Territory | null) => void;
  onClick: (t: Territory) => void;
  isHovered: boolean;
  isHighlighted: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const pos = useMemo(() => latLonToVec3(territory.lat, territory.lon, 2.09), [territory]);
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const color = new THREE.Color(territory.color);

  useFrame((state) => {
    if (meshRef.current) {
      const pulse = isHovered || isHighlighted;
      const scale = pulse ? 1.4 : 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  const size = territory.radiusDeg * 0.02;
  const active = isHovered || isHighlighted;

  return (
    <group position={pos} quaternion={quat}>
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); onHover(territory); }}
        onPointerLeave={() => onHover(null)}
        onClick={(e) => { e.stopPropagation(); onClick(territory); }}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.95 : 0.6} />
      </mesh>
      <mesh>
        <ringGeometry args={[size * 1.2, size * (active ? 2.2 : 1.8), 32]} />
        <meshBasicMaterial color={color} transparent opacity={active ? 0.6 : 0.2} side={THREE.DoubleSide} />
      </mesh>
      {active && (
        <mesh>
          <ringGeometry args={[size * 2.2, size * 2.8, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      )}
    </group>
  );
}

// ── Landmark Pin (no Html tooltip) ──────────────────────────────────────────

function LandmarkPin({
  landmark,
  isHovered,
  onHover,
  onClick,
  dimmed,
}: {
  landmark: Landmark;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  dimmed: boolean;
}) {
  const pos = useMemo(() => latLonToVec3(landmark.lat, landmark.lon, 2.085), [landmark]);
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const pinColor = LANDMARK_COLORS[landmark.type] || "#94A3B8";
  const opacity = dimmed ? 0.15 : isHovered ? 1 : 0.85;

  return (
    <group
      position={pos}
      quaternion={quat}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(landmark.id); }}
      onPointerLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onClick(landmark.id); }}
    >
      {/* Invisible hit-area sphere — large enough to actually click/tap */}
      <mesh position={[0, 0.08, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {/* Visible stalk */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.12, 6]} />
        <meshBasicMaterial color={pinColor} transparent opacity={opacity} />
      </mesh>
      {/* Visible pin head */}
      <mesh position={[0, 0.14, 0]}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color={pinColor} transparent opacity={opacity} />
      </mesh>
      {isHovered && (
        <mesh position={[0, 0.14, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshBasicMaterial color={pinColor} transparent opacity={0.3} />
        </mesh>
      )}
    </group>
  );
}

// ── Future Claim Pin (no Html tooltip) ──────────────────────────────────────

function FutureClaimPin({
  claim,
  isHovered,
  onHover,
  onClick,
  dimmed,
}: {
  claim: FutureClaim;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  onClick: (id: string) => void;
  dimmed: boolean;
}) {
  const pos = useMemo(() => latLonToVec3(claim.lat, claim.lon, 2.085), [claim]);
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const ringRef = useRef<THREE.Mesh>(null);
  const opacity = dimmed ? 0.15 : isHovered ? 1 : 0.7;

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.8;
    }
  });

  return (
    <group
      position={pos}
      quaternion={quat}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(claim.id); }}
      onPointerLeave={() => onHover(null)}
      onClick={(e) => { e.stopPropagation(); onClick(claim.id); }}
    >
      {/* Invisible hit-area sphere — large enough to actually click/tap */}
      <mesh position={[0, 0.06, 0]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.06, 0.06, 0.01]} />
        <meshBasicMaterial color={claim.color} transparent opacity={opacity} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0.06, 0]}>
        <ringGeometry args={[0.065, 0.085, 6]} />
        <meshBasicMaterial color={claim.color} transparent opacity={isHovered ? 0.5 : 0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Photorealistic Moon Mesh ─────────────────────────────────────────────────
// Procedurally generated texture based on real selenographic data.
// Accurate maria, named craters, ray systems, and highland/lowland albedo.

function MoonMesh() {
  const { colorMap, bumpMap, displacementMap } = useMemo(() => {
    const W = 4096, H = 2048;

    /* ── seeded RNG ─────────────────────────────────────────────── */
    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
    };
    const rand = rng(42);

    /* ── Perlin noise + fBm ─────────────────────────────────────── */
    const PERM = new Uint8Array(512);
    { const tmp = new Uint8Array(256); for (let i = 0; i < 256; i++) tmp[i] = i;
      for (let i = 255; i > 0; i--) { const j = (rand() * (i + 1)) | 0; [tmp[i], tmp[j]] = [tmp[j], tmp[i]]; }
      for (let i = 0; i < 512; i++) PERM[i] = tmp[i & 255]; }

    function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
    function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
    function grad2d(hash: number, x: number, y: number) {
      const h = hash & 3;
      return (h < 2 ? (h === 0 ? x : -x) : 0) + (h < 2 ? 0 : (h === 2 ? y : -y));
    }
    function noise2d(x: number, y: number): number {
      const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
      const xf = x - Math.floor(x), yf = y - Math.floor(y);
      const u = fade(xf), v = fade(yf);
      const aa = PERM[PERM[X] + Y], ab = PERM[PERM[X] + Y + 1];
      const ba = PERM[PERM[X + 1] + Y], bb = PERM[PERM[X + 1] + Y + 1];
      return lerp(lerp(grad2d(aa, xf, yf), grad2d(ba, xf - 1, yf), u),
                  lerp(grad2d(ab, xf, yf - 1), grad2d(bb, xf - 1, yf - 1), u), v);
    }
    function fbm(x: number, y: number, octaves: number, lacunarity = 2.0, gain = 0.5): number {
      let val = 0, amp = 1, freq = 1, max = 0;
      for (let i = 0; i < octaves; i++) {
        val += noise2d(x * freq, y * freq) * amp;
        max += amp; amp *= gain; freq *= lacunarity;
      }
      return val / max;
    }

    const ll2px = (lat: number, lon: number): [number, number] => [
      ((lon + 180) / 360) * W,
      ((90 - lat) / 180) * H,
    ];

    const colorCanvas = document.createElement("canvas");
    colorCanvas.width = W; colorCanvas.height = H;
    const ctx = colorCanvas.getContext("2d")!;

    /* ── 1. Highland base: realistic grey with subtle latitude variation ─── */
    // Real lunar highlands are ~albedo 0.12-0.18 → RGB 155-195 grey
    const baseData = ctx.createImageData(W, H);
    for (let y = 0; y < H; y++) {
      const latFactor = Math.abs(y / H - 0.5) * 2; // 0 at equator, 1 at poles
      // Slightly brighter at poles (like real moon)
      const base = 178 + latFactor * 14;
      for (let x = 0; x < W; x++) {
        const nx = x / W * 10, ny = y / H * 5;
        // Large-scale terrain variation
        const n1 = fbm(nx, ny, 7, 2.0, 0.52) * 18;
        // Medium-scale regolith texture
        const n2 = fbm(nx * 4.3 + 200, ny * 4.3 + 200, 5, 2.1, 0.48) * 8;
        // Fine grain
        const n3 = fbm(nx * 12 + 500, ny * 12 + 500, 3, 2.0, 0.5) * 4;

        const lum = Math.max(120, Math.min(210, base + n1 + n2 + n3));
        // Very subtle warm tint for highlands (barely perceptible)
        const idx = (y * W + x) * 4;
        baseData.data[idx] = Math.min(255, lum + 2);     // R: tiny warm
        baseData.data[idx + 1] = Math.min(255, lum);     // G: neutral
        baseData.data[idx + 2] = Math.max(0, lum - 3);   // B: slightly less
        baseData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(baseData, 0, 0);

    /* ── 2. Maria (lunar seas) — accurate selenographic coordinates ─────── */
    // Real maria are darker basalt plains (albedo ~0.07-0.10)
    // Each entry: multiple overlapping ellipses for organic shapes
    const maria: { lat: number; lon: number; rx: number; ry: number; angle?: number; depth: number; tint?: [number, number, number] }[] = [
      // Mare Tranquillitatis — Sea of Tranquility
      { lat: 8.5, lon: 31.4, rx: 220, ry: 170, depth: 0.65, tint: [78, 76, 72] },
      { lat: 6.0, lon: 28.0, rx: 160, ry: 120, depth: 0.55, tint: [75, 73, 70] },
      { lat: 10.5, lon: 35.0, rx: 130, ry: 100, depth: 0.50 },
      // Mare Imbrium — Sea of Showers (largest)
      { lat: 36, lon: -16, rx: 340, ry: 290, depth: 0.70, tint: [72, 70, 68] },
      { lat: 33, lon: -18, rx: 280, ry: 240, depth: 0.60, tint: [68, 66, 64] },
      { lat: 38, lon: -12, rx: 200, ry: 180, depth: 0.50 },
      // Sinus Iridum (Bay of Rainbows) — part of Imbrium
      { lat: 45, lon: -32, rx: 120, ry: 60, angle: -0.2, depth: 0.55, tint: [74, 72, 70] },
      // Mare Serenitatis — Sea of Serenity
      { lat: 28, lon: 17.5, rx: 175, ry: 150, depth: 0.60, tint: [80, 78, 74] },
      { lat: 26, lon: 19, rx: 140, ry: 110, depth: 0.50 },
      // Oceanus Procellarum — Ocean of Storms (huge)
      { lat: 18.4, lon: -57.4, rx: 380, ry: 340, depth: 0.60, tint: [82, 80, 76] },
      { lat: 10, lon: -50, rx: 300, ry: 260, depth: 0.55 },
      { lat: 25, lon: -55, rx: 220, ry: 180, depth: 0.50 },
      { lat: 5, lon: -65, rx: 200, ry: 160, depth: 0.45 },
      { lat: -5, lon: -45, rx: 180, ry: 140, depth: 0.40 },
      // Mare Crisium — Sea of Crises (isolated)
      { lat: 17, lon: 59.1, rx: 125, ry: 95, depth: 0.62, tint: [76, 74, 70] },
      // Mare Nubium — Sea of Clouds
      { lat: -21, lon: -17, rx: 130, ry: 105, depth: 0.45, tint: [85, 83, 78] },
      { lat: -18, lon: -14, rx: 100, ry: 80, depth: 0.40 },
      // Mare Vaporum — Sea of Vapors
      { lat: 13, lon: 3.5, rx: 72, ry: 58, depth: 0.40, tint: [88, 86, 82] },
      // Mare Humorum — Sea of Moisture
      { lat: -24, lon: -39, rx: 100, ry: 85, depth: 0.48, tint: [80, 78, 74] },
      // Sinus Medii — Central Bay
      { lat: 2, lon: -1, rx: 85, ry: 68, angle: 0.3, depth: 0.35 },
      // Mare Fecunditatis — Sea of Fertility
      { lat: -8, lon: 52, rx: 155, ry: 120, depth: 0.50, tint: [84, 82, 78] },
      { lat: -5, lon: 48, rx: 110, ry: 90, depth: 0.42 },
      // Mare Nectaris — Sea of Nectar
      { lat: -15, lon: 35, rx: 95, ry: 75, depth: 0.45, tint: [82, 80, 76] },
      // Mare Frigoris — Sea of Cold (elongated)
      { lat: 56, lon: 2, rx: 240, ry: 50, depth: 0.38, tint: [86, 84, 80] },
      { lat: 57, lon: -15, rx: 180, ry: 40, depth: 0.35 },
      { lat: 55, lon: 20, rx: 160, ry: 42, depth: 0.32 },
      // Lacus Somniorum — Lake of Dreams
      { lat: 38, lon: 29, rx: 80, ry: 55, depth: 0.35 },
      // Palus Putredinis
      { lat: 27, lon: 0.4, rx: 55, ry: 45, depth: 0.35 },
      // Far side small patches (much fewer maria)
      { lat: -18, lon: -162, rx: 55, ry: 48, depth: 0.22 },
      { lat: -4, lon: 175, rx: 60, ry: 52, depth: 0.20 },
      { lat: 5.5, lon: 160, rx: 50, ry: 45, depth: 0.18 },
      { lat: 24, lon: -93, rx: 45, ry: 38, depth: 0.18 },
    ];

    for (const mare of maria) {
      const [mx, my] = ll2px(mare.lat, mare.lon);
      const tR = mare.tint?.[0] ?? 80;
      const tG = mare.tint?.[1] ?? 78;
      const tB = mare.tint?.[2] ?? 74;
      ctx.save();
      ctx.translate(mx, my);
      if (mare.angle) ctx.rotate(mare.angle);

      // Multiple layered fills for organic shape
      for (let layer = 0; layer < 8; layer++) {
        const scale = 1 - layer * 0.08;
        const opacity = mare.depth * (0.3 + layer * 0.08);
        const jx = rand() * 10 - 5, jy = rand() * 10 - 5;
        const g = ctx.createRadialGradient(jx, jy, 0, jx * 0.5, jy * 0.5, mare.rx * scale);
        g.addColorStop(0, `rgba(${tR - 10}, ${tG - 10}, ${tB - 10}, ${opacity})`);
        g.addColorStop(0.3, `rgba(${tR - 5}, ${tG - 5}, ${tB - 5}, ${opacity * 0.9})`);
        g.addColorStop(0.55, `rgba(${tR}, ${tG}, ${tB}, ${opacity * 0.7})`);
        g.addColorStop(0.75, `rgba(${tR + 8}, ${tG + 8}, ${tB + 8}, ${opacity * 0.35})`);
        g.addColorStop(0.90, `rgba(${tR + 15}, ${tG + 15}, ${tB + 10}, ${opacity * 0.1})`);
        g.addColorStop(1, `rgba(${tR + 20}, ${tG + 20}, ${tB + 15}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(rand() * 8 - 4, rand() * 8 - 4, mare.rx * scale, mare.ry * scale, rand() * 0.04, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle internal wrinkle ridges
      for (let i = 0; i < 4; i++) {
        const ox = (rand() - 0.5) * mare.rx * 0.8;
        const oy = (rand() - 0.5) * mare.ry * 0.6;
        const len = 15 + rand() * mare.rx * 0.3;
        const angle = rand() * Math.PI;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.quadraticCurveTo(
          ox + Math.cos(angle) * len * 0.5 + (rand() - 0.5) * 15,
          oy + Math.sin(angle) * len * 0.5 + (rand() - 0.5) * 15,
          ox + Math.cos(angle) * len,
          oy + Math.sin(angle) * len
        );
        ctx.strokeStyle = `rgba(${tR + 15}, ${tG + 15}, ${tB + 12}, ${0.04 + rand() * 0.06})`;
        ctx.lineWidth = 1 + rand() * 2;
        ctx.stroke();
      }
      ctx.restore();
    }

    /* ── 3. Named craters — accurate selenographic positions ────────────── */
    const namedCraters: { lat: number; lon: number; r: number; bright?: boolean; depth?: number; rays?: number }[] = [
      // Tycho — young, spectacular ray system
      { lat: -43.31, lon: -11.36, r: 28, bright: true, depth: 0.85, rays: 16 },
      // Copernicus — prominent rays
      { lat: 9.62, lon: -20.08, r: 30, bright: true, depth: 0.75, rays: 14 },
      // Aristarchus — brightest spot on moon
      { lat: 23.73, lon: -47.49, r: 20, bright: true, depth: 0.95, rays: 10 },
      // Kepler — bright with rays
      { lat: 8.12, lon: -38.01, r: 16, bright: true, depth: 0.6, rays: 8 },
      // Plato — dark floor
      { lat: 51.6, lon: -9.3, r: 32, depth: 0.65 },
      // Clavius — huge southern crater
      { lat: -58.4, lon: -14.4, r: 60, depth: 0.5 },
      // Archimedes — mare-floored
      { lat: 29.7, lon: -4.0, r: 26, depth: 0.5 },
      // Aristillus
      { lat: 33.9, lon: 1.2, r: 18, bright: true, depth: 0.45, rays: 6 },
      // Autolycus
      { lat: 30.7, lon: 1.5, r: 14, depth: 0.4 },
      // Eratosthenes
      { lat: 14.5, lon: -11.3, r: 20, depth: 0.55 },
      // Ptolemaeus
      { lat: -9.3, lon: -1.8, r: 44, depth: 0.35 },
      // Alphonsus
      { lat: -13.4, lon: -2.8, r: 36, depth: 0.4 },
      // Arzachel
      { lat: -18.2, lon: -1.9, r: 30, depth: 0.45 },
      // Theophilus
      { lat: -11.4, lon: 26.4, r: 30, depth: 0.55 },
      // Petavius
      { lat: -25.3, lon: 60.4, r: 28, depth: 0.5 },
      // Langrenus
      { lat: -8.9, lon: 61.0, r: 24, depth: 0.5 },
      // Grimaldi — very dark floor
      { lat: -5.2, lon: -68.6, r: 28, depth: 0.55 },
      // Schickard
      { lat: -44.4, lon: -55.1, r: 35, depth: 0.4 },
      // Posidonius
      { lat: 31.8, lon: 29.9, r: 22, depth: 0.4 },
      // Cleomedes
      { lat: 27.7, lon: 56.0, r: 24, depth: 0.45 },
      // Proclus — bright, asymmetric rays
      { lat: 16.1, lon: 46.8, r: 12, bright: true, depth: 0.6, rays: 6 },
      // Stevinus
      { lat: -32.5, lon: 54.2, r: 20, depth: 0.45 },
      // Maginus
      { lat: -50.5, lon: -6.3, r: 42, depth: 0.4 },
      // Longomontanus
      { lat: -49.5, lon: -21.7, r: 38, depth: 0.4 },
      // Far side craters
      { lat: 5.5, lon: 159.6, r: 28, depth: 0.5 },
      { lat: -33.2, lon: 162.0, r: 35, depth: 0.45 },
      { lat: 19.8, lon: -148.2, r: 50, depth: 0.4 },
      { lat: -43.4, lon: -169.4, r: 40, depth: 0.35 },
      { lat: 6.1, lon: -136.5, r: 32, depth: 0.4 },
      { lat: -36.0, lon: -137.0, r: 45, depth: 0.35 },
    ];

    const lightAngle = -Math.PI * 0.72;
    const lx = Math.cos(lightAngle), ly = Math.sin(lightAngle);

    function drawCrater(cx: number, cy: number, r: number, bright: boolean, depth: number, rays = 0) {
      // Ejecta blanket
      if (r > 6) {
        const ej = ctx.createRadialGradient(cx, cy, r * 0.8, cx, cy, r * (bright ? 2.0 : 1.8));
        ej.addColorStop(0, `rgba(165, 162, 158, ${0.06 * depth})`);
        ej.addColorStop(1, `rgba(165, 162, 158, 0)`);
        ctx.fillStyle = ej;
        ctx.beginPath(); ctx.arc(cx, cy, r * 2.0, 0, Math.PI * 2); ctx.fill();
      }
      // Shadow (inside, offset toward light source)
      ctx.beginPath();
      ctx.arc(cx + lx * r * 0.12, cy + ly * r * 0.12, r * 0.88, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(20, 20, 18, ${0.35 * depth})`;
      ctx.fill();
      // Floor
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.72, 0, Math.PI * 2);
      if (bright) {
        ctx.fillStyle = `rgba(200, 198, 192, ${0.3 * depth})`;
      } else {
        ctx.fillStyle = `rgba(30, 28, 26, ${0.2 * depth})`;
      }
      ctx.fill();
      // Lit rim (opposite light side — catches light)
      ctx.beginPath();
      ctx.arc(cx - lx * r * 0.06, cy - ly * r * 0.06, r * 1.04, 0, Math.PI * 2);
      ctx.strokeStyle = bright ? `rgba(220, 218, 212, ${0.35 * depth})` : `rgba(185, 182, 176, ${0.2 * depth})`;
      ctx.lineWidth = 1.5 + r * 0.05;
      ctx.stroke();
      // Shadow rim
      ctx.beginPath();
      ctx.arc(cx + lx * r * 0.06, cy + ly * r * 0.06, r * 1.02, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(25, 24, 22, ${0.18 * depth})`;
      ctx.lineWidth = 1 + r * 0.04;
      ctx.stroke();
      // Central peak for large craters
      if (r > 18) {
        ctx.beginPath(); ctx.arc(cx, cy, r * 0.1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(190, 188, 182, ${0.18 * depth})`;
        ctx.fill();
      }
      // Ray system for bright craters
      if (bright && rays > 0) {
        const rayCount = rays + Math.floor(rand() * 6);
        for (let i = 0; i < rayCount; i++) {
          const angle = (i / rayCount) * Math.PI * 2 + rand() * 0.5;
          const len = r * (5 + rand() * 12);
          const width = 1.5 + rand() * 4;
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r * 1.1, cy + Math.sin(angle) * r * 1.1);
          const mid = 0.3 + rand() * 0.3;
          ctx.quadraticCurveTo(
            cx + Math.cos(angle + 0.12) * len * mid,
            cy + Math.sin(angle + 0.12) * len * mid,
            cx + Math.cos(angle + (rand() - 0.5) * 0.2) * len,
            cy + Math.sin(angle + (rand() - 0.5) * 0.2) * len
          );
          ctx.strokeStyle = `rgba(210, 208, 202, ${0.035 + rand() * 0.04})`;
          ctx.lineWidth = width;
          ctx.stroke();
        }
        // Central glow
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.8);
        cg.addColorStop(0, `rgba(225, 222, 216, 0.22)`);
        cg.addColorStop(0.5, `rgba(210, 208, 202, 0.08)`);
        cg.addColorStop(1, `rgba(210, 208, 202, 0)`);
        ctx.fillStyle = cg;
        ctx.beginPath(); ctx.arc(cx, cy, r * 1.8, 0, Math.PI * 2); ctx.fill();
      }
    }

    // Draw named craters
    for (const c of namedCraters) {
      const [cx, cy] = ll2px(c.lat, c.lon);
      drawCrater(cx, cy, c.r, !!c.bright, c.depth || 0.5, c.rays || 0);
    }

    /* ── 4. Mountain ranges ─────────────────────────────────────── */
    const mountains: { points: [number, number][]; width: number; brightness: number }[] = [
      // Montes Apenninus (border of Imbrium)
      { points: [[18, -5], [20, -3.5], [22.5, -1.5], [25, 1], [27, 3.5], [28.5, 6]], width: 22, brightness: 0.2 },
      // Montes Carpatus
      { points: [[14, -23], [15.5, -26], [17, -29], [19, -33]], width: 16, brightness: 0.16 },
      // Montes Caucasus
      { points: [[35, 8], [37, 9.5], [39, 10.5]], width: 14, brightness: 0.14 },
      // Montes Alpes
      { points: [[44, -3], [46, -2], [48, 0], [49.5, 2]], width: 14, brightness: 0.14 },
      // Montes Haemus
      { points: [[19, 9], [20.5, 11], [22, 13]], width: 10, brightness: 0.12 },
      // Montes Jura (Sinus Iridum rim)
      { points: [[45, -37], [46.5, -34], [47, -31]], width: 12, brightness: 0.14 },
    ];
    for (const range of mountains) {
      ctx.beginPath();
      const pts = range.points.map(([lat, lon]) => ll2px(lat, lon));
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], cur = pts[i];
        ctx.quadraticCurveTo(
          (prev[0] + cur[0]) / 2 + (rand() - 0.5) * 8,
          (prev[1] + cur[1]) / 2 + (rand() - 0.5) * 8,
          cur[0], cur[1]
        );
      }
      // Sunlit side
      ctx.strokeStyle = `rgba(210, 208, 200, ${range.brightness})`;
      ctx.lineWidth = range.width; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
      // Shadow side
      ctx.beginPath(); ctx.moveTo(pts[0][0] + 3, pts[0][1] + 3);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], cur = pts[i];
        ctx.quadraticCurveTo((prev[0] + cur[0]) / 2 + 3, (prev[1] + cur[1]) / 2 + 3, cur[0] + 3, cur[1] + 3);
      }
      ctx.strokeStyle = `rgba(25, 24, 22, ${range.brightness * 0.6})`; ctx.lineWidth = range.width * 0.65; ctx.stroke();
    }

    /* ── 5. Random crater populations ───────────────────────────── */
    // Large (basin-size)
    for (let i = 0; i < 25; i++) {
      const cx = rand() * W, cy = rand() * H;
      drawCrater(cx, cy, 28 + rand() * 40, rand() > 0.92, 0.18 + rand() * 0.18);
    }
    // Medium
    for (let i = 0; i < 350; i++) {
      const cx = rand() * W, cy = rand() * H;
      drawCrater(cx, cy, 9 + rand() * 22, false, 0.15 + rand() * 0.2);
    }
    // Small
    for (let i = 0; i < 1400; i++) {
      const cx = rand() * W, cy = rand() * H, r = 3 + rand() * 7;
      ctx.beginPath();
      ctx.arc(cx + lx * r * 0.1, cy + ly * r * 0.1, r * 0.78, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(22, 22, 20, ${rand() * 0.12 + 0.03})`;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx - lx * r * 0.08, cy - ly * r * 0.08, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(185, 182, 176, ${rand() * 0.12 + 0.04})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }
    // Micro craters (texture)
    for (let i = 0; i < 5000; i++) {
      const cx = rand() * W, cy = rand() * H, r = 1 + rand() * 3;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(35, 34, 32, ${rand() * 0.15 + 0.03})`;
      ctx.fill();
      ctx.beginPath(); ctx.arc(cx - lx * r * 0.25, cy - ly * r * 0.25, r * 0.55, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(195, 192, 186, ${rand() * 0.06 + 0.02})`;
      ctx.fill();
    }
    // Dust specks
    for (let i = 0; i < 8000; i++) {
      const cx = rand() * W, cy = rand() * H, r = 0.3 + rand() * 1.0;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(45, 44, 40, ${rand() * 0.2 + 0.04})`;
      ctx.fill();
    }

    /* ── 6. Film grain for regolith realism ─────────────────────── */
    const imgData = ctx.getImageData(0, 0, W, H);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const n = (rand() - 0.5) * 10;
      imgData.data[i] = Math.max(0, Math.min(255, imgData.data[i] + n));
      imgData.data[i + 1] = Math.max(0, Math.min(255, imgData.data[i + 1] + n));
      imgData.data[i + 2] = Math.max(0, Math.min(255, imgData.data[i + 2] + n));
    }
    ctx.putImageData(imgData, 0, 0);

    const colorTex = new THREE.CanvasTexture(colorCanvas);
    colorTex.colorSpace = THREE.SRGBColorSpace;

    /* ── 7. Bump map from luminance + extra noise ───────────────── */
    const bumpCanvas = document.createElement("canvas");
    const BW = 2048, BH = 1024;
    bumpCanvas.width = BW; bumpCanvas.height = BH;
    const bctx = bumpCanvas.getContext("2d")!;
    bctx.drawImage(colorCanvas, 0, 0, BW, BH);
    const bData = bctx.getImageData(0, 0, BW, BH);
    const rand2 = rng(999);
    for (let y = 0; y < BH; y++) {
      for (let x = 0; x < BW; x++) {
        const idx = (y * BW + x) * 4;
        let lum = bData.data[idx] * 0.299 + bData.data[idx + 1] * 0.587 + bData.data[idx + 2] * 0.114;
        const nx = x / BW * 16, ny = y / BH * 8;
        // Terrain-scale height variation
        lum += fbm(nx + 50, ny + 50, 6, 2.2, 0.55) * 28;
        // Fine detail
        lum += fbm(nx * 4 + 300, ny * 4 + 300, 4, 2.0, 0.5) * 10;
        lum += (rand2() - 0.5) * 10;
        lum = Math.max(0, Math.min(255, lum));
        bData.data[idx] = lum; bData.data[idx + 1] = lum; bData.data[idx + 2] = lum;
      }
    }
    bctx.putImageData(bData, 0, 0);
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);

    /* ── 8. Displacement map — real heightmap for 3D surface geometry ───── */
    // Creates actual vertex displacement so crater bowls, maria basins,
    // mountain ridges, and crater rims are geometrically visible in profile.
    const dispW = 2048, dispH = 1024;
    const dispCanvas = document.createElement("canvas");
    dispCanvas.width = dispW; dispCanvas.height = dispH;
    const dctx = dispCanvas.getContext("2d")!;

    const dll2px = (lat: number, lon: number): [number, number] => [
      ((lon + 180) / 360) * dispW,
      ((90 - lat) / 180) * dispH,
    ];
    // Scale factor from color-map pixels to displacement-map pixels
    const dScale = dispW / W;

    // Highland base: mid-gray (128) = mean surface elevation
    dctx.fillStyle = "rgb(128, 128, 128)";
    dctx.fillRect(0, 0, dispW, dispH);

    // Add terrain-scale noise variation to highlands
    const dispImgData = dctx.getImageData(0, 0, dispW, dispH);
    const rand3 = rng(777);
    for (let y = 0; y < dispH; y++) {
      for (let x = 0; x < dispW; x++) {
        const idx = (y * dispW + x) * 4;
        const nx = x / dispW * 10, ny = y / dispH * 5;
        const terrainN = fbm(nx + 80, ny + 80, 5, 2.0, 0.5) * 15;
        const detailN = fbm(nx * 3 + 400, ny * 3 + 400, 3, 2.1, 0.48) * 6;
        const val = Math.max(0, Math.min(255, 128 + terrainN + detailN));
        dispImgData.data[idx] = val;
        dispImgData.data[idx + 1] = val;
        dispImgData.data[idx + 2] = val;
      }
    }
    dctx.putImageData(dispImgData, 0, 0);

    // Maria depressions — basalt plains sit 1-5 km below highland mean
    for (const mare of maria) {
      const [mx, my] = dll2px(mare.lat, mare.lon);
      const srx = mare.rx * dScale, sry = mare.ry * dScale;
      dctx.save();
      dctx.translate(mx, my);
      if (mare.angle) dctx.rotate(mare.angle);
      const depthVal = Math.round(55 + (1 - mare.depth) * 40);
      for (let layer = 0; layer < 5; layer++) {
        const s = 1 - layer * 0.12;
        const g = dctx.createRadialGradient(0, 0, 0, 0, 0, srx * s);
        g.addColorStop(0, `rgb(${depthVal}, ${depthVal}, ${depthVal})`);
        g.addColorStop(0.7, `rgb(${depthVal + 20}, ${depthVal + 20}, ${depthVal + 20})`);
        g.addColorStop(1, `rgb(128, 128, 128)`);
        dctx.fillStyle = g;
        dctx.beginPath();
        dctx.ellipse(0, 0, srx * s, sry * s, 0, 0, Math.PI * 2);
        dctx.fill();
      }
      dctx.restore();
    }

    // Named crater depressions with raised rims
    for (const c of namedCraters) {
      const [cx2, cy2] = dll2px(c.lat, c.lon);
      const sr = c.r * dScale;
      const cd = c.depth || 0.5;
      // Raised rim
      const rimVal = Math.round(150 + cd * 50);
      dctx.beginPath();
      dctx.arc(cx2, cy2, sr * 1.15, 0, Math.PI * 2);
      dctx.strokeStyle = `rgb(${rimVal}, ${rimVal}, ${rimVal})`;
      dctx.lineWidth = sr * 0.25;
      dctx.stroke();
      // Depressed floor
      const floorVal = Math.round(60 + (1 - cd) * 50);
      const fg = dctx.createRadialGradient(cx2, cy2, 0, cx2, cy2, sr * 0.9);
      fg.addColorStop(0, `rgb(${floorVal}, ${floorVal}, ${floorVal})`);
      fg.addColorStop(0.7, `rgb(${floorVal + 10}, ${floorVal + 10}, ${floorVal + 10})`);
      fg.addColorStop(1, `rgb(${floorVal + 30}, ${floorVal + 30}, ${floorVal + 30})`);
      dctx.fillStyle = fg;
      dctx.beginPath();
      dctx.arc(cx2, cy2, sr * 0.85, 0, Math.PI * 2);
      dctx.fill();
      // Central peak for large craters
      if (sr > 9) {
        const peakVal = Math.round(145 + cd * 30);
        dctx.beginPath();
        dctx.arc(cx2, cy2, sr * 0.12, 0, Math.PI * 2);
        dctx.fillStyle = `rgb(${peakVal}, ${peakVal}, ${peakVal})`;
        dctx.fill();
      }
    }

    // Mountain ranges — elevated ridges (Montes Apenninus, etc.)
    for (const range of mountains) {
      const pts = range.points.map(([lat2, lon2]) => dll2px(lat2, lon2));
      const sw = range.width * dScale;
      const ridgeVal = Math.round(160 + range.brightness * 150);
      dctx.beginPath();
      dctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], cur = pts[i];
        dctx.quadraticCurveTo(
          (prev[0] + cur[0]) / 2, (prev[1] + cur[1]) / 2,
          cur[0], cur[1]
        );
      }
      dctx.strokeStyle = `rgb(${ridgeVal}, ${ridgeVal}, ${ridgeVal})`;
      dctx.lineWidth = sw;
      dctx.lineCap = "round";
      dctx.lineJoin = "round";
      dctx.stroke();
    }

    // Smaller random crater depressions
    for (let i = 0; i < 180; i++) {
      const dcx = rand3() * dispW, dcy = rand3() * dispH;
      const dr = 4 + rand3() * 12;
      const dd = 0.2 + rand3() * 0.3;
      dctx.beginPath();
      dctx.arc(dcx, dcy, dr * 1.1, 0, Math.PI * 2);
      dctx.strokeStyle = `rgb(${Math.round(140 + dd * 30)}, ${Math.round(140 + dd * 30)}, ${Math.round(140 + dd * 30)})`;
      dctx.lineWidth = dr * 0.2;
      dctx.stroke();
      const fv = Math.round(90 + (1 - dd) * 30);
      dctx.beginPath();
      dctx.arc(dcx, dcy, dr * 0.8, 0, Math.PI * 2);
      dctx.fillStyle = `rgb(${fv}, ${fv}, ${fv})`;
      dctx.fill();
    }

    const dispTex = new THREE.CanvasTexture(dispCanvas);

    return { colorMap: colorTex, bumpMap: bumpTex, displacementMap: dispTex };
  }, []);

  return (
    <>
      <mesh>
        {/* Higher segment count (512×256) so displacement vertices resolve
            crater rims, maria basin edges, and mountain ridges in silhouette */}
        <sphereGeometry args={[2, 512, 256]} />
        <meshStandardMaterial
          map={colorMap}
          bumpMap={bumpMap}
          bumpScale={0.06}
          displacementMap={displacementMap}
          displacementScale={0.15}
          displacementBias={-0.075}
          roughness={0.92}
          metalness={0.01}
        />
      </mesh>
      {/* Subtle atmospheric limb glow — radius clears max displacement */}
      <mesh>
        <sphereGeometry args={[2.1, 64, 32]} />
        <meshBasicMaterial color="#9aa8c0" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

// ── Scene ───────────────────────────────────────────────────────────────────

function Scene({
  onClickItem,
  onTerritoryClick,
  highlightedTerritory,
  activeFilters,
}: {
  onClickItem: (item: DetailItem) => void;
  onTerritoryClick: (t: Territory) => void;
  highlightedTerritory: string | null;
  activeFilters: Set<string>;
}) {
  const [hoveredTerritoryId, setHoveredTerritoryId] = useState<string | null>(null);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const moonGroupRef = useRef<THREE.Group>(null);

  /* ── Scientifically accurate lunar rotation ──────────────────────────────
     • Sidereal rotation period: 27.321661 days (tidally locked to Earth)
     • Direction: prograde (counter-clockwise viewed from north celestial pole,
       i.e. west-to-east, same as Earth)
     • Axial tilt: 1.5424° relative to the ecliptic normal
       (6.687° relative to its own orbital plane)
     • Visualization speed is ~20,000× real-time so the globe visibly rotates
       (one full rotation ≈ 120 seconds instead of 27.3 days)
     ──────────────────────────────────────────────────────────────────────── */
  const MOON_AXIAL_TILT_RAD = THREE.MathUtils.degToRad(1.5424);
  // Prograde: positive rotation around local Y (CCW from above north pole)
  // Slow, contemplative speed — one full rotation every 10 minutes
  const DISPLAY_ROTATION_SPEED = (2 * Math.PI) / 600; // rad/s — one rotation per 10 min

  useFrame((_, delta) => {
    if (moonGroupRef.current) {
      moonGroupRef.current.rotation.y += DISPLAY_ROTATION_SPEED * delta;
    }
  });

  // Hover only sets glow — no popup
  const handleTerritoryHover = useCallback((t: Territory | null) => {
    setHoveredTerritoryId(t?.id ?? null);
  }, []);

  const handleTerritoryMarkerClick = useCallback((t: Territory) => {
    onClickItem({ kind: "territory", data: t });
  }, [onClickItem]);

  const handleLandmarkHover = useCallback((id: string | null) => {
    setHoveredPinId(id);
  }, []);

  const handleLandmarkClick = useCallback((id: string) => {
    const lm = landmarks.find((l) => l.id === id);
    if (lm) onClickItem({ kind: "landmark", data: lm });
  }, [onClickItem]);

  const handleClaimHover = useCallback((id: string | null) => {
    setHoveredPinId(id);
  }, []);

  const handleClaimClick = useCallback((id: string) => {
    const fc = futureClaims.find((c) => c.id === id);
    if (fc) onClickItem({ kind: "claim", data: fc });
  }, [onClickItem]);

  const visibleLandmarks = useMemo(() =>
    landmarks.filter((lm) => lm.type !== "geographic" && activeFilters.has(lm.type)),
    [activeFilters]
  );

  const showFutureClaims = activeFilters.has("future");

  return (
    <>
      {/* Low ambient for deep space feel */}
      <ambientLight intensity={0.15} />

      {/* Outer group: fixed axial tilt (1.5424° from ecliptic normal) */}
      <group rotation={[MOON_AXIAL_TILT_RAD, 0, 0]}>
      {/* Inner group: prograde spin (west-to-east, same as real Moon) */}
      <group ref={moonGroupRef}>
        {/* Lights INSIDE the rotating group so illumination is fixed
            relative to the moon surface — the dark/lit hemispheres
            rotate with the geometry, matching baked texture shadows */}
        <directionalLight position={[5, 3, 5]} intensity={1.6} />
        <directionalLight position={[-3, -1, 2]} intensity={0.3} color="#aabbcc" />
        <pointLight position={[-5, -3, -5]} intensity={0.15} color="#667" />

        <MoonMesh />

        {territories.map((t) => (
          <TerritoryMarker
            key={t.id}
            territory={t}
            onHover={handleTerritoryHover}
            onClick={handleTerritoryMarkerClick}
            isHovered={hoveredTerritoryId === t.id}
            isHighlighted={highlightedTerritory === t.id}
          />
        ))}

        {visibleLandmarks.map((lm) => (
          <LandmarkPin
            key={lm.id}
            landmark={lm}
            isHovered={hoveredPinId === lm.id}
            onHover={handleLandmarkHover}
            onClick={handleLandmarkClick}
            dimmed={false}
          />
        ))}

        {showFutureClaims && futureClaims.map((fc) => (
          <FutureClaimPin
            key={fc.id}
            claim={fc}
            isHovered={hoveredPinId === fc.id}
            onHover={handleClaimHover}
            onClick={handleClaimClick}
            dimmed={false}
          />
        ))}
      </group>
      </group>

      {/* Disable scroll zoom to prevent page-scroll hijacking.
          Users can still drag to rotate and pinch-to-zoom on touch.
          autoRotate removed — the moon now self-rotates via useFrame
          with scientifically accurate prograde direction and axial tilt. */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        minDistance={3}
        maxDistance={8}
        enableDamping
        dampingFactor={0.06}
        rotateSpeed={0.4}
      />
    </>
  );
}

// ── Detail Overlay (floats over top of the moon) ────────────────────────────

function DetailOverlay({ item, onClose, onExplorePlots }: { item: DetailItem; onClose: () => void; onExplorePlots: (t: Territory) => void }) {
  if (!item) return null;

  let content: React.ReactNode = null;
  let accentColor = "#00E5CC";

  if (item.kind === "territory") {
    const t = item.data;
    accentColor = t.color;
    content = (
      <>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: t.color, boxShadow: `0 0 12px ${t.color}50` }} />
          <div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: t.color }}>
              {t.name}
            </h3>
            <p className="text-gray-400 text-sm italic">{t.tagline}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-3 leading-relaxed">{t.description}</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
            <div className="text-white font-bold text-lg">{t.totalPlots}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wider">Total Plots</div>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
            <div className="font-bold text-lg" style={{ color: "#00E5CC" }}>{t.totalPlots - t.claimedPlots}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wider">Available</div>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
            <div className="text-amber-400 font-bold text-lg">{t.priceSats.toLocaleString()} <span className="text-xs font-normal">sats</span></div>
            <div className="text-gray-500 text-xs uppercase tracking-wider">&asymp; {t.priceBot} USDT &middot; {t.voteCreditsBot} {t.voteCreditsBot === 1 ? "vote" : "votes"} / plot</div>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2 text-center">
            <div className="text-white font-bold text-sm leading-tight mt-0.5">{t.terrainType}</div>
            <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">Terrain</div>
          </div>
        </div>
        <button
          onClick={() => onExplorePlots(t)}
          className="mt-4 w-full rounded-lg py-3 px-4 font-semibold text-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
            color: "#fff",
            boxShadow: `0 4px 20px ${t.color}40`,
          }}
        >
          Explore & Claim Plots
        </button>
      </>
    );
  }

  if (item.kind === "landmark") {
    const lm = item.data;
    accentColor = LANDMARK_COLORS[lm.type] || "#94A3B8";
    content = (
      <>
        <div className="flex items-center gap-3">
          <span className="text-2xl">{lm.icon}</span>
          <div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: accentColor }}>
              {lm.name}
            </h3>
            <span className="text-gray-500 text-xs capitalize">{lm.type}</span>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-3 leading-relaxed">{lm.description}</p>
        {lm.year && (
          <div className="mt-3 inline-block text-xs font-semibold px-3 py-1 rounded-full" style={{ color: accentColor, background: `${accentColor}18`, border: `1px solid ${accentColor}30` }}>
            {lm.year}
          </div>
        )}
      </>
    );
  }

  if (item.kind === "claim") {
    const fc = item.data;
    accentColor = fc.color;
    const statusLabel = fc.status === "planned" ? "Planned" : fc.status === "announced" ? "Announced" : "Proposed";
    content = (
      <>
        <div className="flex items-center gap-3">
          <div className="w-4 h-4 rotate-45 shrink-0" style={{ backgroundColor: fc.color, boxShadow: `0 0 12px ${fc.color}50` }} />
          <div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: fc.color }}>
              {fc.name}
            </h3>
            <p className="text-sm font-medium" style={{ color: fc.color }}>{fc.entity}</p>
          </div>
        </div>
        <p className="text-gray-300 text-sm mt-3 leading-relaxed">{fc.description}</p>
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs px-3 py-1 rounded-full border font-medium" style={{ borderColor: fc.color, color: fc.color }}>
            {statusLabel}
          </span>
          {fc.year && <span className="text-gray-400 text-sm">Target: ~{fc.year}</span>}
        </div>
      </>
    );
  }

  return (
    <div className="absolute top-4 left-4 right-4 z-30 animate-in fade-in slide-in-from-top-2 duration-200">
      <div
        className="rounded-2xl p-5 text-white shadow-2xl border max-w-2xl mx-auto"
        style={{
          background: "rgba(8, 12, 30, 0.80)",
          backdropFilter: "blur(20px)",
          borderColor: `${accentColor}30`,
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <span className="text-sm leading-none">&times;</span>
        </button>
        {content}
      </div>
    </div>
  );
}

// ── Main export ──────────────────────────────────────────────────────────────

interface MoonGlobeProps {
  onTerritoryClick: (territory: Territory) => void;
}

type FilterCategory = "historic" | "scientific" | "rover" | "future" | "conspiracy";

const FILTER_BUTTONS: { key: FilterCategory; label: string; color: string; dot: "circle" | "diamond" }[] = [
  { key: "historic", label: "Apollo / Historic", color: LANDMARK_COLORS.historic, dot: "circle" },
  { key: "rover", label: "Rovers", color: LANDMARK_COLORS.rover, dot: "circle" },
  { key: "scientific", label: "Scientific", color: LANDMARK_COLORS.scientific, dot: "circle" },
  { key: "conspiracy", label: "Alien Bases (Far Side)", color: LANDMARK_COLORS.conspiracy, dot: "circle" },
  { key: "future", label: "Future Claims", color: "#A78BFA", dot: "diamond" },
];

export default function MoonGlobe({ onTerritoryClick }: MoonGlobeProps) {
  const [selectedItem, setSelectedItem] = useState<DetailItem>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(["historic", "scientific"]));
  const [highlightedTerritory, setHighlightedTerritory] = useState<string | null>(null);

  // Only show popup on click, not hover
  const handleClickItem = useCallback((item: DetailItem) => {
    setSelectedItem(item);
  }, []);

  const toggleFilter = useCallback((key: string) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  }, []);

  const handleTerritoryLegendClick = useCallback((t: Territory) => {
    setHighlightedTerritory((prev) => {
      const next = prev === t.id ? null : t.id;
      // When highlighting a territory, show its details
      if (next) {
        setSelectedItem({ kind: "territory", data: t });
      } else {
        setSelectedItem(null);
      }
      return next;
    });
  }, []);

  const handleCloseOverlay = useCallback(() => {
    setSelectedItem(null);
    setHighlightedTerritory(null);
  }, []);

  const anyFilterActive = activeFilters.size > 0;

  return (
    <section id="globe" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="section-heading">
            Explore the <span className="text-gradient-teal">Moon</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Drag to rotate the globe. Tap a territory to see details.
          </p>
        </div>

        {/* Globe container with overlay */}
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-teal/5 via-transparent to-transparent pointer-events-none z-10" />

          {/* Detail overlay — floats OVER the top of the moon, click only */}
          <DetailOverlay item={selectedItem} onClose={handleCloseOverlay} onExplorePlots={onTerritoryClick} />

          <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }}>
            <Scene
              onClickItem={handleClickItem}
              onTerritoryClick={onTerritoryClick}
              highlightedTerritory={highlightedTerritory}
              activeFilters={activeFilters}
            />
          </Canvas>
        </div>

        {/* Territory selectors */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {territories.map((t) => {
            const active = highlightedTerritory === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTerritoryLegendClick(t)}
                className={`group rounded-lg px-4 py-2.5 flex items-center gap-2.5 transition-all duration-200 cursor-pointer border ${
                  active
                    ? "border-white/40 bg-white/10 scale-105"
                    : "glass hover:border-white/30 hover:scale-[1.02]"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: t.color,
                    transform: active ? "scale(1.4)" : "scale(1)",
                    boxShadow: active ? `0 0 10px ${t.color}` : "none",
                  }}
                />
                <span className={`text-sm transition-colors ${active ? "text-white font-semibold" : "text-gray-300 group-hover:text-white"}`}>
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category filter buttons with clear "tap to show" prompt */}
        <div className="mt-6 text-center">
          <p className="text-gray-500 text-xs uppercase tracking-widest mb-3">
            {anyFilterActive ? "Showing on globe" : "Tap to reveal on globe"}
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {FILTER_BUTTONS.map((fb) => {
              const active = activeFilters.has(fb.key);
              return (
                <button
                  key={fb.key}
                  onClick={() => toggleFilter(fb.key)}
                  className={`group rounded-full px-4 py-2 flex items-center gap-2 transition-all duration-200 cursor-pointer border ${
                    active
                      ? "border-white/40 bg-white/10 scale-105"
                      : "border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/25 hover:scale-[1.02]"
                  }`}
                >
                  {fb.dot === "circle" ? (
                    <div
                      className="w-2.5 h-2.5 rounded-full transition-all duration-200"
                      style={{
                        background: fb.color,
                        boxShadow: active ? `0 0 8px ${fb.color}` : "none",
                        opacity: active ? 1 : 0.6,
                      }}
                    />
                  ) : (
                    <div
                      className="w-2.5 h-2.5 rotate-45 transition-all duration-200"
                      style={{
                        background: fb.color,
                        boxShadow: active ? `0 0 8px ${fb.color}` : "none",
                        opacity: active ? 1 : 0.6,
                      }}
                    />
                  )}
                  <span className={`text-xs transition-colors ${active ? "text-white font-medium" : "text-gray-400 group-hover:text-gray-200"}`}>
                    {fb.label}
                  </span>
                  {active && (
                    <span className="text-[9px] text-gray-500 ml-0.5">&times;</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
