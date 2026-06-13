import { useState } from 'react';
import { img } from '../lib/img';

export function Gallery({ images, captions, name }: { images: string[]; captions: string[]; name: string }) {
  const [active, setActive] = useState(0);
  if (images.length === 0) return null;
  const i = Math.min(active, images.length - 1);
  const caption = captions[i];

  return (
    <div className="gallery">
      <div className="gallery-main">
        <img src={img(images[i], 1600)} alt={caption || name} loading="lazy" decoding="async" />
        <span className="gallery-cap">{String(i + 1).padStart(2, '0')} · {caption || name}</span>
      </div>
      {images.length > 1 && (
        <div className="gallery-thumbs">
          {images.map((src, j) => (
            <button
              type="button"
              key={j}
              className={j === i ? 'on' : ''}
              onClick={() => setActive(j)}
              aria-label={'View image ' + (j + 1)}
            >
              <img src={img(src, 500)} alt="" loading="lazy" decoding="async" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
