const express = require("express");
const app = express();
// You have been given an express server which has a few endpoints.
// Your task is to create a global middleware (app.use) which will
// rate limit the requests from a user to only 5 request per second
// If a user sends more than 5 requests in a single second, the server
// should block them with a 404.
// User will be sending their user id in the header as 'user-id'
// You have been given a numberOfRequestsForUser object to start off with which
// clears every one second

let numberOfRequestsForUser = {};
// This is a global object that will be used to store the number of requests for each user
// It will be cleared every second
// If the request is made by a user, the number of requests for that user will be incremented
// If the number of requests for a user is greater than 5, the server will return a 404
// If the number of requests for a user is less than 5, the server will return a 200
// If the user is not in the object, the server will initialize the number of requests for that user to 0
setInterval(() => {
  numberOfRequestsForUser = {};
}, 1000);

function rateLimiter(req, res, next) {
  // In the real world, it has been done using ip address of the user instead of user id
  const userId = req.header("user-id");

  if (!userId) {
    return res.status(400).json({ msg: "User ID is required" });
  }

  if (!numberOfRequestsForUser[userId]) {
    // Means if the array is empty initialize with 0
    numberOfRequestsForUser[userId] = 0; // Initializing with 0
  }

  numberOfRequestsForUser[userId]++;

  if (numberOfRequestsForUser[userId] > 5) {
    return res.status(404).json({ msg: "Rate limit exceeded" });
  }

  next();
}

app.use(rateLimiter);

app.get("/user", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ msg: "created dummy user" });
});

module.exports = app;
