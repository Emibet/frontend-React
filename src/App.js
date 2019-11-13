import React, { Component } from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom';

import styled, { css } from 'styled-components';
import PrivateView from './views/PrivateView_old';
import Login from './views/auth/Login';
import Signup from './views/auth/Signup';
import { withAuth } from './Context/AuthContext';

import Navbar from './views/Navbar';

import SideBar from './views/SideBar';

import PrivateRoute from './components/PrivateRoute';
import AnonRoute from './components/AnonRoute';
import Home from './views/Home';
import Emibet from './images/Emibet.jpg';
import JobNew from './views/JobNew';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #4f98d3;
  color: #4f98d3;
  margin: 0.25em 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: #4f98d3;
      color: white;
    `};
`;

const WrappSignUp = styled.div`
  display: inline-flex;
  flex-direction: column;
`;

const WrappButtonHeader = styled.div`
  display: inline;
  align-items: center;
`;

const WrappHeader = styled.section`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const WrappImage = styled.div`
  max-width: 75%;
  height: auto;
  .imgLogo {
    width: 100%;
    height: 100%;
  }
`;

const WrappLogOutPrivate = styled.div`
  display: block;
  text-align: end;
`;

class App extends Component {
  render() {
    const { handleLogout, isLoggedin } = this.props;
    return (
      <>
        {/* <Navbar handleLogout={handleLogout}></Navbar> */}

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
                      {/* <button type="button">LoginYo</button> */}
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
          {/* <AnonRoute exact path="/" component={Home} /> */}
          <AnonRoute exact path="/">
            <Home />
          </AnonRoute>
          <AnonRoute exact path="/login" component={Login} />
          <AnonRoute exact path="/signup-employee" component={Signup} />
          <AnonRoute exact path="/signup-contractor" component={Signup} />
          {/* <PrivateRoute path="/private" component={PrivateView}></PrivateRoute> */}
          <PrivateRoute path="/private" component={SideBar}></PrivateRoute>
          {/* <PrivateRoute exact path="/private/comapny/jobs/manage" component={JobNew}></PrivateRoute> */}

          {/* <PrivateRoute exact path="/private">
            <PrivateView />
          </PrivateRoute> */}
        </Router>
      </>
    );
  }
}

export default withAuth(App);
