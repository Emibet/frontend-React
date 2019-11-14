import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import jobService from '../services/jobService';
import NurseInfo from './NurseInfo';

class NurseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: this.props.job,
      nurse: this.props.nurse,
      employee: this.props.job.employee,
      user: this.props.user,
      jobId: this.props.jobId,
      showCV: false,
      loading: true,
      error: undefined,
      applicant: this.props.applicant,
    };
  }

  handleShowCV = () => {
    const { showCV } = this.state;
    this.setState({
      showCV: !showCV,
    });
  };

  componentDidUpdate(prevProps) {
    if (this.props.job.employee !== prevProps.job.employee) {
      this.setState({
        job: this.props.job,
        nurse: this.props.nurse,
        employee: this.props.employee,
        applicant: this.props.applicant,
      });
    }
  }

  render() {
    const { user, showCV, jobId, job, employee, applicant } = this.state;
    const { handleAssignToJob, handleQuitFromJob, handleDeclineToJob, handlePendingToJob, nurse } = this.props;

    return (
      <div>
        {user.company && job.employee && (
          <>
            {job.employee._id === nurse._id ? (
              <>
                <button type="button" onClick={() => handleQuitFromJob(jobId, nurse._id)}>
                  QUIT from JOB
                </button>
                <NurseInfo user={employee} />
              </>
            ) : (
              // <button type="button" onClick={this.handleAssignToJob}>
              //   Assign to JOB
              // </button>
              <></>
            )}
            {/* <p>ADD to Job</p> */}
          </>
        )}
        {/* <p>
          {nurse.user.username} 
          </p>
        <p> {nurse.user.nurse.location}</p> */}
        {user.company && nurse && applicant && (
          <>
            Request: {nurse.status}
            <button type="button" onClick={this.handleShowCV}>
              View CV
            </button>
            <NurseInfo user={nurse.user} />
            {nurse.status === 'Pending' && !job.employee && (
              <>
                <button type="button" onClick={() => handleAssignToJob(jobId, nurse.user._id, nurse._id)}>
                  Assign to JOB
                </button>
              </>
            )}
            {nurse.status === 'Pending' && (
              <button type="button" onClick={() => handleDeclineToJob(jobId, nurse.user._id)}>
                Decline
              </button>
            )}
            {nurse.status === 'Declined' && (
              <button type="button" onClick={() => handlePendingToJob(jobId, nurse.user._id)}>
                To Pending
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
