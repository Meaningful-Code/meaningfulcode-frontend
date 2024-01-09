import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import createDefaultTheme from '../theme/createDefaultTheme';

import CategoryButton from './CategoryButton';

describe('Component: CategoryButton', () => {
  it('links target URL', async () => {
    const targetURL = '/mycategory';
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <MemoryRouter>
          <CategoryButton category="all" active={false} targetUrl={targetURL} />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', targetURL);
  });

  it('is h1 if active', async () => {
    const name = 'mycategory';
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <MemoryRouter>
          <CategoryButton category={name} active targetUrl="/abc" />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.getByRole('heading')).toBeDefined();
    expect(screen.getByRole('heading').nodeName).toBe('H1');
    expect(screen.getByRole('heading')).toHaveTextContent(name);
  });

  it('is not h1 if inactive', async () => {
    render(
      <ThemeProvider theme={createDefaultTheme()}>
        <MemoryRouter>
          <CategoryButton category="all" active={false} targetUrl="/abc" />
        </MemoryRouter>
      </ThemeProvider>
    );

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
