import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import createDefaultTheme from '../theme/createDefaultTheme';

import PageHeader from './Header';

describe('PageHeader Component', () => {
    beforeEach(() => {
      render(
        <ThemeProvider theme={createDefaultTheme()}>
          <Router>
            <PageHeader />
          </Router>
        </ThemeProvider>
      );
    });

  it('should render the header with logo and title', () => {
    expect(screen.getByRole('banner')).toBeInTheDocument();

    const logo = screen.getByAltText('logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/meaningfulcode-logo.png');

    const title = screen.getByText('Meaningful Code');
    expect(title).toBeInTheDocument();
  });

  it('should render navigation links', () => {
    const addProjectButton = screen.getByRole('link', { name: /add a project!/i });
    expect(addProjectButton).toBeInTheDocument();
    expect(addProjectButton).toHaveAttribute('href', '/submit-project');

    const getStartedButton = screen.getByRole('link', { name: /get started/i });
    expect(getStartedButton).toBeInTheDocument();
    expect(getStartedButton).toHaveAttribute('href', '/get-started');

    const aboutButton = screen.getByRole('link', { name: /about/i });
    expect(aboutButton).toBeInTheDocument();
    expect(aboutButton).toHaveAttribute('href', '/about');
  });
});
