import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';
import JobNew from './JobNew';
import JobManage from './JobManage';
import JobApplicants from './JobApplicants';
import Card from '../ui/Card';
import WrappFlex from '../ui/WrappFlex';

class CompanyJobsList extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
    job: {},
  };

  async componentDidMount() {
    const { user } = this.props;
    console.log('TCL: componentDidMount -> his.props', this.props);
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
    const { jobs, loading, error, job } = this.state;
    return (
      <WrappFlex>
        {!error && (
          <div>
            <h1>My created Jobs:</h1>

            {!loading &&
              jobs.jobs.map(job => {
                return (
                  <Card listed key={job._id}>
                    <Link to={`/private/company/jobs/${job._id}`}>{job.title}</Link>
                    {job.location}
                  </Card>
                );
              })}
          </div>
        )}
        {loading && <div>loading...</div>}
        <WrappFlex jobDetail>
          <Switch>
            <Route exact path="/private/company/jobs/:id" component={JobDetail}></Route>
            {/* <Route
              exact
              path="/private/company/job/:id/manage"
              render={matchProps => <JobManage {...matchProps} {...this.props} handleMatch={this.handleMatch} />}
              />
              <Route
              path="/private/company/job/:id/manage/applicants"
              // path={`${this.props.match.path}/applicants`}
              >
              <JobApplicants job={job} />
            </Route> */}
          </Switch>
        </WrappFlex>
      </WrappFlex>
    );
  }
}

export default withAuth(CompanyJobsList);
