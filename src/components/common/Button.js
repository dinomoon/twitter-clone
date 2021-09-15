import React from 'react';
import styled, { css } from 'styled-components';

const StyledButton = styled.button`
  ${(props) =>
    props.disabled &&
    css`
      background-color: red;
    `}
`;

const Button = (props, children) => {
  return <StyledButton props={props}>{children}</StyledButton>;
};

export default Button;
