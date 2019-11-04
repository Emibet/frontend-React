import React from 'react';

const FormExperience = ({ nurse, company, job, currentJob, startDate, endDate, jobDescription, handleChange }) => {
  return (
    <div>
      <label htmlFor="company">Company:</label>
      <input type="text" name="company" id="company" value={company} onChange={handleChange} />
      <h2>{company}</h2>
      <p>Job: {job}</p>
    </div>
  );
};

export default FormExperience;
