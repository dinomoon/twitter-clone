import React, { useState } from 'react';
import styled from 'styled-components';
import { authService } from '../fbase';
import oc from 'open-color';
import palette from '../lib/styles/palette';
import { darken } from 'polished';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  margin: 0 auto;
  padding: 20px 0;
  svg {
    width: 40px;
    height: 40px;
    fill: ${palette.nwitter};
  }
  input {
    display: block;
    width: 100%;
    height: 56px;
    padding: 0 10px;
    margin-bottom: 26px;
    border: 1px solid ${oc.gray[4]};
    border-radius: 4px;
    &:focus {
      outline-color: ${palette.nwitter};
    }
  }
  button {
    bottom: 20px;
    width: 100%;
    height: 50px;
    background-color: ${palette.nwitter};
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    transition: all 0.2s;
    &:hover {
      background-color: ${darken(0.05, palette.nwitter)};
    }
  }
`;

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });

  const onChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signInWithEmailAndPassword(form.email, form.password);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Wrapper>
      <svg viewBox="0 0 24 24">
        <g>
          <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
        </g>
      </svg>
      <h1>느위터 로그인</h1>
      <form onSubmit={handleEmailSubmit}>
        <input
          type="email"
          placeholder="이메일"
          name="email"
          value={form.email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="비밀번호"
          name="password"
          value={form.password}
          onChange={onChange}
        />
        <button type="submit" className="default-btn border--radius__max">
          로그인
        </button>
      </form>
    </Wrapper>
  );
};

export default LoginPage;
