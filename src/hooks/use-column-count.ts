import { useEffect, useState } from 'react';

export function useColumnCount(): number {
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const calc = () => setCols(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);
  return cols;
}
