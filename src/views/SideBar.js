import React from 'react';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import NurseUpdate from './NurseUpdate';

const SideBar = ({ user }) => {
  let { path, url } = useRouteMatch();
  return (
    <div>
      PrivateView user: {user.username}
      <br></br>
      User Type: {user.contactName}
      {/* <Home /> */}
      <Link to={`${url}/profile`}>
        <button type="button">PROFILE</button>
      </Link>
      <Switch>
        <Router exact path={`${path}/profile`}>
          <NurseUpdate />
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
