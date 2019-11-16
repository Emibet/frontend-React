import React from 'react';
import Button from '../ui/Button';

const JobManageActions = props => {
  console.log('TCL: props', props);
  const { handleViewApplicants } = props;
  return (
    <div>
      <Button type="button" onClick={handleViewApplicants}>
        View Applicants
      </Button>
      <Button orange>Edit Job</Button>
      <Button red>DELETE</Button>
    </div>
  );
};

export default JobManageActions;
