import { useState, useEffect } from 'react';
import { useRoute } from './hooks/useRoute';
import { parseRoute, runTransition } from './utils/routes';
import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { ProjectDetail } from './pages/ProjectDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';

function App() {
  const route = useRoute();
  const [renderRoute, setRenderRoute] = useState(route);

  useEffect(() => {
    const parsed = parseRoute(route);
    document.querySelectorAll('[data-route]').forEach(a => {
      const r = a.getAttribute('data-route');
      const isActive =
        (r === '/work' && (parsed.kind === 'work' || parsed.kind === 'project')) ||
        (r === '/about' && parsed.kind === 'about') ||
        (r === '/contact' && parsed.kind === 'contact') ||
        (r === '/' && parsed.kind === 'home');
      a.classList.toggle('active', isActive);
    });
  }, [route]);

  useEffect(() => {
    if (route === renderRoute) return;
    runTransition(route).then(() => {
      setRenderRoute(route);
      window.scrollTo(0, 0);
    });
  }, [route, renderRoute]);

  const parsed = parseRoute(renderRoute);
  if (parsed.kind === 'project') return <ProjectDetail slug={parsed.slug} />;
  if (parsed.kind === 'work') return <Work />;
  if (parsed.kind === 'about') return <About />;
  if (parsed.kind === 'contact') return <Contact />;
  if (parsed.kind === 'admin') return <Admin />;
  return <Home />;
}

export default App;
