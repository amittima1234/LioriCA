import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import App from './components/app';

const element = document.getElementById('root');
const root = createRoot(element);

root.render(<App />);
