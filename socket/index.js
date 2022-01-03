const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

//In order to store user socket id, as socket id changed whenever we refresh a page.
let users = [];

const addUser = (userId, socketId) => {
  // If the same user is inside the array we are not going to add a user
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};
io.on("connection", (socket) => {
  console.log("a user is connected");
  // io.emit("welcom", "hello this is Socket server");
  //take user id and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });
});
