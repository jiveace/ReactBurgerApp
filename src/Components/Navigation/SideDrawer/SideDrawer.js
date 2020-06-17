import React from 'react';

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from '../../../hoc/Auxhilliary';

import classes from './Sidedrawer.module.css';

const sideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer];
  attachedClasses.unshift(props.open ? classes.Open : classes.Close)

  return (
      <Aux>
        <Backdrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo/>
          </div>
          <nav>
            <NavigationItems/>
          </nav>
        </div>
      </Aux>
  );
};

export default sideDrawer;