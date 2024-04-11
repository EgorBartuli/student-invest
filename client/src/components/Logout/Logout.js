import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogOutAC } from "../../store/actions";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkLogOutAC());
    navigate("/");
  }, [navigate, dispatch]);

  return <div className="Logout" />;
}

export default Logout;

