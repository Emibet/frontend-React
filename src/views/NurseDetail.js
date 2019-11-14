import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import jobService from '../services/jobService';

class NurseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.job,
      nurse: this.props.nurse,
      user: this.props.user,
      jobId: this.props.jobId,
      showCV: false,
      loading: true,
      error: undefined,
    };
  }

  handleShowCV = () => {
    const { showCV } = this.state;
    this.setState({
      showCV: !showCV,
    });
  };

  // handleAssignToJob = async () => {
  //   const { nurse, user, jobId } = this.state;
  //   const { userData } = this.props;
  //   console.log('TCL: NurseDetail -> handleAssignToJob -> user', user);
  //   console.log('TCL: NurseDetail -> handleAssignToJob -> nurse', nurse);
  //   console.log('TCL: NurseDetail -> handleAssignToJob -> jobId', jobId);
  //   try {
  //     const job = await jobService.confirmJob(jobId, nurse._id);
  //     console.log('TCL: NurseDetail -> handleAssignToJob -> job', job);
  //     this.setState({
  //       job: job.job,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     this.setState({
  //       loading: false,
  //       error: 'Unable to load JOBS',
  //     });
  //   }
  //   // userData();
  // };

  componentDidUpdate(prevProps) {
    console.log('UPDATE COMPONENT NURSE DETAIL');
    // const { manageJob, viewApplicants } = this.state;
    console.log('TCL: JobDetail -> componentDidUpdate -> prevProps', prevProps);
    console.log('TCL: JobDetail -> componentDidUpdate -> this.props', this.props);
    if (this.props.job.employee !== prevProps.job.employee) {
      // this.getJob(this.props.match.params.id);
      this.setState({
        job: this.props.job,
        nurse: this.props.nurse,
      });
    }
  }

  render() {
    const { nurse, user, showCV, jobId, job } = this.state;
    const { handleAssignToJob, handleQuitFromJob } = this.props;
    console.log('TCL: NurseDetail -> render -> job', job);
    console.log('TCL: NurseDetail -> render -> job employee', job.employee);
    // const { handleShowCV } = this.props;
    console.log('TCL: NurseDetail -> render -> nurse', nurse);
    return (
      <div>
        {user.company && job.employee && (
          <>
            {job.employee._id === nurse._id ? (
              <button type="button" onClick={() => handleQuitFromJob(nurse, jobId)}>
                QUIT from JOB
              </button>
            ) : (
              // <button type="button" onClick={this.handleAssignToJob}>
              //   Assign to JOB
              // </button>
              <></>
            )}

            {/* <p>ADD to Job</p> */}
          </>
        )}
        <p>
          {nurse.user.username} Request: {nurse.status}
        </p>
        <p> {nurse.user.nurse.location}</p>
        {user.company && nurse && !job.employee && (
          <>
            <button type="button" onClick={this.handleShowCV}>
              View CV
            </button>
            {nurse.status === 'Pending' && !job.employee && (
              <>
                <p> Appli_ID:{nurse._id}</p>
                <p> JOB:ID{jobId}</p>
                <p>NurseID: {nurse.user._id}</p>
                <button type="button" onClick={() => handleAssignToJob(jobId, nurse.user._id, nurse._id)}>
                  Assign to JOB
                </button>
              </>
            )}
            {nurse.status === 'Pending' && !job.employee && (
              <button type="button" onClick={() => handleAssignToJob(nurse, jobId)}>
                Decline
              </button>
            )}
          </>
        )}
        {showCV && (
          <>
            {nurse.user.nurse.resume.freelance ? (
              <>
                <p>I`m Freelance</p>
              </>
            ) : (
              <>
                <p>Not Freelance</p>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withAuth(NurseDetail);
