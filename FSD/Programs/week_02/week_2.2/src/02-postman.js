// 🧠 GOAL: Create a simple server that receives data using both headers and JSON body from Postman

// 🔧 STEP 1: Import the required packages

// Importing the 'express' module to help us create a web server easily
// This module needs to be installed using: npm install express
import express from "express";

// Importing 'body-parser' middleware, which helps us parse incoming request bodies (especially JSON)
// To install: npm install body-parser
const bodyParser = require("body-parser");

// Creating an instance of the Express app
const app = express();

// Defining the port number where the server will run
const port = 3000;

// 🧩 Middleware Configuration

// Using body-parser to parse JSON data in incoming requests
// This is necessary when the client (like Postman) sends data in the request body (e.g., { "key": "value" })
app.use(bodyParser.json());

// 📍 Route: GET request to the root path (http://localhost:3000/)
app.get("/", (_req, res) => {
  // Respond with a simple message when this route is hit
  res.send("Hello World!");
});

// 📍 Route: POST request to /conversations
app.post("/conversations", function (req, res) {
  // 🧾 Reading custom headers from the request
  // When you send a request from Postman, go to the "Headers" tab and add:
  // Key: username, Value: your-username
  // Key: password, Value: your-password

  // Headers do not require body-parser; Express can read them directly
  console.log("Username from headers:", req.headers["username"]);
  console.log("Password from headers:", req.headers["password"]);

  // 📦 Reading the body from the request (sent as raw JSON in Postman)
  // This requires body-parser to be used in your app (we did it above using app.use(bodyParser.json()))
  console.log("Request Body:", req.body);

  // Sending a sample JSON response back to the client
  res.send({
    message: "Yaswanth is a good boy",
    sumval: "The value of 2 + 2 is 4",
  });
});

// 🚀 Starting the server to listen on the defined port (3000)
app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

/**
 * 🧪 How to Test Using Postman
 * 1. Open Postman.
 * 2. Select POST as the request type.
 * 3. Enter the URL: http://localhost:3000/conversations.
 * 4. Go to the Headers tab and add the following key-value pairs:
 *    Key: username, Value: yaswanth
 *    Key: password, Value: 123456
 * 5. Go to the Body tab and select the option 'raw' and select 'JSON' from the dropdown on the right.
 * 6. Enter the following JSON data:
 *    {
 *      "message": "Hello"
 *    }
 * 7. Click 'Send' to send the POST request.
 * 8. You will see the following response from the server:
 *    {
 *      "message": "Yaswanth is a good boy",
 *      "sumval": "The value of 2 + 2 is 4"
 *    }
 * 9. Also, in the terminal where the server is running, it will log:
 *    Username from headers: yaswanth
 *    Password from headers: 123456
 *    Request Body: { "message": "Hello" }
 */

