// import React from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div`
  border-radius: 3px;
  border: 2px solid #4f98d3;
  min-width: 65%;
  width: fit-content;
  margin: 2em auto;
  height: fit-content;
  padding: 0.75em 1em;
  box-sizing: border-box;
  background-color: white;

  ${props =>
    props.listed &&
    css`
      margin: 0.25em auto;
      width: auto;
    `};
  ${props =>
    props.detailJob &&
    css`
      margin-left: 0.75em;
      margin-right: 0.75em;
      width: fit-content;
    `};
  ${props =>
    props.jobs &&
    css`
      margin-left: auto;
      margin-right: auto;
      width: 95%;
    `};
  ${props =>
    props.jobList &&
    css`
      height: 80%;
    `};
`;

export default Card;
