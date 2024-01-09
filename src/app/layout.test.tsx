import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import RootLayout from './layout';

describe('RootLayout', () => {
  it('renders', async () => {
    render(<RootLayout>Hello</RootLayout>);
  });
});
