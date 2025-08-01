import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SovereignAICountryView } from './components/SovereignAICountryView';
import About from './pages/About';
import Contribute from './pages/Contribute';
import { ThemeProvider } from './components/ThemeContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<SovereignAICountryView />} />
            <Route path="/about" element={<About />} />
            <Route path="/contribute" element={<Contribute />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
