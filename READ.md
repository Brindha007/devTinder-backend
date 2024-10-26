- Create a repository (devTinder-backend)
- Initialize the repository (npm init)
- node_modules, package.json, package-lock.json
- Install express (npm i express)
- Create a server
- Listen to port 7777
- Write request handlers for /test, /hello
- Install nodemon and updates scripts inside package

--------
- git init
- .gitignore add node_modules inside it
- Create a remote repository on github
- Push all code to remote origin
- Play with routes and route extensions, / , hello/2, /xyz
- Order of the routes most important
- Instll Postman app and create workspace/ collection > test API calls
- Wrtie logic to handle GET, POST, PATCH, DELETE API calls and test
- Explore routing and use of ?, + , (), * in the routes
- Use of regex in routes /a/ , /.*fly$/
- Reading the query params in the routes
- Reading the dynamic routes

 # Ep-05 Middlewares and Error handlers
 - Multiple Route handlers - Play with the code
 - next()
 - next function and errors along 
 - Whats Middleware? why we need it ?
 - How express handles request behind the scenes?
 - Difference app.use and app.all
 - Write a dummy auth middleware for admin
 - Write a dummy auth middleware for all user routes, except /user/login
 - Error handling using app.user("/",(err,req,res,next) => {});

 # Database connection
 - Create a free cluster on MongoDB official website (Mongo Atlas)
 - Install mongoose library 
 - Connect your application to the database "connection-url/devTinder"
 - Call the connectDB function and connect to database before starting application.
 - Create userSchema & user Model.
 - Create POST / signup API to add data to database
 - Push some documents using API calls from postman.
 - Error handling using try catch.

 # Diving into API's
 - JS object vs JSON (Difference).
 - Add the express.json middleware to your app
 - Make your signup API dynamic to receive data from the end user.
 - Make GET API call to find by emailId and fetch user details.
 - Make GET Feed API call to fetch all use details.
 - Create a API to delete user
 - Create Update user API
 - Explore Mongoose documentation

 # Schema Validaiton
 - Explore schematype options from the documentation
 - add required, unique, lowercase, min(Number), minLength(String), trim
 - Add default
 - Create a custom validate function for gender
 - Improve the DB schema - PUT all appropriate validaitons on each field in Schema.
 - Add Timestamps to userSchema
 # API Validation
 - Add API level validation on Patch request & signup post api
 - Data sanitization - Add API validation for each field

 # External library for validation
 - Install validator (npm i validator)
 - Explore validator library funciton and use validator function for password,email and photoUrl.

 # Encrypt password
 - Validate data in signup API
 - Install bcrypt package
 - Create PasswordHash using bcrypt.hash & save the user & encrypted password.