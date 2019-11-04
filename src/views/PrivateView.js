import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import Home from './Home';
import SideBar from './SideBar';

class PrivateView extends Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  render() {
    const { isLoggedin, user } = this.props;
    console.log('TCL: PrivateView -> render -> user', user);

    return (
      <div>
        {/* PrivateView user: {user.username}
        <br></br>
        User Type: {user.contactName} */}
        {/* <Home /> */}
        {/* {user && <SideBar />}
        {user.company && <SideBar />} */}
        {isLoggedin && <SideBar />}
        {isLoggedin && <Home />}
      </div>
    );
  }
}

export default withAuth(PrivateView);
