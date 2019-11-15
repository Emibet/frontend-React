import styled, { css } from 'styled-components';

const Message = styled.div`
color: green;
text-align:center;
  /* ${props =>
    props.update &&
    css`
      text-align: end;
      font-size: 1em;
      width: 100%;
    `}; */
`;

export default Message;
