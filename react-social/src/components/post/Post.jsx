import React, { useEffect, useState } from "react";
import "./Post.css";

import { MoreVert } from "@material-ui/icons";
import axios from "axios";
//import { Users } from "../../data";
function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});

  const likeHandler = () => {
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const fetchUser = async () => {
    const res = await axios.get(`users/${post.userId}`);
    setUser(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={
                // PF + Users.filter((u) => u.id === post.userId)[0].profilePicture
                user.profilePicture || PF + "/person/noAvatar.webp"
              }
              alt=""
              className="postProfileImag"
            />
            <span className="postUsername">
              {/* {Users.filter((u) => u.id === post.userId)[0].username} */}
              {user.username}
            </span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={`${PF}like.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={`${PF}heart.png`}
              alt=""
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Post;
