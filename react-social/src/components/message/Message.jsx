import React from "react";
import "./message.css";
import { format } from "timeago.js";

function Message({ own, message }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img196.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message?.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}

export default Message;
