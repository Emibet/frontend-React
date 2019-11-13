import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Switch, Route, Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';

const WrappListAndDetail = styled.div`
  display: flex;
  flex-direction: row;
`;

const JobsListCard = styled.div`
  border-radius: 3px;
  border: 2px solid #4f98d3;
  // width: 100%;
  margin: auto;
  padding: 0.25em 1em;
  box-sizing: border-box;
`;

class JobsToJoin extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
    job: {},
  };

  async componentDidMount() {
    const { user } = this.props;
    console.log('TCL: componentDidMount -> this.props', this.props);
    try {
      // console.log('TCL: componentDidMount -> username', username);
      const jobs = await jobService.listAllJobs();
      const availableJobs = jobs.jobs.filter(job => job.done === false);
      console.log('TCL: CompanyJobsList -> componentDidMount -> Dispo jobs', availableJobs);
      this.setState({
        jobs,
        availableJobs,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  }

  render() {
    const { jobs, loading, error, job, availableJobs } = this.state;
    return (
      <WrappListAndDetail>
        {!error && (
          <JobsListCard>
            <h1>Available Jobs:</h1>

            {!loading &&
              availableJobs.map(job => {
                return (
                  <div key={job._id}>
                    <Link to={`/jobs/available/${job._id}/detail`}>{job.title}</Link>
                    {job.location}
                  </div>
                );
              })}
          </JobsListCard>
        )}
        {loading && <div>loading...</div>}

        <div>
          <Switch>
            <Route exact path="/jobs/available/:id/detail" component={JobDetail}></Route>
          </Switch>
        </div>
      </WrappListAndDetail>
    );
  }
}

export default withAuth(JobsToJoin);
