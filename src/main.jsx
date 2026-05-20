import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

/* Silence known deprecation warnings */
if (import.meta.env.DEV) {
  const _warn = console.warn.bind(console);
  console.warn = (...args) => {
    const msg = String(args[0]);
    if (msg.includes('THREE.Clock'))      return;
    if (msg.includes('PCFSoftShadowMap')) return;
    _warn(...args);
  };
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);