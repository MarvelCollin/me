import './styles/background.css';
import HeroSection from './components/hero-section';
import WorkSection from './components/work-section';
import './App.css';

function App() {
  return (
    <main>
      <div className="app-background" />
      <div className="app-grid-overlay" />
      <div className="app-noise-overlay" />
      <HeroSection />
      <WorkSection />
    </main>
  );
}

export default App;
