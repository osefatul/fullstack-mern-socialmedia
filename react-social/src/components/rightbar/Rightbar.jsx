import React from "react";
import "./Rightbar.css";
import Online from "../online/Online";
import { Users } from "../../data";
function Rightbar({ profile }) {
  //Component for Home page
  const HomeRightbar = () => {
    return (
      <>
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
      </>
    );
  };

  //Component for profile page
  const ProfileRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">Richmond</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">BC</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Engaged</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/blackPanther.jpg"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Black Panther</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/captian.png"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Captian Steve</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/deadpool.jpg"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Dead Pool</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/DoctorStrange.jpg"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">DoctorStrange</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/hulk.jpg"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">The Hulk</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/iron man.webp"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">The Iron Man</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src="../../assets/person/thanos.jpg"
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Thanos</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
