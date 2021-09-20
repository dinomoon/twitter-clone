import React from 'react';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import oc from 'open-color';

const StyledNweetModal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50px;
  left: calc(50% - 300px);
  background-color: #fff;
  border-radius: 20px;
  width: 600px;
  min-height: 280px;
  .close {
    padding: 15px;
    font-size: 2rem;
    border-bottom: 1px solid ${palette.borderColor};
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 34px;
      height: 34px;
      cursor: pointer;
      transition: all 0.2s;
      svg {
        width: 20px;
      }
      &:hover {
        background-color: ${oc.gray[2]};
      }
    }
  }
`;

const NweetModal = ({ children, handleTab }) => {
  return (
    <StyledNweetModal id="nweet-modal">
      <div className="close">
        <span
          className="border--radius__max"
          onClick={() => handleTab('nweet')}
        >
          <svg viewBox="0 0 24 24">
            <g>
              <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
            </g>
          </svg>
        </span>
      </div>
      {children}
    </StyledNweetModal>
  );
};

export default NweetModal;
