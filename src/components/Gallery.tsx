import { useEffect, useState } from 'react';
import { img } from '../lib/img';
import { Clip } from './Clip';

const PHOTO_W = 140;
const FRAME_W = PHOTO_W + 16;
const PHOTO_H = Math.round((PHOTO_W * 3) / 4) + 16;
const GAP = 38;
const SPACING = FRAME_W + GAP;
const BASE_Y = 30;
const SAG = 26;
const ROT = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-1', 'rotate-1'];

function Lightbox({
  images,
  captions,
  name,
  index,
  onClose,
  onNav,
}: {
  images: string[];
  captions: string[];
  name: string;
  index: number;
  onClose: () => void;
  onNav: (d: number) => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') onNav(1);
      else if (e.key === 'ArrowLeft') onNav(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onNav]);

  const caption = captions[index];
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 max-[560px]:p-4" role="dialog" aria-modal="true">
      <button className="lb-fade absolute inset-0 cursor-zoom-out bg-[rgba(8,8,7,0.84)]" aria-label="Close" onClick={onClose} />
      {images.length > 1 && (
        <>
          <button
            className="absolute left-5 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(233,227,214,0.12)] text-[22px] text-fg transition-colors hover:bg-[rgba(233,227,214,0.24)]"
            onClick={() => onNav(-1)}
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            className="absolute right-5 top-1/2 z-[3] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(233,227,214,0.12)] text-[22px] text-fg transition-colors hover:bg-[rgba(233,227,214,0.24)]"
            onClick={() => onNav(1)}
            aria-label="Next image"
          >
            ›
          </button>
        </>
      )}
      <div key={index} className="lb-pop relative z-[2]">
        <div className="bg-[#e9e3d6] p-[18px] shadow-[0_40px_90px_-24px_rgba(0,0,0,0.9)] max-[560px]:p-3">
          <div className="relative overflow-hidden bg-bg-2">
            <img className="block max-h-[78vh] max-w-[86vw] object-contain" src={img(images[index], 1600)} alt={caption || name} />
          </div>
          <div className="px-1 pt-3 text-center font-hand text-[27px] leading-tight text-[#2a2620]">{caption || name}</div>
        </div>
        <button
          className="absolute -right-3 -top-3 z-[3] flex h-9 w-9 items-center justify-center rounded-full bg-[#e9e3d6] text-[20px] leading-none text-[#2a2620] shadow-[0_6px_16px_-4px_rgba(0,0,0,0.6)] transition-transform hover:scale-110"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
}

export function Gallery({ images, captions, name }: { images: string[]; captions: string[]; name: string }) {
  const [zoom, setZoom] = useState<number | null>(null);
  if (images.length === 0) return null;

  const n = images.length;
  const lineW = Math.max((n + 1) * SPACING, 520);
  const boxH = BASE_Y + SAG + PHOTO_H + 40;
  const points = images.map((_, j) => {
    const t = (j + 1) / (n + 1);
    return { x: t * lineW, y: BASE_Y + 4 * SAG * t * (1 - t) };
  });

  return (
    <div className="mx-auto max-w-[1320px] px-10 py-[60px] max-[900px]:px-[22px] max-[900px]:py-[30px]">
      <div className="rounded-2xl bg-[radial-gradient(rgba(255,255,255,0.028)_1px,transparent_1px)] [background-size:22px_22px] px-4 py-6 sm:px-8">
        <div className="overflow-x-auto">
          <div className="relative mx-auto" style={{ width: lineW, height: boxH }}>
            <svg className="pointer-events-none absolute inset-0" width={lineW} height={boxH} viewBox={`0 0 ${lineW} ${boxH}`} preserveAspectRatio="none" aria-hidden="true">
              <path d={`M0 ${BASE_Y} Q ${lineW / 2} ${BASE_Y + 2 * SAG} ${lineW} ${BASE_Y}`} fill="none" stroke="#6f6450" strokeWidth="2.6" strokeLinecap="round" />
              <path d={`M0 ${BASE_Y} Q ${lineW / 2} ${BASE_Y + 2 * SAG} ${lineW} ${BASE_Y}`} fill="none" stroke="#c5b896" strokeWidth="1" strokeLinecap="round" />
              <circle cx="0" cy={BASE_Y} r="4" fill="#231f1a" />
              <circle cx={lineW} cy={BASE_Y} r="4" fill="#231f1a" />
            </svg>

            {images.map((src, j) => (
              <button
                type="button"
                key={j}
                onClick={() => setZoom(j)}
                aria-label={'Enlarge image ' + (j + 1)}
                className={
                  'group/thumb absolute block origin-top cursor-zoom-in transition-transform duration-300 ease-out hover:-translate-y-1.5 hover:rotate-0 ' +
                  ROT[j % ROT.length]
                }
                style={{ left: points[j].x - FRAME_W / 2, top: points[j].y }}
              >
                <Clip className="absolute left-1/2 top-[-19px] z-20 h-[36px] w-[18px] -translate-x-1/2 drop-shadow-[0_3px_4px_rgba(0,0,0,0.45)]" />
                <span
                  className="block bg-[#e9e3d6] p-2 shadow-[0_16px_28px_-14px_rgba(0,0,0,0.78)] transition-shadow duration-300 group-hover/thumb:shadow-[0_28px_48px_-16px_rgba(0,0,0,0.85)]"
                  style={{ width: FRAME_W }}
                >
                  <span className="relative block aspect-[4/3] overflow-hidden bg-bg-2">
                    <img className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-105" src={img(src, 600)} alt={captions[j] || name} loading="lazy" decoding="async" />
                  </span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {zoom !== null && (
        <Lightbox
          images={images}
          captions={captions}
          name={name}
          index={zoom}
          onClose={() => setZoom(null)}
          onNav={(d) => setZoom((z) => (z === null ? z : (z + d + n) % n))}
        />
      )}
    </div>
  );
}
