const jwt = require("jsonwebtoken");

const value = {
  name: "yaswanth",
  accountNumber: 1231232123,
};

// I am acting as a random person here.
// I do not know the bank's (backend's) real secret key.
// I am guessing that the secret key is "rashmika" and creating my own token using it.
const token = jwt.sign(value, "rashmika"); // Here i am the random person idk what is the bank
// secret i am gussing bank secret is rashmika

console.log(token);

// Example generated token:
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoieWFzd2FudGgiLCJhY2NvdW50TnVtYmVyIjoxMjMx
// MjMyMTIzLCJpYXQiOjE3MTk1ODg3OTF9.zZI-2khreJiF3q1arDXZQ3DFTC1OxXx7M7UsqIAx0pM
//
// Important points:
// - The above token contains the same payload data (`name` and `accountNumber`)
//   as the token generated in 01-index.js.
// - If I paste this token into jwt.io, I will see exactly the same payload values
//   as in 01-index.js, because the payload is publicly visible after decoding.
// - However, this token is **not valid** according to the bank (backend),
//   because it was not signed with the bank's real secret key.
// - If I try to verify this token in 01-index.js (which uses the real secret key),
//   I will get an "invalid signature" error.
// - This shows that having the payload data is not enough to generate a valid JWT —
//   the correct secret key is essential for successful verification.
