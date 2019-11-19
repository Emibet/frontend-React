import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import jobService from '../services/jobService';
import authService from '../services/authService';
import Message from '../ui/Message';
import Input from '../ui/Input';
import InputSubmit from '../ui/InputSubmit';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

const Label = styled.label`
  color: #4f98d3;
  position: absolute;
`;

class JobNew extends Component {
  state = {
    username: '',
    password: '',
    company: false,
    user: {},
    job: {},
    loading: true,
    message: undefined,
    redirect: false,
  };

  async componentDidMount() {
    const { user } = this.props; // Original

    try {
      this.setState({
        user,
        loading: false,
        redirect: false,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
      });
    }
  }

  handleChange = event => {
    const { user, job } = this.state;

    const { name, value, type, checked } = event.target;
    this.setState({
      job: {
        ...job,
        [name]: value,
      },
    });
  };

  handleChangeBox = event => {
    const { job } = this.state;
    const { name, checked: value, type } = event.target;

    this.setState({
      job: {
        ...job,
        [name]: value,
      },
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, company, user, job } = this.state;

    jobService
      .addNewJob(job, user.username)
      .then(() => {
        this.setState({
          redirect: true,
          message: 'JOB Added',
          job: {
            title: '',
            location: '',
            contractType: '',
            salaryMin: '',
            salaryMax: '',
            experienceMin: '',
            workDay: '',
            study: '',
            requirementMin: '',
            description: '',
          },
        });
      })

      .catch(() => {
        console.log('catch');
      });
  };

  render() {
    const { username, password, company, user, job, message, loading, redirect } = this.state;

    return (
      <div>
        ADD NEW JOB:
        {username}
        {message && <Message>{message}</Message>}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <Label htmlFor="title">Title:</Label>
              <Input
                update
                type="text"
                name="title"
                id="title"
                value={job.title}
                onChange={this.handleChange}
                required
              />

              <Label htmlFor="location">City:</Label>
              <Input
                update
                type="text"
                name="location"
                id="location"
                value={job.location}
                onChange={this.handleChange}
              />

              <Label htmlFor="contractType">Contract Type:</Label>
              <Input
                update
                type="text"
                name="contractType"
                id="contractType"
                value={job.contractType}
                onChange={this.handleChange}
              />

              <Label htmlFor="salaryMin">Minimun Salary:</Label>
              <Input
                update
                type="number"
                name="salaryMin"
                id="salaryMin"
                value={job.salaryMin}
                onChange={this.handleChange}
              />

              <Label htmlFor="salaryMax">Maximun Salary:</Label>
              <Input
                update
                type="number"
                name="salaryMax"
                id="salaryMax"
                value={job.salaryMax}
                onChange={this.handleChange}
              />

              <Label htmlFor="experienceMin">Experience Required:</Label>
              <Input
                update
                type="text"
                name="experienceMin"
                id="experienceMin"
                value={job.experienceMin}
                onChange={this.handleChange}
              />

              <Label htmlFor="workDay">Work Day:</Label>
              <Input update type="text" name="workDay" id="workDay" value={job.workDay} onChange={this.handleChange} />

              <Label htmlFor="study">Study:</Label>
              <Input update type="text" name="study" id="study" value={job.study} onChange={this.handleChange} />

              <Label htmlFor="requirementMin">Minimun Requirement:</Label>
              <Input
                update
                type="text"
                name="requirementMin"
                id="requirementMin"
                value={job.requirementMin}
                onChange={this.handleChange}
              />

              <Label htmlFor="description">JOB Description:</Label>
              <Input
                update
                type="text"
                name="description"
                id="description"
                value={job.description}
                onChange={this.handleChange}
              />

              <InputSubmit type="submit" value="ADD JOB" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(JobNew);
