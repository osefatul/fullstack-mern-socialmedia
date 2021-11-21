import React from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import "./Feed.css";
function Feed() {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
      </div>
    </div>
  );
}

export default Feed;
