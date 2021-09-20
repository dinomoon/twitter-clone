import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import oc from 'open-color';
import { authService } from '../../fbase';
import UserInfo from './UserInfo';

const StyledUserModal = styled.div`
  width: 300px;
  height: 200px;
  margin-left: -18px;
  position: fixed;
  bottom: 90px;
  border-radius: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: #fff;
  font-size: 15px;
  z-index: 9999;
  .top {
    display: flex;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid ${palette.borderColor};
    img {
      width: 48px;
      height: 48px;
      margin-right: 10px;
    }
    svg {
      width: 20px;
      fill: ${palette.nwitter};
    }
  }
  .bottom {
    div {
      padding: 16px 20px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background-color: ${oc.gray[1]};
      }
    }
  }
`;

const UserModal = ({ user }) => {
  return (
    <StyledUserModal>
      <div className="top">
        <img src={user.img} alt="" className="border--radius__max" />
        <UserInfo user={user} />
        <svg viewBox="0 0 24 24">
          <g>
            <path d="M9 20c-.264 0-.52-.104-.707-.293l-4.785-4.785c-.39-.39-.39-1.023 0-1.414s1.023-.39 1.414 0l3.946 3.945L18.075 4.41c.32-.45.94-.558 1.395-.24.45.318.56.942.24 1.394L9.817 19.577c-.17.24-.438.395-.732.42-.028.002-.057.003-.085.003z"></path>
          </g>
        </svg>
      </div>
      <div className="bottom">
        <div>Add an existing account</div>
        <div onClick={() => authService.signOut()}>
          Log out @{user.uid.substr(0, 18)}...
        </div>
      </div>
    </StyledUserModal>
  );
};

export default UserModal;
