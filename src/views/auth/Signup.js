import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';
import minilogo from '../../images/minilogo.jpg';
import WrappForm from '../../ui/WrappForm';
import Form from '../../ui/Form';
import WrappImage from '../../ui/WrappImage';

import Label from '../../ui/Label';
import Input from '../../ui/Input';
import Group from '../../ui/Group';
import InputSubmit from '../../ui/InputSubmit';

class Signup extends Component {
  state = {
    username: '',
    password: '',
    company: false,
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    const { username, password, company } = this.state;
    this.props.handleSignup({
      username,
      password,
      company,
    });
  };

  checkifCompany = contractor => {
    if (contractor === '/signup-contractor') {
      this.setState({
        company: true,
      });
    }
  };

  componentDidMount() {
    const contractor = this.props.match.path;

    this.checkifCompany(contractor);
  }

  render() {
    const { username, password, company } = this.state;

    return (
      <WrappForm>
        <Form onSubmit={this.handleFormSubmit}>
          <WrappImage>
            <img src={minilogo} className="imgLogo" alt="Logo Emibet" />
          </WrappImage>
          <Group>
            <Input type="hidden" name="company" value={company} />
            <Label>Username:</Label>
            <Input type="text" name="username" value={username} onChange={this.handleChange} />
          </Group>
          <Group>
            <Label>Password:</Label>
            <Input type="password" name="password" value={password} onChange={this.handleChange} />
          </Group>
          <InputSubmit type="submit" value="Signup" />
        </Form>

        <p>
          Already have account?
          <Link className="login" to={'/login'}>
            Login
          </Link>
        </p>
      </WrappForm>
    );
  }
}

export default withAuth(Signup);
