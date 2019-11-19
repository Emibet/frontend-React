import React from 'react';

const CompanyInfo = props => {
  const { username, NIF, address, contactName, email, location, phone } = props.user;
  const { jobs } = props;
  return (
    <div>
      <div className="nurseWelcome">
        <p className="nurseWelcomeInfo">YOUR TOTAL JOBS CREATED: </p>
        <p className="nurseWelcomeInfo"> {jobs.jobs.length} </p>
      </div>

      {username && (
        <p className="name">
          Username: <span className="info">{username}</span>
        </p>
      )}
      {NIF && (
        <p className="name">
          NIF: <span className="info">{NIF}</span>
        </p>
      )}
      {address && (
        <p className="name">
          Address: <span className="info">{address}</span>
        </p>
      )}
      {contactName && (
        <p className="name">
          Contact Name: <span className="info">{contactName}</span>
        </p>
      )}
      {email && (
        <p className="name">
          email: <span className="info">{email}</span>
        </p>
      )}
      {location && (
        <p className="name">
          Location: <span className="info">{location}</span>
        </p>
      )}
      {phone && (
        <p className="name">
          Phone: <span className="info">{phone}</span>
        </p>
      )}
    </div>
  );
};

export default CompanyInfo;
