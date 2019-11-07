import React, { Component } from 'react';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';

class JobDetail extends Component {
  state = {
    job: {},
    loading: true,
    error: undefined,
  };

  async componentDidMount() {
    const { user } = this.props;
    const {
      params: { id },
    } = this.props.match;
    this.getJob(id);
  }

  getJob = async id => {
    try {
      const job = await jobService.jobDetail(id);
      return job;
      // this.setState({
      //   job,
      //   loading: false,
      // });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOB',
      });
    }
  };
  // const NewJob = this.getJob(id);

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.getJob(this.props.match.params.id);
    }
  }

  render() {
    const {
      job: { job },
      loading,
      error,
    } = this.state;
    const {
      params: { id },
    } = this.props.match;

    console.log('TCL: JobDetail -> render -> job', job);

    return (
      <div>
        {!error && (
          <>
            {!loading && (
              <>
                HOLA
                <CardJob getJob={this.getJob} job={job}></CardJob>
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withAuth(JobDetail);
