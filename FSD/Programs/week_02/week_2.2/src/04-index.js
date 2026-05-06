// 🌐 GOAL: Use an environment variable to define the port number for the Express server.

// 🔧 STEP 1: Import the required Express module
// Express is a lightweight framework to build web servers in Node.js
// To use it, install via terminal: npm install express
import express from 'express'; // We are importing Express into our local project

// 🔧 STEP 2: Create an instance of the Express app
const app = express();

/*
🔐 STEP 3: Define the port number using an environment variable

Environment variables are settings that exist outside your code.
They are commonly used for:
- Ports
- API keys
- Secrets
- Database URLs

Here, we’re accessing the 'PORT' environment variable using process.env.PORT.
If it’s not set, the app will fall back to using port 3000 as a default.

This allows flexibility — for example:
- In production, the hosting provider might assign a dynamic port (like 80, 443, etc.)
- In development, you can safely use port 3000
*/
const port = process.env.PORT || 3005;

/*
🌍 STEP 4: Define a simple GET route
This route handles GET requests to the root URL (http://localhost:3000/)
It sends back a simple text response: "Hello World!"
*/
app.get('/', (_req, res) => {
  res.send('Hello World!');
});

/*
📨 STEP 5: Define a POST route at the root URL
This is triggered when a POST request is made to http://localhost:3000/
Here, we're just printing the active port number to the console
Note: This is for demonstration purposes only — no request body is processed here
*/
app.post('/', function (_req, res) {
  console.log(`Example app listening on port ${port}`);
  res.send(`Server is running on port ${port}`);
});

/*
🚀 STEP 6: Start the server
The app starts listening on the port defined above
Once the server is running, the provided callback function logs a message
*/
app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});

/*
🧠 ADDITIONAL CONCEPTS: IP Address and Ports

🖥️ A single computer (PC/server) typically has only **one IP address** (e.g., 127.0.0.1 for localhost).
    - This IP uniquely identifies the machine on a network.

🔌 However, a single IP address can have **multiple ports**.
    - A port is like a "channel" through which a specific application can communicate.
    - Port numbers range from 0 to 65535 (commonly used: 3000, 8080, 5000, etc.)

🎯 This means:
    - You can run multiple different applications (like Java, Go, Rust, Python servers) **on the same machine**
    - But they must use **different ports** to avoid conflicts

📎 For example:
    - Node.js server → port 3000
    - Java Spring Boot → port 8080
    - Go HTTP server → port 5000
    - Rust Actix server → port 7000

📛 If two applications try to use the **same port**, you'll get an error like:
    `Error: listen EADDRINUSE: address already in use`
*/
