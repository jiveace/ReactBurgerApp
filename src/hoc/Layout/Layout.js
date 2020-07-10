import React, {Component} from 'react';

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
    this.setState((prevState) =>  {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }

  render() {
    return (
        <Aux>
          <div>
            <Toolbar drawerToggleClicked={this.sideDrawerToggledHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            {/*Backdrop*/}
          </div>
          <main className={classes.Content}>
            {this.props.children}
          </main>
        </Aux>
    )
  }
}

export default Layout;