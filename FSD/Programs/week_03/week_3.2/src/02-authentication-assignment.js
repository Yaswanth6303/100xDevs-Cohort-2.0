/*The user does not need to know the JWT itself. The process works as follows:

1. **User Login**: The user enters their email and password to sign in.
2. **Sending Credentials**: These credentials are sent to the backend server.
3. **Verification**: The server verifies the credentials by hashing the password and 
comparing it with the stored hash in the database.
4. **JWT Generation**: If the credentials are correct, the server generates a JSON Web 
Token (JWT).
5. **Returning the JWT**: The server sends this JWT back to the client.
6. **Storing the JWT**: The client stores the JWT in the browser's local storage using:
   ```javascript
   localStorage.setItem("token", jwt);
   ```

The JWT (JSON Web Token) is used to verify the user's identity when they make additional
requests to the server after logging in. The user doesn't need to see or interact with the 
JWT directly because the client application (like a web browser or mobile app) manages the
JWT automatically.

Storage: The client application stores the JWT in the browser's local storage.

Automatic Handling: When the client makes subsequent requests to the server (e.g., to 
access protected resources), it includes the JWT in the request headers. This is typically
done automatically by the client application.

Authentication: The server checks the JWT in the request to verify the user's identity. 
If the JWT is valid, the server processes the request. The user doesn't need to worry about 
the JWT because the client application takes care of storing it and including it in 
requests as needed. */

const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456";

const app = express();
app.use(express.json()); // for parsing application/json

const ALL_USERS = [
  {
    username: "yaswanth@gmail.com",
    password: "123",
    name: "yaswanth gudivada",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  return ALL_USERS.some(
    (user) => user.username === username && user.password === password
  );
}

function userExists1(username, password) {
  let userExists = false;
  for (let i = 0; i < ALL_USERS.length; i++) {
    if (
      ALL_USERS[i].username === username &&
      ALL_USERS[i].password === password
    ) {
      userExists = true;
    }
  }
  return userExists;
}

function userExists2(username, password) {
  const user = ALL_USERS.find(
    (user) => user.username === username && user.password === password
  );
  return user !== undefined;
}

app.post("/signin", function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (!userExists2(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in-memory DB",
    });
  }

  const token = jwt.sign({ username: username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", function (req, res) {
  const token = req.headers.authorization;
  let username;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    // console.log(decoded);
    username = decoded.username; // If the token is valid, it extracts the username from the decoded token.
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }

  // return a list of users other than this username
  res.json({
    users: ALL_USERS.filter((user) => user.username !== username),
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

/*To test this using Postman:

1. Set the request type to POST.
2. Enter the URL: `http://localhost:3000/signin`
3. In the body, input the following JSON:
   ```json
   {
     "username": "yaswanth@gmail.com",
     "password": "123"
   }
   ```
4. If the credentials are correct, you will receive a token in the response.

To view the decoded data of the token:

1. Copy the received JWT token.
2. Go to [jwt.io](https://jwt.io/).
3. Paste the JWT token (encoded data) into the appropriate field.
4. You will see the decoded data, including the username. Note that the username is not 
encrypted but encoded.

To retrieve the list of users:

1. Set the request type to GET.
2. Enter the URL: `http://localhost:3000/users`
3. In the headers, add an authorization key and set its value to the received JWT token.
4. Send the request.

If the token is valid, you will receive all the user data present in the database.
*/
