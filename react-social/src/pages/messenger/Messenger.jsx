import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import "./messenger.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import axios from "axios";
import { io } from "socket.io-client";
import { Ring } from "react-awesome-spinners";

function Messenger({ socket }) {
  const user = useSelector(selectUser); //current logged in user
  const scrollRef = useRef(); //This will scroll down the current chat window to the last mesage automatically
  // const socket = useRef();
  const [conversations, setConversations] = useState([]); //Current Users conversations, if he has

  //This the Chat window. If we have conversation it will be opened based on conversationId if not it will create new.
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]); //These are the chat messages that will be shown in the chat window.
  const [newMessage, setNewMessage] = useState(""); //new message that you want to send
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState();

  //########################### SOCKET.IO LIBRARY USAGE #########################################################################################
  useEffect(() => {
    //Establish websocket connection
    // socket.current = io("ws://localhost:8900");

    //RECEIVING MESSAGE: Reveive message from server
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  //Once arrival messages has been recieved using socket, channel "getMessage", then we have to add the message in to the messages array in the conversation.
  useEffect(() => {
    //if arrivalMessage is recieved then find the sender in the members then add the arrival message into the Messages
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  //Add those users that are get online in to the list.
  useEffect(() => {
    // socket.current = io("ws://localhost:8900");
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      //1) First way: how to filter out the current online users
      const currentOnlineUsers = users.map((user) => user.userId);
      const filteredOnlineUsers = currentOnlineUsers.filter(
        (u) => u !== user._id
      );
      // console.log("FilteredOnlineUsers", filteredOnlineUsers);
      setOnlineUsers(filteredOnlineUsers);

      //2) Second way: how to filter out the current online users.. this one doesn't work sometimes especiall in firefox
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);
  // ##################################### SOCKET.I0 -- END ####################################################################################################

  // This is for fetching conversations that the current logged in user have with other users----------------------------------------
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

  // This is for fetching messages that user has within the conversation----------------------------------------------------
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

  // This is used for scrolling the view to the last sent/received message---------------------------------------------------
  useEffect(() => {
    return scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // When you click on sending messages
  const handleMessageSubmit = async (e) => {
    e.preventDefault();

    //the format is the same as the message model and it should be so we can add this message in to the old conversation.
    const message = {
      sender: user?._id, //this the user who is sending
      text: newMessage, //the new text you are writting to send
      conversationId: currentChat._id, //the conversation will be open based on chatId
    };

    //USING SOCKET TO IDENTIFY RECEIVER AND SENDER AND THE MESSAGES TO SEND----------
    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    //Send text message to server where server will then send it over to the receiver.
    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      //message will be posted in to message database.
      const res = await axios.post("/messages", message);
      setMessages([...messages, res.data]); // we are adding it to the current Messages state data so we can show it in the chat window.
      setNewMessage(""); //once text is sent empty the input
    } catch (e) {
      console.log(e);
    }
  };
  // ----------------------------------------------------------------------------------------------------------

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
          {onlineUsers ? (
            <div className="chatOnlineWrapper">
              <ChatOnline
                onlineUsers={onlineUsers}
                currentUser={user._id}
                setCurrentChat={setCurrentChat}
              />
            </div>
          ) : (
            <Ring />
          )}
        </div>
      </div>
    </>
  );
}

export default Messenger;
