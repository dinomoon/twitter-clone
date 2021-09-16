import { darken, lighten } from 'polished';
import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  color: #fff;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;

  ${(props) =>
    props.disabled
      ? css`
          background-color: ${lighten(0.2, palette.nwitter)};
          cursor: default;
        `
      : css`
          background-color: ${palette.nwitter};
          &:hover {
            background-color: ${darken(0.05, palette.nwitter)};
          }
        `}
`;

const Button = (props) => {
  return <StyledButton {...props} />;
};

export default Button;
