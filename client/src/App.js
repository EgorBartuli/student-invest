import React from 'react';
import { BrowserRouter } from "react-router-dom";
import MainNav from './navigate/MainNav';
import Routers from "./routes/Routers";
import { useDispatch } from "react-redux";
import { checkAuthAC } from './store/actions';

function App() {
  //Check if user isAuth
  //Connect to Back-end
  const dispatch = useDispatch();
  React.useEffect(() => {
    (async () => {
      //Auth Data
      const res = await fetch("/auth/isAuth");
      const data = await res.json();
      //Catch errror
      if (data.err) {
        return alert(data.err);
      }
      dispatch(checkAuthAC(data));
    })();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MainNav />
      <Routers />
    </BrowserRouter>
  );
}

export default App;
