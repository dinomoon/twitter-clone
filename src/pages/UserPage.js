import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import Loading from '../components/common/Loading';
import Header from '../components/Header';
import oc from 'open-color';
import { Link } from 'react-router-dom';
import { authService, dbService, storageService } from '../fbase';
import {
  collection,
  orderBy,
  query,
  where,
  onSnapshot,
} from '@firebase/firestore';
import { updateProfile } from '@firebase/auth';
import Nweet from '../components/Nweet';
import Sidebar from '../components/Sidebar';
import UserModal from '../components/common/UserModal';
import palette from '../lib/styles/palette';
import NweetForm from '../components/NweetForm';
import NweetModal from '../components/NweetModal';
import { getDownloadURL, ref, uploadString } from '@firebase/storage';

const Main = styled.main`
  .header {
    display: flex;
    align-items: center;
    height: 53px;
    padding: 0 1rem;
    border-bottom: 1px solid ${palette.borderColor};
    .name {
      font-size: 20px;
      font-weight: bold;
    }
    .svg-wrapper {
      width: 34px;
      height: 34px;
      svg {
        width: 20px;
        height: 20px;
      }
      &:hover {
        background-color: ${oc.gray[1]};
      }
    }

    .right {
      .nweet-count {
        font-size: 13px;
      }
    }
  }

  .user-info-detail {
    padding: 1rem;
    border-bottom: 1px solid ${palette.borderColor};
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    img {
      width: 130px;
      height: 130px;
      border: 2px soild red;
    }
    button {
      width: 110px;
      height: 34px;
      border: 1px solid ${oc.gray[4]};
      font-size: 15px;
      font-weight: bold;
      &:hover {
        background-color: ${oc.gray[4]};
      }
    }
    .name {
      font-size: 20px;
      font-weight: bold;
    }
    .uid {
      font-size: 15px;
      color: ${oc.gray[6]};
      margin-bottom: 1rem;
    }
    .bio {
      white-space: pre-line;
    }
  }
`;

const EditModal = styled.div`
  width: 600px;
  height: 650px;
  position: absolute;
  top: 100px;
  left: calc(50% - 300px);
  background-color: #fff;
  border-radius: 20px;
  z-index: 9999;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    height: 54px;
    .svg-wrapper {
      width: 34px;
      height: 34px;
      margin-right: 2rem;
      svg {
        width: 20px;
        width: 20px;
      }
      &:hover {
        background-color: ${oc.gray[1]};
      }
    }
    .title {
      font-size: 20px;
      font-weight: 500;
      flex: 1;
      margin-bottom: 5px;
    }
    .save-btn {
      width: 65px;
      height: 30px;
      background-color: ${oc.gray[9]};
      color: #fff;
      font-size: 14px;
      &:hover {
        background-color: ${oc.gray[8]};
      }
    }
  }

  .img-wrapper {
    padding: 12px 16px;
    .file-label {
      display: inline-block;
      position: relative;
      cursor: pointer;
      &:hover {
        .svg-wrapper {
          background-color: ${oc.gray[8]};
        }
      }
      .svg-wrapper {
        position: absolute;
        left: calc(50% - 17px);
        top: calc(50% - 17px);
        width: 34px;
        height: 34px;
        svg {
          width: 20px;
          height: 20px;
          fill: #fff;
        }
      }
    }
    img {
      width: 110px;
      height: 110px;
      filter: brightness(80%);
    }
  }

  .form-wrapper {
    padding: 12px 16px;
    .row {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      label {
        margin-bottom: 6px;
      }
      input,
      textarea {
        border: 1px solid ${oc.gray[5]};
        font-size: 1rem;
        outline-color: ${palette.nwitter};
        border-radius: 8px;
      }
      input {
        height: 50px;
        padding-left: 10px;
      }
      textarea {
        padding: 10px;
        min-height: 100px;
        resize: none;
        font-family: inherit;
      }
    }
  }
`;

const UserPage = ({
  user,
  handleTab,
  tabState,
  openMoreTweetId,
  nweet,
  attachment,
  handleNweetChange,
  handleResizeTextArea,
  handleAttachment,
  handleFileChange,
  handleNweet,
  refreshUser,
  handleLikeClick,
}) => {
  const { creatorId } = useParams();
  const [userNweets, setUserNweets] = useState([]);
  const [userName, setUserName] = useState('');
  const [form, setForm] = useState({
    name: '',
    bio: '',
  });
  const [storeUser, setStoreUser] = useState(null);
  const [userDocId, setUserDocId] = useState(null);

  useEffect(() => {
    const nweetQuery = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', creatorId),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(nweetQuery, (snapshot) => {
      const arr = snapshot.docs.map((doc) => {
        setUserName(doc.data().name);
        return {
          id: doc.id,
          createdAt: doc.data().createdAt,
          creatorId: doc.data().creatorId,
          img: doc.data().img,
          name: doc.data().name,
          text: doc.data().text,
          attachmentUrl: doc.data().attachmentUrl,
          likesArr: doc.data().likesArr,
        };
      });
      setUserNweets(arr);
    });

    return () => unsubscribe();
  }, [creatorId, setUserNweets]);

  useEffect(() => {
    const userQuery = query(
      collection(dbService, 'users'),
      where('id', '==', creatorId),
    );

    const unsubscribe = onSnapshot(userQuery, (snapshot) => {
      const arr = snapshot.docs.map((doc) => {
        setUserDocId(doc.id);
        return doc.data();
      });
      if (arr.length !== 0) {
        setStoreUser(arr[0]);
      }
    });

    return () => unsubscribe();
  }, [creatorId]);

  const onChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }, []);

  const onSubmit = useCallback(async () => {
    let unsubscribe;
    let photoURLRef;
    let uploadImg;
    let attachmentUrl;

    if (form.bio) {
      if (storeUser) {
        await dbService.collection('users').doc(userDocId).update({
          id: user.uid,
          bio: form.bio,
        });
      } else {
        await dbService.collection('users').add({
          id: user.uid,
          bio: form.bio,
        });
      }
    }

    const nweetQuery = query(
      collection(dbService, 'nweets'),
      where('creatorId', '==', creatorId),
    );

    if (attachment) {
      photoURLRef = ref(storageService, `${user.uid}`);
      uploadImg = await uploadString(photoURLRef, attachment, 'data_url');
      attachmentUrl = await getDownloadURL(uploadImg.ref);
    }

    // 모든 nweet 상태 변경
    unsubscribe = onSnapshot(nweetQuery, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        setTimeout(() => {
          dbService
            .collection('nweets')
            .doc(doc.id)
            .update({
              img: attachment || doc.data().img,
              name: form.name || doc.data().name,
            });
        }, 100);
      });
    });

    // user 상태 변경
    await updateProfile(authService.currentUser, {
      displayName: form.name || authService.currentUser.name,
      photoURL: attachmentUrl || authService.currentUser.photoURL,
    });

    // 새로고침
    refreshUser();

    // edit modal 닫기
    handleTab('edit');

    return () => unsubscribe();
  }, [
    creatorId,
    form,
    handleTab,
    storeUser,
    user,
    userDocId,
    refreshUser,
    attachment,
  ]);

  const onClickEdit = useCallback(() => {
    setForm({
      name: user.name,
      bio: storeUser ? storeUser.bio : '',
    });
    handleTab('edit');
  }, [storeUser, handleTab, user]);

  if (!user) {
    return <Loading />;
  }
  return (
    <>
      {tabState.nweet && (
        <NweetModal>
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
      {tabState.edit && (
        <EditModal>
          <header>
            <div className="svg-wrapper" onClick={() => handleTab('edit')}>
              <svg viewBox="0 0 24 24">
                <g>
                  <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                </g>
              </svg>
            </div>
            <div className="title">Edit profile</div>
            <button
              className="default-btn save-btn border--radius__max"
              onClick={onSubmit}
            >
              Save
            </button>
          </header>
          <div className="img-wrapper">
            <label htmlFor="file" className="file-label">
              <img
                src={attachment ? attachment : user.img}
                alt=""
                className="border--radius__max"
              />
              <div className="svg-wrapper">
                <svg viewBox="0 0 24 24">
                  <g>
                    <path d="M19.708 22H4.292C3.028 22 2 20.972 2 19.708V7.375C2 6.11 3.028 5.083 4.292 5.083h2.146C7.633 3.17 9.722 2 12 2c2.277 0 4.367 1.17 5.562 3.083h2.146C20.972 5.083 22 6.11 22 7.375v12.333C22 20.972 20.972 22 19.708 22zM4.292 6.583c-.437 0-.792.355-.792.792v12.333c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V7.375c0-.437-.355-.792-.792-.792h-2.45c-.317.05-.632-.095-.782-.382-.88-1.665-2.594-2.7-4.476-2.7-1.883 0-3.598 1.035-4.476 2.702-.16.302-.502.46-.833.38H4.293z"></path>
                    <path d="M12 8.167c-2.68 0-4.86 2.18-4.86 4.86s2.18 4.86 4.86 4.86 4.86-2.18 4.86-4.86-2.18-4.86-4.86-4.86zm2 5.583h-1.25V15c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-1.25H10c-.414 0-.75-.336-.75-.75s.336-.75.75-.75h1.25V11c0-.414.336-.75.75-.75s.75.336.75.75v1.25H14c.414 0 .75.336.75.75s-.336.75-.75.75z"></path>
                  </g>
                </svg>
              </div>
            </label>
            <input
              id="file"
              type="file"
              accept="image/*"
              className="file-input"
              onChange={handleFileChange}
            />
          </div>
          <div className="form-wrapper">
            <div className="row">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={onChange}
              />
            </div>
            <div className="row">
              <label htmlFor="bio">Bio</label>
              <textarea id="bio" value={form.bio} onChange={onChange} />
            </div>
          </div>
        </EditModal>
      )}
      <div className="container">
        {tabState.user && <UserModal user={user} />}
        <Header user={user} handleTab={handleTab} />
        <Main className="home">
          <section className="primary-column">
            <div className="header">
              <div className="left">
                <div className="svg-wrapper" style={{ marginRight: '20px' }}>
                  <Link to="/home">
                    <svg viewBox="0 0 24 24">
                      <g>
                        <path d="M20 11H7.414l4.293-4.293c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0l-6 6c-.39.39-.39 1.023 0 1.414l6 6c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L7.414 13H20c.553 0 1-.447 1-1s-.447-1-1-1z"></path>
                      </g>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="right">
                <div className="name">
                  {/* nweet이 있어야 다른 사람 프로필을 볼 수 있음. userName은 다른 사람 이름 */}
                  {userNweets.length ? userName : user.name}
                </div>
                <div className="nweet-count">{userNweets.length} Nweets</div>
              </div>
            </div>
            <div className="user-info-detail">
              <div className="top">
                <img
                  src={user.img}
                  alt=""
                  className="border--radius__max"
                  style={{ border: '2px solid #ddd' }}
                />
                {creatorId === user.uid ? (
                  <button
                    className="default-btn border--radius__max"
                    onClick={onClickEdit}
                  >
                    Edit profile
                  </button>
                ) : (
                  <button className="default-btn border--radius__max">
                    Follow
                  </button>
                )}
              </div>
              <div className="name">
                {userNweets.length ? userName : user.name}
              </div>
              <div className="uid">@{creatorId}</div>
              {storeUser && <div className="bio">{storeUser.bio}</div>}
            </div>
            <div>
              {userNweets.map((nweet) => (
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
          <Sidebar className="sidebar-column" />
        </Main>
      </div>
    </>
  );
};

export default React.memo(UserPage);
