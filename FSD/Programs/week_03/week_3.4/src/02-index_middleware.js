import express from 'express';
const app = express();

/**
 * Middleware to check if the person is old enough to take a ride.
 * It reads the "age" query parameter from the request.
 * If the age is 14 or above, it allows the request to continue to the route handler.
 * Otherwise, it responds with a message denying access.
 */
function isOldEnoughMiddlewares(req, res, next) {
  const age = parseInt(req.query.age, 10); // Convert query string value to integer
  if (age >= 14) {
    next(); // Proceed to the next middleware or route handler
  } else {
    res.json({
      msg: 'You are not old enough to ride this ride.',
    });
  }
}

// ---------------- ROUTES ---------------- //
// app.use(isOldEnoughMiddlewares) // All the routes which are present below run this middleware

// Apply middleware only to this route
// If the middleware passes, the user will see a welcome message for ride 1
app.get('/ride1', isOldEnoughMiddlewares, function (_req, res) {
  res.json({
    msg: 'Welcome to ride 1!',
  });
});

// Apply middleware only to this route
// If the middleware passes, the user will see a welcome message for ride 2
app.get('/ride2', isOldEnoughMiddlewares, function (_req, res) {
  res.json({
    msg: 'Welcome to ride 2!',
  });
  // Note: Calling next() here is unnecessary unless you have another middleware after this route
});

// ---------------- START SERVER ---------------- //
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
