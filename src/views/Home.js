import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AnonRoute from '../components/AnonRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';

class Home extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
  };

  async componentDidMount() {
    try {
      const jobs = await jobService.listAllJobs();
      console.log('TCL: Home -> componentDidMount -> jobs', jobs);
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
            <h1>Jobs List:</h1>

            {!loading &&
              jobs.jobs.map(job => {
                return (
                  <div key={job._id}>
                    <Link to={`/jobs/${job._id}/detail`}>{job.title}</Link>
                    {job.location}
                  </div>
                );
              })}

            {/* {jobs.jobs.map()} */}
          </>
        )}
        {loading && <div>loading...</div>}
        <div className="col-7">
          <AnonRoute exact path="/jobs/:id/detail" component={JobDetail}></AnonRoute>
        </div>
      </div>
    );
  }
}

export default Home;
