import { useState } from 'react';
import { img } from '../lib/img';

export function Gallery({ images, captions, name }: { images: string[]; captions: string[]; name: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const i = Math.min(active, images.length - 1);
  const caption = captions[i];

  return (
    <div className="mx-auto max-w-[1320px] px-10 py-[60px] max-[900px]:px-[22px] max-[900px]:py-[30px]">
      <div className="relative aspect-[16/9] overflow-hidden rounded-[10px] border border-line bg-bg-2">
        <img className="block h-full w-full object-contain" src={img(images[i], 1600)} alt={caption || name} loading="lazy" decoding="async" />
        <span className="absolute bottom-[14px] left-4 font-sans text-[11px] uppercase tracking-[0.11em] text-[rgba(247,244,234,0.88)] [text-shadow:0_1px_8px_rgba(0,0,0,0.55)]">
          {String(i + 1).padStart(2, '0')} · {caption || name}
        </span>
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3 max-[900px]:grid-cols-3">
          {images.map((src, j) => (
            <button
              type="button"
              key={j}
              className={
                'aspect-[4/3] overflow-hidden rounded-lg border bg-bg-2 p-0 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-muted ' +
                (j === i ? 'border-accent' : 'border-line')
              }
              onClick={() => setActive(j)}
              aria-label={'View image ' + (j + 1)}
            >
              <img className="block h-full w-full object-contain" src={img(src, 500)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
