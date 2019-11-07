import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';

class CardJob extends Component {
  render() {
    const { job, user } = this.props;

    return (
      <div>
        <p>
          Title:
          {job.title}
        </p>
        <p>
          Location:
          {job.location}
        </p>
        <p>
          Contract:
          {job.contractType}
        </p>
        <p>
          Minimun Salary:
          {job.salaryMin}
        </p>
        <p>
          Maximun Salary:
          {job.salaryMax}
        </p>
        <p>
          Minimun Experience Required:
          {job.experienceMin}
        </p>
        <p>
          WorkDay:
          {job.workday}
        </p>
        <p>
          Study:
          {job.study}
        </p>
        <p>
          Minimun Requiremet:
          {job.requirementMin}
        </p>
        <p>
          Applicants:
          {job.title}
        </p>
        <p>
          Employee:
          {job.title}
        </p>
      </div>
    );
  }
}

export default withAuth(CardJob);
