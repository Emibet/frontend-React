import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import jobService from '../services/jobService';
import userService from '../services/userService';
import JobDetail from './JobDetail';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

class JobsApplied extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
    job: {},
  };

  async componentDidMount() {
    const { user } = this.props;
    console.log('TCL: componentDidMount -> this.props JOBS APPLIED', this.props);
    // console.log('TCL: componentDidMount -> user', user.nurse.candidateTo);
    try {
      // console.log('TCL: componentDidMount -> username', username);
      // const jobs = await jobService.listAllJobs();
      const userFetched = await userService.infoUserNurse(user._id);
      console.log('TCL: componentDidMount -> userFetched', userFetched);
      // const appliedJobs = jobs.jobs.applicants.filter(job => {
      //   console.log('TCL: componentDidMount -> job.applicants FILTER', job.applicants);
      //   console.log('TCL: componentDidMount -> this FILTER', this);
      //   return job.applicants === this;
      // }, user._id);
      // console.log('TCL: CompanyJobsList -> componentDidMount -> APPLIED JOBS', appliedJobs);
      this.setState({
        userFetched,
        // appliedJobs,
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
    const { jobs, loading, error, job, userFetched } = this.state;
    return (
      <div>
        {!error && (
          <>
            <h1>Applied Jobs:</h1>

            {!loading &&
              userFetched.nurse.nurse.candidateTo.map(job => {
                return (
                  <div key={job._id}>
                    <Link to={`/jobs/applied/${job._id}/detail`}>{job.title}</Link>
                    {/* {job.location} */}
                  </div>
                );
              })}
          </>
        )}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
        <div className="col-7">
          <Switch>
            <Route exact path="/jobs/applied/:id/detail" component={JobDetail}></Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default withAuth(JobsApplied);
