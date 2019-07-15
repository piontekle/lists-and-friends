import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import * as ROUTES from '../routes';
import { withFirebase } from '../../utils/Firebase';

const SignOut = () => (
  <div>
    <SignOutButton />
  </div>
)

class SignOutButtonBase extends Component {
  onSignOut() {
    this.props.firebase.signOut();
    this.props.history.push(ROUTES.LANDING);
  }

  render() {
    return (
      <button
        className="btn btn-outline-warning"
        id="nav-logout"
        onClick={this.onSignOut.bind(this)}
      >
        Sign Out
      </button>
    )
  }
}

 const SignOutButton = compose(
   withRouter,
   withFirebase
 )(SignOutButtonBase);

 export default SignOut;

 export { SignOutButton };
