// Import the Express module
import express from 'express';
const app = express();

// Define a GET route for health checkup
app.get('/health-checkup', (req, res) => {
  // Extract username and password from request headers
  const username = req.headers.username;
  const password = req.headers.password;

  // Extract kidneyId from query parameters
  const kidneyId = req.query.kidneyId;

  // Validate username and password
  // If username is not "yaswanth" OR password is not "pass", return 403 Forbidden
  // (Alternative check: if (!(username === "yaswanth" && password === "pass")))
  if (username !== 'yaswanth' || password !== 'pass') {
    res.status(403).json({
      message: "User doesn't exist",
    });
    return;
  }

  // Validate kidneyId
  // If kidneyId is not "1" or "2", return 400 Bad Request
  // (Alternative check: if (kidneyId !== "1" && kidneyId !== "2"))
  if (kidneyId !== '1' && kidneyId !== '2') {
    res.status(400).json({
      message: 'Something wrong in input',
    });
    return;
  }

  // If everything is valid, return success message
  res.json({
    message: 'Your kidney is fine!',
  });
});

// Start the server and listen on port 3000
app.listen(3000);

// -----------------------------
// Testing Instructions (Postman):
// -----------------------------

// 1. Set the request type to GET
// 2. Use the following endpoint in the request URL:
//    http://localhost:3000/health-checkup?kidneyId=1
//    (you can also use kidneyId=2)
// 3. In the "Headers" tab of Postman, set the following key-value pairs:
//    - Key: username   | Value: yaswanth
//    - Key: password   | Value: pass
// 4. In the "Params" tab (query parameters), set:
//    - Key: kidneyId   | Value: 1 (or 2)
// 5. Send the request and observe the response:
//    - If credentials are correct and kidneyId is valid → Success message
//    - If credentials are incorrect → 403 error with "User doesn't exist"
//    - If kidneyId is invalid → 400 error with "Something wrong in input"
