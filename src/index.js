import React from 'react';
import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga';

import App from './App';

ReactGA.initialize('UA-177770802-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const root = createRoot(document.getElementById('root'));
root.render(<App />);
