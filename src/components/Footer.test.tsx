import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('should render the footer with social links', () => {
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText(/Support these projects: Share!/i)).toBeInTheDocument();
  });

  it('should render social media buttons with correct links and attributes', () => {
    // Twitter Button
    const twitterButton = screen.getByRole('link', { name: /twitter/i });
    expect(twitterButton).toBeInTheDocument();
    expect(twitterButton).toHaveAttribute('href', expect.stringContaining('twitter.com/intent/tweet'));
    expect(twitterButton).toHaveAttribute('target', '_blank');

    // LinkedIn Button
    const linkedInButton = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedInButton).toBeInTheDocument();
    expect(linkedInButton).toHaveAttribute('href', expect.stringContaining('linkedin.com/shareArticle'));
    expect(linkedInButton).toHaveAttribute('target', '_blank');

    // Reddit Button
    const redditButton = screen.getByRole('link', { name: /reddit/i });
    expect(redditButton).toBeInTheDocument();
    expect(redditButton).toHaveAttribute('href', expect.stringContaining('reddit.com/submit'));
    expect(redditButton).toHaveAttribute('target', '_blank');
  });

  it('should render social media icons within buttons', () => {
    // Twitter Icon
    const twitterIcon = screen.getByTestId('TwitterIcon');
    expect(twitterIcon).toBeInTheDocument();

    // LinkedIn Icon
    const linkedInIcon = screen.getByTestId('LinkedInIcon'); 
    expect(linkedInIcon).toBeInTheDocument();

    // Reddit Icon
    const redditIcon = screen.getByTestId('RedditIcon');
    expect(redditIcon).toBeInTheDocument();
  });
});
