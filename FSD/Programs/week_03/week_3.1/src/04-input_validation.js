// Import the Express module
const express = require("express");
const app = express();

// ---------------------------------------------
// Middleware: Body Parser for JSON
// ---------------------------------------------
// This middleware enables Express to parse incoming JSON data in POST requests.
// Without this, `req.body` will be undefined.
app.use(express.json());

// ---------------------------------------------
// Route: POST /health-checkup
// ---------------------------------------------
// This route accepts a JSON body containing a `kidneys` array.
// It calculates and returns the number of kidneys provided.
app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys; // Expecting an array like [1, 2]

  // If `kidneys` is undefined or not an array, return a 400 error
  if (!Array.isArray(kidneys)) {
    return res.status(400).json({
      message: "Invalid input: 'kidneys' must be an array",
    });
  }

  const kidneysLength = kidneys.length;

  // Send back the number of kidneys
  res.send("You have " + kidneysLength + " kidneys.");
});

// ---------------------------------------------
// Start the server on port 3000
// ---------------------------------------------
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/*
--------------------------------------------------------
Instructions to Test This Using Postman (POST Request)
--------------------------------------------------------

1. Method: POST
2. URL: http://localhost:3000/health-checkup
3. In Postman:
   - Go to the "Body" tab
   - Select "raw" and choose "JSON" from the dropdown
   - Enter the following JSON:
     {
         "kidneys": [1, 2]
     }

4. Expected Output:
   - Response: "You have 2 kidneys."

5. If you leave the body empty or send invalid data:
   - You’ll get a 400 response with message: "Invalid input: 'kidneys' must be an array"

--------------------------------------------------------
Why express.json() is Important:
--------------------------------------------------------

- Without `app.use(express.json())`, Express cannot read the request body in JSON format.
- You must include this line to ensure `req.body` contains the data sent by the client.

--------------------------------------------------------
Improving User Experience:
--------------------------------------------------------

- If the request body is missing or malformed, the server will now respond with a proper error.
- This ensures that users (clients) receive helpful messages instead of server crashes or unclear errors.

- For more advanced error handling (like catching unhandled exceptions), 
  you can use a **global error handling middleware**, which is typically covered in a file like `Input_Validation_1`.
*/
