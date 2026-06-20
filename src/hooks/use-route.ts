import { useState, useEffect } from 'react';

export function useRoute(): string {
  const get = () => location.pathname || '/';
  const [r, setR] = useState(get);
  useEffect(() => {
    const onChange = () => setR(get());
    window.addEventListener('popstate', onChange);
    window.addEventListener('locationchange', onChange);
    return () => {
      window.removeEventListener('popstate', onChange);
      window.removeEventListener('locationchange', onChange);
    };
  }, []);
  return r;
}
