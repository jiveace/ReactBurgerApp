import React, { Component } from 'react';
import { connect } from "react-redux";

import Button from '../../../Components/UI/Button/Button';
import classes from './ContactData.module.css'
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Input/Input";
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Jim'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'EH10'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 8,
          maxLength: 8
        }
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'name@address.com'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      deliveryMethod: {
        elementType: 'select',
        valid: true,
        validation: {
          required: false
        },
        elementConfig: {
          options: [
            { value: 'fastest', display: 'Fastest' },
            { value: 'cheapest', display: 'Cheapest' }
          ]
        },
        value: 'cheapest'
      }
    },
    formIsValid: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    const formData = {}
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      deliveryMethod: 'fastest',
      userId: this.props.userId
    }

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = formIsValid && updatedOrderForm[inputIdentifier].valid
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (<form onSubmit={this.orderHandler}>
      {formElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          shouldValidate={formElement.config.validation}
          changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
      ))}
      <Button btnType='Success' disabled={!this.state.formIsValid} clicked={this.orderHandler}>ORDER</Button>
    </form>);

    if (this.props.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);