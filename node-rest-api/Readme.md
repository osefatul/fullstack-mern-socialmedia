# Full Stack Mern Social Media Application

- Create npm init package
- npm install express mongoose dotenv helmet morgan nodemon
- app.use(express.json()); // To recognize the incoming Request Object as a JSON Object.
- Helmet library: Express is designed for creating web applications — not securing your Node.js server from vulnerabilities. The defaults leave the HTTP headers mostly open, in part, to assist with the rapid application development. This is where Helmet.js steps in. for further details (https://www.securecoding.com/blog/using-helmetjs/)
- Morgan: is another HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application. You might think of Morgan as a helper that collects logs from your server, such as your request logs. It saves developers time because they don’t have to manually create common logs. It standardizes and automatically creates request logs. Morgan can operate standalone, but commonly it’s used in combination with Winston. Winston is able to transport logs to an external location, or query them when analyzing a problem.


- auth.js: in order to encrypt password so not to be exposed to anyone. we are gonna use another libray named "bcrypt".
	* A key step in password securtiy is salting and hashing: hashing can decipher any password with the same lenght. so in order not to store this passwod in any database we are using salting with hashing. it is an additional step for password security to avoid storing password in a database.

- users.js: req.body.userId === req.params.id => this means they are same users. we will use this logic for delete, get and update requests.
	* For Following request -  We are gonna use req.body.userId !== req.params.id, because we want to follow someone esle not ourselves. 