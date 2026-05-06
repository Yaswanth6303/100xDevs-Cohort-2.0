// Record the start time
const startTime = new Date().getTime();

// Use setTimeout to schedule the execution of a function after 1000 milliseconds (1 second)
setTimeout(function () {
  // Record the end time
  const endTime = new Date().getTime();

  // Calculate the time difference
  const timeDifference = endTime - startTime;

  // Log the result
  console.log("Time in Milliseconds: " + timeDifference);
}, 2000);
