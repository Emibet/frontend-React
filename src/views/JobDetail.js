import React, { Component } from 'react';
import jobService from '../services/jobService';
import { withAuth } from '../Context/AuthContext';
import CardJob from './CardJob';

const JobDetail = props => {
  console.log('TCL: props', props);

  const {
    params: { id },
  } = props.match;

  const getJob = async id1 => {
    const job = await jobService.jobDetail(id1);
    console.log('TCL: job', job);
    return job;
  };
  console.log('TCL: getJob', getJob);

  const job = getJob(id);
  const newJob = job.then(theJob => theJob);
  console.log('TCL: newJob', newJob);

  // console.log('TCL: NewJob', job);

  return (
    <div>
      {/* <CardJob job={job}></CardJob> */}
      Hola
    </div>
  );
};
// }

export default withAuth(JobDetail);
