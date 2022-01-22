import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import Main from './Main';
import CategoryMenu from './main/CategoryMenu';
import { categories } from '../projects/projects';

Enzyme.configure({ adapter: new Adapter() });

describe('Page: Main', () => {
  it('renders without crashing', () => {
    mount(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );
  });

  test.each(categories)('category "%s" path selects category', (category) => {
    const wrapper = mount(
      <MemoryRouter initialEntries={[`/${category}`]}>
        <Main />
      </MemoryRouter>
    );

    expect(wrapper.find(CategoryMenu).prop('category')).toBe(category);
  });
});
