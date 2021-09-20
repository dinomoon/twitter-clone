import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const StyledUserInfo = styled.div`
  font-size: 15px;
  flex: 1;
  .name {
    font-weight: bold;
  }
  .uid {
    color: ${oc.gray[6]};
  }
`;

const UserInfo = ({ user }) => {
  return (
    <StyledUserInfo>
      <div className="name">{user.name}</div>
      <div className="uid">@{user.uid.substr(0, 10)}...</div>
    </StyledUserInfo>
  );
};

export default UserInfo;
