import React from "react";
import "./message.css";

function Message({ own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src="https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2014/11/img196.jpg"
          alt=""
          className="messageImg"
        />
        <p className="messageText">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque sunt
          inventore, voluptate recusandae harum tempore id odit? Facilis
          repudiandae necessitatibus dignissimos perferendis recusandae
          voluptatum, dolores porro. Laboriosam error sapiente ipsam.
        </p>
      </div>
      <div className="messageBottom"> 1 hour ago</div>
    </div>
  );
}

export default Message;
