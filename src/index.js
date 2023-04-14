import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {
  ChipSelectionProvider,
  UserInputProvider,
} from './context/SelectionContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChipSelectionProvider>
      <UserInputProvider>
        <App />
      </UserInputProvider>
    </ChipSelectionProvider>
  </React.StrictMode>
);

// //  log the memory usage in MB every ten seconds
// setInterval(() => {
//   const { usedJSHeapSize, jsHeapSizeLimit } = window.performance.memory;
//   const usedMemory = Math.round(usedJSHeapSize / (1024 * 1024));
//   const totalMemory = Math.round(jsHeapSizeLimit / (1024 * 1024));
//   const memoryUsage = `${usedMemory} MB out of ${totalMemory} MB`;
//   console.log(`Memory usage: ${memoryUsage}`);
// }, 10000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
