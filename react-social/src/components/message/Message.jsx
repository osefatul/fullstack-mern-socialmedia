import React from "react";
import "./message.css";

function Message() {
  return (
    <div className="message">
      <div className="messageTop">
        <img
          src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img196.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">Hello This is a message</p>
      </div>
      <div className="messageBotto"> 1 hour ago</div>m
    </div>
  );
}

export default Message;
