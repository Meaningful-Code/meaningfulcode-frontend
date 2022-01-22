import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Icon } from 'semantic-ui-react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import CategoryIcon from './CategoryIcon';
import { categories } from '../projects/projects';

Enzyme.configure({ adapter: new Adapter() });

describe('Component: CategoryIcon', () => {
  test.each(categories)('category "%s" does not crash', (category) => {
    shallow(<CategoryIcon type={category} />);
  });

  it('works with invalid category', () => {
    const wrapper = shallow(<CategoryIcon type="123abc" />);

    expect(wrapper.find(Icon).prop('color')).toBe('black');
    expect(wrapper.find(Icon).prop('name')).toBe('question');
  });
});
