import React, { Component } from 'react';

class User extends Component {
  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      this.props.setUser(user);
    });
  }

  render() {
    return (
      <p>Current User: { this.props.user ? this.props.user.username : "Guest"}</p>
    )
  }
}

export default User;
