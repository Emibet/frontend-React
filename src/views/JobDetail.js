import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';
import JobNew from './JobNew';
import JobManageActions from './JobManageActions';
import JobApplicants from './JobApplicants';
import NurseDetail from './NurseDetail';
import Card from '../ui/Card';
import './JobDetail.css';
import Button from '../ui/Button';

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

    this.state = {
      job: {},
      user: this.props.user,
      loading: true,
      error: undefined,
      show: false,
      manageJob: false,
      viewApplicants: false,
      changingState: false,
    };
    this.handleApplytoJob = this.handleApplytoJob.bind(this);
    this.handleCancelApplytoJob = this.handleCancelApplytoJob.bind(this);
  }

  async componentDidMount() {
    const { user } = this.props;
    // console.log('TCL: JobDetail -> componentDidMount -> this.props', this.props);
    console.log('TCL: JobDetail -> componentDidMount -> user', user);

    const {
      params: { id },
    } = this.props.match;
    try {
      const job = await jobService.jobDetail(id);
      console.log('TCL: JobDetail -> componentDidMount -> job', job);

      const isApplicant = user.company ? 0 : user.nurse.candidateTo.includes(job.job._id);

      // const isApplicant = user.nurse.candidateTo.includes(job.job._id);
      // console.log('TCL: JobDetail -> componentDidMount -> isApplicant', isApplicant);

      const applicant = isApplicant;

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
    // console.log('TCL: JobDetail -> getJob -> id', id);
    const { user } = this.state;
    try {
      const job = await jobService.jobDetail(id);
      console.log('TCL: JobDetail -> getJob -> job HOLLAAAAAAAAA', job);

      const isApplicant = await job.job.applicants.filter(applicant => applicant.user._id === user._id);
      // console.log('TCL: JobDetail -> getJob -> isApplicant', isApplicant);

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

  handleEditJob = () => {
    this.props.history.push('/private/company/profile/edit');
  };

  handleApplytoJob = async () => {
    const { job, user } = this.state;

    try {
      const newAplication = await jobService.applytoJob(job._id, user._id);

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

    try {
      const newAplication = await jobService.cancelApplytoJob(job._id, user._id);
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

  handleShow = () => {
    this.setState({
      show: false,
    });
    this.props.history.push('/private');
  };

  handleManageJob = () => {
    const { manageJob, viewApplicants } = this.state;
    this.setState({
      manageJob: !manageJob,
      viewApplicants: viewApplicants ? !viewApplicants : viewApplicants,
    });
  };

  componentDidUpdate(prevProps) {
    // const { manageJob, viewApplicants } = this.state;
    // console.log('TCL: JobDetail -> componentDidUpdate -> prevProps', prevProps);
    // console.log('TCL: JobDetail -> componentDidUpdate ->  THIS Props', this.props);
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
    const { handlerNewJobs } = this.props;
    console.log('TCL: JobDetail -> handleAssignToJob -> this.props', this.props);

    try {
      const job = await jobService.confirmJob(jobId, nurseId, applicationId);
      // await this.props.userData();
      handlerNewJobs();
      this.setState({
        job: job.job,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  };

  handleQuitFromJob = async (jobId, nurseId) => {
    const { user } = this.state;
    const { handlerNewJobs } = this.props;

    try {
      const job = await jobService.cancelJob(jobId, nurseId);
      // await this.props.userData();
      handlerNewJobs();
      this.setState({
        job: job.job,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  };

  handleDeclineToJob = async (jobId, nurseId) => {
    try {
      const job = await jobService.declineJob(jobId, nurseId);
      await this.props.userData();
      this.setState({
        job: job.job,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  };

  handlePendingToJob = async (jobId, nurseId) => {
    try {
      const job = await jobService.pendingJob(jobId, nurseId);

      this.setState({
        job: job.job,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  };

  render() {
    const { job, user, applicant, isApplicant, loading, error, show, manageJob, viewApplicants, nurse } = this.state;
    console.log('JOB DETAILLLLLLLLLLLLLLLLLLL');
    const {
      params: { id },
    } = this.props.match;
    // console.log('TCL: JobDetail -> render -> this.props', this.props);

    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <>
                <Card detailJob className="jobDetailPopUp">
                  {show && (
                    <>
                      <div className="iconCloseR">
                        <AiOutlineCloseCircle size="35px" color="#067ee0" onClick={this.handleShow} />
                      </div>
                      {/* <button onClick={this.handleShow}>Close Detail</button> */}
                      {user.company && (
                        <>
                          {/* <h2> COMPANY</h2> */}

                          <Button primary type="button" onClick={this.handleManageJob}>
                            MANAGE JOB
                          </Button>
                          {manageJob && (
                            <JobManageActions
                              handleViewApplicants={this.handleViewApplicants}
                              handleEditJob={this.handleEditJob}
                              job={job}
                            />
                          )}
                        </>
                      )}
                      {/* <h1>Job Detail:</h1> */}
                      {job.done && <h3>JOB COMPLETED</h3>}
                      <p className="applicants">{job.applicants.length} Applicants</p>
                      {job.employee ? (
                        <p className="assigned">Assigned</p>
                      ) : (
                        <p className="assigned not">Not Assigned</p>
                      )}
                      {!user.company && (
                        <>
                          {!applicant ? (
                            <div className="apply">
                              <p>Want to APPLY?</p>
                              <Button green onClick={this.handleApplytoJob}>
                                Apply
                              </Button>
                            </div>
                          ) : (
                            <div className="apply">
                              <p>You are an applicant!!</p>
                              {job.employee ? (
                                <>
                                  {job.employee._id === user._id ? (
                                    <></>
                                  ) : (
                                    <>
                                      <p>Sorry, your petition was Declined</p>
                                    </>
                                  )}
                                </>
                              ) : (
                                <>
                                  <Button red onClick={this.handleCancelApplytoJob}>
                                    Cancel Application
                                  </Button>
                                </>
                              )}
                              {/* <Button red onClick={this.handleCancelApplytoJob}>
                                Cancel Application
                              </Button> */}
                              {/* {job.employee && (
                                <>
                                  {console.log('TCL: JobDetail -> render -> job.employee.', job.employee._id)}
                                  {console.log('TCL: JobDetail -> render -> user._id', user._id)}
                                  {job.employee._id === user._id ? (
                                    <></>
                                  ) : (
                                    <>
                                      <Button red onClick={this.handleCancelApplytoJob}>
                                        Cancel Application
                                      </Button>
                                      <p>Sorry, your petition was Declined</p>
                                    </>
                                  )}

                                  <p>You are an applicant!!</p>
                                </>
                              )} */}
                            </div>
                          )}
                        </>
                      )}
                      <CardJob job={job}></CardJob>
                      {user.company && job.employee && (
                        <>
                          <p className="worker">Applicant ASSIGNED</p>
                          <NurseDetail
                            applicant={false}
                            job={job}
                            jobId={job._id}
                            nurse={job.employee}
                            employee={job.employee}
                            handleAssignToJob={this.handleAssignToJob}
                            handleQuitFromJob={this.handleQuitFromJob}
                            handleDeclineToJob={this.handleDeclineToJob}
                            handlePendingToJob={this.handlePendingToJob}
                          />
                        </>
                      )}
                      {user.company && viewApplicants && (
                        <>
                          <div>
                            <p className="worker unAssigned"> Applicants:</p>
                            {/* {console.log(' DENTRO APLLICANTS ', job)} */}
                            {job.applicants.map(nurse => {
                              console.log('TCL: JobDetail -> render MAP -> nurse', nurse);
                              return (
                                <div key={nurse._id}>
                                  {/* <p>{nurse.status}</p> */}
                                  <NurseDetail
                                    applicant={true}
                                    job={job}
                                    jobId={job._id}
                                    nurse={nurse}
                                    handleAssignToJob={this.handleAssignToJob}
                                    handleQuitFromJob={this.handleQuitFromJob}
                                    handleDeclineToJob={this.handleDeclineToJob}
                                    handlePendingToJob={this.handlePendingToJob}
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
