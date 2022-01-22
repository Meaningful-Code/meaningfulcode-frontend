import React from 'react';
import Enzyme, { mount, render } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import App from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders without crashing', () => {
    mount(<App />);
  });

  it('renders with default header', () => {
    const rendered = render(<App />);

    expect(rendered.find('h1').text()).toMatch(/^Meaningful Code/);
  });
});
