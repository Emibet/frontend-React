import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Input = styled.input`
  display: block;
  margin: 0.5em auto;
  border: none;
  border-bottom: 1px solid #757575;
  background-color: none;
  &:focus {
    outline: none;
  }
  ${props =>
    props.update &&
    css`
      text-align: end;
      font-size: 1em;
      width: 100%;
    `};
  ${props =>
    props.urgent &&
    css`
      /* margin-left: 90%; */
      border: 1px solid black;
      background-color: burlywood;
      box-sizing: border-box;
    `};
`;

export default Input;
