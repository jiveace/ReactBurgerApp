import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";


class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postcode: '',
    },
    loading: false,
  }


  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Iain A Maxwell',
        address: {
          street: 'Caiystane Gardens',
          zipCode: 'EH10 6TB',
          country: 'Scotland'
        },
        email: 'straightedgescotsman@gmail.com',
      },
      deliveryMethod: 'fastest'
    }

    axios.post('/orders.json', order)
        .then(response => {
              this.setState({loading: false});
              this.props.history.push('/');
            }
        )
        .catch(error => this.setState({loading: false}));
  }

  render() {
    let form = (<form>
      <input className={classes.Input} type='text' name='name' placeholder='Your name'/>
      <input className={classes.Input} type='text' name='email' placeholder='Your email'/>
      <input className={classes.Input} type='text' name='street' placeholder='Your street'/>
      <input className={classes.Input} type='text' name='postcode' placeholder='Your postcode'/>
      <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
    </form>);

    if (this.state.loading) {
      form = <Spinner/>
    }

    return (
        <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
          {form}
        </div>
    );
  }
}

export default ContactData;