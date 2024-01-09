import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import GetStarted from './page';

describe('Page: GetStarted', () => {
  it('renders', async () => {
    render(<GetStarted />);
  });
});
