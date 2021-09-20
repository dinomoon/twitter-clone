import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import Nweet from '../components/Nweet';
import palette from '../lib/styles/palette';
import NweetForm from '../components/NweetForm';
import Header from '../components/Header';
import Loading from '../components/common/Loading';
import Sidebar from '../components/Sidebar';
import UserModal from '../components/common/UserModal';
import NweetModal from '../components/NweetModal';

const Main = styled.main`
  .primary-column {
    /* home */
    .home {
      position: sticky;
      top: 0;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 8px 10px 16px;
      border-bottom: 1px solid ${palette.borderColor};
      z-index: 9000;
      h2 {
        margin: 0;
        padding: 0;
        font-size: 20px;
      }
      .top-nweets {
        width: 34px;
        height: 34px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all 0.2s;
        svg {
          width: 20px;
          height: 20px;
        }
        &:hover {
          background-color: ${oc.gray[2]};
        }
      }
    }
  }
`;

const HomePage = ({
  user,
  tabState,
  nweet,
  nweets,
  attachment,
  openMoreTweetId,
  handleTab,
  handleNweet,
  handleNweetChange,
  handleAttachment,
  handleFileChange,
  handleResizeTextArea,
  handleLikeClick,
}) => {
  if (!user) {
    return <Loading />;
  }

  return (
    <>
      {tabState.nweet && (
        <NweetModal handleTab={handleTab}>
          <NweetForm
            modal
            user={user}
            nweet={nweet}
            handleNweetChange={handleNweetChange}
            handleResizeTextArea={handleResizeTextArea}
            attachment={attachment}
            handleAttachment={handleAttachment}
            handleFileChange={handleFileChange}
            handleNweet={handleNweet}
          />
        </NweetModal>
      )}
      <div className="container">
        {tabState.user && <UserModal user={user} />}
        <Header handleTab={handleTab} user={user} />
        {/* Main */}
        <Main role="main" className="home">
          <section className="primary-column">
            {/* home */}
            <div className="home">
              <h2>Home</h2>
              <div className="top-nweets border--radius__max">
                <svg viewBox="0 0 24 24">
                  <g>
                    <path d="M22.772 10.506l-5.618-2.192-2.16-6.5c-.102-.307-.39-.514-.712-.514s-.61.207-.712.513l-2.16 6.5-5.62 2.192c-.287.112-.477.39-.477.7s.19.585.478.698l5.62 2.192 2.16 6.5c.102.306.39.513.712.513s.61-.207.712-.513l2.16-6.5 5.62-2.192c.287-.112.477-.39.477-.7s-.19-.585-.478-.697zm-6.49 2.32c-.208.08-.37.25-.44.46l-1.56 4.695-1.56-4.693c-.07-.21-.23-.38-.438-.462l-4.155-1.62 4.154-1.622c.208-.08.37-.25.44-.462l1.56-4.693 1.56 4.694c.07.212.23.382.438.463l4.155 1.62-4.155 1.622zM6.663 3.812h-1.88V2.05c0-.414-.337-.75-.75-.75s-.75.336-.75.75v1.762H1.5c-.414 0-.75.336-.75.75s.336.75.75.75h1.782v1.762c0 .414.336.75.75.75s.75-.336.75-.75V5.312h1.88c.415 0 .75-.336.75-.75s-.335-.75-.75-.75zm2.535 15.622h-1.1v-1.016c0-.414-.335-.75-.75-.75s-.75.336-.75.75v1.016H5.57c-.414 0-.75.336-.75.75s.336.75.75.75H6.6v1.016c0 .414.335.75.75.75s.75-.336.75-.75v-1.016h1.098c.414 0 .75-.336.75-.75s-.336-.75-.75-.75z"></path>
                  </g>
                </svg>
              </div>
            </div>
            {/* What's happening */}
            <NweetForm
              user={user}
              nweet={nweet}
              handleNweetChange={handleNweetChange}
              handleResizeTextArea={handleResizeTextArea}
              attachment={attachment}
              handleAttachment={handleAttachment}
              handleFileChange={handleFileChange}
              handleNweet={handleNweet}
            />

            {/* Tweets */}
            <div>
              {nweets.map((nweet) => (
                <Nweet
                  key={nweet.id}
                  nweet={nweet}
                  handleTab={handleTab}
                  tabState={tabState}
                  openMoreTweetId={openMoreTweetId}
                  isOwner={nweet.creatorId === user.uid}
                  creatorId={nweet.creatorId}
                  handleLikeClick={handleLikeClick}
                  like={nweet.likesArr.includes(user.uid)}
                />
              ))}
            </div>
          </section>
          <Sidebar />
        </Main>
      </div>
    </>
  );
};

export default HomePage;
