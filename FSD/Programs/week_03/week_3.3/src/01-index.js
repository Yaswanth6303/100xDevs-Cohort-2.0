// JWT
/* 
When working with JWTs (JSON Web Tokens), there are three key concepts to understand:

1. Generating a JWT  
   - The backend generates a JWT (a long encoded string) after successful authentication.  
   - This token is then issued to the user.  

2. Decoding a JWT  
   - Anyone who has the token can decode it and view its payload (the data inside it).  
   - However, they cannot generate a valid JWT without knowing the secret key used by the backend.  

3. Verifying a JWT  
   - Even though the token can be decoded by anyone, only the backend (which has the secret key) can verify whether the token is original.  
   - If the token is valid, the backend will grant access to the user. Otherwise, access is denied.  
*/

const jwt = require("jsonwebtoken");

const value = {
  name: "yaswanth",
  accountNumber: 1231232123,
};

// Generating a JWT
const token = jwt.sign(value, "secret");
// Example using a bank analogy:
// The bank is the only entity that can issue an official chequebook and knows the secret method of creating it.
// If a random person tries to copy your chequebook, the bank can detect that it is fake because the secret
// information will not match the bank's records.

// console.log(token); // This represents my chequebook (JWT).
// Example generated token:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWFzd2FudGgiLCJhY2NvdW50TnVtYmVyIjoxMjMx
// MjMyMTIzLCJpYXQiOjE3MTk1ODc2MjF9.OGal7uNaOYPVMsdsEXezaB290pTwVfXQP6tQ8aCAlkU
//
// Key points about this:
// - The JWT can be viewed and decoded by anyone using tools such as jwt.io.
// - If someone obtains my JWT, they can see all the information in the payload, such as my account details.
// - They might try to recreate the token using the same payload data.
// - However, without knowing the correct secret key, the newly generated token will fail verification.
// - This is because most likely, their secret key will not match the bank’s (backend’s) secret key,
//   so the bank will reject it and not grant access.

// Simulating a token created by a random person in another file (02-index.js) using the payload data from jwt.io
// In this scenario, I am acting as a random person.

const verifytoken = jwt.verify(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWFzd2FudGgiLCJhY2NvdW50TnVtYmVyIjoxMjMxMjMyMTIzLCJpYXQiOjE3NTQ4NDk4NzB9.TF7Ovxfl7lPqnjQayEyom9j-eojxj0iaVLgJuPopJz4",
  "secret"
);

// Note:
// - While running this, keep the 'const token' line commented out to avoid confusion.
// - When verifying this JWT, you will see an "invalid signature" error because the token was not signed
//   with the correct secret key used by the backend.
