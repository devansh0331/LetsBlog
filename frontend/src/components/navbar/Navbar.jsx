import React, { useContext, useEffect, useState } from "react";

import "./Navbar.css";

import { Link } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Navbar() {
  const { setUserInfo, userInfo } = useContext(UserContext);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/profile", { credentials: "include" }).then(
        (response) =>
          response.json().then((userInfo) => {
            // setusername(userInfo.username);
            setUserInfo(userInfo);
            console.log(username);
          })
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleLogout = () => {
    fetch("http://localhost:5000/logout", {
      credentials: "include",
      method: "POST",
    });
    // setusername(null);
    setUserInfo({});
  };

  const username = userInfo.username;
  return (
    <div className="nav">
      <div className="navDetails">
        <ul>
          <Link to="/">
            <li>
              <strong>Let's Blog</strong>
            </li>
          </Link>
          {/* <Link to="/">
            <li>Home</li>
          </Link> */}
          <Link to="/">
            <li>Blogs</li>
          </Link>
          {/* <Link to="/">
            <li>People</li>
          </Link> */}
        </ul>
        <ul>
          {username && (
            <>
              <Link
                to="/create"
                style={{
                  color: "black",
                  background: "white",
                  padding: ".3rem",
                  borderRadius: "1rem",
                }}
              >
                <li>Create New Post</li>
              </Link>
              <a
                onClick={handleLogout}
                style={{
                  cursor: "pointer",
                }}
              >
                <li>Log Out</li>
              </a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">
                <li>Login</li>
              </Link>
              <Link to="/register">
                <li>Sign Up</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
