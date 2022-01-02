import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import "./messenger.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
function Messenger() {
  const user = useSelector(selectUser); //current logged in user
  const scrollRef = useRef(); //This will scroll down the current chat window to the last mesage automatically

  const [conversations, setConversations] = useState([]); //Current Users conversations, if he has
  const [currentChat, setCurrentChat] = useState(null); //This the Chat window. If we have conversation it will be opened based on conversationId if not it will create new.
  const [messages, setMessages] = useState([]); //These are the chat messages that will be shown in the chat window.
  const [newMessage, setNewMessage] = useState(""); //new message

  //This is for fetching conversations that the current logged in user have with other users
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios.get("/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user]);

  //This is for fetching messages that user has with in the conversation
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("./messages/" + currentChat?._id); //each chat has a conversation id
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  //This is used for
  useEffect(() => {
    return scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    //the format is the same as the message model and it should be so we can add this message in to the old conversation.
    const message = {
      sender: user?._id, //this the user who is sending
      text: newMessage, //the new text you are writting to send
      conversationId: currentChat._id, //the conversation will be open based on chatId
    };

    try {
      //message will be posted in to message database.
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]); // we are adding it to the current Messages state data so we can show it in the chat window.
      setNewMessage(""); //once text is sent empty the input
    } catch (e) {
      console.log(e);
    }
  };

  // console.log(messages);
  // console.log(currentChat);

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
            {conversations.map((conversation) => (
              <div
                className="currentChat"
                onClick={() => setCurrentChat(conversation)}
              >
                <Conversation conversation={conversation} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id}
                      />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="Write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleMessageSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Click here to start a new conversation
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
            <ChatOnline />
          </div>
        </div>
      </div>
    </>
  );
}

export default Messenger;
