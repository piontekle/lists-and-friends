import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';

import firebaseConfig from './utils/firebase_config';

firebase.intializeApp(firebaseConfig)

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: ""
    }
  }

  toggleLoggedIn() {
    this.setState({ isLoggedIn: !isLoggedIn });
  }

  setUser(user) {
    this.setState({ user: user });
  }


  render() {
    return (
      <div className="container-fluid">
        <header className="App-header">
          <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
              <a href="/" className="navbar-brand">Lists & Friends</a>
              <div >
                {
                  isLoggedIn ?
                  <button
                    className="btn btn-outline-warning"
                    id="nav-logout"
                    onClick={this.logout.bind(this)}
                  >
                    Log Out
                  </button>
                  :
                  <button
                    className="btn btn-outline-success"
                    id="nav-login"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </button>
                }
              </div>
            </nav>
          </div>
        </header>
        <div className="col-4" id="lists">
          Lists will be here
        </div>
        <div className="col-8" id="items">
          ~*~*~*~items here~*~*~*~
        </div>
      </div>
    );
  }
}

export default App;
