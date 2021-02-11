import React, { Component } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Auxhiliiary/Auxhilliary';
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../Components/UI/Spinner/Spinner'
import * as actionTypes from '../../store/actions';



class BurgerBuilder extends Component {
  state = {
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false
  }


  componentDidMount() {
    // axios.get('https://react-iam-burger.firebaseio.com/ingredients.json')
    //     .then(response => {
    //       this.setState({ingredients: response.data});
    //     })
    //     .catch(error => {
    //       this.setState({error: true});
    //     })
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey]
      }).reduce((sum, el) => sum + el, 0);

    return sum > 0
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true })
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false })
  }

  purchaseContinueHandler = () => {
    this.props.history.push('checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    Object.keys(disabledInfo)
      .map(key => (disabledInfo[key] = disabledInfo[key] <= 0))

    let burger = this.state.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
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

    if (this.state.loading) {
      orderSummary = <Spinner />
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
    ings: state.ingredients,
    price: state.totalPrice
  };
}
const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
    onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
  }

}
// export default withErrorHandler(BurgerBuilder, axios)
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder, axios)