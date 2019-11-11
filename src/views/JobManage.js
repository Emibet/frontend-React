import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, useParams, useRouteMatch } from 'react-router-dom';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';
import JobManageActions from './JobManageActions';
import JobApplicants from './JobApplicants';

class JobManage extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {
      job: {},
      user: this.props.user,
      loading: true,
      error: undefined,
      show: false,
    };
    // this.handleApplytoJob = this.handleApplytoJob.bind(this);
    // this.handleCancelApplytoJob = this.handleCancelApplytoJob.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    console.log('TCL: JobManage -> componentDidMount -> this.props', this.props.match);

    const {
      params: { id },
    } = this.props.match;
    try {
      const job = await jobService.jobDetail(id);
      console.log('TCL: JobManage -> componentDidMount -> job', job);

      this.setState({
        job: job.job,
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

  handleApplicants = () => {
    const { job } = this.state;
    this.props.history.push(`${this.props.match.url}/applicants`);
  };

  render() {
    const { job } = this.state;
    console.log('TCL: JobManage -> render -> job', job);
    console.log('TCL: JobManage -> render -> PROPS PATH', this.props);
    return (
      <div>
        Component JOB MANAGE
        {/* <JobManageActions handleApplicants={this.handleApplicants} job={job} {...this.props} /> */}
        <>
          <Link to={`${this.props.match.url}/applicants`}>
            <button
              type="button"
              // onClick={this.handleApplicants}
            >
              View Applicants
            </button>
          </Link>
          {/* <Link to={`${url}/company/jobs`}>
            <button type="button">MY JOBS</button>
          </Link>
          <Link to={`${url}/company/job/new`}>
            <button type="button">ADD NEW JOB</button>
          </Link> */}
        </>
        <CardJob job={job}></CardJob>
        <JobApplicants job={job} />
        <Switch>
          <Route path={`${this.props.match.path}/applicants`}>
            <JobApplicants job={job} />
          </Route>
          {/* <Route
            exact
            path="/private/company/job/:id/manage/applicants"
            render={matchProps => (
              <JobApplicants job={job} {...matchProps} {...this.props} handleMatch={this.handleMatch} />
            )}
          /> */}
        </Switch>
      </div>
    );
  }
}

export default withAuth(JobManage);
