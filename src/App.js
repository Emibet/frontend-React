import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import PrivateView from './views/PrivateView_old';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import Navbar from './views/Navbar';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './views/Home';
import Emibet from './images/Emibet.jpg';

class App extends Component {
  render() {
    const { handleLogout, isLoggedin } = this.props;
    return (
      <>
        {/* <Navbar handleLogout={handleLogout}></Navbar> */}
        <Router>
          <Link to="/">
            <img src={Emibet} alt="Logo Emibet" />
          </Link>
          {isLoggedin ? (
            <>
              <Link to="/private">
                <button type="button">Private Zone</button>
              </Link>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button type="button">LoginYo</button>
              </Link>

              <Link to="/signup-employee">
                <button type="button">SignUp Employee</button>
              </Link>
              <Link to="/signup-contractor">
                <button type="button">SignUp Contractor</button>
              </Link>
            </>
          )}
          {/* <AnonRoute exact path="/" component={Home} /> */}
          <AnonRoute exact path="/">
            <Home />
          </AnonRoute>
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup-employee" component={Signup} />
          <AnonRoute exact path="/signup-contractor" component={Signup} />
          <PrivateRoute path="/private" component={PrivateView}></PrivateRoute>

          {/* <PrivateRoute exact path="/private">
            <PrivateView />
          </PrivateRoute> */}
        </Router>
      </>
    );
  }
}

export default withAuth(App);
