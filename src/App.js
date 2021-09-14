import { useEffect, useState } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { authService } from './fbase';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push('/home');
        setUser({
          name: user.displayName,
          uid: user.uid,
          img: user.photoURL,
        });
      } else {
        history.push('/');
      }
    });
  }, [history]);
  return (
    <>
      <Route path="/" component={MainPage} exact />
      <Route path="/home">
        <HomePage user={user} />
      </Route>
      <Route path="/login" component={LoginPage} />
    </>
  );
}

export default App;
