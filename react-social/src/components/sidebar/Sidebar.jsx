import {
  Bookmark,
  Chat,
  Event,
  Group,
  HelpOutline,
  PlayCircleOutline,
  RssFeed,
  School,
  WorkOutline,
} from "@material-ui/icons";
import React from "react";
import "./Sidebar.css";
import thor from "../../assets/person/Thor.jpg";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmark</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Event</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
          <li className="sidebarFriend">
            <img src={thor} alt="" className="sidebarFriendImg" />
            <span className="sidebarFriendName">Thor</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
