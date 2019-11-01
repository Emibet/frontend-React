import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../../Context/AuthContext';

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
    let empresa;
    if (contractor === '/signup-contractor') {
      empresa = true;
      this.setState({
        company: true,
      });
    }
    console.log('TCL: Signup -> empresa', empresa);
    // contractor === '/signup-contractor' ? (empresa = true) : (empresa = false);
  };

  componentDidMount() {
    // const { username, password, company } = this.state;
    const contractor = this.props.match.path;
    // let empresa;
    this.checkifCompany(contractor);

    // if (contractor === '/signup-contractor') {
    //   empresa = true;
    //   console.log('YEEEES TCL: Signup -> componentDidMount -> empresa', empresa);
    // }
    // this.setState({
    //   company: empresa,
    // });
  }

  render() {
    const { username, password, company } = this.state;
    console.log('PROPS: ', this.props);
    // console.log('TCL: Signup -> render -> contractor', contractor);
    console.log('TCL: Signup -> componentDidMount -> company', company);
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <input type="hidden" name="company" value={company} />
          <label>Username:</label>
          <input type="text" name="username" value={username} onChange={this.handleChange} />
          <label>Password:</label>
          <input type="password" name="password" value={password} onChange={this.handleChange} />
          <input type="submit" value="Signup" />
        </form>

        <p>
          Already have account?
          <Link to={'/login'}> Login</Link>
        </p>
      </div>
    );
  }
}

export default withAuth(Signup);
