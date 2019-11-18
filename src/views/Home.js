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
            <h1 className="homepageTitle">Welcome to EMIBET</h1>
            <h2 className="homepageTitle">FIND YOUR JOB // FIND YOUR NURSE:</h2>
            <h3 className="homepageTitle"> Register as contractor to publish Job Offers and manage the candidates.</h3>
            <h3 className="homepageTitle">
              Register as Nurse to see the Offers and view the status of your application.
            </h3>
            <h2 className="homepageSubTit">Job Offers:</h2>
            <div className="wrapperTable">
              <table className="table">
                <thead className="thead">
                  <tr className="tableTr">
                    <th className="tTitle">Job Title</th>
                    <th className="tTitle">Location</th>
                    <th className="tTitle">Description</th>
                  </tr>
                </thead>
                {/* <tfoot>
                <tr>
                <td>Job Title</td>
                <td>Location</td>
                <td>Description</td>
                </tr>
              </tfoot> */}
                <tbody className="tBody">
                  {!loading &&
                    jobs.jobs.map(job => {
                      return (
                        <tr key={job._id}>
                          <td className="tContent">{job.title}</td>
                          <td className="tContent"> {job.location}</td>
                          <td className="tContent"> {job.description}</td>
                        </tr>
                      );
                    })}
                  {/* <tr>
                  <td className="tContent">Body content 1</td>
                  <td>Body content 2</td>
                  <td>Body content 2</td>
                </tr> */}
                </tbody>
              </table>
            </div>

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
