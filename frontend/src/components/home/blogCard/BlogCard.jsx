import React from "react";

import "./BlogCard.css";

import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";

function BlogCard({
  title,
  content,
  cover,
  summary,
  createdAt,
  author,
  blogImg,
  _id,
  views,
}) {
  return (
    <div className="blogCard">
      <div className="blogCardDetails">
        <Link to={`/post/${_id}`}>
          <img src={"https://lets-blog-pfs7.onrender.com/" + cover} alt="" />
        </Link>
        <div className="blogCardContent">
          <Link to={`/post/${_id}`}>
            <p>{title}</p>
          </Link>
          <p>
            <span style={{ color: "gray" }}>
              <ReactTimeAgo date={createdAt} />
            </span>
            <span>by: {author}</span>
          </p>
          <p>{summary}</p>
        </div>
        {/* <div>
          <p>
            {" "}
            <strong>Views</strong>: {views}
          </p>
          <p style={{ color: "red" }}>
            {" "}
            <strong>
              Topic:
              <span style={{ color: "green" }}> Technical</span>
            </strong>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default BlogCard;
