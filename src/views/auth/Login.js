import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { withAuth } from '../../Context/AuthContext';

const Form = styled.form`
  // display: flex;
  // flex-direction: column;
  text-align: center;
  display: block;
  box-sizing: border-box;
`;

const WrappForm = styled.div`
  margin: 3em auto;
  width: 20em;
  border: 2px solid #4f98d3;
  border-radius: 10px;
  padding: 1em;
  color: #4f98d3;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 0.5em auto;
  // position: absolute;
  pointer-events: none;
`;

const Input = styled.input`
  display: block;
  margin: 0.5em auto;
  border: none;
  border-bottom: 1px solid #757575;
  &:focus {
    outline: none;
  }
`;

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

const Group = styled.div`
  position: relative;
  margin-bottom: 2em;
`;

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
