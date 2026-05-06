// Create a counter in Javascript (counts down from 30 to 0)
// Function to start the countdown
function startCountdown() {
  let count = 30;

  // Use setInterval to decrement the count every second
  const countdownInterval = setInterval(function () {
    console.log(count);

    // Check if count has reached 0, and clear the interval if so
    if (count === 0) {
      clearInterval(countdownInterval);
      console.log("Countdown complete!");
    }

    count -= 1;
  }, 1000); // 1000 milliseconds = 1 second
}

// Call the function to start the countdown
// startCountdown();

function startCountdown(time) {
  let count = time;

  const countInterval = setInterval(function () {
    console.log(count);
    count -= 1;

    if (count === 0) clearInterval(countInterval);
  }, 1000);
}

startCountdown(5);

