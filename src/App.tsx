import { useState } from 'react';
import './styles/background.css';
import HeroSection from './components/hero-section';
import WorkSection from './components/work-section';
import WorkDetail from './components/work-detail';
import Background from './components/background';
import './App.css';
import type { Work } from './content/site-content';
import { useSoftSnap } from './hooks/use-soft-snap';

function App() {
  useSoftSnap();
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  return (
    <>
      <Background />
      <main>
        {selectedWork ? (
          <WorkDetail work={selectedWork} onBack={() => setSelectedWork(null)} />
        ) : (
          <>
            <HeroSection />
            <WorkSection onWorkClick={setSelectedWork} />
          </>
        )}
      </main>
    </>
  );
}

export default App;
