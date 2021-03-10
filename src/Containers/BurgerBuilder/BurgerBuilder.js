import React, { Component } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Auxhiliiary/Auxhilliary';
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../Components/UI/Spinner/Spinner'
import * as actions from '../../store/actions/index';

export class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false
  }


  componentDidMount() {
    this.props.onInitIngredients()
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum, el) => sum + el, 0);

    return sum > 0
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true })
    } else {
      this.props.onSetAuthRedirectPath('/checkout')
      this.props.history.push('/auth');
    }
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    Object.keys(disabledInfo)
      .map(key => (disabledInfo[key] = disabledInfo[key] <= 0))

    let burger = this.props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
    let orderSummary = null;

    if (this.props.ings) {
      burger = <Aux>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          price={this.props.price}
          ingredientAdded={this.props.onIngredientAdded}
          ingredientRemoved={this.props.onIngredientRemoved}
          purchasable={this.updatePurchaseState(this.props.ings)}
          disabled={disabledInfo}
          isAuth={this.props.isAuthenticated}
          ordered={this.purchaseHandler}
        />
      </Aux>;

      orderSummary = <OrderSummary
        price={this.props.price}
        ingredients={this.props.ings}
        purchaseCancelled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
      />
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder)