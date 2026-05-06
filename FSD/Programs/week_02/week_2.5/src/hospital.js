// Import the Express framework
import express from 'express';

// Create an Express application instance
const app = express();

// Define an initial user with a list of kidneys
// Initially, John has one unhealthy kidney
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

// Middleware to parse incoming JSON requests
app.use(express.json());

/**
 * GET request handler at "/"
 * This endpoint is used to fetch kidney health data for John.
 * You can access this in your browser via http://localhost:3000
 *
 * Response includes:
 * - Total number of kidneys
 * - Number of healthy kidneys
 * - Number of unhealthy kidneys
 */
app.get('/', function (req, res) {
  const johnKidneys = users[0].kidneys;
  const numberOfKidneys = johnKidneys.length;

  let numberOfHealthyKidneys = 0;

  // Count the number of healthy kidneys
  for (let i = 0; i < numberOfKidneys; i++) {
    if (johnKidneys[i].healthy) {
      numberOfHealthyKidneys += 1;
    }
  }

  // Unhealthy kidneys = total - healthy
  const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;

  // Send the data as JSON response
  res.json({
    numberOfKidneys,
    numberOfHealthyKidneys,
    numberOfUnhealthyKidneys,
  });
});

/**
 * POST request handler at "/"
 * This endpoint is used to add a new kidney (healthy or unhealthy) to John's list.
 *
 * Use Postman to send POST requests with a JSON body like:
 * {
 *   "isHealthy": true
 * }
 *
 * If you send this request 5 times, and initially John had 2 kidneys,
 * the total will become 7 (2 existing + 5 new).
 */
app.post('/', function (req, res) {
  const isHealthy = req.body.isHealthy;

  // Add a new kidney with the specified health status
  users[0].kidneys.push({
    healthy: isHealthy,
  });

  // Respond with a success message
  res.json({
    msg: 'Done',
  });
});

/**
 * PUT request handler at "/"
 * This endpoint updates all of John's kidneys to be healthy.
 *
 * Use Postman to send a PUT request. After sending,
 * if you check the GET endpoint (browser), all kidneys will show as healthy.
 */
app.put('/', function (req, res) {
  // Loop through all kidneys and mark them as healthy
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }

  // Respond with a success message
  res.json({
    msg: 'Done',
  });
});

/**
 * DELETE request handler at "/"
 * This endpoint deletes all unhealthy kidneys from John's list.
 *
 * Use Postman to send a DELETE request.
 * If there are no unhealthy kidneys, returns an error message with status code 411.
 */
app.delete('/', function (req, res) {
  const newKidneys = [];

  // If there is at least one unhealthy kidney, proceed to filter
  if (isThereAnyUnHealthyKidney()) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (users[0].kidneys[i].healthy) {
        // Only keep healthy kidneys
        newKidneys.push({
          healthy: true,
        });
      }
    }

    // Replace the old kidney list with the filtered healthy ones
    users[0].kidneys = newKidneys;

    // Respond with a success message
    res.json({
      msg: 'Done',
    });
  } else {
    // If there are no unhealthy kidneys, return a 411 error
    res.status(411).json({
      msg: 'You have no bad kidneys',
    });
  }
});

/**
 * Helper function to check if there is at least one unhealthy kidney.
 * Returns true if found, otherwise false.
 */
function isThereAnyUnHealthyKidney() {
  let atleastOneUnhealthyKidney = false;

  // Loop through the kidneys and check for any unhealthy one
  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      atleastOneUnhealthyKidney = true;
    }
  }

  return atleastOneUnhealthyKidney;
}

// Start the Express server and listen on port 3000
app.listen(3000);
