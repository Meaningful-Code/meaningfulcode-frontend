import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SubmitProject from './page';

describe('Page: SubmitProject', () => {
  it('renders', async () => {
    render(<SubmitProject />);
  });
});
