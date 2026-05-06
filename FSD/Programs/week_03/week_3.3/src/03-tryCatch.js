// If we know that a piece of code might throw an error, we can use try...catch to handle it.
// Example: When verifying a JWT token, if it is valid, we will get the output.
// If the token is invalid, an error will occur. We can handle such errors using try...catch.

try {
  let a;
  console.log(a.length);
  // This line will cause an error because 'a' is undefined,
  // so accessing 'a.length' is not possible.
  // If an error occurs here, the code below inside the try block will NOT execute.

  console.log("Hello");
} catch (e) {
  // If an error is thrown in the try block, execution jumps here.
  console.log("Error inside try block");
}

console.log("Hi there");
// This will still run because the error was caught and handled.
