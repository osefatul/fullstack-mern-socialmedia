# React/Front-End of the Social_Platform

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

#### Messenger/Chat App page

- This is the extended version of the App where we introduced how would make a realtime chat application where users/followers can talk to each other.
- First we added a messnenger page and then we went on to creat a conversation component that will be inserted into messenger in order to find and search for friends.
- Another component in the middle for chat as we called it Message component. in the Message component we passed "own" which will indicated if the message was sent by us it will show in the right side of the component with different background color.

#### Conversation and Messages

- Once we are done with front end messaging page we then created two new models in the API directory along with user and post and we called them: Conversation and Message.
