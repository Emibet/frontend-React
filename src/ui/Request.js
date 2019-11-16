import styled from 'styled-components';

const whatStatus = status => {
  switch (status) {
    case 'Accepted':
      return `
        border-color: green;
        color: green;
      `;
    case 'Declined':
      return `
          border-color: red;
          color: red;
        `;
    case 'Pending':
      return `
          border-color: orange;
          color: orange;
        `;
    default:
      return null;
  }
};

const Request = styled.div`
  text-align: center;
  background: transparent;
  border-radius: 3px;
  border: 2px solid #4f98d3;
  /* color: #4f98d3; */
  margin: 0.5em 1em;
  padding: 0.25em 1em;
  ${({ children }) => whatStatus(children)}
`;

export default Request;
