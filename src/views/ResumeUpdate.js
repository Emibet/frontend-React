import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import authService from '../services/authService';
import FormExperience from './FormExperience';

class NurseUpdate extends Component {
  state = {
    username: '',
    password: '',
    company: false,
    user: {},
    loading: true,
    message: undefined,
  };

  async componentDidMount() {
    // const {
    //   match: {
    //     params: { id },
    //   },
    // } = this.props;
    const { user } = this.props; // Original

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
    const {
      user: { nurse },
      user,
    } = this.state;

    const { name, value, type, checked } = event.target;
    this.setState({
      user: {
        ...user,
        nurse: {
          ...nurse,
          resume: {
            ...nurse.resume,
            [name]: value,
          },
          // [name]: type === 'checked' ? checked : value,
        },
      },
    });
  };

  handleChangeBox = event => {
    console.log('TCL: NurseUpdate -> event', event.target.name);
    const {
      user: { nurse },
      user,
    } = this.state;
    const { name, checked: value, type } = event.target;
    console.log('TCL: NurseUpdate -> value', type);
    console.log('TCL: NurseUpdate -> value', value);

    this.setState({
      user: {
        ...user,
        nurse: {
          ...nurse,
          resume: {
            ...nurse.resume,
            [name]: value,
          },
        },
      },
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, company, user } = this.state;
    // this.props.handleUpdate({
    //   username,
    //   password,
    //   company,
    // });
    console.log('The USER to SEND: ', user);

    userService
      .updateUserNurse(user)
      .then(() => {
        this.setState({
          message: 'User Updated',
        });
        console.log('UserUpdated');
      })
      .then(() => {
        this.props.userData();
      })
      .catch(() => {
        console.log('catch');
      });
  };

  render() {
    const { username, password, company, user, message, loading } = this.state;
    const {
      user: { nurse },
    } = this.state;
    console.log('TCL: NurseUpdate -> render -> nurse', nurse);

    // const {
    //   user: { title, author, description, rating },
    //   loading,
    //   message,
    // } = this.state;
    console.log('PROPS: ', this.props);
    // console.log('TCL: Signup -> render -> contractor', contractor);
    console.log('TCL: Signup -> componentDidMount -> user', user);

    console.log('TCL: NurseUpdate -> render -> nurse.experience', nurse);
    return (
      <div>
        NURSE UPDATE RESUME COMPONENT:
        {username}
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="licenseNumber">licenseNumber:</label>
              <input
                type="number"
                name="licenseNumber"
                id="licenseNumber"
                value={nurse.resume.licenseNumber}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="freelance">Mark if you are Freelance:</label>
              <input
                type="checkbox"
                name="freelance"
                id="freelance"
                checked={nurse.resume.freelance}
                onChange={this.handleChangeBox}
              />
              <br></br>
              <label htmlFor="year">NurseDegree (Year):</label>
              <input type="date" name="year" id="year" value={nurse.nurseDegree} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="experience">Experience:</label>
              {nurse.resume.experience.map((oneExperience, index) => (
                <FormExperience
                  key={index}
                  nurse={nurse}
                  company={oneExperience.company}
                  job={oneExperience.job}
                  currentJob={oneExperience.currentJob}
                  startDate={oneExperience.startDate}
                  endDate={oneExperience.endDate}
                  jobDescription={oneExperience.jobDescription}
                  handleChange={this.handleChange}
                />
              ))}
              <input type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(NurseUpdate);
