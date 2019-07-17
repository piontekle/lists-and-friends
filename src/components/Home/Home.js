import React from 'react';

import { AuthUserContext, withAuthorization } from '../../utils/Session';

import Lists from '../Lists/Lists';
import UserMenu from '../User/UserMenu';

const Home = () => (
  <AuthUserContext.Consumer>
    {user => (
      <div className="container">
            <UserMenu user={user} />
            <hr />
            <Lists user={ user } />
      </div>
    )}
  </AuthUserContext.Consumer>
)

const condition = user => !!user;

export default withAuthorization(condition)(Home);
