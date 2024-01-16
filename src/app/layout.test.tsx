import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import { App } from './layout';

describe('RootLayout', () => {
  it('renders', async () => {
    render(<App>Hello</App>);
  });
});
