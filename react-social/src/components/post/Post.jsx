import React from "react";
import "./Post.css";
import blackWidow from "../../assets/person/blackWidow.jpg";
import { MoreVert } from "@material-ui/icons";
function Post() {
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={blackWidow} alt="" />
            <span className="postUsername">Black Widow</span>
            <span className="postDate">5 min ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter"></div>
        <div className="postBottom"></div>
      </div>
    </div>
  );
}

export default Post;
