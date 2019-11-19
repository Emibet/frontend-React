import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import companyService from '../services/companyService';
import authService from '../services/authService';
import Message from '../ui/Message';
import logo from '../images/logo192.png';
import Spinner from '../ui/Loading';

import Input from '../ui/Input';
import InputSubmit from '../ui/InputSubmit';

const Label = styled.label`
  color: #4f98d3;
  position: absolute;
`;

class CompanyUpdate extends Component {
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
    const { user } = this.state;

    const { name, value, type, checked } = event.target;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, company, user } = this.state;

    companyService
      .updateUserCompany(user)
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

    return (
      <div>
        COMPANY UPDATE PROFILE:
        {message && <Message> {message}</Message>}
        {loading && <Spinner src={logo} className="spinner" alt="logo" />}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <Label htmlFor="contactName">Contact Name:</Label>
              <Input
                update
                type="text"
                name="contactName"
                id="contactName"
                value={user.contactName}
                onChange={this.handleChange}
              />

              <Label htmlFor="email">Email:</Label>
              <Input update type="email" name="email" id="email" value={user.email} onChange={this.handleChange} />

              <Label htmlFor="location">City:</Label>
              <Input
                update
                type="text"
                name="location"
                id="location"
                value={user.location}
                onChange={this.handleChange}
              />

              <Label htmlFor="address">Address:</Label>
              <Input update type="text" name="address" id="address" value={user.address} onChange={this.handleChange} />

              <Label htmlFor="phone">Phone Number:</Label>
              <Input update type="number" name="phone" id="phone" value={user.phone} onChange={this.handleChange} />

              <Label htmlFor="NIF">NIF:</Label>
              <Input update type="text" name="NIF" id="NIF" value={user.NIF} onChange={this.handleChange} />

              <Label htmlFor="description">Company Description:</Label>
              <Input
                update
                type="text"
                name="description"
                id="description"
                value={user.description}
                onChange={this.handleChange}
              />

              <InputSubmit type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(CompanyUpdate);
