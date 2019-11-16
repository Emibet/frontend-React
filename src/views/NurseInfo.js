import React, { Component } from 'react';
import './NurseInfo.css';
import Button from '../ui/Button';

class NurseInfo extends Component {
  constructor(props) {
    super(props);
    // No llames this.setState() aquí!
    this.state = {
      showCV: false,
    };
    this.handleShow = this.handleShow.bind(this);
  }

  handleShow = () => {
    const { showCV } = this.state;

    this.setState({
      showCV: !showCV,
    });
  };

  render() {
    const { showCV } = this.state;

    console.log('TCL: props NURSE INFO', this.props);
    const {
      address,
      dni,
      email,
      location,
      name,
      surname,
      phone,
      speciality,
      resume,
      jobs,
      candidateTo,
    } = this.props.user.nurse;
    return (
      <div className="Wrapper">
        <div>
          {resume && (
            <>
              <Button onClick={() => this.handleShow()}>View CV</Button>
              {showCV && (
                <>
                  <p className="name">
                    CV: <span className="info">{name}</span>
                  </p>
                  {resume.freelance ? (
                    <span className="freelance">FREELANCE</span>
                  ) : (
                    <span className="not-freelance">NOT Freelance</span>
                  )}
                  {resume.licenseNumber && (
                    <p className="name">
                      License: <span className="info">{resume.licenseNumber}</span>
                    </p>
                  )}
                  {resume.speciality && (
                    <p className="name">
                      Speciality: <span className="info">{resume.speciality}</span>
                    </p>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div>
          {!name && !surname && !dni && !location && !address && !phone && !email && !speciality && (
            <h2>EDIT YOUR PROFILE</h2>
          )}
          {name && (
            <p className="name">
              Name: <span className="info">{name}</span>
            </p>
          )}
          {surname && (
            <p className="name">
              Surname: <span className="info">{surname}</span>
            </p>
          )}
          {dni && (
            <p className="name">
              DNI: <span className="info">{dni}</span>
            </p>
          )}
          {location && (
            <p className="name">
              Location: <span className="info">{location}</span>
            </p>
          )}
          {address && (
            <p className="name">
              Address: <span className="info">{address}</span>
            </p>
          )}
          {phone && (
            <p className="name">
              Phone: <span className="info">{phone}</span>
            </p>
          )}
          {email && (
            <p className="name">
              Email: <span className="info">{email}</span>
            </p>
          )}
          {speciality && (
            <p className="name">
              Speciality: <span className="info">{speciality}</span>
            </p>
          )}

          {/* <p>Aquí hay que implementar el MAP para ver los jobs</p>
          <p>Aquí hay que implementar el MAP para ver donde he aplicado</p> */}
        </div>
      </div>
    );
  }
}

export default NurseInfo;
