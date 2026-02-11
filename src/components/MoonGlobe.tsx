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
  const pos = useMemo(() => latLonToVec3(territory.lat, territory.lon, 2.02), [territory]);
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
  dimmed,
}: {
  landmark: Landmark;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  dimmed: boolean;
}) {
  const pos = useMemo(() => latLonToVec3(landmark.lat, landmark.lon, 2.01), [landmark]);
  const quat = useMemo(() => surfaceQuaternion(pos), [pos]);
  const pinColor = LANDMARK_COLORS[landmark.type] || "#94A3B8";
  const opacity = dimmed ? 0.15 : isHovered ? 1 : 0.85;

  return (
    <group
      position={pos}
      quaternion={quat}
      onPointerEnter={(e) => { e.stopPropagation(); onHover(landmark.id); }}
      onPointerLeave={() => onHover(null)}
    >
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.006, 0.006, 0.10, 6]} />
        <meshBasicMaterial color={pinColor} transparent opacity={opacity} />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial color={pinColor} transparent opacity={opacity} />
      </mesh>
      {isHovered && (
        <mesh position={[0, 0.12, 0]}>
          <sphereGeometry args={[0.055, 12, 12]} />
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
  dimmed,
}: {
  claim: FutureClaim;
  isHovered: boolean;
  onHover: (id: string | null) => void;
  dimmed: boolean;
}) {
  const pos = useMemo(() => latLonToVec3(claim.lat, claim.lon, 2.01), [claim]);
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
    >
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.04, 0.008]} />
        <meshBasicMaterial color={claim.color} transparent opacity={opacity} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.05, 0.065, 6]} />
        <meshBasicMaterial color={claim.color} transparent opacity={isHovered ? 0.5 : 0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// ── Moon Mesh with high-detail procedural textures + bump map ────────────────

function MoonMesh() {
  const { colorMap, bumpMap } = useMemo(() => {
    const W = 4096, H = 2048;

    const rng = (seed: number) => {
      let s = seed;
      return () => { s = (s * 16807 + 0) % 2147483647; return s / 2147483647; };
    };
    const rand = rng(42);

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

    for (let y = 0; y < H; y++) {
      const latFactor = Math.abs(y / H - 0.5) * 2;
      const r = 168 + latFactor * 12;
      const g = 162 + latFactor * 8;
      const b = 148 + latFactor * 4;
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      ctx.fillRect(0, y, W, 1);
    }

    const terrainData = ctx.getImageData(0, 0, W, H);
    for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        const nx = x / W * 8, ny = y / H * 4;
        const n1 = fbm(nx, ny, 6, 2.0, 0.55) * 20;
        const n2 = fbm(nx * 3.7 + 100, ny * 3.7 + 100, 4) * 10;
        const idx = (y * W + x) * 4;
        terrainData.data[idx] = Math.max(0, Math.min(255, terrainData.data[idx] + n1 + n2));
        terrainData.data[idx + 1] = Math.max(0, Math.min(255, terrainData.data[idx + 1] + n1 + n2 * 0.9));
        terrainData.data[idx + 2] = Math.max(0, Math.min(255, terrainData.data[idx + 2] + n1 + n2 * 0.7));
      }
    }
    ctx.putImageData(terrainData, 0, 0);

    const maria: { lat: number; lon: number; rx: number; ry: number; angle?: number; depth: number }[] = [
      { lat: 8.5, lon: 31.4, rx: 200, ry: 155, depth: 0.45 },
      { lat: 36, lon: -16, rx: 300, ry: 260, depth: 0.5 },
      { lat: 28, lon: 17.5, rx: 155, ry: 130, depth: 0.45 },
      { lat: 18.4, lon: -57.4, rx: 340, ry: 300, depth: 0.5 },
      { lat: 17, lon: 59.1, rx: 110, ry: 88, depth: 0.4 },
      { lat: -15, lon: -22, rx: 110, ry: 90, depth: 0.35 },
      { lat: 7, lon: 1, rx: 95, ry: 75, angle: 0.3, depth: 0.3 },
      { lat: 15, lon: -3.5, rx: 65, ry: 55, depth: 0.25 },
      { lat: 45, lon: -32, rx: 110, ry: 55, angle: -0.2, depth: 0.35 },
      { lat: -20, lon: 28, rx: 88, ry: 65, depth: 0.3 },
      { lat: -14, lon: 52, rx: 130, ry: 108, depth: 0.38 },
      { lat: 13, lon: 38, rx: 65, ry: 55, depth: 0.25 },
      { lat: 56, lon: 2, rx: 200, ry: 45, depth: 0.28 },
      { lat: -19.3, lon: -3.2, rx: 75, ry: 55, depth: 0.25 },
      { lat: 2, lon: -47, rx: 108, ry: 78, depth: 0.35 },
      { lat: -18, lon: -162, rx: 50, ry: 45, depth: 0.2 },
      { lat: -4, lon: 175, rx: 55, ry: 50, depth: 0.18 },
      { lat: 24, lon: -93, rx: 40, ry: 35, depth: 0.15 },
    ];

    for (const mare of maria) {
      const [mx, my] = ll2px(mare.lat, mare.lon);
      ctx.save();
      ctx.translate(mx, my);
      if (mare.angle) ctx.rotate(mare.angle);
      for (let layer = 0; layer < 5; layer++) {
        const scale = 1 - layer * 0.12;
        const darkness = mare.depth * (0.4 + layer * 0.12);
        const g = ctx.createRadialGradient(
          rand() * 8 - 4, rand() * 8 - 4, 0,
          rand() * 4 - 2, rand() * 4 - 2, mare.rx * scale
        );
        g.addColorStop(0, `rgba(48, 44, 38, ${darkness})`);
        g.addColorStop(0.35, `rgba(52, 48, 40, ${darkness * 0.85})`);
        g.addColorStop(0.65, `rgba(58, 52, 44, ${darkness * 0.5})`);
        g.addColorStop(0.85, `rgba(62, 56, 46, ${darkness * 0.2})`);
        g.addColorStop(1, `rgba(70, 63, 52, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.ellipse(rand() * 6 - 3, rand() * 6 - 3, mare.rx * scale, mare.ry * scale, rand() * 0.05, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < 6; i++) {
        const ox = (rand() - 0.5) * mare.rx * 1.2;
        const oy = (rand() - 0.5) * mare.ry * 0.8;
        const len = 20 + rand() * mare.rx * 0.4;
        const angle = rand() * Math.PI;
        ctx.beginPath();
        ctx.moveTo(ox, oy);
        ctx.quadraticCurveTo(
          ox + Math.cos(angle) * len * 0.5 + (rand() - 0.5) * 20,
          oy + Math.sin(angle) * len * 0.5 + (rand() - 0.5) * 20,
          ox + Math.cos(angle) * len,
          oy + Math.sin(angle) * len
        );
        ctx.strokeStyle = `rgba(90, 82, 70, ${0.08 + rand() * 0.08})`;
        ctx.lineWidth = 1 + rand() * 2;
        ctx.stroke();
      }
      ctx.restore();
    }

    const namedCraters: { lat: number; lon: number; r: number; bright?: boolean; depth?: number }[] = [
      { lat: -43.31, lon: -11.36, r: 24, bright: true, depth: 0.8 },
      { lat: 9.62, lon: -20.08, r: 26, bright: true, depth: 0.7 },
      { lat: 23.73, lon: -47.49, r: 18, bright: true, depth: 0.9 },
      { lat: 51.6, lon: -9.3, r: 28, depth: 0.6 },
      { lat: -58.4, lon: -14.4, r: 55, depth: 0.5 },
      { lat: 29.7, lon: -4.0, r: 22, depth: 0.5 },
      { lat: 21.4, lon: -5.0, r: 12, depth: 0.4 },
      { lat: -10.5, lon: -20.1, r: 18, depth: 0.5 },
      { lat: 32.8, lon: 35.5, r: 18, depth: 0.45 },
      { lat: -34.7, lon: -17.0, r: 16, depth: 0.4 },
      { lat: 45.4, lon: 2.4, r: 14, depth: 0.45 },
      { lat: -8.0, lon: -10.0, r: 17, depth: 0.4 },
      { lat: -13.7, lon: -4.0, r: 14, depth: 0.4 },
      { lat: -22.0, lon: 46.0, r: 16, depth: 0.5 },
      { lat: -5.0, lon: -2.0, r: 13, depth: 0.35 },
      { lat: -20.7, lon: -12.0, r: 12, depth: 0.4 },
      { lat: 47.3, lon: 7.4, r: 10, depth: 0.35 },
      { lat: -46.2, lon: -51.4, r: 18, depth: 0.45 },
      { lat: 58.1, lon: -43.5, r: 14, depth: 0.4 },
      { lat: 1.3, lon: 65.5, r: 15, depth: 0.5 },
      { lat: -3.2, lon: -43.0, r: 14, depth: 0.45 },
      { lat: 14.5, lon: 24.0, r: 10, depth: 0.35 },
      { lat: -32.6, lon: -2.1, r: 22, depth: 0.5 },
      { lat: 40.8, lon: 1.2, r: 11, depth: 0.4 },
      { lat: 44.4, lon: 11.5, r: 14, depth: 0.45 },
      { lat: 5.5, lon: 159.6, r: 22, depth: 0.5 },
      { lat: -33.2, lon: 162.0, r: 30, depth: 0.4 },
      { lat: 19.8, lon: -148.2, r: 45, depth: 0.4 },
      { lat: -43.4, lon: -169.4, r: 35, depth: 0.35 },
      { lat: 6.1, lon: -136.5, r: 28, depth: 0.4 },
    ];

    const lightAngle = -Math.PI * 0.75;
    const lx = Math.cos(lightAngle), ly = Math.sin(lightAngle);

    function drawCrater(cx: number, cy: number, r: number, bright: boolean, depth: number) {
      const ejectaG = ctx.createRadialGradient(cx, cy, r * 0.9, cx, cy, r * 2.5);
      ejectaG.addColorStop(0, `rgba(155, 148, 135, ${0.06 * depth})`);
      ejectaG.addColorStop(1, `rgba(155, 148, 135, 0)`);
      ctx.fillStyle = ejectaG;
      ctx.beginPath(); ctx.arc(cx, cy, r * 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx + lx * r * 0.15, cy + ly * r * 0.15, r * 0.85, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(25, 22, 18, ${0.3 * depth})`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
      ctx.fillStyle = bright ? `rgba(195, 190, 175, ${0.25 * depth})` : `rgba(35, 32, 28, ${0.25 * depth})`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx - lx * r * 0.08, cy - ly * r * 0.08, r * 1.05, 0, Math.PI * 2);
      ctx.strokeStyle = bright ? `rgba(230, 225, 210, ${0.35 * depth})` : `rgba(175, 168, 155, ${0.25 * depth})`;
      ctx.lineWidth = 1.5 + r * 0.06; ctx.stroke();
      ctx.beginPath(); ctx.arc(cx + lx * r * 0.08, cy + ly * r * 0.08, r * 1.02, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(30, 28, 25, ${0.15 * depth})`; ctx.lineWidth = 1 + r * 0.04; ctx.stroke();
      if (r > 14) { ctx.beginPath(); ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2); ctx.fillStyle = `rgba(180, 175, 160, ${0.15 * depth})`; ctx.fill(); }
      if (bright) {
        const rayCount = 10 + Math.floor(rand() * 8);
        for (let i = 0; i < rayCount; i++) {
          const angle = (i / rayCount) * Math.PI * 2 + rand() * 0.4;
          const len = r * (4 + rand() * 10);
          ctx.beginPath();
          ctx.moveTo(cx + Math.cos(angle) * r * 1.1, cy + Math.sin(angle) * r * 1.1);
          ctx.quadraticCurveTo(cx + Math.cos(angle + 0.15) * len * 0.4, cy + Math.sin(angle + 0.15) * len * 0.4, cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
          ctx.strokeStyle = `rgba(210, 205, 190, ${0.04 + rand() * 0.04})`; ctx.lineWidth = 1 + rand() * 4; ctx.stroke();
        }
        const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 1.5);
        cg.addColorStop(0, `rgba(220, 215, 200, 0.2)`); cg.addColorStop(1, `rgba(220, 215, 200, 0)`);
        ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, r * 1.5, 0, Math.PI * 2); ctx.fill();
      }
    }

    for (const c of namedCraters) { const [cx, cy] = ll2px(c.lat, c.lon); drawCrater(cx, cy, c.r, !!c.bright, c.depth || 0.5); }

    const mountains: { points: [number, number][]; width: number; brightness: number }[] = [
      { points: [[20, -5], [22, -3], [25, 0], [27, 3], [28, 6]], width: 18, brightness: 0.2 },
      { points: [[14, -23], [16, -26], [18, -29], [20, -32]], width: 14, brightness: 0.15 },
      { points: [[44, -30], [45, -34], [46, -38]], width: 12, brightness: 0.15 },
      { points: [[25, 17], [27, 19], [28, 21]], width: 10, brightness: 0.12 },
      { points: [[46, -3], [48, -1], [50, 1]], width: 10, brightness: 0.1 },
    ];
    for (const range of mountains) {
      ctx.beginPath();
      const pts = range.points.map(([lat, lon]) => ll2px(lat, lon));
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length; i++) {
        const prev = pts[i - 1], cur = pts[i];
        ctx.quadraticCurveTo((prev[0] + cur[0]) / 2 + (rand() - 0.5) * 10, (prev[1] + cur[1]) / 2 + (rand() - 0.5) * 10, cur[0], cur[1]);
      }
      ctx.strokeStyle = `rgba(200, 195, 180, ${range.brightness})`; ctx.lineWidth = range.width; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
      ctx.beginPath(); ctx.moveTo(pts[0][0] + 3, pts[0][1] + 3);
      for (let i = 1; i < pts.length; i++) { const prev = pts[i - 1], cur = pts[i]; ctx.quadraticCurveTo((prev[0] + cur[0]) / 2 + 3, (prev[1] + cur[1]) / 2 + 3, cur[0] + 3, cur[1] + 3); }
      ctx.strokeStyle = `rgba(30, 28, 25, ${range.brightness * 0.6})`; ctx.lineWidth = range.width * 0.7; ctx.stroke();
    }

    for (let i = 0; i < 30; i++) { const cx = rand() * W, cy = rand() * H; drawCrater(cx, cy, 25 + rand() * 35, rand() > 0.9, 0.2 + rand() * 0.2); }
    for (let i = 0; i < 400; i++) { const cx = rand() * W, cy = rand() * H; drawCrater(cx, cy, 8 + rand() * 20, false, 0.2 + rand() * 0.25); }
    for (let i = 0; i < 1200; i++) {
      const cx = rand() * W, cy = rand() * H, r = 3 + rand() * 7;
      ctx.beginPath(); ctx.arc(cx + lx * r * 0.1, cy + ly * r * 0.1, r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(30, 28, 25, ${rand() * 0.15 + 0.03})`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx - lx * r * 0.08, cy - ly * r * 0.08, r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(175, 168, 155, ${rand() * 0.15 + 0.04})`; ctx.lineWidth = 1; ctx.stroke();
    }
    for (let i = 0; i < 4000; i++) {
      const cx = rand() * W, cy = rand() * H, r = 1 + rand() * 3;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(40, 38, 35, ${rand() * 0.18 + 0.03})`; ctx.fill();
      ctx.beginPath(); ctx.arc(cx - lx * r * 0.3, cy - ly * r * 0.3, r * 0.6, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(185, 178, 165, ${rand() * 0.08 + 0.02})`; ctx.fill();
    }
    for (let i = 0; i < 6000; i++) {
      const cx = rand() * W, cy = rand() * H, r = 0.3 + rand() * 1.2;
      ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(50, 47, 42, ${rand() * 0.25 + 0.05})`; ctx.fill();
    }

    const imgData = ctx.getImageData(0, 0, W, H);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const n = (rand() - 0.5) * 14;
      imgData.data[i] = Math.max(0, Math.min(255, imgData.data[i] + n));
      imgData.data[i + 1] = Math.max(0, Math.min(255, imgData.data[i + 1] + n));
      imgData.data[i + 2] = Math.max(0, Math.min(255, imgData.data[i + 2] + n));
    }
    ctx.putImageData(imgData, 0, 0);

    const colorTex = new THREE.CanvasTexture(colorCanvas);
    colorTex.colorSpace = THREE.SRGBColorSpace;

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
        lum += fbm(nx + 50, ny + 50, 5, 2.2, 0.6) * 30;
        lum += (rand2() - 0.5) * 12;
        lum = Math.max(0, Math.min(255, lum));
        bData.data[idx] = lum; bData.data[idx + 1] = lum; bData.data[idx + 2] = lum;
      }
    }
    bctx.putImageData(bData, 0, 0);
    const bumpTex = new THREE.CanvasTexture(bumpCanvas);

    return { colorMap: colorTex, bumpMap: bumpTex };
  }, []);

  return (
    <>
      <mesh>
        <sphereGeometry args={[2, 256, 128]} />
        <meshStandardMaterial map={colorMap} bumpMap={bumpMap} bumpScale={0.04} roughness={0.95} metalness={0.02} />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.04, 64, 32]} />
        <meshBasicMaterial color="#8899bb" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </>
  );
}

// ── Scene ───────────────────────────────────────────────────────────────────

function Scene({
  setHoverItem,
  onTerritoryClick,
  highlightedTerritory,
  activeFilters,
}: {
  setHoverItem: (item: DetailItem) => void;
  onTerritoryClick: (t: Territory) => void;
  highlightedTerritory: string | null;
  activeFilters: Set<string>;
}) {
  const [hoveredTerritoryId, setHoveredTerritoryId] = useState<string | null>(null);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);

  const handleTerritoryHover = useCallback((t: Territory | null) => {
    setHoveredTerritoryId(t?.id ?? null);
    setHoverItem(t ? { kind: "territory", data: t } : null);
  }, [setHoverItem]);

  const handleLandmarkHover = useCallback((id: string | null) => {
    setHoveredPinId(id);
    if (id) {
      const lm = landmarks.find((l) => l.id === id);
      if (lm) setHoverItem({ kind: "landmark", data: lm });
    } else {
      setHoverItem(null);
    }
  }, [setHoverItem]);

  const handleClaimHover = useCallback((id: string | null) => {
    setHoveredPinId(id);
    if (id) {
      const fc = futureClaims.find((c) => c.id === id);
      if (fc) setHoverItem({ kind: "claim", data: fc });
    } else {
      setHoverItem(null);
    }
  }, [setHoverItem]);

  // Filter landmarks: exclude "geographic" type (already on texture), show others by active filter
  const visibleLandmarks = useMemo(() =>
    landmarks.filter((lm) => lm.type !== "geographic" && activeFilters.has(lm.type)),
    [activeFilters]
  );

  const showFutureClaims = activeFilters.has("future");
  const hasAnyLandmarkFilter = activeFilters.has("historic") || activeFilters.has("scientific") || activeFilters.has("rover");

  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 3, 5]} intensity={1.6} />
      <directionalLight position={[-3, -1, 2]} intensity={0.3} color="#aabbcc" />
      <pointLight position={[-5, -3, -5]} intensity={0.15} color="#667" />

      <group>
        <MoonMesh />

        {territories.map((t) => (
          <TerritoryMarker
            key={t.id}
            territory={t}
            onHover={handleTerritoryHover}
            onClick={onTerritoryClick}
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
            dimmed={hasAnyLandmarkFilter && !activeFilters.has(lm.type)}
          />
        ))}

        {showFutureClaims && futureClaims.map((fc) => (
          <FutureClaimPin
            key={fc.id}
            claim={fc}
            isHovered={hoveredPinId === fc.id}
            onHover={handleClaimHover}
            dimmed={false}
          />
        ))}
      </group>

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

// ── Detail Panel (rendered as DOM above the Canvas) ─────────────────────────

function DetailPanel({ item }: { item: DetailItem }) {
  if (!item) {
    return (
      <div className="h-20 flex items-center justify-center text-gray-500 text-sm">
        Hover over markers on the moon to see details
      </div>
    );
  }

  if (item.kind === "territory") {
    const t = item.data;
    return (
      <div className="flex items-start gap-4 p-3">
        <div className="w-3 h-3 rounded-full mt-1 shrink-0" style={{ backgroundColor: t.color }} />
        <div className="min-w-0">
          <h3 className="font-bold text-base leading-tight" style={{ color: t.color }}>
            {t.name}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5 italic">{t.tagline}</p>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs">
            <span className="text-gray-400">Plots: <span className="text-white font-medium">{t.totalPlots}</span></span>
            <span className="text-gray-400">Available: <span className="text-cosmic-teal font-medium">{t.totalPlots - t.claimedPlots}</span></span>
            <span className="text-gray-400">Price: <span className="text-amber font-medium">{t.priceRange}</span></span>
            <span className="text-gray-400">Terrain: <span className="text-white">{t.terrainType}</span></span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">Click marker to explore plots</p>
        </div>
      </div>
    );
  }

  if (item.kind === "landmark") {
    const lm = item.data;
    const pinColor = LANDMARK_COLORS[lm.type] || "#94A3B8";
    return (
      <div className="flex items-start gap-3 p-3">
        <span className="text-lg mt-0.5">{lm.icon}</span>
        <div className="min-w-0">
          <h3 className="font-bold text-sm leading-tight" style={{ color: pinColor }}>
            {lm.name}
          </h3>
          <p className="text-gray-300 text-xs mt-1 leading-relaxed">{lm.description}</p>
          {lm.year && (
            <span className="inline-block mt-1 text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ color: pinColor, background: `${pinColor}18` }}>
              {lm.year}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (item.kind === "claim") {
    const fc = item.data;
    const statusLabel = fc.status === "planned" ? "Planned" : fc.status === "announced" ? "Announced" : "Proposed";
    return (
      <div className="flex items-start gap-3 p-3">
        <div className="w-3 h-3 rotate-45 mt-1.5 shrink-0" style={{ backgroundColor: fc.color }} />
        <div className="min-w-0">
          <h3 className="font-bold text-sm leading-tight" style={{ color: fc.color }}>
            {fc.name}
          </h3>
          <p className="text-xs mt-0.5 font-medium" style={{ color: fc.color }}>{fc.entity}</p>
          <p className="text-gray-300 text-xs mt-1 leading-relaxed">{fc.description}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[10px] px-2 py-0.5 rounded-full border font-medium" style={{ borderColor: fc.color, color: fc.color }}>
              {statusLabel}
            </span>
            {fc.year && <span className="text-gray-500 text-[10px]">~{fc.year}</span>}
          </div>
        </div>
      </div>
    );
  }

  return null;
}

// ── Main export ──────────────────────────────────────────────────────────────

interface MoonGlobeProps {
  onTerritoryClick: (territory: Territory) => void;
}

type FilterCategory = "historic" | "scientific" | "rover" | "future";

const FILTER_BUTTONS: { key: FilterCategory; label: string; color: string; dot: "circle" | "diamond" }[] = [
  { key: "historic", label: "Apollo / Historic", color: LANDMARK_COLORS.historic, dot: "circle" },
  { key: "rover", label: "Rovers", color: LANDMARK_COLORS.rover, dot: "circle" },
  { key: "scientific", label: "Scientific", color: LANDMARK_COLORS.scientific, dot: "circle" },
  { key: "future", label: "Future Claims", color: "#A78BFA", dot: "diamond" },
];

export default function MoonGlobe({ onTerritoryClick }: MoonGlobeProps) {
  const [hoverItem, setHoverItem] = useState<DetailItem>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const [highlightedTerritory, setHighlightedTerritory] = useState<string | null>(null);

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
    setHighlightedTerritory((prev) => (prev === t.id ? null : t.id));
  }, []);

  return (
    <section id="globe" className="relative py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-heading">
            Explore the <span className="text-gradient-teal">Moon</span>
          </h2>
          <p className="mt-4 text-gray-400 text-lg max-w-2xl mx-auto">
            Click and drag to rotate. Scroll to zoom.
            Toggle categories below to show markers.
          </p>
        </div>

        {/* Detail panel above the globe */}
        <div className="max-w-3xl mx-auto mb-4">
          <div className="glass rounded-xl min-h-[80px] border border-white/5 flex items-center">
            <DetailPanel item={hoverItem} />
          </div>
        </div>

        {/* Globe — much larger */}
        <div className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden" style={{ aspectRatio: "1 / 1" }}>
          <div className="absolute inset-0 bg-gradient-radial from-cosmic-teal/5 via-transparent to-transparent pointer-events-none z-10" />

          <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }}>
            <Scene
              setHoverItem={setHoverItem}
              onTerritoryClick={onTerritoryClick}
              highlightedTerritory={highlightedTerritory}
              activeFilters={activeFilters}
            />
          </Canvas>
        </div>

        {/* Territory legend — clickable to highlight on globe */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {territories.map((t) => {
            const active = highlightedTerritory === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleTerritoryLegendClick(t)}
                className={`rounded-lg px-4 py-2 flex items-center gap-2 transition-all cursor-pointer border ${
                  active
                    ? "border-white/40 bg-white/10"
                    : "glass hover:border-white/30"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full transition-transform"
                  style={{
                    backgroundColor: t.color,
                    transform: active ? "scale(1.3)" : "scale(1)",
                    boxShadow: active ? `0 0 8px ${t.color}` : "none",
                  }}
                />
                <span className={`text-sm ${active ? "text-white font-medium" : "text-gray-300"}`}>
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Category filter buttons — toggle markers on/off */}
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          {FILTER_BUTTONS.map((fb) => {
            const active = activeFilters.has(fb.key);
            return (
              <button
                key={fb.key}
                onClick={() => toggleFilter(fb.key)}
                className={`rounded-lg px-3 py-1.5 flex items-center gap-2 transition-all cursor-pointer border ${
                  active
                    ? "border-white/40 bg-white/10"
                    : "glass hover:border-white/20 opacity-60 hover:opacity-100"
                }`}
              >
                {fb.dot === "circle" ? (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: fb.color,
                      boxShadow: active ? `0 0 6px ${fb.color}` : "none",
                    }}
                  />
                ) : (
                  <div
                    className="w-2 h-2 rotate-45"
                    style={{
                      background: fb.color,
                      boxShadow: active ? `0 0 6px ${fb.color}` : "none",
                    }}
                  />
                )}
                <span className={`text-xs ${active ? "text-white" : "text-gray-400"}`}>
                  {fb.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
