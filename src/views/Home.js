import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AnonRoute from '../components/AnonRoute';
import jobService from '../services/jobService';
import JobDetail from './JobDetail';
import Card from '../ui/Card';
import './Home.css';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

class Home extends Component {
  state = {
    jobs: [],
    loading: true,
    error: undefined,
  };

  async componentDidMount() {
    try {
      const jobs = await jobService.listAllJobs();

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
          <Card home>
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
                </tbody>
              </table>
            </div>
          </Card>
        )}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
      </>
    );
  }
}

export default Home;
