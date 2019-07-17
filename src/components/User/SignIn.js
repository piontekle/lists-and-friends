import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Popup from 'reactjs-popup';

import * as ROUTES from '../routes';
import { withFirebase } from '../../utils/Firebase';

const SignIn = () => (
  <div>
    <SignInForm />
  </div>
)

const INTITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  error: null
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INTITIAL_STATE };

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    const { username, password } = this.state;

    this.props.firebase.users().orderByChild("username").equalTo(username).once("value", snapshot => {
       const email = Object.values(snapshot.val())[0].email;

      this.props.firebase.signIn(email, password)
      .then(() => {
        this.setState({ ...INTITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(err => {
        this.setState({ error: err });
      });
    })

    e.preventDefault();
  }

  render() {
    const { username, password, error } = this.state;
    const isInvalid =
    username === '' ||
    password === '';

    return (
      <Popup
      trigger={<button className="btn btn-outline-info">Sign In</button>}
      modal
      closeOnDocumentClick
      >
        <form className="form-group" onSubmit={e => this.onSubmit(e)}>
          <h4>Sign In to Lists & Friends</h4>
          <small className="text-muted">Sign in using your group username.</small>
          {error && <p>{error.message}</p>}
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            autoComplete="username"
            name="username"
            value={username}
            onChange={e => this.handleChange(e)}
          />
          <small className="text-muted">Case sensitive</small>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={e => this.handleChange(e)}
          />
          <button
            className="btn btn-outline-success"
            disabled={isInvalid}
            type="submit"
          >
            Sign In
          </button>
        </form>
      </Popup>
    )
  }
}

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignIn;

export { SignInForm };
