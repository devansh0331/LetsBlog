import React from "react";
import Navbar from "./navbar/Navbar";
import Home from "./home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import { UserContext, UserContextProvider } from "../UserContext";
import CreatePost from "./createPost/CreatePost";
import SinglePost from "./SinglePost/SinglePost";
import EditPost from "./createPost/EditPost";
// import * as mdb from "mdb-ui-kit";

function Main() {
  return (
    <div>
      <UserContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/edit/:id" element={<EditPost />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default Main;
