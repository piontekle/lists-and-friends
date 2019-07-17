import React, { Component } from 'react';

import { withFirebase } from '../../utils/Firebase';

class UserMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null
    }

    this.usersRef = this.props.firebase.users();
  }

  componentDidMount() {
    this.usersRef.orderByChild("email").equalTo(this.props.user.email).once("value", snapshot => {
      const user = Object.values(snapshot.val())[0];

      this.setState({ username: user.username });
    })
  }

  render() {
    const { username } = this.state;

    return (
      <div className="container">
        <h6>Hello, {username}! What's on the list today?</h6>
      </div>
    )
  }
}

export default withFirebase(UserMenu);
