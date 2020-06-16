import React, {Component} from 'react';

import Aux from '../../hoc/Auxhilliary'
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
  salad: 0.25,
  cheese: 0.75,
  meat: 2.10,
  bacon: 1.40,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
        .map(igKey => {
          return ingredients[igKey]
        }).reduce((sum, el) => sum + el, 0);

    this.setState({purchasable: sum > 0})
  }

  addIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceIncrease = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice + priceIncrease;

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler = type => {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDecrease = INGREDIENT_PRICES[type];
    const newPrice = this.state.totalPrice - priceDecrease;

    this.setState({ingredients: updatedIngredients, totalPrice: newPrice});
    this.updatePurchaseState(updatedIngredients);
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    Object.keys(disabledInfo)
        .map(key => (disabledInfo[key] = disabledInfo[key] <= 0))

    return (
        <Aux>
          <Burger ingredients={this.state.ingredients}/>
          <Modal>
            <OrderSummary ingredients={this.state.ingredients}/>
          </Modal>
          <BuildControls
              price={this.state.totalPrice}
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              purchasable={this.state.purchasable}
              disabled={disabledInfo}
          />
        </Aux>
    );
  }
}

export default BurgerBuilder