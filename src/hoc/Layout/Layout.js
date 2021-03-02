import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxhiliiary/Auxhilliary'
import classes from './Layout.module.css'
import Toolbar from '../../Components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../Components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }

  sideDrawerToggledHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }

  render() {
    return (
      <Aux>
        <div>
          <Toolbar
            isAuth={this.props.isAuthenticated}
            drawerToggleClicked={this.sideDrawerToggledHandler} />
          <SideDrawer
            isAuth={this.props.isAuthenticated}
            open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
          {/*Backdrop*/}
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);