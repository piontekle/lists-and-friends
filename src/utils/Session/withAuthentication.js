import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        user: null
      }
    }

    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(user => {
        user ? this.setState({ user: user }) : this.setState({ user: null });
      });
    }


      componentWillUnmount() {
        this.listener();
      }

    render() {
      return (
        <AuthUserContext.Provider value={this.state.user}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      )
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;
