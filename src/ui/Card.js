// import React from 'react';
import styled, { css } from 'styled-components';
import { device } from './device';

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
  position: relative;

  @media ${device.tablet} {
    max-width: 100%;
    width: 100%;
    margin: 2em 0;
  }
  ${props =>
    props.home &&
    css`
      height: 100%;
    `};
  ${props =>
    props.listed &&
    css`
      margin: 1em auto;
      width: auto;

      &:hover {
        color: black;

        background: -moz-linear-gradient(
          left,
          rgba(125, 185, 232, 0) 0%,
          rgba(125, 185, 232, 0.75) 59%,
          rgba(125, 185, 232, 0.84) 66%,
          rgba(125, 185, 232, 0.96) 76%,
          rgba(125, 185, 232, 1) 79%,
          rgba(125, 185, 232, 1) 83%,
          rgba(125, 185, 232, 1) 88%,
          rgba(125, 185, 232, 1) 92%,
          rgba(42, 99, 163, 1) 99%,
          rgba(30, 87, 153, 1) 100%
        ); /* FF3.6-15 */
        background: -webkit-linear-gradient(
          left,
          rgba(125, 185, 232, 0) 0%,
          rgba(125, 185, 232, 0.75) 59%,
          rgba(125, 185, 232, 0.84) 66%,
          rgba(125, 185, 232, 0.96) 76%,
          rgba(125, 185, 232, 1) 79%,
          rgba(125, 185, 232, 1) 83%,
          rgba(125, 185, 232, 1) 88%,
          rgba(125, 185, 232, 1) 92%,
          rgba(42, 99, 163, 1) 99%,
          rgba(30, 87, 153, 1) 100%
        ); /* Chrome10-25,Safari5.1-6 */
        background: linear-gradient(
          to right,
          rgba(125, 185, 232, 0) 0%,
          rgba(125, 185, 232, 0.75) 59%,
          rgba(125, 185, 232, 0.84) 66%,
          rgba(125, 185, 232, 0.96) 76%,
          rgba(125, 185, 232, 1) 79%,
          rgba(125, 185, 232, 1) 83%,
          rgba(125, 185, 232, 1) 88%,
          rgba(125, 185, 232, 1) 92%,
          rgba(42, 99, 163, 1) 99%,
          rgba(30, 87, 153, 1) 100%
        ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#007db9e8', endColorstr='#1e5799',GradientType=1 ); /* IE6-9 */
      }
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
      max-width: 80%;
      height: 90%;
    `};
`;

export default Card;
