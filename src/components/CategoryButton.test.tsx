import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

import CategoryButton from './CategoryButton';

describe('Component: CategoryButton', () => {
  it('links target URL', async () => {
    const targetURL = '/mycategory';
    render(
      <MemoryRouter>
        <CategoryButton category="all" active={false} targetUrl={targetURL} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', targetURL);
  });

  it('is h1 if active', async () => {
    const name = 'mycategory';
    render(
      <MemoryRouter>
        <CategoryButton category={name} active targetUrl="/abc" />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading')).toBeDefined();
    expect(screen.getByRole('heading').nodeName).toBe('H1');
    expect(screen.getByRole('heading')).toHaveTextContent(name);
  });

  it('is not h1 if inactive', async () => {
    render(
      <MemoryRouter>
        <CategoryButton category="all" active={false} targetUrl="/abc" />
      </MemoryRouter>
    );

    expect(screen.queryByRole('heading')).toBeNull();
  });
});
