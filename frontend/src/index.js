import React from 'react';
import ReactDOM from 'react-dom/client'; // Usamos createRoot
import App from './App';
import process from 'process';
window.process = process;



const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot para React 18
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
