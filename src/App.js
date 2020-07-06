import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./Containers/Checkout/Checkout";
import Orders from "./Containers/Orders/Orders";

class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            <Switch>
              <Route
                  path='/checkout' component={Checkout}>
              </Route>
              <Route
                  path='/orders' exact component={Orders}>
              </Route>
              <Route
                  path='/' exact component={BurgerBuilder}>
              </Route>
            </Switch>
          </Layout>
        </div>
    );
  }
}

export default App;
