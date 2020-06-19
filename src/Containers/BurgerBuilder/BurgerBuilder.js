import React, {Component} from 'react';

import Aux from '../../hoc/Auxhiliiary/Auxhilliary'
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';

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
    purchasable: false,
    purchasing: false
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

  purchaseHandler = () => {
    this.setState({purchasing: true})
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  purchaseContinueHandler = () => {
    // console.log('Continue you saucy beast')
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price,
      customer: {
        name: 'Iain A Maxwell',
        address: {
          street: 'Caiystane Gardens',
          zipCode: 'EH10 6TB',
          country: 'Scotland'
        },
        email: 'straightedgescotsman@gmail.com',
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
        .then(response => console.log(response))
        .catch(error => console.log(error));
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
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSummary
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
            />
          </Modal>
          <BuildControls
              price={this.state.totalPrice}
              ingredientAdded={this.addIngredientHandler}
              ingredientRemoved={this.removeIngredientHandler}
              purchasable={this.state.purchasable}
              disabled={disabledInfo}
              ordered={this.purchaseHandler}
          />
        </Aux>
    );
  }
}

export default BurgerBuilder