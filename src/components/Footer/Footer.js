import React from 'react';

import { AuthUserContext } from '../../utils/Session';

const Footer = () => (
  <AuthUserContext.Consumer>
    {
      user =>
      user ? <AuthFooter /> : <NonAuthFooter />
    }
  </AuthUserContext.Consumer>
)

const AuthFooter = ({ user }) => (
  <footer className="page-footer font-small blue pt-4">
    <div className="container-fluid text-left text-md-left">
      <div className="row">
        <div className="col-md-6 mt-md-0 mt-3">
          <h5 className="text-uppercase">Lists & Friends</h5>
          <ul className="list-unstyled">
            <li>Lauren Piontek</li>
            <li>Bloc Web Development Track</li>
            <li>June 2019</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright text-center py-3">
      <a href="https://github.com/piontekle/lists-and-friends">View on GitHub</a>
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
