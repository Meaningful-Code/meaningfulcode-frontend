import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme } from '@/theme';

import { NextIntlClientProvider } from 'next-intl';
import enMessages from '../../../messages/en.json';
import SubmitProject from './page';

const render = (ui: JSX.Element, options = {}) =>
  rtlRender(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>
    </NextIntlClientProvider>,
    options
  );

describe('Page: SubmitProject', () => {
  it('renders', async () => {
    render(<SubmitProject />);
  });
});
