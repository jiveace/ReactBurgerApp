import React, {Component} from 'react';

import Aux from '../../hoc/Auxhiliiary/Auxhilliary';
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
  salad: 0.25,
  cheese: 0.75,
  meat: 2.10,
  bacon: 1.40,
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  }


  componentDidMount() {
    axios.get('https://react-iam-burger.firebaseio.com/ingredients.json')
        .then(response => {
          this.setState({ingredients: response.data});
        })
        .catch(error => {
          this.setState({error: true});
        })
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
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
    }
    queryParams.push(encodeURIComponent('price') + '=' + encodeURIComponent(this.state.totalPrice));
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: '?' + queryString
    });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    Object.keys(disabledInfo)
        .map(key => (disabledInfo[key] = disabledInfo[key] <= 0))

    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner/>;
    let orderSummary = null;

    if (this.state.ingredients) {
      burger = <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls
            price={this.state.totalPrice}
            ingredientAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            purchasable={this.state.purchasable}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
        />
      </Aux>;

      orderSummary = <OrderSummary
          price={this.state.totalPrice}
          ingredients={this.state.ingredients}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
      />
    }

    if (this.state.loading) {
      orderSummary = <Spinner/>
    }

    return (
        <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
    );
  }
}

// export default withErrorHandler(BurgerBuilder, axios)
export default BurgerBuilder