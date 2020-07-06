import React, {Component} from 'react';
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {Route} from 'react-router-dom'

class Checkout extends Component {

  state = {
    ingredients: {
      salad: 1,
      cheese: 2,
      meat: 3,
      bacon: 2
    }
  }

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      console.log(param)
      if (param[0] === 'price') {
        price = param[1];
      } else
        ingredients[param[0]] = +param[1];
    }
    this.setState({ingredients, price: price})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };
  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {

    return (
        <div>
          <CheckoutSummary ingredients={this.state.ingredients}
                           checkoutCancelled={this.checkoutCancelledHandler}
                           checkoutContinued={this.checkoutContinuedHandler}/>
          <Route path={this.props.match.path + '/contact-data'}
                 render={() => (<ContactData
                     ingredients={this.state.ingredients}
                     price={this.state.price}
                     {...this.props}
                 />)}/>
        </div>
    );
  }
}

export default Checkout;