import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";

import Aux from '../../hoc/Auxhiliiary/Auxhilliary';
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../Components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

const BurgerBuilder = props => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, [props]);

  const updatePurchaseState = ingredients => {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      }).reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push('/checkout');
  };

  const disabledInfo = {
    ...props.ings
  };

  Object.keys(disabledInfo)
    .map(key => (disabledInfo[key] = disabledInfo[key] <= 0));

  let burger = props.error ? <p>Ingredients cannot be loaded</p> : <Spinner />;
  let orderSummary = null;

  if (props.ings) {
    burger = <Aux>
      <Burger ingredients={props.ings} />
      <BuildControls
        price={props.price}
        ingredientAdded={props.onIngredientAdded}
        ingredientRemoved={props.onIngredientRemoved}
        purchasable={updatePurchaseState(props.ings)}
        disabled={disabledInfo}
        isAuth={props.isAuthenticated}
        ordered={purchaseHandler}
      />
    </Aux>;

    orderSummary = <OrderSummary
      price={props.price}
      ingredients={props.ings}
      purchaseCancelled={purchaseCancelHandler}
      purchaseContinued={purchaseContinueHandler}
    />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);