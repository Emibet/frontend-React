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
        <button type="button" onClick={this.handleShowCV}>
          View CV
        </button>
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
        {user.company && nurse && !job.employee && (
          <>
            <button type="button" onClick={() => handleAssignToJob(nurse, jobId)}>
              Assign to JOB
            </button>
          </>
        )}
        <p>{nurse.user.username}</p>
        <p> {nurse.user.nurse.location}</p>
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
