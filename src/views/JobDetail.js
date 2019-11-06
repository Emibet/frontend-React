import React, { Component } from 'react';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';

// const JobDetail = props => {
//   console.log('TCL: JOBDETAIL props', props);

//   const {
//     params: { id },
//   } = props.match;

//   const getJob = async id1 => {
//     const job = await jobService.jobDetail(id1);
//     console.log('TCL: job', job);
//     return job;
//   };
//   console.log('TCL: getJob', getJob);

//   const job = getJob(id);
//   const newJob = job.then(theJob => theJob);
//   console.log('TCL: newJob', newJob);

//   // console.log('TCL: NewJob', job);

//   return (
//     <div>
//       {/* <CardJob job={job}></CardJob> */}
//       Hola
//     </div>
//   );
// };

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
    // console.log('TCL: JobDetail -> componentDidMount -> params', id);
    // try {
    //   const job = await jobService.jobDetail(id);
    //   this.setState({
    //     job,
    //     loading: false,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   this.setState({
    //     loading: false,
    //     error: 'Unable to load JOB',
    //   });
    // }
    this.getJob(id);
  }

  getJob = async id => {
    try {
      const job = await jobService.jobDetail(id);
      this.setState({
        job,
        loading: false,
      });
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
