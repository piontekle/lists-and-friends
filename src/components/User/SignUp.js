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

    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    const { username, email, password } = this.state;

    this.props.firebase.users().orderByChild("username").equalTo(username).once("value", snapshot => {
      if (snapshot.exists()) {
        const err = {
          message: "Username already exists"
        }
        this.setState({ error: err })
      } else {
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
          this.props.history.push(ROUTES.HOME);
        })
        .catch(err => {
          this.setState({ error: err });
        });
      }
    })


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
          <h4 data-test="signup-header">Sign Up for Lists & Friends</h4>
          <small className="text-muted">Pick a username and password for everyone in your group to use.</small>
          {error && <p data-test="signup-error">{error.message}</p>}
          <input
            className="form-control"
            type="text"
            placeholder="Username"
            autoComplete="username"
            name="username"
            data-test="signup-username"
            value={username}
            onChange={e => this.handleChange(e)}
          />
          <small className="text-muted">Case sensitive, at least 5 characters</small>
          <input
            className="form-control"
            type="email"
            placeholder="Email"
            autoComplete="email"
            data-test="signup-email"
            name="email"
            value={email}
            onChange={e => this.handleChange(e)}
          />
          <small className="text-muted">Must be valid email</small>
          <input
            className="form-control"
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            data-test="signup-password"
            name="password"
            value={password}
            onChange={e => this.handleChange(e)}
          />
          <small className="text-muted">Case sensitive, at least 6 characters</small>
          <input
            className="form-control"
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            data-test="signup-pass-confirm"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => this.handleChange(e)}
          />
          <small className="text-muted">Must match password above</small><br />
          <button
            className="btn btn-outline-success"
            disabled={isInvalid}
            type="submit"
            data-test="signup-submit"
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
