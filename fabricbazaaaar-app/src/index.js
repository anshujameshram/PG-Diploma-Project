import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './api-client/GlobalProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </GlobalProvider>
);


reportWebVitals();
