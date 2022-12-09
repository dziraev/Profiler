import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './static/scss/fonts.scss';
import './static/scss/global.scss';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
