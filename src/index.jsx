import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import './static/scss/global.scss';
import './static/scss/fonts.scss';
import './static/scss/variables.scss';

const root = createRoot(document.getElementById('root'));

root.render(<App />);
