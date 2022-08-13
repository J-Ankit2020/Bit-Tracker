import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'react-alice-carousel/lib/alice-carousel.css';
import App from './App';
import CryptoContextProvider from './CryptoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CryptoContextProvider>
    <App />
  </CryptoContextProvider>
);