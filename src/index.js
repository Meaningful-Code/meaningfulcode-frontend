import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';

ReactGA.initialize('UA-177770802-1');
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));