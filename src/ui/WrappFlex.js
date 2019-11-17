import styled, { css } from 'styled-components';

const WrappFlex = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  ${props =>
    props.jobDetail &&
    css`
      margin: 0.25em auto;
      width: 75%;
    `};
  ${props =>
    props.jobList &&
    css`
      height: 100%;
    `};
`;

export default WrappFlex;
