import React, { useState } from 'react';
import styled from 'styled-components';
import { firebaseInstance, authService } from '../fbase';

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

  img {
    z-index: -1;
  }

  svg {
    position: absolute;
    fill: #fff;
    width: 380px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  width: 45vw;
  background-color: #fff;

  .wrapper {
    padding: 40px;
    h1 {
      font-size: 64px;
    }
    h2 {
      font-size: 32px;
    }
    button {
      display: block;
      width: 300px;
      outline: none;
      background-color: #fff;
      border: 1px solid #dadce0;
      border-radius: 20px;
      font-size: 15px;
      font-weight: bold;
      height: 40px;
      padding: 0 12px;
      margin: 0 0 20px;
      letter-spacing: 0.4px;
      cursor: pointer;
      transition: all 0.3s;
    }
    button:hover {
      background-color: #e9ecef;
    }

    p {
      width: 380px;
      font-size: 13px;
      color: #536471;
      margin-bottom: 20px;
      span:hover {
        text-decoration: underline;
      }
    }
  }

  svg {
    fill: rgb(29, 155, 240);
    height: 3rem;
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

const MainPage = () => {
  const [isInRegister, setIsInRegister] = useState(true);
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
  return (
    <>
      <Wrapper>
        <Top>
          <Left>
            <img
              src="https://abs.twimg.com/sticky/illustrations/lohp_1302x955.png"
              alt=""
              draggable="false"
            />
            <svg viewBox="0 0 24 24">
              <g>
                <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
              </g>
            </svg>
          </Left>
          <Right>
            <div className="wrapper">
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
              <h1>지금 일어나고 있는 일</h1>
              <h2>
                {isInRegister
                  ? '오늘 트위터에 가입하세요.'
                  : '트위터 로그인하기'}
              </h2>
              <button type="button" name="google" onClick={handleSocialClick}>
                {isInRegister
                  ? 'Google 계정으로 가입하기'
                  : 'Google 계정으로 로그인하기'}
              </button>
              <button type="button" name="github" onClick={handleSocialClick}>
                {isInRegister
                  ? 'Github 계정으로 가입하기'
                  : 'Github 계정으로 로그인하기'}
              </button>
              <button type="button">
                {isInRegister
                  ? '이메일 주소로 가입하기'
                  : '이메일 주소로 로그인하기'}
              </button>
              {isInRegister && (
                <p>
                  By signing up, you agree to the{' '}
                  <span className="twitter-color">
                    <a
                      href="https://twitter.com/ko/tos"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Terms of Service
                    </a>
                  </span>{' '}
                  and{' '}
                  <span className="twitter-color">
                    <a
                      href="https://twitter.com/ko/privacy"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Privacy Policy
                    </a>
                  </span>
                  , including
                  <span className="twitter-color">
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
                트위터 아이디가 있으세요?{' '}
                <span
                  className="twitter-color"
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
            <span>&copy; {new Date().getFullYear()} Twitter, Inc.</span>
          </nav>
        </Footer>
      </Wrapper>
    </>
  );
};

export default MainPage;
