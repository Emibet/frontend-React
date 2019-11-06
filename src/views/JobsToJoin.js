import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';

class JobsToJoin extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
    job: {},
  };

  async componentDidMount() {
    const { user } = this.props;
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
      <div>
        {!error && (
          <>
            <h1>Available Jobs:</h1>

            {!loading &&
              availableJobs.map(job => {
                return (
                  <div key={job._id}>
                    <Link to={`/jobs/${job._id}/detail`}>{job.title}</Link>
                    {job.location}
                  </div>
                );
              })}
          </>
        )}
        {loading && <div>loading...</div>}
        <div className="col-7">
          <PrivateRoute exact path="/jobs/:id/detail" component={JobDetail}></PrivateRoute>
        </div>
      </div>
    );
  }
}

export default withAuth(JobsToJoin);
