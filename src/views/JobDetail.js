import React from 'react';

const JobDetail = props => {
  console.log('TCL: JobDetail -> props', props);

  const { params } = props.match;
  return (
    <div>
      <h1>Job Detail:</h1>
    </div>
  );
};

export default JobDetail;
