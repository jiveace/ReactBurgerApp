import React, {Component} from 'react';

import Aux from '../../hoc/Auxhilliary'
import Burger from "../../Components/Burger/Burger";

class BurgerBuilder extends Component {
  render() {
    return (
        <Aux>
          <Burger />
          <div>Build Control</div>
        </Aux>
    );
  }
}

export default BurgerBuilder