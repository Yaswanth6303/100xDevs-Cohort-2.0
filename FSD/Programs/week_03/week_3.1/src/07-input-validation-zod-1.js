// Importing the Express module to create the web server
const express = require("express");

// Importing Zod, a validation library for parsing and validating user inputs
const zod = require("zod"); // This will parse the input from the end user

// Creating an Express application instance
const app = express();

/*
    Defining the schema using Zod
    -----------------------------
    This schema expects an array of numbers as input.
    We're using `zod.array(zod.number())` to ensure that the incoming data is:
    - An array
    - Each element of the array is a number
*/
const schema = zod.array(zod.number());

/*
    How to define structure for more complex input using Zod?
    ----------------------------------------------------------
    If we expect an input like this from the client:

    {
        email: "It should be a string containing an '@' and ending with '.com' or '.in'",
        password: "It should be at least 8 characters long",
        country: "It should be either 'IN' or 'US'"
    }

    We can define a Zod schema like this:

    const schema = zod.object({
        email: zod.string().email(), // Must be a valid email format
        password: zod.string().min(8), // Minimum 8 characters
        country: zod.literal("IN").or(zod.literal("US")) // Either "IN" or "US"
    });

    This Zod schema ensures:
    - 'email' is a valid email string
    - 'password' is a string of at least 8 characters
    - 'country' must be exactly "IN" or "US"
*/

// Middleware to parse JSON bodies in incoming requests
app.use(express.json());

// POST route to handle health-checkup data
app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys; // User is expected to send an array of kidneys

  /*
        Validate the input using Zod
        ----------------------------
        - We check whether `kidneys` is an array of numbers using `schema.safeParse()`
        - `safeParse()` returns an object with either:
            - success: true, along with parsed data, OR
            - success: false, along with error details
    */
  const response = schema.safeParse(kidneys);

  // If validation fails, return a 411 status with an error message
  if (!response.success) {
    return res.status(411).json({
      error: "Invalid input",
    });
  }

  const kidneysLength = kidneys.length; // Get the number of kidneys in the array

  // If validation is successful, send a response with the result and message
  res.json({
    response, // Includes the validated data
    msg: "You have " + kidneysLength + " kidneys.",
  });
});

/*
    Global Error Handling Middleware
    --------------------------------
    - This catches any unexpected errors thrown in the routes above.
    - It ensures that sensitive error information is not shown to clients.
    - Always define this at the end, after all routes.
*/
app.use(function (err, req, res, next) {
  // Return a generic error message with 500 status
  res.status(500).send("Something is wrong with server");

  /* Alternatively:
    res.json({
        msg: "Something is wrong with server"
    });
    */
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

/*
    Testing Instructions:
    ---------------------
    - Open Postman
    - Method: POST
    - URL: http://localhost:3000/health-checkup
    - Go to "Body" → Select "raw" → Choose "JSON" format

    Example 1: Valid input
    {
        "kidneys": [1, 2]
    }

    Output:
    {
        "response": {
            "success": true,
            "data": [1, 2]
        },
        "msg": "You have 2 kidneys."
    }

    Example 2: Invalid input (e.g., empty body or string instead of array)
    {}

    Output:
    {
        "error": "Invalid input"
    }
*/
