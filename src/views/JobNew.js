import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import jobService from '../services/jobService';
import authService from '../services/authService';

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
    // const {
    //   match: {
    //     params: { id },
    //   },
    // } = this.props;
    const { user } = this.props; // Original
    console.log('TCL: CompanyUpdate -> componentDidMount -> user', user);

    try {
      this.setState({
        user,
        loading: false,
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
    console.log('TCL: NurseUpdate -> event', event.target.name);
    const { job } = this.state;
    const { name, checked: value, type } = event.target;
    console.log('TCL: NurseUpdate -> value', type);
    console.log('TCL: NurseUpdate -> value', value);

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
    // this.props.handleUpdate({
    //   username,
    //   password,
    //   company,
    // });
    console.log('The JOB to SEND: ', job);

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
        console.log('JobAdded');
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

    console.log('PROPS: ', this.props);

    if (redirect) {
      return <Redirect to="/private/myjobs" />;
    }

    return (
      <div>
        ADD NEW JOB COMPONENT:
        {username}
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="title">Title:</label>
              <input type="text" name="title" id="title" value={job.title} onChange={this.handleChange} required />
              <br></br>
              <label htmlFor="location">City:</label>
              <input type="text" name="location" id="location" value={job.location} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="contractType">Contract Type:</label>
              <input
                type="text"
                name="contractType"
                id="contractType"
                value={job.contractType}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="salaryMin">Minimun Salary:</label>
              <input type="number" name="salaryMin" id="salaryMin" value={job.salaryMin} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="salaryMax">Maximun Salary:</label>
              <input type="number" name="salaryMax" id="salaryMax" value={job.salaryMax} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="experienceMin">Experience Required:</label>
              <input
                type="text"
                name="experienceMin"
                id="experienceMin"
                value={job.experienceMin}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="workDay">Work Day:</label>
              <input type="text" name="workDay" id="workDay" value={job.workDay} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="study">Study:</label>
              <input type="text" name="study" id="study" value={job.study} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="requirementMin">Minimun Requirement:</label>
              <input
                type="text"
                name="requirementMin"
                id="requirementMin"
                value={job.requirementMin}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="urgent">CHECK IF URGENT:</label>
              <input type="checkbox" name="urgent" id="urgent" checked={job.urgent} onChange={this.handleChangeBox} />
              <br></br>
              <label htmlFor="description">JOB Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={job.description}
                onChange={this.handleChange}
              />
              <br></br>

              <input type="submit" value="ADD JOB" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(JobNew);
