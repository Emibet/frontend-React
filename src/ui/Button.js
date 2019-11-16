import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #4f98d3;
  color: #4f98d3;
  margin: 0.25em 1em;
  padding: 0.25em 1em;

  ${props =>
    props.primary &&
    css`
      background: #4f98d3;
      color: white;
    `};
  ${props =>
    props.lateral &&
    css`
      margin: 0.25em auto;
      width: 80%;
    `};
  ${props =>
    props.green &&
    css`
      border-color: green;
      background: green;
      color: white;
    `};
  ${props =>
    props.red &&
    css`
      border-color: red;
      background: red;
      color: black;
    `};
  ${props =>
    props.orange &&
    css`
      border-color: orange;
      background: orange;
      color: black;
    `};
`;

export default Button;
