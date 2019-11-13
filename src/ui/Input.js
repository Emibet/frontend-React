import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Input = styled.input`
  display: block;
  margin: 0.5em auto;
  border: none;
  border-bottom: 1px solid #757575;
  &:focus {
    outline: none;
  }
`;

export default Input;
