import React from "react";
import "./chatOnline.css";

function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img196.jpg"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Khabib Nur</span>
      </div>
    </div>
  );
}

export default ChatOnline;
