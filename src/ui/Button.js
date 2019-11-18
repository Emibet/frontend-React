import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  /* background: transparent; */
  border-radius: 3px;
  border: 2px solid #4f98d3;
  color: #4f98d3;
  margin: 0.25em 1em;
  padding: 0.5em 1em;
  box-sizing: border-box;
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
    props.top &&
    css`
      /* margin: 0.25em auto; */
      width: auto;
      height: 100%;
      background: white;
    `};
  ${props =>
    props.green &&
    css`
      border-color: #00a30a;
      background: #00a30a;
      color: white;
      padding: 0.5em 1.5em;
      font-size: 1.1em;
    `};
  ${props =>
    props.red &&
    css`
      border-color: #cc0000;
      background: #cc0000;
      color: black;
      padding: 0.5em 1.5em;
      font-size: 1.1em;
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
