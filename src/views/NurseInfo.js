import React from 'react';

const NurseInfo = props => {
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
  } = props.user.nurse;
  return (
    <div>
      <p>NURSE INFO: </p>

      <p>{name}</p>
      <p>{surname}</p>
      <p>{dni}</p>
      <p>{location}</p>
      <p>{address}</p>
      <p>{phone}</p>
      <p>{address}</p>

      <p>{email}</p>
      <p>{speciality}</p>
      <p>Aquí hay que implementar el MAP para ver los jobs</p>
      <p>Aquí hay que implementar el MAP para ver donde he aplicado</p>
    </div>
  );
};

export default NurseInfo;
