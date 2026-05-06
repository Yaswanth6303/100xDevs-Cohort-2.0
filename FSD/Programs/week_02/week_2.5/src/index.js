// Creating an HTTP server using Express

// First, bring 'express' and 'body-parser' into your project.
// These modules are **not built into Node.js* * by default,
// so you must install them manually using npm:
// npm install express body-parser

import express from 'express';
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

// Use the body-parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

/*
Define a helper function to calculate the sum of first 'n' natural numbers
Example: If n = 5, it will return 1 + 2 + 3 + 4 + 5 = 15
*/
function sum(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans = ans + i;
  }
  return ans;
}

/*
DOCTOR ANALOGY:

Imagine this Express app is like a doctor's clinic.

When you run this file using: `node index.js`
   - It starts the server
   - A message will appear like: "Server listening on port 3000"
   - This means: The clinic is now open, and the doctor is ready to receive patients

   When someone (a user/patient) visits: http://localhost:3000
   - That’s like a patient entering the clinic and saying “Hi”

   If the user visits: http://localhost:3000/?n=30
   - They are sending an **X-ray or report** to the doctor (a number n = 30)
   - This is called a **query parameter** in the URL
   - `?n=30` is how you send input in a GET request

   If there are multiple values:
   Example: http://localhost:3000/?n=30&a=40
   - This sends two values: `n = 30` and `a = 40`
   - Use `&` to separate multiple query parameters
*/

// Handle GET requests to the root path '/'
app.get('/', function (req, res) {
  // To read the value of 'n' from the query string: ?n=30
  const n = req.query.n;

  // Print the value of 'n' in the terminal for debugging
  console.log('User input:', n);

  // Call the sum function using the user's input
  const ans = sum(Number(n)); // Cast to number to avoid string issues

  // Send back the calculated sum in the response
  res.send(`Hi, Your answer is ${ans}`);
});

// Start the server and listen on port 3000
app.listen(3000, function () {
  console.log('Server (doctor) is listening at port 3000 — Clinic is open!');
});
