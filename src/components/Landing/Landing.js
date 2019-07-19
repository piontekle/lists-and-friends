import React from 'react';
import SignUp from '../User/SignUp';

const Landing = () => (
  <div className="container-fluid">
    <div className="card" id="about-card">
      <div className="card-body">
        <h3 className="card-title">About L&F</h3>
        <p className="card-text">Make collaborative lists within your groups. Add and check off items and everyone in your group will be updated!</p>
          <SignUp />
      </div>
    </div>
  </div>
)

export default Landing;
