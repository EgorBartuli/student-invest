import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainNav from './navigate/MainNav';
import Routers from './routes/Routers';
import { useDispatch } from 'react-redux';
import { checkAuthAC } from './store/actions';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthData = async () => {
      try {
        const res = await fetch('/auth/isAuth');
        const data = await res.json();
        if (data.err) {
          alert(data.err);
        } else {
          dispatch(checkAuthAC(data));
        }
      } catch (error) {
        console.error('Error fetching auth data:', error);
      }
    };

    fetchAuthData();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MainNav />
      <Routers />
    </BrowserRouter>
  );
}

export default App;

