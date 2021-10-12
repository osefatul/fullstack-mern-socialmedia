# Full Stack Mern Social Media Application

- Create npm init package
- npm install express mongoose dotenv helmet morgan nodemon
- app.use(express.json()); // To recognize the incoming Request Object as a JSON Object.
- Helmet library: Express is designed for creating web applications — not securing your Node.js server from vulnerabilities. The defaults leave the HTTP headers mostly open, in part, to assist with the rapid application development. This is where Helmet.js steps in. for further details (https://www.securecoding.com/blog/using-helmetjs/)
- Morgan: is another HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application. You might think of Morgan as a helper that collects logs from your server, such as your request logs. It saves developers time because they don’t have to manually create common logs. It standardizes and automatically creates request logs. Morgan can operate standalone, but commonly it’s used in combination with Winston. Winston is able to transport logs to an external location, or query them when analyzing a problem.
- 