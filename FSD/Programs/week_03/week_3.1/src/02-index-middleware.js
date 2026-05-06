// Import the Express module
import express from 'express';
const app = express();

// -------------------------
// Middleware: User Validator
// -------------------------
// This middleware checks if the provided username and password are correct
function userMiddleware(req, res, next) {
  const username = req.query.username;
  const password = req.query.password;

  // If username or password is incorrect, respond with 403 Forbidden
  if (username != 'yaswanth' || password != 'pass') {
    res.status(403).json({
      message: 'Wrong Input',
    });
  } else {
    // If everything is fine, continue to the next middleware/handler
    next();
  }
}

// ---------------------------
// Middleware: Kidney Validator
// ---------------------------
// This middleware checks if the kidneyId is either 1 or 2
function kidneyMiddleware(req, res, next) {
  const kidneyId = req.query.kidneyId;

  // If kidneyId is invalid, respond with 403 Forbidden
  if (kidneyId != 1 && kidneyId != 2) {
    res.status(403).json({
      message: 'Wrong Input',
    });
  } else {
    // If valid, proceed to next
    next();
  }
}

// ---------------------------------------
// Middleware: Request Counter (Global)
// ---------------------------------------
// This middleware counts how many requests have been made in total
let numberOfRequests = 0;
function calculateRequests(_req, _res, next) {
  numberOfRequests++;
  console.log('Number of requests so far:', numberOfRequests);

  // Must call next() or the request will hang
  next();
}

// Apply the request counter globally using app.use()
// This means calculateRequests will run for *every* route defined below this line
app.use(calculateRequests);

// ------------------------------------
// Route 1: GET /health-checkup
// ------------------------------------
// This route checks if the user's kidney is healthy
// Requires: username, password, and kidneyId as query parameters
app.get('/health-checkup', userMiddleware, kidneyMiddleware, (_req, res) => {
  res.json({
    message: 'Your kidney is healthy',
  });
});

// ------------------------------------
// Route 2: GET /kidney-replacement
// ------------------------------------
// This new route simulates a kidney replacement procedure
// It reuses the same validation middlewares as the /health-checkup route
// Requires: username, password, and kidneyId as query parameters
app.get('/kidney-replacement', userMiddleware, kidneyMiddleware, (_req, res) => {
  res.json({
    message: 'Your kidney has been replaced successfully!',
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});

/*
------------------------------------------
Instructions to Test in Postman or Browser
------------------------------------------

1. Method: GET

2. URL for Health Checkup:
   http://localhost:3000/health-checkup?username=yaswanth&password=pass&kidneyId=1

3. URL for Kidney Replacement:
   http://localhost:3000/kidney-replacement?username=yaswanth&password=pass&kidneyId=2

4. Try different combinations to test invalid scenarios:
   - Wrong username or password → 403 Forbidden
   - Invalid kidneyId (e.g., 3 or missing) → 403 Forbidden

5. You’ll see the number of requests logged in your terminal for each call.
*/
