import React from "react";
import "./Share.css";

import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector(selectUser);

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <Link to={`profile/${user.username}`}>
            <img
              className="shareProfileImg"
              src={`${
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "noAvatar.webp"
              }`}
              alt=""
            />
          </Link>
          <input
            className="shareInput"
            type="text"
            placeholder={`What is in your mind ${user.username}?`}
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
}

export default Share;
