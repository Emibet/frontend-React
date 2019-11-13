import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withAuth } from '../../Context/AuthContext';
import minilogo from '../../images/minilogo.jpg';

import WrappImage from '../../ui/WrappImage';
import Form from '../../ui/Form';
import WrappForm from '../../ui/WrappForm';
import Label from '../../ui/Label';
import Input from '../../ui/Input';
import InputSubmit from '../../ui/InputSubmit';
import Group from '../../ui/Group';

class Login extends Component {
  state = {
    username: '',
    password: '',
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.handleLogin({
      username,
      password,
    });
  };

  render() {
    const { username, password } = this.state;
    return (
      <WrappForm>
        <Form onSubmit={this.handleFormSubmit}>
          <WrappImage>
            <img src={minilogo} className="imgLogo" alt="Logo Emibet" />
          </WrappImage>
          <Group>
            <Label>Username</Label>
            <Input type="text" name="username" value={username} onChange={this.handleChange} required />
          </Group>
          <Group>
            <Label>Password</Label>
            <Input type="password" name="password" value={password} onChange={this.handleChange} required />
          </Group>
          <InputSubmit type="submit" value="SUBMIT" />
        </Form>
      </WrappForm>
    );
  }
}

export default withAuth(Login);
