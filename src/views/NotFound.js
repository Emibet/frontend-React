import React from 'react';
import { Link } from 'react-router-dom';
import Img404 from '../images/404.png';

const NotFound = () => (
  <div>
    <center>
      <Link to="/">
    <img src={Img404} style={{ width: '100%', height: 'auto', display: 'block', margin: 'auto', position: 'relative' }} />
      </Link>
    </center>
  </div>
);
export default NotFound;
