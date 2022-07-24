import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import About from './About';

describe('Page: GetStarted', () => {
  it('renders', async () => {
    render(<About />);
  });
});
