import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';
import JobNew from './JobNew';
import JobManageActions from './JobManageActions';
import JobApplicants from './JobApplicants';
import NurseDetail from './NurseDetail';
import Card from '../ui/Card';

// const Card = styled.div`
//   border-radius: 3px;
//   border: 2px solid #4f98d3;
//   // width: 100%;
//   margin-left: 2em;
//   padding: 0.25em 1em;
//   box-sizing: border-box;
// `;

class JobDetail extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {
      job: this.props.job,
      user: this.props.user,
      loading: true,
      error: undefined,
      show: false,
      manageJob: false,
      viewApplicants: false,
    };
    this.handleApplytoJob = this.handleApplytoJob.bind(this);
    this.handleCancelApplytoJob = this.handleCancelApplytoJob.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    console.log('TCL: JobDetail -> componentDidMount -> this.props', this.props);

    const {
      params: { id },
    } = this.props.match;
    try {
      const job = await jobService.jobDetail(id);
      console.log('TCL: JobDetail -> componentDidMount -> job', job);

      // const isApplicant = await job.job.applicants.filter(applicant => applicant.user._id === user._id);
      const isApplicant = 0;
      console.log('TCL: JobDetail -> componentDidMount -> isApplicant', isApplicant);
      const applicant = isApplicant.length > 0;

      this.setState({
        job: job.job,
        user,
        loading: false,
        isApplicant,
        applicant,
        show: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  }

  async getJob(id) {
    const { user } = this.state;
    try {
      const job = await jobService.jobDetail(id);
      console.log('TCL: JobDetail -> getJob -> job', job);
      const isApplicant = await job.job.applicants.filter(applicant => applicant.user._id === user._id);
      console.log('TCL: JobDetail -> getJob -> isApplicant', isApplicant);
      const applicant = isApplicant.length > 0;
      this.setState({
        job: job.job,
        loading: false,
        applicant,
        show: true,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOB',
      });
    }
  }

  handleApplytoJob = async () => {
    const { job, user } = this.state;

    // console.log('Vamos a aplicar al Trabajo');
    try {
      const newAplication = await jobService.applytoJob(job._id, user._id);
      console.log('TCL: JobDetail -> handleApplytoJob -> newAplication', newAplication);
      const isApplicant = await newAplication.job.applicants.filter(applicant => applicant.user._id === user._id);
      const applicant = isApplicant.length > 0;

      await this.props.userData();
      this.setState({
        job: newAplication.job,
        user: newAplication.user,
        loading: false,
        applicant,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  };

  handleCancelApplytoJob = async () => {
    const { job, user } = this.state;

    // console.log('Vamos a cancelar la aplicación al Trabajo');

    try {
      const newAplication = await jobService.cancelApplytoJob(job._id, user._id);
      const isApplicant = await newAplication.job.applicants.filter(applicant => applicant.user._id === user._id);
      const applicant = isApplicant.length > 0;
      // const applicant = await newAplication.job.applicants.includes(user._id);
      await this.props.userData();
      this.setState({
        job: newAplication.job,
        user: newAplication.user,
        loading: false,
        applicant,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  };

  handleShow = () => {
    this.setState({
      show: false,
    });
    this.props.history.push('/private/jobs/applied');
  };

  handleManageJob = () => {
    const { manageJob, viewApplicants } = this.state;
    this.setState({
      manageJob: !manageJob,
      viewApplicants: viewApplicants ? !viewApplicants : viewApplicants,
    });
    // this.props.history.push(`/private/company/job/${job._id}/manage`);
  };

  componentDidUpdate(prevProps) {
    console.log('UPDATE COMPONENT JOB DETAIL');
    const { manageJob, viewApplicants } = this.state;
    // console.log('TCL: JobDetail -> componentDidUpdate -> prevProps', prevProps);
    // console.log('TCL: JobDetail -> componentDidUpdate -> this.props', this.props);
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getJob(this.props.match.params.id);
      this.setState({
        viewApplicants: false,
        manageJob: false,
      });
    }
  }

  handleViewApplicants = () => {
    const { viewApplicants } = this.state;
    this.setState({
      viewApplicants: !viewApplicants,
    });
  };

  handleAssignToJob = async (jobId, nurseId, applicationId) => {
    const { user } = this.state;
    const { userData } = this.props;
    console.log('TCL: JobDetail -> handleAssignToJob -> user', user);
    console.log('TCL: JobDetail -> handleAssignToJob -> jobId', jobId);
    console.log('TCL: JobDetail -> handleAssignToJob -> nurse', nurseId);
    console.log('TCL: JobDetail -> handleAssignToJob -> applicationId', applicationId);
    try {
      const job = await jobService.confirmJob(jobId, nurseId, applicationId);
      console.log('TCL: JobDetail -> handleAssignToJob -> job', job);
      this.setState({
        job: job.job,
        // nurseWork: job.nurse,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
    // userData();
  };

  handleQuitFromJob = async (nurse, jobId) => {
    const { user } = this.state;
    const { userData } = this.props;
    console.log('TCL: JobDetail -> handleQuitFromJob -> user', user);
    console.log('TCL: JobDetail -> handleQuitFromJob -> nurse', nurse);
    console.log('TCL: JobDetail -> handleQuitFromJob -> jobId', jobId);
    try {
      const job = await jobService.cancelJob(jobId, nurse._id);
      console.log('TCL: JobDetail -> handleQuitFromJob -> job', job);
      this.setState({
        job: job.job,
        // nurseWork: job.nurse,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
    // userData();
  };

  render() {
    const { job, user, applicant, isApplicant, loading, error, show, manageJob, viewApplicants, nurse } = this.state;
    console.log('TCL: JobDetail -> render -> job', job);

    const {
      params: { id },
    } = this.props.match;

    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <>
                <Card detailJob>
                  {show && (
                    <>
                      <button onClick={this.handleShow}>Close Detail</button>
                      {user.company && (
                        <>
                          <h2> COMPANY</h2>

                          <button type="button" onClick={this.handleManageJob}>
                            MANAGE JOB
                          </button>
                          {manageJob && <JobManageActions handleViewApplicants={this.handleViewApplicants} />}
                        </>
                      )}
                      <h1>Job Detail:</h1>
                      {job.done && <h3>JOB COMPLETED</h3>}
                      {job.applicants.length} Applicants
                      {job.worker ? <p>Assigned</p> : <p>Not Assigned</p>}
                      {!user.company && (
                        <>
                          {!applicant ? (
                            <>
                              <p>Want to APPLY?</p>
                              <button onClick={this.handleApplytoJob}>Apply</button>
                            </>
                          ) : (
                            <>
                              <p>You are an applicant!!</p>
                              <button onClick={this.handleCancelApplytoJob}>Cancel Application</button>
                            </>
                          )}
                        </>
                      )}
                      <CardJob job={job}></CardJob>
                      {user.company && job.employee && (
                        <>
                          <p>The WORKER</p>
                          {/* <NurseDetail
                            job={job}
                            jobId={job._id}
                            nurse={job.employee}
                            handleAssignToJob={this.handleAssignToJob}
                            handleQuitFromJob={this.handleQuitFromJob}
                          /> */}
                        </>
                      )}
                      {user.company && viewApplicants && (
                        <>
                          <div>
                            Applicants:
                            {job.applicants.map(nurse => {
                              return (
                                <div key={nurse._id}>
                                  <NurseDetail
                                    job={job}
                                    jobId={job._id}
                                    nurse={nurse}
                                    handleAssignToJob={this.handleAssignToJob}
                                    handleQuitFromJob={this.handleQuitFromJob}
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Card>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withAuth(JobDetail);
