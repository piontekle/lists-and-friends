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
    <div className="navbar-inline">
      <SignOut />
    </div>
  </nav>
)

const NonAuthNav = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
    <a href="/" className="navbar-brand">Lists & Friends</a>
    <div className="navbar-inline">
      <div className="row">
        <SignUp />
        <SignIn />
      </div>
    </div>
  </nav>
)

export default Navigation;
