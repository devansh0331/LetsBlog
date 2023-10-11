import React, { useContext, useState } from "react";
import "./Auth.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

function Login() {
  const navigate = useNavigate();

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  const { setUserInfo } = useContext(UserContext);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    try {
      const data = await fetch("https://lets-blog-pfs7.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      console.log(data);

      if (data.ok) {
        data.json().then((userInfo) => {
          setUserInfo(userInfo);
          navigate("/");
        });
      }
    } catch (error) {
      alert("Client Error : " + error);
    }
  };
  return (
    <div className="register">
      <h1>Login</h1>
      <form action="" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        {/* <input
          type="text"
          name=""
          id=""
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        /> */}
        <input
          type="text"
          name=""
          id=""
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
