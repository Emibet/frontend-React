import React from 'react';
import { withAuth } from '../Context/AuthContext';
import NurseDetail from './NurseDetail';

const JobApplicants = ({ job }) => {
  console.log('TCL: JOB APPLICANTS job', job);

  return (
    <div>
      Applicants:
      {job.applicants.map(nurse => {
        return (
          <div key={nurse._id}>
            <NurseDetail job={job} jobId={job._id} nurse={nurse} />
          </div>
        );
      })}
    </div>
  );
};

export default withAuth(JobApplicants);
