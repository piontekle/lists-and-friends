import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './styles/App.css';

import * as ROUTES from './routes';
import { withAuthentication } from '../utils/Session';

import Navigation from './Navigation/Navigation';
import Footer from './Footer/Footer';
import Landing from './Landing/Landing';
import HomePage from './Home/Home';

const App = () => (
    <Router>
      <div className="container-fluid">
          <div className="container-fluid">
            <Navigation />
          </div>

          <Route exact path={ROUTES.LANDING} component={Landing} />
          <Route path={ROUTES.HOME} component={HomePage} />

          <hr />
        <Footer />
      </div>
    </Router>
)

export default withAuthentication(App);
