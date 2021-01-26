import React, {Component} from 'react';

import Modal from '../../Components/UI/Modal/Modal';
import Aux from '../Auxhiliiary/Auxhilliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      })
      this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error});
      })
    }

    componentWillUnmount() {
      axios.interceptors.eject(this.requestInterceptor);
      axios.interceptors.eject(this.responseInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
          <Aux>
            <Modal show={this.state.error}
                   modalClosed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
            </Modal>
            <WrappedComponent {...this.props} />
          </Aux>
      );
    }
  }
}

export default withErrorHandler;