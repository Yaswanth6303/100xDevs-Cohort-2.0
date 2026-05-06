// Importing the Express module and creating an instance of the Express application.
const express = require("express");
const app = express();

// Middleware to parse incoming JSON requests.
// This is necessary to access the 'body' in POST requests.
// If this middleware is not used, `req.body` will be undefined.
app.use(express.json());

// Route to check the number of kidneys sent by the client.
// The client should send an array of kidneys in the request body.
app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys; // Extracting the array of kidneys from the request body.
  const kidneysLength = kidneys.length; // Calculating the number of kidneys.

  res.send("You have " + kidneysLength + " kidneys."); // Sending response back to the client.
});

/*
    Global error-handling middleware:
    ---------------------------------
    - This middleware is used to catch any unhandled errors occurring in the routes above.
    - It must be defined after all other routes to ensure it can catch any errors thrown there.
    - Express identifies this as an error-handling middleware because it has **four parameters** 
      (err, req, res, next), unlike normal middleware which has three.
    - If any exception is thrown in the route handlers above, this middleware will be triggered.
    - Clients should not see the technical error details; instead, we send a general error message or status.
    - In production, this helps keep error information secure and user-friendly.
*/
app.use(function (err, req, res, next) {
  // Sending a general error message to the client with status code 500 (Internal Server Error).
  res.status(500).send("Something is wrong with server");

  /* Alternatively, we can send a JSON response:
    res.json({
        msg: "Something is wrong with server"
    });
    */
});

// Starting the server on port 3000.
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/*
    Testing Instructions:
    ---------------------
    - Use Postman and select the POST method.
    - Send a request to http://localhost:3000/health-checkup
    - In the request body, **do not write anything**.
    - Since the route expects `req.body.kidneys` (an array), omitting it will cause an error.
    - The global error-handling middleware will catch that error.
    - The client will not see the technical error; instead, they will see the general error 
      message from the global catch block.
*/
