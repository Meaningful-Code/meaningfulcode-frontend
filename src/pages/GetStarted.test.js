import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import GetStarted from './GetStarted';

Enzyme.configure({ adapter: new Adapter() });

describe('Page: GetStarted', () => {
  it('renders without crashing', () => {
    shallow(<GetStarted />);
  });
});
