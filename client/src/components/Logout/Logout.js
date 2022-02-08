import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogOutAC } from "../../store/actions";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    (() => {
      dispatch(thunkLogOutAC());
      return navigate("/");
    })();
  }, [navigate, dispatch]);

  return <div className="Logout"></div>;
}

export default Logout;
