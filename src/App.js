import { useCallback, useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { authService, dbService } from './fbase';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import UserPage from './pages/UserPage';
import { collection, query, onSnapshot, orderBy } from '@firebase/firestore';

function App() {
  const [user, setUser] = useState(null);
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState('');
  const [openMoreTweetId, setOpenMoreTweetId] = useState(null);
  const [tabState, setTabState] = useState({
    user: false,
    nweet: false,
    more: false,
    edit: false,
  });

  useEffect(() => {
    const nweetQuery = query(
      collection(dbService, 'nweets'),
      orderBy('createdAt', 'desc'),
    );

    const unsubscribe = onSnapshot(nweetQuery, (snapshot) => {
      const arr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(arr);
    });

    return () => unsubscribe();
  }, [setNweets]);
  const history = useHistory();

  const handleTab = useCallback(
    (type, tweetId) => {
      const $modalBackground = document.querySelector('#modal-background');
      $modalBackground.classList.toggle('show');

      // modal background를 클릭했을 때 (모달 닫기)
      if (!type) {
        for (let x in tabState) {
          if (tabState[x]) {
            type = x;
          }
        }
      }

      // 모달 상태 관리 (열고 닫을 때)
      setTabState((prev) => ({
        ...prev,
        [type]: !prev[type],
      }));

      // type이 nweet이거나 more일 때는 추가 작업
      switch (type) {
        case 'nweet':
          $modalBackground.classList.toggle('shadow');
          document.body.classList.toggle('overflow-hidden');
          setNweet('');
          setAttachment('');
          break;
        case 'more':
          setOpenMoreTweetId(tweetId);
          break;
        case 'edit':
          $modalBackground.classList.toggle('shadow');
          document.body.classList.toggle('overflow-hidden');
          setAttachment('');
          break;
        default:
          return;
      }
    },
    [tabState],
  );

  const handleNweet = useCallback(async () => {
    if (tabState.nweet) {
      handleTab('nweet');
    }

    await dbService.collection('nweets').add({
      text: nweet,
      createdAt: new Date(),
      creatorId: user.uid,
      img: user.img,
      name: user.name,
      attachmentUrl: attachment,
      likesArr: [],
    });

    setNweet('');
    setAttachment('');
  }, [attachment, handleTab, nweet, tabState, user]);

  const handleNweetChange = useCallback(
    (e) => {
      setNweet(e.target.value);
    },
    [setNweet],
  );

  const handleAttachment = useCallback(() => {
    setAttachment('');
  }, [setAttachment]);

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const { result } = e.target;
      setAttachment(result);
    };
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }
  }, []);

  const handleResizeTextArea = useCallback((e) => {
    e.target.style.height = '1px';
    e.target.style.height = 27 + e.target.scrollHeight + 'px';
  }, []);

  const refreshUser = useCallback(() => {
    setUser({
      name: authService.currentUser.displayName,
      uid: authService.currentUser.uid,
      img: authService.currentUser.photoURL,
    });
  }, []);

  const handleLikeClick = (id) => {
    const likesArr = nweets.filter((nweet) => nweet.id === id)[0].likesArr;

    if (!likesArr.includes(user.uid)) {
      likesArr.push(user.uid);
    } else {
      const idx = likesArr.indexOf(user.uid);
      likesArr.splice(idx, 1);
    }
    dbService.collection('nweets').doc(id).update({
      likesArr,
    });
  };

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push('/home');

        setUser({
          name: user.displayName || 'Guest',
          uid: user.uid,
          img:
            user.photoURL ||
            'https://pbs.twimg.com/profile_images/1386733982637645824/JJA95cnC_200x200.png',
        });
      } else {
        history.push('/');
      }
    });
  }, [history]);

  return (
    <>
      <div id="modal-background" onClick={() => handleTab()}></div>
      <Route path="/" component={MainPage} exact />
      <Route path="/home" exact>
        <HomePage
          user={user}
          tabState={tabState}
          nweet={nweet}
          attachment={attachment}
          openMoreTweetId={openMoreTweetId}
          handleTab={handleTab}
          handleNweet={handleNweet}
          handleNweetChange={handleNweetChange}
          handleAttachment={handleAttachment}
          handleFileChange={handleFileChange}
          handleResizeTextArea={handleResizeTextArea}
          handleLikeClick={handleLikeClick}
          nweets={nweets}
        />
      </Route>
      <Route path="/login" component={LoginPage} />
      <Route path="/profile/:creatorId">
        <UserPage
          user={user}
          tabState={tabState}
          nweet={nweet}
          handleNweetChange={handleNweetChange}
          attachment={attachment}
          handleAttachment={handleAttachment}
          handleFileChange={handleFileChange}
          handleTab={handleTab}
          handleNweet={handleNweet}
          openMoreTweetId={openMoreTweetId}
          handleResizeTextArea={handleResizeTextArea}
          refreshUser={refreshUser}
          handleLikeClick={handleLikeClick}
        />
      </Route>
    </>
  );
}

export default App;
