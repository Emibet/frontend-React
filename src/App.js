import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import PrivateView from './views/PrivateView';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import Navbar from './views/Navbar';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';

class App extends Component {
  render() {
    const { handleLogout } = this.props;
    return (
      <>
        <Navbar handleLogout={handleLogout}></Navbar>

        {/* <Router>
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
        </Router> */}
      </>
    );
  }
}

export default withAuth(App);
