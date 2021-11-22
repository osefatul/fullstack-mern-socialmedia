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
            <img src={blackWidow} alt="" className="postProfileImag" />
            <span className="postUsername">Black Widow</span>
            <span className="postDate">5 min ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">hey yo! look at this, who is here!</span>
          <img
            src="../../assets/post/wakandaWar.jpg"
            alt=""
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img src="../../assets/like.png" alt="" className="likeIcon" />
            <img src="../../assets/heart.png" alt="" className="likeIcon" />
            <span className="postLikeCounter">10 people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">9 comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
