import { Chat, Notifications, Person, Search } from "@material-ui/icons";
import React from "react";
import "./Topbar.css";
import { Link } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import { useSelector } from "react-redux";

function Topbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const user = useSelector(selectUser);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">WDKSocial</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            type="text"
            placeholder="Search for anything"
            className="searchInput"
            autoFocus={true}
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Link to={"/messenger"}>
              <Chat />
              <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">3</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "/noAvatar.webp"
            }
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}

export default Topbar;
