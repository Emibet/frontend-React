import React from 'react';

const JobManageActions = props => {
  console.log('TCL: props', props);
  const { handleViewApplicants } = props;
  return (
    <div>
      <button type="button" onClick={handleViewApplicants}>
        View Applicants
      </button>
      <button>HOLA2</button>
      <button>HOLA3</button>
      <button>HOLA4</button>
    </div>
  );
};

export default JobManageActions;
