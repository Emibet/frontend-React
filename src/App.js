import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import styled, { css } from 'styled-components';
// import { GlobalStyle } from './ui';
import PrivateView from './views/PrivateView_old';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import SideBar from './views/SideBar';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './views/Home';
import Emibet from './images/Emibet.jpg';

import Button from './ui/Button';
import WrappSignUp from './ui/WrappSignUp';
import WrappButtonHeader from './ui/WrappButtonHeader';
import WrappHeader from './ui/WrappHeader';
import WrappImage from './ui/WrappImage';
import WrappLogOutPrivate from './ui/WrappLogOutPrivate';
import NotFound from './views/NotFound';

class App extends Component {
  render() {
    const { handleLogout, isLoggedin } = this.props;
    return (
      <>
        <Router>
          <WrappHeader>
            <Link to="/">
              <WrappImage>
                <img src={Emibet} className="imgLogo" alt="Logo Emibet" />
              </WrappImage>
            </Link>
            {isLoggedin ? (
              <>
                <WrappLogOutPrivate>
                  <Link to="/private">
                    <Button type="button">Private Zone</Button>
                  </Link>
                  <Button primary onClick={handleLogout}>
                    logout
                  </Button>
                </WrappLogOutPrivate>
              </>
            ) : (
              <>
                <WrappButtonHeader>
                  <Link to="/login">
                    <Button primary type="button">
                      Log in
                    </Button>
                  </Link>
                  <WrappSignUp>
                    <Link to="/signup-employee">
                      <Button type="button">SignUp Employee</Button>
                    </Link>
                    <Link to="/signup-contractor">
                      <Button type="button">SignUp Contractor</Button>
                    </Link>
                  </WrappSignUp>
                </WrappButtonHeader>
              </>
            )}
          </WrappHeader>

          <Switch>
            <AnonRoute exact path="/">
              <Home />
            </AnonRoute>
            <AnonRoute exact path="/login" component={Login} />
            <AnonRoute exact path="/signup-employee" component={Signup} />
            <AnonRoute exact path="/signup-contractor" component={Signup} />

            <PrivateRoute path="/private" component={SideBar}></PrivateRoute>
            <Route path="*" component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}

export default withAuth(App);
