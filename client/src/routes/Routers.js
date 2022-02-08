import React from "react";
import { Routes, Route } from 'react-router-dom';
import Logout from "../components/Logout/Logout";
import Main from "../components/Main/Main";
import MainStudent from "../components/MainStudent/MainStudent";
import SignIn from "../components/SignIn/SignIn";
import SignUp from "../components/SignUp/SignUp";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";


const Routers = () => {
  const { status } = useSelector((store) => store.user);

  return (
    <Routes>
      <Route path="/" element={status === 'Student' ? <MainStudent /> : <Main />} />
      <Route path="/auth/register" element={<SignUp />} />
      <Route path="/auth/login" element={<SignIn />} />
      <Route path="/auth/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Routers;
