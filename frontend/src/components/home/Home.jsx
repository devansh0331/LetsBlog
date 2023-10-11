import React, { useEffect, useState } from "react";
import BlogCard from "./blogCard/BlogCard";

import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/post").then((response) =>
      response.json().then((posts) => setPosts(posts))
    );
  }, []);
  return (
    <div className="home">
      <div className="homeContent">
        <span>View the latest Blogs</span>
        <div className="homeBlogs">
          {posts.length > 0 &&
            posts.map((item, key) => {
              console.log(item);
              return (
                <BlogCard
                  title={item.title}
                  summary={item.summary}
                  author={item.author ? item.author.username : ""}
                  cover={item.cover}
                  createdAt={item.createdAt}
                  _id={item._id}
                  views={item.views}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default Home;
