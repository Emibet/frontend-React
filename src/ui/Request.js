import styled, { css } from 'styled-components';

const Request = styled.div`
  text-align: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid #4f98d3;
  /* color: #4f98d3; */
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props =>
    props.status === 'Accepted' &&
    css`
      /* background: #4f98d3; */
      border-color: green;
      color: green;
      &::after {
        content: 'Accepted';
      }
    `};
  ${props =>
    props.status === 'Declined' &&
    css`
      /* background: #4f98d3; */
      border-color: red;
      color: red;
      &::after {
        content: 'Declined';
      }
    `};
  ${props =>
    props.status === 'Pending' &&
    css`
      /* background: #4f98d3; */
      border-color: orange;
      color: orange;
      &::after {
        content: 'Pending';
      }
    `};
`;

export default Request;
