// Importing the Express module and creating an instance of the application
const express = require("express"); 
const app = express();

// Importing Zod for input validation
// Zod helps in parsing and validating the data received from the end user
const zod = require("zod");

// Defining a schema using Zod
// This schema expects an array of numbers from the user
const schema = zod.array(zod.number()); 
// For reference on schema creation and validation syntax, refer to Password_18.js or Zod documentation

// Middleware to parse JSON bodies from incoming POST requests
app.use(express.json())

// POST route to handle health checkup data
app.post("/health-checkup", (req, res) => {
    const kidneys = req.body.kidneys; // Extracting the 'kidneys' array from the request body

    /*
        Validating the input using Zod:
        --------------------------------
        - We use `schema.safeParse(kidneys)` to validate the input against the defined schema.
        - This checks whether the input is an array and whether all elements are numbers.
        - If the input is missing or invalid, it returns a `success: false` along with detailed error info.
    */
    const response = schema.safeParse(kidneys);

    const kidneysLength = kidneys?.length; // Use optional chaining to avoid crashing if kidneys is undefined

    // Sending response to the client
    res.json({
        response, // Contains validation result (success/error details)
        msg: "Total number of kidneys in your body: " + kidneysLength
    });
})

/*
    Global error-handling middleware:
    ---------------------------------
    - This middleware catches any unhandled errors from the routes above.
    - It ensures that the client does not see internal error details.
    - We return a simple, generic message instead of exposing internal server errors.
*/
app.use(function (err, req, res, next) { 
    // Sending a general 500 error message to the client
    res.status(500).send('Something is wrong with server');

    /* Alternatively, you can send JSON:
    res.json({
        msg: "Something is wrong with server"
    });
    */
})

// Starting the server on port 3000
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

/*
    Testing Instructions:
    ---------------------
    - Open Postman and set the request method to POST.
    - URL: http://localhost:3000/health-checkup
    - In the Body tab, set the type to `raw` and choose `JSON`.
    - Keep the body empty or give invalid input to test the validation.

    Expected Output if body is empty:
    ----------------------------------
    {
        "response": {
            "success": false, // Indicates validation failure
            "error": {
                "issues": [
                    {
                        "code": "invalid_type",
                        "expected": "array",
                        "received": "undefined",
                        "path": [],
                        "message": "Required"
                    }
                ],
                "name": "ZodError"
            }
        },
        "msg": "Total number of kidneys in your body: undefined"
    }

    - The above response clearly shows the user what went wrong.
    - This kind of validation is user-friendly and safe to expose.

    ➤ For better formatting and examples of Zod validation responses, refer to Input_Validation_zod_1.js
*/
