// Import the Express module
const express = require("express");
const app = express();

// ----------------------------
// Middleware: User Validator
// ----------------------------
// This middleware checks whether the provided username and password are correct.
// If not, it blocks the request with a 403 Forbidden response.
function userMiddleware(req, res, next) {
    const username = req.query.username;
    const password = req.query.password;

    if (username !== "yaswanth" || password !== "pass") {
        res.status(403).json({
            message: "Wrong Input"
        });
    } else {
        next(); // If valid, move to the next middleware or route handler
    }
}

// ----------------------------
// Middleware: Kidney Validator
// ----------------------------
// This middleware checks whether the kidneyId is either 1 or 2.
// If not, it blocks the request with a 403 Forbidden response.
function kidneyMiddleware(req, res, next) {
    const kidneyId = parseInt(req.query.kidneyId, 10); // Convert string to number

    if (kidneyId !== 1 && kidneyId !== 2) {
        res.status(403).json({
            message: "Wrong Input"
        });
    } else {
        next(); // If valid, proceed further
    }
}

// ---------------------------------------
// Global Counters for Request Analytics
// ---------------------------------------
let numberOfRequests = 0;      // Counts total number of requests
let totalRequestTime = 0;      // Accumulates total processing time of all requests

// ---------------------------------------
// Middleware: Request Counter
// ---------------------------------------
// This middleware increments the request count for every request.
// It’s applied globally using app.use().
function calculateRequests(req, res, next) {
    numberOfRequests++;
    console.log(`Request Count: ${numberOfRequests}`);
    next(); // Required to move to the next middleware/handler
}

// -------------------------------------------------
// Middleware: Request Timer (Average Time Calculator)
// -------------------------------------------------
// This middleware measures how long each request takes.
// After the response is sent, it updates and logs the average request time.
function requestTimeLogger(req, res, next) {
    const startTime = Date.now(); // Record start time

    // 'finish' event is emitted when the response is fully sent
    res.on('finish', () => { // Waits for the response to be finished
        const endTime = Date.now();
        const duration = endTime - startTime; // Time taken for this request

        totalRequestTime += duration;

        console.log(`Request duration: ${duration} ms`);
        console.log(`Average request duration: ${totalRequestTime / numberOfRequests} ms`);
    });

    next(); // Continue to next middleware/handler
}

// ----------------------------
// Apply Global Middlewares
// ----------------------------
// These will run for every incoming request
app.use(calculateRequests);
app.use(requestTimeLogger);

// ----------------------------
// Route: /health-checkup
// ----------------------------
// Requires valid username, password, and kidneyId via query parameters

middleware = [userMiddleware, kidneyMiddleware];
app.get("/health-checkup", middleware, (req, res) => {
    res.json({
        message: "Your kidney is healthy"
    });
});

// ----------------------------
// Start the Express Server
// ----------------------------
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

/*
--------------------------------------------------------
How to Test This Using Browser or Postman (GET Request)
--------------------------------------------------------

1. Request URL:
   http://localhost:3000/health-checkup?username=yaswanth&password=pass&kidneyId=2

2. Parameters (Query):
   - username: yaswanth
   - password: pass
   - kidneyId: 1 or 2

3. Expected Outputs:
   - If all inputs are correct: You get a JSON response → { message: "Your kidney is healthy" }
   - If credentials or kidneyId are invalid: You get 403 Forbidden with "Wrong Input"

4. Console Output:
   - Total number of requests made so far
   - Duration of each request in milliseconds
   - Average request duration (updated after every request)
*/
