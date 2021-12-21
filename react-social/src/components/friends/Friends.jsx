import React, { useEffect, useState } from "react";
import "./Friends.css";
import axios from "axios";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function Friends({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [users, setUser] = useState({});

  return (
    <li className="sidebarFriend">
      <img src={PF + user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{user.username}</span>
    </li>
  );
}

export default Friends;
