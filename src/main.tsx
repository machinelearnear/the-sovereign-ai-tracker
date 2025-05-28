import React from 'react';
import ReactDOM from 'react-dom/client';
import { SovereignAIList } from './sovereignAI';
import { ThemeProvider } from './components/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SovereignAIList />
    </ThemeProvider>
  </React.StrictMode>,
);
