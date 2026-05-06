// JavaScript (Node.js) is single-threaded and handles one request at a time using an event-driven, non-blocking
// model.
// Express.js is a minimal and flexible Node.js web application framework that provides tools to create web
// servers easily.

// ------------------------------------------------------------------------------------------------

// Create HTTP server locally using express
// In terminal enter npm init -y this will automatically give the package.json
// Write npm install express it helps to install express in your machine

// Create a todo app that lets users store todos on the server
// Try to create a http server from scratch in c
// Try to create a http server from scratch in rust/Java/Go lang
// Create an http server in rust using actix-web
// Create an http server in golang using the gorilla framework

// ------------------------------------------------------------------------------------------------

// Step 1: Import the express module.
// This allows us to use all the built-in features of Express for building our web server.
import express from "express"; // Express needs to be installed via npm

// Step 2: Create an Express application instance.
// 'app' will be used to define routes and start the server.
const app = express();

// Step 3: Define a port number for the server to listen on.
// You can run multiple servers by using different port numbers (e.g., 3000, 3001, etc.)
const port = 3000;

// Step 4: Define a GET route at the root path '/'.
// When the user accesses 'http://localhost:3000/', this handler sends a plain text response.
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Step 5: Define another GET route at '/route-handler'.
// When the user accesses 'http://localhost:3000/route-handler', this handler returns a JSON object.
app.get("/route-handler", (req, res) => {
  res.json({
    name: "Yaswanth",
    age: 21,
  });
});

// Step 6: Start the server and make it listen on the defined port.
// Once the server is running, it can handle incoming HTTP requests.
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});

// Visit WhatIsExpress PDF for more information.

