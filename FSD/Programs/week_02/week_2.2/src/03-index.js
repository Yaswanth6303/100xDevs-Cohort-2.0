// Importing the 'express' module which helps us to easily create a web server
// This package is installed locally using `npm install express`
import express from 'express';

// Importing 'body-parser' middleware to handle incoming request bodies in a middleware
// Here we use it to parse JSON bodies sent by the client (like Postman)
// It needs to be installed using `npm install body-parser`
const bodyParser = require('body-parser');

// Creating an Express application instance
const app = express();

// Defining a port number where our server will run (you can open it on localhost:3000)
const port = 3000;

// Telling our app to use the body-parser middleware to parse incoming JSON requests
// This means when a client sends data as JSON (in POST request body), we can access it using `req.body`
app.use(bodyParser.json());

// Creating a route to handle GET requests to the root URL ('/')
// For example, if you go to http://localhost:3000/ in your browser, this route will be triggered
app.get('/', (_req, res) => {
  // Sending a simple text response to the client when this route is hit
  res.send('Hello World!');
});

// Creating a POST route at the path '/conversations'
// This means if a client sends a POST request to http://localhost:3000/conversations, this function will run
app.post('/conversations', function (req, res) {
  // Accessing the 'message' field from the JSON body sent by the client using Postman or any frontend
  // This works because we already enabled bodyParser.json()
  const message = req.body.message;

  /*
      👇 Alternative method to extract message:
      Instead of sending the message in the request body, the client can send it in the query parameters.

      Example: https://chatgpt.openai/conversations?message=123

      If the above URL is hit with a GET or POST request and we want to extract 'message', 
      we can use the following:
      const message = req.query.message;
    */

  // Printing the message to the terminal/console so we can verify what was sent
  console.log(message);

  // Sending a JSON response back to the client
  // This response can be viewed in Postman under the 'Body' tab of the response section
  res.send({
    message: 'Yaswanth is studying in the university', // Custom message to demonstrate response formatting
    sumval: 'The value of 2 + 2 is 4', // Example of dynamic or hardcoded computed output
  });
});

// Telling the app to start listening on the defined port (3000)
// When the server starts successfully, the given callback function will run and print the message
app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

/*
  🧪 HOW TO TEST THIS USING POSTMAN:
  
  1. Open Postman and select the request type as POST.
  2. Enter the URL: http://localhost:3000/conversations
  3. Go to the 'Body' tab.
  4. Choose the option 'raw' and select 'JSON' from the dropdown on the right.
  5. Enter the following JSON data:
     {
        "message": "Hello"
     }
  6. Click 'Send' to send the POST request.
  7. You will see the following response from the server:
     {
        "message": "Yaswanth is a good boy",
        "sumval": "The value of 2 + 2 is 4"
     }
  8. Also, in the terminal where the server is running, it will log:
     Hello
*/
