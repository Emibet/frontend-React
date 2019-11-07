import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import jobService from '../services/jobService';

class CardJob extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = { job: this.props.job, user: this.props.user };
    this.handleApplytoJob = this.handleApplytoJob.bind(this);
    this.handleCancelApplytoJob = this.handleCancelApplytoJob.bind(this);
  }

  async componentDidMount() {
    // const { job, user } = this.props;
    const { job, user } = this.state;
    try {
      const isApplicant = await job.applicants.filter(applicant => applicant._id === user._id);
      console.log('TCL: CardJob -> componentDidMount -> applicant', isApplicant);
      const applicant = isApplicant.length > 0;

      this.setState({
        job,
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

  handleApplytoJob = async () => {
    const { job, user } = this.state;
    console.log('Vamos a aplicar al Trabajo');
    try {
      const newAplication = await jobService.applytoJob(job._id, user._id);
      const isApplicant = await newAplication.job.applicants.filter(applicant => applicant._id === user._id);
      const applicant = isApplicant.length > 0;
      // const applicant = await newAplication.job.applicants.includes(user._id);
      console.log('TCL: CardJob -> handleApplytoJob -> newAplication', newAplication);
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
    console.log('Vamos a cancelar la aplicación al Trabajo');

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
    console.log('This PROPS: ', this.props.job._id);
    if (this.props !== prevProps) {
      this.props.getJob(this.props.job._id);
    }
  }

  render() {
    const { job, user } = this.props;
    const { applicant, isApplicant } = this.state;
    console.log('TCL: CardJob -> render -> job', job);
    console.log('TCL: CardJob -> render -> user', user);
    console.log('TCL: CardJob -> render -> applicant', applicant);
    console.log('TCL: CardJob -> render -> isApplicant', isApplicant);
    return (
      <div>
        <h1>Job Detail:</h1>
        {job.done && <h3>JOB COMPLETED</h3>}
        {user.company && <>{job.applicants.length} Applicants</>}
        {!user.company && (
          <>
            {job.applicants.length} Applicants
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
        <p>
          Title:
          {job.title}
        </p>
        <p>
          Location:
          {job.location}
        </p>
        <p>
          Contract:
          {job.contractType}
        </p>
        <p>
          Minimun Salary:
          {job.salaryMin}
        </p>
        <p>
          Maximun Salary:
          {job.salaryMax}
        </p>
        <p>
          Minimun Experience Required:
          {job.experienceMin}
        </p>
        <p>
          WorkDay:
          {job.workday}
        </p>
        <p>
          Study:
          {job.study}
        </p>
        <p>
          Minimun Requiremet:
          {job.requirementMin}
        </p>
        <p>
          Applicants:
          {job.title}
        </p>
        <p>
          Employee:
          {job.title}
        </p>
      </div>
    );
  }
}

export default withAuth(CardJob);
