const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//In order to store online users socket id, as socket id changed whenever we refresh a page thats why we use "let variable"
let users = [];

//Add users who are online, into array.
const addUser = (userId, socketId) => {
  // If user is inside the users array turn it false by exclaimation(NOT), once this is false the statement after && wont run.
  // If user is not inside the array, return true and run the push statement as well.
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

//Remove a user whose socketId is not in the users array.
const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

//Find and Get user
const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

//server is connected or established connection
io.on("connection", (socket) => {
  //WHEN USER IS CONNECTED
  console.log("a user is connected");
  // io.emit("welcom", "hello this is Socket server");
  //take user id and socketId from CLIENT or user as he is visiting messenger page.
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //TAKE AN EVENT FROM THE SENDER CLIENT CONSISTS OF (SENDER, RECEIVER AND TEXT MESSAGE) WHEN HE CLICK ON SEND BUTTON.
  //the moment we received sendMessage from sender we immediately send receive message to receiver client
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId); //find the receiver from the users array
    //use socketId of the receiver and send this message.
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //IF USER DISCONNECT (LOGOUT FROM THE MESSNGER) then we will remove user from the users array
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
