import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import './index.css'; 
import { NutritionProvider } from './context/NutritionContext.js';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NutritionProvider>
      <App />
      <Toaster position="top-right" /> {/* Global Toaster for notifications */}
    </NutritionProvider>
  </React.StrictMode>
);
