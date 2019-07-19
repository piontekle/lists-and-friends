import React, { Component } from 'react';

import { withFirebase } from '../../utils/Firebase';

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    }

    this.userRef = this.props.firebase.user(this.props.user.uid);
  }

  componentDidMount() {
    this.userRef.once("value", snapshot => {
      const user = snapshot.val();

      this.setState({ username: user.username });
    })
  }

  render() {
    const { username } = this.state;

    return (
      <div className="container">
        <h6 data-test="user-greeting">Hello, {username}! What's on the list today?</h6>
      </div>
    )
  }
}

export default withFirebase(UserMenu);
