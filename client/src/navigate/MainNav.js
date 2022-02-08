import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const MainNav = () => {
  const { isAuth, user, status } = useSelector((store) => store.user);

  //Component
  return (
    <header>
      <nav style={{backgroundColor: "(59,89,152)"}} className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand px-3" to="/">
            Student-Invest
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mb-2 mb-lg-0">
              {/* IF Auth is false */}
              {isAuth === false && (
                <li className="nav-item px-3">
                  <Link className="classes.nav-link" to="/auth/register">
                    Sign Up
                  </Link>
                </li>
              )}

              {isAuth === false && (
                <li className="nav-item px-3">
                  <Link className="nav-link" to="/auth/login">
                    Sign In
                  </Link>
                </li>
              )}

              {/* IF Auth is true */}
              {isAuth && (
                <>
                  <li className="nav-item px-3">
                  <Link className="nav-link" to="/profile">
                      Welcome back, {user} | Your status is, {status}
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/auth/logout">
                      Log Out
                    </Link>
                  </li>
                  <li className="nav-item px-3">
                    <Link className="nav-link" to="/profile">
                      Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNav;
