import React, {Component} from 'react';

import Aux from '../../hoc/Auxhilliary'
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 1,
    }
  }

  render() {
    return (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls />
        </Aux>
    );
  }
}

export default BurgerBuilder