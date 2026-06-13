import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { ContentProvider } from './content/store.tsx';
import { initNavInterception } from './utils/nav.ts';

initNavInterception();

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </StrictMode>,
);
