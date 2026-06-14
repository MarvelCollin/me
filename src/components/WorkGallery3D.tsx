import { useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image } from '@react-three/drei';
import * as THREE from 'three';
import type { Project } from '../types';
import { img } from '../lib/img';
import { navigate } from '../utils/nav';

const TONE_HEX: Record<string, string> = {
  warm: '#8a6f2a',
  sage: '#5c6a42',
  vermillion: '#8a4232',
  slate: '#5a6478',
  gold: '#86682c',
  paper: '#6f6a55',
  ocean: '#3f5f78',
  rose: '#7a5350',
  navy: '#3e526a',
  plum: '#664758',
};

const CARD_W = 2.3;
const CARD_H = 3.05;
const V_GAP = 3.9;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function tileTexture(name: string, color: string): THREE.CanvasTexture {
  const w = 512;
  const h = 680;
  const cv = document.createElement('canvas');
  cv.width = w;
  cv.height = h;
  const ctx = cv.getContext('2d') as CanvasRenderingContext2D;
  const base = ctx.createLinearGradient(0, 0, w, h);
  base.addColorStop(0, color);
  base.addColorStop(1, '#0e0d0b');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, w, h);
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.4, 30, w * 0.5, h * 0.4, w * 0.85);
  glow.addColorStop(0, 'rgba(255,255,255,0.16)');
  glow.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#f7f4ea';
  ctx.font = '700 58px "Hanken Grotesk", system-ui, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(name, 36, h - 44, w - 72);
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function Card({
  p,
  i,
  n,
  progressRef,
}: {
  p: Project;
  i: number;
  n: number;
  progressRef: { current: number };
}) {
  const ref = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const baseX = Math.sin(i * 0.9 + 1.0) * 1.5;
  const baseZ = Math.cos(i * 0.6 + 0.5) * 0.5;
  const baseRY = -0.16 + Math.sin(i * 1.3) * 0.05;
  const baseRZ = Math.sin(i * 2) * 0.045;
  const tex = useMemo(
    () => (p.cover ? null : tileTexture(p.name, TONE_HEX[p.tone] || TONE_HEX.warm)),
    [p.cover, p.name, p.tone],
  );

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = Math.min(1, dt * 7);
    const targetY = progressRef.current * (n - 1) * V_GAP - i * V_GAP;
    g.position.y = lerp(g.position.y, targetY, Math.min(1, dt * 12));
    g.position.x = lerp(g.position.x, hovered ? baseX * 0.6 : baseX, k);
    g.position.z = lerp(g.position.z, hovered ? 1.4 : baseZ, k);
    g.rotation.x = lerp(g.rotation.x, hovered ? 0 : 0.07, k);
    g.rotation.y = lerp(g.rotation.y, hovered ? 0 : baseRY, k);
    g.rotation.z = lerp(g.rotation.z, hovered ? 0 : baseRZ, k);
    const s = hovered ? 1.06 : 1;
    g.scale.x = lerp(g.scale.x, s, k);
    g.scale.y = lerp(g.scale.y, s, k);
    g.scale.z = lerp(g.scale.z, s, k);
  });

  return (
    <group
      ref={ref}
      position={[baseX, -i * V_GAP, baseZ]}
      rotation={[0.07, baseRY, baseRZ]}
      onClick={(e) => {
        e.stopPropagation();
        navigate('/work/' + p.slug);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      {p.cover ? (
        <Image url={img(p.cover) as string} scale={[CARD_W, CARD_H] as [number, number]} toneMapped={false} />
      ) : (
        <mesh>
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={tex as THREE.CanvasTexture} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function ProgressUpdater({
  wrapRef,
  progressRef,
}: {
  wrapRef: { current: HTMLDivElement | null };
  progressRef: { current: number };
}) {
  useFrame(() => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    progressRef.current = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
  });
  return null;
}

export function WorkGallery3D({ projects }: { projects: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const n = Math.max(projects.length, 1);

  return (
    <>
      <div ref={wrapRef} aria-hidden="true" style={{ height: `${n * 78 + 40}vh` }} />
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8.4], fov: 40 }} gl={{ antialias: true, alpha: true }} dpr={[1, 2]}>
          <ProgressUpdater wrapRef={wrapRef} progressRef={progressRef} />
          <ambientLight intensity={1} />
          <Suspense fallback={null}>
            {projects.map((p, i) => (
              <Card key={p.slug} p={p} i={i} n={n} progressRef={progressRef} />
            ))}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
