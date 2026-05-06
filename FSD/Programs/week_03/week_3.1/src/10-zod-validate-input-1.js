// Importing Zod, a schema validation library for JavaScript/Node.js
const zod = require('zod');

/*
    Function: validateInput
    -----------------------
    This function validates whether the input object matches a specific structure:
    - It must be an object with:
        → `email`: a valid email address (string format)
        → `password`: a string with at least 8 characters

    If the input does not match this schema, Zod will return success: false.

    Zod helps us define and validate this schema easily and cleanly.
*/
function validateInput(input) {
  // Defining the schema structure using Zod
  const schema = zod.object({
    email: zod.string().email(), // Must be a valid email
    password: zod.string().min(8), // Must be at least 8 characters long
  });

  // Validating the input against the schema using safeParse
  const response = schema.safeParse(input);
  console.log(response); // Logs whether input is valid and any errors if not
}

// Example 1: Invalid input - an array of numbers (does not match schema)
/*
validateInput([1, 2, 3]); // Output: success: false
Because [1, 2, 3] is an array, not an object with email and password
*/

// Example 2: Valid input - matches the required schema
validateInput({
  email: 'yaslkfnjds@gmail.com',
  password: '1231231231465',
}); // Output: success: true

/*
    Summary:
    ----------
    - Zod is a library that helps define input schemas and validate them.
    - Instead of writing manual checks for each field, Zod lets you declare rules and validate in one line.
    - It improves readability, maintainability, and consistency of input validation logic.
*/
