import React from 'react';
import { BrowserRouter as Router, Switch, Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import Button from '../ui/Button';
import './JobManageActions.css';
import Card from '../ui/Card';
import CompanyUpdate from './CompanyUpdate';

const JobManageActions = props => {
  const { handleViewApplicants, handleEditJob, job } = props;
  return (
    <div className="wrapperActions">
      <Button type="button" onClick={handleViewApplicants}>
        View Applicants
      </Button>
      <Link to={`/private/company/job/${job._id}/edit`}>
        <Button orange>Edit Job</Button>
      </Link>
      {/* <Button red>DELETE</Button> */}
    </div>
  );
};

export default withAuth(JobManageActions);
