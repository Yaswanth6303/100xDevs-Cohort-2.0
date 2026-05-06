// Importing Zod, a library used for schema-based validation
const zod = require('zod');

/*
    Function: validateInput
    -----------------------
    This function checks whether the given input is:
    - An array
    - Contains only numbers
    - Has at least one element

    Traditionally, we would have to write multiple manual checks for each of these,
    such as verifying the type, checking length, looping through elements, etc.

    Using Zod, we can perform all these validations in just one line of code.
*/
function validateInput(array) {
  // Traditional (Manual) Validation Approach:
  /*
    if (typeof array === "object" && Array.isArray(array) && array.length >= 1 && typeof array[0] === "number") {
        console.log("Valid input");
    } else {
        console.log("Invalid input");
    }
    */

  // Zod-based Validation (Simple and Declarative)
  /*
        - zod.array(zod.number()) → Validates that each item in the array is a number
        - .min(1) → Ensures that there is at least one element in the array
        - schema.safeParse(array) → Returns an object:
            - { success: true, data: [...] } if valid
            - { success: false, error: ... } if invalid
    */
  const schema = zod.array(zod.number()).min(1); // Array of at least one number
  const response = schema.safeParse(array); // Performs the validation

  // Log the result of validation
  console.log(response);
}

// Calling the function with an array that includes a string to trigger validation error
validateInput([1, 2, 3, 'bysgs']);

/*
🔍 Sample Output (in your console):
{
  success: false,
  error: ZodError: [
    {
      "code": "invalid_type",
      "expected": "number",
      "received": "string",
      "path": [3],
      "message": "Expected number, received string"
    }
  ]
}

Summary:
- This Zod approach simplifies validation.
- No need to manually check type, length, or loop through values.
- Zod gives structured error messages that are easy to read and debug.
*/

