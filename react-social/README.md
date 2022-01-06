# PART 1)

## React/Front-End of the Social_Platform

Lets implement step by step the react side of the app.

- npx create-react-app
- delete all unnecessary files - leave with public/index.html and src/index.js,app.js
- go to google fonts and add roboto font and then copy and paste the link into the public/index.js file
- created assets directory for person and posts and stored it in public directory.
- created pages and components in the src directory.
- install material-ui
- start woking on components and pages.

### Passing profile props in the Rightbar component

- We passed a props (profile) in the rightbar component and also called it in the profile page.
- Rightbar component is also called in the Home page, however, it has been passed any props.
- The reason is that in the profile page we will only show the passed props in the righbar components on the rightbar.
- On Home page the more general/common righbar component will be shown.
- Two new components have been defined- HomeRightbar and ProfileRightbar.

### Switch is removed from the react-router-dom v6:

- just follow and go through this page you will understand in the details [stackoverflow](https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom)

### Using .env file

- After Router is introduced for routing or switching around the pages we will develop another way where we can still use the files that are in the src directory in the different routes. lets move those files in to the public folder.
- We used dummy data where it was redirecting the to render the images in the src/assets/peron or assets/post directory, We are changing the path to public directory.
- We will use .env file where we will save the the path for public folder files or images and it will be constant if we want to use it in every other javascript file.
- In the env file the name always must be started with REACT_APP otherwise it won't work. REACT_APP_PUBLIC_FOLDER = http://localhost:3000/assets/
- It assigns the assets folder to the public folder.
- copy and paste the name into the js files where we want to use the path. such as in posts, online, friends etc.
- Thats how we use files in the public folder using router and env.

### Fetching Data from the MongoDB

- Add proxy in to the package.json to fecth data form the API. remember to use the port we have used it for the backend server.

      "proxy": "http://localhost:8000/api"

- "npm install axios" for fecthing data.
- Create users and posts using postman.

##### If you get an error for Proxy in package.json not affecting fetch request.

- First enable CORs
- Delete node-modules and pakage-lock.json
- For more details just visit this [stackoverflow](https://stackoverflow.com/questions/48291950/proxy-not-working-for-react-and-node)

#### Using [timeago.js](https://www.javascripting.com/view/timeago-js) Library.

- npm install timeago
- This will show us when the post was initialy created.

#### useParams

- We used useParams in the profie page where the profile will be shown based on the useParams query.

- In the App.js the path for Profile route is defined as path="/profile/:username" whcih means in the profile page the params is "username".
- So when using useParams it will render an object of username based on the user profile.

#### ReduxJs for management

- user, isfetching, errors are the initial staes we used.
- login, logout, credentialsFetched, LoginError are the reducers to be dispatched.

#### Uploading files

- It is not a good idea to use rest API for uploading file.
- But for educational purpose we have used multer library for uploading file in the index.js api side.
- multer is using a post request for uploading a file in to a a specific path.
- It needs a disk storage for uploadded files.
- We also changed the env file path. We copied all those files that were in the client/public directory were moved to the api/public/images.
- Changed the env file path from:
  REACT_APP_PUBLIC_FOLDER = http://localhost:3000/assets/
  To:
  REACT_APP_PUBLIC_FOLDER = http://localhost:8000/images

- Added path for images in to the api/index file.
- In the Share component when a file is chosen in the input by a user, Then we send that file using a formData ( provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.)

#### Adding Follow button in the profile page- Rightbar component.

- if the user which you visit their profile is not the current logged in user profile then there must be a follow button:
  {user.username !== currentUser.username && (
  <button className="rightbarFollowButton">Follow</button>
  )}

- Add isFollowing state variable for followed and unfollowed reducers.
- Add follow and unfollow reducers which are functions that deploy adding and removing followings in/from the current user followings list.
- Add fetchingReset reducer where it will reset the isFetching state back to the initial state.
- In the Rightbar component, to use realtime current user data I am fetching current user data directly from the DB (MongoDB) as the localstorage data is not updated in real time. It is not a good scenario to do that I did it for educational purpose. We should use the redux store not the DB when changing data or variable in the react.
- In the Rightbar component I have used two main functions - one is to fetch current user (the one who logged In) data and other is to fetch the friend (followings list)
- useEffect will be run based on the change of the user (whose profile we are visiting), isFollowing because we want to update the label of the Follow button and isFetchin to avoid the toggling between "follow" and "unfollow" label during the execution of the button code code.

# PART 2)

## Messenger/Chat App page

- This is the extended version of the App where we introduced how would make a realtime chat application where users/followers can talk to each other.
- First we added a messnenger page and then we went on to creat a conversation component that will be inserted into messenger in order to find and search for friends.
- Another component in the middle for chat as we called it Message component. In the Message component we passed a props "own" which will indicated if the message was sent by us it will show in the right side of the component with different background color.
- for conversation component we passed props "conversation" and "currentUser". conversation props is used for where we will make events to get all conversations that the user have had or if not they can create a new conversation.

- Four Basic states have been used.
  - conversation: when we fetch user conversation, then this state will set the users conversations. and pass them over to conversation component.
  - currentChat: Once we click on any conversation then this will state will get all the data from that conversation and will let us to open the chat Window.
  - messages: In the currentChat the conversation id is saved. This state is used to get all messages of the conversation that is already been clicked on to be shown in the open chat window and the id will be passed from the currentChat state.
  - newMessage: This is the new message we want to send over to next person in the conversation. the state will be changed based on the textArea input value.

### Conversation and Messages

- Once we are done with front end messaging page we then created two new models in the API directory along with user and post and we called them: Conversation and Message.

- In the conversation component we basically try to do find the users friend id (iterate over the ids in the conversations data base array).
- Get the users and show their profile picture and user name.
- In the message component we show the messages

##### AS THE USER IS SENDING MESSAGE IN THE CONVERSATION THE RECEIVER DOESN'T RECIEVE IT IN A REAL TIME. WE WOULD REFRESH A PAGE AND THEN WOULD SEE THE MESSAGE. TO CHECK THE MESSAGE IN A REAL TIME AND ALSO TO SEE IN THE REAL TIME IF THE FOLLOWERS ARE ONLINE, WE ARE GOING TO USE SOCKET.IO LIBRARY.

## SOCKET.IO

##### Socket Server

- Send Event To Client: io.on - OR ESTABLISHING CONNECTION WITH THE CLIENTS
  - To send to EVERY client: io.emit
  - TO send to ONE client: io.to(sockerID).emit
- Take event from A Client: socket.on

##### Socket Client

- Send Event To Server: socket.emit
- Take Event from Server: socket.on

#### Using Socket.IO In Our App

- First import socket library and initialize a port for it in order to connect it with front end (client side port).
- Then, we establish our Socket and IO connection by selecting a port number.
- So, whenever a user is connected to the APP, in our case say the messenger page, socket library will give the user a socketId using TCP/IP. socketId is changing everytime user is connecting and disconnecting.
- We basically using Socket for three main reasons:

  1- Get and Add Users (thier user id and socket id) who are online on the messenger app page, so we can show onine followers.

  2- When a client is sending message to receiver - when we click on send button the send button will send all the information (sender, receiver and text) to socket server.

  3- the moment we received sendMessage from sender we immediately send receive message to receiver client

- Online Users have been set using getUsers socket.io
- we sent our online users array over to ChatOnline component in order to render them.

# PART 3)

## REAL TIME Notifications

- As we put our notifications icons on the top bar- then we will use socket.io in the App.js thats where all the pages from.
- We moved our socked connection from client side moved from messenger to APP and passed socket to messenger from there.
- Now user is connected to the socket when they open an App not like user would be connected when users visited messenger page only.
