import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';

import ThemeRegistry from './ThemeRegistry/ThemeRegistry';

import CategoryButton from './CategoryButton';

describe('Component: CategoryButton', () => {
  it('links target URL', async () => {
    const targetURL = '/mycategory';
    render(
      <ThemeRegistry>
        <CategoryButton category="all" active={false} targetUrl={targetURL} />
      </ThemeRegistry>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', targetURL);
  });

  it('is h1 if active', async () => {
    const name = 'mycategory';
    render(
      <ThemeRegistry>
        <CategoryButton category={name} active targetUrl="/abc" />
      </ThemeRegistry>
    );

    expect(screen.getByRole('heading')).toBeDefined();
    expect(screen.getByRole('heading').nodeName).toBe('H1');
    expect(screen.getByRole('heading')).toHaveTextContent(name);
  });

  it('is not h1 if inactive', async () => {
    render(
      <ThemeRegistry>
        <CategoryButton category="all" active={false} targetUrl="/abc" />
      </ThemeRegistry>
    );

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
