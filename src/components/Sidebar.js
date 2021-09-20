import React from 'react';
import styled from 'styled-components';
import palette from '../lib/styles/palette';
import oc from 'open-color';

const StyledSidebar = styled.aside`
  .search-wrapper {
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 10;
    padding: 5px 0;
    margin-bottom: 12px;
  }
  .search {
    z-index: 10;
    display: flex;
    align-items: center;
    height: 44px;
    background-color: ${oc.gray[1]};
    svg {
      width: 44px;
      height: 18.75px;
      margin-left: 8px;
      fill: ${oc.gray[7]};
    }
    input {
      font-size: 15px;
      outline: none;
      border: none;
      background-color: transparent;
    }
  }

  .trends {
    position: sticky;
    top: -42px;
    background-color: ${oc.gray[0]};
    border-radius: 20px;
    margin-bottom: 16px;
    h2,
    h3 {
      margin: 0;
      padding: 0;
    }
    .header {
      padding: 12px 16px;
      .title {
        font-size: 20px;
      }
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 48px;
      .svg-wrapper {
        width: 34px;
        height: 34px;
        &:hover {
          background-color: ${oc.gray[3]};
        }
      }
      svg {
        width: 20px;
        height: 20px;
      }
    }
    .row {
      position: relative;
      height: 82px;
      padding: 12px 16px;
      cursor: pointer;
      transition: all 0.2s;
      &:hover {
        background-color: ${oc.gray[1]};
      }
      .top {
        font-size: 13px;
        color: ${oc.gray[7]};
      }
      .title {
        font-weight: bold;
        font-size: 15px;
      }
      .svg-wrapper {
        position: absolute;
        top: 10px;
        right: 8px;
        width: 34.75px;
        height: 34.75px;
        svg {
          width: 18.75px;
          height: 18.75px;
          fill: ${oc.gray[6]};
        }
        &:hover {
          background-color: ${oc.orange[1]};
          svg {
            fill: ${palette.nwitter};
          }
        }
      }
      .bottom {
        font-size: 13px;
        color: ${oc.gray[7]};
      }
    }
  }

  .follow {
    position: sticky;
    top: 480px;
    background-color: ${oc.gray[0]};
    border-radius: 20px;
    margin-bottom: 16px;
    h2,
    h3 {
      margin: 0;
      padding: 0;
    }
    .header {
      padding: 12px 16px;
      height: 48px;
      .title {
        font-size: 20px;
      }
    }
    .row {
      display: flex;
      padding: 12px 16px;
      height: 72px;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s;
      .img-wrapper {
      }
      &:hover {
        background-color: ${oc.gray[1]};
      }
      .left {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        margin-right: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .right {
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          font-weight: bold;
        }
        button {
          width: 72px;
          height: 32px;
          background-color: #000;
          color: #fff;
          font-weight: bold;
        }
      }
    }
  }

  nav {
    position: sticky;
    top: 822px;
    height: 40px;
    padding: 0 16px;
    font-size: 13px;
    color: ${oc.gray[7]};
    a {
      display: inline-block;
      padding-right: 12px;
      margin: 2px 0;
      line-height: 16px;
    }
    a:hover {
      text-decoration: underline;
    }
    svg {
      width: 17px;
      height: 13px;
      fill: ${oc.gray[7]};
    }
    .more {
      display: flex;
      align-items: center;
    }
  }

  .row.show-more {
    font-size: 15px;
    height: 52px;
    border-radius: 0 0 20px 20px;
    color: ${palette.nwitter};
  }
`;

const Sidebar = () => {
  return (
    <StyledSidebar className="sidebar-column">
      <div className="search-wrapper">
        <div className="search border--radius__max">
          <svg viewBox="0 0 24 24" className="twitter-svg">
            <g>
              <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
            </g>
          </svg>
          <input type="text" placeholder="Search Nwitter" />
        </div>
      </div>
      <div className="trends">
        <div className="header">
          <h2 className="title">Trends for you</h2>
          <div className="svg-wrapper border--radius__max">
            <svg viewBox="0 0 24 24" className="twitter-svg">
              <g>
                <path d="M12 8.21c-2.09 0-3.79 1.7-3.79 3.79s1.7 3.79 3.79 3.79 3.79-1.7 3.79-3.79-1.7-3.79-3.79-3.79zm0 6.08c-1.262 0-2.29-1.026-2.29-2.29S10.74 9.71 12 9.71s2.29 1.026 2.29 2.29-1.028 2.29-2.29 2.29z"></path>
                <path d="M12.36 22.375h-.722c-1.183 0-2.154-.888-2.262-2.064l-.014-.147c-.025-.287-.207-.533-.472-.644-.286-.12-.582-.065-.798.115l-.116.097c-.868.725-2.253.663-3.06-.14l-.51-.51c-.836-.84-.896-2.154-.14-3.06l.098-.118c.186-.222.23-.523.122-.787-.11-.272-.358-.454-.646-.48l-.15-.014c-1.18-.107-2.067-1.08-2.067-2.262v-.722c0-1.183.888-2.154 2.064-2.262l.156-.014c.285-.025.53-.207.642-.473.11-.27.065-.573-.12-.795l-.094-.116c-.757-.908-.698-2.223.137-3.06l.512-.512c.804-.804 2.188-.865 3.06-.14l.116.098c.218.184.528.23.79.122.27-.112.452-.358.477-.643l.014-.153c.107-1.18 1.08-2.066 2.262-2.066h.722c1.183 0 2.154.888 2.262 2.064l.014.156c.025.285.206.53.472.64.277.117.58.062.794-.117l.12-.102c.867-.723 2.254-.662 3.06.14l.51.512c.836.838.896 2.153.14 3.06l-.1.118c-.188.22-.234.522-.123.788.112.27.36.45.646.478l.152.014c1.18.107 2.067 1.08 2.067 2.262v.723c0 1.183-.888 2.154-2.064 2.262l-.155.014c-.284.024-.53.205-.64.47-.113.272-.067.574.117.795l.1.12c.756.905.696 2.22-.14 3.06l-.51.51c-.807.804-2.19.864-3.06.14l-.115-.096c-.217-.183-.53-.23-.79-.122-.273.114-.455.36-.48.646l-.014.15c-.107 1.173-1.08 2.06-2.262 2.06zm-3.773-4.42c.3 0 .593.06.87.175.79.328 1.324 1.054 1.4 1.896l.014.147c.037.4.367.7.77.7h.722c.4 0 .73-.3.768-.7l.014-.148c.076-.842.61-1.567 1.392-1.892.793-.33 1.696-.182 2.333.35l.113.094c.178.148.366.18.493.18.206 0 .4-.08.546-.227l.51-.51c.284-.284.305-.73.048-1.038l-.1-.12c-.542-.65-.677-1.54-.352-2.323.326-.79 1.052-1.32 1.894-1.397l.155-.014c.397-.037.7-.367.7-.77v-.722c0-.4-.303-.73-.702-.768l-.152-.014c-.846-.078-1.57-.61-1.895-1.393-.326-.788-.19-1.678.353-2.327l.1-.118c.257-.31.236-.756-.048-1.04l-.51-.51c-.146-.147-.34-.227-.546-.227-.127 0-.315.032-.492.18l-.12.1c-.634.528-1.55.67-2.322.354-.788-.327-1.32-1.052-1.397-1.896l-.014-.155c-.035-.397-.365-.7-.767-.7h-.723c-.4 0-.73.303-.768.702l-.014.152c-.076.843-.608 1.568-1.39 1.893-.787.326-1.693.183-2.33-.35l-.118-.096c-.18-.15-.368-.18-.495-.18-.206 0-.4.08-.546.226l-.512.51c-.282.284-.303.73-.046 1.038l.1.118c.54.653.677 1.544.352 2.325-.327.788-1.052 1.32-1.895 1.397l-.156.014c-.397.037-.7.367-.7.77v.722c0 .4.303.73.702.768l.15.014c.848.078 1.573.612 1.897 1.396.325.786.19 1.675-.353 2.325l-.096.115c-.26.31-.238.756.046 1.04l.51.51c.146.147.34.227.546.227.127 0 .315-.03.492-.18l.116-.096c.406-.336.923-.524 1.453-.524z"></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="row">
          <a
            href="https://nomadcoders.co/nwitter"
            target="_blank"
            rel="noreferrer"
          >
            <div className="top">
              <span>Trending in React & firebase</span>
            </div>
            <h3 className="title">트위터 클론 코딩</h3>
            <div className="bottom">
              <span>257 minutes</span>
            </div>
            <div className="svg-wrapper">
              <svg viewBox="0 0 24 24" className="twitter-svg">
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <div className="row">
          <a
            href="https://nomadcoders.co/kokoa-clone"
            target="_blank"
            rel="noreferrer"
          >
            <div className="top">
              <span>Trending in HTML & CSS</span>
            </div>
            <h3 className="title">코코아톡 클론 코딩</h3>
            <div className="bottom">
              <span>795 minutes</span>
            </div>
            <div className="svg-wrapper">
              <svg viewBox="0 0 24 24" className="twitter-svg">
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <div className="row">
          <a
            href="https://nomadcoders.co/wetube"
            target="_blank"
            rel="noreferrer"
          >
            <div className="top">
              <span>Trending in Full Stack</span>
            </div>
            <h3 className="title">유튜브 클론 코딩</h3>
            <div className="bottom">
              <span>1,714 minutes</span>
            </div>
            <div className="svg-wrapper">
              <svg viewBox="0 0 24 24" className="twitter-svg">
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <div className="row">
          <a
            href="https://nomadcoders.co/instaclone"
            target="_blank"
            rel="noreferrer"
          >
            <div className="top">
              <span>Trending in Full Stack</span>
            </div>
            <h3 className="title">인스타그램 클론 코딩</h3>
            <div className="bottom">
              <span>2,119 minutes</span>
            </div>
            <div className="svg-wrapper">
              <svg viewBox="0 0 24 24" className="twitter-svg">
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <div className="row">
          <a href="https://nomadcoders.co/" target="_blank" rel="noreferrer">
            <div className="top">
              <span>Trending in my mind</span>
            </div>
            <h3 className="title" style={{ fontWeight: '500' }}>
              I love nomadcoders
            </h3>
            <div className="bottom">
              <span>9,999 Loves</span>
            </div>
            <div className="svg-wrapper">
              <svg viewBox="0 0 24 24" className="twitter-svg">
                <g>
                  <circle cx="5" cy="12" r="2"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                  <circle cx="19" cy="12" r="2"></circle>
                </g>
              </svg>
            </div>
          </a>
        </div>
        <div className="row show-more">Show more</div>
      </div>
      <div className="follow">
        <div className="header">
          <h2 className="title">Who to follow</h2>
        </div>
        <a href="https://nomadcoders.co/" target="_blank" rel="noreferrer">
          <div className="row">
            <div className="left">
              <img src="https://nomadcoders.co/m.svg" alt="" />
            </div>
            <div className="right">
              <div>
                <div className="name">노마드 코더</div>
                <div>@Nomad_Coders_twt</div>
              </div>
              <button className="default-btn border--radius__max">
                Follow
              </button>
            </div>
          </div>
        </a>
        <div className="row show-more">Show more</div>
      </div>
      <nav>
        <a href="https://twitter.com/ko/tos">Terms of Service</a>
        <a href="https://twitter.com/ko/privacy">Privacy Policy</a>
        <a href="https://help.twitter.com/ko/rules-and-policies/twitter-cookies">
          Cookie Policy
        </a>
        <a href="https://business.twitter.com/en/help/troubleshooting/how-twitter-ads-work.html?ref=web-twc-ao-gbl-adsinfo&utm_source=twc&utm_medium=web&utm_campaign=ao&utm_content=adsinfo">
          Ads info
        </a>
        <a href="https://twitter.com/ko/tos">
          <div className="more">
            More
            <svg viewBox="0 0 24 24">
              <g>
                <circle cx="5" cy="12" r="2"></circle>
                <circle cx="12" cy="12" r="2"></circle>
                <circle cx="19" cy="12" r="2"></circle>
              </g>
            </svg>
          </div>
        </a>
        <span>&copy; {new Date().getFullYear()} Nwitter, Inc.</span>
      </nav>
    </StyledSidebar>
  );
};

export default Sidebar;
