// Importing Zod for input validation
const z = require('zod');

/*
    Defining a strong password schema using Zod:
    --------------------------------------------
    The password must:
    Be at least 18 characters long
    Contain at least one uppercase letter [A-Z]
    Contain at least one lowercase letter [a-z]
    Contain at least one digit [0-9]
    Contain at least one special character (e.g., !, @, #, etc.)
    Contain at least one underscore (_)

    If any rule is violated, a custom error message will be returned.
*/
const passwordSchema = z
  .string()
  .min(18, { message: 'Password must be at least 18 characters long' })
  .regex(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  .regex(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  .regex(/[0-9]/, { message: 'Password must contain at least one number' })
  .regex(/[!@#$%^&*()\-_+=\[\]{};:'",.<>?\/\\|]/, {
    message: 'Password must contain at least one special character',
  })
  .regex(/_/, { message: 'Password must contain at least one underscore' }); // underscore rule explicitly added

// Testing the schema with a sample password
const result = passwordSchema.safeParse('ExamplePassword123!_'); // try changing this to test failures

// Checking result and printing output
if (result.success) {
  console.log('Password is valid');
} else {
  console.error('Password validation failed:');
  console.error(result.error.errors); // Prints all the failed validation messages
}
