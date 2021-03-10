import React from 'react';
import { mount } from 'enzyme';
import MainContainer from '.';
import Routes from '../Routes';
import { Box } from '@material-ui/core';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<MainContainer />', () => {
  Enzyme.configure({ adapter: new Adapter() });
  let wrapper;

  it('should render Routes components', () => {
    wrapper = mount( <MainContainer />);
    expect(wrapper.find(Box).find(Routes).exists()).toEqual(false);
  });
});
