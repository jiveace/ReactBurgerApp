import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Logout from "./Containers/Auth/Logout/Logout";
import * as actions from './store/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';


const asynCheckout = asyncComponent(() => {
  return import('./Containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./Containers/Orders/Orders');
});

const asynAuth = asyncComponent(() => {
  return import('./Containers/Auth/Auth');
});

class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' exact component={asynAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asynCheckout} />
          <Route path='/orders' exact component={asyncOrders} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/auth' exact component={asynAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));