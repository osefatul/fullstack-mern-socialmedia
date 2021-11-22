import React from "react";
import "./Profile.css";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

function Profile() {
  return (
    <div>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src="../../assets/post/infinityWar.webp"
                alt=""
                className="profileCoverImg"
              />
              <img
                src="../../assets/person/blackWidow.jpg"
                alt=""
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Black Widow</h4>
              <span className="profileInfoDesc">Natasha The Black Widow</span>
            </div>
          </div>
          <div className="profilRightBottom">
            <Feed />
            <Rightbar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
