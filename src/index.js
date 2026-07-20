import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FinanceProvider } from './context/FinanceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FinanceProvider>
    <App />
  </FinanceProvider>
);