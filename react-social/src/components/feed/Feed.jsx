import React from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.css";
import { Posts } from "../../data";
function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Feed;
