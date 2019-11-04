import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import authService from '../services/authService';

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

    // Si se recarga la pagina no tenemos datos actualizados de user
    // authService
    //   .me()
    //   .then(userAct => {
    //     this.setState({
    //       isLoggedin: true,
    //       user: userAct,
    //       isLoading: false,
    //     });

    //     console.log('me', user);
    //   })
    //   .catch(() => {
    //     this.setState({
    //       isLoading: false,
    //     });
    //   });
    // // Hasta aqui
    console.log('PROPS NURSEUPDATE ComponentDidMount: ', this.props);
    console.log('PROPS NURSEUPDATE ComponentDidMount:Nurse Birthday ', user.nurse.birthday);
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
    // const { name, type } = event.target;
    // if (type === 'checked') {
    //   var { checked: value } = event.target;
    // } else {
    //   var { value } = event.target;
    // }

    // type === 'checked' ? (let{ checked: value } = event.target) : (let{ value } = event.target);
    const { name, value, type, checked } = event.target;
    this.setState({
      user: {
        ...user,
        nurse: {
          ...nurse,
          [name]: value,
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
          [name]: value,
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
      // .then(() => {
      //   this.props.userData();
      // })
      .catch(() => {
        console.log('catch');
      });
  };

  render() {
    const { username, password, company, user, message, loading } = this.state;
    // const {
    //   user: { title, author, description, rating },
    //   loading,
    //   message,
    // } = this.state;
    console.log('PROPS: ', this.props);
    // console.log('TCL: Signup -> render -> contractor', contractor);
    console.log('TCL: Signup -> componentDidMount -> user', user);

    return (
      <div>
        NURSE UPDATE COMPONENT:
        {username}
        {message && <div>{message}</div>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" value={user.nurse.name} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="surname">LastName:</label>
              <input type="text" name="surname" id="surname" value={user.nurse.surname} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" value={user.nurse.email} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="location">City:</label>
              <input
                type="text"
                name="location"
                id="location"
                value={user.nurse.location}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="address">Address:</label>
              <input type="text" name="address" id="address" value={user.nurse.address} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="phone">Phone Number:</label>
              <input type="number" name="phone" id="phone" value={user.nurse.phone} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="specialty">Speciality:</label>
              <input
                type="text"
                name="speciality"
                id="speciality"
                value={user.nurse.speciality}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="birthday">BirthDay:</label>
              <input
                type="date"
                name="birthday"
                id="birthday"
                value={user.nurse.birthday}
                onChange={this.handleChange}
              />
              <br></br>
              <label htmlFor="dni">DNI:</label>
              <input type="text" name="dni" id="dni" value={user.nurse.dni} onChange={this.handleChange} />
              <br></br>
              <label htmlFor="driverLicense">Driver License?</label>
              <input
                type="checkbox"
                name="driverLicense"
                id="driverLicense"
                checked={user.nurse.driverLicense}
                onChange={this.handleChangeBox}
              />
              <br></br>
              <label htmlFor="car">Got CAR?</label>
              <input type="checkbox" name="car" id="car" checked={user.nurse.car} onChange={this.handleChangeBox} />
              <br></br>
              <input type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(NurseUpdate);
