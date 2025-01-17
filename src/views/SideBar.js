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
import NotFound from './NotFound';

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

  return (
    <div>
      <PrivateView>
        <Lateral top>
          {user.company && (
            <>
              <Link to={`${url}`}>
                <Button top type="button">
                  My Info
                </Button>
              </Link>
              <Link to={`${url}/company/profile/edit`}>
                <Button top type="button">
                  Edit PROFILE
                </Button>
              </Link>
              <Link to={`${url}/company/jobs`}>
                <Button top type="button">
                  MY JOBS
                </Button>
              </Link>
              <Link to={`${url}/company/job/new`}>
                <Button top type="button">
                  ADD NEW JOB
                </Button>
              </Link>
            </>
          )}
          {!user.company && (
            <>
              <Link to={`${url}`}>
                <Button top type="button">
                  My Info
                </Button>
              </Link>
              <Link to={`${url}/nurse/profile/edit`}>
                <Button top type="button">
                  Edit PROFILE
                </Button>
              </Link>
              <Link to={`${url}/CV`}>
                <Button top type="button">
                  Edit CV
                </Button>
              </Link>
              <Link to={`${url}/jobs/available`}>
                <Button top type="button">
                  JOBS
                </Button>
              </Link>
              <Link to={`${url}/jobs/applied`}>
                <Button top type="button">
                  Applied JOBS
                </Button>
              </Link>
            </>
          )}
        </Lateral>

        <Switch>
          <AnonRoute exact path="/">
            <Home />
          </AnonRoute>
          <PrivateRoute exact path={`${path}/`}>
            <Card>
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
            <Card>
              <JobNew />
            </Card>
          </Router>
          <Router exact path={`${path}/company/jobs`}>
            <Card jobList>
              <CompanyJobsList {...rest} />
            </Card>
          </Router>
          <Router exact path={`${path}/company/profile/edit`}>
            <Card>
              <CompanyUpdate />
            </Card>
          </Router>

          <Router exact path={`${path}/CV`}>
            <Card>
              <ResumeUpdate />
            </Card>
          </Router>
          <Router exact path={`${path}/jobs/available`}>
            <Card jobList>
              <JobsToJoin {...rest} />
            </Card>
          </Router>
          <Router exact path={`${path}/jobs/applied`}>
            <Card jobList>
              <JobsToJoin {...rest} />
            </Card>
          </Router>
        </Switch>
      </PrivateView>
    </div>
  );
};

export default withAuth(SideBar);
