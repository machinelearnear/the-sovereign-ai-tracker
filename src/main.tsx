import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SovereignAIList } from './sovereignAI';
import About from './pages/About';
import Contribute from './pages/Contribute';
import { ThemeProvider } from './components/ThemeContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SovereignAIList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
