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
