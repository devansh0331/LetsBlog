import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import "./CreatePost.css";
import { useNavigate } from "react-router-dom";
function EditPost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    // clipboard: {
    //   // toggle to add extra line breaks when pasting HTML:
    //   matchVisual: false,
    // },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  const createNewPost = async (e) => {
    e.preventDefault();
    const data = new FormData();

    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);

    const response = await fetch("http://localhost:5000/post", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: data,
      credentials: "include",
    });
    await response.json();

    if (response.ok) {
      navigate("/");
    }
  };

  const updatePost = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form className="create">
        <input
          type="text"
          name=""
          id=""
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <input
          type="file"
          name=""
          id=""
          //   value={files}
          onChange={(e) => setFiles(e.target.files)}
        />
        {/* <ReactQuill type="text" name="" id="" placeholder="Summary"  /> */}
        <ReactQuill
          className="react-quill"
          theme="Snow"
          modules={modules}
          value={content}
          onChange={(newValue) => setContent(newValue)}
        />
        <button onClick={updatePost}>Post</button>
      </form>
    </div>
  );
}

export default EditPost;
