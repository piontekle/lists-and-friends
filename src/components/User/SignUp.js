import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import Popup from 'reactjs-popup';

import * as ROUTES from '../routes';
import { withFirebase } from '../../utils/Firebase';

const SignUp = () => (
  <div>
    <SignUpForm />
  </div>
)

const INTITIAL_STATE = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
  error: null
}

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INTITIAL_STATE };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    console.log("submit SIGN UP called")
    const { username, email, password } = this.state;

    this.props.firebase.createUserWithEmail(email, password)
    .then(user => {
      return this.props.firebase
      .user(user.user.uid)
      .set({
        username,
        email
      });
    })
    .then(() => {
      this.setState({ ...INTITIAL_STATE });
      this.props.history.replace(ROUTES.HOME);
    })
    .catch(err => {
      console.log("sign up error is: " + err.message)
      this.setState({ error: err });
    });

    e.preventDefault();
  }

  render() {
    const { username, email, password, passwordConfirm, error } = this.state;
    const isInvalid =
    username === '' ||
    email === '' ||
    password === '' ||
    !email.includes('@') ||
    password !== passwordConfirm;


    return (
      <Popup
      trigger={<button className="btn btn-outline-info">Sign Up</button>}
      modal
      closeOnDocumentClick
      >
        <form className="form-group" onSubmit={e => this.onSubmit(e)}>
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
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            autoComplete="email"
            name="email"
            value={email}
            onChange={e => this.handleChange(e)}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            name="password"
            value={password}
            onChange={e => this.handleChange(e)}
          />
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => this.handleChange(e)}
          />
          <button
            className="btn btn-outline-success"
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </Popup>
    )
  }
}

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUp;

export { SignUpForm };
