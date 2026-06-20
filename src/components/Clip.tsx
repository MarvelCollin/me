export function ClipDefs() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <defs>
        <linearGradient id="clipWood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#bf9759" />
          <stop offset="0.4" stopColor="#edd49d" />
          <stop offset="0.62" stopColor="#dfbf83" />
          <stop offset="1" stopColor="#ad8447" />
        </linearGradient>
        <linearGradient id="clipSpring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#d2d6db" />
          <stop offset="1" stopColor="#7a8088" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Clip({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 56" fill="none" aria-hidden="true">
      <path
        d="M6 3 C6 1 18 1 18 3 L18 22 C20 25 20 28 18 31 L18 52 C18 55 6 55 6 52 L6 31 C4 28 4 25 6 22 Z"
        fill="url(#clipWood)"
        stroke="#9c7838"
        strokeWidth="0.6"
      />
      <path d="M12 4 L12 52" stroke="#9c7838" strokeWidth="0.7" opacity="0.4" />
      <circle cx="12" cy="26" r="4.2" stroke="url(#clipSpring)" strokeWidth="1.7" fill="none" />
    </svg>
  );
}
