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
import CompanyUpdate from './CompanyUpdate';
import JobUpdate from './JobUpdate';
import './CompanyJobList.css';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

class CompanyJobsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      jobs: [],
      loading: true,
      error: undefined,
      job: {},
    };
    this.handlerNewJobs = this.handlerNewJobs.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    // console.log('TCL: componentDidMount -> his.props', this.props);
    try {
      // console.log('TCL: componentDidMount -> username', username);
      const jobs = await jobService.listCompanyJobs(user.username);
      // console.log('TCL: CompanyJobsList -> componentDidMount -> jobs', jobs);
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

  handlerNewJobs = async () => {
    const { user } = this.props;
    try {
      const jobs = await jobService.listCompanyJobs(user.username);
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
    this.setState({
      someVar: 'some value',
    });
  };

  // componentDidUpdate(prevProps) {
  //   console.log('TCL: CompanyJobsList -> componentDidUpdate -> prevProps', prevProps);
  //   console.log('TCL: CompanyJobsList -> componentDidUpdate ->  THIS Props', this.props);
  //   if (this.props.location.key !== prevProps.location.key) {
  //     // this.getJob(this.props.match.params.id);
  //     // this.props.history.push('/private/company/jobs');
  //   }
  // }

  render() {
    const { jobs, loading, error, job } = this.state;
    console.log('TCL: render -> jobs', jobs);
    console.log('PROPS COMPANY JOB LIST ', this.props);
    return (
      <WrappFlex jobList>
        {!error && (
          <div className="jobsList">
            {/* {console.log('RENDER COMPANY JOB LIST')} */}
            <h1 className="jobsToJoin-title">All My Jobs:</h1>

            {!loading &&
              jobs.jobs.map(job => {
                return (
                  <Link to={`/private/company/jobs/${job._id}`} key={job._id}>
                    <Card listed>
                      {console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', job)}
                      <p className="numberApplicants">{job.applicants.length} Applicants</p>
                      <p>{job.title}</p>
                      <p>{job.location}</p>
                      {job.employee ? (
                        <p className="jobIsAssigned">Assigned </p>
                      ) : (
                        <p className="jobIsAssigned not"> Not Assigned </p>
                      )}
                    </Card>
                  </Link>
                );
              })}
          </div>
        )}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
        <WrappFlex jobDetail>
          <Switch>
            <Route
              exact
              path="/private/company/jobs/:id"
              // component={JobDetail}
              render={matchProps => <JobDetail {...matchProps} handlerNewJobs={this.handlerNewJobs} />}
            ></Route>
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
            <Route
              exact
              path="/private/company/job/:id/edit"
              render={matchProps => (
                <Card>
                  <JobUpdate {...matchProps} />
                </Card>
              )}
            >
              {/* <Card>
                <JobUpdate />
              </Card> */}
            </Route>
          </Switch>
        </WrappFlex>
      </WrappFlex>
    );
  }
}

export default withAuth(CompanyJobsList);
