import React, { useState } from 'react';
import styled from 'styled-components';
import { firebaseInstance, authService } from '../fbase';
import oc from 'open-color';
import palette from '../lib/styles/palette';
import { useHistory } from 'react-router';
import { darken } from 'polished';

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Top = styled.div`
  display: flex;
  height: 95vh;
  overflow: hidden;
`;

const Left = styled.div`
  width: 55vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${palette.nwitter};
  img {
    z-index: 1;
  }

  svg {
    position: absolute;
    width: 380px;
    fill: #fff;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  width: 45vw;
  background-color: #fff;

  .wrapper {
    .twitter-svg {
      height: 3rem;
      fill: ${palette.nwitter};
    }
    padding: 40px;
    h1 {
      font-size: 64px;
    }
    h2 {
      font-size: 32px;
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      outline: none;
      background-color: #fff;
      border: 1px solid #dadce0;
      font-size: 15px;
      font-weight: bold;
      height: 40px;
      padding: 0 12px;
      margin: 0 0 20px;
      letter-spacing: 0.4px;
      cursor: pointer;
      transition: all 0.3s;
      svg {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    button:hover {
      background-color: ${oc.gray[3]};
    }

    p {
      width: 380px;
      font-size: 13px;
      color: #536471;
      margin-bottom: 20px;
    }
    span.emphasize {
      color: ${palette.nwitter};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

const Footer = styled.footer`
  height: 48px;
  nav {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #536471;

    ul {
      display: flex;

      li {
        padding-right: 1rem;
        cursor: pointer;
      }

      li:hover {
        a {
          text-decoration: underline;
        }
      }
    }
  }
`;

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Modal = styled.div`
  width: 600px;
  height: 650px;
  background-color: #fff;
  border-radius: 16px;
  padding: 15px 40px;
  position: relative;
  .top {
    text-align: center;
    margin-bottom: 50px;
    svg {
      width: 32px;
      fill: ${palette.nwitter};
    }
    .close {
      width: 40px;
      height: 40px;
      position: absolute;
      right: 15px;
      font-size: 1.6rem;
      transition: all 0.2s;
      &:hover {
        background-color: ${oc.gray[2]};
      }
    }
  }

  h2 {
    margin-bottom: 30px;
  }

  form {
    input {
      display: block;
      width: 100%;
      height: 56px;
      padding: 0 10px;
      margin-bottom: 20px;
      border: 1px solid ${oc.gray[4]};
      border-radius: 4px;
      &:focus {
        outline-color: ${palette.nwitter};
      }
    }
    button {
      bottom: 20px;
      width: 100%;
      height: 42px;
      background-color: ${palette.nwitter};
      color: #fff;
      font-weight: bold;
      font-size: 15px;
      transition: all 0.2s;
      &:hover {
        background-color: ${darken(0.05, palette.nwitter)};
      }
    }
  }
`;

const MainPage = () => {
  const history = useHistory();
  const [isInRegister, setIsInRegister] = useState(true);
  const [clickEmail, setClickEmail] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const handleSocialClick = async (e) => {
    const { name } = e.target;
    let provider;
    if (name === 'google') {
      provider = new firebaseInstance.auth.GoogleAuthProvider();
    } else if (name === 'github') {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    try {
      await authService.signInWithPopup(provider);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEmailClick = async (e) => {
    if (isInRegister) {
      setClickEmail(true);
    } else {
      history.push('/login');
    }
  };

  const onChange = (e) => {
    setForm((form) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.createUserWithEmailAndPassword(
        form.email,
        form.password,
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {clickEmail && (
        <ModalBackground>
          <Modal>
            <div className="top">
              <svg viewBox="0 0 24 24" className="twitter-svg">
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
              <button
                className="close default-btn border--radius__max"
                onClick={() => setClickEmail(false)}
              >
                &times;
              </button>
            </div>
            <h2>계정을 생성하세요</h2>
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
                가입하기
              </button>
            </form>
          </Modal>
        </ModalBackground>
      )}
      <Wrapper>
        <Top>
          <Left>
            <img src="https://nomadcoders.co/m.svg" alt="" draggable="false" />
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
          </Left>
          <Right>
            <div className="wrapper">
              <svg
                viewBox="0 0 24 24"
                className="twitter-svg fill-nwitter-color"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
              <h1>지금 일어나고 있는 일</h1>
              <h2>
                {isInRegister
                  ? '오늘 느위터에 가입하세요.'
                  : '느위터 로그인하기'}
              </h2>
              <button
                type="button"
                name="google"
                onClick={handleSocialClick}
                className="border--radius__max"
              >
                <svg viewBox="0 0 48 48">
                  <g>
                    <path
                      fill="#EA4335"
                      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                    ></path>
                    <path
                      fill="#4285F4"
                      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                    ></path>
                    <path
                      fill="#FBBC05"
                      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                    ></path>
                    <path
                      fill="#34A853"
                      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                    ></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </g>
                </svg>
                {isInRegister
                  ? 'Google 계정으로 가입하기'
                  : 'Google 계정으로 로그인하기'}
              </button>
              <button
                type="button"
                name="github"
                onClick={handleSocialClick}
                className="border--radius__max"
              >
                <svg viewBox="0 0 24 24">
                  <g>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </g>
                </svg>
                {isInRegister
                  ? 'Github 계정으로 가입하기'
                  : 'Github 계정으로 로그인하기'}
              </button>
              <button
                type="button"
                className="border--radius__max"
                onClick={handleEmailClick}
              >
                {isInRegister
                  ? '이메일 주소로 가입하기'
                  : '이메일 주소로 로그인하기'}
              </button>
              {isInRegister && (
                <p>
                  By signing up, you agree to the{' '}
                  <span className="emphasize">
                    <a
                      href="https://twitter.com/ko/tos"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a>
                  </span>{' '}
                  and{' '}
                  <span className="emphasize">
                    <a
                      href="https://twitter.com/ko/privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </span>
                  , including
                  <span className="emphasize">
                    <a
                      href="https://help.twitter.com/ko/rules-and-policies/twitter-cookies"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {' '}
                      Cookie Use
                    </a>
                  </span>
                  .
                </p>
              )}
              <div>
                느위터 아이디가 있으세요?{' '}
                <span
                  className="emphasize"
                  onClick={() => setIsInRegister((prev) => !prev)}
                  style={{ cursor: 'pointer' }}
                >
                  {isInRegister ? '로그인' : '회원가입'}
                </span>
                하기
              </div>
            </div>
          </Right>
        </Top>
        <Footer>
          <nav>
            <ul>
              <li>
                <a
                  href="https://about.twitter.com/en"
                  target="_blank"
                  rel="noreferrer"
                >
                  소개
                </a>
              </li>
              <li>
                <a
                  href="https://help.twitter.com/ko"
                  target="_blank"
                  rel="noreferrer"
                >
                  고객센터
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ko/tos"
                  target="_blank"
                  rel="noreferrer"
                >
                  이용약관
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/ko/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  개인정보 처리방침
                </a>
              </li>
              <li>
                <a
                  href="https://help.twitter.com/ko/rules-and-policies/twitter-cookies"
                  target="_blank"
                  rel="noreferrer"
                >
                  쿠키 정책
                </a>
              </li>
              <li>
                <a
                  href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo"
                  target="_blank"
                  rel="noreferrer"
                >
                  광고 정보
                </a>
              </li>
              <li>
                <a
                  href="https://blog.twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  블로그
                </a>
              </li>
              <li>
                <a
                  href="https://status.twitterstat.us/"
                  target="_blank"
                  rel="noreferrer"
                >
                  상태
                </a>
              </li>
              <li>
                <a
                  href="https://careers.twitter.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  채용
                </a>
              </li>
              <li>
                <a
                  href="https://about.twitter.com/en/who-we-are/brand-toolkit"
                  target="_blank"
                  rel="noreferrer"
                >
                  브랜드 리소스
                </a>
              </li>
              <li>
                <a
                  href="https://ads.twitter.com/login?ref=gl-tw-tw-twitter-advertise"
                  target="_blank"
                  rel="noreferrer"
                >
                  광고
                </a>
              </li>
              <li>
                <a
                  href="https://marketing.twitter.com/ko"
                  target="_blank"
                  rel="noreferrer"
                >
                  마케팅
                </a>
              </li>
              <li>
                <a
                  href="https://business.twitter.com/en/i.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  비즈니스용 트위터
                </a>
              </li>
              <li>
                <a
                  href="https://developer.twitter.com/en"
                  target="_blank"
                  rel="noreferrer"
                >
                  개발자
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/i/directory/profiles"
                  target="_blank"
                  rel="noreferrer"
                >
                  디렉터리
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com/settings/account/personalization"
                  target="_blank"
                  rel="noreferrer"
                >
                  설정
                </a>
              </li>
            </ul>
            <span>&copy; {new Date().getFullYear()} Nwitter, Inc.</span>
          </nav>
        </Footer>
      </Wrapper>
    </>
  );
};

export default MainPage;
