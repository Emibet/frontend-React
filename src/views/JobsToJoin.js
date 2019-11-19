import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import AnonRoute from '../components/AnonRoute';
import PrivateRoute from '../components/PrivateRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';
import Card from '../ui/Card';
import WrappFlex from '../ui/WrappFlex';
import './JobsToJoin.css';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

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
    showDetail: true,
  };

  jobSwitch = (pathname, jobs, user) => {
    switch (pathname) {
      case '/private/jobs/available': {
        const jobsNoDone = jobs.jobs.filter(job => job.done === false);

        const availableJobs = jobsNoDone.filter(job => {
          return user.nurse.candidateTo.findIndex(jobId => jobId === job._id) === -1;
        });

        return availableJobs;
      }
      case '/private/jobs/applied': {
        const jobsNoDone = jobs.jobs.filter(job => job.done === false);
        const appliedJobs = jobsNoDone.filter(job => {
          return user.nurse.candidateTo.findIndex(jobId => jobId === job._id) >= 0;
        });
        return appliedJobs;
      }

      default:
        return null;
    }
  };

  async componentDidMount() {
    const {
      user,
      location: { pathname },
    } = this.props;

    try {
      const jobType = pathname
        .split('/')
        .splice(-1)
        .toString()
        .toUpperCase();

      const jobs = await jobService.listAllJobs();

      const availableJobs = this.jobSwitch(pathname, jobs, user);

      this.setState({
        jobType,
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

  componentDidUpdate(prevProps) {
    const {
      user,
      location: { pathname },
    } = this.props;
    const { jobs, showDetail } = this.state;

    if (this.props.user.nurse.candidateTo.length !== prevProps.user.nurse.candidateTo.length) {
      const availableJobs = this.jobSwitch(pathname, jobs, user);

      this.setState({
        jobs,
        availableJobs,
        loading: false,
      });
    }

    if (this.props.location.pathname !== prevProps.location.pathname) {
      const availableJobs = this.jobSwitch(pathname, jobs, user);
      const jobType = pathname
        .split('/')
        .splice(-1)
        .toString()
        .toUpperCase();
      this.props.history.push(this.props.location.pathname);
      this.setState({
        jobs,
        availableJobs,
        loading: false,
        jobType,
        showDetail: false,
      });
    }
  }

  handleShow = () => {
    this.setState({
      showDetail: true,
    });
  };

  render() {
    const { jobs, loading, error, job, availableJobs, jobType, showDetail } = this.state;
    const {
      location: { pathname },
    } = this.props;

    return (
      <WrappFlex jobList>
        {!error && (
          <div className="jobsList">
            <h1 className="jobsToJoin-title">{jobType} Jobs:</h1>

            {!loading &&
              availableJobs.map(job => {
                return (
                  <Link to={`/private/jobs/${job._id}/detail`} key={job._id} onClick={this.handleShow}>
                    <Card listed>
                      <p>{job.title}</p>
                      <p> {job.location}</p>
                    </Card>
                  </Link>
                );
              })}
          </div>
        )}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
        <WrappFlex jobDetail>
          {showDetail && <Route path="/private/jobs/:id/detail" component={JobDetail}></Route>}
        </WrappFlex>
      </WrappFlex>
    );
  }
}

export default withAuth(JobsToJoin);
