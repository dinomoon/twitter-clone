import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';
import { authService } from './fbase';
import HomePage from './pages/HomePage';
import MainPage from './pages/MainPage';

function App() {
  const history = useHistory();
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        history.push('/home');
      } else {
        history.push('/');
      }
    });
  });
  return (
    <>
      <Route path="/" component={MainPage} exact />
      <Route path="/home" component={HomePage} exact />
    </>
  );
}

export default App;
