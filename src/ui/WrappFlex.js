import styled, { css } from 'styled-components';

const WrappFlex = styled.div`
  display: flex;
  flex-direction: row;
  ${props =>
    props.jobDetail &&
    css`
      margin: 0.25em auto;
      width: auto;
    `};
`;

export default WrappFlex;
