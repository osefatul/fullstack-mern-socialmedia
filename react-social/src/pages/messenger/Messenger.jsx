import React from "react";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import "./messenger.css";
function Messenger() {
  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            <Conversation />
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">box</div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">online</div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
