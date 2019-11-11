import React from 'react';
import { withAuth } from '../Context/AuthContext';
import Home from './Home';
import SideBar from './SideBar';

const PrivateView = ({ user, isLoggedin, ...rest }) => {
  // console.log('PROPS PrivateView', this.props);
  return (
    <div>
      {/* PrivateView user: {user.username}
      <br></br>
      User Type: {user.contactName} */}
      {/* <Home /> */}
      {/* {user && <SideBar />} */}
      {isLoggedin && <SideBar {...rest} />}
      {/* {isLoggedin && <Home />} */}
    </div>
  );
};

export default withAuth(PrivateView);
