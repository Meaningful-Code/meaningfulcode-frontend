import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import SubmitProject from './SubmitProject';

describe('Page: SubmitProject', () => {
  it('renders', async () => {
    render(<SubmitProject />);
  });

  it('sets title', async () => {
    render(<SubmitProject />);

    expect(document.title).toContain('Submit');
  });
});
