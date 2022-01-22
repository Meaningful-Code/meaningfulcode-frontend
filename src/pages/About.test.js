import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import About from './About';

Enzyme.configure({ adapter: new Adapter() });

describe('Page: About', () => {
  it('renders without crashing', () => {
    shallow(<About />);
  });
});
