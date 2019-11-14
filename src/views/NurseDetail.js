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
    };
    console.log('TCL: NurseDetail -> constructor -> job', this.state.job);
    console.log('TCL: NurseDetail -> constructor -> nurse', this.state.nurse);
  }

  handleShowCV = () => {
    const { showCV } = this.state;
    this.setState({
      showCV: !showCV,
    });
  };

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
        employee: this.props.employee,
      });
    }
  }

  render() {
    const { nurse, user, showCV, jobId, job, employee } = this.state;
    const { handleAssignToJob, handleQuitFromJob } = this.props;
    console.log('TCL: NurseDetail -> render -> job', job);
    console.log('TCL: NurseDetail -> render -> job employee', job.employee);
    console.log('TCL: render -> employee', employee);
    // const { handleShowCV } = this.props;
    console.log('TCL: NurseDetail -> render -> nurse', nurse);
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
          {nurse.user.username} Request: {nurse.status}
          </p>
        <p> {nurse.user.nurse.location}</p> */}
        {user.company && nurse && !job.employee && (
          <>
            <button type="button" onClick={this.handleShowCV}>
              View CV
            </button>
            <NurseInfo user={nurse.user} />
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
