import React from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import Home from './Home';
import PrivateRoute from '../components/PrivateRoute';
import NurseUpdate from './NurseUpdate';
import CompanyUpdate from './CompanyUpdate';
import ResumeUpdate from './ResumeUpdate';
import JobNew from './JobNew';
import CompanyJobsList from './CompanyJobsList';
import JobsToJoin from './JobsToJoin';
import JobsApplied from './JobsApplied';

const PrivateView = styled.div`
  margin: 1.3em auto;
  display: flex;
  flex-direction: row;
`;

const Lateral = styled.div`
  border-radius: 3px;
  border: 2px solid #4f98d3;
  display: flex;
  flex-direction: column;
  width: 20%;
  text-align: center;
  line-height: 1.5em;
`;

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #4f98d3;
  color: #4f98d3;
  margin: 0.25em auto;
  padding: 0.25em 1em;
  width: 80%
    ${props =>
      props.primary &&
      css`
        background: #4f98d3;
        color: white;
      `};
`;

const UpdateCard = styled.div`
  border-radius: 3px;
  border: 2px solid #4f98d3;
  width: 50%;
  margin: auto;
  padding: 0.25em 1em;
  box-sizing: border-box;
`;

const SideBar = ({ user, handleLogout, isLoggedin, ...rest }) => {
  let { path, url } = useRouteMatch();
  // const { handleLogout, isLoggedin } = this.props;
  console.log('TCL: SideBar -> user', user);

  return (
    <div>
      <PrivateView>
        <Lateral>
          PrivateView USER: {user.username}
          <br></br>
          User Type: {user.contactName}
          {/* <Home /> */}
          {user.company && (
            <>
              <Link to={`${url}/company/profile/edit`}>
                <Button type="button">Basic Company PROFILE</Button>
              </Link>
              <Link to={`${url}/company/jobs`}>
                <Button type="button">MY JOBS</Button>
              </Link>
              <Link to={`${url}/company/job/new`}>
                <Button type="button">ADD NEW JOB</Button>
              </Link>
            </>
          )}
          {!user.company && (
            <>
              <Link to={`${url}/nurse/profile/edit`}>
                <Button type="button">Basic PROFILE</Button>
              </Link>
              <Link to={`${url}/CV`}>
                <Button type="button">CV</Button>
              </Link>
              <Link to={`${url}/jobs/available`}>
                <Button type="button">JOBS</Button>
              </Link>
              <Link to={`${url}/jobs/applied`}>
                <Button type="button">Applied JOBS</Button>
              </Link>
            </>
          )}
          {isLoggedin && (
            <Button primary onClick={handleLogout}>
              logout
            </Button>
          )}
        </Lateral>

        <Switch>
          <PrivateRoute exact path={`${path}/nurse/profile/edit`}>
            <UpdateCard>
              <NurseUpdate />
            </UpdateCard>
          </PrivateRoute>
          <Router exact path={`${path}/company/profile/edit`}>
            <UpdateCard>
              <CompanyUpdate />
            </UpdateCard>
          </Router>
          <Router exact path={`${path}/company/job/new`}>
            <JobNew />
          </Router>
          <Router exact path={`${path}/company/jobs`}>
            <CompanyJobsList {...rest} />
          </Router>

          <Router exact path="/private/company/jobs/manage">
            <JobNew />
          </Router>

          <Router exact path={`${path}/CV`}>
            <UpdateCard>
              <ResumeUpdate />
            </UpdateCard>
          </Router>
          <Router exact path={`${path}/jobs/available`}>
            {/* <Home /> */}
            <JobsToJoin />
          </Router>
          <Router exact path={`${path}/jobs/applied`}>
            <JobsApplied />
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
