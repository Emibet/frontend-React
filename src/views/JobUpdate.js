import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router, Switch, Link, useParams, useRouteMatch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
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
  // constructor(props) {
  //   super(props);

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
  // }

  async componentDidMount() {
    const {
      params: { id },
    } = this.props.match;
    console.log('TCL: JobNew -> componentDidMount -> id', id);
    const { user } = this.props; // Original

    console.log('TCL: JobNew -> componentDidMount -> this.props', this.props);
    console.log('TCL: JOB NEW -> componentDidMount -> user', user);

    const job = await jobService.jobDetail(id);
    console.log('TCL: JobNew -> componentDidMount -> job', job);

    try {
      this.setState({
        job: job.job,
        user,
        loading: false,
        // redirect: false,
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

  // handleChangeBox = event => {
  //   // console.log('TCL: NurseUpdate -> event', event.target.name);
  //   const { job } = this.state;
  //   const { name, checked: value, type } = event.target;
  //   // console.log('TCL: NurseUpdate -> value', type);
  //   // console.log('TCL: NurseUpdate -> value', value);

  //   this.setState({
  //     job: {
  //       ...job,
  //       [name]: value,
  //     },
  //   });
  // };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, company, user, job } = this.state;
    // this.props.handleUpdate({
    //   username,
    //   password,
    //   company,
    // });
    // console.log('The JOB to SEND: ', job);

    jobService
      .updateJob(job._id, job)
      .then(() => {
        this.setState({
          message: 'JOB Updated',
          // job: {
          //   title: '',
          //   location: '',
          //   contractType: '',
          //   salaryMin: '',
          //   salaryMax: '',
          //   experienceMin: '',
          //   workDay: '',
          //   study: '',
          //   requirementMin: '',
          //   description: '',
          // },
        });
        console.log('JobUPDATED');
      })
      // .then(() => {
      //   <Redirect to="/private" />;
      //   // this.props.userData();
      // })
      .catch(() => {
        console.log('catch');
      });
  };

  render() {
    const { username, password, company, user, job, message, loading, redirect } = this.state;

    // console.log('PROPS: ', this.props);

    // if (redirect) {
    //   console.log('REDIRECTS');
    //   return <Redirect to={'/private/company/jobs'} />;
    // }

    return (
      <div>
        UPDATE JOB:
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

              {/* <Label htmlFor="urgent">CHECK IF URGENT:</Label>
              <Input
                update
                urgent
                type="checkbox"
                name="urgent"
                id="urgent"
                checked={job.urgent}
                onChange={this.handleChangeBox}
              /> */}

              <Label htmlFor="description">JOB Description:</Label>
              <Input
                update
                type="text"
                name="description"
                id="description"
                value={job.description}
                onChange={this.handleChange}
              />

              <InputSubmit type="submit" value="UPDATE" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(JobNew);
