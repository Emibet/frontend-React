import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import authService from '../services/authService';
import FormExperience from './FormExperience';
import Message from '../ui/Message';
import Title from '../ui/Ttile';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

const InputSubmit = styled.input`
  background-color: #4f98d3;
  color: white;
  padding: 0.5em 1.5em;
  display: block;
  margin: 0.5em auto;
  border: none;
  border-radius: 3px;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  display: block;
  margin: 0.5em 0;
  text-align: end;
  font-size: 1em;
  /* // margin: 0.5em auto; */
  width: 100%;
  border: none;
  border-bottom: 1px solid #757575;
  &:focus {
    outline: none;
  }
  &.freelance {
    outline: 1px solid #1e5180;
    display: block;
    width: 5%;
    margin-left: auto;
  }
`;

const Label = styled.label`
  color: #4f98d3;
  position: absolute;
`;

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
        },
      },
    });
  };

  handleChangeBox = event => {
    const {
      user: { nurse },
      user,
    } = this.state;
    const { name, checked: value, type } = event.target;

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

    userService
      .updateUserNurse(user)
      .then(() => {
        this.setState({
          message: 'User Updated',
        });
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

    return (
      <div>
        <Title>UPDATE RESUME:</Title>

        {message && <Message>{message}</Message>}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <Label htmlFor="licenseNumber">licenseNumber:</Label>
              <Input
                type="number"
                name="licenseNumber"
                id="licenseNumber"
                placeholder="fill License Number"
                value={nurse.resume.licenseNumber}
                onChange={this.handleChange}
              />

              <Label htmlFor="freelance">Mark if you are Freelance:</Label>
              <Input
                className="freelance"
                type="checkbox"
                name="freelance"
                id="freelance"
                checked={nurse.resume.freelance}
                onChange={this.handleChangeBox}
              />

              <InputSubmit type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(NurseUpdate);
