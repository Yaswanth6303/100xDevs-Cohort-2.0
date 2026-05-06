import express from 'express';
const app = express();

// Initial user with one unhealthy kidney
const users = [
  {
    name: 'John',
    kidneys: [
      {
        healthy: false,
      },
    ],
  },
];

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * GET /
 * Fetch information about John’s kidneys:
 * - Total kidneys
 * - Number of healthy kidneys
 * - Number of unhealthy kidneys
 */
app.get('/', function (_req, res) {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;

  // Use filter to count healthy kidneys
  const numberOfHealthyKidneys = johnKidneys.filter((k) => k.healthy).length;
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

/**
 * POST /
 * Add a new kidney for John.
 * Example body: { "isHealthy": true }
 * Send via Postman.
 */
app.post('/', function (req, res) {
  const isHealthy = req.body.isHealthy;

  // Add new kidney with specified health status
  users[0].kidneys.push({ healthy: isHealthy });

  res.json({ msg: 'Done' });
});

/**
 * PUT /
 * Make all kidneys healthy.
 * Send PUT request via Postman.
 */
app.put('/', function (_req, res) {
  // Use map to replace each kidney with a healthy one
  users[0].kidneys = users[0].kidneys.map(() => ({ healthy: true }));

  res.json({ msg: 'Done' });
});

/**
 * DELETE /
 * Delete all unhealthy kidneys.
 * Send DELETE request via Postman.
 */
app.delete('/', function (_req, res) {
  const unhealthyKidneysExist = users[0].kidneys.some((k) => !k.healthy);

  if (unhealthyKidneysExist) {
    // Keep only healthy kidneys using filter
    users[0].kidneys = users[0].kidneys.filter((k) => k.healthy);

    res.json({ msg: 'Done' });
  } else {
    res.status(411).json({ msg: 'You have no bad kidneys' });
  }
});

// Start the server on port 3000
app.listen(3000);
