import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';

class CompanyJobsList extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
  };

  async componentDidMount() {
    const { user } = this.props;
    try {
      // console.log('TCL: componentDidMount -> username', username);
      const jobs = await jobService.listCompanyJobs(user.username);
      console.log('TCL: CompanyJobsList -> componentDidMount -> jobs', jobs);
      this.setState({
        jobs,
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
    const { jobs, loading, error } = this.state;
    return (
      <div>
        {!error && (
          <>
            <h1>My created Jobs:</h1>

            {!loading &&
              jobs.jobs.map(job => {
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

export default withAuth(CompanyJobsList);
