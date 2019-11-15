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

    const {
      params: { id },
    } = this.props.match;
    try {
      const job = await jobService.jobDetail(id);

      const isApplicant = 0;

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
    console.log('TCL: JobDetail -> getJob -> id', id);
    const { user } = this.state;
    try {
      const job = await jobService.jobDetail(id);

      const isApplicant = await job.job.applicants.filter(applicant => applicant.user._id === user._id);

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
    const { userData } = this.props;

    try {
      const job = await jobService.confirmJob(jobId, nurseId, applicationId);

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
    const { userData } = this.props;

    try {
      const job = await jobService.cancelJob(jobId, nurseId);

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
                      <button onClick={this.handleShow}>Close Detail</button>
                      {user.company && (
                        <>
                          {/* <h2> COMPANY</h2> */}

                          <Button primary type="button" onClick={this.handleManageJob}>
                            MANAGE JOB
                          </Button>
                          {manageJob && <JobManageActions handleViewApplicants={this.handleViewApplicants} />}
                        </>
                      )}
                      {/* <h1>Job Detail:</h1> */}
                      {job.done && <h3>JOB COMPLETED</h3>}
                      {job.applicants.length} Applicants
                      {job.employee ? <p>Assigned</p> : <p>Not Assigned</p>}
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
                          <p>Print worker</p>
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
                            Applicants:
                            {/* {console.log(' DENTRO APLLICANTS ', job)} */}
                            {job.applicants.map(nurse => {
                              console.log('TCL: JobDetail -> render MAP -> nurse', nurse);
                              return (
                                <div key={nurse._id}>
                                  <p>{nurse.status}</p>
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
