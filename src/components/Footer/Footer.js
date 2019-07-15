import React from 'react';

import { AuthUserContext } from '../../utils/Session';

const Footer = () => (
  <AuthUserContext.Consumer>
    {
      user =>
      user ? <AuthFooter user={user} /> : <NonAuthFooter />
    }
  </AuthUserContext.Consumer>
)

const AuthFooter = ({ user }) => (
  <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-left text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">User:</h5>
          <p>Hello, {user.email}</p>
        </div>
      </div>
    </div>
  </footer>
)

const NonAuthFooter = () => (
  <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-left text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">Lists & Friends</h5>
          <p>Sign in to see your lists! </p>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer;
