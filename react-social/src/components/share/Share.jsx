import React from "react";
import "./Share.css";
import blackWidow from "../../assets/person/blackWidow.jpg";
import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";

function Share() {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img src={blackWidow} alt="" className="shareProfileImg" />
          <input
            type="text"
            placeholder="What is in your mind Omar? "
            className="shareInput"
          />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            <div className="shareOption">
              <PermMedia className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
            </div>
            <div className="shareOption">
              <Label className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Share;