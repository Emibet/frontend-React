import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import './CardJob.css';

class CardJob extends Component {
  render() {
    const { job, user } = this.props;

    return (
      <div className="cardJob-Wrapper-info">
        {job.title && (
          <div className="cardJob-info">
            Title:
            <p>{job.title}</p>
          </div>
        )}

        {job.location && (
          <div className="cardJob-info">
            Location:
            <p> {job.location}</p>
          </div>
        )}
        {job.contractType && (
          <div className="cardJob-info">
            Contract:
            <p>{job.contractType}</p>
          </div>
        )}
        {job.salaryMin && (
          <div className="cardJob-info">
            Minimun Salary:
            <p>{job.salaryMin}</p>
          </div>
        )}
        {job.salaryMax && (
          <div className="cardJob-info">
            Maximun Salary:
            <p>{job.salaryMax}</p>
          </div>
        )}
        {job.experienceMin && (
          <div className="cardJob-info">
            Minimun Experience Required:
            <p>{job.experienceMin}</p>
          </div>
        )}
        {job.workday && (
          <div className="cardJob-info">
            WorkDay:
            <p>{job.workday}</p>
          </div>
        )}
        {job.study && (
          <div className="cardJob-info">
            Study:
            <p>{job.study}</p>
          </div>
        )}
        {job.requirementMin && (
          <div className="cardJob-info">
            Minimun Requiremet:
            <p>{job.requirementMin}</p>
          </div>
        )}
        {job.description && (
          <div className="cardJob-info">
            Description:
            <p>{job.description}</p>
          </div>
        )}

        {job.employee && (
          <div className="cardJob-info">
            Employee:
            <p>{job.employee.nurse.name}</p>
          </div>
        )}
      </div>
    );
  }
}

export default withAuth(CardJob);
