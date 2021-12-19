import React, { useRef, useState } from "react";
import "./Share.css";
import { EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

function Share() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector(selectUser);

  //for post input description and file
  const desc = useRef();
  const [file, setFile] = useState(null);

  //submitform
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };

    //if a file is selected by user then it has to be uploaded and the name of the file should be changed based on the date
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName); //indicate the file itself.
      data.append("file", file); //indicate the file name.
      newPost.img = fileName; //add image into the new post.

      try {
        await axios.post("/upload", data);
      } catch (err) {}
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload();
    } catch (err) {}
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/noAvatar.webp"
            }
            alt=""
          />

          <input
            className="shareInput"
            type="text"
            placeholder={`What is in your mind ${user.username}?`}
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                type="file"
                id="file"
                // accept only files with below extensions.
                accept=".png, .jpg, .jpeg"
                // we dont want choos all filess. just choose the first file.
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </label>
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
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
}

export default Share;
