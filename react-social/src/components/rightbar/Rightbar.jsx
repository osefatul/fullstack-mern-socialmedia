import React from "react";
import "./Rightbar.css";
import Online from "../online/Online";
import { Users } from "../../data";
function Rightbar({ user }) {
  //Component for Home page
  const HomeRightbar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <div className="birthdayContainer">
          <img src={`${PF}birthdayGift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Thor</b> and <b>2 other friends</b> have a birthday.
          </span>
        </div>
        <img src={`${PF}ad.jpg`} alt="" className="rightbarAd" />
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
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    return (
      <>
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 2
                ? "Married"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/blackPanther.jpg`}
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Black Panther</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/captian.png`}
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Captian Steve</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/deadpool.jpg`}
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">Dead Pool</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/DoctorStrange.jpg`}
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">DoctorStrange</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/hulk.jpg`}
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">The Hulk</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/ironMan.webp`}
              alt=""
              className="rightbarFollowingimg"
            />
            <span className="rightbarFollowingName">The Iron Man</span>
          </div>
          <div className="rightbarFollowing">
            <img
              src={`${PF}person/thanos.jpg`}
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
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
