import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { withAuth } from '../Context/AuthContext';
import userService from '../services/userService';
import authService from '../services/authService';
import Input from '../ui/Input';
import Message from '../ui/Message';

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

// const Input = styled.input`
//   display: block;
//   margin: 0.5em 0;
//   text-align:end;
//   font-size:1em;
//   // margin: 0.5em auto;
//   width: 100%
//   border: none;
//   border-bottom: 1px solid #757575;
//   &:focus {
//     outline: none;
//   }
// `;

const Label = styled.label`
  color: #4f98d3;
  position: absolute;
`;

const WrappCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const WrappCheck = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
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
    // console.log('PROPS NURSEUPDATE ComponentDidMount: ', this.props);
    // console.log('PROPS NURSEUPDATE ComponentDidMount:Nurse Birthday ', user.nurse.birthday);
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
      .then(() => {
        this.props.userData();
      })
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
        NURSE UPDATE PROFILE:
        {username}
        {message && <Message>{message}</Message>}
        {loading && <div>Loading...</div>}
        {!loading && (
          <>
            <form onSubmit={this.handleFormSubmit}>
              <Label htmlFor="name">Name:</Label>
              <Input update type="text" name="name" id="name" value={user.nurse.name} onChange={this.handleChange} />

              <Label htmlFor="surname">LastName:</Label>
              <Input
                update
                type="text"
                name="surname"
                id="surname"
                value={user.nurse.surname}
                onChange={this.handleChange}
              />

              <Label htmlFor="email">Email:</Label>
              <Input
                update
                type="email"
                name="email"
                id="email"
                value={user.nurse.email}
                onChange={this.handleChange}
              />

              <Label htmlFor="location">City:</Label>
              <Input
                update
                type="text"
                name="location"
                id="location"
                value={user.nurse.location}
                onChange={this.handleChange}
              />

              <Label htmlFor="address">Address:</Label>
              <Input
                update
                type="text"
                name="address"
                id="address"
                value={user.nurse.address}
                onChange={this.handleChange}
              />

              <Label htmlFor="phone">Phone Number:</Label>
              <Input
                update
                type="number"
                name="phone"
                id="phone"
                value={user.nurse.phone}
                onChange={this.handleChange}
              />

              <Label htmlFor="specialty">Speciality:</Label>
              <Input
                update
                type="text"
                name="speciality"
                id="speciality"
                value={user.nurse.speciality}
                onChange={this.handleChange}
              />

              {/* <Label htmlFor="birthday">BirthDay:</Label>
              <Input
                update
                type="date"
                name="birthday"
                id="birthday"
                value={user.nurse.birthday}
                onChange={this.handleChange}
              /> */}

              <Label htmlFor="dni">DNI:</Label>
              <Input update type="text" name="dni" id="dni" value={user.nurse.dni} onChange={this.handleChange} />

              <WrappCheck>
                <WrappCheckBox>
                  <label htmlFor="driverLicense">Driver License?</label>
                  <input
                    type="checkbox"
                    name="driverLicense"
                    id="driverLicense"
                    checked={user.nurse.driverLicense}
                    onChange={this.handleChangeBox}
                  />
                </WrappCheckBox>
                <WrappCheckBox>
                  <label htmlFor="car">Got CAR?</label>
                  <input type="checkbox" name="car" id="car" checked={user.nurse.car} onChange={this.handleChangeBox} />
                </WrappCheckBox>
              </WrappCheck>
              <InputSubmit type="submit" value="Update" />
            </form>
          </>
        )}
      </div>
    );
  }
}

export default withAuth(NurseUpdate);
