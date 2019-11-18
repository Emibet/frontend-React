import styled, { css } from 'styled-components';
import { device } from './device';

const WrappFlex = styled.div`
  display: flex;
  flex-direction: row;
  overflow-y: scroll;
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
      @media ${device.tablet} {
        flex-direction: column;
      }
    `};
`;

export default WrappFlex;
