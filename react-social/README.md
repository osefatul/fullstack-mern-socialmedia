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
- just follow go through this page you will understand in the details [stackoverflow](https://stackoverflow.com/questions/63124161/attempted-import-error-switch-is-not-exported-from-react-router-dom)

### Using .env file
- We used dummy data where it was redirecting the js to the assets/peron or assets/post images.
- We will use .env file where we will save the the link for the files or images and it will be constant if we want to use it in every other javascript file.
- In the env file the name always must be started with REACT_APP otherwise it won't work.
- copy and paste the name into the js files where we want to use the path. such as in posts, online, friends.