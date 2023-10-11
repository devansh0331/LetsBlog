import React, { useState } from "react";

import "./Auth.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch("http://localhost:5000/register", {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (data.status === 200) {
        alert("Registered Successfully");
        navigate("/login");
      }

      if (data.status === 400) {
        alert("Registeration Failed due to status 400");
      }
      // else {
      //   alert("Registeration Failed due to SERVER ERROR");
      // }
    } catch (error) {
      alert("Registeration Failed due to CLIENT ERROR" + error);
    }
  };

  return (
    <div className="register">
      <h1>Register</h1>
      <form action="" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Username"
          value={username}
          onChange={(e) => setusername(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Email"
          value={email}
          onChange={(e) => setemail(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <button>Register</button>
      </form>
    </div>
  );
}

export default SignUp;
