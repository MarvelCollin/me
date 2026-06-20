import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app';
import { ContentProvider } from './content';
import { initNavInterception } from './utils/nav';

initNavInterception();

createRoot(document.getElementById('app')!).render(
  <StrictMode>
    <ContentProvider>
      <App />
    </ContentProvider>
  </StrictMode>,
);
