import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AnonRoute from '../components/AnonRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';
import Card from '../ui/Card';
import './Home.css';

class Home extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
  };

  async componentDidMount() {
    try {
      const jobs = await jobService.listAllJobs();
      console.log('TCL: Home -> componentDidMount -> jobs', jobs);
      this.setState({
        jobs,
        loading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        error: 'Unable to load JOBS',
      });
    }
  }

  render() {
    const { jobs, loading, error } = this.state;
    return (
      <>
        {!error && (
          <Card>
            <h1 className="homepageTitle">FIND YOUR JOB or NURSE:</h1>
            <h2>Jobs:</h2>
            {!loading &&
              jobs.jobs.map(job => {
                return (
                  <div key={job._id}>
                    <div>{job.title}</div>
                    <div> {job.location}</div>
                  </div>
                );
              })}

            {/* {jobs.jobs.map()} */}
          </Card>
        )}
        {loading && <div>loading...</div>}
        {/* <div className="col-7">
          <Route exact path="/jobs/:id/detail" component={JobDetail}></Route>
        </div> */}
      </>
    );
  }
}

export default Home;
