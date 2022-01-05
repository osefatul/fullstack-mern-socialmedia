import axios from "axios";
import React, { useEffect, useState } from "react";
import "./chatOnline.css";
import { Ring } from "react-awesome-spinners";
function ChatOnline({ onlineUsers, currentUser, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    //get my friends who I am following
    const getFriends = async () => {
      const res = await axios.get("/users/friends/" + currentUser);
      setFriends(res.data);
    };

    getFriends();
  }, [currentUser]);

  // useEffect(() => {
  //   //get my friends who I am following
  //   const getFriends = async () => {
  //     const res = await axios.get("/users/friends/" + currentUser);
  //     setFriends(res.data);
  //   };
  //   getFriends();
  // }, [currentUser]);

  // useEffect(() => {
  //   setOnlineFriends(
  //     friends.filter((friend) => onlineUsers.includes(friend._id))
  //   );
  // }, [friends, onlineUsers]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers?.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/conversations/find/${currentUser}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  //console.log(friends);
  return (
    <div className="chatOnline">
      {onlineFriends ? (
        onlineFriends.map((friend) => (
          <div className="chatOnlineFriend" onClick={() => handleClick(friend)}>
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  friend.profilePicture
                    ? PF + friend.profilePicture
                    : PF + "/noAvatar.webp"
                }
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{friend?.username}</span>
          </div>
        ))
      ) : (
        <Ring />
      )}
    </div>
  );
}

export default ChatOnline;
