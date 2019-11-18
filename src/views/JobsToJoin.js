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
// const WrappFlex = styled.div`
//   display: flex;
//   flex-direction: row;
// `;

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
        console.log('TCL: jobSwitch -> jobsNoDone', jobsNoDone);
        // const availableJobs = jobsNoDone.filter(job => {
        //   return job.applicants.filter(applicant => applicant._id === user._id).length;
        // });

        console.log('TCL: jobSwitch -> TEST user', user);
        console.log('TCL: jobSwitch -> TEST user', user._id);
        // console.log('TCL: jobSwitch -> TEST', jobsNoDone[0].applicants[1].user._id);
        // const availableJobs = jobsNoDone.filter(job =>
        //   user.nurse.candidateTo.findIndex(jobId => jobId === job._id),
        // );
        // function isJob(job) {
        //   // console.log('TCL: isJob -> job._id', job._id);
        //   // const { user } = this.props;
        //   return user.nurse.candidateTo.findIndex(jobId => jobId === job._id) >= 0;
        //   // console.log('TCL: isJob -> user.nurse.candidateTo', user.nurse.candidateTo);
        //   // console.log('TCL: isJob -> jobFinded', jobFinded);
        //   // return jobFinded >= 0;
        // }

        // const availableJobs = jobsNoDone.filter(isJob);

        // Esto será los que he aplicado.
        // const appliedJobs = jobsNoDone.filter(job => {
        //   return user.nurse.candidateTo.findIndex(jobId => jobId === job._id) >= 0;
        // });
        // Esto será los disponibles sin hacer y que no he aplicado.
        const availableJobs = jobsNoDone.filter(job => {
          return user.nurse.candidateTo.findIndex(jobId => jobId === job._id) === -1;
        });

        // let filteredArray = arrayOfElements.filter((element) => 	element.subElements.some((subElement) => subElement.surname === 1));
        console.log('TCL: jobSwitch -> availableJobs', availableJobs);
        return availableJobs;
      }
      case '/private/jobs/applied': {
        const jobsNoDone = jobs.jobs.filter(job => job.done === false);
        const appliedJobs = jobsNoDone.filter(job => {
          return user.nurse.candidateTo.findIndex(jobId => jobId === job._id) >= 0;
        });
        return appliedJobs;
      }
      case '/private/jobs/assigned': {
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
    console.log('TCL: componentDidMount -> pathname', pathname);
    console.log('TCL: componentDidMount -> this.props', this.props);
    try {
      const jobType = pathname
        .split('/')
        .splice(-1)
        .toString()
        .toUpperCase();
      // console.log('TCL: componentDidMount -> username', username);
      const jobs = await jobService.listAllJobs();
      // console.log('TCL: componentDidMount -> jobs', jobs);

      const availableJobs = this.jobSwitch(pathname, jobs, user);
      // const availableJobs = jobs.jobs.filter(job => job.done === false);
      console.log('TCL: CompanyJobsList -> componentDidMount -> Dispo jobs', availableJobs);
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
    // console.log('HolAAAAAAAAAAAAA');
    // Typical usage (don't forget to compare props):
    // console.log('TCL: componentDidUpdate -> prevProps', prevProps);
    // console.log('TCL: componentDidUpdate -> this.props', this.props);
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
    // const { showDetail } = this.state;
    this.setState({
      showDetail: true,
    });
    // this.props.history.push('/private');
  };

  render() {
    const { jobs, loading, error, job, availableJobs, jobType, showDetail } = this.state;
    const {
      location: { pathname },
    } = this.props;
    console.log('TCL: render -> this.props', this.props);

    // const jobType = pathname
    //   .split('/')
    //   .splice(-1)
    //   .toString()
    //   .toUpperCase();
    // console.log('TCL: render -> jobType', jobType);
    // console.log('HOLAAAAAAAAAAAAAAAAAA');
    return (
      <WrappFlex jobList>
        {!error && (
          <div className="jobsList">
            <h1 className="jobsToJoin-title">{jobType} Jobs:</h1>

            {!loading &&
              availableJobs.map(job => {
                return (
                  // <Card listed>
                  <Link to={`/private/jobs/${job._id}/detail`} key={job._id} onClick={this.handleShow}>
                    <Card listed>
                      <p>{job.title}</p>
                      <p> {job.location}</p>
                    </Card>
                  </Link>
                  // </Card>
                );
              })}
          </div>
        )}
        {loading && <div>loading...</div>}
        <WrappFlex jobDetail>
          {showDetail && (
            <>
              {/* <Switch> */}
              {/* <JobDetail {...this.props} /> */}

              <Route path="/private/jobs/:id/detail" component={JobDetail}></Route>
              {/* </Switch> */}
            </>
          )}
        </WrappFlex>
      </WrappFlex>
    );
  }
}

export default withAuth(JobsToJoin);
