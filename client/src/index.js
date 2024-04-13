import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from './ThemeContext';
import './global.css'
import { TaskContextProvider } from './utils/taskContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   <TaskContextProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
   </TaskContextProvider>
  </React.StrictMode>
);


