import React from 'react';

const CompanyInfo = props => {
  const { username, NIF, address, contactName, email, location, phone, jobs } = props.user;
  return (
    <div>
      <p>Company INFO: </p>
      <p>TOTAL JOBS CREATED: {jobs.length}</p>
      <p>{username}</p>
      <p>{NIF}</p>
      <p>{address}</p>
      <p>{contactName}</p>
      <p>{email}</p>
      <p>{location}</p>
      <p>{phone}</p>
    </div>
  );
};

export default CompanyInfo;
