import React, { useEffect, useState } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.css";
import { Posts } from "../../data";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const user = useSelector(selectUser);

  const fetchPosts = async () => {
    const res = username
      ? await axios.get("/posts/profile/" + username)
      : await axios.get(`/posts/timeline/` + user._id);
    setPosts(res.data);
    console.log(res);
  };
  useEffect(() => {
    fetchPosts();
    console.log(username);
  }, [username, user._id]);
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
