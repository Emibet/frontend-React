import React, { Component } from 'react';
import { withAuth } from '../Context/AuthContext';
import jobService from '../services/jobService';
import CompanyInfo from './CompanyInfo';
import NurseInfo from './NurseInfo';

class UserData extends Component {
  state = {
    user: {},
    loading: true,
    message: undefined,
    jobs: {},
  };

  async componentDidMount() {
    const { user } = this.props;
    let jobs = {};
    console.log('TCL: UserData -> componentDidMount -> user', user);
    try {
      if (user.company) {
        jobs = await jobService.listCompanyJobs(user.username);
      }
      this.setState({
        user,
        loading: false,
        jobs,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const { user, loading, message, jobs } = this.state;
    return (
      <div>
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            {user.company && (
              <>
                <CompanyInfo user={user} jobs={jobs} />
              </>
            )}
            {!user.company && (
              <>
                <NurseInfo user={user} />
              </>
            )}
          </>
        )}
      </div>
    );
  }
}

export default withAuth(UserData);
