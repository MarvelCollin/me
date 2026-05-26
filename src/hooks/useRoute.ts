import { useState, useEffect } from 'react';

export function useRoute(): string {
  const get = () => (location.hash.replace('#', '') || '/').replace(/^\/+/, '/');
  const [r, setR] = useState(get);
  useEffect(() => {
    const onH = () => setR(get());
    window.addEventListener('hashchange', onH);
    return () => window.removeEventListener('hashchange', onH);
  }, []);
  return r;
}
