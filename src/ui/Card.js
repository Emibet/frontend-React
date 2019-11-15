// import React from 'react';
import styled, { css } from 'styled-components';

const Card = styled.div`
  border-radius: 3px;
  border: 2px solid #4f98d3;
  min-width: 65%;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
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
      margin-left: 0.25em;
      width: fit-content;
    `};
`;

export default Card;
