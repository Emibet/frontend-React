import React from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import AnonRoute from '../components/AnonRoute';
import NurseUpdate from './NurseUpdate';
import CompanyUpdate from './CompanyUpdate';
import ResumeUpdate from './ResumeUpdate';
import JobNew from './JobNew';
import CompanyJobsList from './CompanyJobsList';
import JobsToJoin from './JobsToJoin';
import JobsApplied from './JobsApplied';

import Card from '../ui/Card';
import PrivateView from '../ui/PrivateView';
import Lateral from '../ui/Lateral';
import Button from '../ui/Button';
import UserData from './UserData';

const JobsListCard = styled.div`
  border-radius: 3px;
  border: 2px solid #4f98d3;
  width: 60%;
  margin-left: 3em;
  padding: 0.25em 1em;
  // box-sizing: border-box;
  display: flex;
  flex-direction: row;
`;

const SideBar = ({ user, handleLogout, isLoggedin, ...rest }) => {
  let { path, url } = useRouteMatch();
  // const { handleLogout, isLoggedin } = this.props;
  console.log('TCL: SideBar -> user', user);

  return (
    <div>
      <PrivateView>
        <Lateral>
          <h3 className="h3">Username:</h3> {user.username}
          <br></br>
          User Type: {user.contactName}
          {/* <Home /> */}
          {user.company && (
            <>
              <Link to={`${url}`}>
                <Button lateral type="button">
                  My Info
                </Button>
              </Link>
              <Link to={`${url}/company/profile/edit`}>
                <Button lateral type="button">
                  Edit PROFILE
                </Button>
              </Link>
              <Link to={`${url}/company/jobs`}>
                <Button lateral type="button">
                  MY JOBS
                </Button>
              </Link>
              <Link to={`${url}/company/job/new`}>
                <Button lateral type="button">
                  ADD NEW JOB
                </Button>
              </Link>
            </>
          )}
          {!user.company && (
            <>
              <Link to={`${url}`}>
                <Button lateral type="button">
                  My Info
                </Button>
              </Link>
              <Link to={`${url}/nurse/profile/edit`}>
                <Button lateral type="button">
                  Edit PROFILE
                </Button>
              </Link>
              <Link to={`${url}/CV`}>
                <Button lateral type="button">
                  CV
                </Button>
              </Link>
              <Link to={`${url}/jobs/available`}>
                <Button lateral type="button">
                  JOBS
                </Button>
              </Link>
              <Link to={`${url}/jobs/applied`}>
                <Button lateral type="button">
                  Applied JOBS
                </Button>
              </Link>
            </>
          )}
          {isLoggedin && (
            <Button primary lateral onClick={handleLogout}>
              logout
            </Button>
          )}
        </Lateral>

        <Switch>
          <AnonRoute exact path="/">
            <Home />
          </AnonRoute>
          <PrivateRoute exact path={`${path}/`}>
            <Card>
              {/* <Home /> */}
              <UserData />
            </Card>
          </PrivateRoute>
          <PrivateRoute exact path={`${path}/nurse/profile/edit`}>
            <Card>
              <NurseUpdate />
            </Card>
          </PrivateRoute>
          <Router exact path={`${path}/company/profile/edit`}>
            <Card>
              <CompanyUpdate />
            </Card>
          </Router>
          <Router exact path={`${path}/company/job/new`}>
            <JobNew />
          </Router>
          <Router exact path={`${path}/company/jobs`}>
            <Card>
              <CompanyJobsList {...rest} />
            </Card>
          </Router>

          <Router exact path="/private/company/jobs/manage">
            <JobNew />
          </Router>

          <Router exact path={`${path}/CV`}>
            <Card>
              <ResumeUpdate />
            </Card>
          </Router>
          <Router exact path={`${path}/jobs/available`}>
            {/* <Home /> */}
            <Card>
              <JobsToJoin />
            </Card>
          </Router>
          <Router exact path={`${path}/jobs/applied`}>
            <Card>
              <JobsApplied />
            </Card>
          </Router>
          {/* <Router exact path={`${path}/${user.username}/jobs`}>
          <CompanyUpdate />
        </Router> */}

          {/* <Route exact path={path}>
          <h3>Please select a topic.</h3>
        </Route> */}
          {/* <Route path={`${path}/:topicId`}>
          <Topic />
        </Route> */}
        </Switch>
      </PrivateView>
    </div>
  );
};

export default withAuth(SideBar);
