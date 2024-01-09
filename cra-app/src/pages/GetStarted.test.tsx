import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import GetStarted from './GetStarted';

describe('Page: GetStarted', () => {
  it('renders', async () => {
    render(<GetStarted />);
  });

  it('sets title', async () => {
    render(<GetStarted />);

    expect(document.title).toContain('Getting started');
  });
});
