import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import companyService from '../services/companyService';
import authService from '../services/authService';

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
    // this.props.handleUpdate({
    //   username,
    //   password,
    //   company,
    // });
    console.log('The USER to SEND: ', user);

    companyService
      .updateUserCompany(user)
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

    console.log('PROPS: ', this.props);

    return (
      <div>
        COMPANY UPDATE COMPONENT:
        {username}
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="contactName">Contact Name:</label>
              <input
                type="text"
                name="contactName"
                id="contactName"
                value={user.contactName}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" value={user.email} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="location">City:</label>
              <input type="text" name="location" id="location" value={user.location} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="address">Address:</label>
              <input type="text" name="address" id="address" value={user.address} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="phone">Phone Number:</label>
              <input type="number" name="phone" id="phone" value={user.phone} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="NIF">NIF:</label>
              <input type="text" name="NIF" id="NIF" value={user.NIF} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="description">Company Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={user.description}
                onChange={this.handleChange}
              />
              <br></br>

              <input type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(CompanyUpdate);
