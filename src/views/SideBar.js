import React from 'react';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import NurseUpdate from './NurseUpdate';
import CompanyUpdate from './CompanyUpdate';
import ResumeUpdate from './ResumeUpdate';
import JobNew from './JobNew';

const SideBar = ({ user, handleLogout, isLoggedin }) => {
  let { path, url } = useRouteMatch();
  // const { handleLogout, isLoggedin } = this.props;
  console.log('TCL: SideBar -> user', user);

  return (
    <div>
      PrivateView user: {user.username}
      <br></br>
      User Type: {user.contactName}
      {/* <Home /> */}
      {user.company && (
        <>
          <Link to={`${url}/company/profile/edit`}>
            <button type="button">Basic Company PROFILE</button>
          </Link>
          <Link to={`${url}/company/job/new`}>
            <button type="button">ADD NEW JOB</button>
          </Link>
        </>
      )}
      {!user.company && (
        <>
          <Link to={`${url}/nurse/profile/edit`}>
            <button type="button">Basic PROFILE</button>
          </Link>
          <Link to={`${url}/CV`}>
            <button type="button">CV</button>
          </Link>
          <Link to={`${url}/jobs`}>
            <button type="button">JOBS</button>
          </Link>
        </>
      )}
      {isLoggedin && <button onClick={handleLogout}>logout</button>}
      <Switch>
        <Router exact path={`${path}/nurse/profile/edit`}>
          <NurseUpdate />
        </Router>
        <Router exact path={`${path}/company/profile/edit`}>
          <CompanyUpdate />
        </Router>
        <Router exact path={`${path}/company/job/new`}>
          <JobNew />
        </Router>
        <Router exact path={`${path}/CV`}>
          <ResumeUpdate />
        </Router>
        <Router exact path={`${path}/jobs`}>
          <Home />
        </Router>
        {/* <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route> */}
        {/* <Route path={`${path}/:topicId`}>
          <Topic />
        </Route> */}
      </Switch>
    </div>
  );
};

export default withAuth(SideBar);
