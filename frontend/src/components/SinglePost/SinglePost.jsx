import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { compareAsc, formatISO9075 } from "date-fns";

import "./SinglePost.css";

function SinglePost() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    console.log(id);
    fetch(`https://lets-blog-pfs7.onrender.com/post/${id}`).then((response) =>
      response.json().then((postInfo) => setPostInfo(postInfo))
    );
  }, []);
  if (!postInfo) return "";
  return (
    <div className="singlePost">
      <div className="singlePostDetails">
        <p>{postInfo.title}</p>
        <div className="singlePostInfo">
          <p>{formatISO9075(new Date(postInfo.createdAt))}</p>
          <p>by {postInfo.author.username}</p>
        </div>
        {/* <Link to={`/edit/${id}`}>Edit Post</Link> */}
        <img
          src={"https://lets-blog-pfs7.onrender.com/" + postInfo.cover}
          alt=""
        />
        {/* <p>{postInfo.content}</p> */}
        {/* {postInfo.content} */}
        <p>{postInfo.summary}</p>
        <div
          className="singlePostContent"
          dangerouslySetInnerHTML={{ __html: postInfo.content }}
        />
      </div>
    </div>
  );
}

export default SinglePost;
