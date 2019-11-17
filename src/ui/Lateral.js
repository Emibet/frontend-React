import styled, { css } from 'styled-components';

const Lateral = styled.div`
  /* border-radius: 3px;
  border: 2px solid #4f98d3; */
  display: flex;
  flex-direction: row;
  width: 100%;
  text-align: center;
  line-height: 1.5em;

  /* background-color: white; */
  height: fit-content;

  .h3 {
    margin: 0.25em;
  }
  ${props =>
    props.top &&
    css`
      margin: 1em auto;
      width: 100%;
      justify-content: space-evenly;
    `};
`;

export default Lateral;
