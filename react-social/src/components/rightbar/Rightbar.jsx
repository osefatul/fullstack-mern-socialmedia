import React from "react";
import "./Rightbar.css";
import Online from "../online/Online";
import { Users } from "../../data";
function Rightbar() {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img
            src="../../assets/birthdayGift.png"
            alt=""
            className="birthdayImg"
          />
          <span className="birthdayText">
            <b>Thor</b> and <b>2 other friends</b> have a birthday.
          </span>
        </div>
        <img src="../../assets/ad.jpg" alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((user) => (
            <Online key={user.id} user={user} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Rightbar;
