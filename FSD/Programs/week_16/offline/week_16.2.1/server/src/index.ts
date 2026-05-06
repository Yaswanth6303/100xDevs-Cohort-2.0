import express from 'express';
// Parses a very long cookie-string and gets you an object.
import cookieParser from 'cookie-parser';
import cors from 'cors';
import jwt, { type JwtPayload } from 'jsonwebtoken';
import path from 'path';

const JWT_SECRET = 'test123';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    // Allow to set credentials (cookies) in the specific origin mentioned below.
    credentials: true,
    // Only single frontend origin allowed to set the cookie on this specific backend server.
    origin: 'http://localhost:5173',
  }),
);

app.post('/signin', (req, res) => {
  const { email, password } = req.body;

  // do db validations, fetch id of user from db
  const token = jwt.sign(
    {
      id: 1,
    },
    JWT_SECRET,
  );
  // This will put the cookie in the set-cookie header
  // When the user signin in the website the browser will automatically recieve a set-cookie header in the response
  // headers.
  res.cookie('token', token);
  res.send('Logged in!');
});

app.get('/user', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    res.status(401).json({ message: 'No token provided. Please sign in.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    // Get email of the user from the database
    res.send({
      userId: decoded.id,
    });
  } catch (err) {
    res
      .status(401)
      .json({ error: err, message: 'Invalid or expired token. Please sign in again.' });
  }
});

app.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({
    message: 'Logged out!',
  });
});

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.listen(3000, () => {
  console.log(`Server is running on port http://localhost:3000`);
});
