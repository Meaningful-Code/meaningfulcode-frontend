import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';

import createDefaultTheme from '../theme/createDefaultTheme';

import CategoryButton from './CategoryButton';

describe('Component: CategoryButton', () => {
  it('links target URL', async () => {
    const targetURL = '/mycategory';
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <CategoryButton category="all" active={false} targetUrl={targetURL} />
      </ThemeProvider>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', targetURL);
  });

  it('is h1 if active', async () => {
    const name = 'mycategory';
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <CategoryButton category={name} active targetUrl="/abc" />
      </ThemeProvider>
    );

    expect(screen.getByRole('heading')).toBeDefined();
    expect(screen.getByRole('heading').nodeName).toBe('H1');
    expect(screen.getByRole('heading')).toHaveTextContent(name);
  });

  it('is not h1 if inactive', async () => {
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <CategoryButton category="all" active={false} targetUrl="/abc" />
      </ThemeProvider>
    );

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
