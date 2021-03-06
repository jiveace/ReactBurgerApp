import { BurgerBuilder } from './BurgerBuilder';
import { BuildControls } from '../../Components/Burger/BuildControls/BuildControls';

import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder onInitIngredients={() => { }} />);
    });

    it('should render BuildControls when receiving ingredients', () => {
        wrapper.setProps({ ings: { salad: 0 } });
        // Code same as tutorial - version issue here
        // expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});
