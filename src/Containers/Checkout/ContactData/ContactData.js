import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: '',
    },
  }

  render() {
    return (
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          <form>
            <input className={classes.Input} type='text' name='name' placeholder='Your Name' />
            <input className={classes.Input} type='text' name='email' placeholder='Your email' />
            <input className={classes.Input} type='text' name='street' placeholder='Your street' />
            <input className={classes.Input} type='text' name='postcode' placeholder='Your postcode' />
            <Button btnType='Success' click>ORDER</Button>
          </form>
        </div>
    );
  }
}

export default ContactData;