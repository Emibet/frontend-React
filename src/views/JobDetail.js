import React, { Component } from 'react';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';

class JobDetail extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {
      job: this.props.job,
      user: this.props.user,
      loading: true,
      error: undefined,
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

      const isApplicant = await job.job.applicants.filter(applicant => applicant._id === user._id);
      const applicant = isApplicant.length > 0;

      this.setState({
        job: job.job,
        user,
        loading: false,
        isApplicant,
        applicant,
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
      const isApplicant = await job.job.applicants.filter(applicant => applicant._id === user._id);
      const applicant = isApplicant.length > 0;
      this.setState({
        job: job.job,
        loading: false,
        applicant,
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
      const isApplicant = await newAplication.job.applicants.filter(applicant => applicant._id === user._id);
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
      const isApplicant = await newAplication.job.applicants.filter(applicant => applicant._id === user._id);
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

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getJob(this.props.match.params.id);
    }
  }

  render() {
    const { job, user, applicant, isApplicant, loading, error } = this.state;

    const {
      params: { id },
    } = this.props.match;

    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <>
                <h1>Job Detail:</h1>
                {job.done && <h3>JOB COMPLETED</h3>}
                {job.applicants.length} Applicants
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
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withAuth(JobDetail);
