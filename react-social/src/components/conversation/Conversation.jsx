import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import "./conversation.css";
import { Ring } from "react-awesome-spinners";

function Conversation({ conversation, currentUser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState(null);

  useEffect(() => {
    //find the other member/s of the conversation you have with.
    const friendId = conversation.members.find(
      (member) => member !== currentUser._id
    );

    const getUser = async () => {
      try {
        //get the user data as we have friendId now.
        const res = await axios("/users?userId=" + friendId);
        // console.log(res.data);
        setUser(res.data); // set it as user
      } catch (err) {
        console.log(err);
      }
    };

    getUser();
  }, [currentUser, conversation]);

  return (
    <>
      {user ? (
        <div className="conversation">
          <img
            src={
              user.prfilePicture ? user.profilePicture : PF + "/noAvatar.webp"
            }
            alt=""
            className="conversationImage"
          />
          <span className="conversationName">{user.username}</span>
        </div>
      ) : (
        <Ring />
      )}
    </>
  );
}

export default Conversation;
