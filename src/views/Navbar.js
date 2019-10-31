import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import Login from './auth/Login';
import Signup from './auth/Signup';

import { withAuth } from '../Context/AuthContext';

import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import PrivateView from './PrivateView';
import Emibet from '../images/Emibet.jpg';

class Navbar extends Component {
  state = {
    me: '',
  };

  render() {
    const { handleLogout, isLoggedin } = this.props;
    return (
      <>
        <Router>
          <Link to="/">
            <img src={Emibet} alt="Logo Emibet" />
          </Link>
          {isLoggedin ? (
            <button onClick={handleLogout}>logout</button>
          ) : (
            <>
              <Link to="/login">
                <button type="button">LoginYo</button>
              </Link>

              <Link to="/signup">
                <button type="button">SignUp</button>
              </Link>
            </>
          )}
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup" component={Signup} />
          <PrivateRoute exact path="/private" component={PrivateView} />
        </Router>
      </>
    );
  }
}

export default withAuth(Navbar);
