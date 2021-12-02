import React, { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.css";
import { Posts } from "../../data";
import axios from "axios";
function Feed() {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const res = await axios.get("posts/timeline/61a615836699abbdf0cd1273");
    setPosts(res.data);
    console.log(res);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
