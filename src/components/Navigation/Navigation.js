import React from 'react';

import { AuthUserContext } from '../../utils/Session';

import SignUp from '../User/SignUp';
import SignIn from '../User/SignIn';
import SignOut from '../User/SignOut';

const Navigation = () => (
  <AuthUserContext.Consumer>
    {
      user =>
      user ? <AuthNav /> : <NonAuthNav />
    }
  </AuthUserContext.Consumer>
)

const AuthNav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
    <a href="/" className="navbar-brand">Lists & Friends</a>
    <div className="navbar-inline" id="signout-component">
      <SignOut data-test="signout-component" />
    </div>
  </nav>
)

const NonAuthNav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
    <a href="/" className="navbar-brand">Lists & Friends</a>
    <div className="navbar-inline">
      <div className="row">
        <span data-test="signup-component"><SignUp /></span>
        <span data-test="signin-component"><SignIn /></span>
      </div>
    </div>
  </nav>
)

export default Navigation;
