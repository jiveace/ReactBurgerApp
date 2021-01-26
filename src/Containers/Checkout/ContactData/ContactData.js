import React, {Component} from 'react';
import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Jim'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Street'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'EH10'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeHolder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeHolder: 'name@address.com'
        },
        value: ''
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', display: 'Fastest'},
            {value: 'cheapest', display: 'Cheapest'}
          ]
        },
        value: ''
      }
    }
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
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (<form>
      {formElementsArray.map(formElement => (
          <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
          />

      ))}
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