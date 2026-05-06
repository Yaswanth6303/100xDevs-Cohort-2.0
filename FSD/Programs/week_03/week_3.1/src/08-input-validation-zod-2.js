// Importing the Express framework to create the server
const express = require("express");

// Importing Zod, a validation library for parsing and validating inputs
const zod = require("zod"); // This will parse the input from the end user

// Creating an instance of the Express application
const app = express();

/*
    Defining the schema using Zod with union()
    ------------------------------------------
    - We are accepting two kinds of valid inputs:
      1. An array with exactly 1 number
      2. An array with exactly 2 numbers

    - Using `zod.union()` to allow either schema:
        - zod.array(zod.number()).length(1) → e.g., [1]
        - zod.array(zod.number()).length(2) → e.g., [1, 2]

    - Any other type of input, like an empty array, array with 3+ numbers, or non-array,
      will be rejected by this schema.
*/
const schema = zod.union([
  zod.array(zod.number()).length(1), // Array with a single number
  zod.array(zod.number()).length(2), // Array with two numbers
]);

// Middleware to parse incoming JSON request bodies
app.use(express.json());

// POST route for health-checkup
app.post("/health-checkup", (req, res) => {
  const kidneys = req.body.kidneys; // Extracting the 'kidneys' array from request body

  /*
      Validating the input using the Zod schema
      -----------------------------------------
      - schema.safeParse(kidneys) will validate that the input matches either:
          → an array of exactly 1 number, or
          → an array of exactly 2 numbers
      - Returns: 
          → { success: true, data: ... } on success
          → { success: false, error: ... } on failure
  */
  const response = schema.safeParse(kidneys);

  // If input is invalid, respond with a 411 status and error message
  if (!response.success) {
    return res.status(411).json({
      error: "Invalid input", // You can also include `response.error` for more details if needed
    });
  }

  const kidneysLength = kidneys.length; // Number of kidneys in the array

  // Sending response if validation passed
  res.json({
    response, // Shows parsed data and validation result
    msg: "You have " + kidneysLength + " kidneys.",
  });
});

/*
    Global Error Handling Middleware
    --------------------------------
    - This middleware catches any unexpected errors thrown during request processing.
    - It ensures the client does not receive internal error details.
    - Always place this after all route definitions.
*/
app.use(function (err, req, res, next) {
  res.status(500).send("Something is wrong with server");

  /* Alternatively, respond in JSON:
  res.json({
      msg: "Something is wrong with server"
  });
  */
});

// Start the server on port 3000
app.listen(3000);

/*
    Testing Instructions:
    ---------------------
    - Method: POST
    - URL: http://localhost:3000/health-checkup
    - Body → raw → JSON

    ✅ Valid Examples:
    {
        "kidneys": [1]
    }

    {
        "kidneys": [1, 2]
    }

    ❌ Invalid Examples:
    {
        "kidneys": []
    }

    {
        "kidneys": [1, 2, 3]
    }

    {
        "kidneys": "hello"
    }

    ➤ This demonstrates how Zod `union` is used to accept multiple specific patterns in input.
    ➤ Refer to Zod documentation for more advanced validations like `refine`, `transform`, etc.
*/
