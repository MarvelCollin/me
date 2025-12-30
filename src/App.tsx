import './styles/background.css';
import HeroSection from './components/hero-section';
import WorkSection from './components/work-section';
import Background from './components/background';
import './App.css';

import { useSoftSnap } from './hooks/use-soft-snap';

function App() {
  useSoftSnap();
  return (
    <>
      <Background />
      <main>
        <HeroSection />
        <WorkSection />
      </main>
    </>
  );
}

export default App;
